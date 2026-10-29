# Imagens do site

## Já colocadas
`logo.png` (logótipo, fundo transparente, gerado a partir do `logo.jpg` original — se tiver uma versão em alta resolução ou vetorial, **SVG**, substitua-a), `hero`, `sobre`, `sobre-topo`, `area-idosos`, `area-centro-de-dia`, `area-cultura`, `area-servicos` e `eventos-vazio`.
**Em falta:** `area-criancas`, `area-formacao` e `evento` (continuam com espaço reservado).
As fotografias dos eventos estão em `public/images/momentos/` e são listadas em `lib/momentos.ts` (galeria "Momentos da nossa comunidade").

Coloque os ficheiros em `public/images/` **com exatamente estes nomes** (`.webp`, `.jpg` ou `.png`).
O site usa-os automaticamente; enquanto não existirem, mostra um espaço reservado com a etiqueta "Foto a fornecer".
O Next.js redimensiona e converte para AVIF/WebP, por isso pode enviar a foto original (idealmente até 3 MB por ficheiro).

| Ficheiro (sem extensão) | Onde aparece | Dimensões ideais | Sugestão |
| --- | --- | --- | --- |
| `hero` | Topo da página inicial (fundo, com texto por cima) | 2000 × 1200 px (horizontal) | Paisagem de Riba de Mouro ou atividade da associação. Zona esquerda mais calma, para o texto. |
| `sobre` | "Quem somos" (início) e página Sobre | 1200 × 900 px (4:3) | Equipa/voluntários ou sede. |
| `sobre-topo` | Fundo do cabeçalho da página Sobre (aparece esbatido) | 2000 × 900 px | Opcional. |
| `area-idosos` | Cartão e secção "Apoio a Idosos" | 1200 × 900 px (4:3) | |
| `area-criancas` | "Crianças" | 1200 × 900 px (4:3) | |
| `area-cultura` | "Cultura, Educação e Turismo" | 1200 × 900 px (4:3) | |
| `area-servicos` | "Serviços Comunitários" | 1200 × 900 px (4:3) | |
| `area-formacao` | "Promoção e Formação" | 1200 × 900 px (4:3) | |
| `area-centro-de-dia` | "Centro de Dia" (em planeamento) | 1200 × 900 px (4:3) | Pode ser o local previsto. |
| `evento` | Imagem por omissão de eventos/projetos sem foto | 1200 × 800 px (3:2) | Imagem neutra (ex.: logótipo ou paisagem). |
| `eventos-vazio` | Ilustração do "ainda não há eventos" | 1200 × 800 px (3:2) | |

Fotos de eventos e projetos adicionados pelo painel `/admin` vão para o Cloudinary e não precisam de ficar aqui.

## Notas
- Só use fotos de que a associação seja titular ou tenha autorização. Para pessoas identificáveis (sobretudo crianças e idosos), são necessárias autorizações de imagem.
- Não foram usadas fotografias de banco de imagens: os espaços reservados são desenhos genéricos e provisórios.
- Todas as imagens têm texto alternativo em português definido no código; se mudar a foto, reveja o texto alternativo no respetivo componente.
- Logótipo e ícone: `components/site/logo.tsx` e `app/icon.svg`. Imagem de partilha (Open Graph): `app/opengraph-image.tsx`. Para usar uma imagem própria na partilha, substitua-o por um ficheiro `app/opengraph-image.png` (1200 × 630).
