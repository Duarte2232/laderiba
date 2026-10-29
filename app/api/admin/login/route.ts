import { NextResponse } from "next/server"
import { SESSION_COOKIE, SESSION_MAX_AGE, createSessionToken, passwordMatches } from "@/lib/server/session"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const password = typeof body?.password === "string" ? body.password : ""

  if (!passwordMatches(password)) {
    // Atraso fixo para dificultar tentativas em massa.
    await new Promise((resolve) => setTimeout(resolve, 800))
    return NextResponse.json({ error: "Palavra-passe incorreta" }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  })
  return response
}
