/**
 * Recommended resources (books, tools, etc.) for the Tools page.
 * Add new entries to the array. Use image: "/images/resource/your-file.jpg"
 * and put the file in public/images/resource/. Set affiliate: true for affiliate links (shown with ★).
 */
export type ResourceItem = {
  title: string;
  desc: string;
  image: string;
  url: string;
  tags: string[];
  affiliate: boolean;
};

export const recommendedResources: ResourceItem[] = [
  {
    title: "Planets in Youth",
    desc: "By Robert Hand",
    image: "/images/resource/planets_in_youth.jpg",
    url: "https://amzn.to/4mKfUwJ",
    tags: ["Astrology", "Book"],
    affiliate: true,
  },
  {
    title: "Planets in Transit",
    desc: "By Robert Hand",
    image: "/images/resource/planets_in_transit.jpg",
    url: "https://amzn.to/3VsH9Qd",
    tags: ["Astrology", "Book"],
    affiliate: true,
  },
  {
    title: "Astrology: Using the Wisdom of the Stars",
    desc: "By Carole Taylor",
    image: "/images/resource/astrology_taylor.jpg",
    url: "https://amzn.to/4m0saYJ",
    tags: ["Astrology", "Book"],
    affiliate: true,
  },
  {
    title: "Easiest Way to Learn Tarot",
    desc: "By Dusty White",
    image: "/images/resource/easiest-way-to-learn-tarot.jpg",
    url: "https://amzn.to/47o0JEz",
    tags: ["Tarot", "Book"],
    affiliate: true,
  },
  {
    title: "Advanced Tarot Secrets",
    desc: "By Dusty White",
    image: "/images/resource/advanced_tarot_secrets.webp",
    url: "https://amzn.to/4rOQaSa",
    tags: ["Tarot", "Book"],
    affiliate: true,
  },
  {
    title: "The Story of Tarot",
    desc: "By Taylor Marie",
    image: "/images/resource/story_of_tarot.jpg",
    url: "https://www.barnesandnoble.com/w/the-story-of-tarot-not-your-average-guidebook-taylor-marie/1145563436",
    tags: ["Tarot", "Book"],
    affiliate: false,
  },
];
