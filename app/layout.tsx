import type { Metadata, Viewport } from "next";
import { Courier_Prime } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const courier = Courier_Prime({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-courier",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.photographer} — cool pics`,
    template: `%s — ${site.brand}`,
  },
  description: `photographic works by ${site.photographer}, presented as a 35mm film contact sheet. ${site.tagline}`,
  authors: [{ name: site.photographer }],
  keywords: [
    "photography",
    "film photography",
    "35mm",
    "contact sheet",
    "portfolio",
    site.photographer,
  ],
  openGraph: {
    title: `${site.photographer} — Darkroom Portfolio`,
    description: site.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1612",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={courier.variable}>
      <body>{children}</body>
    </html>
  );
}
