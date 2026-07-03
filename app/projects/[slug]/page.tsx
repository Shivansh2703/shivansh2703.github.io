import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { heroProjects } from "@/content/projects";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";

// Only hero projects get case-study pages. Flipping a grid project's tier back
// to "hero" (re-promotion) generates its page automatically on the next build.
export function generateStaticParams() {
  return heroProjects.map((p) => ({ slug: p.slug }));
}

// Unlisted slugs 404 instead of being generated on demand (required for export).
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = heroProjects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: project.name,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = heroProjects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <CaseStudyLayout project={project} />;
}
