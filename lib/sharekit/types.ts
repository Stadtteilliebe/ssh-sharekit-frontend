export type ImageFormat = "landscape" | "portrait";

export type SharekitOption = {
  id: string;
  name: string;
  imageUrl?: string;
  label?: string;
  labelAssetSrc?: {
    landscape: string;
    portrait: string;
  };
  logoSrc?: {
    landscape?: string;
    portrait?: string;
  };
  imageSrc?: {
    landscape?: string;
    portrait?: string;
  };
};

export type StickerOption = {
  id: string;
  label: string;
  src: string | null;
};

export type CirclePlacement = {
  xFactor: number;
  yFactor: number;
  radiusFactor: number;
  paddingFactor: number;
};

export type RectPlacement = {
  xFactor: number;
  yFactor: number;
  widthFactor: number;
  heightFactor: number;
  fit?: "contain" | "cover";
  borderRadiusFactor?: number;
};

export type RoleAssetConfig = {
  role: "speaker" | "partner" | "exhibitor";
  formats: Record<
    ImageFormat,
    {
      width: number;
      height: number;
      previewClassName: string;
      baseImageSrc: string;
      stickers: StickerOption[];
      circlePlacement?: CirclePlacement;
      logoPlacement?: RectPlacement;
      imagePlacement?: RectPlacement;
    }
  >;
  text?: {
    xFactor: number;
    yFactor: number;
    fontSizeFactor: Record<ImageFormat, number>;
    fontFamily: string;
    fontWeight: number;
    color: string;
  };
};