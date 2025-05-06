import Link from "next/link"
import { CalendarDays, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Associação Social e Cultural Lá de Riba
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Plataforma de consulta pública para documentos de gestão, eventos e respostas sociais.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/documentos">
                  <Button className="transition-all hover:scale-105">
                    Ver Documentos
                  </Button>
                </Link>
                <Link href="/eventos">
                  <Button 
                    variant="outline" 
                    className="transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground"
                  >
                    Próximos Eventos
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-muted p-4 transition-colors hover:bg-primary hover:text-primary-foreground">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Documentos de Gestão</h3>
                <p className="text-gray-500">
                  Aceda a todos os documentos de gestão da associação para consulta pública.
                </p>
                <Link href="/documentos">
                  <Button 
                    variant="link" 
                    className="transition-colors hover:text-primary"
                  >
                    Ver Documentos
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-muted p-4 transition-colors hover:bg-primary hover:text-primary-foreground">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Eventos</h3>
                <p className="text-gray-500">Fique a par dos próximos eventos organizados pela nossa associação.</p>
                <Link href="/eventos">
                  <Button 
                    variant="link" 
                    className="transition-colors hover:text-primary"
                  >
                    Ver Eventos
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-muted p-4 transition-colors hover:bg-primary hover:text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Respostas Sociais</h3>
                <p className="text-gray-500">Conheça as nossas respostas sociais e como podemos ajudar a comunidade.</p>
                <Link href="/respostas-sociais">
                  <Button 
                    variant="link" 
                    className="transition-colors hover:text-primary"
                  >
                    Ver Respostas Sociais
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
