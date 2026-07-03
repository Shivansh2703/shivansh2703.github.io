import type { Project } from "@/content/projects";
import { TechChips } from "@/components/TechChip";

function RepoState({ repo }: { repo?: string | null }) {
  if (repo) {
    return (
      <span className="font-mono text-xs text-link transition-colors group-hover:text-accent">
        repo ↗
      </span>
    );
  }
  return (
    <span className="font-mono text-[11px] text-muted/80">Private · coming soon</span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-medium text-fg transition-colors group-hover:text-accent">
          {project.name}
        </h3>
        <span className="shrink-0 font-mono text-[11px] text-muted">{project.year}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>

      {project.metrics?.[0] && (
        <p className="mt-3 font-mono text-xs text-fg">
          <span className="text-accent">›</span> {project.metrics[0].value}{" "}
          <span className="text-muted">{project.metrics[0].label}</span>
        </p>
      )}

      <div className="mt-4 flex items-end justify-between gap-3">
        <TechChips tags={project.tags.slice(0, 4)} />
        <RepoState repo={project.repo} />
      </div>
    </>
  );

  const base = "flex h-full flex-col rounded-lg border border-line bg-surface/40 p-5";

  // Only the linked variant is a `group` and gets hover affordances — a plain
  // <div> must not signal clickability (title group-hover + surface hover).
  if (project.repo) {
    return (
      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        className={`group ${base} transition-colors hover:border-accent/40 hover:bg-surface`}
      >
        {inner}
      </a>
    );
  }
  return <div className={base}>{inner}</div>;
}
