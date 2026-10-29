import { NextResponse, type NextRequest } from "next/server"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/server/session"

const PUBLIC_PATHS = ["/admin/login", "/api/admin/login", "/api/admin/logout", "/api/admin/session"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isApi = pathname.startsWith("/api/")
  const authenticated = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)

  // Pedidos que alteram dados só são aceites a partir do próprio site (proteção CSRF adicional).
  if (isApi && request.method !== "GET") {
    const origin = request.headers.get("origin")
    if (origin && new URL(origin).host !== request.headers.get("host")) {
      return NextResponse.json({ error: "Origem não permitida" }, { status: 403 })
    }
  }

  if (PUBLIC_PATHS.includes(pathname)) {
    if (pathname === "/admin/login" && authenticated) return NextResponse.redirect(new URL("/admin", request.url))
    return NextResponse.next()
  }

  if (authenticated) return NextResponse.next()
  if (isApi) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  return NextResponse.redirect(new URL("/admin/login", request.url))
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/upload", "/api/delete-file"],
}
