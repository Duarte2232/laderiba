'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getRespostasSociais, adicionarRespostaSocial, eliminarRespostaSocial } from '@/lib/admin-client';
import Image from 'next/image';
import Link from 'next/link';

// Componente principal que contém a lógica de administração de respostas sociais
function RespostasSociaisAdmin() {
  const [respostas, setRespostas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: []
  });
  const [uploadStatus, setUploadStatus] = useState({ loading: false, error: '', success: false });
  const router = useRouter();
  const { logout } = useAuth();

  // Verificar autenticação e carregar respostas sociais
  useEffect(() => {
    const fetchRespostas = async () => {
      try {
        const dados = await getRespostasSociais();
        setRespostas(dados);
      } catch (error) {
        console.error('Erro ao carregar respostas sociais:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRespostas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus({ loading: true, error: '', success: false });

    try {
      await adicionarRespostaSocial(
        {
          title: formData.title,
          description: formData.description
        },
        formData.images // Passa o array de imagens
      );

      // Resetar o formulário e atualizar a lista de respostas sociais
      setFormData({
        title: '',
        description: '',
        images: []
      });
      document.getElementById('images-upload').value = '';
      
      // Recarregar respostas sociais
      const dados = await getRespostasSociais();
      setRespostas(dados);
      
      setUploadStatus({
        loading: false,
        error: '',
        success: true
      });

      // Esconder mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setUploadStatus(prev => ({ ...prev, success: false }));
      }, 3000);
      
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      setUploadStatus({
        loading: false,
        error: 'Erro ao registar a resposta social. Tente novamente.',
        success: false
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem a certeza de que pretende eliminar esta resposta social?')) {
      return;
    }

    try {
      await eliminarRespostaSocial(id);
      setRespostas(respostas.filter(resposta => resposta.id !== id));
    } catch (error) {
      console.error('Erro ao eliminar resposta social:', error);
      alert('Erro ao eliminar resposta social. Tente novamente.');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Administração de Respostas Sociais</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upload" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="upload">Adicionar Resposta Social</TabsTrigger>
          <TabsTrigger value="manage">Gerir Respostas Sociais</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Nova Resposta Social</CardTitle>
              <CardDescription>
                Preencha o formulário para adicionar uma nova resposta social.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Título
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Título da resposta social"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Descrição
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Descrição detalhada da resposta social"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="images-upload" className="text-sm font-medium">
                    Imagens (Pode selecionar várias)
                  </label>
                  <Input
                    id="images-upload"
                    type="file"
                    onChange={handleImagesChange}
                    multiple
                    accept="image/*"
                  />
                  <p className="text-xs text-gray-500">
                    Formatos aceitos: JPG, PNG, GIF (máx. 5MB por imagem)
                  </p>
                </div>

                {uploadStatus.error && (
                  <div className="bg-red-50 text-red-500 p-2 rounded">
                    {uploadStatus.error}
                  </div>
                )}

                {uploadStatus.success && (
                  <div className="bg-green-50 text-green-500 p-2 rounded">
                    Resposta social cadastrada com sucesso!
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={uploadStatus.loading}
                >
                  {uploadStatus.loading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                      Enviando...
                    </>
                  ) : (
                    'Adicionar Resposta Social'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Gerir Respostas Sociais</CardTitle>
              <CardDescription>
                Visualize, edite ou remova respostas sociais existentes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">A carregar respostas sociais...</div>
              ) : respostas.length === 0 ? (
                <div className="text-center py-4">Nenhuma resposta social encontrada.</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>Lista de respostas sociais</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead className="w-24">Imagens</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {respostas.map((resposta) => (
                        <TableRow key={resposta.id}>
                          <TableCell className="font-medium">{resposta.titulo}</TableCell>
                          <TableCell>
                            {resposta.urlsImagens && resposta.urlsImagens.length > 0 ? (
                              <div className="flex items-center justify-center">
                                <div className="relative h-10 w-10 overflow-hidden rounded">
                                  <Image
                                    src={resposta.urlsImagens[0]}
                                    alt={resposta.titulo}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                {resposta.urlsImagens.length > 1 && (
                                  <span className="ml-1 text-xs text-gray-500">
                                    +{resposta.urlsImagens.length - 1}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-gray-500">Sem imagens</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(resposta.id)}
                            >
                              Eliminar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function RespostasSociaisPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="container mx-auto py-8 px-4">A carregar...</div>;
  }

  if (!user) {
    return null;
  }

  return <RespostasSociaisAdmin />;
} 