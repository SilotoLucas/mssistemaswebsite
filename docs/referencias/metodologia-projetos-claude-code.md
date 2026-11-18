# Metodologia de estruturação de projetos para Claude Code

> Extraído por análise profunda do repositório [vanzi](https://github.com/vanziapp/vanzi) (monorepo Bun,
> TypeScript, arquitetura hexagonal, multi-inquilino). Este documento **não é sobre o domínio do Vanzi**
> (transporte escolar): é a metodologia de engenharia por trás dele, generalizada para ser colada no
> início de qualquer conversa com o Claude Code ao começar um projeto novo.
>
> Use como prompt-base: cole a seção 12 (ou o documento inteiro) na primeira mensagem, adapte o que
> estiver entre `<colchetes>` para o domínio real, e deixe o Claude Code aplicar o resto.

---

## 0. A ideia central

A maioria dos repositórios "bem arquitetados" depende de disciplina humana para não apodrecer: uma
convenção no README que ninguém relê na semana 3. O Vanzi resolve isso de um jeito específico, que vale
a pena copiar:

**Toda regra de arquitetura que importa é imposta por uma ferramenta, não por uma frase em prosa.**

Se a regra é "domínio não importa nada", existe um `dependency-cruiser` que quebra o build quando alguém
importa. Se a regra é "todo caso de uso tem teste", existe um `coverage-map.ts` que cobra isso. Se a regra
é "sem `throw` em domínio", existe uma regra de lint. Documentação em markdown (`AGENTS.md`,
`docs/decisoes.md`) explica o **porquê**; a ferramenta garante o **quê**. Quando os dois divergem, a
ferramenta vence, porque só ela roda toda vez.

Consequência prática para um agente como o Claude Code: **ele nunca precisa "lembrar" de uma regra
arquitetural entre sessões**, porque violar a regra faz um comando falhar imediatamente com uma mensagem
que já diz o que fazer. Isso é o que faz esse estilo escalar bem com agentes: menos "não esqueça de X",
mais "rode o gate e ele te avisa".

---

## 1. Princípios que valem para qualquer projeto novo

1. **Arquitetura em camadas com regra de importação em uma única direção**, verificada por ferramenta
   (não por convenção). Ver seção 2.
2. **Portas (interfaces) só nascem quando pagam uma de três contas**: existe ou existirá um segundo
   implementador real, um teste unitário sem I/O depende dela, ou a fronteira já está declarada em
   documento de arquitetura. Fora disso, chame a função concreta. Isso evita a "sopa de interfaces" que
   um agente tende a produzir por reflexo de "boas práticas".
3. **Todo gate de qualidade emite uma violação por linha**, em formato fixo e parseável, com **fato** e
   **ação corretiva**, nunca só "está errado". Ver seção 6.
4. **Dois modos de gate**: um rápido (segundos, roda a cada iteração) e um completo (até ~90s, roda antes
   de propor commit). Um gate que demora mais que isso por iteração é um gate que o agente (e o humano)
   param de rodar.
5. **Nada de valor mágico escrito à mão** onde existe um sistema de tokens/config: cor, espaçamento,
   tamanho de fonte, feature flag, etc. sempre vêm de uma fonte única.
6. **Erros de domínio são dados, não exceções.** `Result<Ok, Err>` (ou equivalente) em vez de `throw` nas
   camadas de domínio e aplicação. Tradução para HTTP/status acontece só na borda, com teste de
   exaustividade (todo código de erro precisa ter uma entrada no mapa, senão o compilador reclama).
7. **Cada regra de gate nasce com um fixture que a viola e um teste que prova que o script encontra
   exatamente aquela violação.** Sem isso, "nenhuma violação encontrada" é indistinguível de "o glob está
   errado e o gate não roda nada".
8. **Versões de dependência fixas (sem `^`, sem `latest`)**, cada uma com uma linha dizendo o motivo da
   escolha e o que foi descartado. Evita deriva silenciosa e dá contexto para o agente não "atualizar" às
   cegas.
9. **Documentação viva versionada no próprio repo**, nunca em ferramenta externa: um documento de decisões
   (o quê foi decidido e quando, com o motivo) e um documento de arquitetura (estrutura de pastas, matriz
   de importação, catálogo de portas). Sem link externo como fonte da verdade.

---

