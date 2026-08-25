"use client";

import { useCallback, useEffect, useState } from "react";

type RequestItem = {
  id:number; entityType:string; name:string; category:string|null; cityName:string|null;
  contactName:string; contactEmail:string|null; contactPhone:string; message:string|null;
  status:string; source:string; createdAt:string;
};

const labels: Record<string,string> = {
  professional: "Profissional",
  organization: "Empresa/serviço",
};

export function InclusionRequestsManager(){
  const [items,setItems]=useState<RequestItem[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [statusFilter,setStatusFilter]=useState("");
  const filtered=items.filter(item=>!statusFilter||item.status===statusFilter);
  const counters={total:items.length,new:items.filter(item=>item.status==="new").length,review:items.filter(item=>item.status==="review").length,approved:items.filter(item=>item.status==="approved").length};
  const load=useCallback(async()=>{setLoading(true);setError("");const response=await fetch("/api/admin/inclusion-requests");if(!response.ok){setItems([]);setError(response.status===401?"Entre com a conta autorizada para ver solicitações.":"Não foi possível carregar solicitações.")}else{const data=await response.json();setItems(data.items)}setLoading(false)},[]);
  useEffect(()=>{let active=true;fetch("/api/admin/inclusion-requests").then(async response=>({response,data:response.ok?await response.json():null})).then(({response,data})=>{if(!active)return;if(!response.ok){setError(response.status===401?"Entre com a conta autorizada para ver solicitações.":"Não foi possível carregar solicitações.");setItems([])}else{setError("");setItems(data.items)}setLoading(false)});return()=>{active=false}},[]);
  async function status(id:number,value:string){await fetch("/api/admin/inclusion-requests",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status:value})});await load()}
  async function remove(id:number){if(!window.confirm("Excluir esta solicitação?"))return;await fetch(`/api/admin/inclusion-requests?id=${id}`,{method:"DELETE"});await load()}
  return <div className="cms inclusion-admin"><div className="admin-metrics"><span><b>{counters.total}</b>Total</span><span><b>{counters.new}</b>Novas</span><span><b>{counters.review}</b>Análise</span><span><b>{counters.approved}</b>Aprovadas</span></div><div className="admin-filters single"><label>Status<select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option value="">Todos</option><option value="new">Novo</option><option value="review">Em análise</option><option value="approved">Aprovado</option><option value="rejected">Recusado</option><option value="converted">Convertido</option></select></label><button type="button" onClick={()=>setStatusFilter("")}>Limpar filtros</button></div><section className="cms-list inclusion-list"><div className="cms-list-head"><div><small>SOLICITAÇÕES</small><h2>Pedidos de inclusão</h2></div><span>{filtered.length} de {items.length} solicitações</span></div>{loading&&<p className="cms-empty">Carregando...</p>}{error&&<p className="cms-error">{error}</p>}{!loading&&!items.length&&<p className="cms-empty">Nenhuma solicitação recebida.</p>}{!loading&&!!items.length&&!filtered.length&&<p className="cms-empty">Nenhuma solicitação neste filtro.</p>}{filtered.map(item=><article key={item.id} className="inclusion-request-card"><div><small>{item.status} · {labels[item.entityType]||item.entityType} · {item.cityName||"Cidade não informada"}</small><h3>{item.name}</h3><p>{item.category||"Categoria não informada"}</p><p><strong>Contato:</strong> {item.contactName} · {item.contactPhone}{item.contactEmail?` · ${item.contactEmail}`:""}</p>{item.message&&<p>{item.message}</p>}<p className="request-date">Recebido em {new Date(item.createdAt).toLocaleDateString("pt-BR")}</p></div><div className="cms-actions"><select value={item.status} onChange={e=>status(item.id,e.target.value)}><option value="new">Novo</option><option value="review">Em análise</option><option value="approved">Aprovado</option><option value="rejected">Recusado</option><option value="converted">Convertido</option></select><button type="button" onClick={()=>remove(item.id)}>Excluir</button></div></article>)}</section></div>
}
