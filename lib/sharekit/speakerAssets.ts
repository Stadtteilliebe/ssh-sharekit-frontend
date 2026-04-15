import type { RoleAssetConfig, SharekitOption } from "./types";

export const speakerOptions: SharekitOption[] = [
  { id: "speaker-1", name: "Anton 1" },
  { id: "speaker-2", name: "Anton 2" },
  { id: "speaker-3", name: "Anton 3" },
];

export const speakerAssets: RoleAssetConfig = {
  role: "speaker",
  formats: {
    landscape: {
      width: 1920,
      height: 1080,
      previewClassName: "aspect-[16/9]",
      baseImageSrc: "/sharekit/speaker/speaker-landscape.png",
      stickers: [
        { id: "none", label: "Keiner", src: null },
        { id: "speaker-1", label: "Störer 1", src: "/sharekit/speaker/sticker-1.png" },
        { id: "speaker-2", label: "Störer 2", src: "/sharekit/speaker/sticker-2.png" },
      ],
    },
    portrait: {
      width: 1080,
      height: 1350,
      previewClassName: "aspect-[4/5]",
      baseImageSrc: "/sharekit/speaker/speaker-portrait.png",
      stickers: [
        { id: "none", label: "Keiner", src: null },
        { id: "speaker-1", label: "Störer 1", src: "/sharekit/speaker/sticker-1.png" },
        { id: "speaker-2", label: "Störer 2", src: "/sharekit/speaker/sticker-2.png" },
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