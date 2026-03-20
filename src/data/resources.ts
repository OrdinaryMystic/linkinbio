export type ResourceCategory = "Astrology" | "Tarot" | "Spirituality";
export type ResourceType = "Book" | "Digital";

export type ResourceItem = {
  title: string;
  description: string;
  url: string;
  category: ResourceCategory;
  type: ResourceType;
  isAffiliate: boolean;
};

export const recommendedResources: ResourceItem[] = [
  {
    "title": "Planets in Youth",
    "description": "A practical lens for understanding how early life patterns shape each planet and your long-term astrology language.",
    "url": "https://amzn.to/4mKfUwJ",
    "category": "Astrology",
    "type": "Book",
    "isAffiliate": true
  },
  {
    "title": "Planets in Transit",
    "description": "One of the clearest references for timing and interpretation, especially when you are learning transits in real charts.",
    "url": "https://amzn.to/3VsH9Qd",
    "category": "Astrology",
    "type": "Book",
    "isAffiliate": true
  },
  {
    "title": "Astrology: Using the Wisdom of the Stars",
    "description": "A beautifully structured foundation text that makes core astrology concepts approachable without oversimplifying them.",
    "url": "https://amzn.to/4m0saYJ",
    "category": "Astrology",
    "type": "Book",
    "isAffiliate": true
  },
  {
    "title": "Easiest Way to Learn Tarot",
    "description": "Excellent for building reading confidence through practice-first exercises instead of rote memorization.",
    "url": "https://amzn.to/47o0JEz",
    "category": "Tarot",
    "type": "Book",
    "isAffiliate": true
  },
  {
    "title": "Advanced Tarot Secrets",
    "description": "A strong next step after basics, with layered techniques that deepen interpretation and spread storytelling.",
    "url": "https://amzn.to/4rOQaSa",
    "category": "Tarot",
    "type": "Book",
    "isAffiliate": true
  },
  {
    "title": "The Story of Tarot",
    "description": "A modern, clear guide that connects tarot history and symbolism in a way that is easy to apply to daily reads.",
    "url": "https://www.barnesandnoble.com/w/the-story-of-tarot-not-your-average-guidebook-taylor-marie/1145563436",
    "category": "Tarot",
    "type": "Book",
    "isAffiliate": false
  },
  {
    "title": "Insight Timer",
    "description": "Great for building a consistent meditation and reflection rhythm with flexible sessions and practical teachers.",
    "url": "https://insighttimer.com/",
    "category": "Spirituality",
    "type": "Digital",
    "isAffiliate": false
  },
  {
    "title": "Transit Viewer",
    "description": "A beautiful tool for visualizing transits, both personal transits and mundane. There are many ways to visualize these transits, but my favorite is the calendar view.",
    "url": "https://transitviewer.net/",
    "category": "Astrology",
    "type": "Digital",
    "isAffiliate": false
  }
];
