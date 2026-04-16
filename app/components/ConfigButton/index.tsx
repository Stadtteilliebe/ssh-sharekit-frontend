"use client";

import { classNames } from "@/lib/classNames";

type ConfigButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const configButtonStyling =
  "h-9 rounded-[8px] px-3 text-[13px] transition";

export function ConfigButton({
  isActive,
  onClick,
  children,
  className,
}: ConfigButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        configButtonStyling,
        isActive
          ? "border border-[#7761EC] bg-[#7761EC] font-medium text-white"
          : "border border-neutral-300 bg-white text-neutral-700 hover:border-[#7761EC] hover:text-[#7761EC]",
        className,
      )}
    >
      {children}
    </button>
  );
}