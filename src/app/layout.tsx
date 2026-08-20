import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Live View Infotech | Securing Today, Safeguarding Tomorrow",
  description: "Live View Infotech — CCTV, surveillance, and security solutions for workplaces, institutions, industrial sites, and critical infrastructure.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <main className="flex-1 relative z-10 bg-white overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
