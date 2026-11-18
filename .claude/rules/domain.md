---
paths:
  - "packages/domain/**"
---

# Domain

- Não importe pacotes nem outras camadas.
- Não use `Date`, `Math.random`, `fetch`, `process`, `crypto`, `setTimeout` ou `localStorage`.
- Devolva erros com `Result`, nunca com `throw`.
- Mantenha um teste `*.unit.test.ts` ao lado de cada regra.
