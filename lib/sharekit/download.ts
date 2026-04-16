import type { ImageFormat, RoleAssetConfig } from "./types";
import {
  renderExhibitorCanvas,
  renderLabelCanvas,
  renderTextCanvas,
} from "./canvas";

function createOffscreenCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export function buildFilename(parts: Array<string | null | undefined>) {
  return `${parts
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .replace(/\s+/g, "-")}.png`;
}

export async function createLabelCanvasDownloadUrl({
  assetConfig,
  format,
  logoSrc,
  labelAssetSrc,
  stickerSrc,
}: {
  assetConfig: RoleAssetConfig;
  format: ImageFormat;
  logoSrc?: string;
  labelAssetSrc: string;
  stickerSrc: string | null;
}) {
  const formatConfig = assetConfig.formats[format];
  const canvas = createOffscreenCanvas(formatConfig.width, formatConfig.height);

  await renderLabelCanvas({
    canvas,
    assetConfig,
    format,
    logoSrc,
    labelAssetSrc,
    stickerSrc,
  });

  return canvas.toDataURL("image/png");
}

export async function createCanvasDownloadUrl({
  assetConfig,
  format,
  displayName,
  logoSrc,
  speakerImageSrc,
  stickerSrc,
}: {
  assetConfig: RoleAssetConfig;
  format: ImageFormat;
  displayName: string;
  logoSrc?: string;
  speakerImageSrc?: string;
  stickerSrc: string | null;
}) {
  const formatConfig = assetConfig.formats[format];
  const canvas = createOffscreenCanvas(formatConfig.width, formatConfig.height);

  await renderTextCanvas({
    canvas,
    assetConfig,
    format,
    displayName,
    logoSrc,
    speakerImageSrc,
    stickerSrc,
  });

  return canvas.toDataURL("image/png");
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
  const formatConfig = assetConfig.formats[format];
  const canvas = createOffscreenCanvas(formatConfig.width, formatConfig.height);

  await renderExhibitorCanvas({
    canvas,
    assetConfig,
    format,
    exhibitorImageSrc,
    stickerSrc,
  });

  return canvas.toDataURL("image/png");
}