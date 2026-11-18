A MS Consultoria & Sistemas desenvolve software de gestão para funerárias, planos de assistência familiar, cemitérios e crematórios desde 2005. Este sistema define como a marca aparece no site. Comece pela home, nos componentes `HomeDesktop`, `HomeTablet` e `HomeMobile`, e reaproveite as mesmas decisões nas demais páginas.

## Princípios

- **Clareza primeiro.** Em poucos segundos, o visitante entende o que a MS faz, para quem faz e qual é o próximo passo.
- **Atendimento em primeiro lugar.** O atendimento rápido pelo WhatsApp é o maior diferencial da MS e aparece logo no início da página.
- **Uma ação principal.** `Solicitar demonstração` usa sempre `brand-deep`. `Chamar no WhatsApp` usa `green` com texto `navy`, e nenhuma outra ação usa essas cores de fundo.
- **Serenidade.** Muito branco, poucos elementos por tela e movimento quase imperceptível.
- **Respeito.** O setor é sensível. O tom é humano e direto, sem ser sombrio nem festivo.

## Conteúdo e tom de voz

Escreva em português do Brasil, falando com "você" e "sua empresa". Use frases curtas e palavras do dia a dia do setor: contrato, cobrança, baixa, jazigo, plantão. Use letra maiúscula só no início da frase e em nomes próprios.

| Faça | Evite |
| --- | --- |
| Solicitar demonstração | Clique aqui |
| Informe o WhatsApp com DDD. | Campo inválido |
| Suporte de verdade, inclusive quando você mais precisa | Líder absoluto do setor |

Não use emoji. Não publique depoimentos, nomes de clientes ou números sem autorização e sem confirmação. Não prometa tempo de resposta sem um dado real.

Evite símbolos de morte: caixões, cruzes, lápides, velas e flores de luto. Evite também fotos de banco de imagens, carrossel no hero e vídeo de fundo.

## Logo

Use o arquivo `ms-logo.webp` exatamente como foi enviado. Não redesenhe, não recorte, não mude proporção ou cor e não aplique sombra, contorno ou transparência.

- **Fundos permitidos:** `white` e `mist`. Não aplique sobre `navy` nem sobre fotos. Por isso, o rodapé é claro.
- **Área de proteção:** mantenha livre, em todos os lados, pelo menos metade da altura da logo. No cabeçalho, a altura é de 48 px.
- **Tamanho mínimo:** 97 × 48 px em telas. Abaixo de 360 px de largura de tela, aceita-se 81 × 40 px.

## Cores

Predomínio de `white` e `mist`, com azul em pontos estratégicos.

| Papel | Token | Regra |
| --- | --- | --- |
| Ação principal, links | `brand-deep` | Única cor de botão principal. Texto `white` com 7:1. |
| Ícones e detalhes | `brand` | 3,6:1 sobre `white`. Não sirva de fundo para texto branco. |
| Títulos e seção escura | `navy` | Texto `white` com 12,6:1. |
| Detalhes sobre escuro | `sky` | Só sobre `navy`. |
| Fundos alternados | `mist` | Alterne com `white` entre seções. |
| WhatsApp e confirmação | `green` | Sempre com texto ou ícone em `navy`. Nunca com texto branco. |
| Erro de formulário | `danger` | Adição funcional, sempre com ícone e mensagem. |

`logo-blue` e `logo-indigo` registram os tons medidos no arquivo da logo. Eles servem de referência e não entram na interface.

Não use marrom, dourado, amarelo-limão, gradientes chamativos ou glassmorphism.

## Tipografia

Use **Manrope** nos títulos (`--font-display`) e **Inter** nos textos (`--font-body`), ambas do Google Fonts, com suporte completo à acentuação do português.

| Estilo | Mobile (390) | Tablet (768) | Desktop (1440) | Peso |
| --- | --- | --- | --- | --- |
| H1 | 34/42 | 44/52 | 52/60 | 700 |
| H2 | 28/36 | 40/48 | 40/48 | 700 |
| H3 | 20/28 | 22/30 | 22/30 | 700 |
| Subtítulo | 18/28 | 20/32 | 20/32 | 400 |
| Corpo | 16/26 | 16/26 | 16/26 | 400 |
| Apoio | 14/22 | 14/22 | 14/22 | 400 |
| Botão | 16/24 | 16/24 | 16/24 | 600 |

Use um único H1 por página. Não pule níveis de título.

## Espaçamento e grid

A escala vai de `space-1` (4 px) a `space-9` (112 px). Use `gap` para separar elementos.

| Tela | Colunas | Margem lateral | Entre seções |
| --- | --- | --- | --- |
| Mobile, até 767 px | 4 | `gutter-mobile` 20 px | `space-8` 72 px |
| Tablet, 768 a 1199 px | 8 | `gutter-tablet` 32 px | 96 px |
| Desktop, a partir de 1200 px | 12 | `gutter-desktop` 40 px | `space-9` 112 px |

O conteúdo tem no máximo 1200 px de largura (`container-max`, com as margens incluídas). A página nunca rola na horizontal.

## Bordas, sombras e superfícies

- `radius-md` em botões e campos. `radius-lg` em cartões e painéis. `radius-sm` em selos e blocos do mapa.
- Separe conteúdo com `border-subtle` antes de recorrer a sombra.
- `shadow-menu` só em menus suspensos.

## Iconografia

Use os ícones de linha do componente `Icons`, baseados na família Lucide: grade de 24 px, traço de 1,5 px, pontas arredondadas e sem preenchimento. Aplique `brand` ou `brand-deep` sobre fundos claros e `sky` sobre `navy`. Ícone sem texto precisa de `aria-label`.

## Imagens

Mostre apenas produtos que a MS realmente oferece. As telas da Área do Cliente e do App são redesenhos fiéis das telas reais, feitos com os tokens e com dados de exemplo. Substitua por capturas originais quando existirem. Nunca mostre nomes, datas de nascimento, endereços, telefones ou e-mails de pessoas reais.

## Movimento e estados

As microinterações mudam cor e contorno em `duration-fast` e deslocam a seta dos links em 4 px em `duration-base`, ambas com `ease-standard`. Com `prefers-reduced-motion`, as transições são desligadas.

Todo elemento interativo tem foco visível: anel de 2 px em `focus-ring`, ou `focus-ring-on-dark` sobre `navy`. A área de toque mínima é `tap-min`, de 44 px.

## Implementação

`tokens.json` é a fonte única de valores. `components/bundle.css` contém os estilos com o prefixo `ms-`, e `components/bundle.js` monta as partes da home sem dependências externas. O formulário da home simula o envio: conecte o destino real dos pedidos antes de publicar o site.
