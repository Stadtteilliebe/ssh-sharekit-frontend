"use client";

import { useMemo, useState } from "react";
import { generalImages } from "@/lib/sharekit/generalImages";
import { classNames } from "@/lib/classNames";
import { Nav } from "../Navigation";
import { ShareButton } from "../ShareButton";
import { ShareImage, ShareModal } from "../ShareModal";
import { DownloadButton } from "../DownloadButton";
import { GENERAL_ASSET_STEP } from "@/lib/sharekit/content";
import { FormatSwitch } from "../FormatSwitch";

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

  const newLocal = "text-white hover:bg-[#816BF6] cursor-pointer";
  return (
    <>
      <section className="bg-white">
<Nav
  title={GENERAL_ASSET_STEP.title}
  onBackAction={onBackAction}
  titleVisibility="on-scroll"
  position="sticky"
/>

        <div
          className={classNames(
            "flex flex-col",
            "px-5 md:px-10 lg:px-20",
            "gap-10",
          )}
        >
          <h1>{GENERAL_ASSET_STEP.title}</h1>
          <div className={classNames(
            "flex flex-col",
            "gap-5"
          )}>
            <FormatSwitch
              activeFormat={activeFormat}
              assetCount={filteredImages.length}
              onChangeFormat={setActiveFormat}
              showContent={true}
            />

            <div className="grid grid-cols-12 gap-2.5 md:gap-5">
              {filteredImages.map((img) => (
                <article
                  key={img.id}
                  className={classNames(
                    "overflow-hidden rounded-[8px] border-[1.5px] border-[#B9AEF3] bg-white",
                    activeFormat === "landscape"
                      ? "col-span-12 md:col-span-6"
                      : "col-span-12 md:col-span-6 xl:col-span-4",
                  )}
                >
                  <div
                    className={classNames(
                      "flex items-center justify-center bg-neutral-100",
                      img.format === "landscape"
                        ? "aspect-[16/9]"
                        : "aspect-[4/5]",
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
                      <p className="text-[12px] text-[#7761EC]">
                        {img.dimension}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <DownloadButton href={img.downloadSrc} />
                      <ShareButton onClickAction={() => handleOpenShare(img)} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
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
