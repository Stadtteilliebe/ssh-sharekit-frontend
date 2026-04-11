"use client";

import { useMemo, useState } from "react";
import { generalImages } from "@/lib/sharekit/generalImages";
import { classNames } from "@/lib/classNames";
import { StickyStepNav } from "../../Navigation";

import { ShareButton } from "../../ShareButton";
import { ShareImage, ShareModal } from "../../ShareModal";
import { DownloadButton } from "../../DownloadButton";

type ImageFormat = "landscape" | "portrait";

export function GeneralGalleryStep({
  onBackAction,
}: {
  onBackAction: () => void;
}) {
  const [activeFormat, setActiveFormat] = useState<ImageFormat>("landscape");
  const [shareImage, setShareImage] = useState<ShareImage | null>(null);

  const filteredImages = useMemo(() => {
    return generalImages.filter((image) => image.format === activeFormat);
  }, [activeFormat]);

  function handleOpenShare(img: ShareImage) {
    setShareImage(img);
  }

  function handleCloseShare() {
    setShareImage(null);
  }

  return (
    <>
      <section className="bg-white">
        <StickyStepNav
          title="Allgemeine Assets"
          onBackAction={onBackAction}
        />

        <div className="flex flex-col p-5 md:p-20 gap-5">
          <h1 className="text-2xl font-medium uppercase md:text-4xl">
            Allgemeine Assets
          </h1>
<div className="flex w-full items-center justify-between gap-4">
  
  {/* Linke Seite: Info */}
  <div className="flex flex-col">
    <span className="text-[13px] font-medium">
      {activeFormat === "landscape" ? "Querformat" : "Hochkant"}
    </span>
    <span className="text-[12px] text-[#FF7526]">
      {filteredImages.length} Assets {activeFormat === "landscape" ? "- Für LinkedIn" : ""}
    </span>
  </div>

  {/* Rechte Seite: Toggle */}
  <div className="inline-flex shrink-0 rounded-[8px] bg-[#FF7057] p-[2px]">
    <button
      type="button"
      onClick={() => setActiveFormat("landscape")}
      className={classNames(
        "min-w-[64px] rounded-[6px] h-9 px-2 text-[13px] transition",
        activeFormat === "landscape"
          ? "bg-white text-[#FF7057] font-medium"
          : "text-neutral-700"
      )}
    >
      16:9
    </button>

    <button
      type="button"
      onClick={() => setActiveFormat("portrait")}
      className={classNames(
        "min-w-[64px] rounded-[6px] h-9 px-2 text-[13px] transition",
        activeFormat === "portrait"
          ? "bg-white text-[#FF7057] font-medium "
          : "text-neutral-700"
      )}
    >
      4:5
    </button>
  </div>
</div>
              

          <div className="grid grid-cols-12 gap-2.5 md:gap-5">
            {filteredImages.map((img) => (
              <article
                key={img.id}
                className={classNames(
                  "overflow-hidden rounded-[8px] border-[1.5px] border-[#B9AEF3] bg-white",
                  activeFormat === "landscape"
                    ? "col-span-12 md:col-span-6"
                    : "col-span-12 md:col-span-6 xl:col-span-4"
                )}
              >
                <div
                  className={classNames(
                    "flex items-center justify-center bg-neutral-100",
                    img.format === "landscape"
                      ? "aspect-[16/9]"
                      : "aspect-[4/5]"
                  )}
                >
                  <img
                    src={img.previewSrc}
                    alt={img.alt}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex items-center justify-between p-5 gap-5">
                  <div>
                    <p className="text-[13px] font-medium">{img.title}</p>
                    <p className="text-[12px] text-[#7761EC]">{img.dimension}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <DownloadButton href={img.downloadSrc} />
                    <ShareButton onClick={() => handleOpenShare(img)} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="rounded-2xl bg-neutral-50 p-8 text-center text-neutral-500">
              Für dieses Format sind aktuell keine Bilder vorhanden.
            </div>
          )}
        </div>
      </section>

      <ShareModal image={shareImage} onClose={handleCloseShare} />
    </>
  );
}