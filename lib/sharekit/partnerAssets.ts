import type { RoleAssetConfig, SharekitOption } from "./types";

export const partnerOptions: SharekitOption[] = [
  { id: "partner-1", name: "Partner 1" },
  { id: "partner-2", name: "Partner 2" },
  { id: "partner-3", name: "Partner 3" },
];

export const partnerAssets: RoleAssetConfig = {
  role: "partner",
  formats: {
    landscape: {
      width: 1920,
      height: 1080,
      previewClassName: "aspect-[16/9]",
      baseImageSrc: "/sharekit/partner/partner-landscape.png",
      stickers: [
        { id: "none", label: "Keiner", src: null },
        { id: "partner-1", label: "Störer 1", src: "/sharekit/partner/sticker-1.png" },
        { id: "partner-2", label: "Störer 2", src: "/sharekit/partner/sticker-2.png" },
      ],
    },
    portrait: {
      width: 1080,
      height: 1350,
      previewClassName: "aspect-[4/5]",
      baseImageSrc: "/sharekit/partner/partner-portrait.png",
      stickers: [
        { id: "none", label: "Keiner", src: null },
        { id: "partner-1", label: "Störer 1", src: "/sharekit/partner/sticker-1.png" },
        { id: "partner-2", label: "Störer 2", src: "/sharekit/partner/sticker-2.png" },
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