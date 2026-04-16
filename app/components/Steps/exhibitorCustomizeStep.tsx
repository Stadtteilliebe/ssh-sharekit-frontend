"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DownloadButton } from "../DownloadButton";
import { ShareButton } from "../ShareButton";
import { ShareImage, ShareModal } from "../ShareModal";
import { renderExhibitorCanvas } from "@/lib/sharekit/canvas";
import {
  buildFilename,
  createExhibitorCanvasDownloadUrl,
} from "@/lib/sharekit/download";
import {
  exhibitorAssets,
  exhibitorOptions,
} from "@/lib/sharekit/exhibitorAssets";
import type { ImageFormat } from "@/lib/sharekit/types";
import { classNames } from "@/lib/classNames";
import { FormatSwitch } from "../FormatSwitch";
import { ConfigGroup } from "../ConfigGroup";
import { ConfigSelect } from "../ConfigSelect";
import { ConfigButton } from "../ConfigButton";

export function ExhibitorCustomizeStep() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [shareImage, setShareImage] = useState<ShareImage | null>(null);

  const selectedExhibitorId =
    searchParams.get("item") ?? exhibitorOptions[0]?.id ?? "";

  const selectedFormat =
    (searchParams.get("format") as ImageFormat | null) ?? "landscape";

  const selectedStickerId = searchParams.get("sticker") ?? "none";

  const selectedExhibitor =
    exhibitorOptions.find((item) => item.id === selectedExhibitorId) ??
    exhibitorOptions[0];

  const formatConfig = exhibitorAssets.formats[selectedFormat];
  const availableStickers = useMemo(
    () => formatConfig.stickers,
    [formatConfig],
  );

  const selectedSticker =
    availableStickers.find((item) => item.id === selectedStickerId) ??
    availableStickers[0];

  const filename = buildFilename([
    "exhibitor",
    selectedExhibitor?.name,
    selectedFormat,
    selectedSticker?.label,
  ]);

  function updateUrl(updates: Record<string, string | null | undefined>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
        return;
      }

      params.set(key, value);
    });

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleOpenShare() {
    if (!downloadUrl) return;

    setShareImage({
      id: `${selectedExhibitor?.id}-${selectedFormat}-${selectedSticker?.id ?? "none"}`,
      title: selectedExhibitor?.name ?? "Exhibitor Asset",
      previewSrc: downloadUrl,
      downloadSrc: downloadUrl,
      alt: selectedExhibitor?.name ?? "Exhibitor Asset",
      format: selectedFormat,
      width: formatConfig.width,
      height: formatConfig.height,
      dimension: `${formatConfig.width.toLocaleString("de-DE")} x ${formatConfig.height.toLocaleString("de-DE")} px`,
    });
  }

  function handleCloseShare() {
    setShareImage(null);
  }

  useEffect(() => {
    const stickerStillExists = availableStickers.some(
      (item) => item.id === selectedStickerId,
    );

    if (!stickerStillExists) {
      updateUrl({ sticker: "none" });
    }
  }, [availableStickers, selectedStickerId]);

  useEffect(() => {
    const draw = async () => {
      try {
        await renderExhibitorCanvas({
          canvas: canvasRef.current,
          assetConfig: exhibitorAssets,
          format: selectedFormat,
          exhibitorImageSrc: selectedExhibitor?.imageUrl,
          stickerSrc: selectedSticker?.src ?? null,
        });
      } catch (error) {
        console.error(error);
      }
    };

    void draw();
  }, [selectedFormat, selectedExhibitor, selectedSticker]);

  useEffect(() => {
    const build = async () => {
      try {
        const url = await createExhibitorCanvasDownloadUrl({
          assetConfig: exhibitorAssets,
          format: selectedFormat,
          exhibitorImageSrc: selectedExhibitor?.imageUrl,
          stickerSrc: selectedSticker?.src ?? null,
        });

        setDownloadUrl(url);
      } catch (error) {
        console.error(error);
      }
    };

    void build();
  }, [selectedFormat, selectedExhibitor, selectedSticker]);

  return (
    <>
      <div
        className="grid grid-cols-12 bg-[#282828] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('assets/hubdisrupt-hexblur-background_720.jpg')",
        }}
      >
        <div
          className={classNames(
            "col-span-full lg:col-span-7 xl:col-span-7",
            "pt-12 lg:pt-15",
          )}
        >
          <div
            className={classNames(
              "flex items-center justify-center",
              "pl-0 md:pl-10 w-full aspect-[16/9] lg:h-[calc(100vh-60px)] lg:aspect-auto",
            )}
          >
            <div
              className={classNames(
                "flex items-center justify-center",
                "max-h-full max-w-full",
                "overflow-hidden",
              )}
            >
              <canvas
                ref={canvasRef}
                width={formatConfig.width}
                height={formatConfig.height}
                className={classNames(
                  "block max-w-full",
                  selectedFormat === "landscape"
                    ? "h-auto w-full"
                    : "h-auto max-h-[calc(100vw/16*9)] lg:max-h-[calc(100vh-60px)] w-auto",
                )}
              />
            </div>
          </div>
        </div>

        <div
          className={classNames(
            "flex flex-col",
            "col-span-full lg:col-span-5 xl:col-span-5",
            "lg:pt-15",
            "w-full justify-center",
          )}
        >
          <div className={classNames(
            "flex flex-col",
            "lg:px-5 lg:py-10 xl:px-10 xl:py-20"
          )}>

          <div
            className={classNames(
              "flex flex-col",
              "bg-white",
              "lg:rounded-[20px] justify-between overflow-hidden",
            )}
            >
            <div
              className={classNames(
                "flex flex-col",
                "p-5 lg:p-5 xl:p-10 ",
                "gap-5 lg:gap-5 xl:gap-10",
              )}
            >
              <h2>Dein Sharekit als Exhibitor</h2>
              <div className={classNames(
                "flex flex-col",
                "gap-5"
              )}>

              <ConfigGroup label="Exhibitor">
                <ConfigSelect
                  value={selectedExhibitorId}
                  onChange={(value) =>
                    updateUrl({
                      item: value,
                    })
                  }
                  options={exhibitorOptions.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  />
              </ConfigGroup>

              <ConfigGroup label="Badge">
                <div className="flex flex-wrap gap-2">
                  {availableStickers.map((item) => (
                    <ConfigButton
                    key={item.id}
                    isActive={selectedStickerId === item.id}
                    onClick={() =>
                      updateUrl({
                        sticker: item.id,
                      })
                    }
                    >
                      {item.label}
                    </ConfigButton>
                  ))}
                </div>
              </ConfigGroup>
              <ConfigGroup label="Format">
                <FormatSwitch
                  activeFormat={selectedFormat}
                  onChangeFormat={(format) =>
                    updateUrl({
                      format,
                    })
                  }
                  />
              </ConfigGroup>
            </div>
                  </div>
            <div className={classNames("flex flex-col")}>
              <div
                className={classNames(
                  "flex flex-row md:items-center justify-between",
                  "border-t-[1.5px] border-t border-[#B9AEF3]",
                  "p-10",
                  "gap-5",
                )}
              >
                <div>
                  <p className="text-[13px] font-medium">
                    Dein Sharebild ist fertig
                  </p>
                  <p className="text-[12px] text-[#7761EC]">
                    Jetzt herunterladen oder direkt teilen.
                  </p>
                </div>

                <ActionButtons
                  downloadUrl={downloadUrl}
                  filename={filename}
                  onShare={handleOpenShare}
                />
              </div>
            </div>
          </div>
        </div></div>
      </div>

      <ShareModal image={shareImage} onClose={handleCloseShare} />
    </>
  );
}

function ActionButtons({
  downloadUrl,
  filename,
  onShare,
}: {
  downloadUrl: string;
  filename: string;
  onShare: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <DownloadButton href={downloadUrl} filename={filename} />
      <ShareButton onClickAction={onShare} />
    </div>
  );
}
