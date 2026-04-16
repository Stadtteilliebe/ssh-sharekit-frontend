import type { ImageFormat, RoleAssetConfig } from "./types";

/**
 * Globaler Image Cache
 */
const imageCache = new Map<string, Promise<HTMLImageElement>>();

/**
 * Globaler Layer Cache
 * Speichert vorbereitete Layer ohne Sticker
 */
const layerCache = new Map<string, HTMLCanvasElement>();

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

function ensureCanvasSize(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
) {
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

function createOffscreenCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function getLayerCacheKey(parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).join("|");
}

function cloneCanvas(source: HTMLCanvasElement) {
  const clone = createOffscreenCanvas(source.width, source.height);
  const ctx = clone.getContext("2d");
  if (!ctx) return clone;
  ctx.drawImage(source, 0, 0);
  return clone;
}

/**
 * PARTNER / LABEL CANVAS
 * Base + Logo im Circle + Label-Asset + Sticker
 */
export async function renderLabelCanvas({
  canvas,
  assetConfig,
  format,
  logoSrc,
  labelAssetSrc,
  stickerSrc,
}: {
  canvas: HTMLCanvasElement | null;
  assetConfig: RoleAssetConfig;
  format: ImageFormat;
  logoSrc?: string;
  labelAssetSrc: string;
  stickerSrc: string | null;
}) {
  if (!canvas) return;

  const formatConfig = assetConfig.formats[format];
  ensureCanvasSize(canvas, formatConfig.width, formatConfig.height);

  const ctx = canvas.getContext("2d", {
    alpha: true,
    desynchronized: true,
  });
  if (!ctx) return;

  const baseLayerKey = getLayerCacheKey([
    "partner",
    format,
    formatConfig.baseImageSrc,
    logoSrc,
    labelAssetSrc,
  ]);

  let baseLayer = layerCache.get(baseLayerKey);

  if (!baseLayer) {
    baseLayer = createOffscreenCanvas(formatConfig.width, formatConfig.height);
    const baseCtx = baseLayer.getContext("2d");
    if (!baseCtx) return;

    const [baseImage, logoImage, labelImage] = await Promise.all([
      loadImage(formatConfig.baseImageSrc),
      logoSrc ? loadImage(logoSrc) : Promise.resolve(null),
      loadImage(labelAssetSrc),
    ]);

    baseCtx.clearRect(0, 0, formatConfig.width, formatConfig.height);

    // Base
    baseCtx.drawImage(baseImage, 0, 0, formatConfig.width, formatConfig.height);

    // Partner Logo im Kreis
    if (logoImage && formatConfig.circlePlacement) {
      drawImageInWhiteCircle(baseCtx, {
        image: logoImage,
        width: formatConfig.width,
        height: formatConfig.height,
        xFactor: formatConfig.circlePlacement.xFactor,
        yFactor: formatConfig.circlePlacement.yFactor,
        radiusFactor: formatConfig.circlePlacement.radiusFactor,
        paddingFactor: formatConfig.circlePlacement.paddingFactor,
      });
    }

    // Label-Overlay
    baseCtx.drawImage(labelImage, 0, 0, formatConfig.width, formatConfig.height);

    layerCache.set(baseLayerKey, cloneCanvas(baseLayer));
  }

  ctx.clearRect(0, 0, formatConfig.width, formatConfig.height);
  ctx.drawImage(baseLayer, 0, 0);

  if (stickerSrc) {
    const sticker = await loadImage(stickerSrc);
    drawSticker(ctx, sticker, formatConfig.width, formatConfig.height);
  }
}

/**
 * SPEAKER CANVAS
 * Base + Speaker-Bild + Logo + Text + Sticker
 */
