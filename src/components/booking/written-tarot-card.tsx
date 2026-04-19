"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Button } from "@/components/button";
import { TAROT_WRITTEN_URL } from "@/lib/config";
import {
  TAROT_WRITTEN_PROMO_URL,
  WEEKEND_PROMO_DISCOUNTED_PRICE,
  WEEKEND_PROMO_END,
  WEEKEND_PROMO_END_DISPLAY,
  WEEKEND_PROMO_ORIGINAL_PRICE,
  isWeekendPromoActive,
} from "@/lib/promo";

export function WrittenTarotCard() {
  const [promoActive, setPromoActive] = useState(false);

  useEffect(() => {
    if (!isWeekendPromoActive()) return;
    setPromoActive(true);

    const msUntilExpiry = WEEKEND_PROMO_END.getTime() - Date.now();
    if (msUntilExpiry <= 0) {
      setPromoActive(false);
      return;
    }
    const timeout = setTimeout(() => setPromoActive(false), msUntilExpiry);
    return () => clearTimeout(timeout);
  }, []);

  if (promoActive) {
    return (
      <div id="written-tarot" className="scroll-mt-24">
      <Card>
        <CardHeader className="space-y-3">
          <div
            className="flex h-10 w-10 items-center justify-center"
            style={{
              backgroundColor: "var(--color-rule)",
              color: "var(--color-ink)",
            }}
          >
            <FileText className="h-5 w-5" />
          </div>
          <CardTitle>Written Reading</CardTitle>
          <CardDescription>
            Your reading delivered as a written report, emailed to you. No call, no
            scheduling. Ideal if you prefer to read and revisit at your own pace.
          </CardDescription>
          <p className="text-sm font-medium text-[var(--color-ink)]">
            <span className="line-through text-[var(--color-muted)]">
              {WEEKEND_PROMO_ORIGINAL_PRICE}
            </span>{" "}
            <span className="font-bold text-[var(--color-oxblood)]">
              {WEEKEND_PROMO_DISCOUNTED_PRICE}
            </span>
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-oxblood)]">
            Limited Sale &middot; Ends {WEEKEND_PROMO_END_DISPLAY}
          </p>
          <p
            className="mt-2 pt-3 text-xs leading-relaxed text-[var(--color-muted)]"
            style={{ borderTop: "1px solid var(--color-rule)" }}
          >
            <span className="font-semibold text-[var(--color-ink)]">Heads up:</span>{" "}
            These readings are discounted because I&apos;ll use them anonymously for YouTube content and to test my Querent tool (a reading companion I&apos;m building). Your identity and personal details stay private.
          </p>
        </CardHeader>
        <CardFooter>
          <Link href={TAROT_WRITTEN_PROMO_URL} target="_blank">
            <Button
              type="button"
              size="sm"
              className="rounded-none bg-[var(--color-oxblood)] text-[var(--color-bone)] hover:bg-[var(--color-oxblood-hover)]"
            >
              Book Now
            </Button>
          </Link>
        </CardFooter>
      </Card>
      </div>
    );
  }

  return (
    <div id="written-tarot" className="scroll-mt-24">
    <Card>
      <CardHeader className="space-y-3">
        <div
          className="flex h-10 w-10 items-center justify-center"
          style={{
            backgroundColor: "var(--color-rule)",
            color: "var(--color-ink)",
          }}
        >
          <FileText className="h-5 w-5" />
        </div>
        <CardTitle>Written Reading</CardTitle>
        <CardDescription>
          Your reading delivered as a written report, emailed to you. No call, no
          scheduling. Ideal if you prefer to read and revisit at your own pace.
        </CardDescription>
        <p className="text-sm font-medium text-[var(--color-ink)]">
          {WEEKEND_PROMO_ORIGINAL_PRICE}
        </p>
      </CardHeader>
      <CardFooter>
        <Link href={TAROT_WRITTEN_URL} target="_blank">
          <Button type="button" size="sm">
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
    </div>
  );
}
