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

A abertura da home deixa de ser um carrossel de quatro slides. Ela passa a ser uma cena única, com o texto principal e os produtos à vista, porque o carrossel escondia o mockup e repetia conteúdo que já tem seção própria. Os carrosséis de Soluções e Empresa continuam como estão. A ordem da home passa a ser: abertura, números, módulos, segmentos, Área do Cliente e App (trocada pelo SmallBusiness na decisão 030), ecossistema, atendimento, resultados, presença e demonstração.

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

**Cuidado:** o texto fala em atendimento rápido sem prometer prazo, porque a MS ainda não informou um tempo de resposta. O WhatsApp da MS fica em `shared/config/company-info.ts`, para o build automático não depender de `.env`. A variável `VITE_WHATSAPP_NUMBER` continua valendo como troca opcional. As conversas mostradas são ilustrativas.

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

## 025. Logo 3D no site

**Data:** 19/11/2026

A pedido do dono do projeto, o site passa a usar a logo 3D nova (globo e "MS" em azul e roxo). Os arquivos recebidos tinham fundo escuro, reflexo no chão e, no ícone, um xadrez desenhado no lugar da transparência. Eles foram recortados com o `rembg` (modelo `isnet-general-use`), e as bordas foram limpas para não guardar o tom escuro do fundo. O reflexo do chão saiu.

- Cabeçalho: logo sem texto, direto na pílula clara.
- Rodapé: logo completa, com o texto branco, sobre o fundo escuro.
- Ícone da aba: só o globo, porque o "MS" e o quadrado ficam ilegíveis em 16 px. Na tela inicial do celular, o ícone quadrado, com os cantos realmente transparentes.

Os originais, as versões transparentes em resolução cheia e o ícone de 512 px ficam em `docs/referencias/logo-3d`. A logo antiga (`ms-logo.webp`) fica só nas telas de exemplo da Área do Cliente e do App, que imitam o sistema atual.

**Substitui:** a regra do briefing e da decisão 016 de usar a logo só sobre fundo claro.

## 026. Sem parceiros no site e botão "Fale conosco"

**Data:** 19/11/2026

A pedido do dono do projeto, os parceiros (Granito Pagamentos, Rede Parcerias e iugu) saíram do site: do bloco da tela Empresa e do rodapé. O botão flutuante do WhatsApp, presente em todas as telas, passa a dizer "Fale conosco". Os links "Falar com consultor" da área de downloads do Suporte continuam, porque pedem o instalador a um consultor.


## 027. Tela de vídeos

**Data:** 19/11/2026

A pedido do dono do projeto, o site ganha a tela `/videos`, no menu entre Soluções e Suporte. Ela reúne os 14 vídeos de apresentação que já aparecem nos modais de Soluções. O dado vem do catálogo de soluções: um módulo novo com `videoId` entra na tela sozinho, desde que ganhe duração e capa em `features/videos/video-library.ts`. Um teste avisa se faltar.

- Palco: player grande na abertura escura, com a capa do vídeo desfocada atrás, como brilho de ambiente.
- Fila: lista com capa, duração e área. Escolher um vídeo na fila já começa a tocar. Os filtros por grupo ficam num carrossel de uma linha, que se move com o mouse, o dedo ou as setas das pontas. Cada seta só aparece quando há mais filtros daquele lado, e o filtro escolhido vai para o centro. As setas são uma exceção à decisão 024, pedida pelo dono do projeto: o carrossel não anda sozinho, e sem as setas os filtros pareciam cortados.
- Ações: tirar dúvidas no WhatsApp com a mensagem pronta, ver as funções do sistema (abre o modal em Soluções), próximo vídeo, copiar o link e modo cinema no computador.
- Link próprio: `/videos?video=<slug>` abre direto naquele vídeo, para o consultor mandar ao cliente. O modal de Soluções ganhou o link "Ver todos os vídeos".

As capas foram baixadas do YouTube, cortadas em 16:9 e ficam em `apps/web/src/assets/videos`. Assim, nada do Google carrega antes do clique no play. As durações e o total de minutos vêm das páginas dos vídeos no canal, sem arredondar para cima.

