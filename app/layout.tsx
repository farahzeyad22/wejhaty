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

export const metadata: Metadata = {
  title: "وش قالوا عن | وجهتك",
  description: "شوف المكان بعيون زواره.",
  icons: {
    icon: "/site-logo.svg",
    apple: "/site-logo.svg",
  },
  openGraph: {
    title: "وش قالوا عن وجهتك",
    description: "شوف المكان بعيون زواره.",
    images: [
      {
        url: "/site-logo.svg",
        width: 512,
        height: 512,
        alt: "وش قالوا عن وجهتك",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "وش قالوا عن وجهتك",
    description: "شوف المكان بعيون زواره.",
    images: ["/site-logo.svg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
