# Arquitetura

## Estrutura

```text
apps/web/                  site em React
  src/app/                 composição da página
  src/features/home/       seções da home
  src/features/demo-request/ formulário de demonstração
  src/features/site-shell/ cabeçalho e rodapé
  src/features/solutions/ catálogo de soluções
  src/features/company/   história, missão, valores e equipe
  src/shared/              configuração e componentes comuns
  src/styles/              tokens gerados e estilos
packages/domain/           regras puras
packages/application/      casos de uso e portas
packages/design-tokens/    fonte única dos tokens
tools/quality/             gates próprios, fixtures e testes
docs/                      arquitetura, decisões e referências
.claude/                   regras, skills e hooks propostos
```

## Matriz de importação

| Origem | domain | application | design-tokens | shared | outra feature |
| --- | --- | --- | --- | --- | --- |
| `packages/domain` | sim | não | não | não | não |
| `packages/application` | sim | sim | não | não | não |
| `apps/web/src/shared` | não | não | não | sim | não |
| `apps/web/src/features` | sim | sim | não | sim | só pelo `index.ts` |
| `apps/web/src/app` | não | não | não | sim | só pelo `index.ts` |
| `tools/quality` | não | não | sim | não | não |

## Portas

| Porta | Assinatura | Adaptador atual | Alternativa prevista |
| --- | --- | --- | --- |
| `DemoRequestSender` | `send(request) => Promise<Result<void, 'send-failed'>>` | `simulatedDemoRequestSender` | Envio real para API, e-mail ou CRM |

## Gates

| Fase | Ferramenta | Modo |
| --- | --- | --- |
| Nomes de arquivo | `ls-lint` | rápido e completo |
| Comentários, cores e tokens | `tools/quality` | rápido e completo |
| Tipos, como barreira | `tsc` | rápido e completo |
| Lint e formatação | Biome | rápido e completo |
| Arquitetura | `dependency-cruiser`, com saída `2` se nenhum módulo for analisado | rápido e completo |
| Testes unitários | `bun test` | completo |
| Código morto | `knip` | completo |
| Duplicação | `jscpd` | completo |
| Build | Vite | completo |

Saída dos gates próprios: `caminho:linha:coluna: error ferramenta(regra): fato fix: ação`.

Códigos de saída: `0` limpo, `1` violação de código, `2` ferramenta quebrada.

## Versões

| Dependência | Versão | Motivo |
| --- | --- | --- |
| Bun | 1.4.4 | Runtime, gerenciador e testes definidos na metodologia |
| TypeScript | 5.9.3 | Tipagem estrita. A versão 7 impede o `dependency-cruiser` de ler os arquivos `.ts` |
| React e React DOM | 19.3.1 | Interface por componentes |
| React Router | 8.5.1 | Endereços próprios para cada tela |
| Vite | 8.3.5 | Build e servidor de desenvolvimento do front |
| @vitejs/plugin-react | 6.2.1 | Integração do React com o Vite |
| @types/react e @types/react-dom | 19.3.0 | Tipos do React |
| @types/bun | 1.4.4 | Tipos do Bun |
| Biome | 2.6.5 | Lint e formatação em uma só ferramenta |
| dependency-cruiser | 18.7.2 | Imposição das camadas |
| ls-lint | 2.3.2 | Padrão de nomes de arquivo |
| jscpd | 5.4.2 | Detecção de duplicação |
| knip | 6.44.1 | Detecção de código morto |
| lefthook | 2.2.2 | Git hooks em configuração simples |
