'use client';

import { usePathname } from 'next/navigation';
import Link from "next/link";
import { FileText, Settings, Users } from "lucide-react";
import { AuthProvider } from "@/lib/auth";

// A autenticação é imposta pelo middleware; este layout apenas apresenta a navegação.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider><AdminShell>{children}</AdminShell></AuthProvider>;
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  const links = [
    { href: '/admin/documentos', label: 'Documentos', Icon: FileText },
    { href: '/admin/eventos', label: 'Eventos', Icon: Users },
    { href: '/admin/respostas-sociais', label: 'Respostas Sociais', Icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <div className="w-64 bg-slate-100 border-r p-4 shrink-0 h-screen sticky top-0 hidden md:block">
          <h2 className="text-lg font-bold mb-4">Administração</h2>
          <nav className="space-y-2">
            {links.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-slate-200 transition-colors ${pathname === href ? 'bg-slate-200 font-medium' : ''}`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-1 overflow-auto p-8">{children}</div>
      </div>
    </div>
  );
}
