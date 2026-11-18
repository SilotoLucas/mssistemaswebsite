# Análise completa do site atual: MS Sistemas

**Site analisado:** https://mssistemas.com.br/site/
**Data da análise:** 18/11/2026
**Objetivo:** servir de base para o desenvolvimento do novo site.

---

## 1. Resumo executivo

A MS Consultoria & Sistemas vende software de gestão para **funerárias, planos de assistência familiar, cemitérios e crematórios**. O site atual tem conteúdo de produto valioso, mas apresenta esse conteúdo mal e não foi feito para gerar novos clientes.

**Os 6 pontos que mais importam para o projeto novo:**

1. **Não existe caminho de conversão.** Não há botão "Solicitar demonstração", nem página de contato própria (`/contato/` retorna 404). O único formulário é genérico.
2. **A maior prova de credibilidade está escondida.** O site tem listas com cerca de 340 localidades atendidas em 18 estados, mas nenhum link da home ou do menu leva até elas.
3. **As páginas de produto abrem no lugar errado.** Quem chega por URL direta (por exemplo, pelo Google) vê primeiro uma grade com as 24 soluções. O conteúdo do produto fica abaixo dela: no celular, o título aparece a cerca de 3.000 px do topo.
4. **O SEO é praticamente inexistente.** A home não tem H1, todas as páginas usam a mesma descrição, e não há sitemap, robots.txt, canonical nem Open Graph.
5. **Não há medição.** O Google Analytics está com o código de exemplo (`UA-XXXXXXXX-XX`), então o site não coleta dados de visitas.
6. **A base técnica está desatualizada.** WordPress 5.5, PHP 7.4 (sem suporte desde 2022) e Bootstrap 4, sobre um template gratuito.

---

## 2. A empresa

| Item | Informação |
|---|---|
| Razão / nome | MS Consultoria & Sistemas |
| Fundação | Fevereiro de 2005, por Marcos Eduardo |
| Sede | Rua Florindo Silva, 51, Jardim Paraíso II, Botucatu/SP, CEP 18610-150 |
| Segmentos | Automação funerária, cemitérios, crematórios (também clínicas) |
| Slogan | "Inovação, Excelência e Compromisso com o Futuro." |
| Equipe publicada | 9 pessoas: Eduardo, Simone, Marcello, Alessandro, Bill, Leandro, André, Mario e Neri |
| Parceiros | Granito Pagamentos, Rede Parcerias, iugu |
| Redes sociais | Facebook (`/mssist`), Instagram (`@mssistemas5`) |

**Missão:** desenvolver soluções inteligentes para garantir a satisfação das empresas, buscando tecnologia constantemente e oferecendo suporte diferenciado e comprometido com o resultado e a gestão dos negócios dos parceiros.

**Visão:** ser a tranquilidade de que os parceiros necessitam para garantir a integridade das informações geradas, por meio do suporte especializado e dos softwares, com o "menor custo benefício do mercado".

> A frase "menor custo benefício" diz o contrário do pretendido. O correto é "melhor custo-benefício".

**Valores:** honestidade, competência, agilidade, comprometimento e ética.

### Canais de contato publicados

| Canal | Dados |
|---|---|
| Telefones fixos | (14) 3815-6846 e (14) 3814-0749 |
| Plantão | (14) 99785-6833, 99667-1737, 99129-9615, 99678-0173, 99786-6896, 99799-9134, 99131-0868 |
| E-mails na seção Contato | contato@mssistemas.inf.br, suporte@mssistemas.inf.br |
| E-mail no rodapé | contato@mssistemas.com.br |
| WhatsApp do chatbot modelo | (11) 96933-3484 |
| Regra de atendimento | Dias úteis: fixos ou plantão. Feriados e fins de semana: somente plantão |

### Área de atuação (conteúdo hoje sem link no menu ou na home)

| Região | Estados listados |
|---|---|
| Sul e Sudeste | SP, ES, MG, PR, RJ, RS |
| Centro-Oeste | GO, MS |
| Norte e Nordeste | AL, AM, BA, PA, PB, PE, PI, RN, RO, SE |

