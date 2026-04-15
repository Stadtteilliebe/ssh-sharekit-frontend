"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DownloadButton } from "../DownloadButton";
import { ShareButton } from "../ShareButton";
import { renderTextCanvas } from "@/lib/sharekit/canvas";
import { buildFilename, createCanvasDownloadUrl } from "@/lib/sharekit/download";
import { partnerAssets, partnerOptions } from "@/lib/sharekit/partnerAssets";
import type { ImageFormat } from "@/lib/sharekit/types";

export function PartnerCustomizeStep() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [selectedPartnerId, setSelectedPartnerId] = useState(
    partnerOptions[0]?.id ?? ""
  );
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>("landscape");
  const [selectedStickerId, setSelectedStickerId] = useState("none");
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const selectedPartner =
    partnerOptions.find((item) => item.id === selectedPartnerId) ??
    partnerOptions[0];

  const formatConfig = partnerAssets.formats[selectedFormat];
  const availableStickers = useMemo(() => formatConfig.stickers, [formatConfig]);

  const selectedSticker =
    availableStickers.find((item) => item.id === selectedStickerId) ??
    availableStickers[0];

  useEffect(() => {
    const stickerStillExists = availableStickers.some(
      (item) => item.id === selectedStickerId
    );

    if (!stickerStillExists) {
      setSelectedStickerId("none");
    }
  }, [availableStickers, selectedStickerId]);

  useEffect(() => {
    const draw = async () => {
      try {
        await renderTextCanvas({
          canvas: canvasRef.current,
          assetConfig: partnerAssets,
          format: selectedFormat,
          displayName: selectedPartner?.name ?? "",
          stickerSrc: selectedSticker?.src ?? null,
        });
      } catch (error) {
        console.error(error);
      }
    };

    void draw();
  }, [selectedFormat, selectedPartner, selectedSticker]);

  useEffect(() => {
    const build = async () => {
      try {
        const url = await createCanvasDownloadUrl({
          assetConfig: partnerAssets,
          format: selectedFormat,
          displayName: selectedPartner?.name ?? "",
          stickerSrc: selectedSticker?.src ?? null,
        });

        setDownloadUrl(url);
      } catch (error) {
        console.error(error);
      }
    };

    void build();
  }, [selectedFormat, selectedPartner, selectedSticker]);

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div>
        <ConfigGroup label="Partner">
          <select
            value={selectedPartnerId}
            onChange={(e) => setSelectedPartnerId(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3"
          >
            {partnerOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </ConfigGroup>

        <ConfigGroup label="Format">
          <div className="flex flex-wrap gap-2">
            <ConfigButton
              isActive={selectedFormat === "landscape"}
              onClick={() => setSelectedFormat("landscape")}
            >
              Landscape
            </ConfigButton>
            <ConfigButton
              isActive={selectedFormat === "portrait"}
              onClick={() => setSelectedFormat("portrait")}
            >
              Portrait
            </ConfigButton>
          </div>
        </ConfigGroup>

        <ConfigGroup label="Störer">
          <div className="flex flex-wrap gap-2">
            {availableStickers.map((item) => (
              <ConfigButton
                key={item.id}
                isActive={selectedStickerId === item.id}
                onClick={() => setSelectedStickerId(item.id)}
              >
                {item.label}
              </ConfigButton>
            ))}
          </div>
        </ConfigGroup>

        <div className="mt-6 flex items-center gap-3">
          <DownloadButton
            href={downloadUrl}
            filename={buildFilename([
              "partner",
              selectedPartner?.name,
              selectedFormat,
              selectedSticker?.label,
            ])}
          />
          <ShareButton onClickAction={() => console.log("share partner")} />
        </div>
      </div>

      <div className="bg-neutral-100 p-10">
        <div className={`overflow-hidden bg-white ${formatConfig.previewClassName}`}>
          <canvas
            ref={canvasRef}
            width={formatConfig.width}
            height={formatConfig.height}
            className="block h-full w-full"
          />
        </div>
      </div>
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
      className={`rounded-xl px-4 py-3 text-sm transition ${
        isActive
          ? "bg-black text-white"
          : "border border-neutral-300 bg-white text-neutral-700"
      }`}
    >
      {children}
    </button>
  );
}