## 028. Clientes e Contato ocultas, menu "Vídeos do sistema" e acessos sem o Portal

**Data:** 19/11/2026

A pedido do dono do projeto:

- As telas Clientes e Contato saem do ar por enquanto. A lista `HIDDEN_PAGES`, em `shared/config/site-config.ts`, tira as duas do menu e do rodapé, e quem abre `/clientes` ou `/contato` volta para a página inicial. O código e os testes das telas continuam no projeto. Para trazer uma delas de volta, basta tirá-la da lista.
- Com o Contato oculto, o botão "Solicitar demonstração" do cabeçalho leva ao formulário da página inicial (`/#demonstracao`). Nas aberturas internas, o botão leva ao formulário da própria página. Os links "Falar com consultor" dos downloads do Suporte abrem o WhatsApp com a mensagem pronta.
- O item do menu passa a se chamar "Vídeos do sistema".
- O Portal do Associado sai dos acessos aos sistemas (menu "Acessar sistemas", rodapé e tela Acessar sistemas). O módulo Portal do Associado continua em Soluções, porque é um produto que a MS vende.

## 029. Abertura da home com vitrine em slides e o SmallBusiness

**Data:** 19/11/2026

A pedido do dono do projeto, o lado esquerdo da abertura da home fica fixo (título, texto, botões e garantias), e o lado direito vira uma vitrine em slides com transição suave. São quatro slides:

- **Área do Cliente:** a tela no navegador, para o associado ver boletos, dependentes e cadastro.
- **App do Cliente:** o celular em destaque, apresentado como uma ferramenta que o cliente da MS oferece aos associados dele.
- **MS Dashboard:** um print real do painel, com o nome do cliente trocado por "MS SISTEMAS" na mesma fonte e cor do sistema, com o menu aberto e os dois gráficos. O print aparece inteiro, sem cortes e sem nada por cima: os chips ficam acima e abaixo da tela. A imagem fica na resolução original, sem redução, para o texto continuar nítido. A versão editada fica em `docs/referencias/dashboard`. O print original, com o nome do cliente, não foi guardado no projeto.
- **SmallBusiness:** o pacote compacto do sistema da MS, hospedado na nuvem, com os módulos Plano, Funerária, Cobrança e Caixa, começo rápido e bom custo-benefício. O link "Conhecer o SmallBusiness" abre o WhatsApp com a mensagem pronta.

A vitrine usa o `Carousel` com a nova opção `transition="fade"`, em que um slide se funde no outro com um leve deslize, em vez de correr de lado. Ela continua automática (7 segundos por slide) e aceita o gesto de arrastar, como os outros carrosséis. Com movimento reduzido, a troca acontece sem animação.

A logo do SmallBusiness recebida tinha os cantos pretos. Eles foram deixados transparentes. O original e a versão transparente ficam em `docs/referencias/smallbusiness`.

**Substitui:** a parte da decisão 017 que tirou o carrossel da abertura da home. Agora só o lado direito muda, e o texto principal fica sempre à vista.

## 030. Seção SmallBusiness e Dashboard na home

**Data:** 19/11/2026

A pedido do dono do projeto, a seção "Área do Cliente e App" da home sai. No lugar dela entra a seção SmallBusiness (`#smallbusiness`), com o pacote compacto como foco principal:

- Logo do SmallBusiness em destaque, com os módulos incluídos: Plano, Funerária, Cobrança e Caixa.
- Selos: hospedado na nuvem, até 5 máquinas, começo rápido e ótimo custo-benefício.
- Botão "Quero conhecer o SmallBusiness", que abre o WhatsApp com a mensagem pronta.

Logo depois vem uma seção própria, "MS Dashboard e App do Cliente" (`#dashboard-e-app`), separada por uma linha e um fundo levemente mais claro. Ela segue o modelo da antiga seção da Área do Cliente: o print do Dashboard ao lado do App do Cliente, sem um cobrir o outro, e dois cards embaixo. O card "Para o gestor" traz as funções do Dashboard que já estão em Soluções, e o card "Para o seu associado" traz as do App.

