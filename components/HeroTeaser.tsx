import Link from "next/link";
import type { Project } from "@/content/projects";
import { TechChips } from "@/components/TechChip";

export function HeroTeaser({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="group block rounded-lg border border-line bg-surface/40 p-6 transition-colors hover:border-accent/40 hover:bg-surface sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-accent">{num}</span>
          <h3 className="text-2xl font-medium tracking-tight text-fg transition-colors group-hover:text-accent sm:text-3xl">
            {project.name}
          </h3>
        </div>
        <span className="shrink-0 font-mono text-xs text-muted">{project.year}</span>
      </div>

      {project.role && (
        <p className="mt-1 font-mono text-xs text-muted">{project.role}</p>
      )}

      <p className="mt-3 max-w-2xl text-muted">{project.tagline}</p>

      {project.metrics && project.metrics.length > 0 && (
        <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-[11px] uppercase tracking-wide text-muted">
                {m.label}
              </dt>
              <dd className="font-mono text-sm text-fg">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        <TechChips tags={project.tags} />
        <span className="shrink-0 font-mono text-xs text-muted transition-colors group-hover:text-accent">
          case study{" "}
          <span className="inline-block transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
