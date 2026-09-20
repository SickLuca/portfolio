import { ImageResponse } from "next/og";

// Social preview card (shown when the link is shared on LinkedIn, X, etc.)
export const alt = "Luca Repupilli - Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#1f3350",
          padding: "90px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            color: "#9db8d6",
            fontSize: 30,
            letterSpacing: 4,
          }}
        >
          {"SOFTWARE ENGINEER  ·  AI & AGENTIC SYSTEMS"}
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: 104,
            fontWeight: 700,
            marginTop: 24,
            lineHeight: 1.05,
          }}
        >
          Luca Repupilli
        </div>
        <div
          style={{
            color: "#c9d6e6",
            fontSize: 36,
            marginTop: 28,
            maxWidth: 940,
            lineHeight: 1.4,
          }}
        >
          {"Multi-agent LLM systems and RESTful backends."}
        </div>
        <div
          style={{
            display: "flex",
            gap: 22,
            marginTop: 56,
            color: "#9db8d6",
            fontSize: 28,
          }}
        >
          <span>github.com/SickLuca</span>
          <span>·</span>
          <span>linkedin.com/in/luca-repupilli</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
