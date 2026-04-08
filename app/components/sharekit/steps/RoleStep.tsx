import { Role } from "@/lib/sharekit/types";

type Props = {
  onBack: () => void;
  onSelect: (role: Exclude<Role, null>) => void;
};

export function RoleStep({ onBack, onSelect }: Props) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <button onClick={onBack}>Zurück</button>

      <h1 className="mt-4 text-2xl font-semibold">Rolle wählen</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <button onClick={() => onSelect("speaker")}>Speaker</button>
        <button onClick={() => onSelect("exhibitor")}>Exhibitor</button>
      </div>
    </section>
  );
}