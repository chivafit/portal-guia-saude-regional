"use client";

import { useState } from "react";
import { cities, professions } from "@/lib/data";

const categories = ["Clínica multiprofissional", "Laboratório", "Diagnóstico por imagem", "Clínica odontológica", "Farmácia", "Ótica", "Estética e bem-estar", "Academia e atividade física", "Home care"];

export function InclusionForm() {
  const [sent,setSent]=useState(false);
  const [error,setError]=useState("");
  const [form,setForm]=useState({entityType:"professional",name:"",category:"Médico",cityName:"",contactName:"",contactEmail:"",contactPhone:"",message:""});
  async function submit(event:React.FormEvent){event.preventDefault();setError("");const response=await fetch("/api/inclusao",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});if(!response.ok){const data=await response.json().catch(()=>null);setError(data?.error||"Não foi possível enviar.");return}setSent(true)}
  if(sent)return <div className="inclusion-success"><strong>Solicitação enviada.</strong><p>A equipe do Guia Saúde recebeu seus dados e poderá entrar em contato para validação antes de qualquer publicação.</p></div>;
  const options=form.entityType==="professional"?professions:categories;
  return <form className="inclusion-form" onSubmit={submit}><label>Tipo de cadastro<select value={form.entityType} onChange={e=>setForm({...form,entityType:e.target.value,category:e.target.value==="professional"?"Médico":"Clínica multiprofissional"})}><option value="professional">Profissional</option><option value="organization">Empresa ou serviço</option></select></label><label>{form.entityType==="professional"?"Nome público do profissional":"Nome da empresa ou serviço"}<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>{form.entityType==="professional"?"Categoria profissional":"Categoria da empresa"}<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{options.map(item=><option key={item}>{item}</option>)}</select></label><label>Cidade<select value={form.cityName} onChange={e=>setForm({...form,cityName:e.target.value})}><option value="">Selecione</option>{cities.map(item=><option key={item}>{item}</option>)}</select></label><label>Responsável pelo contato<input required value={form.contactName} onChange={e=>setForm({...form,contactName:e.target.value})}/></label><label>Telefone/WhatsApp<input required value={form.contactPhone} onChange={e=>setForm({...form,contactPhone:e.target.value})}/></label><label>E-mail<input type="email" value={form.contactEmail} onChange={e=>setForm({...form,contactEmail:e.target.value})}/></label><label>Observações<textarea rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Especialidade, serviços, endereço, Instagram ou outras informações úteis."/></label>{error&&<p className="cms-error">{error}</p>}<button type="submit">Enviar solicitação</button></form>
}
