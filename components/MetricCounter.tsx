"use client";

import { useEffect, useRef, useState } from "react";
import type { Metric } from "@/content/projects";

/**
 * Parse a metric value into an animatable number, but only when the value is
 * genuinely numeric-led. Rejects ordinals ("1st / 150+ teams") and hyphenated
 * tokens ("3-DOF IK") so we never count-up something that isn't a magnitude.
 */
function parseAnimatable(value: string) {
  const m = value.match(/^([+<~≈]*)\s*(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const [, prefix, numStr, rest] = m;
  // Reject ordinals (1st/2nd) and hyphen-joined tokens (3-DOF).
  if (/^(st|nd|rd|th)\b/i.test(rest.trim()) || /^-/.test(rest)) return null;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const grouped = numStr.includes(",");
  const target = parseFloat(numStr.replace(/,/g, ""));
  if (!isFinite(target)) return null;
  return { prefix, rest, decimals, grouped, target };
}

function format(n: number, decimals: number, grouped: boolean) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  });
}

export function MetricCounter({ metric }: { metric: Metric }) {
  const parsed = parseAnimatable(metric.value);
  // SSR + first client render = the REAL final value. Screen readers, SEO, no-JS,
  // and prefers-reduced-motion all get the true number; hydration can't mismatch.
  const [display, setDisplay] = useState(metric.value);
  const ref = useRef<HTMLDivElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (!parsed || ran.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const animate = () => {
      ran.current = true;
      const { prefix, rest, decimals, grouped, target } = parsed;
      const dur = 900;
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        if (p < 1) {
          setDisplay(`${prefix}${format(target * eased, decimals, grouped)}${rest}`);
          requestAnimationFrame(step);
        } else {
          setDisplay(metric.value); // land exactly on the source string
        }
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !ran.current) animate();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref}>
      <dt className="font-mono text-[11px] uppercase tracking-wide text-muted">
        {metric.label}
      </dt>
      <dd className="mt-1 font-mono text-xl text-fg tabular-nums sm:text-2xl">
        {display}
      </dd>
    </div>
  );
}
