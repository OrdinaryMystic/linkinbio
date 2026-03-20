import type { BlogPostFrontmatter, MarkdownListItem } from "@/lib/content";

export const BLOG_NAV_CATEGORIES = [
  { slug: "astrology", label: "Astrology" },
  { slug: "tarot", label: "Tarot" },
  { slug: "general-spirituality", label: "General Spirituality" },
] as const;

export type BlogNavCategory = (typeof BLOG_NAV_CATEGORIES)[number]["slug"];

export function formatSlugLabel(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getPostYear(post: MarkdownListItem<BlogPostFrontmatter>): string {
  const year = new Date(post.frontmatter.date).getFullYear();
  return Number.isNaN(year) ? "unknown" : String(year);
}

export function getAvailablePostYears(posts: MarkdownListItem<BlogPostFrontmatter>[]) {
  return [...new Set(posts.map(getPostYear).filter((year) => year !== "unknown"))].sort(
    (a, b) => Number(b) - Number(a),
  );
}

export function filterPostsBySearchAndYear(
  posts: MarkdownListItem<BlogPostFrontmatter>[],
  query: string,
  year: string | undefined,
) {
  const normalizedQuery = query.trim().toLowerCase();
  return posts.filter((post) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      `${post.frontmatter.title} ${post.frontmatter.description}`
        .toLowerCase()
        .includes(normalizedQuery);
    const matchesYear = !year || year === "all" || getPostYear(post) === year;
    return matchesQuery && matchesYear;
  });
}

export function filterPostsBySearchTagAndArchive(
  posts: MarkdownListItem<BlogPostFrontmatter>[],
  query: string,
  tag: string | undefined,
  archive: string | undefined,
) {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedTag = tag?.trim().toLowerCase();

  return posts.filter((post) => {
    const haystack = `${post.frontmatter.title} ${post.frontmatter.description} ${(post.frontmatter.tags ?? []).join(" ")}`.toLowerCase();
    const matchesQuery = normalizedQuery.length === 0 || haystack.includes(normalizedQuery);
    const matchesTag = !normalizedTag || post.frontmatter.tags?.includes(normalizedTag);
    const month = new Date(post.frontmatter.date).toISOString().slice(0, 7);
    const matchesArchive = !archive || month === archive;
    return matchesQuery && matchesTag && matchesArchive;
  });
}

export function getCategoryCounts(posts: MarkdownListItem<BlogPostFrontmatter>[]) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    if (!post.frontmatter.category) continue;
    counts.set(post.frontmatter.category, (counts.get(post.frontmatter.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

export function getTagCounts(posts: MarkdownListItem<BlogPostFrontmatter>[]) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.frontmatter.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getArchiveGroups(posts: MarkdownListItem<BlogPostFrontmatter>[]) {
  const byYear = new Map<string, Map<string, number>>();
  for (const post of posts) {
    const date = new Date(post.frontmatter.date);
    if (Number.isNaN(date.getTime())) continue;
    const year = String(date.getFullYear());
    const month = `${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!byYear.has(year)) byYear.set(year, new Map<string, number>());
    const yearMap = byYear.get(year)!;
    yearMap.set(month, (yearMap.get(month) ?? 0) + 1);
  }

  return [...byYear.entries()]
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, months]) => ({
      year,
      months: [...months.entries()]
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([month, count]) => ({ month, count })),
    }));
}

export function getTagCloud(posts: MarkdownListItem<BlogPostFrontmatter>[]) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.frontmatter.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  const max = Math.max(...counts.values(), 1);
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count, weight: count / max }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function filterPostsBySingleValue(
  posts: MarkdownListItem<BlogPostFrontmatter>[],
  key: "category" | "subcategory",
  value: string,
) {
  return posts.filter((post) => post.frontmatter[key] === value);
}

export function filterPostsByListValue(
  posts: MarkdownListItem<BlogPostFrontmatter>[],
  key: "planets" | "signs" | "houses" | "cards" | "tags",
  value: string,
) {
  return posts.filter((post) => post.frontmatter[key]?.includes(value));
}