## 2. Arquitetura em camadas

Modelo hexagonal (portas e adaptadores) com uma variação: as **portas são declaradas pelo consumidor**,
não pelo implementador. Se você está escrevendo a interface depois do adaptador concreto, parou no lugar
errado.

Camadas típicas, da mais pura para a mais suja (adaptar nomes ao domínio real):

| Camada | Papel | Pode importar | Não pode importar |
|---|---|---|---|
| `domain` | Entidades, value objects, invariantes, `Result`, erros. **Zero dependência**, nem de npm. | nada | tudo |
| `application` | Casos de uso + **as portas** (interfaces). | `domain` | frameworks, `infra`, formato de rede (`contracts`) |
| `contracts` (opcional) | Schemas de request/response, DTOs, fonte única do contrato de rede. | biblioteca de schema (ex.: typebox/zod) | `application`, `infra`, framework de servidor |
| `infra` | Implementa as portas: ORM, HTTP client, storage, fila. Único lugar com as libs "sujas". | `domain`, `application` | nada acima |
| `apps/api` (ou similar) | Composition root + adaptador HTTP. Único lugar com o framework de servidor. | tudo | — |
| `apps/web` | UI. Fala com portas (`HttpClient`, `Store`), nunca com `fetch`/`localStorage` direto. | `contracts`, `domain` (regra pura), design system | arquivo interno de outra feature |

Regras derivadas que valem a pena impor com ferramenta desde o dia 1:

- `domain` nunca importa nada de npm (nem em `dependencies`, nem via import direto — o linker de
  workspace geralmente resolve mesmo sem declaração, então o `package.json` vazio sozinho **não** prova
  nada; precisa de um checker estático tipo `dependency-cruiser`).
- Globais não determinísticos banidos em `domain`: `Date`, `Math.random`, `fetch`, `process`, `crypto`,
  `setTimeout`/`setInterval`, `localStorage`. Tempo entra como valor (`Instant`/epoch), não lido do
  relógio. Globais determinísticos (`Intl`, `structuredClone`) são permitidos.
- `application` não conhece o formato de rede: mapear wire → domínio é responsabilidade da borda HTTP.
- O framework de servidor (Express/Elysia/Fastify/etc.) só resolve dentro de `apps/api/src/http/**` (ou
  equivalente). Em qualquer outro lugar é violação de arquitetura.
- ORM e driver de banco só resolvem dentro de `infra/db/**`.
- `packages/*` nunca importa de `apps/*` (dependência reversa quebra o grafo em silêncio).
- Uma feature de front nunca importa arquivo interno de outra feature — só via `index.ts`/barrel ou
  camada `shared`.
- Sem ciclo de dependência, sem módulo órfão (que ninguém importa e não é ponto de entrada).

**Ferramenta recomendada:** `dependency-cruiser` com uma lista de regras `forbidden`, cada uma com
`comment` explicando o motivo e o destino correto. Rodar sob `tsPreCompilationDeps: true` para pegar
`import type` de terceiro também.

### Regra de portas

- Um arquivo de porta exporta só `interface`/`type`, nunca um valor (função, classe, const).
- Porta declarada com propriedades de função (`readonly foo: (x) => y`), nunca método de classe/interface
  (método tem parâmetro bivariante em TS mesmo com `strictFunctionTypes` ligado — deixa passar adaptador
  incompatível).
- Nada de `Repository<T>` genérico. Uma porta por agregado, com só os métodos que algum caso de uso chama
  de fato.
- Se o projeto for multi-tenant: nenhuma porta recebe um id de tenant como parâmetro solto. Use um "escopo"
  opaco (branded type) que só um `ScopeRunner` sabe construir — esquecer de aplicar o escopo vira erro de
  compilação, não bug de produção.

---

## 3. Estrutura de monorepo

Um `.git` único na raiz (repositórios "pasta agrupadora" sem git na raiz quebram grafo de dependência,
CI e ferramentas de "rodar só o que mudou"). Workspaces do gerenciador de pacote (`bun workspaces`, `pnpm
workspaces`, etc.) para `apps/*`, `packages/*`, `tools/*`.

