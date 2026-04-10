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

        <div className="flex flex-col px-5 md:px-20">
          <h1 className="text-2xl font-medium uppercase md:text-4xl">
            Allgemeine Bilder
          </h1>
<div className="flex flex-row space-between">

            {filteredImages.length} Motive 
          <div className="inline-flex w-fit rounded-2xl bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => setActiveFormat("landscape")}
              className={classNames(
                "rounded-xl px-4 py-2 text-sm font-medium transition",
                activeFormat === "landscape"
                ? "bg-black text-white"
                : "text-neutral-700"
              )}
              >
              Quer
            </button>

            <button
              type="button"
              onClick={() => setActiveFormat("portrait")}
              className={classNames(
                "rounded-xl px-4 py-2 text-sm font-medium transition",
                activeFormat === "portrait"
                ? "bg-black text-white"
                : "text-neutral-700"
              )}
              >
              Hoch
            </button>
          </div>
              </div>

          <div className="mt-8 grid grid-cols-12 gap-4">
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

                <div className="flex items-center justify-between gap-4 p-4">
                  <div>
                    <p className="text-sm opacity-80">Größe</p>
                    <p className="text-sm">{img.dimension}</p>
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
            <div className="mt-8 rounded-2xl bg-neutral-50 p-8 text-center text-neutral-500">
              Für dieses Format sind aktuell keine Bilder vorhanden.
            </div>
          )}
        </div>
      </section>

      <ShareModal image={shareImage} onClose={handleCloseShare} />
    </>
  );
}