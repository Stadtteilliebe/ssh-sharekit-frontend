"use client";

import { useEffect } from "react";
import { Nav } from "../Navigation";
import { ExhibitorCustomizeStep } from "./exhibitorCustomizeStep";
import { PartnerCustomizeStep } from "./partnerCustomizeStep";
import { SpeakerCustomizeStep } from "./speakerCustomizeStep";
import type { SharekitOption } from "@/lib/sharekit/types";

type Role = "speaker" | "partner" | "exhibitor";

type WorkspaceStepProps = {
  role: Role;
  exhibitorOptions: SharekitOption[];
  partnerOptions: SharekitOption[];
  onRoleChangeAction: (role: Role) => void;
  onBackAction: () => void;
};

const titleByRole: Record<Role, string> = {
  speaker: "Speaker",
  partner: "Partner",
  exhibitor: "Exhibitor",
};

export function WorkspaceStep({
  role,
  exhibitorOptions,
  partnerOptions,
  onBackAction,
}: WorkspaceStepProps) {
  useEffect(() => {
    const original = document.documentElement.style.backgroundColor;

    document.documentElement.style.backgroundColor = "#6B92E2";

    return () => {
      document.documentElement.style.backgroundColor = original;
    };
  }, []);

  return (
    <section className="min-h-screen">
      <Nav
        title={titleByRole[role]}
        onBackAction={onBackAction}
        titleVisibility="always"
        position="fixed"
      />

      {role === "speaker" && <SpeakerCustomizeStep />}
      {role === "partner" && (
        <PartnerCustomizeStep partnerOptions={partnerOptions} />
      )}
      {role === "exhibitor" && (
        <ExhibitorCustomizeStep exhibitorOptions={exhibitorOptions} />
      )}
    </section>
  );
}