**Regra do pacote:** o SmallBusiness pode ser instalado em até 5 máquinas. Esse número fica em `SMALL_BUSINESS_MAX_MACHINES`, em `features/home/small-business-content.ts`, que também alimenta o slide da abertura.

A Área do Cliente continua só nos slides da abertura da home.

**Substitui:** a seção "Área do Cliente e App" da decisão 017.

## 031. Vitrine sem a Área do Cliente e interesses no pedido de demonstração

**Data:** 19/11/2026

A pedido do dono do projeto:

- **Vitrine da abertura:** o slide da Área do Cliente saiu. Ficaram três slides: App do Cliente, MS Dashboard e SmallBusiness. A tela de exemplo da Área do Cliente (`client-area-screen.tsx`) foi apagada, porque não tinha mais uso.
- **Slide do Dashboard:** o chip "Tablet, celular ou notebook" saiu. Entraram quatro chips com os painéis reais do sistema: Fluxo previsto x realizado, Inadimplência, Vendas no período e Contas a receber. No celular aparecem dois, para não cobrir a tela.
- **Formulário de demonstração:** novo campo opcional "Quais soluções interessam?". O SmallBusiness vem primeiro, em destaque. Depois vêm todos os módulos do catálogo, agrupados pelas mesmas áreas de Soluções, em grupos que abrem e fecham. Cada grupo mostra quantos módulos foram marcados. As escolhas vão no pedido, no campo `interests`. A função pura `toggleInterest`, no domínio, marca e desmarca cada item.

Para o formulário usar o catálogo sem criar um ciclo entre as features Soluções e Demonstração, o catálogo foi movido para `shared/config/solutions-catalog.ts`. Os dados do SmallBusiness foram para `shared/config/small-business.ts`.

## 032. Santa Catarina atendida e vitrine mais lenta

**Data:** 19/11/2026

A pedido do dono do projeto, Santa Catarina passa a constar como estado atendido. O total de estados deixou de ser escrito à mão. Agora ele vem do mapa (`SERVED_STATE_COUNT`, em `shared/config/brazil-states.ts`) e aparece igual na home, na faixa de números, na tela Empresa e nos testes: 19 estados.

SC entrou na lista de clientes (`clients-data.ts`) sem cidades, porque elas ainda não foram informadas. A tela Clientes está oculta (decisão 028). Antes de publicá-la de novo, falta a lista de cidades de SC.

Cada slide da vitrine da abertura passa a ficar 11 segundos na tela, em vez de 7, para dar tempo de ler os textos.

## 033. Tela própria para o pedido de demonstração

**Data:** 19/11/2026

A pedido do dono do projeto, o formulário de demonstração saiu das outras telas e ganhou uma tela própria: `/demonstracao`. Ela parte do `PageHero`: à esquerda ficam o título, os três pontos e o WhatsApp para quem prefere falar agora; à direita fica o formulário completo, com a escolha de interesses. O botão flutuante do WhatsApp não aparece nessa tela, como já acontecia no Contato, para não cobrir o botão de envio.

O componente `DemoRequestSection`, que continua no fim das outras telas, virou um atalho: mantém o texto e os pontos, e no lugar do formulário mostra um card com "Solicitar demonstração" (leva para `/demonstracao`) e "Chamar no WhatsApp".

Todos os botões "Solicitar demonstração" (cabeçalho, abertura da home, aberturas internas, atalho e tela de vídeos) levam para `/demonstracao`, pelo `DEMO_HREF` de `shared/config/site-config.ts`.

**Substitui:** a parte da decisão 028 que levava o botão do cabeçalho ao formulário da home.

## 034. Segmentos do levantamento comercial no formulário

**Data:** 19/11/2026

A pedido do dono do projeto, o formulário de demonstração usa os segmentos do levantamento comercial por telefone da MS (documento interno, que não foi copiado para o site). Dele vieram dois segmentos que faltavam: **Clínica** e **Material Convalescente**.

