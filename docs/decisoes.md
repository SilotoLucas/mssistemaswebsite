# Decisões

## 001. Monorepo com Bun e TypeScript

**Data:** 18/11/2026

A metodologia define Bun, TypeScript e workspaces. O repositório tem um único `.git` na raiz.

**Descartado:** npm e pnpm, para manter um único gerenciador.

## 002. React com Vite no front

**Data:** 18/11/2026

A metodologia não nomeia o framework de front, mas descreve telas com hooks. React com Vite atende a home e as próximas páginas com pouca configuração.

**Descartado:** Next.js, porque esta fase não tem servidor. A escolha pode ser revista quando o SEO das páginas internas entrar no escopo.

## 003. Somente front nesta fase

**Data:** 18/11/2026

Não existem `apps/api`, `infra` nem banco. O formulário passa pela porta `DemoRequestSender`, com um adaptador simulado.

**Descartado:** enviar por `mailto:`, porque perde dados e depende do aplicativo do visitante.

## 004. Design V1 como referência

**Data:** 18/11/2026

A home reproduz `docs/referencias/design-v1`, incluindo a seção da Área do Cliente e do App trazida da V2. Os estilos aprovados foram mantidos com o prefixo `ms-`.

**Descartado:** reescrever o CSS em outra ferramenta, para não alterar o design aprovado.

## 005. Tokens como fonte única

**Data:** 18/11/2026

`packages/design-tokens/tokens.json` gera `tokens.css`. O gate reprova cor escrita à mão e `tokens.css` desatualizado.

## 006. Ferramentas adiadas

**Data:** 18/11/2026

- `gitleaks`: fica para quando o projeto tiver segredos ou integrações, porque exige um binário externo.
- Testes `*.e2e.test.ts`: ficam para quando houver API ou infraestrutura real.
- `lefthook`: está configurado, mas os hooks só são instalados quando o dono executar `bunx lefthook install`.

## 007. TypeScript 5.9.3

**Data:** 18/11/2026

O `dependency-cruiser` depende da API JavaScript do compilador. Com o TypeScript 7 ele analisava zero módulos e aprovava tudo. O gate de arquitetura agora termina com código `2` quando nenhum módulo é analisado.

**Descartado:** TypeScript 7.0.2.

## 008. React Router para as páginas

**Data:** 18/11/2026

O site passa a ter endereços próprios, como `/solucoes`. A hospedagem precisa devolver `index.html` nas rotas internas.

**Descartado:** navegação somente por âncoras, porque cada tela precisa de endereço, título e descrição próprios.

## 009. Catálogo em uma única tela

**Data:** 18/11/2026

As 24 soluções do site legado ficam em `/solucoes`, agrupadas e com as funções abertas sob demanda. Textos com erros foram revisados, e a menção de aprovação pela Anatel ficou de fora até ser confirmada.

**Descartado:** criar 24 páginas agora, porque o conteúdo de muitas soluções ainda é curto.

## 010. Soluções com blocos de cor

**Data:** 18/11/2026

A tela de Soluções usa um fundo próprio para cada grupo, cartões com ícones e menu que indica o grupo ativo. As cores continuam vindo dos tokens.

**Descartado:** lista branca com acordeões, considerada pouco atraente na revisão do dono do projeto.

## 011. Carrosséis e tons suaves

**Data:** 18/11/2026

A pedido do dono do projeto, a abertura da home e a de Soluções usam carrossel em loop, como no site legado, e as soluções aparecem em slides por grupo. O carrossel tem pausa, setas, indicadores e gesto de deslizar, e não roda sozinho com movimento reduzido. Soluções passa a usar um único bloco escuro e fundos azulados suaves.

**Substitui:** a regra inicial de não usar carrossel no hero e a decisão 010, considerada colorida demais.

## 012. Movimento dos carrosséis

**Data:** 18/11/2026

A abertura desliza com a Web Animations API. Os slides de soluções formam um trilho contínuo, movido por `transform`, sem emenda visível. Os carrosséis seguem automáticos com o cursor sobre eles e param pelo botão de pausa, por foco de teclado, durante o toque ou arraste e enquanto um painel de funções está aberto. As funções abrem em um painel abaixo dos slides, sem alterar a altura dos cartões.

**Descartado:** pausar ao passar o cursor, porque dava a impressão de carrossel parado, e expandir o cartão dentro do trilho.

## 013. Modal reutilizável e carrosséis somente automáticos

**Data:** 18/11/2026

As funções das soluções abrem no componente `Modal`, em `apps/web/src/shared/ui/modal.tsx`, baseado no elemento nativo `dialog`. Por decisão do dono do projeto, os carrosséis não têm pausa nem controles manuais.

**Impacto conhecido:** sem pausa, o movimento automático não atende ao critério 2.2.2 da WCAG 2.1 AA. O movimento continua parando com foco de teclado e com um modal aberto.

**Substitui:** os controles descritos nas decisões 011 e 012.

## 014. Tela Empresa

**Data:** 18/11/2026

A tela usa os textos do site legado, com a visão corrigida para "melhor custo-benefício". A equipe aparece só com o primeiro nome e a inicial, sem telefones, e-mails ou cargos, até a MS enviar fotos e autorizar os dados. `PageHero` e `AutoRail` passaram a ser componentes compartilhados.

**Descartado:** publicar contatos individuais da equipe, por causa da LGPD, e a frase "líder no setor", que não tem comprovação.

## 015. Mapa em Onde estamos

**Data:** 18/11/2026

A tela Empresa incorpora o Google Maps com carregamento sob demanda e mostra telefones fixos, WhatsApp e e-mail. Os celulares de plantão ficaram de fora até a MS definir quais continuam públicos.

**Atenção:** o mapa é um serviço de terceiros e deve constar na Política de Privacidade.
