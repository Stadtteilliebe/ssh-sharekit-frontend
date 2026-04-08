"use client";

import { SpeakerCustomizeStep } from "@/components/sharekit/steps/SpeakerCustomizeStep";

type Role = "speaker" | "visitor";

type WorkspaceStepProps = {
  role: Role;
  onRoleChange: (role: Role) => void;
  onBack: () => void;
};

export function WorkspaceStep({
  role,
  onRoleChange,
  onBack,
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
            onClick={() => onRoleChange("visitor")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              role === "visitor"
                ? "bg-black text-white"
                : "text-neutral-700"
            }`}
          >
            Visitor
          </button>
        </div>
      </div>

      {role === "speaker" && <SpeakerCustomizeStep />}

      {role === "visitor" && (
        <div className="rounded-2xl bg-neutral-50 p-8">
          <h2 className="text-xl font-semibold">Visitor</h2>
          <p className="mt-2 text-neutral-600">
            Hier kann als Nächstes die Visitor-Variante eingebaut werden.
          </p>
        </div>
      )}
    </section>
  );
}