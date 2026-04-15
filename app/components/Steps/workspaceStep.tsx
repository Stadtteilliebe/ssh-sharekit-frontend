"use client";


import { Nav } from "../Navigation";
import { ExhibitorCustomizeStep } from "./exhibitorCustomizeStep";
import { PartnerCustomizeStep } from "./partnerCustomizeStep";
import { SpeakerCustomizeStep } from "./speakerCustomizeStep";

type Role = "speaker" | "partner" | "exhibitor";

type WorkspaceStepProps = {
  role: Role;
  onRoleChangeAction: (role: Role) => void;
  onBackAction: () => void;
};

const titleByRole: Record<Role, string> = {
  speaker: "Speaker",
  partner: "Partner",
  exhibitor: "Exhibitor",
};

export function WorkspaceStep({ role, onBackAction }: WorkspaceStepProps) {
  return (
    <section className="bg-neutral-100">
      <Nav
        title={titleByRole[role]}
        onBackAction={onBackAction}
        titleVisibility="always"
        position="fixed"
      />

      {role === "speaker" && <SpeakerCustomizeStep />}
      {role === "partner" && <PartnerCustomizeStep />}
      {role === "exhibitor" && <ExhibitorCustomizeStep />}
    </section>
  );
}