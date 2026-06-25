import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactSheet from "@/components/ContactSheet";
import {
  getRollsForSeries,
  getSeries,
  getSeriesList,
} from "@/lib/data";

interface SeriesPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getSeriesList().map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: SeriesPageProps): Metadata {
  const series = getSeries(params.slug);
  if (!series) return { title: "Series not found" };
  return { title: series.name, description: series.description };
}

// render
export default function SeriesPage({ params }: SeriesPageProps) {
  const series = getSeries(params.slug);
  if (!series) notFound();

  const rolls = getRollsForSeries(params.slug);
  const frameCount = rolls.reduce((n, r) => n + r.frames.length, 0);

  return (
    <ContactSheet
      rolls={rolls}
      seriesList={getSeriesList()}
      activeSlug={series.slug}
      headerSubLabel={`SERIES · ${series.name.toLowerCase()} — ${frameCount} ${
        frameCount === 1 ? "FRAME" : "FRAMES"
      }`}
      intro={series.description}
    />
  );
}
