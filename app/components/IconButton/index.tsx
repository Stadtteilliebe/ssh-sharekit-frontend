"use client";

import { classNames } from "@/lib/classNames";
import { ArrowLeftIcon } from "@/public/icons/arrowLeftIcon";
import { CheckIcon } from "@/public/icons/checkIcon";

type IconButtonProps = {
  onClick: () => void;
  className?: string;
  label?: string;
};

export function IconButton({
  onClick,
  className,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "inline-flex items-center justify-center",
        "h-11 w-11 md:h-11 md:w-11",
        "rounded-full",
        // "border-[1.5px]",
        "text-[15px] md:text-base",
        "transition-all",
        "cursor-pointer",
        // Default styling
        // "bg-[#f7f7f7] border-[#5EC3D8]
        // Styling onHover
        "hover:bg-[#5f4ebd] hover:border-[#5f4ebd]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className
      )}
    >
      <ArrowLeftIcon size={24} />
    </button>
  );
}