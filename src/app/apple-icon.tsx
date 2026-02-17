import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const font = readFileSync(
    join(process.cwd(), "public/fonts/CormorantGaramond-Medium.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
        }}
      >
        <span
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: 140,
            color: "#fff",
            lineHeight: 1,
          }}
        >
          s
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Cormorant Garamond",
          data: font,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
