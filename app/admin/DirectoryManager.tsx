"use client";

import { useCallback, useEffect, useState } from "react";

type Entity = "professional" | "organization";
type Item = {
  id:number; publicName:string; profession?:string; specialty?:string|null; category?:string;
  cityName?:string|null; organizationName?:string|null; publicPhone?:string|null; whatsapp?:string|null;
  councilAcronym?:string|null; councilState?:string|null; registrationNumber?:string|null;
  address?:string|null; cnesCode?:string|null; status:string; summary?:string|null; services?:string|null;
};

const cities = ["Piumhi", "Capitólio", "Pimenta", "Arcos", "Campo Belo", "Bambuí", "São Roque de Minas"];
const professions = ["Médico", "Dentista", "Psicólogo", "Fisioterapeuta", "Nutricionista", "Fonoaudiólogo", "Enfermeiro", "Farmacêutico", "Educador físico"];
const categories = ["Clínica multiprofissional", "Laboratório", "Diagnóstico por imagem", "Clínica odontológica", "Farmácia", "Ótica", "Estética e bem-estar", "Academia e atividade física", "Home care"];
const initial = {publicName:"", profession:"Médico", specialty:"", category:"Clínica multiprofissional", cityName:"", organizationName:"", publicPhone:"", whatsapp:"", councilAcronym:"", councilState:"MG", registrationNumber:"", address:"", cnesCode:"", summary:"", services:"", status:"draft"};

function itemToForm(item: Item) {
  return {
    publicName:item.publicName ?? "",
    profession:item.profession ?? "Médico",
    specialty:item.specialty ?? "",
    category:item.category ?? "Clínica multiprofissional",
    cityName:item.cityName ?? "",
    organizationName:item.organizationName ?? "",
    publicPhone:item.publicPhone ?? "",
    whatsapp:item.whatsapp ?? "",
    councilAcronym:item.councilAcronym ?? "",
    councilState:item.councilState ?? "MG",
    registrationNumber:item.registrationNumber ?? "",
    address:item.address ?? "",
    cnesCode:item.cnesCode ?? "",
    summary:item.summary ?? "",
    services:item.services ?? "",
    status:item.status ?? "draft",
  };
}