São **18 estados e cerca de 340 entradas**, contagem bruta que inclui repetições e erros (ver seção 8.5). Bahia e Pernambuco concentram a maior parte do Nordeste.

---

## 3. Catálogo completo de soluções e funções

São **24 soluções** publicadas em `/site/solucoes/`.

### 3.1 Sistemas de gestão

#### Adm. de Planos Funerários
Gestão de funerárias e planos de assistência familiar.
- Controle de qualquer tipo de plano: mensal, bimestral, trimestral, rateio de óbitos por faixa etária, entre outros
- Cobrança de seguros de vida, equipamentos de convalescença, transportes não emergenciais e outras taxas
- Emissão de carnês, cartas de cobrança e boletos bancários
- Débito em conta corrente ou em companhias de energia elétrica (conta de luz)
- Carteirinhas de associados em impressora laser, matricial ou térmica
- Comissão de venda em até 3 níveis: gerente, supervisor e vendedor
- Baixa automática de pagamentos pelos arquivos de cobrança bancária
- Emissão de guias para conveniados e controle de convênios
- Módulo de caixa integrado, com baixa de parcelas e autenticação de documentos
- Relatórios: débitos, recebimentos previstos, recebimentos realizados, inadimplência, vendas e vendedores

#### Adm. de Funerárias
Registro dos dados do óbito e venda de produtos e serviços.
- Documentação do óbito para registro em cartório
- Ordem de serviço para preparação do corpo
- Nota fiscal, boleto bancário ou nota promissória
- Controle de estoque de materiais
- Comissionamento de vendas
- Padronização dos atendimentos

#### Adm. de Cemitérios
Integrado ao sistema de planos, cobre a parte contratual e administrativa de cadastros e cobranças.
- Preparado para qualquer engenharia de jazigos
- Controle de sepultamentos e exumações, com histórico por jazigo
- Criação automática de jazigos, respeitando posições dependentes
- Busca e localização de sepultados
- Listagens para administração de exumações e sepultamentos
- Mala direta de previsão de exumações e para responsáveis pelos jazigos

#### Adm. de Crematórios
- Registro dos dados do falecido e venda de produtos e serviços de cremação
- Documentação da cremação
- Ordem de serviço com data e hora
- Nota fiscal, boleto bancário ou nota promissória
- Controle de estoque e comissionamento de vendas
- Padronização dos atendimentos
- Agendamento de salas de cerimonial e de velório

#### Adm. de Clínicas
Gestão de clínicas médicas e odontológicas.
- Convênios com tabelas de valores diferentes por procedimento
- Agenda dos profissionais
- Emissão de guias de atendimento
- Carnê de manutenção de aparelhos ortodônticos
- Comissionamento de profissionais ou convênios
- Recebimentos e contas a receber
- Verificação de inadimplência do associado ao emitir a guia (quando integrado ao plano)
- Operação on-line para clínicas distantes da sede

#### Controle Financeiro
- Contas a pagar, contas a receber e contas correntes
- Controle de pré-datados
- Recebe a movimentação dos caixas diários quando integrado a planos ou clínica
- Fluxo de caixa comparativo de até 12 meses
- Posição imediata dos saldos das contas correntes

#### Controle de Filiais Online
- Funciona on-line ou off-line
- Recebimento de taxas, guias de convênios, carteirinhas e carnê não bancário
- Fechamento de caixa e relatórios
- Quando on-line, gerenciamento pela matriz e baixa direta no servidor principal

#### Controle de Veículo (Frota)
- Cadastro de veículos e motoristas
- Manutenções preventivas e corretivas
- Despesas, abastecimentos e multas
- Movimentação dos veículos
- Planilhas e fichas de vistoria
- Relatórios gerenciais

#### Controle de Equipamentos
Equipamentos para convalescentes.
- Empréstimo ou locação, com controle de prazos de devolução
- Verificação de inadimplência na retirada
- Contrato de empréstimo e nota promissória
- Rastreamento de todas as utilizações
- Manutenção e venda dos equipamentos

