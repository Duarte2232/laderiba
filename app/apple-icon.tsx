import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#2F4A36", display: "flex", position: "relative" }}>
        <div style={{ position: "absolute", left: 66, top: 40, width: 48, height: 48, borderRadius: 24, background: "#E8A87C" }} />
        <div style={{ position: "absolute", left: -40, top: 100, width: 260, height: 200, borderRadius: 130, background: "#FAF6EF" }} />
        <div style={{ position: "absolute", left: -60, top: 135, width: 300, height: 200, borderRadius: 150, background: "#A94B2A" }} />
      </div>
    ),
    size,
  )
}
