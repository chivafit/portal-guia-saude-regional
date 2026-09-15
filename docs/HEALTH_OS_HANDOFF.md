# Health OS — handoff

Arquivos centrais da implementação:

- `components/HealthOSHome.tsx`: nova Home.
- `app/health-os.css`: tokens, Home, busca, resultados, perfil profissional e dock.
- `app/health-os-extended.css`: favoritos e estabelecimentos.
- `components/AppBottomNav.tsx`: arquitetura da dock.
- `app/layout.tsx`: carregamento das camadas visuais e theme color.

A implementação foi deliberadamente construída sobre componentes e rotas existentes para reduzir regressões. A logo atual não deve ser tratada como decisão final de branding.
