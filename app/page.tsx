"use client";

import { useMemo, useState } from "react";
import { layers } from "@/lib/layers";

const CANVAS_SIZE = 1080;

type LayerId = (typeof layers)[number]["id"];

export default function Page() {
  const [active, setActive] = useState<Record<LayerId, boolean>>({
    base: true,
    middle: true,
    top: true,
  });

  const visibleLayers = useMemo(
    () => layers.filter((layer) => active[layer.id]),
    [active]
  );

  const toggleLayer = (id: LayerId) => {
    setActive((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const downloadImage = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    for (const layer of visibleLayers) {
      const img = await loadImage(layer.src);
      ctx.drawImage(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "sharekit-image.png";
    link.click();
  };

  return (
    <main className="min-h-screen bg-neutral-50 p-8 text-neutral-900">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl p-5">
          <h1 className="mb-4 text-2xl font-semibold">Sharekit PoC</h1>

          <div className="space-y-3">
            {layers.map((layer) => {
              const isActive = active[layer.id];

              return (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className={`w-full rounded-xl px-4 py-3 text-left transition ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-[#abcdef] text-neutral-700"
                  }`}
                >
                  {layer.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={downloadImage}
            className="mt-6 rounded-xl text-white bg-black px-4 py-2 "
          >
            Anton herunterladen
          </button>
        </div>

        <div className="rounded-2xl bg-white p-5">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100">
            {visibleLayers.map((layer, index) => (
              <img
                key={layer.id}
                src={layer.src}
                alt={layer.label}
                className="absolute inset-0 h-full w-full object-contain"
                style={{ zIndex: index + 1 }}
              />
            ))}

            {visibleLayers.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                Keine Ebene aktiv
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}