```
apps/
  api/              composition root + HTTP
  web/              front
tools/
  quality/          gates próprios (ver seção 6)
  db/                provisionamento, migration, seed (se houver banco)
docs/
  arquitetura.md    estrutura de pastas, matriz de importação, catálogo de portas
  decisoes.md       o que foi decidido, quando, e por quê
  plano-produto.md  contexto de negócio (se relevante)
.claude/
  rules/            regras de camada, carregadas por path (ver seção 8)
  skills/           procedimentos recorrentes como skill, não como regra solta
```

Dentro de cada pacote: `src/index.ts` como único ponto de entrada exportado, `exports` do
`package.json` apontando pro fonte (sem pré-build de pacote interno, se o monorepo é pequeno o
suficiente para não precisar).

Convenção de nomes de arquivo verificada por ferramenta (ex.: `ls-lint`): `kebab-case.ts` em todo lugar,
migrations SQL com prefixo numérico (`0007_nome.sql`).

---

## 4. Convenções de nomenclatura e formatação

- Formatter + linter únicos por linguagem (ex.: Biome para TS/JS — cobre formatação e lint junto, sem
  duas ferramentas discordando).
- Complexidade cognitiva máxima por função, com número explícito (ex.: 15), o gate reprova acima disso.
- `noExplicitAny`, `noNonNullAssertion` como erro.
- Aspas simples, ponto e vírgula automático (`asNeeded`), trailing comma — escolha uma convenção e trave
  no formatter, nunca em code review manual.
- **Zero comentário em código por padrão.** Só entra com justificativa (ex.: lista de exceção versionada
  tipo `comment-allowlist.json`), porque comentário que explica "o quê" apodrece e agente tende a gerar
  em excesso.
- Nomes de identificador carregam o tipo/unidade quando ambíguo (ex.: `occurredAtMs` em vez de
  `occurredAt` se pudesse ser confundido com Date).

---

## 5. Sistema de portas e adaptadores (resumo prático)

Ordem de nascimento de uma feature nova, do mais barato para o mais caro de testar — **do primeiro ao
quinto passo nada depende de banco, framework ou infraestrutura**, então o ciclo de erro fecha em
milissegundos:

```
1  contracts/<contexto>/...              o contrato primeiro (o que a tela precisa)
2  domain/<agregado>/...                 invariante + teste unitário irmão
3  application/ports/<contexto>.ts       a porta, escrita pelo CONSUMIDOR
4  application/use-cases/<contexto>/<acao>/<acao>.use-case.ts
5  .../<acao>.unit.test.ts               fakes em memória, milissegundos
6  infra/db/schema + migration           (se houver persistência)
7  infra/repositories/<agregado>.repository.ts
8  apps/api/http/routes/<contexto>/...   + teste de ponta a ponta contra infra real
9  apps/api/composition/...              uma linha ligando tudo
10 apps/web/features/<contexto>/         hook de query, tela
```

Regra de criação de abstração (repetir sempre que o agente for tentado a criar uma interface nova):
> Uma porta só entra quando paga uma de três contas: existe ou existirá um segundo implementador real,
> um teste unitário sem I/O depende dela, ou a fronteira de troca já está declarada em documento de
> arquitetura. Fora disso, chame a função concreta.

---

## 6. Gates de qualidade automatizados

Este é o núcleo prático do método. Um orquestrador (`tools/quality/validate.ts` ou similar) roda fases em
paralelo com teto de concorrência, cada fase é uma ferramenta ou um script próprio:

| Fase | Exemplo de ferramenta | Barreira? |
|---|---|---|
| higiene | detector de segredo (gitleaks), nome de arquivo (ls-lint) | não |
| arquitetura | `dependency-cruiser`, checagens próprias (ex.: RLS, comentário) | não |
| **tipos** | `tsc --build` | **sim — se falhar, nada abaixo roda** |
| fronteira e estilo | linter/formatter, `dependency-cruiser` de novo | não |
| testes e sobra | test runner, código morto (`knip`), duplicação (`jscpd`), cobertura mapeada por evidência de teste | não |

Pontos importantes desse design:

- **`tsc` é barreira.** Se os tipos não fecham, nenhuma fase seguinte roda, porque toda violação
  encontrada depois seria consequência do mesmo erro raiz — evita o agente perseguir sintoma em vez de
  causa.
- **Dois modos**: `validate:quick` (só as fases baratas, alvo <10s, roda a cada iteração do agente) e
  `validate` (tudo, incluindo testes e2e/cobertura/duplicação, alvo <90s, roda antes de propor commit).
