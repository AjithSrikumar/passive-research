import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { companies } from "@/lib/companies";
import { sectors } from "@/lib/sectors";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://passive-research.in";

const coverage = `${companies.length}+ Indian listed companies across ${sectors.length} sectors`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Passive — Professional Equity Research for Indian Stocks",
    template: "%s | Passive Research",
  },
  description: `Passive is an institutional-grade equity research platform covering ${coverage}. Screener-grade financials, DCF valuations, ratings and full-length research reports.`,
  keywords: [
    "equity research India",
    "stock ratings India",
    "Indian listed companies",
    "stock research reports",
    "DCF valuation India",
    "NSE BSE research",
    "Passive Research",
  ],
  openGraph: {
    type: "website",
    siteName: "Passive",
    title: "Passive — Professional Equity Research",
    description: `Institutional-grade equity research on ${coverage}.`,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Passive — Professional Equity Research",
    description: `Institutional-grade equity research on ${coverage}.`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111827",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}