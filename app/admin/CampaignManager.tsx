"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cities } from "@/lib/data";
import { cityAdCode, citySlug } from "@/lib/city-utils";

type Campaign = { id:number; advertiserName:string; name:string; positionCode:string; citySlug:string|null; startsAt:string; endsAt:string; destinationUrl:string; imageUrl:string|null; status:string };

const formatOptions = [
  { label: "Banner topo regional", value: "DIRECTORY_TOP", scope: "regional" },
  { label: "Banner topo da cidade", value: "CITY", scope: "city" },
  { label: "Banner empresas e serviços", value: "COMPANY_DIRECTORY_TOP", scope: "regional" },
  { label: "Perfil em destaque", value: "PROFILE_CONTENT_END", scope: "regional" },
  { label: "Demonstração comercial", value: "DEMONSTRACAO_COMERCIAL", scope: "regional" },
];

const technicalPositions = ["DIRECTORY_TOP", "COMPANY_DIRECTORY_TOP", "PROFILE_CONTENT_END", "DEMONSTRACAO_COMERCIAL", ...cities.map(cityAdCode)];
const cityByAdCode = new Map(cities.map((city) => [cityAdCode(city), city]));
const initial = {advertiserName:"", name:"", format:"DIRECTORY_TOP", cityName:"", startsAt:"", endsAt:"", destinationUrl:"https://", imageUrl:"", status:"draft"};

function labelForPosition(code:string){
  const city=cityByAdCode.get(code);
  if(city) return `Banner topo · ${city}`;
  return formatOptions.find(item=>item.value===code)?.label ?? code;
}

export function CampaignManager(){
  const [items,setItems]=useState<Campaign[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [form,setForm]=useState(initial);
  const [statusFilter,setStatusFilter]=useState("");
  const [positionFilter,setPositionFilter]=useState("");
  const selectedFormat=formatOptions.find(item=>item.value===form.format);
  const filteredItems=items.filter(item=>(!statusFilter||item.status===statusFilter)&&(!positionFilter||item.positionCode===positionFilter));
  const counters={total:items.length,draft:items.filter(item=>item.status==="draft").length,published:items.filter(item=>item.status==="published").length,paused:items.filter(item=>item.status==="paused").length};
  const positionGroups=useMemo(()=>technicalPositions.map(code=>({code,label:labelForPosition(code)})),[]);
  const load=useCallback(async()=>{setLoading(true);setError("");const response=await fetch("/api/admin/campaigns");if(!response.ok){setItems([]);setError(response.status===401?"Entre com a conta autorizada para gerenciar campanhas.":"Não foi possível carregar campanhas.")}else{const data=await response.json();setItems(data.items)}setLoading(false)},[]);
  useEffect(()=>{let active=true;fetch("/api/admin/campaigns").then(async response=>({response,data:response.ok?await response.json():null})).then(({response,data})=>{if(!active)return;if(!response.ok){setError(response.status===401?"Entre com a conta autorizada para gerenciar campanhas.":"Não foi possível carregar campanhas.");setItems([])}else{setError("");setItems(data.items)}setLoading(false)});return()=>{active=false}},[]);
  async function submit(event:React.FormEvent){event.preventDefault();setError("");const positionCode=form.format==="CITY"?cityAdCode(form.cityName):form.format;const payload={advertiserName:form.advertiserName,name:form.name,positionCode,citySlug:form.cityName?citySlug(form.cityName):"",startsAt:form.startsAt,endsAt:form.endsAt,destinationUrl:form.destinationUrl,imageUrl:form.imageUrl,status:form.status};const response=await fetch("/api/admin/campaigns",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});if(!response.ok){setError("Não foi possível salvar a campanha.");return}setForm(initial);await load()}
  async function status(id:number,value:string){await fetch("/api/admin/campaigns",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status:value})});await load()}
  async function remove(id:number){if(!window.confirm("Excluir esta campanha?"))return;await fetch(`/api/admin/campaigns?id=${id}`,{method:"DELETE"});await load()}
  return <div className="cms campaign-admin"><div className="admin-metrics"><span><b>{counters.total}</b>Total</span><span><b>{counters.draft}</b>Rascunho</span><span><b>{counters.published}</b>Publicado</span><span><b>{counters.paused}</b>Pausado</span></div><div className="admin-filters"><label>Status<select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option value="">Todos</option><option value="draft">Rascunho</option><option value="published">Publicado</option><option value="paused">Pausado</option><option value="archived">Arquivado</option></select></label><label>Formato<select value={positionFilter} onChange={e=>setPositionFilter(e.target.value)}><option value="">Todos</option>{positionGroups.map(item=><option key={item.code} value={item.code}>{item.label}</option>)}</select></label><button type="button" onClick={()=>{setStatusFilter("");setPositionFilter("")}}>Limpar filtros</button></div><div className="cms-layout"><section className="cms-list"><div className="cms-list-head"><div><small>MÍDIA PAGA</small><h2>Campanhas e banners</h2></div><span>{filteredItems.length} de {items.length} campanhas</span></div>{loading&&<p className="cms-empty">Carregando...</p>}{!loading&&!items.length&&<p className="cms-empty">Nenhuma campanha cadastrada.</p>}{!loading&&!!items.length&&!filteredItems.length&&<p className="cms-empty">Nenhuma campanha neste filtro.</p>}{filteredItems.map(item=><article key={item.id}><div><small>{item.status} · {labelForPosition(item.positionCode)}</small><h3>{item.name}</h3><p>{item.advertiserName}</p>{item.imageUrl&&<p>Imagem cadastrada</p>}<p>{item.startsAt} → {item.endsAt}</p></div><div className="cms-actions"><select value={item.status} onChange={e=>status(item.id,e.target.value)}><option value="draft">Rascunho</option><option value="published">Publicado</option><option value="paused">Pausado</option><option value="archived">Arquivado</option></select><button onClick={()=>remove(item.id)}>Excluir</button></div></article>)}</section><form className="cms-form" onSubmit={submit}><p className="eyebrow">Nova campanha</p><h2>Cadastrar mídia paga</h2><label>Anunciante<input required value={form.advertiserName} onChange={e=>setForm({...form,advertiserName:e.target.value})}/></label><label>Nome da campanha<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Formato comercial<select value={form.format} onChange={e=>setForm({...form,format:e.target.value})}>{formatOptions.map(item=><option key={item.value} value={item.value}>{item.label}</option>)}</select></label>{selectedFormat?.scope==="city"&&<label>Cidade da campanha<select required value={form.cityName} onChange={e=>setForm({...form,cityName:e.target.value})}><option value="">Selecione</option>{cities.map(item=><option key={item}>{item}</option>)}</select></label>}<label>Imagem do anúncio<input value={form.imageUrl} onChange={e=>setForm({...form,imageUrl:e.target.value})} placeholder="/ads/banner-topo.svg ou URL externa"/></label><label>Início<input type="datetime-local" value={form.startsAt} onChange={e=>setForm({...form,startsAt:e.target.value})}/></label><label>Fim<input type="datetime-local" value={form.endsAt} onChange={e=>setForm({...form,endsAt:e.target.value})}/></label><label>Link de destino<input required value={form.destinationUrl} onChange={e=>setForm({...form,destinationUrl:e.target.value})}/></label><label>Status<select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option value="draft">Rascunho</option><option value="published">Publicar</option><option value="paused">Pausado</option></select></label>{error&&<p className="cms-error">{error}</p>}<button className="cms-submit" type="submit">Salvar campanha</button></form></div></div>
}
