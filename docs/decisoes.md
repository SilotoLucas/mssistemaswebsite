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

## 016. Redesign visual da home

**Data:** 18/11/2026

A pedido do dono do projeto, o visual passa a ser mais ousado, com referência em sites de software atuais. A abertura é escura, com degradês animados (aurora), grade sutil, títulos grandes com realce em degradê, mockups da Área do Cliente e do App flutuando em perspectiva e cartões de vidro. O cabeçalho vira uma pílula flutuante clara, o que mantém a logo sempre sobre fundo claro. Entram revelação ao rolar, números que contam, brilho que segue o cursor nos cartões e uma faixa com os módulos. As telas Soluções e Empresa herdam o cabeçalho, o botão e o `PageHero`.

**Impacto nos tokens:** novas cores (`ink-raised`, `aqua`, `iris`, `glass`, `glass-strong`, `glass-border`, `glass-light`, `line-light`, `text-on-ink-muted`), sombras (`shadow-lift`, `shadow-float`, `shadow-glow`, `shadow-pill`), tempos (`duration-slow`, `ease-out-expo`), títulos maiores e `header-height` de 88 px.

**Substitui:** a regra de manter o estilo claro e minimalista da decisão 004 apenas na home e no shell. O design V1 continua como base de conteúdo e de identidade.

## 017. Hero sem carrossel e nova ordem da home

**Data:** 18/11/2026

A abertura da home deixa de ser um carrossel de quatro slides. Ela passa a ser uma cena única, com o texto principal e os produtos à vista, porque o carrossel escondia o mockup e repetia conteúdo que já tem seção própria. Os carrosséis de Soluções e Empresa continuam como estão. A ordem da home passa a ser: abertura, números, módulos, segmentos, Área do Cliente e App, ecossistema, atendimento, resultados, presença e demonstração.

**Substitui:** a parte da decisão 011 que trata do carrossel da abertura da home.

**Cuidado:** as conversas e telas mostradas são ilustrativas, sem dados de clientes.

## 018. Telas Clientes, Suporte, Contato, Acessar sistemas e Privacidade

**Data:** 18/11/2026

O site passa a ter as oito telas do plano. A navegação principal vira Soluções, Clientes, Suporte, Empresa e Contato. O botão "Solicitar demonstração" do cabeçalho e das telas internas leva a `/contato#demonstracao`. Os dados de contato (telefones, e-mail, endereço) saem da feature Empresa e vão para `shared/config/company-info.ts`, e o mapa de estados da home vai para `shared/config/brazil-states.ts`.

**Clientes:** a lista de cidades vem das três páginas regionais do site atual e foi curada à mão: grafias corrigidas, duplicatas removidas e itens descartados por serem bairros ou estarem no estado errado (Augusto Franco e Bugio, que são bairros de Aracaju; Jurinu; Sobradinho em Goiás, que fica no DF; Catalão, Cáceres, Nova Mutum, Ibó, Monte Caseros). Também saíram por dúvida: Tapaciguara, Cipó, Castelo, Planalto (MG) e Bela Vista (PR). Sobradinho em Pernambuco ficou, mas a MS precisa confirmar. A MS deve revisar a lista inteira antes da publicação.

**Suporte:** só links oficiais dos fabricantes (TeamViewer, AnyDesk, .NET Framework). Ficaram de fora o Skype (encerrado em maio de 2025), o UltraVNC (link quebrado) e o Ammy (ferramenta antiga, bloqueada por antivírus). MS Suporte e MS Conexão RDP continuam "falar com um consultor", como no site atual. Os telefones de plantão não aparecem, porque não há número confirmado.

**Privacidade:** o texto é uma base escrita a partir do que o formulário coleta, não é parecer jurídico. Precisa de revisão da MS e de um advogado antes de ir ao ar, principalmente prazo de guarda, bases legais e o uso do Google Maps (serviço de terceiros).

**Testes:** o front passa a ter testes de interface com `bun test`, `happy-dom` e Testing Library, em arquivos `*.ui.test.tsx`. Eles cobrem rotas, cabeçalho, formulário, busca de clientes, suporte, acessos e privacidade.

## 019. Suporte pelo WhatsApp como diferencial

**Data:** 18/11/2026

O atendimento rápido dos consultores pelo WhatsApp é o maior trunfo da MS, então passa a guiar o site. A tela Suporte foi refeita: abertura com o botão do WhatsApp e uma conversa ilustrativa, os diferenciais do atendimento, o passo a passo da mensagem até a solução, outros canais (chamado e telefones), downloads oficiais e um fechamento com o WhatsApp. Um botão flutuante "Falar com consultor" aparece em todas as telas, e Suporte sobe para o segundo lugar do menu.

**Cuidado:** o texto fala em atendimento rápido sem prometer prazo, porque a MS ainda não informou um tempo de resposta. O WhatsApp da MS (14) 99785-6833 fica em `shared/config/company-info.ts`, para o build automático não depender de `.env`. A variável `VITE_WHATSAPP_NUMBER` continua valendo como troca opcional. As conversas mostradas são ilustrativas.

## 020. Telas pequenas de desktop

**Data:** 18/11/2026

