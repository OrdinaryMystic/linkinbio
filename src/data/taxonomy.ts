export type TaxonomyEntityType = "planets" | "signs" | "houses" | "cards";

export type TaxonomyEntity = {
  slug: string;
  title: string;
  description: string;
  related?: Partial<Record<TaxonomyEntityType, string[]>>;
  relatedTerms?: string[];
};

type TaxonomyMap = Record<TaxonomyEntityType, Record<string, TaxonomyEntity>>;

export const TAXONOMY_DATA: TaxonomyMap = {
  "planets": {
    "saturn": {
      "slug": "saturn",
      "title": "Saturn",
      "description": "Discipline, structure, constraints, and long-term mastery.",
      "related": {
        "signs": [
          "capricorn",
          "aquarius"
        ],
        "houses": [
          "10th-house"
        ]
      },
      "relatedTerms": [
        "lead"
      ]
    },
    "jupiter": {
      "slug": "jupiter",
      "title": "Jupiter",
      "description": "Growth, wisdom, expansion, and worldview."
    }
  },
  "signs": {
    "capricorn": {
      "slug": "capricorn",
      "title": "Capricorn",
      "description": "Ambition, responsibility, and durable systems.",
      "related": {
        "planets": [
          "saturn"
        ],
        "houses": [
          "10th-house"
        ]
      }
    },
    "aquarius": {
      "slug": "aquarius",
      "title": "Aquarius",
      "description": "Systems-thinking, social reform, and strategic distance."
    }
  },
  "houses": {
    "10th-house": {
      "slug": "10th-house",
      "title": "10th House",
      "description": "Career, public reputation, achievement, and vocation.",
      "related": {
        "planets": [
          "saturn"
        ],
        "signs": [
          "capricorn"
        ]
      }
    },
    "7th-house": {
      "slug": "7th-house",
      "title": "7th House",
      "description": "Partnerships, contracts, and one-to-one alliances."
    }
  },
  "cards": {
    "the-hermit": {
      "slug": "the-hermit",
      "title": "The Hermit",
      "description": "Introspection, discernment, and deliberate solitude.",
      "related": {
        "planets": [
          "saturn"
        ]
      }
    },
    "wheel-of-fortune": {
      "slug": "wheel-of-fortune",
      "title": "Wheel of Fortune",
      "description": "Cycles, turning points, and changes in conditions."
    }
  }
};

export const TAXONOMY_INDEX = TAXONOMY_DATA;

export function getTaxonomyEntity(type: TaxonomyEntityType, slug: string) {
  return TAXONOMY_DATA[type][slug];
}

export function getTaxonomyEntities(type: TaxonomyEntityType): TaxonomyEntity[] {
  return Object.values(TAXONOMY_DATA[type]);
}
