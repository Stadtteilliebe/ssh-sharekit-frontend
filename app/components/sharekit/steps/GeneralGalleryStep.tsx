"use client";

import { useMemo, useState } from "react";
import { generalImages } from "@/lib/sharekit/generalImages";

type ImageFormat = "landscape" | "portrait";

export function GeneralGalleryStep({
  onBack,
}: {
  onBack: () => void;
}) {
  const [activeFormat, setActiveFormat] = useState<ImageFormat>("landscape");

  const filteredImages = useMemo(() => {
    return generalImages.filter((image) => image.format === activeFormat);
  }, [activeFormat]);

  return (
    <section className="">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          onClick={onBack}
          className="w-fit rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm transition hover:border-neutral-500"
        >
          Zurück
        </button>

        <div className="inline-flex w-fit rounded-2xl bg-neutral-100 p-1">
          <button
            onClick={() => setActiveFormat("landscape")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeFormat === "landscape"
                ? "bg-black text-white"
                : "text-neutral-700"
            }`}
          >
            Quer
          </button>

          <button
            onClick={() => setActiveFormat("portrait")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeFormat === "portrait"
                ? "bg-black text-white"
                : "text-neutral-700"
            }`}
          >
            Hoch
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-2xl md:text-5xl">Allgemeine Bilder</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Standardmäßig werden Querformate angezeigt. Du kannst oben zwischen
          Quer und Hoch wechseln.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredImages.map((img) => (
          <article
            key={img.id}
            className="overflow-hidden rounded-[8px] border border-neutral-200 bg-white"
          >
            <div
              className={`flex items-center justify-center bg-neutral-100 ${
                img.format === "landscape" ? "aspect-[16/9]" : "aspect-[4/5]"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  {img.format === "landscape" ? "Querformat" : "Hochformat"}
                </p>
                <p>
                  {img.dimension}
                </p>
              </div>

              <a
                href={img.src}
                download
                className="rounded-xl bg-black px-4 py-2 text-sm text-white transition hover:opacity-90"
              >
                Download
              </a>
            </div>
          </article>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="mt-8 rounded-2xl bg-neutral-50 p-8 text-center text-neutral-500">
          Für dieses Format sind aktuell keine Bilder vorhanden.
        </div>
      )}
    </section>
  );
}