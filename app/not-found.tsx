import Link from "next/link";
import PageShell from "@/components/PageShell";
export default function NotFound() {
  return (
    <PageShell>
      <section className="info-page">
        <span className="eyebrow">404 / Not found</span>
        <h1>
          Out of <em>frame.</em>
        </h1>
        <p className="lede">
          This page isn’t here. There’s still plenty to see in the collection.
        </p>
        <Link href="/" className="text-link">
          Return to the photographs ↗
        </Link>
      </section>
    </PageShell>
  );
}
