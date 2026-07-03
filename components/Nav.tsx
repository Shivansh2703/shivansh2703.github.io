import Link from "next/link";
import { about } from "@/content/about";
import { BracketLink } from "@/components/Button";

// Root-relative so the anchors resolve from any route (e.g. /projects/<slug>/),
// not just the home page.
const links = [
  { href: "/#work", label: "work", always: true },
  { href: "/#experience", label: "experience", always: false },
  { href: "/#about", label: "about", always: false },
  { href: "/#contact", label: "contact", always: true },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-base/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="font-mono text-sm font-medium text-fg transition-colors hover:text-accent"
        >
          {about.name.toLowerCase().replace(/\s+/g, ".")}
          <span className="text-accent">_</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <ul className="flex items-center gap-4 font-mono text-xs text-muted sm:gap-6">
            {links.map((l) => (
              <li key={l.href} className={l.always ? "" : "hidden sm:block"}>
                <a href={l.href} className="transition-colors hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <BracketLink href={about.links.resume} external>
            résumé
          </BracketLink>
        </div>
      </nav>
    </header>
  );
}
