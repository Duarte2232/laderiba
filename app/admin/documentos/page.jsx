'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { adicionarDocumento as uploadDocument, getDocumentos as getAllDocuments, eliminarDocumento as deleteDocument } from '@/lib/admin-client';

// Componente principal que contém a lógica de administração de documentos
function DocumentosAdmin() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'financial',
    file: null
  });
  const [uploadStatus, setUploadStatus] = useState({ loading: false, error: '', success: false });
  const router = useRouter();
  const { logout } = useAuth();

  // Verificar autenticação e carregar documentos
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await getAllDocuments();
        setDocuments(docs);
      } catch (error) {
        console.error('Erro ao carregar documentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus({ loading: true, error: '', success: false });

    if (!formData.file) {
      setUploadStatus({
        loading: false,
        error: 'Por favor, selecione um ficheiro para enviar',
        success: false
      });
      return;
    }

    try {
      await uploadDocument(
        {
          title: formData.title,
          description: formData.description,
          category: formData.category
        },
        formData.file  // Passado como segundo parâmetro separado
      );

      // Resetar o formulário e atualizar a lista de documentos
      setFormData({
        title: '',
        description: '',
        category: 'financial',
        file: null
      });
      document.getElementById('file-upload').value = '';
      
      // Recarregar documentos
      const docs = await getAllDocuments();
      setDocuments(docs);
      
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
        error: 'Erro ao fazer upload do documento. Tente novamente.',
        success: false
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem a certeza de que pretende eliminar este documento?')) {
      return;
    }

    try {
      await deleteDocument(id);
      setDocuments(documents.filter(doc => doc.id !== id));
    } catch (error) {
      console.error('Erro ao eliminar documento:', error);
      alert('Erro ao eliminar documento. Tente novamente.');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Administração de Documentos</h1>
        <Button variant="outline" onClick={handleLogout}>
          Sair
        </Button>
      </div>

      <Tabs defaultValue="upload" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="upload">Upload de Documento</TabsTrigger>
          <TabsTrigger value="manage">Gerir Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Novo Documento</CardTitle>
              <CardDescription>
                Preencha o formulário para fazer upload de um novo documento.
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
                    placeholder="Título do documento"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Descrição
                  </label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Breve descrição do documento"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Categoria
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">Financeiro</SelectItem>
                      <SelectItem value="minutes">Atas</SelectItem>
                      <SelectItem value="reports">Relatórios</SelectItem>
                      <SelectItem value="other">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="file-upload" className="text-sm font-medium">
                    Arquivo
                  </label>
                  <Input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    required
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                  />
                  <p className="text-xs text-gray-500">
                    Formatos aceitos: PDF, Word, Excel (máx. 10MB)
                  </p>
                </div>

                {uploadStatus.error && (
                  <div className="bg-red-50 text-red-500 p-2 rounded">
                    {uploadStatus.error}
                  </div>
                )}

                {uploadStatus.success && (
                  <div className="bg-green-50 text-green-500 p-2 rounded">
                    Documento enviado com sucesso!
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
                    'Enviar Documento'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Gerir Documentos</CardTitle>
              <CardDescription>
                Visualize, edite ou remova documentos existentes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <p className="mt-2">A carregar documentos...</p>
                </div>
              ) : documents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhum documento encontrado
                </div>
              ) : (
                <Table>
                  <TableCaption>Lista de documentos cadastrados</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Data de Upload</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.title}</TableCell>
                        <TableCell>
                          {doc.category === 'financial' && 'Financeiro'}
                          {doc.category === 'minutes' && 'Atas'}
                          {doc.category === 'reports' && 'Relatórios'}
                          {doc.category === 'other' && 'Outros'}
                        </TableCell>
                        <TableCell>
                          {new Date(doc.createdAt).toLocaleDateString('pt-PT')}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(doc.id)}
                          >
                            Eliminar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Componente principal para gerenciar documentos
export default function DocumentosPage() {
  return <DocumentosAdmin />;
} 