O design foi conferido em 1024, 1280, 1366 e 1536 de largura, além de 1920, em todas as oito telas, sem rolagem lateral. A abertura da home e das telas internas agora ajusta o tamanho do título e os respiros à largura e à altura da janela, para que os botões fiquem na primeira tela em monitores de 1366×768 ou menores. No Suporte, o texto da abertura fica alinhado ao topo, para o botão do WhatsApp não descer com as conversas. O botão flutuante do WhatsApp some em `/contato`, onde cobria o campo de e-mail do formulário.

**Limite conhecido:** abaixo de 1200 px de largura o site usa o layout de tablet, com menu em gaveta e seções em coluna única.

## 021. Deploy do front na VM

**Data:** 18/11/2026

O site é publicado na mesma VM do Abanou, atrás do Caddy que já é o proxy único, pela rede `borda` e por um arquivo em `/opt/borda/sites`. O build roda dentro do Docker (Node 24 com Bun 1.4.0) e o resultado é servido por um Caddy mínimo. Um timer do systemd confere o GitHub a cada 2 minutos e publica commit novo da branch configurada, como no Abanou. O endereço inicial é `mssistemas.194.5.152.64.sslip.io`, com HTTPS válido e sem domínio próprio. A branch inicial é `feat/redesign-visual`, para a `main` continuar com o site original.

**Pendente:** trocar para o domínio da empresa quando houver, e decidir se a branch do deploy vira `main` depois da aprovação. O guia está em `docs/deploy.md`.

## 022. Guia do design atual

**Data:** 18/11/2026

O padrão visual aprovado passa a ficar escrito em `docs/design.md`: ritmo da página, cores, tipografia, botões, efeitos, responsividade, convenções de CSS e tom de voz. As instruções do `AGENTS.md` e de `.claude/rules/web.md` mandavam seguir o design V1, que pede estilo claro e minimalista e proíbe gradientes e glassmorphism, o oposto do visual aprovado nas decisões 016 a 020. Quem seguia essas instruções chegava a um resultado diferente do aprovado.

**Regra:** `docs/design.md` vence o design V1 no visual. O V1 continua como base de identidade e conteúdo.

## 023. Vídeo de apresentação no modal das soluções

**Data:** 19/11/2026

O modal de uma solução pode mostrar o vídeo de apresentação do módulo, abaixo da lista de funções. Basta preencher `videoId` no catálogo (`solutions-catalog.ts`) com o código do vídeo no YouTube. Soluções sem vídeo continuam como antes.

Os vídeos vêm do canal oficial da MS no YouTube (`@mssistemas8611`, 27 vídeos). O canal `@mssistemas` é de outra empresa. Têm vídeo 14 das 24 soluções: Planos Funerários, Funerárias, Cemitérios, Controle de Frota, Dashboard, Cobrança Móvel, Venda de Planos com Tablet, P.O.S, Portal do Associado, ChatBot, SMS Marketing, Totem de Autoatendimento, Totem Cemitério e Painel de Velório. Quando havia dois vídeos do mesmo módulo, ficou o mais recente. Ficaram sem vídeo: Crematórios, Clínicas, Controle Financeiro, Controle de Filiais, Controle de Equipamentos, CRM, Veículos de Apoio, Venda Web, Condolência Online e QR Code Cemitério. Do canal, não entraram os institucionais, Caixa PIX, MSCLOUD, Aplicativo, Display Cemitério e Adm Camping, porque nenhum corresponde a uma solução do catálogo.

O vídeo toca dentro do site, pelo componente `YoutubeVideo` de `shared/ui`. Até o clique, aparece só um botão e nada do YouTube é carregado. Depois do clique, o player abre no endereço `youtube-nocookie.com` (modo de privacidade aprimorada), já tocando. Fechar o modal tira o player da página, então o vídeo para.

**Cuidado:** o YouTube é serviço de terceiros. A Política de Privacidade ganhou a seção "Conteúdo de terceiros", que cita o YouTube e o Google Maps. Esse texto também entra na revisão jurídica pendente da decisão 018.

## 024. Arrastar os carrosséis

**Data:** 19/11/2026

Os carrosséis continuam automáticos, que é o padrão, mas agora também respondem à mão de quem visita. Nas faixas de cartões (`AutoRail`, em Soluções e na equipe da Empresa), os cartões seguem o mouse ou o dedo e, ao soltar, encaixam no cartão mais próximo. Um gesto rápido avança um cartão. O trackpad lateral e Shift com a roda do mouse também movem a faixa. Nos slides (`Carousel`, nas aberturas de Soluções e Empresa), um gesto lateral de pelo menos 40 px passa ao próximo slide ou volta ao anterior, com a animação no sentido do gesto.

Depois de um arraste, a contagem automática recomeça do zero. Arrastar não abre o cartão nem segue um link: o clique que vem logo depois do gesto é descartado. A roda vertical continua rolando a página, e no celular o movimento vertical continua rolando a tela (`touch-action: pan-y`). Os gestos ficam em `shared/ui/gesture.ts`.

**Substitui:** a parte da decisão 013 que tirou a troca manual dos carrosséis. Setas e botões de pausa continuam fora.

