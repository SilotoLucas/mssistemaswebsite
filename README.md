# MS Sistemas Website

Front-end do site da MS Consultoria & Sistemas.

## Como rodar

Requer o [Bun](https://bun.sh) 1.4.4.

```powershell
bun install
```

```powershell
bun run dev
```

O site abre em `http://127.0.0.1:5173`.

## Antes de publicar

1. Opcional: copie `.env.example` para `.env` e preencha `VITE_WHATSAPP_NUMBER` (DDD e número, só dígitos) para trocar o WhatsApp padrão.
2. Troque `simulated-demo-request-sender.ts` pelo envio real dos pedidos de demonstração.
3. Publique a Política de Privacidade.

## Documentação

- `AGENTS.md`: comandos, camadas e proibições.
- `docs/arquitetura.md`: estrutura, matriz de importação e versões.
- `docs/decisoes.md`: decisões do projeto e seus motivos.
- `docs/referencias`: metodologia, análise do site atual e design aprovado.
