type ImageFormat = "landscape" | "portrait";

type BaseImage = {
  id: string;
  previewSrc: string;
  downloadSrc: string;
  title?: string;
  alt: string;
  format: ImageFormat;
};

const FORMAT_CONFIG = {
  landscape: {
    width: 1920,
    height: 1080,
  },
  portrait: {
    width: 1080,
    height: 1350,
  },
} as const;

function createImage(image: BaseImage) {
  const config = FORMAT_CONFIG[image.format];

  return {
    ...image,
    width: config.width,
    height: config.height,
    dimension: `${config.width.toLocaleString("de-DE")} x ${config.height.toLocaleString("de-DE")} px`,
  };
}

export const generalImages = [
  // Landscape (4x)
  createImage({
    id: "1",
    title: "Das Tech-Festival für Co-Innovation in der Industrie-Automatisierung",
    previewSrc: "assets/general/hub-disrupt-sharekit-general-01-1920x1080-preview.jpg",
    downloadSrc: "assets/general/hub-disrupt-sharekit-general-01-1920x1080.png",
    format: "landscape",
    alt: "General image 1",
  }),
  createImage({
    id: "2",
    title: "Das Tech-Festival für Co-Innovation in der Industrie-Automatisierung",
    previewSrc: "assets/general/hub-disrupt-sharekit-general-02-1920x1080-preview.jpg",
    downloadSrc: "assets/general/hub-disrupt-sharekit-general-02-1920x1080.png",
    format: "landscape",
    alt: "General image 2",
  }),
  createImage({
    id: "3",
    title: "Die Zukunft der Fertigung!",
    previewSrc: "assets/general/hub-disrupt-sharekit-general-03-1920x1080-preview.jpg",
    downloadSrc: "assets/general/hub-disrupt-sharekit-general-03-1920x1080.png",
    format: "landscape",
    alt: "General image 3",
  }),
  createImage({
    id: "4",
    title: "Building the future of Manufacturing!",
    previewSrc: "assets/general/hub-disrupt-sharekit-general-04-1920x1080-preview.jpg",
    downloadSrc: "assets/general/hub-disrupt-sharekit-general-04-1920x1080.png",
    format: "landscape",
    alt: "General image 4",
  }),

  // Portrait (4x)
  createImage({
    id: "5",
    title: "Das Tech-Festival für Co-Innovation in der Industrie-Automatisierung",
    previewSrc: "assets/general/hub-disrupt-sharekit-general-01-1080x1350-preview.jpg",
    downloadSrc: "assets/general/hub-disrupt-sharekit-general-01-1080x1350.png",
    format: "portrait",
    alt: "General image 5",
  }),
  createImage({
    id: "6",
    title: "Das Tech-Festival für Co-Innovation in der Industrie-Automatisierung",
    previewSrc: "assets/general/hub-disrupt-sharekit-general-02-1080x1350-preview.jpg",
    downloadSrc: "assets/general/hub-disrupt-sharekit-general-02-1080x1350.png",
    format: "portrait",
    alt: "General image 6",
  }),
  createImage({
    id: "7",
    title: "Die Zukunft der Fertigung!",
    previewSrc: "assets/general/hub-disrupt-sharekit-general-03-1080x1350-preview.jpg",
    downloadSrc: "assets/general/hub-disrupt-sharekit-general-03-1080x1350.png",
    format: "portrait",
    alt: "General image 7",
  }),
  createImage({
    id: "8",
    title: "Building the future of Manufacturing!",
    previewSrc: "assets/general/hub-disrupt-sharekit-general-04-1080x1350-preview.jpg",
    downloadSrc: "assets/general/hub-disrupt-sharekit-general-04-1080x1350.png",
    format: "portrait",
    alt: "General image 8",
  }),
] as const;