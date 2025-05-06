import type { Metadata } from 'next'
import './globals.css'
import { cn } from "@/lib/utils"
import { AuthProvider } from '@/lib/auth'
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: 'Associação Cultural Lá de Riba',
  description: 'Plataforma de consulta pública para documentos de gestão, eventos e respostas sociais.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className="h-full" suppressHydrationWarning={true}>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        "selection:bg-primary/10"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
