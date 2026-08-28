# Governança do diretório de clínicas e serviços

## Publicação

Um estabelecimento só pode receber `publicationStatus: "published"` quando houver nome, categoria, cidade Piumhi, endereço, telefone comercial público, ao menos um serviço, fonte rastreável, data de conferência e slug único. Registros incompletos ficam em `draft`; cadastros encerrados ou sem evidência atual permanecem `inactive`.

`verificationStatus` descreve a origem editorial interna: `official-source` para canal oficial do estabelecimento, `public-source` para órgão público ou fonte pública rastreável e `direct-confirmation` somente após confirmação direta. A classificação não é exibida como selo público.

`relationship` é independente da publicação: `organic`, `partner` ou `sponsored`. Não altera a ordem orgânica sem marcação editorial apropriada.

## Rotina de revisão

- Fonte oficial: revisar a cada 180 dias.
- Fonte pública: revisar a cada 90 dias.
- Há mais de 12 meses sem confirmação: retirar da publicação ou sinalizar para revisão interna.
- Mudança de telefone, endereço, URL, categoria ou responsável: criar revisão manual; nunca sobrescrever silenciosamente o registro existente.

## Importação

Use `npm run validate:service-import -- data/arquivo.json` antes de editar a fonte pública. O validador não grava dados: ele entrega uma prévia de inclusões, itens que exigem revisão e bloqueios. Duplicidade de slug, telefone, endereço ou nome semelhante é sempre revisão manual.

## Busca sem resultado

O portal estático não coleta termos pesquisados. Sem uma ferramenta de analytics aprovada, não são armazenados termos, IPs ou identificadores de visitantes. Pedidos de inclusão chegam pelo fluxo público de e-mail e passam por revisão editorial.
