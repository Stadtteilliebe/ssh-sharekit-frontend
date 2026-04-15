export type Role = "speaker" | "exhibitor" | "partner";
export type ImageFormat = "landscape" | "portrait";

export type SharekitOption = {
  id: string;
  name: string;
  imageUrl?: string;
};

export type StickerOption = {
  id: string;
  label: string;
  src: string | null;
};

export type FormatConfig = {
  width: number;
  height: number;
  previewClassName: string;
  baseImageSrc: string;
  stickers: StickerOption[];
};

export type RoleAssetConfig = {
  role: Role;
  formats: Record<ImageFormat, FormatConfig>;
  text: {
    xFactor: number;
    yFactor: number;
    fontSizeFactor: {
      landscape: number;
      portrait: number;
    };
    fontFamily: string;
    fontWeight: number;
    color: string;
  };
};