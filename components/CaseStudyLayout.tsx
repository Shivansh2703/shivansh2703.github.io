import type { Project } from "@/content/projects";
import { TechChips } from "@/components/TechChip";
import { MetricCounter } from "@/components/MetricCounter";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { BracketLink } from "@/components/Button";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">/ </span>
        {label}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3 leading-relaxed text-muted">
          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyLayout({ project }: { project: Project }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8">
      <BracketLink href="/#work" variant="ghost">
        ← selected work
      </BracketLink>

      {/* Header */}
      <header className="mt-8">
        {project.role && (
          <p className="font-mono text-sm text-accent">{project.role}</p>
        )}
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4">
          <h1 className="text-4xl font-medium tracking-tight text-fg sm:text-5xl">
            {project.name}
          </h1>
          <span className="font-mono text-sm text-muted">{project.year}</span>
        </div>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {project.tagline}
        </p>
        <div className="mt-6">
          <TechChips tags={project.tags} />
        </div>
      </header>

      {/* Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-3">
          {project.metrics.map((m) => (
            <MetricCounter key={m.label} metric={m} />
          ))}
        </dl>
      )}

      <div className="mt-12 space-y-10">
        {project.problem && (
          <Block label="the problem">
            <p className="max-w-2xl leading-relaxed text-muted">{project.problem}</p>
          </Block>
        )}

        {project.approach && project.approach.length > 0 && (
          <Block label="approach">
            <Bullets items={project.approach} />
          </Block>
        )}

        {project.results && project.results.length > 0 && (
          <Block label="results">
            <Bullets items={project.results} />
          </Block>
        )}

        {project.architecture && (
          <Block label="architecture">
            <ArchitectureDiagram architecture={project.architecture} />
          </Block>
        )}

        {/* Media (Phase 5): renders only once files exist and arrays are uncommented. */}
        {project.media && project.media.length > 0 && (
          <Block label="media">
            <div className="grid gap-6">
              {project.media.map((m) =>
                m.type === "video" ? (
                  <figure key={m.src}>
                    <video
                      className="mx-auto max-h-[70vh] w-full rounded-lg border border-line bg-black object-contain"
                      controls
                      muted
                      playsInline
                      preload="metadata"
                    >
                      <source src={m.src} type="video/mp4" />
                    </video>
                    <figcaption className="mt-2 font-mono text-xs text-muted">
                      {m.alt}
                    </figcaption>
                  </figure>
                ) : (
                  <figure key={m.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="w-full rounded-lg border border-line"
                      src={m.src}
                      alt={m.alt}
                    />
                    <figcaption className="mt-2 font-mono text-xs text-muted">
                      {m.alt}
                    </figcaption>
                  </figure>
                ),
              )}
            </div>
          </Block>
        )}

        {/* Links */}
        <Block label="links">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {project.repo ? (
              <BracketLink href={project.repo} external>
                repository
              </BracketLink>
            ) : (
              <span className="font-mono text-sm text-muted/80">
                repository · private, coming soon
              </span>
            )}
            {project.links?.map((l) => (
              <BracketLink key={l.url} href={l.url} external>
                {l.label}
              </BracketLink>
            ))}
            <BracketLink href="/#work" variant="ghost">
              back to work
            </BracketLink>
          </div>
        </Block>
      </div>
    </main>
  );
}
