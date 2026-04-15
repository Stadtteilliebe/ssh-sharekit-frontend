"use client";

import { useEffect, useState } from "react";
import { classNames } from "@/lib/classNames";
import { IconButton } from "../IconButton";

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
    <div
    className={classNames(
      "sticky top-0 z-30 h-20 bg-white/90 backdrop-blur-[20px] duration-200 transition",
      showTitle ? "border-[#5EC3D8]" : "border-white"
    )}
    >
    <div className="pointer-events-none absolute left-0 top-0 h-12 w-full bg-gradient-to-b from-white to-transparent" />
  <div className="relative h-full">
    {/* Back Button */}
    <div className="absolute left-5 md:left-10 lg:left-20 top-4">
      <IconButton onClick={onBackAction} />
    </div>

    {/* Title */}
    <div
      className={classNames(
        "pointer-events-none absolute left-1/2 -translate-x-1/2 text-[15px] uppercase font-medium transition-all duration-200 h-20 flex flex-col justify-center",
        showTitle
          ? "translate-y-0 opacity-100"
          : "translate-y-1 opacity-0"
      )}
    >
      {title}
    </div>
  </div>
</div>
  );
}