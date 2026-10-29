import { NextResponse } from "next/server"
import { adminDb } from "@/lib/server/firebase-admin"
import { collections, isCollection } from "@/lib/server/admin-collections"
import { deleteCloudinaryUrl } from "@/lib/server/cloudinary"
import { requireAdmin } from "@/lib/server/require-admin"

export async function DELETE(_req: Request, { params }: { params: Promise<{ collection: string; id: string }> }) {
  const denied = await requireAdmin()
  if (denied) return denied
  const { collection, id } = await params
  if (!isCollection(collection)) return NextResponse.json({ error: "Coleção inválida" }, { status: 404 })

  try {
    const ref = adminDb().collection(collection).doc(id)
    const snap = await ref.get()
    if (!snap.exists) return NextResponse.json({ error: "Não encontrado" }, { status: 404 })

    // Os ficheiros são removidos do Cloudinary; uma falha aí não impede a remoção do registo.
    const files = (collections[collection].files as (d: object) => string[])(snap.data() ?? {})
    await Promise.allSettled(files.map(deleteCloudinaryUrl))

    await ref.delete()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao eliminar:", error)
    return NextResponse.json({ error: "Não foi possível eliminar." }, { status: 500 })
  }
}
