import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/server/session"

export async function GET() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  return NextResponse.json({ authenticated: await verifySessionToken(token) })
}
