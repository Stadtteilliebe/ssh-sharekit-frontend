type EntryStepProps = {
  onSelectRoleFlow: () => void;
  onSelectGeneralFlow: () => void;
};

export function EntryStep({
  onSelectRoleFlow,
  onSelectGeneralFlow,
}: EntryStepProps) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold">Sharekit</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <button
          onClick={onSelectRoleFlow}
          className="rounded-xl border p-6 text-left"
        >
          <div className="font-medium">Ich habe eine Rolle</div>
        </button>

        <button
          onClick={onSelectGeneralFlow}
          className="rounded-xl border p-6 text-left"
        >
          <div className="font-medium">Allgemeine Bilder</div>
        </button>
      </div>
    </section>
  );
}