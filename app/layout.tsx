import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BackgroundCanvas from "@/components/background/BackgroundCanvas";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "NEU CSE INDEX",
  description:
    "This is a centralized database and management system for the Department of Computer Science and Engineering at Netrokona University (NEU). It serves to organize, store, and manage comprehensive information about current students and alumni, creating a connected community of academic and professional resources.",
  icons: {
    icon: "/favicon.ico",
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
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      
      <body className="min-h-full flex flex-col">
        <BackgroundCanvas />
        {children}
      </body>
    </html>
  );
}
