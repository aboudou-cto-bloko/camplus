import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Campus+ — Le campus en mieux.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F1115",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Radial green glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(141,255,47,0.12) 0%, transparent 65%)",
          }}
        />

        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(141,255,47,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(141,255,47,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top label */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 64,
            fontSize: 14,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Le média étudiant béninois
        </div>

        {/* CAMPUS+ */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 140,
            fontWeight: 900,
            color: "white",
            letterSpacing: "-6px",
            lineHeight: 1,
          }}
        >
          CAMPUS
          <span style={{ color: "#8DFF2F" }}>+</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.35)",
            marginTop: 28,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Le campus en mieux.
        </div>

        {/* Green divider */}
        <div
          style={{
            width: 64,
            height: 2,
            background: "#8DFF2F",
            marginTop: 36,
            borderRadius: 2,
          }}
        />

        {/* Schools line */}
        <div
          style={{
            marginTop: 28,
            fontSize: 18,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.08em",
          }}
        >
          ENEAM · EPAC · UAC · FASEG · UP · ESGIS · et toutes les écoles du Bénin
        </div>

        {/* URL bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 64,
            fontSize: 16,
            color: "rgba(255,255,255,0.15)",
            letterSpacing: "0.05em",
          }}
        >
          camplus-bj.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