#### CRM: Telecobrança e S.A.C.
- Telecobrança com geração de campanhas
- Acompanhamento de produção e efetividade da cobrança
- Comissionamento dos colaboradores
- Registro de ligações recebidas e efetuadas
- Encaminhamento de pendências para as áreas da empresa
- Monitoramento dos contatos e das soluções dadas aos clientes

#### Adm. Veículos de Apoio (Ambulâncias)
Transporte não emergencial de pacientes.
- Agenda dos veículos
- Autorização de transporte
- Lançamento de valores no caixa da empresa
- Relatórios gerenciais

### 3.2 Mobilidade e campo

| Solução | Funções |
|---|---|
| **Cobrança Móvel** | Cobrança e consulta por smartphone, integrada ao sistema de planos; baixa automática dos recebimentos; feita para cobrança a domicílio |
| **Venda de Planos com Tablet** | Substitui propostas em papel; agiliza o cadastro dos contratos e reduz o tempo de entrega de contratos novos |
| **P.O.S para Ponto de Recebimento** | Recebimento remoto em pontos de apoio ou com cobradores; baixas on-line; emissão de recibos; relatórios de recebimento |

### 3.3 Canais digitais para o cliente final

| Solução | Funções |
|---|---|
| **Portal do Associado / Área do Cliente** | Serviços e informações do plano contratado para o associado, de forma on-line |
| **Venda WEB** | Venda de planos pela internet; cálculo de dependente extra; pagamento por cartão de crédito ou boleto |
| **ChatBot MS Sistemas** | Atendimento automatizado; chatbot modelo acessível por WhatsApp e QR Code |
| **Condolência Online** | Envio de condolências às famílias pela internet |
| **SMS Marketing** | Boas-vindas, acompanhamento de tarefas, aniversariantes e parcelas em débito; shortcode; descrito como aprovado pela Anatel; implantação gratuita para clientes ativos |

### 3.4 Soluções para o espaço físico

| Solução | Funções |
|---|---|
| **Totem Auto Atendimento** | Terminal ligado ao sistema de planos, no mesmo banco de dados, com o mesmo fluxo do balcão |
| **Totem Cemitério** | Localiza o jazigo pelo nome do falecido e indica como chegar; memorial com descrição e fotos |
| **QrCode Cemitério** | QR Code na lápide dá acesso ao histórico de vida do falecido |
| **Painel de Velório** | Transforma TV LCD em painel (recepção e sala velatória): início e término do velório, horário e local do sepultamento, homenagem em vídeo ou fotos |

### 3.5 Gestão e indicadores

| Solução | Funções |
|---|---|
| **Dashboard** | Receitas, despesas, vendas e inadimplência on-line, por tablet, smartphone ou notebook |

---

## 4. Mapa do site

```text
/site/
├── Home (página única com âncoras)
│   ├── #hero         Carrossel com 6 destaques
│   ├── #solucoes     "Simplifique sua gestão": 8 soluções
│   ├── #servicos0    Novidades: 8 itens sobre vídeo de fundo
│   ├── #empresa      História, missão, visão, valores
│   ├── #comunicados  Aviso de atendimento + mapa
│   ├── #demos        Veja mais: 6 demonstrações
│   ├── #telefones    Telefones de plantão
│   └── #contato      Endereço, e-mails, telefones, formulário
├── /solucoes/                Grade com as 24 soluções
│   └── /solucoes/{slug}/     Páginas de solução
├── /destaques/{slug}/        5 soluções com URL diferente das demais
├── /equipe/                  Lista da equipe
│   └── /equipe/{nome}/       Página individual
├── /empresa/                 Institucional (fora do menu)
├── /downloads/{slug}/        8 ferramentas (/downloads/ retorna 403)
├── /clientes/                3 listas regionais (sem link no menu)
└── Sistemas externos com login
    ├── suporte.mssistemas.com.br           MS Suporte / Área do Cliente
    ├── apps.mssistemas.com.br/areacliente  Portal do Associado
    └── indicadores.mssistemas.com.br       MS Dashboard
```