- **Segmento da empresa:** a lista nativa do navegador virou um grupo de botões (um só marcado), com Planos Funerários, Funerária, Cemitério, Crematório, Clínica, Material Convalescente e Outro.
- **Quais soluções interessam?** Primeiro vem o SmallBusiness. Logo abaixo, em "Sistema por segmento", aparecem caixas de seleção à mostra: Plano, Funerária, Cemitério, Crematório, Clínica e Material Convalescente. Depois, em "Outros módulos", vêm as demais áreas de Soluções em grupos que abrem e fecham, cada um com o ícone da área e o total marcado.
- A ordem dos campos passou a ser Nome, Empresa, Cidade/UF, WhatsApp, E-mail e Segmento. O foco do erro segue a mesma ordem (`DEMO_REQUEST_FIELDS`).

As opções ficam em `features/demo-request/demo-options.ts`.

## 035. Distrito Federal atendido e mapa no formato do Brasil

**Data:** 23/11/2026

A pedido do dono do projeto, o Distrito Federal passa a constar como atendido. O total vai a 20 estados, contado pelo próprio mapa (decisão 032).

O mapa de quadros da home continua com todos os quadros do mesmo tamanho, na disposição original (7 colunas e 8 linhas). Antes da escolha, foram testados um mapa com estados grandes ocupando mais quadros e uma reorganização do litoral, e o dono do projeto comparou três opções desenhadas em `docs/referencias/mapa/opcoes-mapa.png`: quadros como antes, quadros escalonados e hexágonos. A escolhida foi a opção A, quadros como antes, com o DF aceso ao lado de Goiás. Um teste (`brazil-states.unit.test.ts`) garante que os 27 estados estão no mapa, que nenhum quadro cobre outro e que todos cabem na grade.

O DF entrou na lista de clientes sem cidades, como SC. As duas listas precisam ser completadas antes de a tela Clientes voltar ao ar.

## 036. Mais de um segmento no pedido de demonstração

**Data:** 23/11/2026

A pedido do dono do projeto, o campo "Segmento da empresa" passa a aceitar mais de uma escolha, porque muitas empresas atuam, por exemplo, com plano e funerária ao mesmo tempo. Os botões viraram caixas de seleção múltipla, e cada segmento marcado mostra um sinal de conferido.

No domínio, o campo `segment` (texto) virou `segments` (lista). Continua obrigatório marcar ao menos um, com a mensagem "Marque ao menos um segmento da empresa.". A função `toggleInterest` foi renomeada para `toggleChoice`, porque agora serve tanto para os segmentos quanto para os interesses.

**Substitui:** a escolha única de segmento da decisão 034.

## 037. Revisão de telas e carrossel de filtros que travava

**Data:** 23/11/2026

A pedido do dono do projeto, todas as telas foram revisadas em 320, 375, 390, 768, 1024, 1200, 1280, 1440 e 1920 px. Em cada uma foram medidos a rolagem lateral, os elementos que saem da tela, os textos cortados e as áreas de toque abaixo de 44 px. Também foram testados os fluxos principais no celular: menu, modal de Soluções aberto por link, formulário de demonstração até a confirmação, fila e filtros de vídeos, gesto na vitrine da abertura e arraste nas faixas de cartões.

Problemas encontrados e corrigidos:

- **Carrossel de filtros da tela Vídeos travava.** Partindo do início, a seta disparava a rolagem suave do navegador, e ela era cancelada no meio, quando a seta da esquerda e o esmaecimento apareciam. A rolagem agora é animada quadro a quadro pelo próprio site, sem encaixe automático (`scroll-snap`). O esmaecimento das pontas passou a ser uma camada por cima da faixa, e não uma máscara aplicada nela.
- **Logo do cabeçalho:** a área de toque tinha 38 px de altura e passou a ter 44 px.
- **Painel de números da tela Vídeos:** em telas de até 420 px, o texto "vídeos de apresentação" passava da coluna. Agora a fonte é menor e a palavra pode quebrar.

Nenhuma tela teve rolagem lateral em nenhuma das larguras testadas.

## 038. Setas nos slides, novo WhatsApp e links externos em nova aba

**Data:** 24/11/2026

