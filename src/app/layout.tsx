import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import BackgroundImage from "./components/BackgroundImage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IN A PERFECT WORLD",
  description: "In a perfect world",
  metadataBase: new URL('https://www.inaperfectworld.shop'),
  openGraph: {
    title: "IN A PERFECT WORLD",
    description: "In a perfect world",
    url: 'https://www.inaperfectworld.shop',
    siteName: 'INAPERFECTWORLD',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WW3',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "IN A PERFECT WORLD",
    description: "In a perfect world",
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ]
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen relative overflow-x-hidden`}>
        <BackgroundImage />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
