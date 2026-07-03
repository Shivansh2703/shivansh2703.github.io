import type { Experience } from "@/content/experience";
import { workExperience, teamExperience } from "@/content/experience";

function Entry({ e }: { e: Experience }) {
  return (
    <li className="relative border-l border-line pl-6 pb-8 last:pb-0">
      <span className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full border border-accent bg-base" />
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="font-medium text-fg">
          {e.org}
          <span className="text-muted"> · </span>
          <span className="text-muted">{e.role}</span>
        </h4>
        {e.period && (
          <span className="font-mono text-xs text-muted">{e.period}</span>
        )}
      </div>

      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{e.summary}</p>

      <ul className="mt-3 space-y-1.5">
        {e.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-sm leading-relaxed text-muted">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {e.metrics && e.metrics.length > 0 && (
        <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
          {e.metrics.map((m) => (
            <div key={m.label} className="font-mono text-xs">
              <span className="text-fg">{m.value}</span>{" "}
              <span className="text-muted">{m.label}</span>
            </div>
          ))}
        </dl>
      )}
    </li>
  );
}

function Group({ label, items }: { label: string; items: Experience[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span className="text-line">— </span>
        {label}
      </h3>
      <ul>
        {items.map((e) => (
          <Entry key={`${e.org}-${e.period}`} e={e} />
        ))}
      </ul>
    </div>
  );
}

export function ExperienceTimeline() {
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <Group label="Work" items={workExperience} />
      <Group label="Teams & Involvement" items={teamExperience} />
    </div>
  );
}