export function DirectoryManager(){
  const [entity,setEntity]=useState<Entity>("professional");
  const [items,setItems]=useState<Item[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [form,setForm]=useState(initial);
  const [editingId,setEditingId]=useState<number|null>(null);
  const [statusFilter,setStatusFilter]=useState("");
  const [cityFilter,setCityFilter]=useState("");
  const label=entity==="professional"?"profissional":"empresa";
  const filteredItems=items.filter(item=>(!statusFilter||item.status===statusFilter)&&(!cityFilter||(item.cityName||"")===cityFilter));
  const counters={total:items.length,draft:items.filter(item=>item.status==="draft").length,review:items.filter(item=>item.status==="review").length,published:items.filter(item=>item.status==="published").length};
  const load=useCallback(async()=>{setLoading(true);setError("");const response=await fetch(`/api/admin/directory?entity=${entity}`);if(!response.ok){setItems([]);setError(response.status===401?"Entre com a conta autorizada para gerenciar o diretório.":"Não foi possível carregar o diretório.")}else{const data=await response.json();setItems(data.items)}setLoading(false)},[entity]);
  useEffect(()=>{let active=true;fetch(`/api/admin/directory?entity=${entity}`).then(async response=>({response,data:response.ok?await response.json():null})).then(({response,data})=>{if(!active)return;if(!response.ok){setItems([]);setError(response.status===401?"Entre com a conta autorizada para gerenciar o diretório.":"Não foi possível carregar o diretório.")}else{setError("");setItems(data.items)}setLoading(false)});return()=>{active=false}},[entity]);
  function switchEntity(next: Entity){setEntity(next);setLoading(true);setEditingId(null);setForm(initial);setError("");setStatusFilter("");setCityFilter("")}
  function edit(item: Item){setEditingId(item.id);setForm(itemToForm(item));setError("");document.querySelector(".directory-admin .cms-form")?.scrollIntoView({behavior:"smooth",block:"start"})}
  function cancel(){setEditingId(null);setForm(initial);setError("")}
  async function submit(event:React.FormEvent){event.preventDefault();setError("");const method=editingId?"PUT":"POST";const response=await fetch("/api/admin/directory",{method,headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,entity,id:editingId})});if(!response.ok){setError(editingId?"Não foi possível atualizar o cadastro.":"Não foi possível salvar. Verifique os campos obrigatórios.");return}cancel();await load()}
  async function status(id:number,value:string){await fetch("/api/admin/directory",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status:value,entity})});await load()}
  async function remove(id:number){if(!window.confirm(`Excluir este ${label}?`))return;await fetch(`/api/admin/directory?entity=${entity}&id=${id}`,{method:"DELETE"});if(editingId===id)cancel();await load()}
  return <div className="cms directory-admin"><nav className="cms-tabs"><button className={entity==="professional"?"active":""} onClick={()=>switchEntity("professional")}>Profissionais</button><button className={entity==="organization"?"active":""} onClick={()=>switchEntity("organization")}>Empresas</button></nav><div className="admin-metrics"><span><b>{counters.total}</b>Total</span><span><b>{counters.draft}</b>Rascunho</span><span><b>{counters.review}</b>Revisão</span><span><b>{counters.published}</b>Publicado</span></div><div className="admin-filters"><label>Status<select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option value="">Todos</option><option value="draft">Rascunho</option><option value="review">Em revisão</option><option value="published">Publicado</option><option value="archived">Arquivado</option></select></label><label>Cidade<select value={cityFilter} onChange={e=>setCityFilter(e.target.value)}><option value="">Todas</option>{cities.map(item=><option key={item}>{item}</option>)}</select></label><button type="button" onClick={()=>{setStatusFilter("");setCityFilter("")}}>Limpar filtros</button></div><div className="cms-layout"><section className="cms-list"><div className="cms-list-head"><div><small>DIRETÓRIO</small><h2>{entity==="professional"?"Profissionais":"Empresas e serviços"}</h2></div><span>{filteredItems.length} de {items.length} cadastros</span></div>{loading&&<p className="cms-empty">Carregando...</p>}{!loading&&!items.length&&<p className="cms-empty">Nenhum cadastro salvo ainda.</p>}{!loading&&!!items.length&&!filteredItems.length&&<p className="cms-empty">Nenhum cadastro neste filtro.</p>}{filteredItems.map(item=><article key={item.id} className={editingId===item.id?"editing":""}><div><small>{item.status} · {item.cityName||"Regional"}</small><h3>{item.publicName}</h3><p>{entity==="professional"?[item.profession,item.specialty].filter(Boolean).join(" · "):item.category}</p><p>{item.summary||"Sem resumo"}</p></div><div className="cms-actions"><select value={item.status} onChange={e=>status(item.id,e.target.value)}><option value="draft">Rascunho</option><option value="review">Em revisão</option><option value="published">Publicado</option><option value="archived">Arquivado</option></select><button type="button" onClick={()=>edit(item)}>Editar</button><button type="button" onClick={()=>remove(item.id)}>Excluir</button></div></article>)}</section><form className="cms-form" onSubmit={submit}><p className="eyebrow">{editingId?"Editar cadastro":"Novo cadastro"}</p><h2>{editingId?"Atualizar":"Cadastrar"} {label}</h2>{editingId&&<button className="cms-secondary" type="button" onClick={cancel}>Cancelar edição</button>}<label>Nome público<input required value={form.publicName} onChange={e=>setForm({...form,publicName:e.target.value})}/></label>{entity==="professional"?<><label>Profissão<select value={form.profession} onChange={e=>setForm({...form,profession:e.target.value})}>{professions.map(item=><option key={item}>{item}</option>)}</select></label><label>Especialidade<input value={form.specialty} onChange={e=>setForm({...form,specialty:e.target.value})} placeholder="Ex.: Cardiologia"/></label><label>Registro/conselho<div className="cms-inline"><input value={form.councilAcronym} onChange={e=>setForm({...form,councilAcronym:e.target.value})} placeholder="CRM"/><input value={form.registrationNumber} onChange={e=>setForm({...form,registrationNumber:e.target.value})} placeholder="Número"/></div></label><label>Local/organização<input value={form.organizationName} onChange={e=>setForm({...form,organizationName:e.target.value})}/></label></>:<><label>Categoria<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{categories.map(item=><option key={item}>{item}</option>)}</select></label><label>Endereço<input value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/></label><label>CNES ou código de referência<input value={form.cnesCode} onChange={e=>setForm({...form,cnesCode:e.target.value})}/></label></>}<label>Cidade<select value={form.cityName} onChange={e=>setForm({...form,cityName:e.target.value})}><option value="">Regional / não definida</option>{cities.map(item=><option key={item}>{item}</option>)}</select></label><label>Telefone público<input value={form.publicPhone} onChange={e=>setForm({...form,publicPhone:e.target.value})}/></label>{entity==="professional"&&<label>WhatsApp<input value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})}/></label>}<label>Resumo<textarea rows={3} value={form.summary} onChange={e=>setForm({...form,summary:e.target.value})}/></label><label>Serviços <small>Separe por vírgulas</small><textarea rows={3} value={form.services} onChange={e=>setForm({...form,services:e.target.value})}/></label><label>Status<select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option value="draft">Rascunho</option><option value="review">Enviar para revisão</option><option value="published">Publicar</option><option value="archived">Arquivar</option></select></label>{error&&<p className="cms-error">{error}</p>}<button className="cms-submit" type="submit">{editingId?"Atualizar cadastro":"Salvar cadastro"}</button></form></div></div>
}
