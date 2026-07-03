import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { about } from "@/content/about";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://shivansh2703.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${about.name} — ${about.role}`,
    template: `%s · ${about.name}`,
  },
  description: about.blurb,
  openGraph: {
    title: `${about.name} — ${about.role}`,
    description: about.blurb,
    url: SITE_URL,
    siteName: about.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${about.name} — ${about.role}`,
    description: about.blurb,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <div className="grid-backdrop" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
