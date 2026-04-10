"use client";

import { useState, useEffect } from "react";
import { classNames } from "@/lib/classNames";
import { CheckIcon } from "@/public/icons/checkIcon";

type DownloadButtonProps = {
  href: string;
  filename?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

type Status = "idle" | "done";

export function DownloadButton({
  href,
  filename,
  children = "Download",
  className,
  onClick,
}: DownloadButtonProps) {
  const [status, setStatus] = useState<Status>("idle");

  function handleClick() {
    setStatus("done");
    onClick?.();
  }

  useEffect(() => {
    if (status !== "done") return;

    const t = setTimeout(() => {
      setStatus("idle");
    }, 2000);

    return () => clearTimeout(t);
  }, [status]);

  return (
    <a
      href={href}
      download={filename ?? true}
      onClick={handleClick}
      className={classNames(
        "inline-flex items-center justify-center",
        "relative h-11 md:h-12 min-w-[120px] md:min-w-[148px]",
        "rounded-full border",
        "px-2 md:px-8",
        "text-[15px] md:text-base no-underline",
        "transition",
        "cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        status === "idle" &&
          "border-[#6B92E2] bg-[#6B92E2] text-white hover:border-neutral-800 hover:bg-neutral-800",
        status === "done" && "border-green-600 bg-green-600 text-white",
        className
      )}
    >
      <span
        className={classNames(
          "flex items-center justify-center gap-2 transition-opacity duration-200",
          status === "idle" ? "opacity-100" : "opacity-0"
        )}
      >
        {children}
      </span>

      <span
        className={classNames(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-200",
          status === "done" ? "opacity-100" : "opacity-0"
        )}
      >
        <CheckIcon />
      </span>
    </a>
  );
}