import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "وش قالوا عن وجهتك";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<rect width="512" height="512" rx="112" fill="#704486"/>
<rect x="28" y="28" width="456" height="456" rx="92" fill="#f7f1e8"/>
<circle cx="256" cy="116" r="10" fill="#b89bc4"/>
<text x="256" y="198" text-anchor="middle" direction="rtl" font-family="Arial, sans-serif" font-size="48" font-weight="600" fill="#80618a">وش قالوا عن</text>
<text x="256" y="286" text-anchor="middle" direction="rtl" font-family="Arial, sans-serif" font-size="82" font-weight="800" fill="#62456b">وجهتك</text>
<path d="M125 352 C190 330 218 370 278 350 C334 331 370 363 407 344" fill="none" stroke="#b89bc4" stroke-width="7" stroke-linecap="round"/>
</svg>`;

export default function Image() {
  const src = `data:image/svg+xml,${encodeURIComponent(logoSvg)}`;
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",background:"#f7f1e8",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <img src={src} width="500" height="500" />
    </div>,
    size
  );
}
