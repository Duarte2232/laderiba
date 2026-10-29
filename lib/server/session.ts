// Sessão de administração: cookie assinado com HMAC (Web Crypto, corre no edge e em Node).
export const SESSION_COOKIE = "admin_session"
export const SESSION_MAX_AGE = 60 * 60 * 12 // 12 horas

const encoder = new TextEncoder()

function secret(): string {
  const value = process.env.SESSION_SECRET
  if (!value || value.length < 32) {
    throw new Error("SESSION_SECRET em falta ou com menos de 32 caracteres.")
  }
  return value
}

function toBase64Url(bytes: ArrayBuffer): string {
  let binary = ""
  for (const b of new Uint8Array(bytes)) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  return toBase64Url(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)))
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function createSessionToken(): Promise<string> {
  const expires = String(Date.now() + SESSION_MAX_AGE * 1000)
  return `${expires}.${await sign(expires)}`
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const [expires, signature] = token.split(".")
  if (!expires || !signature) return false
  if (!(Number(expires) > Date.now())) return false
  try {
    return safeEqual(signature, await sign(expires))
  } catch {
    return false
  }
}

export function passwordMatches(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return safeEqual(candidate, expected)
}
