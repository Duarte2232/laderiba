import Link from "next/link"
import { Calendar, ChevronRight, Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
import { getEventos } from "@/lib/firebase"

// Faz com que a página seja renderizada a cada requisição
export const revalidate = 0

export default async function EventosPage() {
  // Busca os eventos do Firebase
  const eventos = await getEventos();
  
  // Divide eventos em passados e futuros com base na data atual
  const dataAtual = new Date();
  
  // Função para converter string de data portuguesa (DD/MM/YYYY) para objeto Date
  const converterData = (dataStr) => {
    if (!dataStr) return null;
    const partes = dataStr.split('/');
    if (partes.length !== 3) return null;
    
    // Criar data no formato MM/DD/YYYY para parse correto
    return new Date(`${partes[1]}/${partes[0]}/${partes[2]}`);
  };
  
  // Separa eventos entre passados e futuros
  const eventosFuturos = eventos.filter(evento => {
    // Se o evento tem eventDate como objeto Date, use diretamente
    if (evento.eventDate instanceof Date) {
      return evento.eventDate >= dataAtual;
    }
    
    // Se não, tente converter a dataEvento formatada 
    const dataEvento = converterData(evento.dataEvento);
    if (!dataEvento) return true; // Se não conseguir converter, assume como futuro
    
    return dataEvento >= dataAtual;
  });
  
  const eventosPassados = eventos.filter(evento => {
    // Se o evento tem eventDate como objeto Date, use diretamente
    if (evento.eventDate instanceof Date) {
      return evento.eventDate < dataAtual;
    }
    
    // Se não, tente converter a dataEvento formatada
    const dataEvento = converterData(evento.dataEvento);
    if (!dataEvento) return false; // Se não conseguir converter, não inclui nos passados
    
    return dataEvento < dataAtual;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Eventos e Atividades
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Descubra os próximos eventos e atividades da nossa associação.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Nossos Eventos</h2>
                <p className="text-gray-500">Confira nossa agenda de eventos e atividades.</p>
              </div>
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Pesquisar eventos..."
                  className="w-full pl-8 md:w-[300px] transition-colors focus:border-primary"
                />
              </div>
            </div>

            <Tabs defaultValue="proximos" className="mt-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="proximos">Próximos Eventos</TabsTrigger>
                <TabsTrigger value="passados">Eventos Passados</TabsTrigger>
              </TabsList>
              
              <TabsContent value="proximos">
                {eventosFuturos.length === 0 ? (
                  <div className="mt-8 text-center py-12 border border-dashed rounded-lg">
                    <p className="text-gray-500">Não há eventos futuros registrados no momento.</p>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {eventosFuturos.map((evento) => (
                      <Card key={evento.id} className="transition-all hover:shadow-lg">
                        {evento.urlsImagens && evento.urlsImagens.length > 0 && (
                          <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                            <Image 
                              src={evento.urlsImagens[0]} 
                              alt={evento.titulo} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                        )}
                        <CardHeader className="pb-3">
                          <CardDescription className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-gray-500" />
                            {evento.dataEvento}
                          </CardDescription>
                          <CardTitle className="text-lg">{evento.titulo}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-sm text-gray-500">{evento.descricao}</p>
                          {evento.local && (
                            <p className="text-xs text-gray-400 mt-2">Local: {evento.local}</p>
                          )}
                        </CardContent>
                        <CardFooter className="flex items-center justify-end pt-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 transition-colors hover:bg-primary hover:text-primary-foreground"
                            asChild
                          >
                            <Link href={`/eventos/${evento.id}`}>
                              Mais Informações <ChevronRight className="h-3 w-3" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="passados">
                {eventosPassados.length === 0 ? (
                  <div className="mt-8 text-center py-12 border border-dashed rounded-lg">
                    <p className="text-gray-500">Não há eventos passados registrados no momento.</p>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {eventosPassados.map((evento) => (
                      <Card key={evento.id} className="transition-all hover:shadow-lg">
                        {evento.urlsImagens && evento.urlsImagens.length > 0 && (
                          <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                            <Image 
                              src={evento.urlsImagens[0]} 
                              alt={evento.titulo} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                        )}
                        <CardHeader className="pb-3">
                          <CardDescription className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-gray-500" />
                            {evento.dataEvento}
                          </CardDescription>
                          <CardTitle className="text-lg">{evento.titulo}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-sm text-gray-500">{evento.descricao}</p>
                          {evento.local && (
                            <p className="text-xs text-gray-400 mt-2">Local: {evento.local}</p>
                          )}
                        </CardContent>
                        <CardFooter className="flex items-center justify-end pt-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 transition-colors hover:bg-primary hover:text-primary-foreground"
                            asChild
                          >
                            <Link href={`/eventos/${evento.id}`}>
                              Ver Detalhes <ChevronRight className="h-3 w-3" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 