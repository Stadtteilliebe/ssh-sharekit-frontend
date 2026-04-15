"use client";


import { PartnerCustomizeStep } from "./partnerCustomizeStep";
import { ExhibitorCustomizeStep } from "./exhibitorCustomizeStep";
import { Nav } from "../../Navigation";
import { SpeakerCustomizeStep } from "./SpeakerCustomizeStep";

type Role = "speaker" | "partner" | "exhibitor";

type WorkspaceStepProps = {
  role: Role;
  onRoleChange: (role: Role) => void;
  onBackAction: () => void;
};

export function WorkspaceStep({
  role,
  onBackAction,
}: WorkspaceStepProps) {
  return (
    <section className="bg-white">
<Nav
  title="Speaker"
  onBackAction={onBackAction}
  titleVisibility="always"
/>

      {role === "speaker" && <SpeakerCustomizeStep />}
      {role === "partner" && <PartnerCustomizeStep />}
      {role === "exhibitor" && <ExhibitorCustomizeStep />}
    </section>
  );
}