- **Setas nos slides.** Os carrosséis (`Carousel`) e as faixas de cartões (`AutoRail`) ganharam duas setas discretas ao lado da barra de progresso, pelo componente `SlideNav`. O arraste com o mouse e o gesto no celular continuam valendo.
- **WhatsApp.** O número passou a ser (14) 99678-0173, em `shared/config/company-info.ts`. O site não escreve mais o número na tela: só o botão "Chamar no WhatsApp" leva a ele.
- **"Abrir chamado" virou "Abrir solicitação"**, em todos os botões e textos.
- **Links para outros sites abrem em nova aba.** O `SiteLink` põe `target="_blank"` e `rel="noopener noreferrer"` em todo endereço `http` ou `https`. Páginas do próprio site, telefone e e-mail seguem na mesma aba. Links externos escritos à mão passaram a usar o `SiteLink`.
- **Suporte.** Na conversa ilustrativa do relatório, o cliente propõe amanhã às 10h e o consultor confirma. O cartão "Plantão em fins de semana e feriados" ficou só com o título, sem texto de apoio.
- **Faixa de módulos da Home.** Cada módulo da faixa que corre virou um link para o seu cartão na tela Soluções (`/solucoes#<slug>`), que abre já com os detalhes daquele módulo. A faixa para de correr com o mouse em cima ou com o foco do teclado, para dar tempo de clicar.

## 039. Módulos pelo descritivo oficial da MS

**Data:** 24/11/2026

O dono do projeto enviou o descritivo de todos os módulos ("Módulos.docx"). O catálogo da tela Soluções foi refeito a partir dele, sem os valores e sem o Mapa de Calor, e passou de 24 para 38 módulos em seis grupos: Por segmento, Financeiro e caixa (grupo novo), Gestão, Equipe em campo, Canais digitais e Atendimento presencial.

- **Módulos novos no site:** Plano PET, Funerária PET, Caixa Matriz, Caixa PIX, MS Cobrança, MS Principal, Compras, Administração de Produtos, MS Patrimônio, MSCLOUD, Pré-Cadastro, Gestor de Frotas, App do Associado e WhatsApp Marketing.
- **Correções:**
  - "Veículos de Apoio" virou "CIB: Controle Integrado de Benefícios" (slug `cib`).
  - Condolência Online passou a descrever o aplicativo na sala de velório e foi para Atendimento presencial.
  - O Dashboard passou a listar os painéis reais do sistema.
  - Funerárias deixou de citar nota fiscal, que o descritivo não traz.
- **Fora do catálogo:**
  - A faixa e os cartões de módulos da Home ganharam os módulos novos.
  - O formulário de demonstração ganhou Plano PET e Funerária PET.
  - A seção SmallBusiness ganhou a lista do dia a dia.
- **`docs/modulos.md`** guarda o descritivo completo, com o slug de cada módulo, para as próximas edições.

## 040. Páginas de produto e novas telas do MS App

**Data:** 24/11/2026

A pedido do dono do projeto, os três produtos ganharam páginas próprias: SmallBusiness, MS App e MS Dashboard.

- **Rotas:**
  - `/produtos` lista os três produtos, e "Produtos" entrou no menu, depois de Soluções.
  - Cada produto tem `/produtos/<slug>`: abertura com o visual do produto, recursos, detalhes, "como funciona" ou "para quem é" quando há, vantagens, vídeo quando há (Dashboard), outros produtos e fechamento escuro com demonstração e WhatsApp.
  - Um endereço de produto que não existe volta para `/produtos`.
- **Conteúdo:**
  - Vem do descritivo de módulos (`docs/modulos.md`), das regras passadas pelo dono (SmallBusiness em até 5 máquinas) e do que aparece nas telas do app.
  - Os dados ficam em `shared/config/products.ts`. Não há preço.
- **Home:** as seções SmallBusiness e "Dashboard e App" viraram um carrossel de produtos com a mesma troca suave da abertura. O slide inteiro leva à página do produto. Os slides da abertura também ganharam o link "Conhecer o ...".
- **MS App:**
  - O "App do Cliente" passou a se chamar MS App, com o ícone novo.
  - A tela de exemplo feita em HTML saiu e entraram as telas reais enviadas pelo dono: acesso pelo CPF, tela inicial e lembrete de parcela, numa moldura de celular (`PhoneFrame`).
  - Nas imagens, o nome de uma pessoa foi trocado pelo nome de exemplo "José da Silva", e a barra de status e a de navegação do celular foram cortadas. Na tela inicial, o "??" sobrando em "Que bom ter você por aqui!" foi apagado.
