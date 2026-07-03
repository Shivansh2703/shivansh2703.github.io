import { about } from "@/content/about";
import { TechChips } from "@/components/TechChip";
import { BracketLink } from "@/components/Button";
import { ControlLoop } from "@/components/ControlLoop";

export function Hero() {
  return (
    <section id="top" className="mx-auto w-full max-w-5xl px-6 pt-20 pb-24 sm:px-8 sm:pt-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono text-sm text-accent">{about.role}</p>
          <h1 className="mt-4 text-balance text-5xl font-medium tracking-tight text-fg sm:text-7xl">
            {about.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{about.blurb}</p>

          <div className="mt-8">
            <TechChips tags={about.disciplines} />
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            <BracketLink href="#work">selected work</BracketLink>
            <BracketLink href={about.links.github} variant="ghost" external>
              github
            </BracketLink>
            <BracketLink href={about.links.linkedin} variant="ghost" external>
              linkedin
            </BracketLink>
            <BracketLink href={`mailto:${about.links.email}`} variant="ghost">
              email
            </BracketLink>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <ControlLoop />
        </div>
      </div>
    </section>
  );
}
