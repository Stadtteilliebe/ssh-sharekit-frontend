export const motifs = [
  {
    id: "motiv-1",
    title: "Motiv 1",
    previewSrc: "/sharekit/motifs/motiv-1/preview.png",
    formats: {
      portrait: {
        id: "portrait",
        label: "4:5",
        imageSrc: "/sharekit/motifs/motiv-1/portrait.png",
        width: 1080,
        height: 1350,
        previewClassName: "aspect-[4/5]",
        stickers: [
          {
            id: "none",
            label: "Kein Störer",
            src: null,
          },
          {
            id: "sticker-1",
            label: "Störer 1",
            src: "/sharekit/motifs/motiv-1/sticker-1.png",
          },
          {
            id: "sticker-2",
            label: "Störer 2",
            src: "/sharekit/motifs/motiv-1/sticker-2.png",
          },
        ],
      },
      landscape: {
        id: "landscape",
        label: "16:9",
        imageSrc: "/sharekit/motifs/motiv-1/landscape.png",
        width: 1600,
        height: 900,
        previewClassName: "aspect-[16/9]",
        stickers: [
          {
            id: "none",
            label: "Kein Störer",
            src: null,
          },
          {
            id: "sticker-3",
            label: "Störer 3",
            src: "/sharekit/motifs/motiv-1/sticker-3.png",
          },
          {
            id: "sticker-4",
            label: "Störer 4",
            src: "/sharekit/motifs/motiv-1/sticker-4.png",
          },
        ],
      },
    },
  },
  {
    id: "motiv-2",
    title: "Motiv 2",
    previewSrc: "/sharekit/motifs/motiv-2/preview.png",
    formats: {
      portrait: {
        id: "portrait",
        label: "4:5",
        imageSrc: "/sharekit/motifs/motiv-2/portrait.png",
        width: 1080,
        height: 1350,
        previewClassName: "aspect-[4/5]",
        stickers: [
          {
            id: "none",
            label: "Kein Störer",
            src: null,
          },
          {
            id: "sticker-1",
            label: "Störer 1",
            src: "/sharekit/motifs/motiv-2/sticker-1.png",
          },
          {
            id: "sticker-2",
            label: "Störer 2",
            src: "/sharekit/motifs/motiv-2/sticker-2.png",
          },
        ],
      },
      landscape: {
        id: "landscape",
        label: "16:9",
        imageSrc: "/sharekit/motifs/motiv-2/landscape.png",
        width: 1600,
        height: 900,
        previewClassName: "aspect-[16/9]",
        stickers: [
          {
            id: "none",
            label: "Kein Störer",
            src: null,
          },
          {
            id: "sticker-3",
            label: "Störer 3",
            src: "/sharekit/motifs/motiv-2/sticker-3.png",
          },
          {
            id: "sticker-4",
            label: "Störer 4",
            src: "/sharekit/motifs/motiv-2/sticker-4.png",
          },
        ],
      },
    },
  },
] as const;

export type Motif = (typeof motifs)[number];