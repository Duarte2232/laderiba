import { NextResponse } from "next/server"
import { adminDb } from "@/lib/server/firebase-admin"
import { collections, isCollection, serverTimestamp } from "@/lib/server/admin-collections"
import { requireAdmin } from "@/lib/server/require-admin"
import { getDocumentos, getEventos, getRespostasSociais } from "@/lib/server/content"

const listers = { documentos: getDocumentos, eventos: getEventos, respostasSociais: getRespostasSociais }

export async function GET(_req: Request, { params }: { params: Promise<{ collection: string }> }) {
  const denied = await requireAdmin()
  if (denied) return denied
  const { collection } = await params
  if (!isCollection(collection)) return NextResponse.json({ error: "Coleção inválida" }, { status: 404 })

  const result = await listers[collection]()
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 500 })
  return NextResponse.json(result.data)
}

export async function POST(request: Request, { params }: { params: Promise<{ collection: string }> }) {
  const denied = await requireAdmin()
  if (denied) return denied
  const { collection } = await params
  if (!isCollection(collection)) return NextResponse.json({ error: "Coleção inválida" }, { status: 404 })

  const parsed = collections[collection].schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos", details: parsed.error.flatten() }, { status: 400 })
  }

  try {
    const data = collections[collection].transform(parsed.data as Record<string, unknown>)
    const ref = await adminDb().collection(collection).add({ ...data, dataCriacao: serverTimestamp() })
    return NextResponse.json({ id: ref.id }, { status: 201 })
  } catch (error) {
    console.error("Erro ao guardar:", error)
    return NextResponse.json({ error: "Não foi possível guardar." }, { status: 500 })
  }
}
