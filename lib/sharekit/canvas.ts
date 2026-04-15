import type { ImageFormat, RoleAssetConfig } from "./types";

/**
 * Globaler Image Cache
 */
const imageCache = new Map<string, Promise<HTMLImageElement>>();

export async function loadImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) {
    return imageCache.get(src)!;
  }

  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();

    if (src.startsWith("http")) {
      img.crossOrigin = "anonymous";
    }

    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error(`Bild konnte nicht geladen werden: ${src}`));

    img.src = src;
  });

  imageCache.set(src, promise);
  return promise;
}

/**
 * TEXT CANVAS (Speaker / Partner)
 */
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

  // Parallel laden
  const [baseImage, sticker] = await Promise.all([
    loadImage(formatConfig.baseImageSrc),
    stickerSrc ? loadImage(stickerSrc) : Promise.resolve(null),
  ]);

  // Base
  ctx.drawImage(baseImage, 0, 0, formatConfig.width, formatConfig.height);

  // Text
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

  // Sticker (oben)
  if (sticker) {
    drawSticker(ctx, sticker, formatConfig.width, formatConfig.height);
  }
}

/**
 * EXHIBITOR CANVAS
 */
export async function renderExhibitorCanvas({
  canvas,
  assetConfig,
  format,
  exhibitorImageSrc,
  stickerSrc,
}: {
  canvas: HTMLCanvasElement | null;
  assetConfig: RoleAssetConfig;
  format: ImageFormat;
  exhibitorImageSrc?: string;
  stickerSrc: string | null;
}) {
  if (!canvas) return;

  const formatConfig = assetConfig.formats[format];

  canvas.width = formatConfig.width;
  canvas.height = formatConfig.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, formatConfig.width, formatConfig.height);

  // Parallel laden
  const [baseImage, exhibitorImage, sticker] = await Promise.all([
    loadImage(formatConfig.baseImageSrc),
    exhibitorImageSrc ? loadImage(exhibitorImageSrc) : Promise.resolve(null),
    stickerSrc ? loadImage(stickerSrc) : Promise.resolve(null),
  ]);

  // Base
  ctx.drawImage(baseImage, 0, 0, formatConfig.width, formatConfig.height);

  // Exhibitor Logo im Kreis
  if (exhibitorImage) {
    drawImageInWhiteCircle(ctx, {
      image: exhibitorImage,
      width: formatConfig.width,
      height: formatConfig.height,
      xFactor: 0.8,
      yFactor: format === "landscape" ? 0.5 : 0.76,
      radiusFactor: format === "landscape" ? 0.15 : 0.13,
      paddingFactor: 0,
    });
  }

  // Sticker (immer ganz oben)
  if (sticker) {
    drawSticker(ctx, sticker, formatConfig.width, formatConfig.height);
  }
}

/**
 * TEXT RENDER
 */
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

/**
 * STICKER (FULL OVERLAY)
 */
function drawSticker(
  ctx: CanvasRenderingContext2D,
  sticker: HTMLImageElement,
  width: number,
  height: number
) {
  ctx.drawImage(sticker, 0, 0, width, height);
}

/**
 * LOGO IM KREIS
 */
function drawImageInWhiteCircle(
  ctx: CanvasRenderingContext2D,
  {
    image,
    width,
    height,
    xFactor,
    yFactor,
    radiusFactor,
    paddingFactor,
  }: {
    image: HTMLImageElement;
    width: number;
    height: number;
    xFactor: number;
    yFactor: number;
    radiusFactor: number;
    paddingFactor: number;
  }
) {
  const cx = width * xFactor;
  const cy = height * yFactor;
  const radius = width * radiusFactor;

  ctx.save();

  // Weißer Kreis
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  const innerRadius = radius * (1 - paddingFactor);
  const targetSize = innerRadius // FIX

  // Clip
  ctx.beginPath();
  ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  // Cover-Scaling
  const imageRatio = image.width / image.height;

  let drawWidth = targetSize;
  let drawHeight = targetSize;
  let dx = cx - targetSize / 2;
  let dy = cy - targetSize / 2;

  if (imageRatio > 1) {
    drawHeight = targetSize;
    drawWidth = drawHeight * imageRatio;
    dx = cx - drawWidth / 2;
  } else {
    drawWidth = targetSize;
    drawHeight = drawWidth / imageRatio;
    dy = cy - drawHeight / 2;
  }

  ctx.drawImage(image, dx, dy, drawWidth, drawHeight);

  ctx.restore();
}