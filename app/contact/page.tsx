import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { contactContent } from "@/lib/content";
import { site } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: contactContent.intro,
};

export default function ContactPage() {
  return (
    <PageShell subLabel="CONTACT" hint="ENQUIRIES · CONTACT">
      <div className={styles.contact}>
        <div className={styles.intro}>
          <h1 className={styles.heading}>{contactContent.heading}</h1>
          <p className={styles.lede}>{contactContent.intro}</p>
          <p className={styles.channels}>
            <a href={`mailto:${site.email}`} className={styles.channel}>
              {site.email}
            </a>
            <span className={styles.dot} aria-hidden="true">
              ·
            </span>
            <a
              href={`https://instagram.com/${site.instagram.replace("@", "")}`}
              className={styles.channel}
              target="_blank"
              rel="noreferrer"
            >
              Instagram {site.instagram}
            </a>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
