const fs = require("node:fs") as typeof import("node:fs");
const path = require("node:path") as typeof import("node:path");
const { parse } = require("csv-parse/sync") as typeof import("csv-parse/sync");

type ResourceCategory = "Astrology" | "Tarot" | "Spirituality";
type ResourceType = "Book" | "Digital";
type TaxonomyEntityType = "planets" | "signs" | "houses" | "cards";

type ResourceItem = {
  title: string;
  description: string;
  url: string;
  category: ResourceCategory;
  type: ResourceType;
  isAffiliate: boolean;
};

type AuthorCsvRow = {
  slug: string;
  name: string;
  bio: string;
  description: string;
  image: string;
  social_youtube: string;
  social_tiktok: string;
  social_instagram: string;
};

type BlogTaxonomyRow = {
  slug: string;
  title: string;
  description: string;
};

type TestimonialRow = {
  name: string;
  context: string;
  quote: string;
  avatarSrc: string;
};

type TaxonomyCsvRow = {
  type: TaxonomyEntityType;
  slug: string;
  title: string;
  description: string;
  related_planets: string;
  related_signs: string;
  related_houses: string;
  related_cards: string;
  related_terms: string;
};

type ParsedRow = Record<string, string>;

const ROOT_DIR = process.cwd();
const RAW_DIR = path.join(ROOT_DIR, "src", "data", "raw");
const OUTPUT_DIR = path.join(ROOT_DIR, "src", "data");

function readCsvRows(filePath: string): ParsedRow[] {
  const source = fs.readFileSync(filePath, "utf8");
  return parse(source, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
    relax_quotes: true,
  }) as ParsedRow[];
}

function toTs(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function writeTsFile(fileName: string, contents: string) {
  const outputPath = path.join(OUTPUT_DIR, fileName);
  fs.writeFileSync(outputPath, `${contents}\n`, "utf8");
  console.log(`✅ Data Sync Complete: ${fileName} updated`);
}

function getHeaders(filePath: string): string[] {
  const source = fs.readFileSync(filePath, "utf8");
  const [firstLine = ""] = source.split(/\r?\n/, 1);
  return parse(firstLine, { relax_quotes: true })[0] as string[];
}

function parseBoolean(input: string, field: string, rowNumber: number): boolean {
  const normalized = input.trim().toLowerCase();
  if (normalized === "true") return true;
  if (normalized === "false") return false;
  throw new Error(`Invalid boolean for ${field} at row ${rowNumber}: "${input}"`);
}

function splitPipeList(value: string): string[] {
  return value
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);
}

function syncResources(csvPath: string) {
  const expectedHeaders = [
    "title",
    "description",
    "url",
    "category",
    "type",
    "isAffiliate",
  ];

  const headers = getHeaders(csvPath);
  if (headers.join(",") !== expectedHeaders.join(",")) {
    throw new Error(
      `resources.csv headers must exactly match: ${expectedHeaders.join(", ")}`
    );
  }

  const allowedCategories = new Set<ResourceCategory>([
    "Astrology",
    "Tarot",
    "Spirituality",
  ]);
  const allowedTypes = new Set<ResourceType>(["Book", "Digital"]);

  const resources = readCsvRows(csvPath).map((row, index) => {
    const rowNumber = index + 2;
    const category = row.category as ResourceCategory;
    const itemType = row.type as ResourceType;

    if (!allowedCategories.has(category)) {
      throw new Error(`Invalid category at row ${rowNumber}: "${row.category}"`);
    }

    if (!allowedTypes.has(itemType)) {
      throw new Error(`Invalid type at row ${rowNumber}: "${row.type}"`);
    }

    return {
      title: row.title,
      description: row.description,
      url: row.url,
      category,
      type: itemType,
      isAffiliate: parseBoolean(row.isAffiliate, "isAffiliate", rowNumber),
    } satisfies ResourceItem;
  });

  writeTsFile(
    "resources.ts",
    `export type ResourceCategory = "Astrology" | "Tarot" | "Spirituality";
export type ResourceType = "Book" | "Digital";

export type ResourceItem = {
  title: string;
  description: string;
  url: string;
  category: ResourceCategory;
  type: ResourceType;
  isAffiliate: boolean;
};

export const recommendedResources: ResourceItem[] = ${toTs(resources)};`
  );
}

function syncAuthors(csvPath: string) {
  const rows = readCsvRows(csvPath) as unknown as AuthorCsvRow[];

  const authorMap: Record<
    string,
    {
      slug: string;
      name: string;
      bio: string;
      description: string;
      image: string;
      socials: { label: string; url: string }[];
    }
  > = {};

  for (const row of rows) {
    const socials = [
      { label: "YouTube", url: row.social_youtube?.trim() ?? "" },
      { label: "TikTok", url: row.social_tiktok?.trim() ?? "" },
      { label: "Instagram", url: row.social_instagram?.trim() ?? "" },
    ].filter((social) => social.url.length > 0);

    authorMap[row.slug] = {
      slug: row.slug,
      name: row.name,
      bio: row.bio,
      description: row.description,
      image: row.image,
      socials,
    };
  }

  const defaultAuthorSlug = rows[0]?.slug ?? "";

  writeTsFile(
    "authors.ts",
    `export type AuthorProfile = {
  slug: string;
  name: string;
  bio: string;
  description: string;
  image: string;
  socials: {
    label: string;
    url: string;
  }[];
};

export const AUTHORS: Record<string, AuthorProfile> = ${toTs(authorMap)};

export const DEFAULT_AUTHOR_SLUG = ${JSON.stringify(defaultAuthorSlug)};

export function getAuthorBySlug(slug?: string): AuthorProfile {
  if (!slug) return AUTHORS[DEFAULT_AUTHOR_SLUG];
  return AUTHORS[slug] ?? AUTHORS[DEFAULT_AUTHOR_SLUG];
}`
  );
}