- **Limpeza:** saíram as telas de exemplo em HTML (`features/home/screens`), o `mockups.css`, o `BrandLogo` e a `ms-logo.webp` antiga.

## 041. Refeita a vitrine de produtos: abertura, home e páginas

**Data:** 24/11/2026

O dono do projeto não aprovou o que a decisão 040 entregou em design. Os problemas eram: os mesmos três slides (SmallBusiness, MS App e Dashboard) na abertura e de novo mais abaixo na home; telas do app pequenas, inclinadas e recortadas; e páginas de produto idênticas entre si.

- **Abertura da home:** saíram os slides. Entrou o `ProductsStage`, com o painel e o celular do app planos, inteiros e nítidos, e três atalhos em vidro que levam às páginas dos produtos. O texto da esquerda não mudou.
- **Produtos na home:** o carrossel virou uma seção em bento, com o SmallBusiness em cartão grande e os outros dois ao lado. Ela fala de para quem cada produto serve e não mostra as telas da abertura.
- **`/produtos`:** abertura com o palco, três cartões de escolha sobrepostos e uma faixa por produto (visual, público, acesso, destaques e botão). Fechamento claro.
- **Páginas de produto:** cada produto tem a sua seção escura de detalhes. O SmallBusiness mostra o pacote e o dia a dia. O Dashboard mostra o painel em moldura de navegador. O MS App tem um passeio de três telas (`AppTour`), com uma tela por vez e passos clicáveis.
- **Imagens:** as telas do app seguem com o tratamento de privacidade da decisão 040, mas agora aparecem inteiras, na proporção original e sem inclinação (`PhoneFrame`, `BrowserFrame`).
- **Limpeza:** saíram `hero-showcase`, o carrossel de produtos da home, a opção `fade` do `Carousel` e o CSS antigo (`ms-stage`, `ms-chip`, `ms-hs`, `ms-sb`, `ms-pdh`).

## 042. Slides de volta, MS App sem recorte e duas telas sobrepostas

**Data:** 24/11/2026

O dono do projeto pediu para manter os slides com os três produtos na abertura da home, na troca automática de antes. O que ele não aprovou foi a distribuição das imagens dentro do slide, não o slide. Também pediu que as telas do app aparecessem sem perder informação nem nitidez. Esta decisão corrige a 041 nesses pontos.

- **Slides:**
  - A abertura da home (`HeroShowcase`) voltou a ser um carrossel de três slides, SmallBusiness, MS App e MS Dashboard, com troca suave a cada 11 s.
  - A seção "Três produtos para a sua empresa ir mais longe" voltou a ser um carrossel (9 s), com o produto à esquerda e os destaques à direita. O bento da decisão 041 saiu.
  - A opção `transition="fade"` do `Carousel` voltou.
- **Composição:** cada slide mostra o visual do produto inteiro e centralizado, com uma legenda curta. Sem inclinação e sem chips espalhados. O slide do MS App mostra dois celulares sobrepostos, o menu na frente e o login atrás.
- **Sem recorte:** o `PhoneFrame` arredondava a tela com a imagem por baixo, e cortava os cantos, onde ficam a logo e o sino de avisos. Agora a moldura tem uma faixa de câmera em cima e uma barra embaixo, e a imagem entra inteira, na proporção original.
- **Nitidez:** a imagem era esticada em uma caixa de proporção um pouco diferente da dela, o que a deixava borrada. Agora ela tem largura e altura naturais. As telas foram refeitas a partir dos originais, em WebP qualidade 96, com as mesmas edições de privacidade.
- **MS App em `/produtos`:** as faixas e a abertura da página do app usam os dois celulares sobrepostos.

