# Health OS — checklist de validação

## UX
- Home prioriza busca, cidade, atalhos e destaques.
- Busca preserva filtros existentes e URLs compartilháveis.
- Resultados mantêm favoritos e contatos existentes.
- Perfis preservam fontes, registros, locais e ações públicas.
- Navegação inferior tem cinco destinos e estado ativo.

## Responsividade
- Layout mobile-first a partir de 320 px.
- Dock considera safe-area inferior.
- Conteúdo recebe padding inferior para não ficar sob a dock.
- Desktop mantém largura e estrutura existentes, recebendo apenas a camada visual.

## Acessibilidade
- `prefers-reduced-motion` respeitado.
- Busca mantém labels/aria existentes.
- Links e botões funcionais não foram substituídos por elementos decorativos.
- Texto principal usa Graphite sobre superfícies claras.

## Segurança de rollout
- A lógica de busca e dados não foi reescrita.
- O redesign reutiliza `publishedProfessionals`, favoritos, rotas e componentes existentes.
- A maior parte da mudança é uma camada visual isolada em `health-os.css` e `health-os-extended.css`.
