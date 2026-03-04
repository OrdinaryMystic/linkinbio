import { forwardRef } from "react";

/**
 * Two tarot-style cards at different angles, for the Live Reading card.
 * Matches Lucide icon sizing (24x24, stroke-based).
 */
export const TarotCardsIcon = forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(function TarotCardsIcon({ className, size = 24, ...props }, ref) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <rect
        x="4"
        y="3"
        width="10"
        height="14"
        rx="2"
        transform="rotate(-12 9 10)"
      />
      <rect
        x="10"
        y="7"
        width="10"
        height="14"
        rx="2"
        transform="rotate(8 15 14)"
      />
    </svg>
  );
});
