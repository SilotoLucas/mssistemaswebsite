# Guia do design atual

Este é o padrão visual aprovado pelo dono do projeto. Ele vale para toda tela nova e para todo ajuste. Antes de mexer em qualquer interface, leia este arquivo inteiro e abra a home (`/`) e o Suporte (`/suporte`) rodando com `bun run dev`: elas são a referência viva.

## Qual guia vale

- **Vale:** este arquivo, `packages/design-tokens/tokens.json` e as decisões 016, 017, 019 e 020 em `docs/decisoes.md`.
- **Não vale mais no visual:** o `docs/referencias/design-v1/design-system/guia-de-identidade.md`. Ele pede estilo claro e minimalista e proíbe gradientes e glassmorphism. A decisão 016 substituiu isso. Dele continuam valendo só a identidade (logo, tom de voz, regras de conteúdo) e o que este arquivo repete.
- **Em caso de conflito:** este arquivo vence o design V1. Se o pedido do dono contradisser este arquivo, siga o pedido e atualize este arquivo e `docs/decisoes.md`.

## Em uma frase

Site de software moderno: abertura escura com degradês animados e telas do produto flutuando, seguida de seções claras e arejadas, cartões de vidro sobre o escuro, cartões brancos com sombra suave sobre o claro, e movimento suave que respeita `prefers-reduced-motion`. O tom é humano e direto, e o atendimento pelo WhatsApp é o maior diferencial.

## Ritmo da página

Toda página segue esta alternância, de cima para baixo:

1. **Cabeçalho flutuante:** pílula clara (`glass-light` com desfoque), sempre sobre o conteúdo, com a logo 3D sem texto.
2. **Abertura escura (`ink`)** com `Aurora`. Na home é `hero-section`. Nas telas internas use sempre o `PageHero` (`shared/ui/page-hero.tsx`): trilha de navegação, `h1`, subtítulo, botões e, à direita, um `aside` com mockup ou cartão de vidro.
3. **Seções que alternam `white` e `mist`** (classe `ms-section` e `ms-section--mist`), cada uma com cabeçalho de seção: `ms-eyebrow ms-eyebrow--light`, depois `h2.ms-h2` com uma palavra em `ms-grad ms-grad--deep`.
4. **Seções escuras pontuais** (`ms-section--dark` ou `ink`) para o que merece destaque: Área do Cliente, atendimento, fechamento.
5. **Fechamento escuro** com chamada para o WhatsApp ou para a demonstração.
6. **Rodapé** em `ink`, com linha de degradê no topo.

Nunca empilhe duas seções com o mesmo fundo. Poucos elementos por tela, muito respiro.

## Cores

Todas vêm de variáveis de `tokens.css` (gerado de `tokens.json`). Nunca escreva cor à mão: o gate `validate` reprova. Para uma cor nova, edite `tokens.json`, rode `bun run tokens` e documente o uso no campo `usage`.

| Papel | Token | Regra |
| --- | --- | --- |
| Fundo escuro principal | `ink` | Abertura, Área do Cliente, rodapé. Texto `white` e `text-on-dark`. |
| Superfície escura elevada | `ink-raised` | Cartões e painéis sobre `ink`. |
| Seção escura secundária | `navy` | Também é a cor dos títulos sobre claro. |
| Ação principal | `brand-deep` | Único fundo de botão principal. Degradê `brand-deep` → `logo-blue`. |
| WhatsApp e confirmação | `green` | Sempre com texto ou ícone `navy`. Nunca texto branco. |
| Realces sobre escuro | `aqua`, `iris`, `sky` | Brilhos, degradês e ícones sobre `ink` e `navy`. Nunca como texto sobre claro. |
| Fundos claros | `white` e `mist` | Alternam entre seções. |
| Texto | `text`, `text-muted`, `text-on-dark`, `text-on-ink-muted` | Cada um para o seu fundo, como descrito em `tokens.json`. |
| Vidro | `glass`, `glass-strong`, `glass-border` | Só sobre escuro. |
| Erro | `danger`, `danger-surface` | Sempre com ícone e mensagem. |

`logo-blue` e `logo-indigo` não entram na interface, exceto o `logo-blue` como segundo tom do degradê do botão e do ícone.

## Tipografia

- Títulos: **Manrope** (`--font-display`), peso 800, `letter-spacing` negativo (`-0.03em` no `h2`, `-0.04em` no `h1`), `text-wrap: balance`.
- Texto: **Inter** (`--font-body`), 16 px, `line-height` 1,65.
- Tamanhos pelos tokens: `fs-h1-*`, `fs-h2-*`, `fs-h3-*`, `fs-lead-*`, `fs-body`, `fs-small`. Use as classes `ms-h2` e `ms-h3`.
- O `h1` da abertura usa `clamp` com a largura e a altura da janela para caber na primeira tela em monitores pequenos (decisão 020). Reaproveite a regra do `PageHero`, não reinvente.
- Um único `h1` por página.
- Realce de palavra em título: `<span className="ms-grad">` sobre escuro e `ms-grad ms-grad--deep` sobre claro. Uma ou duas palavras por título.

