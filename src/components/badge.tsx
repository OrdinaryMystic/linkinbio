import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-[var(--color-rule)] bg-[var(--color-bone-raised)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
