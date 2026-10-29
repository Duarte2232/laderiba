import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react"
import { getEventoPorId } from "@/lib/server/content"
import Image from "next/image"
import Link from "next/link"

// Faz com que a página seja renderizada a cada requisição
export const revalidate = 0

export default async function EventoDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dados = await getEventoPorId(id);
  const evento = dados && {
    ...dados,
    dataEvento: dados.dataEventoISO ? new Intl.DateTimeFormat("pt-PT").format(new Date(dados.dataEventoISO)) : "",
  };
  
  if (!evento) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Evento não encontrado</h1>
            <p className="text-gray-500 mb-8">O evento que você está procurando não existe ou foi removido.</p>
            <Button asChild>
              <Link href="/eventos">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Eventos
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
            href="/eventos" 
            className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Eventos
          </Link>
          
          <div className="grid gap-8 md:grid-cols-5">
            {/* Conteúdo principal - 3 colunas em desktop */}
            <div className="md:col-span-3">
              <h1 className="text-3xl font-bold mb-4">{evento.titulo}</h1>
              
              {/* Imagem principal */}
              {evento.urlsImagens && evento.urlsImagens.length > 0 && (
                <div className="relative w-full h-80 overflow-hidden rounded-lg mb-6">
                  <Image 
                    src={evento.urlsImagens[0]} 
                    alt={evento.titulo} 
                    fill 
                    className="object-cover"
                  />
                </div>
              )}
              
              {/* Descrição */}
              <div className="prose max-w-none mb-8">
                <p className="text-gray-700 whitespace-pre-line">{evento.descricao}</p>
              </div>
              
              {/* Galeria de imagens adicionais */}
              {evento.urlsImagens && evento.urlsImagens.length > 1 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Galeria</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                    {evento.urlsImagens.slice(1).map((url, index) => (
                      <div key={index} className="relative h-40 overflow-hidden rounded-lg">
                        <Image 
                          src={url} 
                          alt={`${evento.titulo} - Imagem ${index + 2}`} 
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
                
                {/* Data e hora */}
                <div className="flex items-start mb-4">
                  <Calendar className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Data</p>
                    <p className="text-gray-600">{evento.dataEvento}</p>
                  </div>
                </div>
                
                {/* Local */}
                {evento.local && (
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Local</p>
                      <p className="text-gray-600">{evento.local}</p>
                    </div>
                  </div>
                )}
                
                {/* Compartilhar e botões de ação */}
                <div className="mt-8">
                  <Button className="w-full mb-3">Inscrever-se no Evento</Button>
                  <Button variant="outline" className="w-full">
                    Adicionar ao Calendário
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