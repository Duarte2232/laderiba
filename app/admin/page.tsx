'use client';

import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function AdminPage() {
  return <AdminDashboard />;
}

function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Painel de Administração</h1>
        <p className="text-muted-foreground">
          Bem-vindo, {user?.username}! Gerencie os conteúdos da Associação Cultural Lá de Riba.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Eventos</CardTitle>
            <CardDescription>Gerenciar eventos da associação</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Adicione, edite ou remova eventos que serão exibidos no site.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/eventos">Gerenciar Eventos</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentos</CardTitle>
            <CardDescription>Gerenciar documentos públicos</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Gerencie os documentos oficiais disponíveis para consulta pública.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/documentos">Gerenciar Documentos</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Respostas Sociais</CardTitle>
            <CardDescription>Gerenciar respostas sociais</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Atualize as informações sobre as respostas sociais da associação.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/respostas-sociais">Gerenciar Respostas</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 flex justify-end">
        <Button variant="destructive" onClick={logout}>
          Sair
        </Button>
      </div>
    </div>
  );
} 