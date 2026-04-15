import type { RoleAssetConfig, SharekitOption } from "./types";

export const exhibitorOptions: SharekitOption[] = [
  { id: "exhibitor-1", name: "Firma 1" },
  { id: "exhibitor-2", name: "Firma 2" },
  { id: "exhibitor-3", name: "Firma 3" },
];

export const exhibitorAssets: RoleAssetConfig = {
  role: "exhibitor",
  formats: {
    landscape: {
      width: 1920,
      height: 1080,
      previewClassName: "aspect-[16/9]",
      baseImageSrc: "/sharekit/exhibitor/exhibitor-landscape.png",
      stickers: [
        { id: "none", label: "Keiner", src: null },
        { id: "exhibitor-1", label: "Störer 1", src: "/sharekit/exhibitor/sticker-1.png" },
        { id: "exhibitor-2", label: "Störer 2", src: "/sharekit/exhibitor/sticker-2.png" },
      ],
    },
    portrait: {
      width: 1080,
      height: 1350,
      previewClassName: "aspect-[4/5]",
      baseImageSrc: "/sharekit/exhibitor/exhibitor-portrait.png",
      stickers: [
        { id: "none", label: "Keiner", src: null },
        { id: "exhibitor-1", label: "Störer 1", src: "/sharekit/exhibitor/sticker-1.png" },
        { id: "exhibitor-2", label: "Störer 2", src: "/sharekit/exhibitor/sticker-2.png" },
      ],
    },
  },
  text: {
    xFactor: 0.5,
    yFactor: 0.82,
    fontSizeFactor: {
      landscape: 0.04,
      portrait: 0.055,
    },
    fontFamily: "Rubik",
    fontWeight: 400,
    color: "#ffffff",
  },
};