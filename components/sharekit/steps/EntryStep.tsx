"use client";

import { useState } from "react";

type Role = "speaker" | "visitor";

type EntryStepProps = {
  onStartWithRole: (role: Role) => void;
  onSelectGeneralFlow: () => void;
};

export function EntryStep({
  onStartWithRole,
  onSelectGeneralFlow,
}: EntryStepProps) {
  const [role, setRole] = useState<Role>("speaker");

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 md:p-8">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "public/sharekit/general-4.png",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <section className="relative z-10 w-full max-w-5xl rounded-[32px] bg-white px-6 py-8 shadow-xl md:px-12 md:py-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Create your sharekit asset.
          </h1>

          <div className="mt-8 w-full">
            <p className="mb-3 text-sm font-medium text-neutral-500">
              Select your role
            </p>

            <div className="inline-flex rounded-2xl bg-neutral-100 p-1">
              <button
                onClick={() => setRole("speaker")}
                className={`rounded-xl px-5 py-3 text-sm font-medium transition ${
                  role === "speaker"
                    ? "bg-black text-white"
                    : "text-neutral-700"
                }`}
              >
                Speaker
              </button>

              <button
                onClick={() => setRole("visitor")}
                className={`rounded-xl px-5 py-3 text-sm font-medium transition ${
                  role === "visitor"
                    ? "bg-black text-white"
                    : "text-neutral-700"
                }`}
              >
                Visitor
              </button>
            </div>
          </div>

          <button
            onClick={() => onStartWithRole(role)}
            className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-black px-8 text-base font-medium text-white transition hover:opacity-90"
          >
            Continue with this role
          </button>

          <div className="my-10 h-px w-full bg-neutral-200" />

          <div className="w-full">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              Or browse general assets.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-500 md:text-base">
              Open a simple gallery with downloadable visuals that do not need
              any personalization.
            </p>

            <button
              onClick={onSelectGeneralFlow}
              className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full border border-neutral-300 bg-white px-8 text-base font-medium text-neutral-900 transition hover:border-neutral-500"
            >
              View general assets
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}