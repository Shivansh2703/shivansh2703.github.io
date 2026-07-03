import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

const base =
  "group inline-flex items-center gap-1.5 font-mono text-sm transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary: "text-fg hover:text-accent",
  ghost: "text-muted hover:text-fg",
};

/** Terminal-bracket CTA: `[ label ]` where the brackets glow on hover. */
export function BracketLink({
  href,
  children,
  variant = "primary",
  external,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "text-line transition-colors",
          variant === "primary" ? "group-hover:text-accent" : "group-hover:text-fg",
        )}
      >
        [
      </span>
      <span>{children}</span>
      <span
        aria-hidden
        className={cn(
          "text-line transition-colors",
          variant === "primary" ? "group-hover:text-accent" : "group-hover:text-fg",
        )}
      >
        ]
      </span>
    </>
  );

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className={cn(base, variants[variant], className)}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {inner}
    </Link>
  );
}
