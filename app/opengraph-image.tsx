import { ImageResponse } from "next/og"
import { SITE } from "@/lib/site"

export const alt = SITE.name
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#2F4A36", display: "flex", position: "relative", color: "#FAF6EF" }}>
        <div style={{ position: "absolute", right: 170, top: 90, width: 190, height: 190, borderRadius: 95, background: "#E8A87C" }} />
        <div style={{ position: "absolute", left: -200, top: 380, width: 1700, height: 700, borderRadius: 850, background: "#3d5c44" }} />
        <div style={{ position: "absolute", left: -300, top: 470, width: 1900, height: 700, borderRadius: 950, background: "#A94B2A" }} />
        <div style={{ position: "absolute", left: -100, top: 560, width: 1500, height: 600, borderRadius: 750, background: "#FAF6EF" }} />
        <div style={{ display: "flex", flexDirection: "column", padding: "80px 90px", maxWidth: 800 }}>
          <div style={{ fontSize: 30, letterSpacing: 4, textTransform: "uppercase", color: "#F2B992", fontWeight: 700 }}>{`Riba de Mouro · desde ${SITE.founded}`}</div>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05, marginTop: 24 }}>Lá de Riba</div>
          <div style={{ fontSize: 38, marginTop: 20, lineHeight: 1.3 }}>Associação Social e Cultural</div>
        </div>
      </div>
    ),
    size,
  )
}