**Ajustes seguintes (24/11/2026):**
- O celular de trás ficou mais claro e quase sem sobreposição, para o login aparecer melhor.
- A tela interna do celular ganhou cantos arredondados, e a tela inicial do app ganhou uma faixa de 44 px no topo, com a cor do cabeçalho, para a logo não encostar na borda.
- No passeio do MS App, o acesso não é mais só pelo CPF, porque é uma configuração de cada cliente. Os passos agora são "Acesso rápido", "Todos os acessos facilitados" e "Recebe lembretes".

## 043. "Produtos" vira "soluções digitais" e as soluções viram botões

**Data:** 24/11/2026

O dono do projeto lembrou que a MS é uma empresa de software e não tem produtos. SmallBusiness, MS App e MS Dashboard passam a se chamar **soluções digitais**.

- **Nome:**
  - "Soluções" já é a tela dos 38 módulos (`/solucoes`). Por isso o nome novo é **Soluções digitais**, para não ter dois itens iguais no menu. O texto fica em `DIGITAL_SOLUTIONS` (`shared/config/site-config.ts`), e trocar o nome por ali muda o menu, os títulos e a trilha.
  - O endereço agora é `/solucoes-digitais` e `/solucoes-digitais/<slug>`. Os endereços antigos `/produtos` e `/produtos/<slug>` redirecionam para os novos.
  - No código a pasta e os dados continuam com o nome `products` (`features/products`, `shared/config/products.ts`). Só os textos mudaram.
- **Tela de soluções:**
  - Todo lugar que cita um módulo ou grupo vira botão para `/solucoes#<slug>`: os quatro grupos e os módulos de "Tudo conectado, do escritório ao campo"; os módulos do SmallBusiness (chips e cartões); e o botão "Ver na tela de soluções" nas páginas do MS App e do MS Dashboard.
  - A faixa de módulos e os cartões de segmento da Home já levavam para lá. A função `solutionHref` foi para `shared/config/solutions-catalog.ts`.
- **Menu:** o nome maior quebrava em duas linhas no notebook, então o menu ganhou `nowrap` e espaçamento menor entre 1200 e 1439 px.
- **Número:** o contador "soluções integradas" da Home estava fixo em 24. Agora usa `SOLUTION_COUNT`, que é a contagem real do catálogo (38).

## 044. Sem tela de lista: cada solução digital tem a sua rota

**Data:** 24/11/2026

O dono do projeto não quer uma tela "Soluções digitais", porque ficava parecida demais com a tela Soluções (decisão 043 revisada).

- **Rotas:** SmallBusiness, MS App e MS Dashboard abrem em `/smallbusiness`, `/app` e `/dashboard`. Saíram `/solucoes-digitais`, a página de lista (`ProductsPage`), o palco (`ProductsStage`) e o item "Soluções digitais" do menu (`DIGITAL_SOLUTIONS`).
- **Endereços antigos:** `/produtos` leva para o início e `/produtos/<slug>` para `/<slug>`. Uma rota que não existe cai na página não encontrada.
- **Home:** a seção de baixo mantém só o carrossel, com o botão de cada slide levando à rota da solução. Saiu o botão "Ver todas as soluções digitais". O texto "Soluções digitais" continua só como etiqueta e título da seção.
- **Páginas:** a trilha é "Início / nome da solução", e o bloco de outras soluções usa a etiqueta "Mais da MS".
- **Botões para a tela Soluções (`/solucoes`)** da decisão 043 continuam como estavam.
- **Mapa de presença:** Mato Grosso (MT) passou a constar como atendido, sem lista de cidades, como SC e DF. O total vai a 21 estados, contado pelo próprio mapa. Mato Grosso do Sul (MS) já constava.

## 045. Escala fluida para telas de desktop menores

**Data:** 24/11/2026

O dono do projeto notou que, ao diminuir a janela no desktop, fontes, cartões e slides ficavam grandes demais para a tela e nem tudo cabia. Os tamanhos saltavam só em 768 e 1200 px e não consideravam a altura.

