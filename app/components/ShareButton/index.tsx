"use client";

import { classNames } from "@/lib/classNames";

type ShareButtonProps = {
  onClickAction: () => void;
  className?: string;
  label?: string;
};

export function ShareButton({
  onClickAction,
  className,
  label = "Teilen",
}: ShareButtonProps) {
  return (
    <button
      type="button"
      onClick={onClickAction}
      className={classNames(
        "inline-flex items-center justify-center",
        "h-10 md:h-11",
        "rounded-full",
        "border-[1.5px]",
        "px-4 md:px-6",
        "text-[14px] md:text-[15px]",
        "transition-all",
        "cursor-pointer",
        // Default styling
        "bg-[#FF7526] border-[#FF7526] text-white",
        // Styling onHover
        "hover:bg-[#FF7057] hover:border-[#FF7057]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className
      )}
    >
      {label}
    </button>
  );
}