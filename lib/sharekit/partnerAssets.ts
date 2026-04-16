import type { RoleAssetConfig, SharekitOption } from "./types";

export const partnerOptions: SharekitOption[] = [
  {
    id: "1",
    name: "Coffee",
    imageUrl: "/assets/exhibitor/logo-2.png",
    label: "coffee",
    labelAssetSrc: {
      landscape:
        "/assets/partner/hub-disrupt-sharekit-partner-label-coffee-1920x1080.png",
      portrait:
        "/assets/partner/hub-disrupt-sharekit-partner-label-coffee-1080x1350.png",
    },
  },
  {
    id: "2",
    name: "Lab",
    imageUrl: "/assets/exhibitor/logo-2.png",
    label: "lab",
    labelAssetSrc: {
      landscape:
        "/assets/partner/hub-disrupt-sharekit-partner-label-lab-1920x1080.png",
      portrait:
        "/assets/partner/hub-disrupt-sharekit-partner-label-lab-1080x1350.png",
    },
  },
  {
    id: "3",
    name: "Themenwelt",
    imageUrl: "/assets/exhibitor/logo-2.png",
    label: "themenwelt",
    labelAssetSrc: {
      landscape:
        "/assets/partner/hub-disrupt-sharekit-partner-label-themenwelt-1920x1080.png",
      portrait:
        "/assets/partner/hub-disrupt-sharekit-partner-label-themenwelt-1080x1350.png",
    },
  },
  {
    id: "4",
    name: "Workshop",
    imageUrl: "/assets/exhibitor/logo-2.png",
    label: "workshop",
    labelAssetSrc: {
      landscape:
        "/assets/partner/hub-disrupt-sharekit-partner-label-workshop-1920x1080.png",
      portrait:
        "/assets/partner/hub-disrupt-sharekit-partner-label-workshop-1080x1350.png",
    },
  },
];

export const partnerAssets: RoleAssetConfig = {
  role: "partner",
  formats: {
    landscape: {
      width: 1920,
      height: 1080,
      previewClassName: "aspect-[16/9]",
      baseImageSrc:
        "/assets/partner/hub-disrupt-sharekit-partner-background-1920x1080.png",
      stickers: [
        { id: "none", label: "Kein Badge", src: null },
        {
          id: "badge-1",
          label: "Join us!",
          src: "/assets/partner/hub-disrupt-sharekit-partner-badge-01-1920x1080.png",
        },
        {
          id: "badge-2",
          label: "Meet us",
          src: "/assets/partner/hub-disrupt-sharekit-partner-badge-02-1920x1080.png",
        },
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
      baseImageSrc:
        "/assets/partner/hub-disrupt-sharekit-partner-background-1080x1350.png",
      stickers: [
        { id: "none", label: "Kein Badge", src: null },
        {
          id: "badge-1",
          label: "Join us!",
          src: "/assets/partner/hub-disrupt-sharekit-partner-badge-01-1080x1350.png",
        },
        {
          id: "badge-2",
          label: "Meet us",
          src: "/assets/partner/hub-disrupt-sharekit-partner-badge-02-1080x1350.png",
        },
      ],
      circlePlacement: {
        xFactor: 0.72,
        yFactor: 0.24,
        radiusFactor: 0.19,
        paddingFactor: 0,
      },
    },
  },
};