export async function renderTextCanvas({
  canvas,
  assetConfig,
  format,
  displayName,
  logoSrc,
  speakerImageSrc,
  stickerSrc,
}: {
  canvas: HTMLCanvasElement | null;
  assetConfig: RoleAssetConfig;
  format: ImageFormat;
  displayName: string;
  logoSrc?: string;
  speakerImageSrc?: string;
  stickerSrc: string | null;
}) {
  if (!canvas) return;

  const formatConfig = assetConfig.formats[format];
  ensureCanvasSize(canvas, formatConfig.width, formatConfig.height);

  const ctx = canvas.getContext("2d", {
    alpha: true,
    desynchronized: true,
  });
  if (!ctx) return;

  const baseLayerKey = getLayerCacheKey([
    "speaker",
    format,
    formatConfig.baseImageSrc,
    logoSrc,
    speakerImageSrc,
    displayName,
  ]);

  let baseLayer = layerCache.get(baseLayerKey);

  if (!baseLayer) {
    baseLayer = createOffscreenCanvas(formatConfig.width, formatConfig.height);
    const baseCtx = baseLayer.getContext("2d");
    if (!baseCtx) return;

    const [baseImage, speakerImage, logoImage] = await Promise.all([
      loadImage(formatConfig.baseImageSrc),
      speakerImageSrc ? loadImage(speakerImageSrc) : Promise.resolve(null),
      logoSrc ? loadImage(logoSrc) : Promise.resolve(null),
    ]);

    baseCtx.clearRect(0, 0, formatConfig.width, formatConfig.height);

    // Base
    baseCtx.drawImage(baseImage, 0, 0, formatConfig.width, formatConfig.height);

    // Speaker Bild
    if (speakerImage && formatConfig.imagePlacement) {
      drawImageWithPlacement(baseCtx, {
        image: speakerImage,
        width: formatConfig.width,
        height: formatConfig.height,
        xFactor: formatConfig.imagePlacement.xFactor,
        yFactor: formatConfig.imagePlacement.yFactor,
        widthFactor: formatConfig.imagePlacement.widthFactor,
        heightFactor: formatConfig.imagePlacement.heightFactor,
        fit: formatConfig.imagePlacement.fit ?? "cover",
        borderRadiusFactor: formatConfig.imagePlacement.borderRadiusFactor ?? 0,
      });
    }

    // Speaker Logo
    if (logoImage && formatConfig.logoPlacement) {
      drawImageWithPlacement(baseCtx, {
        image: logoImage,
        width: formatConfig.width,
        height: formatConfig.height,
        xFactor: formatConfig.logoPlacement.xFactor,
        yFactor: formatConfig.logoPlacement.yFactor,
        widthFactor: formatConfig.logoPlacement.widthFactor,
        heightFactor: formatConfig.logoPlacement.heightFactor,
        fit: formatConfig.logoPlacement.fit ?? "contain",
        borderRadiusFactor: formatConfig.logoPlacement.borderRadiusFactor ?? 0,
      });
    }

    // Text
    if (assetConfig.text) {
      drawText(baseCtx, {
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

    layerCache.set(baseLayerKey, cloneCanvas(baseLayer));
  }

  ctx.clearRect(0, 0, formatConfig.width, formatConfig.height);
  ctx.drawImage(baseLayer, 0, 0);

  if (stickerSrc) {
    const sticker = await loadImage(stickerSrc);
    drawSticker(ctx, sticker, formatConfig.width, formatConfig.height);
  }
}

/**
 * EXHIBITOR CANVAS
 * Base + Logo im Circle + Sticker
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
  ensureCanvasSize(canvas, formatConfig.width, formatConfig.height);

  const ctx = canvas.getContext("2d", {
    alpha: true,
    desynchronized: true,
  });
  if (!ctx) return;

  const baseLayerKey = getLayerCacheKey([
    "exhibitor",
    format,
    formatConfig.baseImageSrc,
    exhibitorImageSrc,
  ]);

  let baseLayer = layerCache.get(baseLayerKey);

  if (!baseLayer) {
    baseLayer = createOffscreenCanvas(formatConfig.width, formatConfig.height);
    const baseCtx = baseLayer.getContext("2d");
    if (!baseCtx) return;

    const [baseImage, exhibitorImage] = await Promise.all([
      loadImage(formatConfig.baseImageSrc),
      exhibitorImageSrc ? loadImage(exhibitorImageSrc) : Promise.resolve(null),
    ]);

    baseCtx.clearRect(0, 0, formatConfig.width, formatConfig.height);

    // Base
    baseCtx.drawImage(baseImage, 0, 0, formatConfig.width, formatConfig.height);

    // Exhibitor Logo im Kreis
    if (exhibitorImage && formatConfig.circlePlacement) {
      drawImageInWhiteCircle(baseCtx, {
        image: exhibitorImage,
        width: formatConfig.width,
        height: formatConfig.height,
        xFactor: formatConfig.circlePlacement.xFactor,
        yFactor: formatConfig.circlePlacement.yFactor,
        radiusFactor: formatConfig.circlePlacement.radiusFactor,
        paddingFactor: formatConfig.circlePlacement.paddingFactor,
      });
    }

    layerCache.set(baseLayerKey, cloneCanvas(baseLayer));
  }

  ctx.clearRect(0, 0, formatConfig.width, formatConfig.height);
  ctx.drawImage(baseLayer, 0, 0);

  if (stickerSrc) {
    const sticker = await loadImage(stickerSrc);
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
  height: number,
) {
  ctx.drawImage(sticker, 0, 0, width, height);
}

/**
 * IMAGE WITH RECTANGULAR PLACEMENT
 */
function drawImageWithPlacement(
  ctx: CanvasRenderingContext2D,
  {
    image,
    width,
    height,
    xFactor,
    yFactor,
    widthFactor,
    heightFactor,
    fit,
    borderRadiusFactor,
  }: {
    image: HTMLImageElement;
    width: number;
    height: number;
    xFactor: number;
    yFactor: number;
    widthFactor: number;
    heightFactor: number;
    fit: "contain" | "cover";
    borderRadiusFactor: number;
  },
) {
  const targetWidth = width * widthFactor;
  const targetHeight = height * heightFactor;
  const x = width * xFactor - targetWidth / 2;
  const y = height * yFactor - targetHeight / 2;
  const radius = Math.min(targetWidth, targetHeight) * borderRadiusFactor;

  ctx.save();

  if (radius > 0) {
    roundRectPath(ctx, x, y, targetWidth, targetHeight, radius);
    ctx.clip();
  }

  const imageRatio = image.width / image.height;
  const targetRatio = targetWidth / targetHeight;

  let drawWidth = targetWidth;
  let drawHeight = targetHeight;
  let dx = x;
  let dy = y;

  if (fit === "cover") {
    if (imageRatio > targetRatio) {
      drawHeight = targetHeight;
      drawWidth = drawHeight * imageRatio;
      dx = x - (drawWidth - targetWidth) / 2;
    } else {
      drawWidth = targetWidth;
      drawHeight = drawWidth / imageRatio;
      dy = y - (drawHeight - targetHeight) / 2;
    }
  } else {
    if (imageRatio > targetRatio) {
      drawWidth = targetWidth;
      drawHeight = drawWidth / imageRatio;
      dy = y + (targetHeight - drawHeight) / 2;
    } else {
      drawHeight = targetHeight;
      drawWidth = drawHeight * imageRatio;
      dx = x + (targetWidth - drawWidth) / 2;
    }
  }

  ctx.drawImage(image, dx, dy, drawWidth, drawHeight);

  ctx.restore();
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
  },
) {
  const cx = width * xFactor;
  const cy = height * yFactor;
  const radius = width * radiusFactor;

  ctx.save();

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  const innerRadius = radius * (1 - paddingFactor);
  const targetSize = innerRadius;

  ctx.beginPath();
  ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

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

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}