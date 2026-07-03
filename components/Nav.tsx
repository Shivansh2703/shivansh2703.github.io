import { about } from "@/content/about";
import { BracketLink } from "@/components/Button";

const links = [
  { href: "#work", label: "work" },
  { href: "#about", label: "about" },
  { href: "#experience", label: "experience" },
  { href: "#contact", label: "contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-base/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6 sm:px-8">
        <a
          href="#top"
          className="font-mono text-sm font-medium text-fg transition-colors hover:text-accent"
        >
          {about.name.toLowerCase().replace(/\s+/g, ".")}
          <span className="text-accent">_</span>
        </a>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 font-mono text-xs text-muted sm:flex">
            {links.map((l) => (
              <li key={l.href}>
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
