import Link from "next/link";
import PageShell from "@/components/PageShell";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <PageShell subLabel="FRAME NOT FOUND" hint="BLANK FRAME · 404">
      <div className={styles.notfound}>
        <span className={styles.code}>✕ 404</span>
        <h1 className={styles.title}>blank frame</h1>
        <p className={styles.copy}>
          this exposure never made it onto the roll — fogged in the tank, lost to
          a light leak, or never shot at all.
        </p>
        <Link href="/" className={styles.back}>
          ← back to the contact sheet
        </Link>
      </div>
    </PageShell>
  );
}
