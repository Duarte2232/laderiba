import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"
import { SITE } from "@/lib/site"

export const alt = SITE.name
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public/images/logo.png"))
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#2F4A36", display: "flex", alignItems: "center", color: "#FAF6EF" }}>
        <div style={{ display: "flex", flexDirection: "column", padding: "0 70px 0 90px", flex: 1 }}>
          <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: "#F2B992", fontWeight: 700 }}>{`Riba de Mouro · desde ${SITE.founded}`}</div>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05, marginTop: 24 }}>Lá de Riba</div>
          <div style={{ fontSize: 40, marginTop: 20, lineHeight: 1.3 }}>Associação Social e Cultural</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#FAF6EF", width: 460, height: 460, borderRadius: 48, marginRight: 80 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={400} height={265} alt="" />
        </div>
      </div>
    ),
    size,
  )
}