- **Formato de violação único e parseável**, em todo gate próprio:
  ```
  <caminho>:<linha>:<coluna>: error <ferramenta>(<regra>): <fato> fix: <ação corretiva imperativa>
  ```
  Com `--json` opcional, ordem determinística (por arquivo, linha, coluna, regra), e a distinção crítica
  de **exit code**:
  - `exit 0` → limpo
  - `exit 1` → violação de código (o agente deve consertar o código)
  - `exit 2` → ferramenta quebrada (config inválida, binário ausente — o agente deve consertar a
    ferramenta, **não** tentar "consertar" código que não tem nada de errado)
- **Toda regra de gate nasce com um fixture que a viola** em `tools/quality/fixtures/`, mais um teste que
  afirma que o script acha exatamente aquela violação. Sem isso um glob errado deixa o repositório "verde"
  por acidente, permanentemente.
- Saída agregada em `.reports/validate.json` para comparar duas rodadas sem reexecutar nada.
- Relatório ao humano/dono: **uma linha por dimensão reprovada com o número de violações**, nunca a saída
  bruta colada inteira.

Checklist mínimo de ferramentas por linguagem (adaptar ao stack real):

- **Lint + format**: Biome (TS/JS) ou equivalente — uma ferramenta, não duas discordando.
- **Fronteira de módulo**: `dependency-cruiser` (Node/TS) ou equivalente por linguagem.
- **Nome de arquivo**: `ls-lint`.
- **Duplicação de código**: `jscpd` com `--exitCode 1` (sem a flag, sai 0 mesmo achando clone — vira
  decorativo).
- **Código morto**: `knip` (substitui `ts-prune`/`depcheck`).
- **Segredo**: `gitleaks`, rodando no pre-commit sobre staged files.
- **Git hooks**: `lefthook` (YAML simples, substitui husky + lint-staged).

---

## 7. Testes

- **No máximo dois sufixos**, e nenhum outro: `*.unit.test.ts` (zero I/O, fakes em memória) e
  `*.e2e.test.ts` (infraestrutura real — banco real, etc., sempre). Um arquivo chamado "e2e" que roda em
  memória não prova nada sobre SQL/constraint/transação e o nome mente.
- Todo caso de uso tem teste unitário irmão cobrindo: caminho feliz, negativa de autorização, cada erro
  de domínio que ele pode devolver.
- Toda rota HTTP aparece literalmente em algum teste e2e.
- Se multi-tenant: todo teste e2e prova isolamento com **dois inquilinos** — o segundo sempre recebe
  404 (nunca 403: 403 confirma que o objeto existe).
- Teste positivo de isolamento não prova nada (passa até com a política desligada). O que prova é o
  **negativo** (leitura cruzada volta vazia, nunca erro) e o **estrutural** (lido direto do catálogo do
  banco, não confiando na aplicação).
- Nome do teste descreve o cenário inteiro, incluindo o "porquê" quando não é óbvio.
- Nunca `skip`. Nunca remover uma assertion para o teste passar — antes de tocar num teste que falhou,
  entender por que ele falhou.
- Meta de cobertura no domínio: 100% linha / 95% branch — é lógica pura sem I/O, não há desculpa.

---

## 8. Configuração do Claude Code no repositório

Estrutura que funciona bem com agente:

```
AGENTS.md              o "o quê": comandos, camadas, proibições, ordem de criação de feature
CLAUDE.md              @AGENTS.md + só o que é específico do Claude Code
.claude/
  rules/
    <camada>.md         frontmatter `paths:` — só entra no contexto quando o agente abre
                         um arquivo daquela camada. Evita carregar regra irrelevante sempre.
  skills/
    <procedimento>/
      SKILL.md          procedimento recorrente vira skill, não regra solta em prosa
  hooks.proposto.json    hooks PROPOSTOS, não instalados — instalar hook é ato do dono humano,
                         nunca decisão unilateral do agente
```

Pontos que valem a pena copiar literalmente:

- **`AGENTS.md` é o dono do conteúdo; `CLAUDE.md` só referencia com `@AGENTS.md`** e acrescenta o que é
  exclusivo do Claude Code (nº máximo de subagentes simultâneos, diretórios com dono único onde não se
  deve rodar subagente em paralelo, onde estão os hooks propostos).
