import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { photographs } from "@/lib/photographs";

type Props = { params: { id: string } };
export function generateStaticParams() {
  return photographs.map((p) => ({ id: p.id }));
}
export function generateMetadata({ params }: Props): Metadata {
  const photo = photographs.find((p) => p.id === params.id);
  return {
    title: photo?.title ?? "Photograph not found",
    description: photo?.alt,
  };
}
export default function PhotographPage({ params }: Props) {
  const index = photographs.findIndex((p) => p.id === params.id);
  if (index < 0) notFound();
  const photo = photographs[index];
  const previous =
    photographs[(index - 1 + photographs.length) % photographs.length];
  const next = photographs[(index + 1) % photographs.length];
  return (
    <PageShell>
      <article className="photograph-page">
        <Link className="text-link" href="/#works">
          ← All photographs
        </Link>
        <div className="standalone-image">
          <Image
            src={photo.image}
            alt={photo.alt}
            priority
            placeholder="blur"
            sizes="90vw"
          />
        </div>
        <div className="standalone-caption">
          <div>
            <span className="eyebrow">
              {photo.category} / {String(index + 1).padStart(2, "0")}
            </span>
            <h1>{photo.title}</h1>
          </div>
          <nav aria-label="Adjacent photographs">
            <Link
              href={`/frame/${previous.id}`}
              aria-label={`Previous photograph: ${previous.title}`}
            >
              ← Previous
            </Link>
            <Link
              href={`/frame/${next.id}`}
              aria-label={`Next photograph: ${next.title}`}
            >
              Next →
            </Link>
          </nav>
        </div>
      </article>
    </PageShell>
  );
}
