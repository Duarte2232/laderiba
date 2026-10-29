import Link from "next/link"
import { ChevronRight, Heart, Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
import { getRespostasSociais } from "@/lib/server/content"

// Faz com que a página seja renderizada a cada requisição
export const revalidate = 0

export default async function RespostasSociaisPage() {
  // Busca as respostas sociais do Firebase
  const resultado = await getRespostasSociais();
  const respostas = resultado.ok ? resultado.data : [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Respostas Sociais</h1>
              <p className="text-gray-500">Conheça os nossos projetos e iniciativas sociais.</p>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                type="search" 
                placeholder="Pesquisar projetos..." 
                className="w-full pl-8 md:w-[300px] transition-colors focus:border-primary" 
              />
            </div>
          </div>

          {respostas.length === 0 ? (
            <div className="mt-8 text-center py-12 border border-dashed rounded-lg">
              <p className="text-gray-500">Não há respostas sociais registradas no momento.</p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {respostas.map((resposta) => (
                <Card key={resposta.id} className="transition-all hover:shadow-lg">
                  {resposta.urlsImagens && resposta.urlsImagens.length > 0 && (
                    <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                      <Image 
                        src={resposta.urlsImagens[0]} 
                        alt={resposta.titulo} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <CardDescription className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-gray-500" />
                      {resposta.tipo}
                    </CardDescription>
                    <CardTitle className="text-lg">{resposta.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm text-gray-500">{resposta.descricao}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-end pt-0">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1 transition-colors hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
                      <Link href={`/respostas-sociais/${resposta.id}`}>
                        Mais Informações <ChevronRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Como Participar section - commented out temporarily
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Como Participar</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Voluntariado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Junte-se à nossa equipa de voluntários e contribua com o seu tempo e competências para os nossos
                    projetos sociais.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground"
                  >
                    Inscrever-se como Voluntário
                  </Button>
                </CardFooter>
              </Card>
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Doações</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Apoie os nossos projetos através de doações financeiras ou materiais que serão utilizadas nas nossas
                    iniciativas sociais.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground"
                  >
                    Fazer uma Doação
                  </Button>
                </CardFooter>
              </Card>
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Parcerias</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Estabeleça parcerias connosco para desenvolver projetos sociais em conjunto e ampliar o impacto das
                    nossas ações.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground"
                  >
                    Propor Parceria
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          */}
        </div>
      </main>
      <Footer />
    </div>
  )
}
