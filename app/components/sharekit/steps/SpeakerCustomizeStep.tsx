"use client";

import { Motif } from "@/lib/sharekit/motifs";
import { useEffect, useMemo, useRef, useState } from "react";

const speakerOptions = ["Anton 1", "Anton 2", "Anton 3"] as const;

type FormatId = "portrait" | "landscape";

type SpeakerCustomizeStepProps = {
  motif: Motif | null;
  onChangeMotif: () => void;
};

export function SpeakerCustomizeStep({
  motif,
  onChangeMotif,
}: SpeakerCustomizeStepProps) {
  if (!motif) return null;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("Anton 1");
  const [selectedFormat, setSelectedFormat] = useState<FormatId>("landscape");
  const [selectedStickerId, setSelectedStickerId] = useState<string>("none");

  const formatConfig = motif.formats[selectedFormat];

  const availableStickers = useMemo(() => {
    return formatConfig.stickers;
  }, [formatConfig]);

  const selectedSticker =
    availableStickers.find((sticker) => sticker.id === selectedStickerId) ??
    availableStickers[0];

  useEffect(() => {
    const stickerStillExists = availableStickers.some(
      (sticker) => sticker.id === selectedStickerId
    );

    if (!stickerStillExists) {
      setSelectedStickerId("none");
    }
  }, [availableStickers, selectedStickerId]);

  useEffect(() => {
    const draw = async () => {
      try {
        await renderCanvas({
          canvas: canvasRef.current,
          baseImageSrc: formatConfig.imageSrc,
          stickerSrc: selectedSticker?.src ?? null,
          speakerName: selectedSpeaker,
          width: formatConfig.width,
          height: formatConfig.height,
          format: selectedFormat,
        });
      } catch (error) {
        console.error(error);
      }
    };

    void draw();
  }, [formatConfig, selectedSticker, selectedSpeaker, selectedFormat]);

  const downloadImage = async () => {
    try {
      const exportCanvas = document.createElement("canvas");

      await renderCanvas({
        canvas: exportCanvas,
        baseImageSrc: formatConfig.imageSrc,
        stickerSrc: selectedSticker?.src ?? null,
        speakerName: selectedSpeaker,
        width: formatConfig.width,
        height: formatConfig.height,
        format: selectedFormat,
      });

      const link = document.createElement("a");
      link.href = exportCanvas.toDataURL("image/png");
      link.download = buildFilename({
        motifTitle: motif.title,
        speakerName: selectedSpeaker,
        formatLabel: formatConfig.label,
        stickerLabel: selectedSticker?.label ?? "kein-stoerer",
      });
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">{motif.title}</h2>
            <button
              onClick={onChangeMotif}
              className="mt-1 text-sm text-[#7765ec] underline underline-offset-2"
            >
              Motiv ändern
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="speaker-select"
            className="mb-2 block text-sm font-medium text-neutral-700"
          >
            Name
          </label>

          <select
            id="speaker-select"
            value={selectedSpeaker}
            onChange={(e) => setSelectedSpeaker(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none transition focus:border-neutral-500"
          >
            {speakerOptions.map((speaker) => (
              <option key={speaker} value={speaker}>
                {speaker}
              </option>
            ))}
          </select>
        </div>

        <ConfigGroup label="Format">
          <div className="flex flex-wrap gap-2">
            <ConfigButton
              isActive={selectedFormat === "landscape"}
              onClick={() => setSelectedFormat("landscape")}
            >
              16:9
            </ConfigButton>

            <ConfigButton
              isActive={selectedFormat === "portrait"}
              onClick={() => setSelectedFormat("portrait")}
            >
              4:5
            </ConfigButton>
          </div>
        </ConfigGroup>

        <ConfigGroup label="Störer">
          <div className="flex flex-wrap gap-2">
            {availableStickers.map((sticker) => (
              <ConfigButton
                key={sticker.id}
                isActive={selectedStickerId === sticker.id}
                onClick={() => setSelectedStickerId(sticker.id)}
              >
                {sticker.label}
              </ConfigButton>
            ))}
          </div>
        </ConfigGroup>

        <button
          onClick={downloadImage}
          className="mt-6 w-full rounded-xl bg-black px-4 py-3 text-white"
        >
          {selectedSpeaker} herunterladen
        </button>
      </div>

      <div className="bg-neutral-100 p-10">
        <div
          className={`overflow-hidden bg-white ${formatConfig.previewClassName}`}
        >
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

async function renderCanvas({
  canvas,
  baseImageSrc,
  stickerSrc,
  speakerName,
  width,
  height,
  format,
}: {
  canvas: HTMLCanvasElement | null;
  baseImageSrc: string;
  stickerSrc: string | null;
  speakerName: string;
  width: number;
  height: number;
  format: FormatId;
}) {
  if (!canvas) return;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, width, height);

  const baseImage = await loadImage(baseImageSrc);
  ctx.drawImage(baseImage, 0, 0, width, height);

  if (stickerSrc) {
    const sticker = await loadImage(stickerSrc);
    drawSticker(ctx, sticker, width, height);
  }

  drawSpeakerName(ctx, speakerName, width, height, format);
}

function drawSpeakerName(
  ctx: CanvasRenderingContext2D,
  name: string,
  width: number,
  height: number,
  format: FormatId
) {
  ctx.save();

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";

  const fontSize =
    format === "portrait"
      ? Math.round(width * 0.05)
      : Math.round(width * 0.04);

  ctx.font = `400 ${fontSize}px Rubik`;

  const x = width / 2;
  const y = format === "portrait" ? height * 0.78 : height * 0.82;

  ctx.fillText(name, x, y);

  ctx.restore();
}

function drawSticker(
  ctx: CanvasRenderingContext2D,
  sticker: HTMLImageElement,
  width: number,
  height: number
) {
  const stickerWidth = width * 0.24;
  const stickerHeight = (sticker.height / sticker.width) * stickerWidth;
  const x = width - stickerWidth - width * 0.05;
  const y = height * 0.06;

  ctx.drawImage(sticker, x, y, stickerWidth, stickerHeight);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error(`Bild konnte nicht geladen werden: ${src}`));
    img.src = src;
  });
}

function buildFilename({
  motifTitle,
  speakerName,
  formatLabel,
  stickerLabel,
}: {
  motifTitle: string;
  speakerName: string;
  formatLabel: string;
  stickerLabel: string;
}) {
  const safeMotif = motifTitle.toLowerCase().replace(/\s+/g, "-");
  const safeSpeaker = speakerName.toLowerCase().replace(/\s+/g, "-");
  const safeFormat = formatLabel.replace(":", "x");
  const safeSticker = stickerLabel
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  return `${safeMotif}-${safeSpeaker}-${safeFormat}-${safeSticker}.png`;
}