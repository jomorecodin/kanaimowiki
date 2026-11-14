import type { Estado } from "../data/types";

const config: Record<Estado, { label: string; className: string }> = {
  confirmada: {
    label: "Confirmada",
    className: "bg-sabana/20 text-sabana",
  },
  propuesta: {
    label: "Propuesta",
    className: "bg-oro/20 text-oro",
  },
  pendiente: {
    label: "Pendiente",
    className: "bg-roca-dark/20 text-roca-dark",
  },
};

export function StatusBadge({ estado }: { estado: Estado }) {
  const { label, className } = config[estado];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${className}`}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
