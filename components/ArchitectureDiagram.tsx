import { Fragment } from "react";

/**
 * Renders the `architecture` text pipeline as styled stage boxes + connectors.
 * Deterministic and data-driven — split on arrows, no per-project hardcoding.
 * A trailing clause after the last arrow (e.g. "… over a ROS2 graph") is kept
 * as a caption rather than forced into a box.
 */
export function ArchitectureDiagram({ architecture }: { architecture: string }) {
  // Separate an optional trailing prose clause (after ; or "over"/"with").
  const [pipeline, ...tailParts] = architecture.split(/;\s+/);
  const tail = tailParts.join("; ").trim();

  const stages = pipeline
    .split(/\s*(?:→|↔|⇄|->)\s*/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (stages.length < 2) {
    // Not a pipeline — just render the sentence.
    return <p className="text-sm leading-relaxed text-muted">{architecture}</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-stretch gap-y-3">
        {stages.map((stage, i) => (
          <Fragment key={i}>
            <div className="flex items-center rounded-md border border-line bg-surface/60 px-3 py-2 font-mono text-xs text-fg">
              {stage}
            </div>
            {i < stages.length - 1 && (
              <div className="flex items-center px-2 font-mono text-accent" aria-hidden>
                →
              </div>
            )}
          </Fragment>
        ))}
      </div>
      {tail && <p className="mt-3 font-mono text-xs text-muted">{tail}</p>}
    </div>
  );
}
