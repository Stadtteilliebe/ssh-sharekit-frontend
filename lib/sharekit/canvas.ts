import type { ImageFormat, RoleAssetConfig } from "./types";

export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error(`Bild konnte nicht geladen werden: ${src}`));
    img.src = src;
  });
}

export async function renderTextCanvas({
  canvas,
  assetConfig,
  format,
  displayName,
  stickerSrc,
}: {
  canvas: HTMLCanvasElement | null;
  assetConfig: RoleAssetConfig;
  format: ImageFormat;
  displayName: string;
  stickerSrc: string | null;
}) {
  if (!canvas) return;

  const formatConfig = assetConfig.formats[format];

  canvas.width = formatConfig.width;
  canvas.height = formatConfig.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, formatConfig.width, formatConfig.height);

  const baseImage = await loadImage(formatConfig.baseImageSrc);
  ctx.drawImage(baseImage, 0, 0, formatConfig.width, formatConfig.height);

  if (stickerSrc) {
    const sticker = await loadImage(stickerSrc);
    drawSticker(ctx, sticker, formatConfig.width, formatConfig.height);
  }

  drawText(ctx, {
    text: displayName,
    width: formatConfig.width,
    height: formatConfig.height,
    xFactor: assetConfig.text.xFactor,
    yFactor: assetConfig.text.yFactor,
    fontFamily: assetConfig.text.fontFamily,
    fontWeight: assetConfig.text.fontWeight,
    color: assetConfig.text.color,
    fontSizeFactor: assetConfig.text.fontSizeFactor[format],
  });
}

function drawText(
  ctx: CanvasRenderingContext2D,
  {
    text,
    width,
    height,
    xFactor,
    yFactor,
    fontFamily,
    fontWeight,
    color,
    fontSizeFactor,
  }: {
    text: string;
    width: number;
    height: number;
    xFactor: number;
    yFactor: number;
    fontFamily: string;
    fontWeight: number;
    color: string;
    fontSizeFactor: number;
  }
) {
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;

  const fontSize = Math.round(width * fontSizeFactor);
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

  ctx.fillText(text, width * xFactor, height * yFactor);
  ctx.restore();
}

function drawSticker(
  ctx: CanvasRenderingContext2D,
  sticker: HTMLImageElement,
  width: number,
  height: number
) {
  const stickerWidth = width * 0.22;
  const stickerHeight = (sticker.height / sticker.width) * stickerWidth;
  const x = width - stickerWidth - width * 0.05;
  const y = height * 0.06;

  ctx.drawImage(sticker, x, y, stickerWidth, stickerHeight);
}