## Espaçamento, raio e sombra

- Espaçamento só pelos tokens `space-1` a `space-9`. Entre seções: `space-8` no mobile, 104 px no tablet, 136 px no desktop (já na classe `ms-section`).
- Largura: `ms-wrap` (máximo 1280 px, margens 20, 32 e 40 px).
- Raios: `radius-sm` 6 (selos), `radius-md` 10 (campos e ícones), `radius-lg` 16 (cartões), 28 px (painéis grandes e gaveta), `radius-full` (botões, pílulas, eyebrow).
- Cartão claro: fundo `white` (ou `mist` dentro de seção branca), borda `line-light`, `radius-lg`, `shadow-menu`, e `shadow-lift` no hover.
- Cartão escuro: classe `ms-glass` (fundo `glass`, borda `glass-border`, desfoque 14 px) e `shadow-float` quando flutua.
- Ícone em destaque: quadrado de 56 px, `radius-md`, degradê `brand-deep` → `logo-blue`, ícone `white`.
- Passo numerado: círculo de 44 px, fundo `green`, número `navy`.

## Botões e links

Use sempre as classes de `site.css`. Nunca estilize um botão do zero.

| Classe | Uso |
| --- | --- |
| `ms-btn ms-btn--primary` | **Solicitar demonstração.** Única ação principal por bloco. |
| `ms-btn ms-btn--whatsapp` | **Chamar no WhatsApp.** Use o componente `WhatsappButton`, que já traz número e texto. |
| `ms-btn ms-btn--glass` | Ação secundária sobre escuro. |
| `ms-btn ms-btn--secondary` | Ação secundária sobre claro. |
| `ms-btn--lg` e `ms-btn--sm` | Tamanhos. O padrão tem 48 px de altura. |
| `ms-link` | Link de texto com seta que desliza. |

Os botões têm forma de pílula, brilho que passa no hover e subida de 2 px. Áreas de toque de pelo menos 44 px. Botões de WhatsApp apontam para `WHATSAPP_HREF` (`shared/config/site-config.ts`), nunca para um número digitado no componente.

## Efeitos e movimento

Todos já existem. Reaproveite, não crie variantes.

| Efeito | Como usar |
| --- | --- |
| Aurora (degradês que derivam + grade) | Componente `Aurora`, dentro de uma seção `ink` com `position: relative; isolation: isolate; overflow: clip`. |
| Entrada ao rolar | Componente `Reveal`, com `delay={index * 80}` em listas. |
| Brilho que segue o cursor | Classe `ms-spot` (e `ms-spot--dark`) no cartão, com `spotlight.ts`. |
| Números que contam | Componente `CountUp`. |
| Selo com ponto pulsante | `ms-eyebrow` com `ms-pulse` (disponibilidade, atendimento). |
| Faixas que rolam | `AutoRail` e `ms-marq`. O `AutoRail` anda sozinho e aceita arraste com mouse, dedo e trackpad. |
| Slides | `Carousel`. Anda sozinho e troca de slide com um gesto lateral de mouse ou dedo. |
| Palco dos produtos | `ProductsStage` (`features/products`): painel numa moldura de navegador (`BrowserFrame`), celular do app (`PhoneFrame`) e três atalhos em vidro (`ms-pchip`) para as páginas dos produtos. Imagens planas e inteiras, sem inclinação e sem recorte, com leve parallax do cursor. Fica na abertura da home e da página Produtos. |
| Visual de cada produto | `ProductVisual` (`features/products`), com prefixo `ms-pdv-`, e `ProductThumb` para o ícone pequeno. Mostra cada produto do seu jeito: logo e módulos (SmallBusiness), três telas lado a lado (MS App) e o painel em navegador (MS Dashboard). Serve na abertura da página do produto e nas faixas de `/produtos`. O prefixo `ms-pv-` é da Política de Privacidade. |
| Páginas de produto | `PageHero` com `parent`, faixa de destaques sobreposta, recursos em cartões, uma seção escura própria de cada produto (pacote do SmallBusiness, painel do Dashboard, passeio com `AppTour` no MS App), vantagens, vídeo quando há, outros produtos e fechamento escuro. `/produtos` é uma página de faixas alternadas, uma por produto. O conteúdo fica em `shared/config/products.ts`. |
| Conversas de WhatsApp | `ChatMockups`, com as duas conversas ilustrativas. |
| Produtos na home | Seção escura em bento (`ms-pb`): SmallBusiness em cartão grande, MS App e MS Dashboard ao lado. Fala do produto por quem ele serve e não repete as telas da abertura. Não use slides para mostrar produto. |
| Vídeo de apresentação | `YoutubeVideo`, com o código do vídeo. Mostra um botão e só carrega o player do YouTube no clique. |
| Sala de vídeos | `PageHero` com conteúdo abaixo do título (`children`). O palco da tela Vídeos usa a capa do vídeo desfocada como brilho de ambiente, e a capa vem do próprio site. |

