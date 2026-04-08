"use client";

import { useState } from "react";
import { EntryStep } from "@/components/sharekit/steps/EntryStep";
import { GeneralGalleryStep } from "@/components/sharekit/steps/GeneralGalleryStep";
import { WorkspaceStep } from "./steps/WorkspaceStep";

type Step = "entry" | "general-gallery" | "workspace";
type Role = "speaker" | "visitor";

export function SharekitFlow() {
  const [step, setStep] = useState<Step>("entry");
  const [role, setRole] = useState<Role>("speaker");

  return (
    <main className="min-h-screen bg-[#f5f5f3] p-4 text-neutral-900 md:p-6">
      <div className="mx-auto max-w-7xl">
        {step === "entry" && (
          <EntryStep
            onSelectRoleFlow={() => setStep("workspace")}
            onSelectGeneralFlow={() => setStep("general-gallery")}
          />
        )}

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