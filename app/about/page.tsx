import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { aboutContent } from "@/lib/content";
import { site } from "@/lib/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.photographer} — ${site.tagline}`,
};

export default function AboutPage() {
  return (
    <PageShell subLabel="ABOUT THE PHOTOGRAPHER" hint="ABOUT">
      <article className={styles.about}>
        <div className={styles.grid}>
          <div className={styles.body}>
            <h1 className={styles.heading}>{aboutContent.heading}</h1>
            {aboutContent.paragraphs.map((para, i) => (
              <p key={i} className={styles.para}>
                {para}
              </p>
            ))}
            <p className={styles.signoff}>— {site.photographer}</p>
          </div>

          <aside className={styles.annotations} aria-label="photographer details">
            <span className={styles.annHead}>marginalia</span>
            <dl className={styles.annList}>
              {aboutContent.annotations.map((a) => (
                <div key={a.label} className={styles.annRow}>
                  <dt className={styles.annLabel}>{a.label}</dt>
                  <dd className={styles.annValue}>{a.value}</dd>
                </div>
              ))}
            </dl>
            <Link href="/contact" className={styles.contactLink}>
              order a print / commission:{' '}
            </Link>
          </aside>
        </div>
      </article>
    </PageShell>
  );
}
