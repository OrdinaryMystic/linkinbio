import Link from "next/link";

type PostSidebarProps = {
  methodology?: string;
  sources?: string[];
};

export function PostSidebar({ methodology, sources = [] }: PostSidebarProps) {
  const hasMethodology = Boolean(methodology?.trim());
  const hasSources = sources.length > 0;

  if (!hasMethodology && !hasSources) {
    return null;
  }

  return (
    <aside className="md:sticky md:top-24">
      <div className="space-y-8 border-t-2 border-[var(--color-ink)] pt-6">
        {hasMethodology ? (
          <section>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
              Methodology
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]">
              {methodology}
            </p>
          </section>
        ) : null}

        {hasSources ? (
          <section>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
              Sources
            </h2>
            <ul className="mt-3 divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
              {sources.map((source) => (
                <li key={source}>
                  <Link
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block break-words py-2.5 text-sm leading-relaxed text-[var(--color-oxblood)] transition-colors hover:text-[var(--color-oxblood-hover)]"
                  >
                    {source}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </aside>
  );
}
