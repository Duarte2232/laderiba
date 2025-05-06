'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Inter } from 'next/font/google';
import Link from "next/link";
import { FileText, Settings, Users } from "lucide-react";

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const isLoginPage = pathname === '/admin/login';

  // Efeito imediato para verificar autenticação assim que o componente montar
  useEffect(() => {
    setIsClient(true);
    
    // Não faz nada até que o estado de autenticação tenha carregado
    if (loading) return;
    
    // Caso 1: Não está autenticado e não está na página de login -> redireciona para login
    if (!isAuthenticated() && !isLoginPage) {
      console.log('Redirecionando para login: não autenticado');
      router.push('/admin/login');
      return;
    }
    
    // Caso 2: Está autenticado e está na página de login -> redireciona para admin
    if (isAuthenticated() && isLoginPage) {
      console.log('Redirecionando para admin: já autenticado');
      router.push('/admin');
      return;
    }
  }, [isAuthenticated, loading, router, isLoginPage]);

  // Durante o carregamento inicial ou se não for cliente, mostra o loader
  if (loading || !isClient) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <span className="ml-2">Carregando...</span>
      </div>
    );
  }

  // Se não estiver autenticado e não estiver na página de login,
  // mostra um loader enquanto o redirecionamento acontece
  if (!isAuthenticated() && !isLoginPage) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <span className="ml-2">Redirecionando para login...</span>
      </div>
    );
  }

  // Se estiver na página de login e já estiver autenticado, mostra o loader enquanto redireciona
  if (isAuthenticated() && isLoginPage) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <span className="ml-2">Redirecionando para o painel...</span>
      </div>
    );
  }

  // Se for a página de login, renderiza apenas o conteúdo sem o layout administrativo
  if (isLoginPage) {
    return (
      <div className={`${inter.className} min-h-screen bg-gray-50`} suppressHydrationWarning>
        {children}
      </div>
    );
  }

  // Renderiza o layout administrativo completo para usuários autenticados
  return (
    <div className={`${inter.className} min-h-screen bg-gray-50`} suppressHydrationWarning>
      <div className="flex h-screen">
        {/* Sidebar fixa */}
        <div className="w-64 bg-slate-100 border-r p-4 shrink-0 h-screen sticky top-0 hidden md:block">
          <h2 className="text-lg font-bold mb-4">Administração</h2>
          <nav className="space-y-2">
            <Link
              href="/admin/documentos"
              className={`flex items-center gap-2 p-2 rounded-md hover:bg-slate-200 transition-colors ${pathname === '/admin/documentos' ? 'bg-slate-200 font-medium' : ''}`}
            >
              <FileText className="h-4 w-4" />
              <span>Documentos</span>
            </Link>
            <Link
              href="/admin/eventos"
              className={`flex items-center gap-2 p-2 rounded-md hover:bg-slate-200 transition-colors ${pathname === '/admin/eventos' ? 'bg-slate-200 font-medium' : ''}`}
            >
              <Users className="h-4 w-4" />
              <span>Eventos</span>
            </Link>
            <Link
              href="/admin/respostas-sociais"
              className={`flex items-center gap-2 p-2 rounded-md hover:bg-slate-200 transition-colors ${pathname === '/admin/respostas-sociais' ? 'bg-slate-200 font-medium' : ''}`}
            >
              <Settings className="h-4 w-4" />
              <span>Respostas Sociais</span>
            </Link>
          </nav>
        </div>

        {/* Conteúdo principal com padding adequado */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
} 