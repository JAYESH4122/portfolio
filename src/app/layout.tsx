import type { Metadata } from "next";
import { Geist, Geist_Mono, Passero_One, Geo } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const passeroOne = Passero_One({
  variable: "--font-passero",
  weight: "400",
  subsets: ["latin"],
});

const geo = Geo({
  variable: "--font-geo",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jayesh PJ — Developer",
  description:
    "Full-stack developer engineering high-performance web systems and cinematic digital interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${passeroOne.variable} ${geo.variable}`}>
      <body className="bg-[#0a0a0a] text-white antialiased font-mono">
        {children}
      </body>
    </html>
  );
}
