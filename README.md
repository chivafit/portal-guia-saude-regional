# Guia Saúde

Portal público e aplicativos regionais do Guia Saúde.

## Superfícies

O projeto tem dois alvos separados:

- **Web:** uma única landing page responsiva, além de Privacidade e Termos.
- **Aplicativos:** experiência completa compartilhada pelos projetos Capacitor de iOS e Android.

As funcionalidades de busca, perfis, clínicas, conteúdos, podcast, revista e favoritos pertencem aos aplicativos. Elas não devem ser reintroduzidas na navegação pública.

## Comandos

```bash
npm install
npm run build:web
npm run build:app
```

- `npm run build` e `npm run build:web`: geram a landing pública.
- `NEXT_PUBLIC_BUILD_TARGET=web npm run dev`: abre a landing em desenvolvimento.
- `NEXT_PUBLIC_BUILD_TARGET=app npm run dev`: abre a experiência completa dos apps.
- `npm run build:app`: valida, gera o bundle completo e sincroniza iOS e Android.
- `npm run app:android`: sincroniza e abre o Android Studio.
- `npm run app:ios`: sincroniza e abre o Xcode.
- `npm run app:assets`: atualiza ícones e telas de abertura.

## Estrutura essencial

- `app/`: rotas e layouts Next.js.
- `components/LandingPage.tsx`: conteúdo da landing pública.
- `app/landing.css`: estilos exclusivos da landing.
- `components/`: interface usada pelos aplicativos.
- `android/`: projeto nativo Android.
- `ios/`: projeto nativo iOS.
- `capacitor.config.ts`: integração entre o bundle web e os projetos nativos.
- `public/`: imagens usadas pela landing ou pelos aplicativos.

Consulte [docs/mobile-apps.md](docs/mobile-apps.md) para configuração e publicação nas lojas.
