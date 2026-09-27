import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import portrait from "@/pictures/pfp.jpeg";
export const metadata: Metadata = { title: "About" };
export default function AboutPage() {
  return (
    <PageShell>
      <article className="info-page photographer-page">
        <div className="photographer-copy">
          <span className="eyebrow">Behind the photographs</span>
          <h1>
            Hi, I’m <em>Dzuizz.</em>
          </h1>
          <p className="lede">
            A photographer based in Singapore, noticing the little things along
            the way.
          </p>
          <p className="lede">
            This collection moves between landscapes, life on the street, and
            the natural world. A place to pause, look closer, and find something
            in the everyday.
          </p>
          <div className="info-links">
            <Link className="text-link" href="/#works">
              Explore the photographs ↗
            </Link>
            <Link className="text-link" href="/contact">
              Get in touch ↗
            </Link>
          </div>
          <span className="eyebrow">Singapore · Sony α6400</span>
        </div>
        <figure className="photographer-portrait">
          <Image
            src={portrait}
            alt="Ahmad Dzuizz Annajib holding a camera against colorful nighttime light trails"
            placeholder="blur"
            priority
            sizes="(max-width: 800px) 88vw, 35vw"
          />
          <figcaption>Ahmad Dzuizz Annajib · Photographer</figcaption>
        </figure>
      </article>
    </PageShell>
  );
}
