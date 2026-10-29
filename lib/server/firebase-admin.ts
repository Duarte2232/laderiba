import "server-only"
import { cert, getApps, initializeApp, type App } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

// Aceita a chave de serviço completa em JSON (FIREBASE_SERVICE_ACCOUNT_KEY) ou as três variáveis separadas.
function credentials() {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  if (json) {
    const parsed = JSON.parse(json)
    return { projectId: parsed.project_id, clientEmail: parsed.client_email, privateKey: parsed.private_key }
  }
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env
  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error("Credenciais do Firebase em falta (ver .env.example).")
  }
  return {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }
}

let app: App | undefined

export function adminDb() {
  app ??= getApps()[0] ?? initializeApp({ credential: cert(credentials()) })
  return getFirestore(app)
}
