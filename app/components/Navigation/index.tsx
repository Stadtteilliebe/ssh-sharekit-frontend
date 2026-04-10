"use client";

import { useEffect, useState } from "react";
import { classNames } from "@/lib/classNames";

type StickyStepNavProps = {
  title: string;
  onBackAction: () => void;
  backLabel?: string;
};

export function StickyStepNav({
  title,
  onBackAction,
  backLabel = "Zurück",
}: StickyStepNavProps) {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTitle(window.scrollY >= 60);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="sticky top-0 z-30 -mx-4 mb-6 border-b border-black/5 bg-white/90 px-4 py-3 backdrop-blur-md md:-mx-6 md:px-6">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackAction}
          className="w-fit rounded-xl border border-neutral-300 bg-white/80 px-4 py-2 text-sm transition hover:border-neutral-500"
        >
          {backLabel}
        </button>

        <div
          className={classNames(
            "pointer-events-none absolute left-1/2 -translate-x-1/2 text-sm font-medium uppercase tracking-wide text-neutral-900 transition-all duration-200 md:text-base",
            showTitle
              ? "translate-y-0 opacity-100"
              : "translate-y-1 opacity-0"
          )}
        >
          {title}
        </div>

        <div className="w-[76px] shrink-0" aria-hidden="true" />
      </div>
    </div>
  );
}