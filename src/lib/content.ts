import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";
import { TAXONOMY_INDEX, type TaxonomyEntityType } from "@/data/taxonomy";

export type BlogPostFrontmatter = {
  title: string;
  date: string;
  description: string;
  status?: "draft" | "published" | "archived";
  featured?: boolean;
  category?: string;
  subcategory?: string;
  planets?: string[];
  signs?: string[];
  houses?: string[];
  cards?: string[];
  tags?: string[];
  categories?: string[];
  methodology?: string;
  sources?: string[];
  author?: string;
  image?: string;
  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaBody?: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

export type ToolFrontmatter = {
  title: string;
  price: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
  featured?: boolean;
  type: string;
  image?: string;
};

export type ResourceFrontmatter = {
  title: string;
  description: string;
  category: string;
};

export type ContentType = "blog" | "tools" | "resources";

export type MarkdownEntry<T> = {
  slug: string;
  frontmatter: T;
  contentHtml: string;
};

export type MarkdownListItem<T> = {
  slug: string;
  frontmatter: T;
};

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");
const IS_DEV = process.env.NODE_ENV === "development";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item.length > 0);
}

function normalizeText(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
}

function warnUnknownTaxonomy(
  type: TaxonomyEntityType,
  values: string[],
  slug: string,
) {
  if (!IS_DEV) return;
  const unknown = values.filter((value) => !TAXONOMY_INDEX[type][value]);
  if (unknown.length === 0) return;
  console.warn(
    `[content] Unknown ${type} in frontmatter for "${slug}": ${unknown.join(", ")}`,
  );
}

function normalizeTaxonomyField(
  type: TaxonomyEntityType,
  value: unknown,
  slug: string,
): string[] {
  const normalized = normalizeStringArray(value).map(slugify);
  warnUnknownTaxonomy(type, normalized, slug);
  return normalized;
}

function normalizeBlogFrontmatter(
  frontmatter: BlogPostFrontmatter,
  slug: string,
): BlogPostFrontmatter {
  const category =
    normalizeText(frontmatter.category) ??
    normalizeStringArray(frontmatter.categories)[0];
  const normalizedCategory = category ? slugify(category) : undefined;
  const rawStatus =
    typeof frontmatter.status === "string"
      ? frontmatter.status.trim().toLowerCase()
      : "";
  const status: BlogPostFrontmatter["status"] =
    rawStatus === "draft" || rawStatus === "archived" || rawStatus === "published"
      ? rawStatus
      : "published";

  return {
    ...frontmatter,
    status,
    featured: frontmatter.featured === true,
    category: normalizedCategory,
    subcategory: normalizeText(frontmatter.subcategory)
      ? slugify(frontmatter.subcategory as string)
      : undefined,
    planets: normalizeTaxonomyField("planets", frontmatter.planets, slug),
    signs: normalizeTaxonomyField("signs", frontmatter.signs, slug),
    houses: normalizeTaxonomyField("houses", frontmatter.houses, slug),
    cards: normalizeTaxonomyField("cards", frontmatter.cards, slug),
    tags: normalizeStringArray(frontmatter.tags).map(slugify),
    categories: normalizedCategory ? [normalizedCategory] : [],
    methodology: normalizeText(frontmatter.methodology),
    sources: normalizeStringArray(frontmatter.sources),
    author: normalizeText(frontmatter.author) ?? "tyler-martin",
  };
}

function getDirectoryCandidatesForType(type: ContentType): string[] {
  return [path.join(CONTENT_ROOT, type)];
}

function getFallbackImage(type: ContentType): string {
  switch (type) {
    case "blog":
      return "/images/placeholder-blog-1.svg";
    case "tools":
      return "/images/placeholder-generic.svg";
    default:
      return "/images/placeholder-generic.svg";
  }
}

