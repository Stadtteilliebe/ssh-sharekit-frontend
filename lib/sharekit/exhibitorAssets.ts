import type { RoleAssetConfig, SharekitOption } from "./types";

export const exhibitorOptions: SharekitOption[] = [
  {
    id: "exhibitor-1",
    name: "Robot Valley",
    imageUrl:
      "assets/exhibitor/logo-3.png",
  },
  {
    id: "exhibitor-2",
    name: "Phoenix Contact",
    imageUrl:
      "assets/exhibitor/logo-2.png",
  },
  {
    id: "exhibitor-3",
    name: "omlox",
    imageUrl:
      "assets/exhibitor/logo-1.jpg",
  },
];

export const exhibitorAssets: RoleAssetConfig = {
  role: "exhibitor",
  formats: {
    landscape: {
      width: 1920,
      height: 1080,
      previewClassName: "aspect-[16/9]",
      baseImageSrc: "assets/exhibitor/hub-disrupt-sharekit-exhibitor-background-1920x1080.png",
      stickers: [
        { id: "none", label: "Keiner", src: null },
        { id: "exhibitor-1", label: "Join us", src: "assets/exhibitor/hub-disrupt-sharekit-exhibitor-badge-01-1920x1080.png" },
        { id: "exhibitor-2", label: "Meet us", src: "assets/exhibitor/hub-disrupt-sharekit-exhibitor-badge-02-1920x1080.png" },
      ],
    },
    portrait: {
      width: 1080,
      height: 1350,
      previewClassName: "aspect-[4/5]",
      baseImageSrc: "assets/exhibitor/hub-disrupt-sharekit-exhibitor-background-1080x1350.png",
      stickers: [
        { id: "none", label: "Keiner", src: null },
        { id: "exhibitor-1", label: "Störer 1", src: "assets/exhibitor/hub-disrupt-sharekit-exhibitor-badge-01-1080x1350.png" },
        { id: "exhibitor-2", label: "Störer 2", src: "assets/exhibitor/hub-disrupt-sharekit-exhibitor-badge-02-1080x1350.png" },
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