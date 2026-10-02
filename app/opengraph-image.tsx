import { ImageResponse } from "next/og";

export const alt = "وجهتك";
export const size = {
  width: 1200,
  height: 1200,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <svg
        width="1200"
        height="1200"
        viewBox="0 0 180 180"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="180" height="180" rx="38" fill="#eee7f4" />
        <rect
          x="10"
          y="10"
          width="160"
          height="160"
          rx="32"
          fill="none"
          stroke="#cdbb9a"
          strokeWidth="7"
        />
        <g
          fill="none"
          stroke="#a47ab5"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M90 38 139 87 90 136 41 87Z" />
          <path d="M90 58 119 87 90 116 61 87Z" />
          <path d="M90 58v58M61 87h58" />
          <path d="M55 53 125 123M125 53 55 123" />
        </g>
      </svg>
    ),
    {
      width: 1200,
      height: 1200,
    }
  );
}
