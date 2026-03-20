import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { ResourcesPageContent } from "@/components/resources/resources-page-content";

export const metadata: Metadata = {
  title: "Resource Hub for Ordinary Mystics",
  description:
    "Notion templates and tools that support grounded tarot and astrology practice, plus recommended resources.",
  alternates: {
    canonical: `${SITE_URL}/resources`,
  },
};

export default function ResourcesPage() {
  return <ResourcesPageContent />;
}
