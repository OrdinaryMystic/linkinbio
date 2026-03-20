"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const MILESTONES = [25, 50, 90] as const;

export function ReaderMilestone({ slug }: { slug: string }) {
  useEffect(() => {
    const seen = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const value = Number(entry.target.getAttribute("data-milestone"));
          if (!Number.isFinite(value) || seen.has(value)) continue;
          seen.add(value);

          trackEvent("reader_milestone", {
            post_slug: slug,
            milestone_percent: value,
          });
        }
      },
      { threshold: 0.5 },
    );

    const markers = MILESTONES.map((milestone) => {
      const marker = document.createElement("div");
      marker.setAttribute("data-milestone", String(milestone));
      marker.style.position = "absolute";
      marker.style.left = "0";
      marker.style.width = "1px";
      marker.style.height = "1px";
      marker.style.pointerEvents = "none";
      marker.style.opacity = "0";
      return marker;
    });

    const updateMarkerPositions = () => {
      const totalHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      );

      markers.forEach((marker) => {
        const milestone = Number(marker.getAttribute("data-milestone"));
        marker.style.top = `${Math.floor((totalHeight * milestone) / 100)}px`;
      });
    };

    const root = document.body;
    for (const marker of markers) {
      root.appendChild(marker);
      observer.observe(marker);
    }
    updateMarkerPositions();
    window.addEventListener("resize", updateMarkerPositions);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateMarkerPositions);
      for (const marker of markers) {
        marker.remove();
      }
    };
  }, [slug]);

  return null;
}

