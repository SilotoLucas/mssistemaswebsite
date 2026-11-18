module.exports = {
  forbidden: [
    { name: 'no-circular', severity: 'error', comment: 'Ciclos escondem acoplamento. Extraia o trecho comum para shared.', from: {}, to: { circular: true } },
    { name: 'no-orphans', severity: 'error', comment: 'Arquivo sem uso deve ser removido ou ligado a um ponto de entrada.', from: { orphan: true, pathNot: ['\\.unit\\.test\\.ts$', '\\.ui\\.test\\.tsx$', '^apps/web/src/test/', '\\.e2e\\.test\\.ts$', '(^|/)vite\\.config\\.ts$', '^tools/quality/src/(validate|generate-tokens|project-gates|architecture-gate)\\.ts$', '^apps/web/src/main\\.tsx$', '\\.cjs$'] }, to: {} },
    { name: 'domain-is-pure', severity: 'error', comment: 'domain nao importa pacote nem outra camada. Mova a dependencia para application ou apps/web.', from: { path: '^packages/domain/', pathNot: '\.unit\.test\.ts$' }, to: { pathNot: '^packages/domain/' } },
    { name: 'application-only-domain', severity: 'error', comment: 'application conhece apenas domain. Declare uma porta e implemente em apps/web.', from: { path: '^packages/application/', pathNot: '\.unit\.test\.ts$' }, to: { pathNot: ['^packages/application/', '^packages/domain/'] } },
    { name: 'packages-never-import-apps', severity: 'error', comment: 'Dependencia reversa quebra o grafo. Mova o codigo para um pacote.', from: { path: '^packages/' }, to: { path: '^apps/' } },
    { name: 'shared-never-imports-features', severity: 'error', comment: 'shared nao conhece features. Receba o dado por props.', from: { path: '^apps/web/src/shared/' }, to: { path: '^apps/web/src/features/' } },
    { name: 'feature-public-api-only', severity: 'error', comment: 'Uma feature so importa outra pelo index.ts.', from: { path: '^apps/web/src/features/([^/]+)/' }, to: { path: '^apps/web/src/features/', pathNot: ['^apps/web/src/features/$1/', '^apps/web/src/features/[^/]+/index\\.ts$'] } },
    { name: 'app-uses-feature-index', severity: 'error', comment: 'A composicao importa features pelo index.ts.', from: { path: '^apps/web/src/app/' }, to: { path: '^apps/web/src/features/[^/]+/.+', pathNot: '^apps/web/src/features/[^/]+/index\\.ts$' } },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    exclude: { path: '(^|/)(dist|fixtures)/' },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.json' },
    enhancedResolveOptions: { exportsFields: ['exports'], conditionNames: ['import', 'default'], extensions: ['.ts', '.tsx', '.js', '.json'] },
  },
}
