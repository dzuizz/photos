import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { site } from "@/lib/site";
export const metadata: Metadata = { title: "Get in touch" };
export default function ContactPage() {
  return (
    <PageShell>
      <section className="info-page">
        <span className="eyebrow">Get in touch</span>
        <h1>
          Let’s start a<br />
          <em>conversation.</em>
        </h1>
        <p className="lede">
          For print enquiries, collaborations, or a simple hello.
        </p>
        <a className="contact-email" href={`mailto:${site.email}`}>
          {site.email} ↗
        </a>
        <div className="info-links">
          <a
            className="text-link"
            href={`https://instagram.com/${site.instagram.slice(1)}`}
            target="_blank"
            rel="noreferrer"
          >
            Find me on Instagram ↗
          </a>
        </div>
      </section>
    </PageShell>
  );
}
