"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Frame as FrameType } from "@/lib/types";
import styles from "./Frame.module.css";

interface FrameProps {
  frame: FrameType;
  isSelected: boolean;
  onOpen: (id: string) => void;
  onToggle: (id: string) => void;
  priority?: boolean;
}

const DOUBLE_CLICK_MS = 220;
const LONG_PRESS_MS = 500;

export default function Frame({
  frame,
  isSelected,
  onOpen,
  onToggle,
  priority = false,
}: FrameProps) {
  const clickTimer = useRef<number | null>(null);
  const longPressTimer = useRef<number | null>(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    return () => {
      if (clickTimer.current) window.clearTimeout(clickTimer.current);
      if (longPressTimer.current) window.clearTimeout(longPressTimer.current);
    };
  }, []);

  function clearLongPress() {
    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }

  function handleClick(e: React.MouseEvent) {
    if (e.ctrlKey || e.metaKey) {
      onToggle(frame.id);
      return;
    }
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    if (clickTimer.current) window.clearTimeout(clickTimer.current);
    clickTimer.current = window.setTimeout(() => {
      clickTimer.current = null;
      onOpen(frame.id);
    }, DOUBLE_CLICK_MS);
  }

  function handleDoubleClick() {
    if (clickTimer.current) {
      window.clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }
    onToggle(frame.id);
  }

  function handlePointerDown(e: React.PointerEvent) {
    suppressClick.current = false;
    if (e.pointerType === "mouse") return;
    clearLongPress();
    longPressTimer.current = window.setTimeout(() => {
      longPressTimer.current = null;
      suppressClick.current = true;
      onToggle(frame.id);
    }, LONG_PRESS_MS);
  }

  function handleToggleClick(e: React.MouseEvent) {
    e.stopPropagation();
    onToggle(frame.id);
  }

  const alt = `${frame.caption}, ${frame.location}`;

  const ar = frame.width / frame.height;

  return (
    <li
      className={styles.cell}
      data-selected={isSelected || undefined}
      style={{ "--ar": ar } as React.CSSProperties}
    >
      <button
        type="button"
        className={styles.frameBtn}
        aria-label={`Enlarge frame ${frame.frameNum} — ${frame.caption}, ${frame.location}`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={clearLongPress}
        onPointerLeave={clearLongPress}
        onPointerCancel={clearLongPress}
        onContextMenu={(e) => e.preventDefault()}
      >
        <Image
          className={styles.frameImg}
          src={frame.thumb}
          alt={alt}
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 34vw"
          priority={priority}
          draggable={false}
        />
        <span className={styles.scrim} aria-hidden="true" />
        <span className={styles.frameNum} aria-hidden="true">
          {frame.frameNum}
        </span>
      </button>

      <button
        type="button"
        className={styles.toggle}
        aria-pressed={isSelected}
        aria-label={`${isSelected ? "Unmark" : "Mark"} frame ${frame.frameNum} for print`}
        onClick={handleToggleClick}
      >
        <span className={styles.mark} aria-hidden="true">
          ✕
        </span>
      </button>
    </li>
  );
}
