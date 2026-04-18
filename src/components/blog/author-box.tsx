import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type AuthorSummary = {
  slug: string;
  name: string;
  bio?: string;
  description?: string;
  image: string;
  socials?: {
    label: string;
    url: string;
  }[];
};

type AuthorBoxProps = {
  author: AuthorSummary;
  embedded?: boolean;
};

export function AuthorBox({ author, embedded = false }: AuthorBoxProps) {
  const summaryText = author.description ?? author.bio ?? "";

  return (
    <section
      className={
        embedded
          ? "border-t border-[var(--color-ink)] pt-8 sm:pt-10"
          : "mb-10 sm:mb-14"
      }
    >
      <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
        <span className="h-px w-6 bg-[var(--color-oxblood)]" aria-hidden />
        {embedded ? "About the Author" : "Author"}
      </span>

      {embedded ? (
        <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight leading-[1.15] text-[var(--color-ink)] sm:text-3xl">
          <Link
            href={`/authors/${author.slug}`}
            className="transition-colors hover:text-[var(--color-oxblood)]"
          >
            {author.name}
          </Link>
        </h3>
      ) : (
        <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight leading-[1.05] text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
          {author.name}
        </h1>
      )}

      {summaryText ? (
        <p
          className={
            embedded
              ? "mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]"
              : "mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
          }
        >
          {summaryText}
        </p>
      ) : null}

      {author.socials?.length ? (
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          {author.socials.map((social) => (
            <Link
              key={social.url}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-oxblood)] transition-colors hover:text-[var(--color-oxblood-hover)]"
            >
              {social.label}
              <ArrowUpRight className="h-3 w-3" aria-hidden />
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