function normalizeImage<T extends { image?: string }>(
  type: ContentType,
  frontmatter: T,
): T & { image: string } {
  const image =
    (frontmatter.image && frontmatter.image.trim().length > 0
      ? frontmatter.image
      : getFallbackImage(type)) || getFallbackImage(type);

  return {
    ...frontmatter,
    image,
  };
}

export async function renderMarkdownToHtml(markdown: string): Promise<string> {
  const processed = await remark().use(gfm).use(html).process(markdown);
  return processed
    .toString()
    .replace(
      /<input([^>]*type="checkbox"[^>]*) disabled(?:="")?([^>]*)>/g,
      "<input$1$2>",
    )
    .replace(/<img((?:(?!loading=|decoding=)[^>])*)>/g, "<img$1 loading=\"lazy\" decoding=\"async\">");
}

export function getSlugs(type: ContentType): string[] {
  const slugs = new Set<string>();
  for (const dir of getDirectoryCandidatesForType(type)) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter((entry) => entry.endsWith(".md"))) {
      slugs.add(file.replace(/\.md$/, ""));
    }
  }
  return [...slugs];
}

export async function getEntryBySlug<T>(
  type: ContentType,
  slug: string,
): Promise<MarkdownEntry<T>> {
  const fullPath = getDirectoryCandidatesForType(type)
    .map((dir) => path.join(dir, `${slug}.md`))
    .find((candidate) => fs.existsSync(candidate));
  if (!fullPath) {
    throw new Error(`Content file not found for ${type}/${slug}`);
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const contentHtml = await renderMarkdownToHtml(content);

  let frontmatter = data as T;

  if (type === "blog") {
    const normalized = normalizeBlogFrontmatter(data as BlogPostFrontmatter, slug);
    frontmatter = normalizeImage(type, normalized) as unknown as T;
  } else if (type === "tools") {
    frontmatter = normalizeImage(
      type,
      data as { image?: string },
    ) as unknown as T;
  }

  return {
    slug,
    frontmatter,
    contentHtml,
  };
}

export async function getAllEntries<T>(
  type: ContentType,
): Promise<MarkdownListItem<T>[]> {
  const itemsBySlug = new Map<string, MarkdownListItem<T>>();
  const directories = getDirectoryCandidatesForType(type);

  for (const dir of directories) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md"));

    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      if (itemsBySlug.has(slug)) continue;

      const fullPath = path.join(dir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      let frontmatter = data as T;
      if (type === "blog") {
        const normalized = normalizeBlogFrontmatter(data as BlogPostFrontmatter, slug);
        frontmatter = normalizeImage(type, normalized) as unknown as T;
      } else if (type === "tools") {
        frontmatter = normalizeImage(
          type,
          data as { image?: string },
        ) as unknown as T;
      }

      itemsBySlug.set(slug, {
        slug,
        frontmatter,
      });
    }
  }

  const items = [...itemsBySlug.values()];

  if (type === "blog") {
    return items.sort((a, b) => {
      const aDate = new Date(
        (a.frontmatter as unknown as BlogPostFrontmatter).date,
      ).getTime();
      const bDate = new Date(
        (b.frontmatter as unknown as BlogPostFrontmatter).date,
      ).getTime();
      return bDate - aDate;
    });
  }

  if (type === "tools") {
    return items.sort((a, b) => {
      const aTool = a.frontmatter as unknown as ToolFrontmatter;
      const bTool = b.frontmatter as unknown as ToolFrontmatter;

      if (aTool.featured && !bTool.featured) return -1;
      if (!aTool.featured && bTool.featured) return 1;
      return aTool.title.localeCompare(bTool.title);
    });
  }

  return items;
}

export async function getAllBlogPosts() {
  const posts = await getAllEntries<BlogPostFrontmatter>("blog");
  return posts.filter((post) => post.frontmatter.status === "published");
}

export async function getAllTools() {
  return getAllEntries<ToolFrontmatter>("tools");
}

export async function getAllResources() {
  return getAllEntries<ResourceFrontmatter>("resources");
}

