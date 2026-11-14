export function TepuyScene() {
  return (
    <div className="relative h-[200px] w-full overflow-hidden" aria-hidden="true">
      {/* Sky */}
      <div className="absolute inset-0 bg-oro/10" />
      {/* Back layer */}
      <div
        className="absolute inset-x-0 bottom-0 h-[70%] opacity-50"
        style={{
          background: "var(--color-roca-dark)",
          clipPath:
            "polygon(0% 100%, 10% 40%, 20% 35%, 30% 45%, 35% 20%, 45% 15%, 55% 18%, 60% 40%, 70% 30%, 80% 25%, 90% 50%, 100% 45%, 100% 100%)",
        }}
      />
      {/* Mid layer */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%] opacity-60"
        style={{
          background: "var(--color-roca)",
          clipPath:
            "polygon(0% 100%, 5% 60%, 15% 50%, 25% 55%, 30% 30%, 40% 25%, 50% 28%, 55% 50%, 65% 45%, 75% 35%, 85% 55%, 95% 40%, 100% 60%, 100% 100%)",
        }}
      />
      {/* Front layer */}
      <div
        className="absolute inset-x-0 bottom-0 h-[35%] opacity-80"
        style={{
          background: "var(--color-sabana)",
          clipPath:
            "polygon(0% 100%, 0% 40%, 15% 50%, 30% 30%, 50% 45%, 70% 25%, 85% 40%, 100% 35%, 100% 100%)",
        }}
      />
      {/* Waterfall */}
      <div className="absolute left-[42%] top-[18%] h-[40%] w-[2px] animate-pulse rounded-full bg-neblina/40" />
    </div>
  );
}
