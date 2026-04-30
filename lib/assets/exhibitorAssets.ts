import type { RoleAssetConfig } from "../sharekit/types";

export const exhibitorAssets: RoleAssetConfig = {
  role: "exhibitor",
  formats: {
    landscape: {
      width: 1920,
      height: 1080,
      previewClassName: "aspect-[16/9]",
      baseImageSrc: "assets/exhibitor/hub-disrupt-sharekit-exhibitor-background-1920x1080.png",
      stickers: [
        { id: "none", label: "Kein Badge", src: null },
        { id: "badge-1", label: "Join us!", src: "assets/exhibitor/hub-disrupt-sharekit-exhibitor-badge-01-1920x1080.png" },
        { id: "badge-2", label: "Meet us", src: "assets/exhibitor/hub-disrupt-sharekit-exhibitor-badge-02-1920x1080.png" },
      ],
      circlePlacement: {
        xFactor: 0.8,
        yFactor: 0.5,
        radiusFactor: 0.15,
        paddingFactor: 0,
      },
    },
    portrait: {
      width: 1080,
      height: 1350,
      previewClassName: "aspect-[4/5]",
      baseImageSrc: "assets/exhibitor/hub-disrupt-sharekit-exhibitor-background-1080x1350.png",
      stickers: [
        { id: "none", label: "Kein Badge", src: null },
        { id: "badge-1", label: "Join us!", src: "assets/exhibitor/hub-disrupt-sharekit-exhibitor-badge-01-1080x1350.png" },
        { id: "badge-2", label: "Meet us", src: "assets/exhibitor/hub-disrupt-sharekit-exhibitor-badge-02-1080x1350.png" },
      ],
      circlePlacement: {
        xFactor: 0.72,
        yFactor: 0.24,
        radiusFactor: 0.19,
        paddingFactor: 0,
      },
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