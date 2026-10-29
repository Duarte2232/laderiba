import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getDocumentos } from "@/lib/server/content"
import DocumentosClient from "./documentos-client"

// Os dados são obtidos no servidor a cada pedido; o browser nunca fala diretamente com a base de dados.
export const dynamic = "force-dynamic"

export default async function DocumentosPage() {
  const resultado = await getDocumentos()
  return <DocumentosClient documentos={resultado.ok ? resultado.data : []} />
}
