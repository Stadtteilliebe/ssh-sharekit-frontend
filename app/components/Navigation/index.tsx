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
    <div className={classNames(
      "sticky top-0 z-30 h-15 border-b-[1.5px] bg-white/90 backdrop-blur-lg duration-200 transition",
      showTitle ? "border-[#5EC3D8]" : "border-white"
      )}>
      <div className="">
        <button
          type="button"
          onClick={onBackAction}
          className="absolute w-fit rounded-xl border border-neutral-300 bg-white/80 px-4 py-2 text-sm transition hover:border-neutral-500"
        >
          {backLabel}
        </button>

        <div
          className={classNames(
            "pointer-events-none absolute left-1/2 -translate-x-1/2 text-[15px] font-medium transition-all duration-200 h-15 flex flex-col justify-center",
            showTitle
              ? "translate-y-0 opacity-100"
              : "translate-y-1 opacity-0"
          )}
        >
          {title}
        </div>

        <div aria-hidden="true" />
      </div>
    </div>
  );
}