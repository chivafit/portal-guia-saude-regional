# Auditoria de pré-lançamento — Guia Saúde

Data: 16/09/2026. Escopo: exportação web, app Capacitor, código, testes e configuração nativa. Esta auditoria não equivale a homologação em aparelhos reais nem a aprovação pelas lojas.

## Corrigido nesta revisão

- A rota de cidade aceitava uma propriedade adicional no componente de página, rejeitada pelo TypeScript. A página agora expõe apenas as propriedades permitidas pelo Next.js.
- O build ignorava erros de TypeScript. A exceção foi removida; erros de tipo agora interrompem a exportação.
- A suíte de testes usava o servidor e textos do protótipo antigo. Ela agora valida a exportação estática atual, rotas principais e todos os links internos exportados.
- O indicador de cidade na Home tinha aparência de botão, mas não executava ação. Agora é um indicador estático acessível.
- A página comercial repetia IDs de âncoras, prejudicando os atalhos. Os destinos agora são únicos.
- O menu móvel retorna o foco ao botão original de forma estável ao fechar.
- O painel de fotos podia persistir um token do GitHub em localStorage. A opção foi removida e tokens previamente salvos são apagados ao abrir o painel.
- As cores do manifesto PWA foram alinhadas ao tema atual do aplicativo.
- Next.js, ESLint Config e Sharp foram atualizados; o audit das dependências de produção não aponta vulnerabilidades.

## Verificações executadas

- Build Next.js com checagem de tipos: aprovado.
- Exportação estática: 266 rotas geradas, 263 arquivos HTML de página verificados.
- Suíte automatizada: 6 testes aprovados.
- Links internos dos HTMLs exportados: nenhum destino ausente.
- Validação de diretório: 149 profissionais; auditoria: 68 estabelecimentos.
- Validações de busca, podcast, sitemap e SEO: aprovadas.
- Lint: nenhum erro; ainda há avisos de desempenho e limpeza de código.
- Capacitor: sincronização dos assets web com Android e iOS aprovada.
- `npm audit --omit=dev --audit-level=moderate`: nenhuma vulnerabilidade em dependências de produção.
- Auditoria completa ainda aponta 20 alertas em ferramentas de desenvolvimento, incluindo dependências transitivas sem correção não disruptiva; não aplicar `npm audit fix --force` sem validar mudanças incompatíveis.

## Pendências antes de enviar às lojas

1. **Compilações nativas de produção.** A sincronização passou, mas a tentativa do Gradle expirou ao baixar a distribuição e o Xcode não pôde gravar no cache do Swift Package Manager nem conectar ao CoreSimulator neste ambiente. Gerar e validar um AAB assinado e um Archive iOS no Android Studio/Xcode do computador.
2. **Assinatura e contas das lojas.** Confirmar keystore Android, equipe Apple, identificador do app, versões de build e contas Play Console/App Store Connect. Os projetos ainda mostram versão 1.0/build 1 e a configuração de assinatura de produção não foi comprovada nesta auditoria.
3. **Homologação visual e funcional em aparelhos.** Executar um roteiro no Pixel e no iPhone: primeira abertura, navegação, busca e filtros, perfis, favoritos após reiniciar, podcast, leitor da Revista, contatos/links externos, formulários, perda de rede, orientação, fontes grandes e VoiceOver/TalkBack.
4. **Painel editorial.** A rota pública `/atualizar-fotos` ainda solicita um token de escrita do GitHub no cliente. A persistência local foi removida, mas recomenda-se deslocar esse fluxo para uma ferramenta administrativa fora do aplicativo público antes do lançamento amplo.

Status: **não liberar para as lojas ainda**; o app está exportando, os testes web passam e as dependências de produção estão sem alertas conhecidos, porém a compilação, assinatura e homologação nativa ainda precisam ser concluídas.
