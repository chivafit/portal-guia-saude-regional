# Auditoria do diretório de profissionais — 28/08/2026

## Escopo e decisão editorial

Foram revisados os 108 registros reais de Piumhi atualmente preservados no inventário do portal. Não há duplicidade de `slug` nesse conjunto.

Os registros estavam sendo exibidos com dados provenientes de diretórios públicos, mas com registros profissionais, especialidades, contatos ou locais ainda indicados no próprio dado de origem como pendentes de confirmação. Esses dados não atendem ao critério mínimo de publicação definido para o Guia Saúde.

Por segurança editorial, os 108 registros passaram para `draft` com `verificationStatus: "needs-review"`. Eles foram preservados no código para revisão futura e não foram apagados.

## Resultado da classificação inicial

| Classificação | Quantidade |
| --- | ---: |
| Registros no inventário de Piumhi | 108 |
| Publicados antes desta revisão | 108 |
| Mantidos públicos após a revisão | 0 |
| Movidos para rascunho interno | 108 |
| Registro profissional oficialmente confirmado no conjunto atual | 0 |
| Contato profissional confirmado conforme critério de publicação | 0 |
| Duplicidades de slug identificadas | 0 |

## Efeito público

- Perfis em rascunho não aparecem na busca, destaques ou contagens públicas.
- Perfis em rascunho não entram no sitemap nem são gerados como páginas individuais públicas.
- Links de matérias não apontam para perfis que não estejam publicados.
- A interface pública não mostra termos administrativos como “cadastro em revisão”, “contato em validação” ou “registro a validar”.

## Para publicar ou reativar um perfil

Cada perfil precisa ter: nome, profissão, cidade, especialidade ou área comprovada, registro profissional confirmado quando aplicável, ao menos um contato ou local profissional público válido, fonte registrada, data da verificação e status `published`.

O registro deve receber uma das classificações internas: `public-source`, `official-source` ou `direct-confirmation`. Dados enviados por profissionais entram em revisão editorial antes da publicação.

## Limitação de hospedagem

O portal é uma exportação estática no GitHub Pages. Portanto, as URLs removidas deixam de ser geradas e saem dos links e sitemap; o host não permite configurar uma resposta HTTP individual para cada antiga URL sem infraestrutura de servidor.
