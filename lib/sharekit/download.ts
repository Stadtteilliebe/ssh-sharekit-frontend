import type { ImageFormat, RoleAssetConfig } from "./types";
import { renderTextCanvas } from "./canvas";

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

export function buildFilename(parts: Array<string | undefined | null>) {
  const safe = parts
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  return `${safe}.png`;
}