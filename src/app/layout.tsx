import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WW3",
  description: "",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black min-h-screen relative`}>
        <div className="fixed w-64 text-center top-[calc(50%-9rem)] left-[70%] -translate-x-0 text-white font-mono tracking-wider text-sm z-10">
          BIANCA_MP4
        </div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-1/2 -translate-y-1/2 left-[70%] w-64 h-64 object-contain bg-black -z-10"
        >
          <source src="/wwx2.mp4" type="video/mp4" />
        </video>
        <div className="fixed w-64 text-center" style={{ top: 'calc(50% + 133px)', left: '70%' }}>
          <div className="text-white font-mono tracking-wider text-xs z-10 mb-4">
            4.10.25
          </div>
          <div className="w-full border-t border-yellow-400"></div>
        </div>
        <div className="fixed w-64 text-center top-[calc(50%+9rem)] left-[70%] -translate-x-0 text-white font-mono tracking-wider text-sm z-10">
          COME BACK TO ME
        </div>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
