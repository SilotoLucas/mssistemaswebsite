---
paths:
  - "packages/application/**"
---

# Application

- Importe apenas `@ms/domain`.
- Declare portas como tipos com propriedades de função.
- Crie uma porta só quando ela pagar uma das três contas do `AGENTS.md`.
- Todo caso de uso tem teste unitário irmão, com caminho feliz e cada erro possível.
