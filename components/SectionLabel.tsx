import { cn } from "@/lib/cn";

/**
 * Monospace section marker, e.g. `01 / SELECTED WORK`.
 * The number and slash are accent-tinted; the label is muted uppercase.
 */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "m-0 flex items-center gap-2 font-mono text-xs font-normal tracking-[0.2em] text-muted uppercase",
        className,
      )}
    >
      <span className="text-accent">{index}</span>
      <span className="text-line">/</span>
      <span>{children}</span>
    </h2>
  );
}
