import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://reviews-wejhaty-med.vercel.app";

export const metadata: Metadata = {
  title: "وش قالوا عن | وجهتك",
  description: "شوف المكان بعيون زواره.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "وش قالوا عن | وجهتك",
    description: "شوف المكان بعيون زواره.",
    url: siteUrl,
    siteName: "وجهتك",
    type: "website",
    images: [
      {
        url: "/apple-touch-icon.png",
        width: 180,
        height: 180,
        alt: "شعار وجهتك",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "وش قالوا عن | وجهتك",
    description: "شوف المكان بعيون زواره.",
    images: ["/apple-touch-icon.png"],
  },
  icons: {
    icon: "/site-icon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/site-icon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
