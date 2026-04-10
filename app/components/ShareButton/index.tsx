"use client";

import { classNames } from "@/lib/classNames";
import { ShareIcon } from "@/public/icons/shareIcon";


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
      aria-label={label}
      title={label}
      className={classNames(
        "inline-flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition",
        "hover:border-neutral-500 hover:bg-neutral-50",
        "focus:outline-none focus:ring-2 focus:ring-black/10",
            "cursor-pointer",
        className
      )}
    >
      <ShareIcon size={18} />
    </button>
  );
}