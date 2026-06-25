import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import {
  getAllFrames,
  getFrame,
  getFrameNeighbours,
  getSeries,
} from "@/lib/data";
import { formatLongDate, formatPrintDate } from "@/lib/format";
import styles from "./frame.module.css";

interface FramePageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return getAllFrames().map((f) => ({ id: f.id }));
}

export function generateMetadata({ params }: FramePageProps): Metadata {
  const frame = getFrame(params.id);
  if (!frame) return { title: "Frame not found" };
  return {
    title: `${frame.frameNum} — ${frame.caption}`,
    description: `${frame.caption}, ${frame.location}. ${frame.filmStock}, ${frame.camera}.`,
  };
}

export default function FramePage({ params }: FramePageProps) {
  const frame = getFrame(params.id);
  if (!frame) notFound();

  const { prev, next } = getFrameNeighbours(params.id);
  const rollLabel = frame.rollId.replace(/-/g, " ").toLowerCase();

  return (
    <PageShell
      subLabel={`${rollLabel} · FRAME ${frame.frameNum}`}
      hint="ENLARGED FRAME · SINGLE EXPOSURE"
    >
      <article className={styles.detail}>
        <Link href="/" className={styles.back}>
          ← Back to contact sheet
        </Link>

        <div className={styles.layout}>
          <div className={styles.imageWrap}>
            <Image
              className={styles.image}
              src={frame.src}
              alt={`${frame.caption}, ${frame.location}`}
              width={frame.width}
              height={frame.height}
              sizes="(max-width: 899px) 92vw, 60vw"
              priority
            />
            <span className={styles.imageTag}>
              {frame.frameNum} · {formatPrintDate(frame.shootDate)}
            </span>
          </div>

          <div className={styles.info}>
            <p className={styles.caption}>{frame.caption}</p>

            <dl className={styles.fields}>
              <Field label="Location" value={frame.location} />
              <Field label="Date" value={formatLongDate(frame.shootDate)} />
              <Field label="Exposure" value={frame.filmStock} />
              <Field label="Camera" value={frame.camera} />
              <Field label="Lens" value={frame.lens} />
              <Field label="Frame id" value={frame.id} />
            </dl>

            {frame.series.length > 0 && (
              <div className={styles.seriesRow}>
                <span className={styles.fieldLabel}>Series</span>
                <span className={styles.seriesLinks}>
                  {frame.series.map((slug) => {
                    const s = getSeries(slug);
                    return (
                      <Link key={slug} href={`/series/${slug}`} className={styles.seriesLink}>
                        {s?.name ?? slug}
                      </Link>
                    );
                  })}
                </span>
              </div>
            )}

            <nav className={styles.stepper} aria-label="Adjacent frames">
              {prev ? (
                <Link href={`/frame/${prev.id}`} className={styles.step} rel="prev">
                  ← {prev.frameNum}
                </Link>
              ) : (
                <span className={styles.stepDisabled}>
                  <span aria-hidden="true">←</span>
                  <span className="srOnly">No earlier frame</span>
                </span>
              )}
              <span className={styles.stepDivider} aria-hidden="true">
                ✕
              </span>
              {next ? (
                <Link href={`/frame/${next.id}`} className={styles.step} rel="next">
                  {next.frameNum} →
                </Link>
              ) : (
                <span className={styles.stepDisabled}>
                  <span className="srOnly">No later frame</span>
                  <span aria-hidden="true">→</span>
                </span>
              )}
            </nav>
          </div>
        </div>
      </article>
    </PageShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.field}>
      <dt className={styles.fieldLabel}>{label}</dt>
      <dd className={styles.fieldValue}>{value}</dd>
    </div>
  );
}