function syncBlogTaxonomy(csvPath: string) {
  const rows = readCsvRows(csvPath) as unknown as BlogTaxonomyRow[];
  const categories: Record<string, { title: string; description: string }> = {};

  for (const row of rows) {
    categories[row.slug] = {
      title: row.title,
      description: row.description,
    };
  }

  writeTsFile(
    "blog-taxonomy.ts",
    `export const BLOG_CATEGORIES: Record<
  string,
  { title: string; description: string }
> = ${toTs(categories)};`
  );
}

function syncTestimonials(csvPath: string) {
  const rows = readCsvRows(csvPath) as unknown as TestimonialRow[];
  const testimonials = rows.map((row) => ({
    name: row.name,
    context: row.context,
    quote: row.quote,
    avatarSrc: row.avatarSrc,
  }));

  writeTsFile(
    "testimonials.ts",
    `export type TestimonialItem = {
  name: string;
  context: string;
  quote: string;
  avatarSrc: string;
};

export const testimonials: TestimonialItem[] = ${toTs(testimonials)};`
  );
}

function syncTaxonomy(csvPath: string) {
  const rows = readCsvRows(csvPath) as unknown as TaxonomyCsvRow[];
  const data: Record<TaxonomyEntityType, Record<string, unknown>> = {
    planets: {},
    signs: {},
    houses: {},
    cards: {},
  };

  for (const row of rows) {
    const related: Partial<Record<TaxonomyEntityType, string[]>> = {};
    const relatedPlanets = splitPipeList(row.related_planets ?? "");
    const relatedSigns = splitPipeList(row.related_signs ?? "");
    const relatedHouses = splitPipeList(row.related_houses ?? "");
    const relatedCards = splitPipeList(row.related_cards ?? "");
    const relatedTerms = splitPipeList(row.related_terms ?? "");

    if (relatedPlanets.length > 0) related.planets = relatedPlanets;
    if (relatedSigns.length > 0) related.signs = relatedSigns;
    if (relatedHouses.length > 0) related.houses = relatedHouses;
    if (relatedCards.length > 0) related.cards = relatedCards;

    const entity: {
      slug: string;
      title: string;
      description: string;
      related?: Partial<Record<TaxonomyEntityType, string[]>>;
      relatedTerms?: string[];
    } = {
      slug: row.slug,
      title: row.title,
      description: row.description,
    };

    if (Object.keys(related).length > 0) {
      entity.related = related;
    }

    if (relatedTerms.length > 0) {
      entity.relatedTerms = relatedTerms;
    }

    data[row.type][row.slug] = entity;
  }

  writeTsFile(
    "taxonomy.ts",
    `export type TaxonomyEntityType = "planets" | "signs" | "houses" | "cards";

export type TaxonomyEntity = {
  slug: string;
  title: string;
  description: string;
  related?: Partial<Record<TaxonomyEntityType, string[]>>;
  relatedTerms?: string[];
};

type TaxonomyMap = Record<TaxonomyEntityType, Record<string, TaxonomyEntity>>;

export const TAXONOMY_DATA: TaxonomyMap = ${toTs(data)};

export const TAXONOMY_INDEX = TAXONOMY_DATA;

export function getTaxonomyEntity(type: TaxonomyEntityType, slug: string) {
  return TAXONOMY_DATA[type][slug];
}

export function getTaxonomyEntities(type: TaxonomyEntityType): TaxonomyEntity[] {
  return Object.values(TAXONOMY_DATA[type]);
}`
  );
}

function syncFile(fileName: string) {
  const csvPath = path.join(RAW_DIR, fileName);

  switch (fileName) {
    case "resources.csv":
      syncResources(csvPath);
      break;
    case "authors.csv":
      syncAuthors(csvPath);
      break;
    case "taxonomy.csv":
      syncTaxonomy(csvPath);
      break;
    case "blog-taxonomy.csv":
      syncBlogTaxonomy(csvPath);
      break;
    case "testimonials.csv":
      syncTestimonials(csvPath);
      break;
    default:
      console.warn(`Skipping unsupported CSV: ${fileName}`);
  }
}

function run() {
  if (!fs.existsSync(RAW_DIR)) {
    throw new Error(`Missing raw data directory: ${RAW_DIR}`);
  }

  const csvFiles = fs
    .readdirSync(RAW_DIR)
    .filter((entry) => entry.toLowerCase().endsWith(".csv"))
    .sort((a, b) => a.localeCompare(b));

  for (const fileName of csvFiles) {
    syncFile(fileName);
  }

  console.log("✅ Data Sync Complete: CSVs updated.");
}

run();
