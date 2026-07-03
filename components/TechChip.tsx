import { cn } from "@/lib/cn";

/** Monospace tech tag — used for stack chips on cards and case studies. */
export function TechChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface/60 px-2.5 py-0.5",
        "font-mono text-[11px] leading-5 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TechChips({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <li key={t}>
          <TechChip>{t}</TechChip>
        </li>
      ))}
    </ul>
  );
}
