import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function withUtmParams(
  url: string,
  params: Record<string, string>,
): string {
  try {
    const base = url.startsWith("/") ? "https://placeholder.com" : undefined;
    const parsed = new URL(url, base);
    for (const [key, value] of Object.entries(params)) {
      parsed.searchParams.set(key, value);
    }
    return url.startsWith("/")
      ? parsed.pathname + parsed.search
      : parsed.toString();
  } catch {
    const separator = url.includes("?") ? "&" : "?";
    const query = new URLSearchParams(params).toString();
    return `${url}${separator}${query}`;
  }
}

