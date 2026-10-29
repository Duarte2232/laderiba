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
import { getEventos, adicionarEvento, eliminarEvento } from '@/lib/admin-client';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

// Componente principal que contém a lógica de administração de eventos
function EventosAdmin() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    eventDate: '',
    images: []
  });
  const [uploadStatus, setUploadStatus] = useState({ loading: false, error: '', success: false });
  const router = useRouter();
  const { logout } = useAuth();

  // Verificar autenticação e carregar eventos
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const dados = await getEventos();
        setEventos(dados);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
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

    // Validar data do evento
    if (!formData.eventDate) {
      setUploadStatus({
        loading: false,
        error: 'Por favor, selecione uma data para o evento',
        success: false
      });
      return;
    }

    try {
      // Converter a data do evento para objeto Date
      const eventDate = new Date(formData.eventDate);
      
      await adicionarEvento(
        {
          title: formData.title,
          description: formData.description,
          location: formData.location,
          eventDate: eventDate
        },
        formData.images // Passa o array de imagens
      );

      // Resetar o formulário e atualizar a lista de eventos
      setFormData({
        title: '',
        description: '',
        location: '',
        eventDate: '',
        images: []
      });
      document.getElementById('images-upload').value = '';
      
      // Recarregar eventos
      const dados = await getEventos();
      setEventos(dados);
      
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
        error: 'Erro ao registar o evento. Tente novamente.',
        success: false
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem a certeza de que pretende eliminar este evento?')) {
      return;
    }

    try {
      await eliminarEvento(id);
      setEventos(eventos.filter(evento => evento.id !== id));
    } catch (error) {
      console.error('Erro ao eliminar evento:', error);
      alert('Erro ao eliminar evento. Tente novamente.');
    }
  };

  // Formatação de data para exibição na tabela
  const formatarDataTabela = (dataStr) => {
    if (!dataStr) return "Data não definida";
    
    try {
      // Se já for uma string formatada em PT
      if (dataStr.includes('/')) return dataStr;
      
      // Se for uma data JavaScript
      const data = new Date(dataStr);
      return format(data, 'dd/MM/yyyy', { locale: pt });
    } catch (error) {
      return dataStr;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Administração de Eventos</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upload" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="upload">Adicionar Evento</TabsTrigger>
          <TabsTrigger value="manage">Gerir Eventos</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Novo Evento</CardTitle>
              <CardDescription>
                Preencha o formulário para adicionar um novo evento.
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
                    placeholder="Título do evento"
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
                    placeholder="Descrição detalhada do evento"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Local
                  </label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Local do evento"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="eventDate" className="text-sm font-medium">
                    Data do Evento
                  </label>
                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
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
                    Evento registado com sucesso!
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
                      A enviar...
                    </>
                  ) : (
                    'Adicionar Evento'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Gerir Eventos</CardTitle>
              <CardDescription>
                Visualize, edite ou remova eventos existentes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">A carregar eventos...</div>
              ) : eventos.length === 0 ? (
                <div className="text-center py-4">Nenhum evento encontrado.</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>Lista de eventos</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Local</TableHead>
                        <TableHead className="w-24">Imagens</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {eventos.map((evento) => (
                        <TableRow key={evento.id}>
                          <TableCell className="font-medium">{evento.titulo}</TableCell>
                          <TableCell>{formatarDataTabela(evento.dataEvento)}</TableCell>
                          <TableCell>{evento.local || '-'}</TableCell>
                          <TableCell>
                            {evento.urlsImagens && evento.urlsImagens.length > 0 ? (
                              <div className="flex items-center justify-center">
                                <div className="relative h-10 w-10 overflow-hidden rounded">
                                  <Image
                                    src={evento.urlsImagens[0]}
                                    alt={evento.titulo}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                {evento.urlsImagens.length > 1 && (
                                  <span className="ml-1 text-xs text-gray-500">
                                    +{evento.urlsImagens.length - 1}
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
                              onClick={() => handleDelete(evento.id)}
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

export default function EventosPage() {
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

  return <EventosAdmin />;
}