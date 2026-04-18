"use client";

import Giscus from "@giscus/react";

function getGiscusConfig() {
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!repo || !repoId || !category || !categoryId) {
    return null;
  }

  return {
    repo: repo as `${string}/${string}`,
    repoId,
    category,
    categoryId,
  };
}

export function Comments() {
  const config = getGiscusConfig();

  if (!config) {
    return null;
  }

  return (
    <section className="border-t border-[var(--color-ink)] pt-8">
      <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
        <span className="h-px w-6 bg-[var(--color-oxblood)]" aria-hidden />
        Discussion
      </span>
      <div className="mt-5">
      <Giscus
        repo={config.repo}
        repoId={config.repoId}
        category={config.category}
        categoryId={config.categoryId}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
      </div>
    </section>
  );
}
