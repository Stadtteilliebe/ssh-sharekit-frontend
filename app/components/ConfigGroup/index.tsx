"use client";

import { classNames } from "@/lib/classNames";

type ConfigGroupProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export function ConfigGroup({
  label,
  children,
  className,
}: ConfigGroupProps) {
  return (
    <div
      className={classNames(
        "flex flex-row justify-between w-full gap-2.5",
        className,
      )}
    ><div>

      <h4>
        {label}
      </h4>
    </div>

      <div className={classNames(
        "w-60 md:w-80"
      )}>
        {children}
      </div>
    </div>
  );
}