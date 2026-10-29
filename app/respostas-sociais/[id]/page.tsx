import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Share2, Users } from "lucide-react"
import { getRespostaSocialPorId } from "@/lib/server/content"
import Image from "next/image"
import Link from "next/link"

// Faz com que a página seja renderizada a cada requisição
export const revalidate = 0

export default async function RespostaSocialDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const resposta = await getRespostaSocialPorId(id);
  
  if (!resposta) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Resposta social não encontrada</h1>
            <p className="text-gray-500 mb-8">A resposta social que você está procurando não existe ou foi removida.</p>
            <Button asChild>
              <Link href="/respostas-sociais">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Respostas Sociais
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <Link 
            href="/respostas-sociais" 
            className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Respostas Sociais
          </Link>
          
          <div className="grid gap-8 md:grid-cols-5">
            {/* Conteúdo principal - 3 colunas em desktop */}
            <div className="md:col-span-3">
              <h1 className="text-3xl font-bold mb-4">{resposta.titulo}</h1>
              
              {/* Imagem principal */}
              {resposta.urlsImagens && resposta.urlsImagens.length > 0 && (
                <div className="relative w-full h-80 overflow-hidden rounded-lg mb-6">
                  <Image 
                    src={resposta.urlsImagens[0]} 
                    alt={resposta.titulo} 
                    fill 
                    className="object-cover"
                  />
                </div>
              )}
              
              {/* Descrição */}
              <div className="prose max-w-none mb-8">
                <p className="text-gray-700 whitespace-pre-line">{resposta.descricao}</p>
              </div>
              
              {/* Galeria de imagens adicionais */}
              {resposta.urlsImagens && resposta.urlsImagens.length > 1 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Galeria</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                    {resposta.urlsImagens.slice(1).map((url, index) => (
                      <div key={index} className="relative h-40 overflow-hidden rounded-lg">
                        <Image 
                          src={url} 
                          alt={`${resposta.titulo} - Imagem ${index + 2}`} 
                          fill 
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar - 2 colunas em desktop */}
            <div className="md:col-span-2">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                <h2 className="text-xl font-semibold mb-4">Informações</h2>
                
                {/* Tipo de resposta social */}
                <div className="flex items-start mb-4">
                  <Users className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Tipo</p>
                    <p className="text-gray-600">{resposta.tipo}</p>
                  </div>
                </div>
                
                {/* Contato, se existir */}
                {resposta.contato && (
                  <div className="flex items-start mb-4">
                    <div className="mr-3 text-gray-500 mt-0.5">📞</div>
                    <div>
                      <p className="font-medium">Contato</p>
                      <p className="text-gray-600">{resposta.contato}</p>
                    </div>
                  </div>
                )}
                
                {/* Compartilhar e botões de ação */}
                <div className="mt-8">
                  <Button className="w-full mb-3">
                    <Heart className="h-4 w-4 mr-2" />
                    Apoiar este Projeto
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 