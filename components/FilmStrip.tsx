import type { Roll } from "@/lib/types";
import { formatPrintDate } from "@/lib/format";
import Frame from "./Frame";
import SprocketCol from "./SprocketCol";
import styles from "./FilmStrip.module.css";

interface FilmStripProps {
  roll: Roll;
  selectedFrames: Set<string>;
  onOpen: (id: string) => void;
  onToggle: (id: string) => void;
  startIndex: number;
}

export default function FilmStrip({
  roll,
  selectedFrames,
  onOpen,
  onToggle,
  startIndex,
}: FilmStripProps) {
  return (
    <section className={styles.strip} aria-label={`Contact sheet — ${roll.label}`}>
      <header className={styles.header}>
        <span className={styles.label}>{roll.label}</span>
        <span className={styles.meta}>
          {roll.filmStock} · {roll.location} · {formatPrintDate(roll.shootDate)}
        </span>
      </header>

      <div className={styles.body}>
        <SprocketCol />
        <ul className={styles.grid} role="list" aria-label={`Frames from ${roll.label}`}>
          {roll.frames.map((frame, i) => (
            <Frame
              key={frame.id}
              frame={frame}
              isSelected={selectedFrames.has(frame.id)}
              onOpen={onOpen}
              onToggle={onToggle}
              priority={startIndex + i < 8}
            />
          ))}
          {/* spacers */}
          {Array.from({ length: 5 }, (_, i) => (
            <li key={`spacer-${i}`} className={styles.spacer} aria-hidden="true" />
          ))}
        </ul>
        <SprocketCol />
      </div>
    </section>
  );
}
