import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./ContactSheetHeader.module.css";

interface HeaderProps {
  subLabel?: string;
}

export default function ContactSheetHeader({ subLabel }: HeaderProps) {
  const { brand, studioMeta } = site;
  return (
    <header className={styles.header}>
      <div className={styles.brandBlock}>
        <Link href="/" className={styles.brand}>
          {brand}
        </Link>
        <span className={styles.sub}>{subLabel ?? site.subLabel}</span>
      </div>

      <dl className={styles.studio} aria-label="Print metadata">
        <div className={styles.studioRow}>
          <dt className="srOnly">Film &amp; format</dt>
          <dd>{studioMeta.stock}</dd>
        </div>
        <div className={styles.studioRow}>
          <dt className="srOnly">Bodies</dt>
          <dd>{studioMeta.body}</dd>
        </div>
        <div className={styles.studioRow}>
          <dt className="srOnly">Print date</dt>
          <dd>PRINTED {studioMeta.printDate}</dd>
        </div>
      </dl>
    </header>
  );
}
