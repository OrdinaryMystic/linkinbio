import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn("mb-10 sm:mb-14", className)}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
          <span className="h-px w-6 bg-[var(--color-oxblood)]" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight leading-[1.05] text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description ? (
        <div className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
          {description}
        </div>
      ) : null}
      {children}
    </header>
  );
}
