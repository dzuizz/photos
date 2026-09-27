import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.photographer} — Selected photographs`,
    template: `%s — ${site.brand}`,
  },
  description: `Ordinary places. Fleeting moments. Photographic works by ${site.photographer}: a collection of things worth noticing.`,
  authors: [{ name: site.photographer }],
  keywords: [
    "photography",
    "portfolio",
    "landscape",
    "street photography",
    "nature",
    site.photographer,
  ],
  openGraph: {
    title: `${site.photographer} — A little closer.`,
    description:
      "Ordinary places. Fleeting moments. A collection of things worth noticing.",
    type: "website",
  },
};
export const viewport: Viewport = { themeColor: "#f5f3ed" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