### Conteúdo publicado no WordPress

| Tipo | Quantidade |
|---|---|
| Posts | 50 |
| Páginas | 3 (`empresa`, `api_fm_mssistemas`, `pagina-exemplo`) |
| Arquivos de mídia | 46 |
| Vídeos do YouTube em páginas de solução | 10, em 9 soluções |

### Downloads

| Ferramenta | Situação encontrada |
|---|---|
| MS Suporte | Sem link público: "Entre em contato com um consultor" |
| MS Conexão RDP | Sem link público: "Entre em contato com um consultor" |
| Ultra VNC | **Quebrado:** o link aponta para uma imagem PNG que retorna 404 |
| TeamViewer | Link para o instalador oficial |
| .NET Framework | Link `http` para a versão 4.0, muito antiga |
| Ammy | Link para o site do fabricante. Vale reavaliar: ferramenta antiga, que costuma ser bloqueada por antivírus |
| AnyDesk | Link oficial, mas com o nome escrito "AnnyDesk" |
| Skype | **Obsoleto:** a Microsoft encerrou o Skype em maio de 2025 |

---

## 5. Funcionalidades do site

| Função | Onde | Situação |
|---|---|---|
| Menu fixo no topo | Todas as páginas | Funciona |
| Menu lateral no celular | Todas as páginas | Funciona |
| Carrossel de destaques | Home | Funciona; troca a cada 10 segundos |
| Rolagem por âncoras | Home | Funciona |
| Animações ao rolar (AOS) | Home | Funciona |
| Botão "voltar ao topo" | Todas as páginas | Funciona |
| Vídeo de fundo do YouTube | Home, Novidades | Incorporado; reprodução não confirmada |
| Mapa do Google | Home | Funciona |
| Formulário de contato com soma anti-spam | Todas as páginas | **Envio não testado** |
| Exibição do IP do visitante | Topo | Funciona, mas não tem utilidade |
| Links para WhatsApp da equipe | Equipe | Disponível para parte da equipe |
| Downloads | `/downloads/` | Parcial (ver seção 4) |
| Busca do WordPress | `/?s=termo` | Responde, mas não há campo de busca visível |
| Chat on-line JivoChat | Home | **Desativado:** código comentado no HTML |
| Links úteis do rodapé | Rodapé | **Ocultos** por CSS |
| Login do suporte | Sistema externo | Tem também "Nova solicitação" sem login |
| Login do Portal do Associado | Sistema externo | Tem identidade visual própria |
| Login do MS Dashboard | Sistema externo | Tem identidade visual própria |

---

## 6. Identidade visual atual

| Elemento | Valor |
|---|---|
| Logo | Globo terrestre com as letras "MS" em azul |
| Azul principal | `#428BCA` |
| Azuis de apoio | `#1C5C93`, `#9ECCF4`, `#5C768D`, `#1F3548` |
| Verde dos botões do topo | `rgb(82, 185, 109)` |
| Marrom/dourado do CTA | `rgb(152, 104, 6)` |
| Amarelo-limão de destaque | `rgb(216, 255, 0)` |
| Títulos | Raleway |
| Texto | Open Sans |
| Template base | Mamba v2.0.1 (BootstrapMade, gratuito) |

### Avaliação visual

- **Pontos positivos:** a grade de soluções com ícones é fácil de ler, a seção Novidades tem bom contraste de fundo, e as fotos reais da equipe transmitem proximidade.
- **Cores sem hierarquia:** azul, verde, marrom e amarelo-limão competem entre si, e nenhum botão se destaca como ação principal.
- **Fotos genéricas:** o carrossel mostra um escritório de banco de imagens, sem relação com o setor.
- **Tom pouco adequado:** o amarelo-limão e os fundos geométricos destoam da seriedade que o setor funerário pede.
- **Identidades diferentes:** o site e os três sistemas com login parecem produtos de empresas distintas.
- **Página longa:** a home tem cerca de 6.200 px no desktop e 11.600 px no celular.

---

## 7. Análise técnica

