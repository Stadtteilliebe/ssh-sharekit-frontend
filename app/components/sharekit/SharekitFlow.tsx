"use client";

import { useState } from "react";
import { EntryStep } from "@/app/components/sharekit/steps/EntryStep";
import { GeneralGalleryStep } from "@/app/components/sharekit/steps/GeneralGalleryStep";
import { WorkspaceStep } from "@/app/components/sharekit/steps/WorkspaceStep";

type Step = "entry" | "general-gallery" | "workspace";
type Role = "speaker" | "exhibitor";

export function SharekitFlow() {
  const [step, setStep] = useState<Step>("entry");
  const [role, setRole] = useState<Role>("speaker");

  if (step === "entry") {
    return (
      <EntryStep
        onStartWithRole={(nextRole) => {
          setRole(nextRole);
          setStep("workspace");
        }}
        onSelectGeneralFlow={() => setStep("general-gallery")}
      />
    );
  }

  return (
    <main className="min-h-screen p-4 text-neutral-900 md:p-6">
      <div className="mx-auto max-w-7xl">
        {step === "general-gallery" && (
          <GeneralGalleryStep onBack={() => setStep("entry")} />
        )}

        {step === "workspace" && (
          <WorkspaceStep
            role={role}
            onRoleChange={setRole}
            onBack={() => setStep("entry")}
          />
        )}
      </div>
    </main>
  );
}