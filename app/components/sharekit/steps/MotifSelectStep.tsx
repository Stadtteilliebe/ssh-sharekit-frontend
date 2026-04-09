"use client";

import { motifs, type Motif } from "@/lib/sharekit/motifs";

type MotifSelectStepProps = {
  onSelectMotif: (motif: Motif) => void;
  onBack?: () => void;
};

export function MotifSelectStep({
  onSelectMotif,
  onBack,
}: MotifSelectStepProps) {
  return (
    <section className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-6xl">

        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 rounded-xl border border-neutral-300 px-4 py-2 text-sm"
          >
            Zurück
          </button>
        )}

        <h1 className="text-3xl md:text-4xl font-semibold">
          Wähle dein Motiv
        </h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {motifs.map((motif) => (
            <button
              key={motif.id}
              onClick={() => onSelectMotif(motif)}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left transition hover:shadow-md"
            >
              <div className="aspect-square bg-neutral-100">
                <img
                  src={motif.previewSrc}
                  alt={motif.title}
                  className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                />
              </div>

              <div className="p-4">
                <p className="text-sm font-medium">{motif.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}