| Item | Encontrado | Impacto |
|---|---|---|
| CMS | WordPress 5.5.24 | Versão muito antiga |
| PHP | 7.4.33 | Sem suporte de segurança desde novembro de 2022 |
| Front-end | Bootstrap 4.4.1, jQuery 3.4.1 | Bootstrap 4 fora de suporte |
| Hospedagem | Hostinger, servidor LiteSpeed | Confirmar o plano contratado |
| Analytics | `UA-XXXXXXXX-XX`, `yourdomain.com` | **Nenhum dado é coletado** |
| Sitemap / robots.txt | 404 | Prejudica a indexação |
| Meta description | Igual em todas as páginas: "& Consultoria e Sistemas" | Resultado ruim no Google |
| H1 da home | Nenhum | Prejudica o SEO |
| Canonical, Open Graph, dados estruturados | Ausentes | Compartilhamentos sem prévia; URLs podem competir entre si |
| Texto alternativo | 14 de 14 imagens da home sem `alt` | Acessibilidade e SEO |
| Área de toque no celular | 37 de 49 links e botões com menos de 44 px | Dificulta o uso |
| Rolagem horizontal no celular | Não há | Ponto positivo |
| Carregamento da home | ~2,0 s, 54 recursos, ~2,4 MB (uma medição) | Aceitável, mas pesado |
| Maior arquivo | Fonte de ícones `icofont.woff2`, 525 KB | Fácil de eliminar |
| Cabeçalhos de segurança | Sem HSTS, X-Frame-Options, X-Content-Type-Options e Referrer-Policy | Proteção reduzida |

### Pontos de segurança para corrigir já no site atual

Estes itens não dependem do site novo:

1. **`/site/wp-pages/forms/contact.php` mostra erros de PHP** a quem abre o endereço direto, inclusive o caminho interno do servidor.
2. **O PHP 7.4 e o WordPress 5.5 estão desatualizados** e não recebem correções.
3. **`/wp-login.php` está exposto** no endereço padrão.
4. **Páginas de teste estão públicas:** `/pagina-exemplo/` e `/api_fm_mssistemas/`.

### Instabilidade observada

Em uma verificação com 6 requisições simultâneas, 9 URLs retornaram erro 500. Repetidas uma a uma, 8 responderam normalmente e `/contato/` retornou 404. Isso **pode** indicar limite da hospedagem sob carga, mas não é uma confirmação.

---

## 8. Problemas encontrados

### 8.1 Conversão

- Não há CTA de demonstração ou orçamento.
- Os botões são genéricos: "Saiba mais" e "Conheça todas as nossas soluções".
- As páginas de solução não têm chamada específica para contato.
- O formulário não pergunta empresa, segmento, cidade ou telefone.
- Não há botão de WhatsApp comercial.
- Faltam depoimentos, logos de clientes, números e casos de sucesso.
- O texto afirma que a empresa é "líder no setor", sem evidências.

### 8.2 Navegação e arquitetura

- As páginas de solução abrem com a grade de 24 soluções antes do conteúdo.
- "Downloads" no menu leva direto para a página do MS Suporte.
- `/contato/` retorna 404 e `/downloads/` retorna 403.
- As soluções não estão agrupadas por segmento, e o visitante precisa procurar em 24 itens.
- As URLs são inconsistentes: 5 soluções ficam em `/destaques/` e as outras em `/solucoes/`.
- "Área do Cliente" e "Portal do Associado" são nomes confusos: o botão do topo leva ao suporte, enquanto o Portal do Associado é outro sistema.

### 8.3 Conteúdo duplicado ou sobrando

- Existem posts soltos: `SMS` (duplica SMS Marketing), `MS Sistemas – DASHBOARD Online` (duplica Dashboard), um post sem título (`/sem-categoria/526/`) e `Comunicado HOME`.
- A home tem soluções repetidas em Soluções, Novidades e Veja mais.
- "Novidades" mostra soluções publicadas entre 2020 e 2023, portanto não são novidades.
- O HTML ainda contém um menu "Suporte" oculto com itens de teste ("Drop Down 2", "Deep Drop Down 1 a 5").