Regras de movimento:

- Curvas e tempos só pelos tokens (`ease-standard`, `ease-out-expo`, `duration-*`).
- Todo efeito precisa de regra em `@media (prefers-reduced-motion: reduce)` que o desliga. Os arquivos `site.css` e `effects.css` já cobrem as classes existentes: para uma animação nova, cubra também.
- O movimento é suave e lento. Nada piscando, nada que atrapalhe a leitura.

## Responsividade

- Três layouts: mobile (menos de 768 px), tablet (768 a 1199 px) e desktop (1200 px ou mais). Abaixo de 1200 px o menu vira gaveta e as seções ficam em coluna única.
- Escreva o CSS mobile primeiro e suba com `@media (min-width: 768px)` e `@media (min-width: 1200px)`.
- Confira sempre em 390, 768, 1024, 1366 (monitor pequeno, é o da apresentação), 1536 e 1920 de largura. Sem rolagem lateral em nenhuma. Na abertura, os botões precisam caber na primeira tela em 1366×768.

## Convenções de CSS

- CSS puro, um arquivo por feature (`features/<feature>/<feature>.css`) e um por componente compartilhado, importado pelo componente. Sem Tailwind, sem CSS-in-JS.
- Todas as classes começam com `ms-`. Cada feature usa uma sigla própria (`ms-su-` Suporte, `ms-ph-` hero de página, `ms-hero-` home), em estilo BEM simplificado: `ms-su-card`, `ms-su-card__i`, `ms-su-card--destaque`.
- **Armadilha de especificidade:** `.ms-page ul`, `.ms-page ol`, `.ms-page h1..h3` e `.ms-page p` zeram margem, preenchimento e estilo de lista com mais peso que uma classe sozinha. Para mudar `margin`, `padding`, `list-style`, `font-size` ou `color` desses elementos, prefixe com `.ms-page`: `.ms-page .ms-su-strengths { display: grid; gap: ... }`. Da mesma forma, `.ms-btn` tem `position: relative` e `overflow: hidden`, então para um botão com `position: absolute` use um seletor mais forte.
- Sem comentários no código, nem em CSS.
- Contraste mínimo WCAG 2.1 AA, foco visível (`:focus-visible` já é global) e `aria-label` em ícones sem texto.

## Conteúdo e tom

- Português do Brasil, falando com "você". Frases curtas, vocabulário do setor (contrato, cobrança, baixa, jazigo, plantão).
- Botões dizem o que acontece: "Solicitar demonstração", "Falar com consultor". Nunca "Clique aqui".
- Sem emoji. Sem símbolos de morte (caixão, cruz, lápide, vela, flor de luto). Sem foto de banco de imagens e sem vídeo de fundo.
- **Nunca invente** depoimento, cliente, número, prazo ou tempo de resposta. O atendimento é "rápido", sem prometer prazo. Conversas e telas mostradas são ilustrativas e não trazem dados reais.
- Telefone de plantão não aparece, porque não há número confirmado.

## Logo

A logo do site é a 3D, recortada com fundo transparente, pelo componente `BrandMark`:

- `compact` (globo e "MS", sem texto): serve em fundo claro e escuro. No cabeçalho, 44 px de altura (38 px abaixo de 1200 px).
- `full` (com "consultoria & sistemas" e "soluções inteligentes" em branco): só em fundo escuro, porque o texto é branco. No rodapé, 250 px de largura.
- Ícone da aba: só o globo (`public/favicon-32.png` e `public/favicon.png`), que continua legível em 16 px. Na tela inicial do celular, o ícone quadrado completo (`public/apple-touch-icon.png`).

Não ponha a logo em pastilha, selo ou caixa, nem aplique máscara ou mesclagem: os arquivos já são transparentes. Mantenha livre ao redor pelo menos metade da altura. Para gerar outro tamanho, parta das versões transparentes em `docs/referencias/logo-3d`, nunca do arquivo usado no site. A `ms-logo.webp` antiga saiu do site junto com as telas de exemplo feitas em HTML.

## Checklist antes de entregar uma tela ou ajuste

1. Parte do `PageHero` (tela interna) e alterna `white` e `mist` entre as seções?
2. Só usa classes e componentes que já existem? Se criou algo novo, ele usa tokens, prefixo `ms-` e cobre `prefers-reduced-motion`?
3. Nenhuma cor, tamanho de fonte ou espaçamento escrito à mão fora dos tokens?
4. Um único botão principal por bloco, e o WhatsApp em verde com texto `navy`?
5. Conferido em 390, 768, 1024, 1366, 1536 e 1920, sem rolagem lateral?
6. Nenhum dado inventado?
7. `bun run validate` verde?
