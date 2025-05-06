'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, FileText, FolderOpen, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getDocumentos, getDocumentosRecentes } from "@/lib/firebase"

export default function DocumentosPage() {
  const [documentosRecentes, setDocumentosRecentes] = useState([]);
  const [documentosFinanceiros, setDocumentosFinanceiros] = useState([]);
  const [documentosAtas, setDocumentosAtas] = useState([]);
  const [documentosRelatorios, setDocumentosRelatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        setLoading(true);
        
        // Obter todos os documentos
        const recentes = await getDocumentosRecentes(6);
        setDocumentosRecentes(recentes);
        
        // Obter documentos por categoria
        const financeiros = await getDocumentos("Financeiros");
        setDocumentosFinanceiros(financeiros);
        
        const atas = await getDocumentos("Atas");
        setDocumentosAtas(atas);
        
        const relatorios = await getDocumentos("Relatórios");
        setDocumentosRelatorios(relatorios);
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentos();
  }, []);

  // Função para filtrar documentos com base no termo de pesquisa
  const filtrarDocumentos = (documentos) => {
    if (!searchTerm.trim()) return documentos;
    
    return documentos.filter(
      (doc) =>
        doc.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Documentos de Gestão</h1>
              <p className="text-gray-500">Aceda a todos os documentos públicos da associação.</p>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                type="search" 
                placeholder="Pesquisar documentos..." 
                className="w-full pl-8 md:w-[300px] transition-colors focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {loading ? (
            <div className="mt-8 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <span className="ml-2">Carregando documentos...</span>
            </div>
          ) : (
          <Tabs defaultValue="recentes" className="mt-8">
              <TabsList className="w-full justify-start">
                <TabsTrigger 
                  value="recentes"
                  className="transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Recentes
                </TabsTrigger>
                <TabsTrigger 
                  value="financeiros"
                  className="transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Financeiros
                </TabsTrigger>
                <TabsTrigger 
                  value="atas"
                  className="transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Atas
                </TabsTrigger>
                <TabsTrigger 
                  value="relatorios"
                  className="transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Relatórios
                </TabsTrigger>
            </TabsList>
              
            <TabsContent value="recentes" className="mt-6">
                {filtrarDocumentos(documentosRecentes).length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtrarDocumentos(documentosRecentes).map((doc) => (
                      <DocumentoCard key={doc.id} documento={doc} />
                ))}
              </div>
                ) : (
                  <p className="py-4 text-center text-gray-500">Nenhum documento encontrado.</p>
                )}
            </TabsContent>
              
            <TabsContent value="financeiros" className="mt-6">
                {filtrarDocumentos(documentosFinanceiros).length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtrarDocumentos(documentosFinanceiros).map((doc) => (
                      <DocumentoCard key={doc.id} documento={doc} />
                ))}
              </div>
                ) : (
                  <p className="py-4 text-center text-gray-500">Nenhum documento financeiro encontrado.</p>
                )}
            </TabsContent>
              
            <TabsContent value="atas" className="mt-6">
                {filtrarDocumentos(documentosAtas).length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtrarDocumentos(documentosAtas).map((doc) => (
                      <DocumentoCard key={doc.id} documento={doc} />
                ))}
              </div>
                ) : (
                  <p className="py-4 text-center text-gray-500">Nenhuma ata encontrada.</p>
                )}
            </TabsContent>
              
            <TabsContent value="relatorios" className="mt-6">
                {filtrarDocumentos(documentosRelatorios).length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtrarDocumentos(documentosRelatorios).map((doc) => (
                      <DocumentoCard key={doc.id} documento={doc} />
                ))}
              </div>
                ) : (
                  <p className="py-4 text-center text-gray-500">Nenhum relatório encontrado.</p>
                )}
            </TabsContent>
          </Tabs>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Componente para exibir um documento
function DocumentoCard({ documento }) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4 text-gray-500" />
          <CardDescription>{documento.categoria}</CardDescription>
        </div>
        <CardTitle className="text-lg">{documento.titulo}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-gray-500">{documento.descricao}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-0">
        <p className="text-xs text-gray-500">Publicado: {documento.data}</p>
        {documento.urlArquivo ? (
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 transition-colors hover:bg-primary hover:text-primary-foreground"
            onClick={() => window.open(documento.urlArquivo, '_blank')}
          >
            Ver <ChevronRight className="h-3 w-3" />
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 transition-colors hover:bg-primary hover:text-primary-foreground"
            disabled
          >
            Ver <ChevronRight className="h-3 w-3" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
