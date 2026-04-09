"use client";

import { useState } from "react";
import { EntryStep } from "@/app/components/sharekit/steps/EntryStep";
import { GeneralGalleryStep } from "@/app/components/sharekit/steps/GeneralGalleryStep";
import { MotifSelectStep } from "@/app/components/sharekit/steps/MotifSelectStep";
import { WorkspaceStep } from "@/app/components/sharekit/steps/WorkspaceStep";
import type { Motif } from "@/lib/sharekit/motifs";

type Step = "entry" | "general-gallery" | "motif-select" | "workspace";
type Role = "speaker" | "exhibitor";

export function SharekitFlow() {
  const [step, setStep] = useState<Step>("entry");
  const [role, setRole] = useState<Role>("speaker");
  const [selectedMotif, setSelectedMotif] = useState<Motif | null>(null);

  if (step === "entry") {
    return (
      <EntryStep
        onStartWithRole={(nextRole) => {
          setRole(nextRole);
          setStep("motif-select");
        }}
        onSelectGeneralFlow={() => setStep("general-gallery")}
      />
    );
  }

  if (step === "general-gallery") {
    return <GeneralGalleryStep onBack={() => setStep("entry")} />;
  }

  if (step === "motif-select") {
    return (
      <MotifSelectStep
        onBack={() => setStep("entry")}
        onSelectMotif={(motif) => {
          setSelectedMotif(motif);
          setStep("workspace");
        }}
      />
    );
  }

  if (step === "workspace") {
    return (
      <main className="min-h-screen p-4 text-neutral-900 md:p-6">
        <div className="mx-auto max-w-7xl">
          <WorkspaceStep
            role={role}
            motif={selectedMotif}
            onRoleChange={setRole}
            onBack={() => setStep("entry")}
            onChangeMotif={() => setStep("motif-select")}
          />
        </div>
      </main>
    );
  }

  return null;
}