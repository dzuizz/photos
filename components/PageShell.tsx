import { GalleryFooter, GalleryHeader } from "./gallery/SiteChrome";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-wrap" id="top">
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <GalleryHeader />
      <main id="main">{children}</main>
      <GalleryFooter />
    </div>
  );
}
