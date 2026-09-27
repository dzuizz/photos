import Link from "next/link";
import { site } from "@/lib/site";

export function GalleryHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Dzuizz photography home">
        dzuizz<span className="brand-dot">.</span>
      </Link>
      <span className="header-descriptor">
        An ongoing observation of the everyday
      </span>
      <nav aria-label="Main navigation">
        <Link href="/#works">
          Works <span>↗</span>
        </Link>
        <Link href="/about">About</Link>
        <Link href="/contact">
          Get in touch <span>↗</span>
        </Link>
      </nav>
    </header>
  );
}

export function GalleryFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p>
          There’s always more
          <br />
          to <em>notice.</em>
        </p>
        <a href={`mailto:${site.email}`}>
          Let’s start a conversation <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.photographer}
        </span>
        <span>Photographs from here & there.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
