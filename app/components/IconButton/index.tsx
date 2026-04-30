"use client";

import { ReactNode } from "react";
import { classNames } from "@/lib/classNames";

type IconButtonProps = {
  onClick: () => void;
  className?: string;
  label?: string;
  children: ReactNode;
};

export function IconButton({
  onClick,
  className,
  label,
  children,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={classNames(
        "inline-flex items-center justify-center",
        "h-11 w-11 md:h-11 md:w-11",
        "rounded-full",
        "text-[15px] md:text-base",
        "transition-all",
        "cursor-pointer",
        "hover:bg-[#5f4ebd] hover:text-white hover:border-[#5f4ebd]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className,
      )}
    >
      {children}
    </button>
  );
}