import { Hero } from "@/components/Hero";
import { SectionLabel } from "@/components/SectionLabel";
import { HeroTeaser } from "@/components/HeroTeaser";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { TechChip } from "@/components/TechChip";
import { BracketLink } from "@/components/Button";
import { heroProjects, gridProjects } from "@/content/projects";
import { about } from "@/content/about";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* 01 — Selected Work */}
      <section id="work" className="mx-auto w-full max-w-5xl scroll-mt-16 px-6 py-16 sm:px-8">
        <SectionLabel index="01">selected work</SectionLabel>
        <div className="mt-8 grid gap-4">
          {heroProjects.map((p, i) => (
            <HeroTeaser key={p.slug} project={p} index={i} />
          ))}
        </div>

        <h3 className="mt-14 mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-line">— </span>more work
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gridProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* 02 — Experience */}
      <section
        id="experience"
        className="mx-auto w-full max-w-5xl scroll-mt-16 px-6 py-16 sm:px-8"
      >
        <SectionLabel index="02">experience &amp; involvement</SectionLabel>
        <div className="mt-8">
          <ExperienceTimeline />
        </div>
      </section>

      {/* 03 — Contact */}
      <section id="contact" className="mx-auto w-full max-w-5xl scroll-mt-16 px-6 py-20 sm:px-8">
        <SectionLabel index="03">contact</SectionLabel>
        <h2 className="mt-6 max-w-3xl text-balance text-3xl font-medium tracking-tight text-fg sm:text-5xl">
          Have a hard problem that spans a few disciplines?
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          I&apos;m open to engineering roles and collaborations — robotics, AI, and anything that
          needs building end to end.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          <BracketLink href={`mailto:${about.links.email}`}>{about.links.email}</BracketLink>
          <BracketLink href={about.links.linkedin} variant="ghost" external>
            linkedin
          </BracketLink>
          <BracketLink href={about.links.github} variant="ghost" external>
            github
          </BracketLink>
        </div>
      </section>

      {/* 04 — About (moved to the bottom) */}
      <section id="about" className="mx-auto w-full max-w-5xl scroll-mt-16 px-6 py-16 sm:px-8">
        <SectionLabel index="04">about</SectionLabel>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-fg">{about.bio}</p>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted">{about.athletics}</p>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                <span className="text-line">— </span>stack
              </h3>
              <ul className="flex flex-wrap gap-2">
                {about.stack.map((s) => (
                  <li key={s}>
                    <TechChip>{s}</TechChip>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                <span className="text-line">— </span>hackathons
              </h3>
              <ul className="flex flex-wrap gap-2">
                {about.hackathons.map((h) => (
                  <li key={h}>
                    <TechChip>{h}</TechChip>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
