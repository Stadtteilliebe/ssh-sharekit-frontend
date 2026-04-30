"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { buildUpdatedQueryString, getParam } from "@/lib/sharekit/urlState";
import type { SharekitOption } from "@/lib/sharekit/types";
import { EntryStep } from "./entryStep";
import { GeneralGalleryStep } from "./generalGalleryStep";
import { WorkspaceStep } from "./workspaceStep";

type Step = "entry" | "general-gallery" | "workspace";
type Role = "speaker" | "partner" | "exhibitor";

type SharekitFlowProps = {
  exhibitorOptions: SharekitOption[];
  partnerOptions: SharekitOption[];
};

export function SharekitFlow({
  exhibitorOptions,
  partnerOptions,
}: SharekitFlowProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const step = getParam(searchParams, "step", "entry") as Step;
  const role = getParam(searchParams, "role", "speaker") as Role;

  function updateUrl(updates: Record<string, string | null | undefined>) {
    const query = buildUpdatedQueryString(searchParams, updates);
    router.replace(`${pathname}?${query}`, { scroll: false });
  }

  if (step === "entry") {
    return (
      <EntryStep
        onStartWithRole={(nextRole) => {
          updateUrl({
            step: "workspace",
            role: nextRole,
            item: null,
            format: "landscape",
            sticker: "none",
          });
        }}
        onSelectGeneralFlow={() => {
          updateUrl({
            step: "general-gallery",
          });
        }}
      />
    );
  }

  if (step === "general-gallery") {
    return (
      <GeneralGalleryStep
        onBackAction={() => {
          updateUrl({
            step: "entry",
          });
        }}
      />
    );
  }

  if (step === "workspace") {
    return (
      <main className="min-h-screen text-neutral-900">
        <div className="mx-auto">
          <WorkspaceStep
            role={role}
            exhibitorOptions={exhibitorOptions}
            partnerOptions={partnerOptions}
            onRoleChangeAction={(nextRole) => {
              updateUrl({
                role: nextRole,
                item: null,
                format: "landscape",
                sticker: "none",
              });
            }}
            onBackAction={() => {
              updateUrl({
                step: "entry",
              });
            }}
          />
        </div>
      </main>
    );
  }

  return null;
}