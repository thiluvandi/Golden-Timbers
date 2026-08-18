import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QuoteModalProvider } from "@/lib/quote-modal-context";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Golden Timbers — Premium Timber Yard & Sawmill, Bengaluru",
  description:
    "Bengaluru's trusted B2B timber trade partner since 1985. Premium teak, pine, structural hardwoods, veneers, kiln seasoning and custom sawmilling delivered across Karnataka.",
  keywords: [
    "timber yard Bangalore",
    "sawmill Bengaluru",
    "Burma teak supplier",
    "kiln seasoned timber",
    "plywood veneer Bangalore",
    "timber door frames Bengaluru",
  ],
  openGraph: {
    title: "Golden Timbers — Premium Timber Yard & Sawmill, Bengaluru",
    description:
      "Sustainably sourced, precision milled. Bengaluru's trusted B2B timber trade partner since 1985.",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-charcoal">
        <QuoteModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
