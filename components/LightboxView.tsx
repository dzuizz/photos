"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Frame } from "@/lib/types";
import { formatLongDate } from "@/lib/format";
import styles from "./LightboxView.module.css";

interface LightboxProps {
  frame: Frame;
  isSelected: boolean;
  prevId?: string;
  nextId?: string;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onToggle: (id: string) => void;
}

function prettifyRoll(rollId: string): string {
  return rollId.replace(/-/g, " ").toLowerCase();
}
function prettifySeries(slug: string): string {
  return slug.replace(/-/g, " ");
}

export default function LightboxView({
  frame,
  isSelected,
  prevId,
  nextId,
  onClose,
  onNavigate,
  onToggle,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft" && prevId) {
        e.preventDefault();
        onNavigate(prevId);
      } else if (e.key === "ArrowRight" && nextId) {
        e.preventDefault();
        onNavigate(nextId);
      } else if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => el.offsetParent !== null);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [prevId, nextId, onClose, onNavigate]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={`Frame ${frame.frameNum} — ${frame.caption}`}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close (Escape)"
        >
          <span aria-hidden="true">✕</span>
        </button>

        <div className={styles.stage}>
          <button
            type="button"
            className={`${styles.nav} ${styles.prev}`}
            onClick={() => prevId && onNavigate(prevId)}
            disabled={!prevId}
            aria-label="Previous frame"
          >
            <span className={styles.chevron} aria-hidden="true" />
          </button>

          <figure className={styles.figure}>
            <Image
              className={styles.img}
              src={frame.src}
              alt={`${frame.caption}, ${frame.location}`}
              width={frame.width}
              height={frame.height}
              sizes="(max-width: 900px) 94vw, 78vw"
              priority
            />
          </figure>

          <button
            type="button"
            className={`${styles.nav} ${styles.next}`}
            onClick={() => nextId && onNavigate(nextId)}
            disabled={!nextId}
            aria-label="Next frame"
          >
            <span className={styles.chevron} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <span className={styles.fnum}>
              {prettifyRoll(frame.rollId)} · FRAME {frame.frameNum}
            </span>
            <button
              type="button"
              className={styles.select}
              aria-pressed={isSelected}
              onClick={() => onToggle(frame.id)}
            >
              <span className={styles.selMark} aria-hidden="true">
                ✕
              </span>
              {isSelected ? "Chosen for print" : "Mark for print"}
            </button>
          </div>

          <p className={styles.caption}>{frame.caption}</p>

          <dl className={styles.fields}>
            <Field label="Location" value={frame.location} />
            <Field label="Date" value={formatLongDate(frame.shootDate)} />
            <Field label="Exposure" value={frame.filmStock} />
            <Field label="Camera" value={frame.camera} />
            <Field label="Lens" value={frame.lens} />
            <Field
              label="Series"
              value={frame.series.map(prettifySeries).join(" · ")}
            />
            <Field label="Frame id" value={frame.id} />
          </dl>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className={styles.field}>
      <dt className={styles.fieldLabel}>{label}</dt>
      <dd className={styles.fieldValue}>{value}</dd>
    </div>
  );
}
