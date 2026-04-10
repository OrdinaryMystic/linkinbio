import Link from "next/link";
import {
  getTaxonomyEntity,
  type TaxonomyEntityType,
  type TaxonomyEntity,
} from "@/data/taxonomy";
import { formatSlugLabel } from "@/lib/blog-taxonomy-utils";

type RelatedEntitiesProps = {
  entity: TaxonomyEntity;
};

const routeByType: Record<TaxonomyEntityType, string> = {
  planets: "planets",
  signs: "signs",
  houses: "houses",
  cards: "cards",
};

export function RelatedEntities({ entity }: RelatedEntitiesProps) {
  const relatedEntries = Object.entries(entity.related ?? {}) as [
    TaxonomyEntityType,
    string[],
  ][];
  const hasTerms = (entity.relatedTerms?.length ?? 0) > 0;
  const hasEntities = relatedEntries.some(([, values]) => values.length > 0);
  if (!hasTerms && !hasEntities) return null;

  return (
    <section className="rounded border border-[var(--color-rule)] bg-[var(--color-bone)] p-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
        Related Entities
      </h2>
      <div className="mt-3 space-y-3">
        {relatedEntries.map(([type, values]) =>
          values.length > 0 ? (
            <div key={type} className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">{type}</p>
              <div className="flex flex-wrap gap-2">
                {values.map((slug) => {
                  const relatedEntity = getTaxonomyEntity(type, slug);
                  return (
                    <Link
                      key={`${type}-${slug}`}
                      href={`/blog/${routeByType[type]}/${slug}`}
                      className="rounded-full border border-[var(--color-rule)] bg-[var(--color-bone-raised)] px-3 py-1 text-xs font-medium text-[var(--color-ink)] hover:bg-[var(--color-bone)]"
                    >
                      {relatedEntity?.title ?? formatSlugLabel(slug)}
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null,
        )}
        {entity.relatedTerms?.length ? (
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">Correspondences</p>
            <div className="flex flex-wrap gap-2">
              {entity.relatedTerms.map((term) => (
                <span
                  key={term}
                  className="rounded-full border border-[var(--color-rule)] bg-[var(--color-bone-raised)] px-3 py-1 text-xs font-medium text-[var(--color-ink)]"
                >
                  {formatSlugLabel(term)}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
