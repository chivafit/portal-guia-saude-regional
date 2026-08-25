"use client";

import { useMemo, useState } from "react";

const initialRecords = [
  { id: 1, name: "Perfil demonstrativo — Cardiologia", city: "Piumhi", source: "CNES", status: "importado" },
  { id: 2, name: "Perfil demonstrativo — Odontologia", city: "Capitólio", source: "Conselho", status: "em revisão" },
  { id: 3, name: "Clínica demonstrativa", city: "Arcos", source: "CNES", status: "revisado" },
];

const stages = ["importado", "em revisão", "revisado", "verificado", "publicado"];

export function AdminBoard() {
  const [records, setRecords] = useState(initialRecords);
  const [selected, setSelected] = useState(initialRecords[0].id);
  const current = records.find(item => item.id === selected) ?? records[0];
  const counts = useMemo(() => stages.map(stage => ({ stage, count: records.filter(item => item.status === stage).length })), [records]);
  const advance = () => setRecords(items => items.map(item => item.id === current.id ? { ...item, status: stages[Math.min(stages.indexOf(item.status) + 1, stages.length - 1)] } : item));

  return <div className="admin-board"><div className="admin-stats">{counts.slice(0,4).map(item => <div key={item.stage}><span>{item.stage}</span><strong>{item.count}</strong></div>)}</div><div className="admin-workspace"><div className="review-list"><div className="review-list-head"><strong>Fila cadastral</strong><button type="button" onClick={() => setRecords(items => [...items, { id: Date.now(), name: "Novo cadastro demonstrativo", city: "Pimenta", source: "Importação", status: "importado" }])}>Adicionar demonstração</button></div>{records.map(item => <button type="button" key={item.id} onClick={() => setSelected(item.id)} className={item.id === current.id ? "selected" : ""}><span>{item.name}</span><small>{item.city} · {item.source}</small><em>{item.status}</em></button>)}</div><section className="review-panel"><p className="eyebrow">Revisão cadastral</p><h2>{current.name}</h2><div className="review-progress">{stages.map(stage => <span key={stage} className={stages.indexOf(stage) <= stages.indexOf(current.status) ? "done" : ""}>{stage}</span>)}</div><div className="review-checklist"><label><input type="checkbox" defaultChecked /> Fonte registrada</label><label><input type="checkbox" /> Conselho conferido</label><label><input type="checkbox" /> Contato profissional confirmado</label><label><input type="checkbox" /> Autorização ou justificativa registrada</label></div><div className="review-source"><span>Fonte principal</span><strong>{current.source}</strong><small>Data, URL e campos sustentados serão obrigatórios.</small></div><button className="primary-action" type="button" onClick={advance} disabled={current.status === "publicado"}>{current.status === "publicado" ? "Cadastro publicado" : "Avançar para próxima etapa"}</button><p className="demo-warning">Demonstração local: o fluxo persistente será conectado ao banco antes da publicação.</p></section></div></div>;
}
