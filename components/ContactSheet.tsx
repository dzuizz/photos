"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Roll, Series } from "@/lib/types";
import ContactSheetHeader from "./ContactSheetHeader";
import ContactSheetFooter from "./ContactSheetFooter";
import FilmStrip from "./FilmStrip";
import LightboxView from "./LightboxView";
import styles from "./ContactSheet.module.css";

const STORAGE_KEY = "darkroom_selections";

interface ContactSheetProps {
  rolls: Roll[];
  seriesList: Series[];
  activeSlug?: string;
  headerSubLabel?: string;
  intro?: string;
}

export default function ContactSheet({
  rolls,
  seriesList,
  activeSlug,
  headerSubLabel,
  intro,
}: ContactSheetProps) {
  const frames = useMemo(() => rolls.flatMap((r) => r.frames), [rolls]);

  const defaultSelected = useMemo(
    () => new Set(frames.filter((f) => f.isFeatured).map((f) => f.id)),
    [frames],
  );

  const [selected, setSelected] = useState<Set<string>>(defaultSelected);
  const [openId, setOpenId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ids = JSON.parse(raw) as string[];
        if (Array.isArray(ids)) setSelected(new Set(ids));
      }
    } catch {
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...selected]));
    } catch {
    }
  }, [selected, hydrated]);

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const open = useCallback((id: string) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);

  const openIndex = openId ? frames.findIndex((f) => f.id === openId) : -1;
  const current = openIndex >= 0 ? frames[openIndex] : null;
  const prevFrame = openIndex > 0 ? frames[openIndex - 1] : undefined;
  const nextFrame =
    openIndex >= 0 && openIndex < frames.length - 1
      ? frames[openIndex + 1]
      : undefined;

  let runningIndex = 0;

  return (
    <main className={styles.page}>
      <a href="#site-nav" className="skipLink">
        Skip to navigation
      </a>
      <div className={styles.sheet}>
        <ContactSheetHeader subLabel={headerSubLabel} />

        {intro && <p className={styles.intro}>{intro}</p>}

        {frames.length === 0 ? (
          <p className={styles.empty}>No frames in this series yet.</p>
        ) : (
          <div className={styles.strips}>
            {rolls.map((roll) => {
              const startIndex = runningIndex;
              runningIndex += roll.frames.length;
              return (
                <FilmStrip
                  key={roll.id}
                  roll={roll}
                  selectedFrames={selected}
                  onOpen={open}
                  onToggle={toggle}
                  startIndex={startIndex}
                />
              );
            })}
          </div>
        )}

        <ContactSheetFooter seriesList={seriesList} activeSlug={activeSlug} />
      </div>

      {current && (
        <LightboxView
          frame={current}
          isSelected={selected.has(current.id)}
          prevId={prevFrame?.id}
          nextId={nextFrame?.id}
          onClose={close}
          onNavigate={open}
          onToggle={toggle}
        />
      )}
    </main>
  );
}
