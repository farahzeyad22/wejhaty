import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "شعار وجهتك";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
<rect width="180" height="180" rx="38" fill="#eee7f4"/>
<rect x="10" y="10" width="160" height="160" rx="32" fill="none" stroke="#cdbb9a" stroke-width="7"/>
<g fill="none" stroke="#a47ab5" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
<path d="M90 38 139 87 90 136 41 87Z"/>
<path d="M90 58 119 87 90 116 61 87Z"/>
<path d="M90 58v58M61 87h58"/>
<path d="M55 53 125 123M125 53 55 123"/>
</g>
</svg>`;

export default function Image() {
  const src = `data:image/svg+xml,${encodeURIComponent(logoSvg)}`;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={src} width="430" height="430" />
    </div>,
    size
  );
}
