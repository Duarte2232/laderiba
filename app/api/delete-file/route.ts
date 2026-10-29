import { NextResponse } from "next/server"
import { deleteCloudinaryUrl } from "@/lib/server/cloudinary"
import { requireAdmin } from "@/lib/server/require-admin"

export async function POST(request: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await request.json().catch(() => null)
  const url = typeof body?.url === "string" ? body.url : ""
  if (!url.startsWith("https://res.cloudinary.com/")) {
    return NextResponse.json({ error: "URL de ficheiro inválido" }, { status: 400 })
  }

  try {
    await deleteCloudinaryUrl(url)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao eliminar ficheiro:", error)
    return NextResponse.json({ error: "Erro ao eliminar o ficheiro" }, { status: 500 })
  }
}
