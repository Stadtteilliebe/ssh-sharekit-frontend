"use client";

import { useEffect, useState } from "react";
import { classNames } from "@/lib/classNames";
import { IconButton } from "../IconButton";

type NavProps = {
  title: string;
  onBackAction: () => void;
  backLabel?: string;
  titleVisibility?: "on-scroll" | "always";
  position?: "sticky" | "fixed";
};

export function Nav({
  title,
  onBackAction,
  backLabel = "Zurück",
  titleVisibility = "on-scroll",
  position = "sticky",
}: NavProps) {
  const [showTitle, setShowTitle] = useState(titleVisibility === "always");

  useEffect(() => {
    if (titleVisibility === "always") {
      setShowTitle(true);
      return;
    }

    const handleScroll = () => {
      setShowTitle(window.scrollY >= 60);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [titleVisibility]);

  return (
    <div
      className={classNames(
        "left-0 top-0 z-30 h-12 md:h-15 bg-[#6B92E2] duration-200 transition",
        position === "sticky" ? "sticky" : "fixed w-full",
        showTitle ? "border-[#5EC3D8]" : "border-white"
      )}
    >

      <div className="relative h-full">
        <div className="absolute flex h-full left-5 top-0 md:left-10 lg:left-20 items-center">
          <IconButton onClick={onBackAction} />
        </div>

        <div
          className={classNames(
            "pointer-events-none absolute h-full left-1/2 flex -translate-x-1/2 flex-col justify-center text-[15px] font-medium uppercase transition-all duration-200 text-white",
            showTitle ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
          )}
        >
          {title}
        </div>
      </div>
    </div>
  );
}