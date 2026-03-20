import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdownToHtml } from "@/lib/content";

export type ContentPage = {
  slug: string;
  title: string;
  description: string;
  contentHtml: string;
  parent?: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getContentPageBySlug(
  baseDir: string,
  slug: string,
): Promise<ContentPage | null> {
  const fullPath = path.join(process.cwd(), baseDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const title = typeof data.title === "string" ? data.title : slug;
  const description = typeof data.description === "string" ? data.description : "";
  const parent = typeof data.parent === "string" ? slugify(data.parent) : undefined;
  const contentHtml = await renderMarkdownToHtml(content);

  return { slug, title, description, contentHtml, parent };
}

export type ContentPageMeta = {
  slug: string;
  title: string;
  description: string;
  parent?: string;
};

export function getContentPages(baseDir: string): ContentPageMeta[] {
  const fullDir = path.join(process.cwd(), baseDir);
  if (!fs.existsSync(fullDir)) return [];

  return fs
    .readdirSync(fullDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = slugify(file.replace(/\.md$/, ""));
      const fullPath = path.join(fullDir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(raw);

      return {
        slug,
        title: typeof data.title === "string" ? data.title : slug,
        description: typeof data.description === "string" ? data.description : "",
        parent: typeof data.parent === "string" ? slugify(data.parent) : undefined,
      };
    });
}

export function getContentPageSlugs(baseDir: string): string[] {
  const fullDir = path.join(process.cwd(), baseDir);
  if (!fs.existsSync(fullDir)) return [];

  return fs
    .readdirSync(fullDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => slugify(file.replace(/\.md$/, "")));
}
