"use client";

import { classNames } from "@/lib/classNames";

type Option<T extends string> = {
  label: string;
  value: T;
};

type ToggleProps<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export function Toggle<T extends string>({
  options,
  value,
  onChange,
  className,
}: ToggleProps<T>) {
  return (
    <div
      className={classNames(
        "inline-flex rounded-[12px] bg-[#f6f6f6] p-1 gap-1",
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={classNames(
              "inline-flex items-center justify-center",
              "h-[44px]",
              "rounded-[8px]",
              "px-4 md:px-6",
              "text-[15px] md:text-base no-underline",
              "transition",
              "cursor-pointer",
              isActive
                ? "bg-[#282828] text-white"
                : ""
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}