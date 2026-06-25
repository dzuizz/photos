import { getSeriesList } from "@/lib/data";
import ContactSheetHeader from "./ContactSheetHeader";
import ContactSheetFooter from "./ContactSheetFooter";
import styles from "./ContactSheet.module.css";

interface PageShellProps {
  children: React.ReactNode;
  subLabel?: string;
  hint?: string;
}

export default function PageShell({ children, subLabel, hint }: PageShellProps) {
  return (
    <main className={styles.page}>
      <a href="#site-nav" className="skipLink">
        Skip to navigation
      </a>
      <div className={styles.sheet}>
        <ContactSheetHeader subLabel={subLabel} />
        {children}
        <ContactSheetFooter seriesList={getSeriesList()} hint={hint} />
      </div>
    </main>
  );
}
