'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// Tipos
interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface ProtectedRouteProps {
  children: ReactNode;
}

// Credenciais de admin fixas (em produção, use um sistema mais seguro)
const ADMIN_USER = 'admin';
const ADMIN_PASSWORD = 'laderiba';

// Nome do cookie de autenticação
const AUTH_COOKIE_NAME = 'auth_token';

// Criar contexto de autenticação
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Verificar se o usuário já está autenticado ao carregar
  useEffect(() => {
    const checkAuth = () => {
      try {
        console.log('Verificando autenticação...');
        const authToken = Cookies.get(AUTH_COOKIE_NAME);
        
        console.log('Token de autenticação:', authToken ? 'Presente' : 'Ausente');
        
        if (authToken) {
          setUser({ username: ADMIN_USER, role: 'admin' });
          console.log('Usuário autenticado:', ADMIN_USER);
        } else {
          console.log('Nenhum token de autenticação encontrado');
          setUser(null);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Pequeno atraso para garantir que os cookies estejam disponíveis no cliente
    setTimeout(checkAuth, 100);
    
    // Voltar a verificar periodicamente para manter a sessão atualizada
    const intervalId = setInterval(checkAuth, 30000); // a cada 30 segundos
    
    return () => clearInterval(intervalId);
  }, []);

  // Função de login
  const login = async (username: string, password: string) => {
    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      // Criar um token simples (em produção, use JWT ou similar)
      const token = btoa(`${username}:${new Date().getTime()}`);
      
      try {
        // Salvar token nos cookies (expira em 1 dia)
        Cookies.set(AUTH_COOKIE_NAME, token, { 
          expires: 1,
          path: '/',
          sameSite: 'strict'
        });
        
        console.log('Token de autenticação criado e salvo em cookie');
        
        // Atualizar estado
        setUser({ username, role: 'admin' });
        return { success: true };
      } catch (error) {
        console.error('Erro ao salvar cookie de autenticação:', error);
        return { 
          success: false, 
          error: 'Erro ao salvar sessão' 
        };
      }
    }
    
    return { 
      success: false, 
      error: 'Credenciais inválidas' 
    };
  };

  // Função de logout
  const logout = () => {
    try {
      Cookies.remove(AUTH_COOKIE_NAME, { path: '/' });
      console.log('Cookie de autenticação removido');
    } catch (error) {
      console.error('Erro ao remover cookie de autenticação:', error);
    }
    
    setUser(null);
    router.push('/admin/login');
  };

  // Verificar se o usuário está autenticado
  const isAuthenticated = () => {
    const isAuth = !!user;
    console.log('Estado de autenticação:', isAuth ? 'Autenticado' : 'Não autenticado');
    return isAuth;
  };

  // Verificar se o usuário é admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    isAdmin
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

// Componente de proteção para rotas
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      console.log('ProtectedRoute: Redirecionando para login');
      router.push('/admin/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <span className="ml-2">Carregando...</span>
    </div>;
  }

  if (!isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
} 