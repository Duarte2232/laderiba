# Associação Social e Cultural Lá de Riba

Site da associação (Next.js 15, App Router, Tailwind). Dados em Firestore, ficheiros no Cloudinary, alojamento no Netlify.

## Desenvolvimento

```bash
pnpm install
cp .env.example .env.local   # preencher os valores
pnpm dev
```

`pnpm build` e `pnpm lint` devem passar sem erros.

## Como funciona

- As páginas públicas leem o Firestore **no servidor** (`lib/server/content.ts`, Firebase Admin). O browser nunca fala com a base de dados.
- Regras recomendadas do Firestore: leitura pública, **sem escritas de clientes** (o Admin SDK ignora as regras).
- `/admin` pede a palavra-passe `ADMIN_PASSWORD`; a sessão é um cookie `httpOnly` assinado com `SESSION_SECRET`.
- As escritas passam por `/api/admin/*`, `/api/upload` e `/api/delete-file`, todas protegidas (middleware + verificação em cada rota).
- Variáveis de ambiente: ver `.env.example`. No Netlify, definir as mesmas em *Site settings → Environment variables*.
- Imagens: ver `IMAGES.md`.
