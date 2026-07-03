"use client";

import { useEffect, useRef, useState } from "react";

const N = 40; // points in the window
const W = 320;
const H = 96;

function seedSeries(): number[] {
  // Deterministic baseline — must be identical on the server (prerender) and the
  // client's first render, or hydration mismatches. Randomness lives only in
  // nextValue(), which runs post-mount inside the rAF loop.
  return Array.from({ length: N }, (_, i) => {
    const base = 0.4 + 0.12 * Math.sin(i / 3) + 0.05 * Math.sin(i / 1.7);
    const spike = i % 11 === 0 ? 0.3 : 0;
    return Math.min(1, base + spike);
  });
}

function nextValue(prev: number): number {
  const spike = Math.random() < 0.12 ? Math.random() * 0.5 : 0;
  const drift = (0.4 - prev) * 0.25; // pull back toward baseline
  return Math.max(0.05, Math.min(1, prev + drift + spike + (Math.random() - 0.5) * 0.12));
}

function toPath(series: number[]): { line: string; area: string } {
  const step = W / (N - 1);
  const y = (v: number) => H - 6 - v * (H - 16);
  const pts = series.map((v, i) => `${(i * step).toFixed(1)},${y(v).toFixed(1)}`);
  const line = `M${pts.join(" L")}`;
  const area = `${line} L${W},${H} L0,${H} Z`;
  return { line, area };
}

export function LatencyTicker() {
  const [series, setSeries] = useState<number[]>(seedSeries);
  const raf = useRef<number>(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // render the static seeded frame

    let last = 0;
    const tick = (t: number) => {
      if (t - last > 110) {
        last = t;
        setSeries((s) => [...s.slice(1), nextValue(s[s.length - 1])]);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const { line, area } = toPath(series);
  const latest = series[series.length - 1];
  const readout = (0.4 + latest * 1.2).toFixed(2); // decorative µs figure

  return (
    <figure
      aria-hidden="true"
      className="w-full max-w-sm rounded-lg border border-line bg-surface/50 p-4"
    >
      <figcaption className="mb-3 flex items-center justify-between font-mono text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          latency monitor
          <span className="rounded-sm border border-line px-1 text-[9px] tracking-wider text-muted/70">
            SIM
          </span>
        </span>
        <span className="tabular-nums text-fg">
          {readout}
          <span className="text-muted"> µs</span>
        </span>
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-24 w-full"
        preserveAspectRatio="none"
        role="presentation"
      >
        <defs>
          <linearGradient id="lat-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#lat-fill)" />
        <path
          d={line}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mt-2 flex justify-between font-mono text-[10px] tracking-wide text-muted/70">
        <span>p50</span>
        <span>synthetic signal</span>
        <span>p99</span>
      </div>
    </figure>
  );
}
