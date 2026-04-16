"use client";

import { classNames } from "@/lib/classNames";

type ConfigSelectOption = {
  value: string;
  label: string;
};

type ConfigSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: ConfigSelectOption[];
  className?: string;
};

const inputStyling =
  "h-9 w-full rounded-[8px] border border-neutral-300 bg-white px-3 text-[13px] text-neutral-900 transition";

export function ConfigSelect({
  value,
  onChange,
  options,
  className,
}: ConfigSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={classNames(inputStyling, className,)}
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}