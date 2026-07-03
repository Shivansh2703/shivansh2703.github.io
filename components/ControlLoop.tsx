"use client";

import { useEffect, useRef } from "react";

// A closed loop through the disciplines I actually work across — software →
// controls → hardware → electrical → mechanical and back around. Conceptual
// (a block diagram), not a performance claim, so it can't read as a fake metric.
const LOOP = "M78,46 H282 V124 H78 Z";
const PERIOD = 5600; // ms per lap

function Box({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <>
      <rect x={x} y={y} width={72} height={30} rx={5} fill="var(--surface-2)" stroke="var(--line)" />
      <text
        x={x + 36}
        y={y + 19}
        textAnchor="middle"
        className="font-mono"
        fontSize="9"
        fill="var(--fg)"
      >
        {label}
      </text>
    </>
  );
}

export function ControlLoop() {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;

    const len = path.getTotalLength();
    let raf = 0;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = ((t - start) % PERIOD) / PERIOD;
      const pt = path.getPointAtLength(p * len);
      dot.setAttribute("cx", String(pt.x));
      dot.setAttribute("cy", String(pt.y));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <figure
      aria-hidden="true"
      className="w-full max-w-md rounded-lg border border-line bg-surface/50 p-5"
    >
      <figcaption className="mb-3 flex items-center justify-between font-mono text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          closed loop
        </span>
        <span className="text-muted/70">sw → ctrl → hw → elec → mech</span>
      </figcaption>

      <svg viewBox="0 0 360 170" className="h-auto w-full" role="presentation">
        <defs>
          <filter id="dot-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* wire (also the motion path) */}
        <path ref={pathRef} d={LOOP} fill="none" stroke="var(--line)" strokeWidth="1.5" />

        {/* direction arrowheads — clockwise: top →→, right ↓, bottom ←, left ↑ */}
        <path d="M126,43 l6,3 -6,3 z" fill="var(--muted)" />
        <path d="M228,43 l6,3 -6,3 z" fill="var(--muted)" />
        <path d="M279,86 l3,6 3,-6 z" fill="var(--muted)" />
        <path d="M183,121 l-6,3 6,3 z" fill="var(--muted)" />
        <path d="M75,84 l3,-6 3,6 z" fill="var(--muted)" />

        {/* discipline blocks on the loop (software → controls → hardware on top) */}
        <Box x={42} y={31} label="software" />
        <Box x={144} y={31} label="controls" />
        <Box x={246} y={31} label="hardware" />
        <Box x={246} y={109} label="electrical" />
        <Box x={42} y={109} label="mechanical" />

        {/* traveling signal pulse */}
        <circle ref={dotRef} cx="78" cy="46" r="4" fill="var(--accent)" filter="url(#dot-glow)" />
      </svg>
    </figure>
  );
}
