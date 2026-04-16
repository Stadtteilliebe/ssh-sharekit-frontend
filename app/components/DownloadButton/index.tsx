"use client";

import { useState, useEffect } from "react";
import { classNames } from "@/lib/classNames";
import { CheckIcon } from "@/public/icons/checkIcon";
import { DownloadIcon } from "@/public/icons/downloadIcon";
import { ArrowDownToLineIcon } from "@/public/icons/arrowDownToLineIcon";

type DownloadButtonProps = {
  href: string;
  filename?: string;
  className?: string;
};

type Status = "idle" | "done";

export function DownloadButton({
  href,
  filename,
  className,
}: DownloadButtonProps) {
  const [status, setStatus] = useState<Status>("idle");

  function handleClick() {
    setStatus("done");
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
        "h-10 w-10 md:h-11 md:w-11",
        "rounded-full border-[1.5px]",
        "transition",
        "cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",

        status === "idle" &&
          "border-[#7761EC] bg-white text-[#7761EC] hover:bg-[#7761EC] hover:text-white",

        status === "done" &&
          "border-[#FF7057] bg-[#FF7057] text-white",

        className
      )}
    >
      <span className="relative flex items-center justify-center">
        {/* Download Icon */}
        <span
          className={classNames(
            "transition-opacity duration-200",
            status === "idle" ? "opacity-100" : "opacity-0"
          )}
        >
          <ArrowDownToLineIcon />
        </span>

        {/* Check Icon */}
        <span
          className={classNames(
            "absolute transition-opacity duration-200",
            status === "done" ? "opacity-100" : "opacity-0"
          )}
        >
          <CheckIcon size={18} />
        </span>
      </span>
    </a>
  );
}