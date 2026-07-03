"use client";

import { useEffect, useRef } from "react";

// A closed-loop control diagram — controller → plant → sensor feedback — with a
// signal pulse traveling the loop. Conceptual (a textbook block diagram), not a
// performance claim, so it can't be misread as a fabricated metric.
const LOOP = "M72,52 H328 V128 H32 V52 Z";
const PERIOD = 4600; // ms per lap

function Box({ x, label }: { x: number; label: string }) {
  return (
    <>
      <rect
        x={x}
        y={37}
        width={72}
        height={30}
        rx={5}
        fill="var(--surface-2)"
        stroke="var(--line)"
      />
      <text
        x={x + 36}
        y={55}
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
          closed-loop control
        </span>
        <span className="text-muted/70">r → e → u → y</span>
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
        <path
          ref={pathRef}
          d={LOOP}
          fill="none"
          stroke="var(--line)"
          strokeWidth="1.5"
        />

        {/* direction arrowheads */}
        <path d="M296,49 l6,3 -6,3 z" fill="var(--muted)" />
        <path d="M325,98 l3,6 3,-6 z" fill="var(--muted)" />
        <path d="M116,125 l-6,3 6,3 z" fill="var(--muted)" />
        <path d="M29,92 l3,-6 3,6 z" fill="var(--muted)" />

        {/* summing junction */}
        <circle cx="72" cy="52" r="11" fill="var(--surface-2)" stroke="var(--line)" />
        <text x="72" y="56" textAnchor="middle" className="font-mono" fontSize="12" fill="var(--muted)">
          +
        </text>
        <text x="54" y="44" textAnchor="middle" className="font-mono" fontSize="9" fill="var(--accent)">
          r
        </text>

        {/* blocks */}
        <Box x={112} label="controller" />
        <Box x={214} label="plant" />
        {/* sensor sits on the feedback (bottom) path */}
        <rect x={196} y={113} width={72} height={30} rx={5} fill="var(--surface-2)" stroke="var(--line)" />
        <text x={232} y={131} textAnchor="middle" className="font-mono" fontSize="9" fill="var(--fg)">
          sensor
        </text>

        {/* output node */}
        <circle cx="328" cy="52" r="4" fill="var(--base)" stroke="var(--muted)" />
        <text x="330" y="42" textAnchor="middle" className="font-mono" fontSize="9" fill="var(--muted)">
          y
        </text>

        {/* traveling signal pulse */}
        <circle ref={dotRef} cx="72" cy="52" r="4" fill="var(--accent)" filter="url(#dot-glow)" />
      </svg>

      <div className="mt-1 flex justify-between font-mono text-[10px] tracking-wide text-muted/70">
        <span>controller</span>
        <span>plant</span>
        <span>sensor</span>
      </div>
    </figure>
  );
}
