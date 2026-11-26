import test from "node:test";
import assert from "node:assert/strict";
import { guestFromTitle, isPodcastTitle, mergeFeed } from "../scripts/sync-youtube-podcasts.mjs";

test("reads the guest from the channel's title variations", () => {
  assert.equal(guestFromTitle("[ REDE MEGGGA] -  CONEXÃO SAÚDE -  DR ROBERTO SANTOS  | 03.11.26"), "Dr. Roberto Santos");
  assert.equal(guestFromTitle("[ REDE MEGGGA] -  CONEXÃO SAÚDE-  MARINA FERREIRA  | 17.11.26"), "Marina Ferreira");
  assert.equal(guestFromTitle("[ REDE MEGGGA] -  CONEXÁO SAUDE | REINALDO & VICTOR LOPES SOARES | 24.02.26"), "Reinaldo & Victor Lopes Soares");
  assert.equal(guestFromTitle("[ REDE MEGGGA] - CONEXÄO SAUDE -  NAYARA GARCIA  |  24.03.26"), "Nayara Garcia");
  assert.equal(guestFromTitle("[ REDE MEGGGA] -  CONEXÃO SAÚDE -  LUIS AUGUSTO JÚNIO DE MELO  | 22.09.26."), "Luis Augusto Júnio de Melo");
  assert.equal(isPodcastTitle("[ REDE MEGGGA] -  MISSA DA FAMILIA -  IGREJA DO ROSÁRIO PIUMHI-MG  | 23.08.26."), false);
});

test("adds only new podcast videos and skips re-uploads", () => {
  const feed = [
    { videoId: "new1", title: "[ REDE MEGGGA] -  CONEXÃO SAÚDE -  ANA LIMA  | 01.12.26", published: "2026-12-01T22:00:00+00:00" },
    { videoId: "dup1", title: "[ REDE MEGGGA] -  CONEXÃO SAÚDE -  PATRÍCIA TERRA  | 11.08.26", published: "2026-08-11T22:12:56+00:00" },
    { videoId: "old1", title: "[ REDE MEGGGA] -  CONEXÃO SAÚDE -  GABRIELA ARAÚJO  | 25.08.26.", published: "2026-08-25T23:12:24+00:00" },
    { videoId: "mass", title: "[ REDE MEGGGA] -  MISSA SOLENE  | 15.08.26.", published: "2026-08-15T22:15:34+00:00" },
  ];
  const editorial = [
    { videoId: "uz1cICn0iks", guest: "Patrícia Terra", publishedAt: "2026-08-11" },
    { videoId: "old1", guest: "Gabriela Araújo", publishedAt: "2026-08-25" },
  ];
  const { added, episodes } = mergeFeed([], feed, editorial);
  assert.deepEqual(added.map((item) => item.videoId), ["new1"]);
  assert.equal(episodes[0].publishedAt, "2026-12-01");
  assert.equal(episodes[0].slug, "conexao-saude-ana-lima-2026-12");
});
