import { NextResponse } from "next/server"
import type { UploadApiResponse } from "cloudinary"
import { cloudinary } from "@/lib/server/cloudinary"
import { requireAdmin } from "@/lib/server/require-admin"

const MAX_BYTES = 10 * 1024 * 1024
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.oasis.opendocument.spreadsheet",
])

export async function POST(request: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  try {
    const file = (await request.formData()).get("file")
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Nenhum ficheiro enviado" }, { status: 400 })
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "O ficheiro excede o limite de 10 MB" }, { status: 413 })
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Tipo de ficheiro não permitido" }, { status: 415 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "documentos", resource_type: "auto", upload_preset: "laderiba" },
          (error, uploaded) => (error || !uploaded ? reject(error) : resolve(uploaded)),
        )
        .end(buffer)
    })

    const extension = file.name.includes(".") ? file.name.split(".").pop()!.toLowerCase() : result.format
    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
      bytes: result.bytes,
      format: result.format ?? extension,
    })
  } catch (error) {
    console.error("Erro no upload:", error)
    return NextResponse.json({ error: "Erro ao processar o envio" }, { status: 500 })
  }
}
