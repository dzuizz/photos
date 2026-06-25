import Link from "next/link";
import type { Series } from "@/lib/types";
import { site } from "@/lib/site";
import styles from "./ContactSheetFooter.module.css";

interface FooterProps {
  seriesList: Series[];
  activeSlug?: string;
  hint?: string;
}

export default function ContactSheetFooter({
  seriesList,
  activeSlug,
  hint = site.footerHint,
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <p className={styles.hint}>{hint}</p>

      <nav id="site-nav" className={styles.nav} aria-label="Series and pages">
        <Link
          href="/"
          className={styles.link}
          data-active={activeSlug ? undefined : true}
        >
          Index
        </Link>
        {seriesList.map((s) => (
          <Link
            key={s.slug}
            href={`/series/${s.slug}`}
            className={styles.link}
            data-active={s.slug === activeSlug || undefined}
            aria-current={s.slug === activeSlug ? "page" : undefined}
          >
            {s.name}
          </Link>
        ))}
        <span className={styles.sep} aria-hidden="true" />
        <Link href="/about" className={styles.link}>
          About
        </Link>
        <Link href="/contact" className={styles.link}>
          Contact
        </Link>
      </nav>
    </footer>
  );
}
