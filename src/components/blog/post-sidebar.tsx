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
    <aside className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:sticky md:top-24 md:p-5">
      <div className="space-y-5">
        {hasMethodology ? (
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Methodology
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">{methodology}</p>
          </section>
        ) : null}

        {hasSources ? (
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Sources
            </h2>
            <ul className="space-y-2">
              {sources.map((source) => (
                <li key={source} className="text-sm leading-relaxed">
                  <Link
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-800 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
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