### 8.4 Dados inconsistentes

- Há dois domínios de e-mail: `.inf.br` e `.com.br`.
- O número (14) 99131-0868 aparece duas vezes na lista de plantão.
- O celular de Bill aparece como (14) **96678**-0173 na Equipe e (14) **99678**-0173 no plantão.
- A equipe ainda divulga contatos de Skype, serviço encerrado.
- O link "MS Indicadores" do rodapé está sem texto clicável, embora a seção esteja oculta.

### 8.5 Erros de texto

| Onde | Atual | Correto |
|---|---|---|
| Veja mais, QrCode | manteha | mantenha |
| Visão | menor custo benefício | melhor custo-benefício |
| Venda WEB | o opção | a opção |
| SMS Marketing | seus cliente | seus clientes |
| CRM | gerênciar / voce / inadimpência | gerenciar / você / inadimplência |
| Frota | gerênciar | gerenciar |
| Funerárias, Crematórios | estoque de matérias | estoque de materiais |
| Filiais | tranqüilidade | tranquilidade |
| MS Suporte | 320 KBMB | 320 KB |
| Downloads | AnnyDesk / Ammy | AnyDesk / Ammyy |
| Equipe, Simone | Sky: | Skype: |
| Equipe, Leandro | leandro @mssistemas | leandro@mssistemas |
| Clientes, GO | Luziana | Luziânia |
| Clientes, SP | Martinóplis, Jurinu | Martinópolis, Jarinu (já listada) |

**Cidades a revisar na lista de clientes:**
- Cáceres e Nova Mutum estão em Mato Grosso do Sul, mas ficam em Mato Grosso.
- Catalão está em Minas Gerais, mas fica em Goiás.
- Sobradinho está em Goiás, mas fica no Distrito Federal.
- Embu-Guaçu aparece duas vezes.
- Augusto Franco e Bugio são bairros de Aracaju.

### 8.6 LGPD

- Não encontrei política de privacidade nem aviso de cookies.
- O formulário coleta dados pessoais sem informar a finalidade.
- E-mails e celulares individuais da equipe estão públicos.

---

## 9. O que manter, mudar e criar

| Manter | Mudar | Criar |
|---|---|---|
| Logo (ou uma evolução dele) | Layout e hierarquia visual | CTA "Solicitar demonstração" |
| Todo o catálogo de funções | Organização das soluções por segmento | Páginas por segmento |
| Vídeos de demonstração | Fotos genéricas | Mapa de clientes com números reais |
| Fotos reais da equipe | Textos, com revisão completa | Depoimentos e casos de sucesso |
| Acesso rápido ao suporte | Nomes dos acessos com login | Central "Acessar sistemas" |
| Telefones de plantão | Área de downloads | Política de privacidade e cookies |
| História, missão e valores | Página de empresa | Analytics e medição de conversão |

---

## 10. Proposta de estrutura do novo site

```text
Home
Soluções
├── Planos Funerários
├── Funerárias
├── Cemitérios
├── Crematórios
├── Clínicas
└── Módulos e canais digitais
    ├── Gestão: Financeiro, Filiais, Frota, Equipamentos, CRM, Ambulâncias, Dashboard
    ├── Campo: Cobrança Móvel, Venda com Tablet, P.O.S
    ├── Cliente final: Portal, Venda WEB, ChatBot, Condolência Online, SMS
    └── Presencial: Totens, QR Code, Painel de Velório
Clientes (mapa, números, depoimentos)
Empresa (história, equipe, missão, visão e valores)
Conteúdos (novidades e artigos)
Suporte (telefones, plantão, downloads, abertura de chamado)
Contato / Solicitar demonstração
Acessar sistemas (Suporte, Portal do Associado, Dashboard)
Política de privacidade
```

### Fluxo sugerido para a home

1. Proposta de valor clara para o setor, com CTA de demonstração
2. Números reais: anos de mercado, estados e cidades atendidas
3. Escolha do segmento: "Sua empresa é..."
4. Principais módulos e como se integram
5. Demonstração em vídeo
6. Mapa de atuação e depoimentos
7. Diferenciais do suporte, incluindo o plantão
8. CTA final com formulário curto

