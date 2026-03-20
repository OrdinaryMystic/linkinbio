const fs = require("node:fs") as typeof import("node:fs");
const path = require("node:path") as typeof import("node:path");
const matter = require("gray-matter") as typeof import("gray-matter");

const ROOT_DIR = process.cwd();
const INGEST_ROOT = path.join(ROOT_DIR, "src", "data", "ingest");
const BLOG_TARGET = path.join(ROOT_DIR, "src", "content", "blog");
const IMAGE_TARGET_ROOT = path.join(ROOT_DIR, "public", "images", "blog");

function ensureDir(dirPath: string) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function moveFile(sourcePath: string, destPath: string) {
  try {
    fs.renameSync(sourcePath, destPath);
  } catch {
    fs.copyFileSync(sourcePath, destPath);
    fs.unlinkSync(sourcePath);
  }
}

function getStatus(value: unknown): "draft" | "published" | "archived" {
  if (typeof value !== "string") return "draft";
  const normalized = value.trim().toLowerCase();
  if (normalized === "published") return "published";
  if (normalized === "archived") return "archived";
  return "draft";
}

function toFinalImageUrl(rawTarget: string, slug: string): string | null {
  const cleanedTarget = rawTarget.trim().replace(/^["']|["']$/g, "");
  if (
    cleanedTarget.startsWith("http://") ||
    cleanedTarget.startsWith("https://") ||
    cleanedTarget.startsWith("/") ||
    cleanedTarget.startsWith("#") ||
    cleanedTarget.startsWith("data:")
  ) {
    return null;
  }

  const fileName = path.basename(cleanedTarget);
  if (!fileName) return null;
  return `/images/blog/${slug}/${fileName}`;
}

const IMAGE_EXT = /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i;

function resolveBarePath(rawPath: string, slug: string, postImageDir: string): string | null {
  const cleanedTarget = rawPath.trim().replace(/^["']|["']$/g, "");
  if (
    cleanedTarget.startsWith("http://") ||
    cleanedTarget.startsWith("https://") ||
    cleanedTarget.startsWith("/") ||
    cleanedTarget.startsWith("#") ||
    cleanedTarget.startsWith("data:")
  ) {
    return null;
  }
  const base = path.basename(cleanedTarget);
  if (!base) return null;

  if (IMAGE_EXT.test(base)) {
    return `/images/blog/${slug}/${base}`;
  }

  if (!fs.existsSync(postImageDir)) return `/images/blog/${slug}/${base}`;
  const files = fs.readdirSync(postImageDir);
  const match = files.find((f) => path.basename(f, path.extname(f)) === base);
  return match ? `/images/blog/${slug}/${match}` : `/images/blog/${slug}/${base}`;
}

function patchImageLinks(markdown: string, slug: string, postImageDir: string): string {
  let patchedMarkdown = markdown.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
    (full, altText, rawTarget) => {
      const finalUrl = toFinalImageUrl(rawTarget, slug);
      return finalUrl ? `![${altText}](${finalUrl})` : full;
    },
  );

  patchedMarkdown = patchedMarkdown.replace(
    /<img([^>]*?)src=["']([^"']+)["']([^>]*)>/gi,
    (full, pre, src, post) => {
      const finalUrl = toFinalImageUrl(src, slug);
      return finalUrl ? `<img${pre}src="${finalUrl}"${post}>` : full;
    },
  );

  // Convert iA Writer–style bare paths (./file.jpg or ./file, optionally wrapped in **) to markdown images
  patchedMarkdown = patchedMarkdown.replace(
    /(?:^|\n)\s*\*{0,2}(\.\\?\/)([a-zA-Z0-9_.-]+)\*{0,2}\s*(?:\n|$)/gm,
    (full, prefix, fileName) => {
      const finalUrl = resolveBarePath(prefix + fileName, slug, postImageDir);
      return finalUrl ? `\n![](${finalUrl})\n` : full;
    },
  );

  patchedMarkdown = patchedMarkdown.replace(
    /(?:^|\s)\*{0,2}(\.\\?\/)([a-zA-Z0-9_.-]+\.(?:jpg|jpeg|png|gif|webp|avif|svg))\*{0,2}(?:[\s\n]|$)/gim,
    (full, prefix, fileName) => {
      const finalUrl = resolveBarePath(prefix + fileName, slug, postImageDir);
      return finalUrl ? ` ![](${finalUrl}) ` : full;
    },
  );

  return patchedMarkdown;
}

function getProjectFolders(): string[] {
  if (!fs.existsSync(INGEST_ROOT)) return [];
  return fs
    .readdirSync(INGEST_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(INGEST_ROOT, entry.name))
    .sort((a, b) => a.localeCompare(b));
}

function ingestFolder(folderPath: string) {
  const slug = path.basename(folderPath);
  const frontmatterPath = path.join(folderPath, "frontmatter.md");
  const manuscriptPath = path.join(folderPath, `${slug}.md`);

  if (!fs.existsSync(frontmatterPath)) {
    console.log(`⚠️ ${slug}: Missing frontmatter.md. Skipping.`);
    return;
  }
  if (!fs.existsSync(manuscriptPath)) {
    console.log(`⚠️ ${slug}: Missing ${slug}.md manuscript. Skipping.`);
    return;
  }

  const frontmatterRaw = fs.readFileSync(frontmatterPath, "utf8");
  const parsed = matter(frontmatterRaw);
  const status = getStatus(parsed.data.status);

  if (status !== "published") {
    console.log(`📝 ${slug} is still a draft. Skipping...`);
    return;
  }

  const postImageDir = path.join(IMAGE_TARGET_ROOT, slug);
  ensureDir(postImageDir);

  const excludeNames = new Set(["frontmatter.md", `${slug}.md`]);
  for (const entry of fs.readdirSync(folderPath, { withFileTypes: true })) {
    if (!entry.isFile() || excludeNames.has(entry.name)) continue;
    const fullPath = path.join(folderPath, entry.name);
    const baseName = path.basename(fullPath);
    let destPath = path.join(postImageDir, baseName);
    if (fs.existsSync(destPath)) {
      const ext = path.extname(baseName);
      const stem = path.basename(baseName, ext);
      destPath = path.join(postImageDir, `${stem}-${Date.now()}${ext}`);
    }
    moveFile(fullPath, destPath);
  }

  const manuscriptRaw = fs.readFileSync(manuscriptPath, "utf8");
  const combined = frontmatterRaw.trimEnd() + "\n\n" + manuscriptRaw.trimStart();
  const patchedContent = patchImageLinks(combined, slug, postImageDir);

  ensureDir(BLOG_TARGET);
  const targetMarkdownPath = path.join(BLOG_TARGET, `${slug}.md`);
  fs.writeFileSync(targetMarkdownPath, patchedContent, "utf8");

  fs.rmSync(folderPath, { recursive: true, force: true });
  console.log(`🚀 Ingested ${slug}: Post published and images moved.`);
}

function run() {
  ensureDir(INGEST_ROOT);
  ensureDir(BLOG_TARGET);
  ensureDir(IMAGE_TARGET_ROOT);

  const folders = getProjectFolders();
  for (const folderPath of folders) {
    ingestFolder(folderPath);
  }
}

run();
