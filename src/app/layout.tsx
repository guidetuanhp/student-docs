import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 1280,
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "University Document System -- ID Cards, Documents and Portals",
  description:
    "Generate realistic university student ID cards, admission documents, and portal designs. 32 templates with live editing and PNG export.",
  openGraph: {
    title: "University Document System -- ID Cards, Documents and Portals",
    description:
      "Generate realistic university student ID cards, admission documents, and portal designs. 32 templates with live editing and PNG export.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