- **Regras de camada carregam via `paths:` no frontmatter**, então só entram no contexto quando o agente
  já está mexendo naquele diretório — mantém o prompt enxuto sem perder a regra na hora que importa.
- **Procedimento que se repete vira skill** (`/gate`, `/new-usecase`, `/new-aggregate`, `/migration` no
  Vanzi), não uma lista de passos reescrita em prosa toda vez.
- **Hooks ficam propostos até o dono instalar de propósito.** Um hook `PreToolUse` pode bloquear comando
  proibido (ex.: `npm`/`yarn` num projeto que só usa um gerenciador), um `PostToolUse` pode rodar
  formatter automático no arquivo tocado, um `Stop` pode rodar o gate rápido a cada fim de turno — mas
  nunca o gate completo num hook de `Stop` (90s a cada fim de turno vira laço queimando CPU).
- Seção "armadilhas que já custaram tempo aqui" no `AGENTS.md`: uma lista curta e crescente de
  pegadinhas reais do projeto (comportamento contra-intuitivo de uma lib, ordem de columns que a
  ferramenta X exige) — mais barato que redescobrir.
- Seção "nunca" explícita e literal: lista curta do que nunca fazer, sem meio-termo (ex.: "nunca
  `--no-verify`", "nunca remover assertion para passar teste", "nunca comentário sem entrada na
  allowlist").

---

## 9. Segurança e (se aplicável) multi-tenancy

Se o projeto novo for multi-inquilino (SaaS B2B, multi-empresa, etc.), o padrão do Vanzi vale a pena
copiar quase literal:

- `tenant_id` **nunca** é parâmetro de porta, nem vem de body/query/header/subdomínio. É fato de banco:
  `DEFAULT` derivado de uma variável de sessão (`current_setting`), preenchido pelo próprio banco, nunca
  nomeado pela aplicação em um INSERT.
- Toda tabela de inquilino: `ENABLE ROW LEVEL SECURITY` + `FORCE ROW LEVEL SECURITY` (FORCE alcança até o
  dono da tabela — sem isso, seed de teste com o role dono "vaza" silenciosamente pela política).
- Chave primária `(tenant_id, id)`; todo índice `UNIQUE` começa por `tenant_id` (verificação de unicidade
  ignora RLS por design — sem isso, `ON CONFLICT` vira oráculo que confirma existência de linha de outro
  inquilino).
- Um único ponto adquire conexão e seta o contexto de sessão por transação, sempre resetando ao devolver
  ao pool (`SET LOCAL`/terceiro argumento `true` equivalente — sem isso o valor sobrevive à transação e
  vaza pra próxima requisição do mesmo pool).
- Objeto de outro inquilino sempre responde **404**, nunca 403.
- Erro de banco nunca chega cru ao cliente (nome de tabela e valor vazam na mensagem nativa) — vira 500
  opaco, log redigido.
- Papel de banco separado por privilégio, não por lista de exceção editável: um papel para tabela de
  identidade (login, sessão — o caminho por onde o inquilino é descoberto não pode depender do inquilino
  já estar setado), outro para tabela de inquilino, nenhum dos dois alcança o do outro.

---

## 10. Documentação viva

Dois documentos, mantidos no próprio repo, versionados junto do código:

- **`docs/decisoes.md`**: uma entrada por decisão de arquitetura relevante, numerada, com o **motivo** e
  o que foi descartado. Serve de memória para o agente não reabrir debate já fechado nem "otimizar" algo
  que foi escolhido de propósito contra a opção óbvia.
- **`docs/arquitetura.md`**: árvore de pastas final, matriz de importação (linha importa coluna, sim/não
  por camada), catálogo de portas (assinatura essencial, adaptador inicial, alternativa prevista),
  versões exatas de dependência com motivo. É o documento que um agente lê uma vez no início de uma
  sessão longa para não ter que redescobrir a topologia do repo por grep.

Convenção: **todo material de contexto do projeto é markdown no repositório**. Sem documento hospedado
fora, sem link externo como fonte da verdade — o agente (e o time) não têm como ficar defasado do que
está versionado junto do código.

---

## 11. Commits e fluxo de trabalho

- Formato de commit fixo e simples: `tipo: descrição`, idioma consistente, sem `Co-Authored-By` se o time
  não usa.
- Stage arquivo a arquivo, nunca `git add -A`/`git add .` cego.
- Gate completo (`validate`) fecha verde **antes** de propor um commit — nunca depois.
- `pre-commit`: detector de segredo + nome de arquivo + formatter sobre staged files (rápido).
- `pre-push`: gate completo.
- Nunca pular hook (`--no-verify`) para "resolver" uma falha — investigar a causa raiz.

---

## 12. Prompt pronto para colar no Claude Code ao iniciar um projeto novo

```
Vamos estruturar um projeto novo do zero: <descrever o domínio/produto em 2-3 frases>.

Stack: <linguagem/runtime, framework de servidor, framework de front, banco>.

Quero aplicar a metodologia abaixo, adaptando nomes de camada e ferramentas ao stack acima:

1. Arquitetura em camadas com regra de importação em uma única direção, IMPOSTA por
   dependency-cruiser (ou equivalente da linguagem), não só documentada: domain (zero
   dependência de npm, sem globais não determinísticos) -> application (casos de uso +
   portas, portas declaradas pelo CONSUMIDOR, interface só com propriedade de função) ->
   infra (único lugar com ORM/driver) -> apps/api (único lugar com o framework HTTP) e
   apps/web (fala com portas, nunca fetch/localStorage direto).

2. Regra de criação de abstração: uma porta só nasce quando paga uma de três contas
   (segundo implementador real, teste unitário sem I/O que depende dela, ou fronteira já
   declarada em docs/arquitetura.md). Fora isso, função concreta.

3. Erros de domínio como dado (Result<Ok, Err>), nunca throw em domain/application.
   Tradução pra HTTP só na borda, com teste de exaustividade.

4. Gate de qualidade próprio com dois modos: validate:quick (<10s, iteração) e validate
   (<90s, antes de commit). Toda violação em uma linha, formato
   "caminho:linha:coluna: error ferramenta(regra): fato fix: ação corretiva", exit 1
   código errado / exit 2 ferramenta quebrada. tsc como barreira: se tipos falham, nada
   depois roda.

5. Toda regra de gate nasce com um fixture que a viola e um teste que prova que o gate
   acha exatamente aquilo.

6. Testes com só dois sufixos: *.unit.test.ts (zero I/O) e *.e2e.test.ts (infra real,
   sempre). Todo caso de uso tem unit test irmão. Toda rota aparece em algum e2e test.

7. Estrutura .claude/ com AGENTS.md como dono do conteúdo (comandos, camadas, proibições,
   ordem de criação de feature), CLAUDE.md referenciando com @AGENTS.md, rules/ por
   camada com paths: no frontmatter, e skills/ para procedimento recorrente em vez de
   prosa solta. Hooks ficam propostos em hooks.proposto.json até eu decidir instalar.

8. docs/decisoes.md (uma entrada por decisão relevante, com motivo e o que foi
   descartado) e docs/arquitetura.md (árvore de pastas, matriz de importação, catálogo
   de portas, versões fixas de dependência com motivo). Tudo markdown no repo, nada
   hospedado fora.

9. Se o projeto for multi-inquilino: tenant_id nunca como parâmetro de porta nem vindo de
   request; é fato de banco via RLS (ENABLE + FORCE), chave primária (tenant_id, id),
   objeto de outro inquilino sempre 404 nunca 403.

10. Zero comentário em código por padrão, versões de dependência fixas com motivo
    documentado, commit "tipo: descrição" com o gate completo verde antes de propor.

Comece propondo a árvore de pastas e a matriz de importação em docs/arquitetura.md antes
de escrever qualquer código, para eu aprovar a topologia primeiro.
```

---

## Referência: o que foi analisado no Vanzi para gerar este documento

`AGENTS.md`, `CLAUDE.md`, `README.md`, `docs/arquitetura.md` (seções A a E), `.claude/rules/*.md` (8
arquivos, um por camada), `.claude/skills/*/SKILL.md` (4 skills), `.claude/hooks.proposto.json`,
`.dependency-cruiser.js`, `.ls-lint.yml`, `.jscpd.json`, `knip.json`, `.gitleaks.toml`, `lefthook.yml`,
`biome.json`, `tools/quality/src/{validate,reporter}.ts`, `package.json`.
