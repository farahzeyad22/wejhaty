import type { Metadata } from "next";

const siteUrl = "https://reviews-wejhaty-med.vercel.app";
const shareLogo = siteUrl + "/social-share.png";

export const metadata: Metadata = {
  title: "وش قالوا عن | وجهتك",
  description: "شوف المكان بعيون زواره.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl + "/share" },
  openGraph: {
    title: "وش قالوا عن | وجهتك",
    description: "شوف المكان بعيون زواره.",
    url: siteUrl + "/share",
    siteName: "وجهتك",
    type: "website",
    images: [{ url: shareLogo, width: 180, height: 180, alt: "شعار وجهتك" }],
  },
  twitter: {
    card: "summary",
    title: "وش قالوا عن | وجهتك",
    description: "شوف المكان بعيون زواره.",
    images: [shareLogo],
  },
  icons: {
    icon: "/apple-touch-icon.png",
    shortcut: "/apple-touch-icon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function SharePage() {
  return (
    <main dir="rtl" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ textAlign: "center" }}>
        <img src="/social-share.png" alt="شعار وجهتك" width={180} height={180} style={{ borderRadius: 28 }} />
        <h1>وش قالوا عن | وجهتك</h1>
        <p>شوف المكان بعيون زواره.</p>
        <a href="/">دخول الموقع</a>
      </div>
    </main>
  );
}
