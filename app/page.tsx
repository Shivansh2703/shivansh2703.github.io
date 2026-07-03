import { SectionLabel } from "@/components/SectionLabel";
import { TechChips } from "@/components/TechChip";
import { BracketLink } from "@/components/Button";
import { about } from "@/content/about";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-24 sm:px-8">
      <SectionLabel index="00">design system</SectionLabel>

      <h1 className="mt-6 max-w-3xl text-balance text-5xl font-medium tracking-tight text-fg sm:text-7xl">
        {about.name}
      </h1>
      <p className="mt-4 max-w-xl font-mono text-sm text-accent">{about.role}</p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{about.blurb}</p>

      <div className="mt-8">
        <TechChips tags={about.stack} />
      </div>

      <div className="mt-10 flex flex-wrap gap-6">
        <BracketLink href={about.links.resume} external>
          résumé
        </BracketLink>
        <BracketLink href={about.links.github} variant="ghost" external>
          github
        </BracketLink>
        <BracketLink href={`mailto:${about.links.email}`} variant="ghost">
          email
        </BracketLink>
      </div>

      <hr className="mt-16 border-line" />
      <p className="mt-6 font-mono text-xs text-muted">
        Phase 1 shell — tokens, fonts, grid backdrop, and primitives wired.
      </p>
    </main>
  );
}
