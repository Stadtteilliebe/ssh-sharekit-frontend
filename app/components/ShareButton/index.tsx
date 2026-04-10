"use client";

import { classNames } from "@/lib/classNames";

type ShareButtonProps = {
  onClick: () => void;
  className?: string;
  label?: string;
};

export function ShareButton({
  onClick,
  className,
  label = "Teilen",
}: ShareButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "inline-flex items-center justify-center",
        "h-10 md:h-11",
        "rounded-full",
        "border-[1.5px]",
        "px-4 md:px-6",
        "text-[15px] md:text-base",
        "transition-all",
        "cursor-pointer",
        // Default styling
        "bg-[#7761EC] border-[#7761EC] text-white",
        // Styling onHover
        "hover:bg-[#5f4ebd] hover:border-[#5f4ebd]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className
      )}
    >
      {label}
    </button>
  );
}