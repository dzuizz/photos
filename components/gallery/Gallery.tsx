"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  categories,
  photographs,
  type Category,
  type Photograph,
} from "@/lib/photographs";

export default function Gallery() {
  const [category, setCategory] = useState<Category>("All works");
  const [compact, setCompact] = useState(false);
  const [selected, setSelected] = useState<Photograph | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = photographs.filter(
    (p) => category === "All works" || p.category === category,
  );
  const selectedIndex = visible.findIndex((p) => p.id === selected?.id);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.current?.open) dialog.current?.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  function close() {
    dialog.current?.close();
    setSelected(null);
  }
  function step(direction: number) {
    setSelected(
      visible[(selectedIndex + direction + visible.length) % visible.length],
    );
  }

  return (
    <section
      id="works"
      className="works"
      aria-label="Selected photographic works"
    >
      <div className="gallery-toolbar">
        <div className="work-label">
          Selected works{" "}
          <span>({String(visible.length).padStart(2, "0")})</span>
        </div>
        <div
          className="filters"
          role="group"
          aria-label="Filter photographs by subject"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          className="view-toggle"
          type="button"
          aria-pressed={compact}
          onClick={() => setCompact(!compact)}
          aria-label={
            compact ? "Switch to exhibition layout" : "Switch to compact grid"
          }
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <rect x="1" y="1" width="5" height="5" stroke="currentColor" />
            <rect x="10" y="1" width="5" height="5" stroke="currentColor" />
            <rect x="1" y="10" width="5" height="5" stroke="currentColor" />
            <rect x="10" y="10" width="5" height="5" stroke="currentColor" />
          </svg>
          <span>{compact ? "Exhibition view" : "Index view"}</span>
        </button>
      </div>
      <p className="srOnly" aria-live="polite">
        {visible.length} photographs shown. {category}.
      </p>
      <div
        className={`gallery-grid ${compact ? "compact-grid" : "exhibition-grid"}`}
      >
        {visible.map((photo, index) => (
          <figure
            className={`artwork ${photo.image.height > photo.image.width ? "portrait" : "landscape"}`}
            key={photo.id}
          >
            <button
              className="artwork-button"
              type="button"
              aria-label={`View ${photo.title}`}
              onClick={() => setSelected(photo)}
            >
              <Image
                src={photo.image}
                alt={photo.alt}
                placeholder="blur"
                priority={index < 2}
                sizes={
                  compact
                    ? "(max-width: 600px) 90vw, (max-width: 900px) 45vw, 30vw"
                    : "(max-width: 600px) 90vw, (max-width: 900px) 45vw, 65vw"
                }
              />
              <span className="view-artwork" aria-hidden="true">
                View photograph ↗
              </span>
            </button>
            <figcaption>
              <div>
                <span className="artwork-number">
                  {String(photographs.indexOf(photo) + 1).padStart(2, "0")}
                </span>
                <h2>{photo.title}</h2>
              </div>
              <span className="artwork-category">{photo.category}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="collection-end">
        <span>End of collection</span>
        <span>
          {String(visible.length).padStart(2, "0")} photographs · More to come
        </span>
        <span className="end-mark" aria-hidden="true">
          ✳
        </span>
      </div>
      <dialog
        ref={dialog}
        className="artwork-dialog"
        aria-label="Photograph viewer"
        onCancel={close}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
        }}
      >
        {selected && (
          <div className="viewer-content">
            <div className="viewer-header">
              <span>
                dzuizz<span className="brand-dot">.</span> / Selected works
              </span>
              <button
                autoFocus
                type="button"
                onClick={close}
                aria-label="Close photograph viewer"
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="viewer-image">
              <Image
                src={selected.image}
                alt={selected.alt}
                placeholder="blur"
                sizes="95vw"
                priority
              />
            </div>
            <div className="viewer-footer">
              <div>
                <span className="eyebrow">{selected.category}</span>
                <h2>{selected.title}</h2>
              </div>
              <div className="viewer-controls">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photograph"
                >
                  ←
                </button>
                <span aria-live="polite">
                  {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                  {String(visible.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photograph"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
