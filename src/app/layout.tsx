import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NuPeeks Proposal Generator",
  description: "Generate professional client proposals in seconds",

  openGraph: {
    title: 'Proposal Generator',
    description: 'Generate branded agency proposals instantly',
    url: 'https://proposal-generator-blue.vercel.app',
    siteName: 'Proposal Generator',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Proposal Generator' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proposal Generator',
    description: 'Generate branded agency proposals instantly',
    images: ['/opengraph-image'],
  },
};

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
