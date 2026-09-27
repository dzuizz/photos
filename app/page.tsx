import Gallery from "@/components/gallery/Gallery";
import { GalleryFooter, GalleryHeader } from "@/components/gallery/SiteChrome";

export default function Home() {
  return (
    <div className="site-wrap" id="top">
      <a className="skipLink" href="#works">
        Skip to photographs
      </a>
      <GalleryHeader />
      <main>
        <section className="introduction" aria-labelledby="exhibition-title">
          <div className="eyebrow">
            <span className="status-dot" /> Photography by Ahmad Dzuizz Annajib
          </div>
          <h1 id="exhibition-title">
            A little <em>closer.</em>
          </h1>
          <div className="intro-bottom">
            <p>
              Ordinary places. Fleeting moments.
              <br />A collection of things worth noticing.
            </p>
            <div className="exhibition-note">
              <span>Selected photographs</span>
              <span>01 — 13 / An ongoing collection</span>
            </div>
            <a
              className="explore-link"
              href="#works"
              aria-label="Explore the photographs"
            >
              ↓
            </a>
          </div>
        </section>
        <Gallery />
        <section className="artist-note">
          <span className="eyebrow">A note on looking</span>
          <p>
            Sometimes the best part
            <br />
            of going somewhere is
            <br />
            <em>what you notice on the way.</em>
          </p>
          <a href="/about" className="text-link">
            Meet the photographer <span>↗</span>
          </a>
        </section>
      </main>
      <GalleryFooter />
    </div>
  );
}
