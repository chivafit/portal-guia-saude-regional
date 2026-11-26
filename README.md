# Guia Saúde

Portal e aplicativos do Guia Saúde: diretório de profissionais e serviços de saúde de Piumhi/MG, com matérias, podcast e revista digital.

O projeto é um site 100% estático (Next.js com `output: "export"`). Não há servidor nem banco de dados: o diretório fica em `lib/data.ts` e `lib/data/`.

## Onde cada coisa é publicada

| Superfície | Como é gerada | O que contém |
| --- | --- | --- |
| **Site** — `https://www.guiasaude.app.br` (Vercel) | `npm run build:pages`, chamado pela Vercel a cada push no `main` (`vercel.json`) | Experiência completa (busca, perfis, clínicas, conteúdos). O início (`/`) e `/anuncie/` são trocados pelas páginas de divulgação de `site-publico/` (`scripts/apply-public-site.mjs`, só quando `VERCEL=1`). Também publica `/app-data/profiles.json`. |
| **Aplicativos** — Android e iOS (Capacitor) | `npm run build:app` | O mesmo bundle completo, sem as páginas de `site-publico/`. As páginas da revista também ficam de fora e são lidas do site. Os perfis consultam `/app-data/profiles.json` no site para mostrar dados atualizados sem nova versão na loja. |

O domínio canônico é `https://www.guiasaude.app.br` (`lib/seo.ts`); o endereço sem `www` redireciona para ele.

A rota `/atualizar-fotos` só existe em desenvolvimento local: ela é removida de todo build publicado (`scripts/strip-admin-routes.mjs`). Cada foto enviada vira um commit no `main`, e a Vercel publica o site atualizado.

## Comandos

```bash
npm install
npm run dev          # desenvolvimento com a experiência completa, igual ao site
npm run build:pages  # build do site, com todas as validações
npm test             # build:pages + testes em tests/
npm run validate:release  # lint + validações + build + SEO + testes (o mesmo da CI)
```

- `npm run build:app`: gera o bundle e sincroniza iOS e Android.
- `npm run app:android` / `npm run app:ios`: sincroniza e abre o Android Studio / Xcode.
- `npm run app:assets`: atualiza ícones e telas de abertura.
- `npm run revista:webp`: converte para WebP as páginas de uma edição nova da revista.
- `npm run build:web`: gera apenas a landing antiga com Privacidade e Termos (alvo `web`, não usado em produção).

As imagens responsivas de `public/professionals/optimized/` são geradas automaticamente antes de cada `dev` e build (`scripts/optimize-professional-images.ts`) e não são versionadas.

## CI

- `.github/workflows/validate.yml`: roda `validate:release` em pull requests e no `main`.
- `.github/workflows/build-android-app.yml`: gera um APK de testes a cada push no `main`.

## Estrutura essencial

- `app/`: rotas e layouts Next.js.
- `components/`: interface do portal e dos aplicativos.
- `lib/data.ts`, `lib/data/`: diretório de profissionais, clínicas, matérias, podcast e revista. Regras de publicação em `docs/directory-governance.md`.
- `lib/public-directory.ts`: o que pode aparecer publicamente.
- `site-publico/`: páginas de divulgação publicadas no início e em `/anuncie/` do site.
- `scripts/`: validações, otimização de imagens e pós-processamento do build.
- `android/`, `ios/`, `capacitor.config.ts`: projetos nativos.

Consulte [docs/mobile-apps.md](docs/mobile-apps.md) para configuração e publicação nas lojas.
