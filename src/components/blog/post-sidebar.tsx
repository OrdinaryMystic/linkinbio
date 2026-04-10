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
    <aside className="rounded border border-[var(--color-rule)] bg-[var(--color-bone-raised)] p-4 md:sticky md:top-24 md:p-5">
      <div className="space-y-5">
        {hasMethodology ? (
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Methodology
            </h2>
            <p className="text-sm leading-relaxed text-[var(--color-ink)]">{methodology}</p>
          </section>
        ) : null}

        {hasSources ? (
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Sources
            </h2>
            <ul className="space-y-2">
              {sources.map((source) => (
                <li key={source} className="text-sm leading-relaxed">
                  <Link
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-oxblood)] underline decoration-[var(--color-rule)] underline-offset-4 hover:text-[var(--color-oxblood-hover)]"
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
