// Weekend tarot promo window.
// End: Sunday 2026-04-19 23:59:59 Central (CDT, UTC-5)
// Auto-hide: Monday 2026-04-20 00:00:00 Central = 2026-04-20T05:00:00Z
export const WEEKEND_PROMO_END = new Date("2026-04-20T05:00:00Z");

export const WEEKEND_PROMO_ORIGINAL_PRICE = "$40";
export const WEEKEND_PROMO_DISCOUNTED_PRICE = "$25";

export const WEEKEND_PROMO_END_DISPLAY = "Sun 4/19, 11:59pm CT";

export const TAROT_WRITTEN_PROMO_URL =
  "https://buy.stripe.com/cNicN70DOeSZ07cbrZ6Zy0q";

export function isWeekendPromoActive(now: Date = new Date()): boolean {
  return now.getTime() < WEEKEND_PROMO_END.getTime();
}
