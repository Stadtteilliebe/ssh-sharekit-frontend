import type { ImageFormat, RoleAssetConfig } from "./types";
import { renderExhibitorCanvas, renderTextCanvas } from "./canvas";

export async function createCanvasDownloadUrl({
  assetConfig,
  format,
  displayName,
  stickerSrc,
}: {
  assetConfig: RoleAssetConfig;
  format: ImageFormat;
  displayName: string;
  stickerSrc: string | null;
}) {
  const exportCanvas = document.createElement("canvas");

  await renderTextCanvas({
    canvas: exportCanvas,
    assetConfig,
    format,
    displayName,
    stickerSrc,
  });

  return exportCanvas.toDataURL("image/png");
}

export async function createExhibitorCanvasDownloadUrl({
  assetConfig,
  format,
  exhibitorImageSrc,
  stickerSrc,
}: {
  assetConfig: RoleAssetConfig;
  format: ImageFormat;
  exhibitorImageSrc?: string;
  stickerSrc: string | null;
}) {
  const exportCanvas = document.createElement("canvas");

  await renderExhibitorCanvas({
    canvas: exportCanvas,
    assetConfig,
    format,
    exhibitorImageSrc,
    stickerSrc,
  });

  return exportCanvas.toDataURL("image/png");
}

export function buildFilename(parts: Array<string | undefined | null>) {
  const safe = parts
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  return `${safe}.png`;
}