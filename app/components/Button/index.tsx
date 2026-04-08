import React from "react";
import { classNames } from "@/lib/classNames";

type Variant = "primary" | "secondary" | "outline";

type BaseProps = {
  label: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  variant?: Variant;
  className?: string;
  disabled?: boolean;
};

type ButtonAsButton = BaseProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
};

type ButtonAsLink = BaseProps & {
  href: string;
  type?: never;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  primary: classNames(
    "bg-[#7765ec] text-white",
    "border border-[#7765ec]",
    "hover:bg-[#B9AEF3] hover:border-[#B9AEF3]"
  ),
  secondary: classNames(
    "bg-neutral-900 text-white",
    "border border-neutral-900",
    "hover:bg-neutral-800 hover:border-neutral-800"
  ),
  outline: classNames(
    "bg-white",
    "border border-[#7765ec]",
    "hover:bg-[#B9AEF3] hover:text-white hover:border-[#B9AEF3]"
  ),
};

export function Button({
  label,
  onClick,
  variant = "primary",
  className,
  disabled = false,
  ...props
}: ButtonProps) {
  const classes = classNames(
    "inline-flex items-center justify-center",
    "h-[48px] ",
    "rounded-full",
    "px-6 md:px-8",
    "text-[15px] md:text-base no-underline",
    "transition",
    "cursor-pointer",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    className
  );

  if ("href" in props) {
    return (
      <a
        href={props.href}
        className={classes}
        onClick={onClick}
        aria-disabled={disabled}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}