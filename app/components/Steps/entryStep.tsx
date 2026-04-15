"use client";

import { classNames } from "@/lib/classNames";
import { useState } from "react";
import { Button } from "../Button";
import { Toggle } from "../Toggle";

type Role = "speaker" | "exhibitor" | "partner";

type EntryStepProps = {
  onStartWithRole: (role: Role) => void;
  onSelectGeneralFlow: () => void;
};

export function EntryStep({
  onStartWithRole,
  onSelectGeneralFlow,
}: EntryStepProps) {
  const [role, setRole] = useState<Role>("exhibitor");

  return (
    <div
      className={classNames(
        "relative flex min-h-screen md:items-center justify-center",
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/hub-disrupt-mood-01.jpg')",
        }}
      />
      <div
        className={classNames(
          "absolute inset-0",
          "bg-black/40 backdrop-blur-xs",
        )}
      />

      <section
        className={classNames(
          "flex flex-col",
          "items-center",
          "relative z-10 w-full",
          "max-w-5xl",
          "rounded-[0px] md:rounded-[16px]",
          "bg-white",
          "px-10 md:px-20 py-15 md:py-20",
        )}
      >
        <div className="flex flex-col w-full items-center text-center gap-10 md:gap-15">
          <h1 className="text-3xl md:text-5xl">Erstelle dein Sharekit.</h1>

          <div className="flex flex-col gap-5">
            <p className="text-xl">Wähle deine Rolle</p>

            <div
              className={classNames("flex flex-row", "items-center", "gap-2.5")}
            >
              <Toggle
                value={role}
                onChange={setRole}
                options={[
                  /* { label: "Speaker", value: "speaker" }, */
                  { label: "Exhibitor", value: "exhibitor" },
                  /*  { label: "Partner", value: "partner" }, */
                ]}
              />

              <Button
                onClick={() => onStartWithRole(role)}
                variant="primary"
                label="Weiter"
              />
            </div>
          </div>

          <div className="h-px w-full bg-[#B9AEF3]" />

          <div
            className={classNames(
              "flex flex-col items-center",
              "gap-2.5 md:gap-5",
            )}
          >
            <h2 className="text-xl md:text-2xl">Oder direkt zu den Assets.</h2>
            <Button
              onClick={onSelectGeneralFlow}
              variant="outline"
              label="Assets ansehen"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
