"use client";

import { classNames } from "@/lib/classNames";

type ImageFormat = "landscape" | "portrait";

type FormatSwitchProps = {
  activeFormat: ImageFormat;
  assetCount?: number;
  showContent?: boolean
  onChangeFormat: (format: ImageFormat) => void;
};

const buttonStyling =
  "h-9 min-w-[64px] rounded-[6px] px-2 text-[13px] transition"

const inactiveButtonStyling =
  "text-white hover:bg-[#816BF6] cursor-pointer";

const activeButtonStyling =
  "bg-white font-medium text-[#7761EC]"

export function FormatSwitch({
  activeFormat,
  assetCount,
  showContent,
  onChangeFormat,
}: FormatSwitchProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      { showContent && <>
      <div className="flex flex-col">
        <span className={classNames(
          "font-medium",
          "text-[13px] lg:text-[14px]"
        )}>
          {activeFormat === "landscape" ? "Querformat" : "Hochkant"}
        </span>
                <span className={classNames(
                  "text-[12px] lg:text-[13px]",
                  "text-[#7761EC]"
                )}>

    {assetCount} Assets{" - "}

          {activeFormat === "landscape" ? "Für LinkedIn" : ""}
        </span>
      </div>
          </>}

      <div className="inline-flex shrink-0 gap-0.5 rounded-[8px] bg-[#7761EC] p-0.5">
        <button
          type="button"
          onClick={() => onChangeFormat("landscape")}
          className={classNames(
            buttonStyling,
            activeFormat === "landscape"
              ? activeButtonStyling
              : inactiveButtonStyling
          )}
        >
          16:9
        </button>

        <button
          type="button"
          onClick={() => onChangeFormat("portrait")}
          className={classNames(
            buttonStyling,
            activeFormat === "portrait"
              ?activeButtonStyling
              : inactiveButtonStyling
          )}
        >
          4:5
        </button>
      </div>
    </div>
  );
}