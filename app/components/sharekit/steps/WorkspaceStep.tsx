"use client";

import { SpeakerCustomizeStep } from "@/app/components/sharekit/steps/SpeakerCustomizeStep";
import type { Motif } from "@/lib/sharekit/motifs";

type Role = "speaker" | "exhibitor";

type WorkspaceStepProps = {
  role: Role;
  motif: Motif | null;
  onRoleChange: (role: Role) => void;
  onBack: () => void;
  onChangeMotif: () => void;
};

export function WorkspaceStep({
  role,
  motif,
  onRoleChange,
  onBack,
  onChangeMotif,
}: WorkspaceStepProps) {
  return (
    <section className="rounded-[24px] border border-black/5 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-6 flex flex-col gap-4 border-b border-neutral-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm transition hover:border-neutral-500"
          >
            Zurück
          </button>

          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">
              Sharekit
            </p>
            <h1 className="text-xl font-semibold">Asset erstellen</h1>
          </div>
        </div>

        <div className="inline-flex w-fit rounded-2xl bg-neutral-100 p-1">
          <button
            onClick={() => onRoleChange("speaker")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              role === "speaker"
                ? "bg-black text-white"
                : "text-neutral-700"
            }`}
          >
            Speaker
          </button>

          <button
            onClick={() => onRoleChange("exhibitor")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              role === "exhibitor"
                ? "bg-black text-white"
                : "text-neutral-700"
            }`}
          >
            Exhibitor
          </button>
        </div>
      </div>

      {role === "speaker" && (
        <SpeakerCustomizeStep motif={motif} onChangeMotif={onChangeMotif} />
      )}

      {role === "exhibitor" && (
        <div className="rounded-2xl bg-neutral-50 p-8">
          <h2 className="text-xl font-semibold">Exhibitor</h2>
          <p className="mt-2 text-neutral-600">
            Hier kommt später die Exhibitor-Variante.
          </p>
        </div>
      )}
    </section>
  );
}