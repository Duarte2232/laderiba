import "server-only"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { SESSION_COOKIE, verifySessionToken } from "./session"

// Defesa em profundidade: o middleware já bloqueia, mas cada rota verifica também.
export async function requireAdmin(): Promise<NextResponse | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (await verifySessionToken(token)) return null
  return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
}
