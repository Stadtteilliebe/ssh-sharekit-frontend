"use client";

import { useState } from "react";
import { GeneralGalleryStep } from "./steps/GeneralGalleryStep";
import { EntryStep } from "./steps/EntryStep";
import { WorkspaceStep } from "./steps/WorkspaceStep";


type Step = "entry" | "general-gallery" | "workspace";
type Role = "speaker" | "partner" | "exhibitor";

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

  if (step === "general-gallery") {
    return <GeneralGalleryStep onBackAction={() => setStep("entry")} />;
  }

  if (step === "workspace") {
    return (
      <main className="min-h-screen p-4 text-neutral-900 md:p-6">
        <div className="mx-auto max-w-7xl">
          <WorkspaceStep
            role={role}
            onRoleChange={setRole}
            onBackAction={() => setStep("entry")}
          />
        </div>
      </main>
    );
  }

  return null;
}