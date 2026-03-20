export type AuthorProfile = {
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

export const AUTHORS: Record<string, AuthorProfile> = {
  "tyler-martin": {
    "slug": "tyler-martin",
    "name": "Tyler Martin",
    "bio": "Practical astrology and tarot for skeptics who want signal over noise.",
    "description": "Tyler writes grounded essays on astrology, tarot, and pattern recognition. His work translates symbolic systems into practical frameworks for decision-making, timing, and self-reflection.",
    "image": "/favicon.png",
    "socials": [
      {
        "label": "YouTube",
        "url": "https://www.youtube.com/@OrdinaryMysticReadings"
      },
      {
        "label": "TikTok",
        "url": "https://www.tiktok.com/@ordinarymysticreadings"
      }
    ]
  }
};

export const DEFAULT_AUTHOR_SLUG = "tyler-martin";

export function getAuthorBySlug(slug?: string): AuthorProfile {
  if (!slug) return AUTHORS[DEFAULT_AUTHOR_SLUG];
  return AUTHORS[slug] ?? AUTHORS[DEFAULT_AUTHOR_SLUG];
}
