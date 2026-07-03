"use client";

import { useEffect, useRef } from "react";

// The disciplines I work across, arranged as an actual closed loop:
// mechanical → electrical → hardware → controls → software → back around.
// A signal pulse travels the ring. Conceptual — a diagram, not a metric.
const CX = 160;
const CY = 150;
const R = 100;
// Full circle as two arcs, traced clockwise from the top (12 o'clock).
const RING = `M${CX},${CY - R} A${R},${R} 0 0,1 ${CX},${CY + R} A${R},${R} 0 0,1 ${CX},${CY - R}`;
const PERIOD = 6000; // ms per lap

// Clockwise angle from the top (deg) → point on the ring.
function onRing(deg: number, radius = R) {
  const a = (deg * Math.PI) / 180;
  return { x: CX + radius * Math.sin(a), y: CY - radius * Math.cos(a) };
}

// Nodes in flow order, starting at the top and going clockwise.
const NODES = ["mechanical", "electrical", "hardware", "controls", "software"].map(
  (label, i) => ({ label, ...onRing(i * 72) }),
);

// Direction arrowheads sit on the ring at the midpoint between each pair.
const ARROWS = [36, 108, 180, 252, 324].map((deg) => ({ deg, ...onRing(deg) }));

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
      <svg viewBox="0 0 320 300" className="h-auto w-full" role="presentation">
        <defs>
          <filter id="dot-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* the loop (also the motion path) */}
        <path ref={pathRef} d={RING} fill="none" stroke="var(--line)" strokeWidth="1.5" />

        {/* clockwise direction arrowheads */}
        {ARROWS.map((a) => (
          <path
            key={a.deg}
            d="M-3.5,-3 L3.5,0 L-3.5,3 Z"
            fill="var(--muted)"
            transform={`translate(${a.x.toFixed(1)},${a.y.toFixed(1)}) rotate(${a.deg})`}
          />
        ))}

        {/* discipline nodes */}
        {NODES.map((n) => (
          <g key={n.label}>
            <rect
              x={n.x - 37}
              y={n.y - 13}
              width={74}
              height={26}
              rx={13}
              fill="var(--surface-2)"
              stroke="var(--line)"
            />
            <text
              x={n.x}
              y={n.y + 3.5}
              textAnchor="middle"
              className="font-mono"
              fontSize="9.5"
              fill="var(--fg)"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* traveling signal pulse */}
        <circle
          ref={dotRef}
          cx={CX}
          cy={CY - R}
          r="4.5"
          fill="var(--accent)"
          filter="url(#dot-glow)"
        />
      </svg>
    </figure>
  );
}
