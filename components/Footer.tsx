import { about } from "@/content/about";
import { BracketLink } from "@/components/Button";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted">
            {about.name.toLowerCase().replace(/\s+/g, ".")}
            <span className="text-accent">_</span> · built with next.js, deployed on
            github pages
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <BracketLink href={`mailto:${about.links.email}`} variant="ghost">
              email
            </BracketLink>
            <BracketLink href={about.links.github} variant="ghost" external>
              github
            </BracketLink>
            <BracketLink href={about.links.linkedin} variant="ghost" external>
              linkedin
            </BracketLink>
            <BracketLink href={about.links.resume} variant="ghost" external>
              résumé
            </BracketLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
