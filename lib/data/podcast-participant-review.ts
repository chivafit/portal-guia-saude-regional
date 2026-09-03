export type PodcastParticipantReview = {
  guest: string;
  episodeSlug?: string;
  episodeUrl?: string;
  status: "needs-profile-match" | "needs-profession-confirmation" | "needs-episode-identification";
  note: string;
};

/**
 * Fila editorial de participantes do Conexão Saúde que não devem virar perfil
 * público nem vínculo automático até existir identificação profissional segura.
 */
export const podcastParticipantReview: PodcastParticipantReview[] = [
  {
    guest: "Elisa Ribeiro",
    episodeSlug: "conexao-saude-elisa-ribeiro",
    episodeUrl: "https://www.youtube.com/watch?v=v7ymTasSRqQ",
    status: "needs-profession-confirmation",
    note: "O episódio está confirmado, mas a base e as fontes públicas consultadas não permitem identificar com segurança profissão, registro e perfil local sem risco de homônimo.",
  },
  {
    guest: "Natália Faria",
    episodeSlug: "emagrecer-manter-peso-natalia-faria",
    episodeUrl: "https://www.youtube.com/watch?v=xW22O4Feims",
    status: "needs-profession-confirmation",
    note: "O episódio está confirmado, mas o cadastro atual informa apenas 'Convidada'. Não atribuir Nutrição ou outra profissão sem confirmação adicional.",
  },
  {
    guest: "Raquel Moraes",
    episodeSlug: "natacao-saude-inclusao-raquel-moraes",
    episodeUrl: "https://www.youtube.com/watch?v=s7CFriHPhbA",
    status: "needs-profession-confirmation",
    note: "O episódio está confirmado, mas o cadastro atual informa apenas 'Convidada'. Não atribuir Educação Física ou outra profissão sem confirmação adicional.",
  },
  {
    guest: "Jaíne Reis",
    status: "needs-episode-identification",
    note: "Participação no podcast confirmada diretamente pela equipe editorial. O perfil profissional já existe, mas o episódio/URL ainda precisa ser identificado antes de criar vínculo navegável.",
  },
];
