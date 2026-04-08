"use client";

import { generalImages } from "@/lib/sharekit/generalImages";


export function GeneralGalleryStep({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <button onClick={onBack}>Zurück</button>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {generalImages.map((img) => (
          <div key={img.id}>
            <img src={img.src} alt="" />
            <a href={img.src} download>
              Download
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}