### Prioridades

| Prioridade | Itens |
|---|---|
| **Essencial** | Home, páginas de segmento e de solução, formulário de demonstração, acesso aos sistemas, suporte, redirecionamentos, SEO técnico, LGPD, analytics |
| **Importante** | Mapa de clientes, depoimentos, WhatsApp comercial, downloads revisados |
| **Depois** | Blog, materiais para download, comparador de módulos |

### Redirecionamentos obrigatórios

Para não perder o histórico no Google, as URLs antigas devem apontar para as novas com redirecionamento 301:

| Origem | Destino sugerido |
|---|---|
| `/site/` | `/` |
| `/site/destaques/administracao-de-planos-funerarios/` | `/solucoes/planos-funerarios` |
| `/site/destaques/administracao-de-funerarias/` | `/solucoes/funerarias` |
| `/site/destaques/administracao-de-cemiterios/` | `/solucoes/cemiterios` |
| `/site/solucoes/adm-de-crematorios/` | `/solucoes/crematorios` |
| `/site/solucoes/{slug}/` | Página equivalente do novo site |
| `/site/equipe/` | `/empresa#equipe` |
| `/site/empresa/` | `/empresa` |
| `/site/downloads/{slug}/` | `/suporte#downloads` |
| `/site/clientes/{regiao}/` | `/clientes` |

---

## 11. Decisões e materiais pendentes

**A empresa precisa definir:**

1. Qual é o público prioritário: novos clientes, clientes atuais ou ambos?
2. A solução para clínicas continua sendo oferecida?
3. Qual domínio de e-mail é o oficial: `.com.br` ou `.inf.br`?
4. Quais telefones e contatos da equipe devem continuar públicos?
5. Quais ferramentas de acesso remoto continuam em uso?
6. O logo será mantido ou atualizado?
7. Para onde devem ir os pedidos de demonstração: e-mail, WhatsApp ou CRM?

**Materiais necessários:**

- Logo em alta qualidade (SVG, de preferência)
- Fotos reais da empresa, da equipe e dos produtos em uso
- Telas atualizadas dos sistemas
- Depoimentos e logos de clientes, com autorização
- Números atualizados: clientes ativos, cidades, estados
- Lista revisada das cidades atendidas
- Confirmação de que todas as funções deste documento continuam vigentes

---

## 12. Como a análise foi feita e seus limites

**O que foi verificado:**
- Conteúdo de todos os 50 posts e 3 páginas, lido pela API pública do WordPress
- Situação de 151 URLs internas e externas
- Home em desktop (1366 px) e celular (375 px)
- Amostras visuais das páginas de soluções, equipe, solução individual e downloads
- Telas de login dos três sistemas externos, sem entrar neles
- Código da home, CSS, scripts e cabeçalhos do servidor

**O que não foi verificado:**
- **Envio do formulário:** não enviei mensagens para não gerar contatos falsos à empresa.
- **Sistemas internos:** exigem login, então as funções listadas vêm das descrições do site, e não do uso dos produtos.
- **Conteúdo dos vídeos:** identifiquei os links, mas não assisti aos vídeos.
- **Visual de todas as páginas:** as páginas seguem o mesmo modelo, e vi uma amostra.
- **Tablet e outros navegadores:** não foram testados.
- **Posição no Google e tráfego:** não há dados de analytics disponíveis.
- **Testes de invasão:** não foram feitos. Os pontos de segurança vêm de observação passiva.

### Correções em relação à análise inicial

| O que foi dito antes | O que a análise completa mostrou |
|---|---|
| Seções "Simplifique sua gestão" e "Novidades" pareciam vazias | Têm conteúdo; só apareciam em branco na captura, por causa da animação de rolagem |
| A seção "Localização" estava vazia | Ela exibe um mapa do Google |
| Itens "Drop Down" apareciam no menu | Existem apenas no código, ocultos para o visitante |
