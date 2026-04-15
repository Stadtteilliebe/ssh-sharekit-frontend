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
  const availableStickers = useMemo(() => formatConfig.stickers, [formatConfig]);

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
      (item) => item.id === selectedStickerId
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
      <div className="grid grid-cols-12 bg-[#F6F6F6]">
<div className="col-span-7 pt-20">
  <div className="flex h-[calc(100vh-80px)] items-center justify-center">
    <div className="flex max-h-full max-w-full items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        width={formatConfig.width}
        height={formatConfig.height}
        className={classNames(
          "block max-w-full",
          selectedFormat === "landscape"
            ? "h-auto w-full"
            : "h-auto max-h-[80vh] w-auto"
        )}
      />
    </div>
  </div>
</div>

        <div className="flex flex-col col-span-5 p-20">

          <ConfigGroup label="Exhibitor">
            <select
              value={selectedExhibitorId}
              onChange={(e) =>
                updateUrl({
                  item: e.target.value,
                })
              }
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3"
            >
              {exhibitorOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
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

          <ConfigGroup label="Störer">
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

          <div className="mt-6">
            <ActionButtons
              downloadUrl={downloadUrl}
              filename={filename}
              onShare={handleOpenShare}
            />
          </div>
        </div>
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

function ConfigGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-sm font-medium text-neutral-700">{label}</p>
      {children}
    </div>
  );
}

function ConfigButton({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "rounded-xl px-4 py-3 text-sm transition",
        isActive
          ? "bg-black text-white"
          : "border border-neutral-300 bg-white text-neutral-700"
      )}
    >
      {children}
    </button>
  );
}