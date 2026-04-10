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
    <section className="rounded border border-[var(--color-rule)] bg-[var(--color-bone)] p-4 sm:p-6">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
        Discussion
      </h2>
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
    </section>
  );
}