- **Tokens fluidos** (`tokens.json`): `fs-h1-tablet`, `fs-h1-desktop`, `fs-h2-desktop`, `fs-h3-desktop` e `fs-lead-desktop` passam a ser `clamp` com `vw` e, nos títulos grandes, `vh`. Entram `fs-body-desktop` (15 a 16 px), `fs-card-title`, `fs-stat`, `section-pad`, `section-pad-lg`, `card-pad` e `card-pad-tall`.
- **Seções:** o espaço vertical caiu de 104 e 136 px fixos para valores que acompanham a altura da janela (64 a 104 px e 72 a 136 px). Em 1272×585 o ganho é de uns 60 px por seção.
- **Cartões e números:** os números grandes (01, 02, 56 px das estatísticas, 72 px dos benefícios), os títulos de cartão e o respiro dos cartões e do slide de soluções passam a encolher com a largura.
- **Soluções digitais da home:** o título da seção era `clamp(38px, 6vw, 84px)` e chegava a 76 px em 1272 px. Agora vai de 34 a 68 px, limitado também pela altura. O slide usa o visual com altura limitada por `vh`.
- **Abertura:** espaços, intervalos e margens da abertura acompanham a altura, e o botão grande (`ms-btn--lg`) vai de 48 a 56 px. Em 1272×585 a chamada e os botões passam a caber na primeira tela.
- **Mapa:** a largura do mapa respeita a altura da janela, para não passar de uma tela.
- **Telas abaixo de 768 px não mudaram.**
- **Conferência:** capturas em 390, 768, 1024, 1200, 1272×585, 1366×768, 1536, 1920 e 1280×720 de todas as rotas, sem rolagem lateral.

## 046. Nova vitrine de soluções digitais na home

**Data:** 24/11/2026

O dono do projeto achou a seção "Três soluções digitais…" simples demais. Ela continua sendo um carrossel com troca automática, mas foi refeita:

- **Abas:** o `Carousel` ganhou a opção `tabs`. Cada solução tem uma aba com logo, nome e público, e a barra de tempo do slide fica dentro da aba atual. Clicar na aba leva ao slide. No celular a aba mostra só a logo.
- **Painel:** à esquerda fica um palco com brilho suave e grade na cor de cada solução (SmallBusiness em violeta, MS App em água, Dashboard em azul-claro). À direita ficam etiqueta, título, resumo, os quatro primeiros recursos em cartões e os botões "Conhecer o…" e "Solicitar demonstração".
- **Sem repetição:** saíram a lista de destaques e as etiquetas de módulo do visual do SmallBusiness, que repetiam os recursos. Os cartões dos módulos do SmallBusiness levam à tela Soluções.
- **Topo da seção:** em 1024 px ou mais, o título fica à esquerda e o texto de apoio à direita.
- **Sem anéis:** os anéis em degradê atrás do visual ficaram estranhos para o dono do projeto e saíram. O palco ficou só com o brilho e a grade.
- **Sem sombreado:** o palco ainda formava uma caixa mais clara com grade, somada ao brilho azul do visual e à sombra pesada do painel do Dashboard. Saíram a caixa e a grade; ficou só um brilho leve na cor da solução, e a sombra da moldura do Dashboard ficou mais suave.

## 047. Mais cor e ritmo na tela Soluções

**Data:** 24/11/2026

O dono do projeto achou a tela Soluções sem vida: todos os grupos eram iguais, em fundo claro. O fluxo, os modais, os vídeos e os textos dos módulos continuam iguais.

- **Cor por grupo:** Por segmento em azul, Financeiro e caixa em verde, Gestão e Atendimento presencial em violeta, Equipe em campo em água e Canais digitais em azul da logo. A cor aparece no fundo, no ícone, nos cartões e na barra do trilho.
- **Ritmo:** os grupos alternam claro (branco com brilho da cor) e escuro (azul-marinho com brilho, cartões de vidro), como o resto do site.
- **Cabeçalho do grupo:** ícone em degradê, número do grupo (01 a 06) com a contagem de soluções, título, descrição e o ícone do grupo grande e apagado ao fundo.
- **Cartões:** ícone em degradê, luz que segue o mouse, linha de cor no topo e leve subida ao passar o mouse. Com movimento reduzido, não sobem nem giram.
