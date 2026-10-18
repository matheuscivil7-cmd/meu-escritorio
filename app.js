/* Pauta Jurídica · interface */
(function(){
"use strict";
const P = window.Pauta;
const {$, esc, iso, parse, addDays, fmt, fmtCurto, hoje, diffDias, pad, toast, AREAS, FASES, TIPOS, DOC_STATUS, MESES} = P;

/* ---------- ícones ---------- */
const sv = (d, extra="") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
const ICON = {
  inicio: sv('<path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1h-5v-6h-5v6h-5a1 1 0 0 1-1-1z"/>'),
  agenda: sv('<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>'),
  processos: sv('<path d="M4 4h6l2 2h8v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>'),
  clientes: sv('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.8.7 3 2.5 3.5 5.2"/>'),
  minutas: sv('<path d="M6 2.5h9l4 4v15H6z"/><path d="M14.5 2.5v4.5H19M9 12h7M9 15.5h7M9 19h4"/>'),
  daily: sv('<path d="M4 5h13v14a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2z"/><path d="M17 9h3v10a2 2 0 0 1-2 2M8 9h5M8 13h5M8 17h3"/>'),
  relatorios: sv('<path d="M6 2.5h9l4 4v15H6z"/><path d="M14.5 2.5v4.5H19M9.5 17v-3M12.5 17v-6M15.5 17v-4"/>'),
  equipe: sv('<path d="M12 3 4.5 6v5c0 4.7 3.2 8.6 7.5 10 4.3-1.4 7.5-5.3 7.5-10V6z"/><path d="m9 12 2 2 4-4"/>'),
  portal: sv('<path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z"/><path d="M9 21v-6h6v6"/>'),
  mais: sv('<rect x="4" y="4" width="6.5" height="6.5" rx="2"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="2"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="2"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2"/>'),
  plus: sv('<path d="M12 5v14M5 12h14"/>','stroke-width="2"'),
  x: sv('<path d="M6 6l12 12M18 6L6 18"/>','stroke-width="2"'),
  arrow: sv('<path d="M5 12h14M13 6l6 6-6 6"/>','stroke-width="2.2"'),
  search: sv('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>','stroke-width="2"'),
  gavel: sv('<path d="m14 4 6 6M11.5 6.5l6 6M13 5l-5 5 6 6 5-5M10.5 12.5 4 19M3 21h9"/>'),
  scan: sv('<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M7 12h10"/>'),
  send: sv('<path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/>'),
  mail: sv('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>'),
  wa: sv('<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.4-1.6-1-2-2l1-1-1-2z"/>'),
  pdf: sv('<path d="M6 2.5h9l4 4v15H6z"/><path d="M14.5 2.5v4.5H19M12 11v6M9.5 14.5 12 17l2.5-2.5"/>'),
  copy: sv('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>'),
  sair: sv('<path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 8l-4 4 4 4M6 12h10"/>'),
  refresh: sv('<path d="M20 11a8 8 0 0 0-14.9-3M4 4v4h4M4 13a8 8 0 0 0 14.9 3M20 20v-4h-4"/>'),
  ia: sv('<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8zM5 15l.6 1.4L7 17l-1.4.6L5 19l-.6-1.4L3 17l1.4-.6z"/>'),
  assistente: sv('<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/>'),
  cnj: sv('<path d="M4 6h16M4 12h10M4 18h7"/><path d="m15 17 2 2 4-4"/>'),
  paleta: sv('<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.7-1.7h2a4.6 4.6 0 0 0 4.6-4.6C21 6.4 17 3 12 3z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10.5" cy="7" r="1.2"/><circle cx="15.5" cy="7.5" r="1.2"/>'),
  arrowL: sv('<path d="M19 12H5M11 6l-6 6 6 6"/>','stroke-width="2.2"'),
  painel: sv('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
  financeiro: sv('<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/>'),
  atendimentos: sv('<path d="M4 5h16v11H8l-4 3.5z"/><path d="M8 9.5h8M8 12.5h5"/>'),
  calculadoras: sv('<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M8 6.5h8M8 11h1M11.5 11h1M15 11h1M8 14.5h1M11.5 14.5h1M15 14.5h1M8 18h1M11.5 18h4.5"/>'),
  calc: sv('<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M8 6.5h8M8 11h1M11.5 11h1M15 11h1M8 14.5h1M11.5 14.5h1M15 14.5h1M8 18h1M11.5 18h4.5"/>'),
  pecas: sv('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 15.5h5M4 7v14h11" />'),
  direito: sv('<path d="M12 3v18M7 21h10M4 7h16M4 7l-2.5 6a3 3 0 0 0 5 0zM20 7l-2.5 6a3 3 0 0 0 5 0z"/>'),
  ajustes: sv('<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>')
};

/* ---------- estado ---------- */
const S = {perfil:null, escritorio:null, perfis:[], clientes:[], processos:[], andamentos:[], documentos:[], tarefas:[], revisoes:[], comunicacoes:[], modelos:[], financeiro:[], atendimentos:[], portal:null, daily:[], pedidos:[]};
const RAW = {};
let api = null, view = "inicio", ultimaView = "", filtroArea = "todas", busca = "", verConcluidas = false, escopoAgenda = "todos", modal = null;
const M = {arquivo:"", texto:"", itens:[], lado:"", destinatario:"", titulo:"", colar:"", quem:"cliente", tom:"equilibrado", carregando:false, erro:"", ia:false, resumo:""};
const D = {area:"todas", dia:""};
const L = {pane:"entrar", ferramenta:"", motivo:"", erro:"", carregando:true, entrando:false, chat:[], chatInput:"", chatOcupado:false,
  calc:{area:"civel", inicio:P.hoje(), dias:15, contagem:"auto", djen:true, suspende:true}, cnj:"", doc:null, docNome:"", docPergunta:"", docIA:null, docOcupado:false, docErro:"", papelPedido:"advogado", nomeEsc:""};
const CH = {msgs:[], input:"", ocupado:false, pend:{}};
const DG = {area:"todas", termo:"", aberto:"", juris:""};
let LOGO_TMP = null;
Object.assign(L, {tela:"entrar", token:"", convite:null, erroForm:"", msg:"", enviando:false, emailDigitado:""});
S.convites = [];

/* ---------- permissões ---------- */
const pode = k => { const p = S.perfil; return !!p && p.status==="ativo" && p.papel!=="cliente" && (p.papel==="gestor" || !!(p.permissoes||{})[k]); };
const ehCliente = () => S.perfil && S.perfil.papel==="cliente";
const meuId = () => S.perfil && S.perfil.id;
const equipeAtiva = () => S.perfis.filter(p=>p.status==="ativo" && p.papel!=="cliente");
const nomePerfil = id => (S.perfis.find(p=>p.id===id)||{}).nome || "";
const procById = id => S.processos.find(p=>p.id===id);
const cliById = id => S.clientes.find(c=>c.id===id);
const nomeCliente = p => p ? (cliById(p.cliente_id)?.nome || "—") : "";
const areaDaTarefa = t => procById(t.processo_id)?.area || "";
const dataTrabalho = t => (t.tipo==="Prazo" && t.interno) ? t.interno : t.data;
const proximo = pid => S.tarefas.filter(t=>t.processo_id===pid && !t.done && t.data).sort((a,b)=>a.data.localeCompare(b.data))[0];
const andamentosDe = pid => S.andamentos.filter(a=>a.processo_id===pid).sort((a,b)=>(b.data||"").localeCompare(a.data||"") || (b.criado_em||"").localeCompare(a.criado_em||""));
const docsDe = pid => S.documentos.filter(a=>a.processo_id===pid).sort((a,b)=>(b.data||"").localeCompare(a.data||""));
const tarefasVisiveis = () => S.tarefas.filter(t=> escopoAgenda==="meus" ? t.atribuido_a===meuId() : true);

/* ---------- carga de dados ---------- */
async function iniciar(){
  const cfg = window.PAUTA_CONFIG || {};
  api = (cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase) ? P.criarSupabase(cfg.supabaseUrl, cfg.supabaseAnonKey) : P.criarDemo();
  envolverApi();
  api.aoMudarAuth((ev)=>{ if(ev==="PASSWORD_RECOVERY") abrirModal({kind:"novaSenha"}); });
  const prm = new URLSearchParams(location.search);
  L.portalMode = prm.has("portal");
  const codAt = prm.get("atendimento");
  if(codAt){ let e = null; try{ e = await api.rpc("escritorio_publico", {c:codAt}); }catch(_){ } L.atend = {codigo:codAt, esc:e||{}}; }
  const tok = prm.get("convite");
  if(tok){ L.token = tok; try{ L.convite = await api.verConvite(tok); }catch(e){ L.convite = null; } if(!L.convite) L.convite = {invalido:true}; }
  api.daily().then(d=>{ S.daily = d||[]; if(!S.perfil || !$("#main")) mostrarInicio(); else if(view==="daily") render(); }).catch(()=>{ S.daily = []; });
  await identificar();
}
async function identificar(){
  L.carregando = true; mostrarInicio();
  let r = {};
  try{ r = await api.meuPerfil(); }catch(e){ r = {motivo:"erro", erro:P.erroAmigavel(e)}; }
  S.escritorio = r.escritorio || null; P.escritorio = S.escritorio;
  const temaEsc = S.escritorio && S.escritorio.config && S.escritorio.config.tema;
  if(temaEsc && !P.carregarTemaLocal()) P.aplicarTema(temaEsc);
  const bloqueado = r.perfil && r.perfil.status!=="ativo";
  S.perfil = r.perfil && !bloqueado ? r.perfil : null;
  L.motivo = bloqueado ? "bloqueado" : (r.motivo||""); L.erro = r.erro||"";
  L.carregando = false; mostrarInicio();
  if(S.perfil && ehCliente() && !L.atend) await entrarNoApp();
}
async function entrarNoApp(){
  if(!S.perfil || L.entrando) return;
  if(L.token){ L.token = ""; L.convite = null; history.replaceState(null, "", location.pathname); }
  L.entrando = true; mostrarInicio();
  if(ehCliente()){ try{ S.portal = await api.portal(); }catch(e){ S.portal = null; } view = "portal"; L.entrando = false; montarShell(); render(); return; }
  view = "inicio";
  await Promise.all(P.TABELAS.map(t=>recarregar(t, true)));
  if(pode("gerenciar_equipe")) await recarregar("convites", true);
  api.ouvir(t=>agendarRecarga(t));
  L.entrando = false;
  montarShell(); render();
}
function voltarAoInicio(){ fecharModal(); view = "inicio"; ultimaView = ""; L.pane = "entrar"; L.ferramenta = ""; mostrarInicio(); window.scrollTo(0,0); }
async function sairDaConta(){ if(ehCliente()) L.portalMode = true; fecharModal(); try{ await api.sair(); }catch(e){} S.perfil = null; L.tela = "entrar"; L.msg = ""; view = "inicio"; await identificar(); }
function filtrar(){
  const me = meuId(), todos = pode("ver_todos_processos"), agenda = pode("ver_agenda_equipe");
  S.perfis = (RAW.perfis||[]).slice();
  const eu = S.perfis.find(p=>p.id===me);
  if(eu && S.perfil && S.perfil.papel!=="gestor") S.perfil = Object.assign({}, eu, {id:me});
  S.tarefas = (RAW.tarefas||[]).filter(t=> agenda || t.atribuido_a===me || t.criado_por===me);
  const minhas = new Set((RAW.tarefas||[]).filter(t=>t.atribuido_a===me).map(t=>t.processo_id));
  S.processos = (RAW.processos||[]).filter(p=> todos || p.responsavel_id===me || minhas.has(p.id));
  const ids = new Set(S.processos.map(p=>p.id));
  S.andamentos = (RAW.andamentos||[]).filter(a=>ids.has(a.processo_id));
  S.documentos = (RAW.documentos||[]).filter(a=>ids.has(a.processo_id));
  const cli = new Set(S.processos.map(p=>p.cliente_id));
  S.clientes = (RAW.clientes||[]).filter(c=> pode("gerenciar_clientes") || todos || cli.has(c.id));
  S.revisoes = pode("revisar_minutas") ? (RAW.revisoes||[]) : [];
  S.comunicacoes = pode("enviar_cliente") ? (RAW.comunicacoes||[]) : [];
  S.modelos = (RAW.modelos||[]).slice();
  S.financeiro = pode("financeiro") ? (RAW.financeiro||[]) : [];
  S.atendimentos = (pode("atendimentos")||pode("gerenciar_clientes")) ? (RAW.atendimentos||[]) : [];
}
async function recarregar(t, silencioso){
  if(t==="escritorios"){ const r = await api.meuPerfil().catch(()=>null); if(r && r.escritorio){ S.escritorio = r.escritorio; P.escritorio = r.escritorio; } if(!silencioso) agendarRender(true); return; }
  if(t==="pedidos") return;
  if(t==="convites"){ if(pode("gerenciar_equipe")){ try{ S.convites = await api.convites(); }catch(e){} } if(!silencioso) agendarRender(true); return; }
  try{ RAW[t] = await api.carregar(t) || []; }catch(e){ RAW[t] = RAW[t] || []; }
  filtrar();
  if(t==="perfis" && S.perfil && S.perfil.papel!=="gestor"){ const eu = S.perfis.find(p=>p.id===meuId()); if(!eu || eu.status==="bloqueado"){ S.perfil = null; L.motivo = eu ? "bloqueado" : "sem_cadastro"; voltarAoInicio(); return; } }
  if(!silencioso) agendarRender(true);
}
const _pend = new Set(); let _tm = 0;
function agendarRecarga(t){ _pend.add(t); clearTimeout(_tm); _tm = setTimeout(async()=>{ const ts = [..._pend]; _pend.clear(); for(const x of ts) await recarregar(x, true); if(ehCliente()){ try{ S.portal = await api.portal(); }catch(e){} } agendarRender(true); }, 250); }
let _rq = false;
function agendarRender(dados){ if(_rq) return; _rq = true; requestAnimationFrame(()=>{ _rq = false; render(dados); }); }

/* portal do cliente: a equipe publica uma cópia só com o que o cliente pode ver, na pasta privada da conta dele */
const _sync = new Set(); let _syncT = 0;
function sincronizarCliente(cid){
  if(!cid) return; _sync.add(cid); clearTimeout(_syncT);
  _syncT = setTimeout(async()=>{
    const ids = [..._sync]; _sync.clear();
    for(const t of ["clientes","processos","andamentos","documentos","tarefas"]){ try{ RAW[t] = await api.carregar(t); }catch(e){} }
    for(const id of ids){ const c = (RAW.clientes||[]).find(x=>x.id===id); if(!c || !c.conta_id) continue;
      try{ await api.salvarPortal(c.conta_id, P.montarPortal({escritorio:S.escritorio, cliente:c, processos:RAW.processos||[], andamentos:RAW.andamentos||[], documentos:RAW.documentos||[], tarefas:RAW.tarefas||[]})); }catch(e){ console.warn("portal", e); } }
    filtrar();
  }, 1200);
}
function sincronizarTodos(){ (RAW.clientes||[]).filter(c=>c.conta_id).forEach(c=>sincronizarCliente(c.id)); }
function envolverApi(){
  const ins = api.inserir, upd = api.atualizar, del = api.excluir;
  const cliDe = (t, id, row) => {
    if(t==="clientes") return id;
    if(t==="processos") return (row && row.cliente_id) || (RAW.processos||[]).find(p=>p.id===id)?.cliente_id;
    if(["andamentos","documentos","tarefas"].includes(t)){ const pid = (row && row.processo_id) || (RAW[t]||[]).find(x=>x.id===id)?.processo_id; return (RAW.processos||[]).find(p=>p.id===pid)?.cliente_id; }
    return null;
  };
  api.inserir = async (t,row) => { const r = await ins.call(api,t,row); sincronizarCliente(cliDe(t,r.id,r)); return r; };
  api.atualizar = async (t,id,patch) => { const antes = cliDe(t,id,null); const r = await upd.call(api,t,id,patch); sincronizarCliente(antes); sincronizarCliente(cliDe(t,id,patch)); return r; };
  api.excluir = async (t,id) => { const antes = cliDe(t,id,null); await del.call(api,t,id); sincronizarCliente(antes); };
}

/* ---------- TELA INICIAL: login no centro, ferramentas livres e Daily ---------- */
const FERRAMENTAS = [
  ["duvidas","Dúvidas jurídicas","Pergunte e receba a regra, a lei e as súmulas","assistente"],
  ["direito","Direito geral","Jurisprudência, súmulas, temas e leis","gavel"],
  ["prazos","Calculadora de prazos","CPC, CLT e CPP com feriados","agenda"],
  ["cnj","Conferir número de processo","Valida e identifica o tribunal","cnj"],
  ["documento","Ler documento","Acha prazos, audiências e números no PDF ou Word","scan"],
  ["calculadoras","Calculadoras","Atualização de valores e verbas rescisórias","calc"]
];
function mostrarInicio(){
  const ativo = L.ferramenta;
  const tabs = [["entrar","Entrar","inicio"],["ferramentas","Ferramentas","mais"],["daily","Daily","daily"]];
  const paneAtual = L.pane==="ferramenta" ? "ferramentas" : L.pane;
  const soLogin = !!(L.atend || L.portalMode || (L.convite && L.convite.papel==="cliente"));
  $("#root").innerHTML = `<div class="landing${soLogin?" so-login":""}" data-pane="${soLogin?"entrar":L.pane}">
    <header class="land-top"><div class="brand"><div class="logo">§</div><div><b>Pauta</b><small>${esc(S.escritorio?.nome || "Jurídica")}</small></div></div>
      <div class="row">${S.perfil && !L.carregando ? `<button class="btn primary" data-act="entrar" ${L.entrando?"disabled":""}>${L.entrando?`<span class="spinner"></span>`:ehCliente()?"Meus processos":"Entrar"}</button>`:""}<button class="icon-btn" data-act="aparencia" aria-label="Aparência" title="Aparência">${ICON.paleta}</button></div></header>
    <aside class="land-tools"><h3>Use sem entrar</h3>
      ${FERRAMENTAS.map(([k,t,d,ic])=>`<button class="tool-btn" data-act="ferramenta" data-f="${k}" aria-current="${ativo===k}"><span class="ic">${ICON[ic]}</span><span><b>${t}</b><span>${d}</span></span></button>`).join("")}
      <div class="land-note">As ferramentas livres não guardam nada. Processos, clientes e agenda ficam na área do escritório, depois de entrar.</div></aside>
    <section class="land-center">${L.atend ? formAtendimento() : ativo && !soLogin ? vFerramenta() : cartaoLogin()}</section>
    <aside class="land-daily">${listaDaily(true)}</aside>
    <nav class="land-tabs" aria-label="Navegação">${tabs.map(([k,l,ic])=>`<button data-act="pane" data-p="${k}" aria-current="${paneAtual===k}"><span class="pill">${ICON[ic]}</span>${l}</button>`).join("")}</nav>
  </div>`;
}
function cartaoLogin(){
  const eu = api ? api.eu : {};
  const quem = (nome, sub) => `<div class="who"><span class="avatar">${esc(P.iniciais(nome))}</span><div style="min-width:0"><b style="display:block">${esc(nome||"")}</b><span class="small muted">${sub}</span></div></div>`;
  const erro = L.erroForm ? `<div class="err">${esc(L.erroForm)}</div>` : "", okm = L.msg ? `<div class="okmsg">${esc(L.msg)}</div>` : "";
  const btn = (t) => `<button class="btn primary block" type="submit" ${L.enviando?"disabled":""}>${L.enviando?`<span class="spinner"></span>`:t}</button>`;
  let corpo = "";
  const cv = L.convite;
  if(L.carregando) corpo = `<h1>Entrar</h1><div class="row muted"><span class="spinner"></span> Carregando…</div>`;
  else if(S.perfil) corpo = `<h1>${ehCliente()?"Seus processos":"Bem-vindo de volta"}</h1>
      ${quem(S.perfil.nome, esc(P.PAPEIS[S.perfil.papel]||"") + (S.escritorio?.nome?" · "+esc(S.escritorio.nome):""))}
      <button class="btn primary block" data-act="entrar" ${L.entrando?"disabled":""}>${L.entrando?`<span class="spinner"></span> Abrindo…`:ehCliente()?"Ver meus processos":"Entrar no escritório"}</button>
      <button class="linkbtn" data-act="sair-conta">${api.modo==="demo"?"Trocar de perfil":"Sair desta conta"}</button>`;
  else if(L.motivo==="bloqueado") corpo = `<h1>Acesso suspenso</h1><p class="muted" style="margin:0">Seu acesso foi suspenso pelo gestor do escritório.</p><button class="linkbtn" data-act="sair-conta">Sair desta conta</button>`;
  else if(L.motivo==="sem_perfil") corpo = `<h1>Conta sem escritório</h1><p class="muted" style="margin:0">Esta conta não está ligada a nenhum escritório. Peça um novo link de convite.</p><button class="linkbtn" data-act="sair-conta">Sair desta conta</button>`;
  else if(api.modo==="demo") corpo = `<h1>Entrar</h1><p class="muted" style="margin:0">Demonstração: o Supabase ainda não foi configurado. Escolha um perfil para ver o app como cada tipo de usuário.</p>
    <div class="demo-users">${api.usuariosDemo.map(u=>`<button class="demo-user" data-act="demo-login" data-id="${u.id}"><b>${esc(u.rotulo)}</b><span>${esc(u.nome)}</span></button>`).join("")}</div>`;
  else if(cv && L.tela!=="entrar-convite") corpo = cv.invalido || !cv.valido ? `<h1>Convite indisponível</h1><p class="muted" style="margin:0">${cv.usado?"Este link já foi usado. Se a conta é sua, entre com seu e-mail e senha.":"Este link de convite é inválido ou expirou. Peça um novo ao escritório."}</p><button class="btn block" data-act="auth-tela" data-t="entrar-convite">Ir para o login</button>`
    : `<span class="ia-tag">Convite</span><h1>${esc(cv.escritorio||"Escritório")}</h1><p class="muted" style="margin:0">Você foi convidado como <b class="gold">${esc(P.PAPEIS[cv.papel]||"")}</b>. Crie sua senha para entrar.</p>
      <form id="f-convite" class="auth-card" style="gap:12px">
        <label class="f">Nome completo<input type="text" id="cv-nome" required value="${esc(cv.nome||"")}" autocomplete="name"></label>
        <label class="f">E-mail<input type="email" id="cv-email" required value="${esc(cv.email||"")}" ${cv.email?"readonly":""} autocomplete="username"></label>
        <label class="f">Celular<input type="tel" id="cv-tel" placeholder="(11) 90000-0000" autocomplete="tel"></label>
        <label class="f">Crie uma senha<input type="password" id="cv-senha" required minlength="6" autocomplete="new-password"><span class="hint">Mínimo de 6 caracteres.</span></label>
        ${erro}${okm}${btn("Criar acesso e entrar")}
        <button type="button" class="linkbtn" data-act="auth-tela" data-t="entrar-convite">Já tenho conta</button></form>`;
  else if(L.tela==="criar") corpo = `<h1>Criar escritório</h1><p class="muted" style="margin:0">Você será o gestor. Depois, convide a equipe e os clientes com links de acesso.</p>
      <form id="f-criar" class="auth-card" style="gap:12px">
        <label class="f">Nome do escritório<input type="text" id="cr-esc" required placeholder="Ex.: Lima & Reis Advocacia"></label>
        <label class="f">Seu nome<input type="text" id="cr-nome" required autocomplete="name"></label>
        <label class="f">E-mail<input type="email" id="cr-email" required autocomplete="username"></label>
        <label class="f">Senha<input type="password" id="cr-senha" required minlength="6" autocomplete="new-password"></label>
        ${erro}${okm}${btn("Criar escritório")}
        <button type="button" class="linkbtn" data-act="auth-tela" data-t="entrar">Já tenho conta</button></form>`;
  else if(L.tela==="recuperar") corpo = `<h1>Recuperar senha</h1><p class="muted" style="margin:0">Enviaremos um link para criar uma nova senha.</p>
      <form id="f-recuperar" class="auth-card" style="gap:12px"><label class="f">E-mail<input type="email" id="rc-email" required autocomplete="username"></label>${erro}${okm}${btn("Enviar link")}
      <button type="button" class="linkbtn" data-act="auth-tela" data-t="entrar">Voltar para o login</button></form>`;
  else corpo = `<h1>Entrar</h1><p class="muted" style="margin:0">Use o e-mail e a senha do seu acesso.</p>
      <form id="f-login" class="auth-card" style="gap:12px" autocomplete="on">
        <label class="f">E-mail<input type="email" id="lg-email" required autocomplete="username" value="${esc(L.emailDigitado||"")}"></label>
        <label class="f">Senha<input type="password" id="lg-senha" required autocomplete="current-password"></label>
        ${erro}${okm}${btn("Entrar")}
        <div class="row" style="justify-content:space-between"><button type="button" class="linkbtn" data-act="auth-tela" data-t="recuperar">Esqueci a senha</button><button type="button" class="linkbtn" data-act="auth-tela" data-t="criar">Criar escritório</button></div></form>`;
  return `<div style="width:100%;max-width:460px;display:flex;flex-direction:column;gap:14px"><div class="login-card">${corpo}</div>
    <p class="hint" style="text-align:center;margin:0">Equipe e clientes entram pelo link de convite que o gestor gera, já com a função e os acessos definidos.</p></div>`;
}
function listaDaily(lateral){
  const eds = S.daily || [];
  const ed = (D.dia && eds.find(e=>e.id===D.dia)) || eds[0];
  const chips = [["todas","Todas"],["trabalhista","Trabalhista"],["civel","Cível"],["criminal","Criminal"],["tribunais","Tribunais"]];
  let itens = ed ? (ed.itens||[]) : [];
  if(D.area!=="todas") itens = itens.filter(i=>i.area===D.area || (i.areas||[]).includes(D.area));
  const sigla = f => String(f||"?").replace(/[^A-Za-zÀ-ú ]/g," ").trim().split(/\s+/).filter(w=>w.length>2||/^[A-Z]{2,}$/.test(w)).slice(0,2).map(w=>w[0]).join("").toUpperCase() || "§";
  const quando = d => { if(!d) return ""; const t = Date.parse(d); if(isNaN(t)) return ""; const min = Math.round((Date.now()-t)/60000); return min<60 ? `há ${Math.max(min,1)} min` : min<1440 ? `há ${Math.round(min/60)} h` : new Date(t).toLocaleDateString("pt-BR",{day:"2-digit",month:"short"}); };
  const item = i => { const tag = i.link ? "a" : "div"; const ar = i.area && i.area!=="geral" ? i.area : "";
    const thumb = `<span class="thumb ${ar}"><span class="sg">${esc(sigla(i.fonte))}</span>${i.imagem?`<img src="${esc(i.imagem)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">`:""}</span>`;
    return `<${tag} class="daily-item" ${i.link?`href="${esc(i.link)}" target="_blank" rel="noopener"`:""}>${thumb}
      <span class="di-txt"><span class="src"><b>${esc(i.fonte||"")}</b>${ar?`<span class="chip ${ar}">${ar==="tribunais"?"Tribunais":AREAS[ar]?.nome||esc(ar)}</span>`:""}${quando(i.data)?`<span class="muted">${quando(i.data)}</span>`:""}</span>
      <b class="di-tit">${esc(i.titulo)}</b>${i.resumo?`<span class="di-res">${esc(i.resumo)}</span>`:""}</span></${tag}>`; };
  return `<div class="daily-head"><div class="dh"><h2 style="font-size:1.1rem">Daily jurídico</h2><span class="small muted">${ed?esc(new Date(ed.id+"T12:00:00").toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})):""}${ed?` · ${itens.length} notícia(s)`:""}</span></div>
    <div class="daily-chips">${chips.map(([k,l])=>`<button data-act="daily-area" data-a="${k}" aria-pressed="${D.area===k}">${l}</button>`).join("")}</div></div>
    <div class="daily-list">
    ${!ed?`<div class="empty small" style="padding:20px 6px"><p>Carregando as notícias do dia…</p></div>`:itens.length?itens.map(item).join(""):`<div class="empty small" style="padding:20px 6px"><p>Nenhuma notícia desta área hoje.</p></div>`}
    ${ed && !lateral && eds.length>1?`<label class="f" style="margin-top:8px">Edições anteriores<select id="daily-dia">${eds.map(e=>`<option value="${e.id}" ${e.id===ed.id?"selected":""}>${P.fmt(e.id)}</option>`).join("")}</select></label>`:""}
    ${ed?`<p class="hint" style="padding:0 6px;margin:4px 0 0">Resumos curtos; a matéria completa abre no site de origem.</p>`:""}</div>`;
}
/* ---------- ferramentas livres ---------- */
const TJ = ["","AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SE","SP","TO"];
function vFerramenta(){
  const f = L.ferramenta, voltar = `<button class="btn ghost" data-act="ferramenta-fechar">${ICON.arrowL} Voltar ao login</button>`;
  if(f==="duvidas") return `<div class="tool-view">${chatHTML({msgs:L.chat, input:L.chatInput, idIn:"chat-in", bind:"L.chatInput", act:"chat", titulo:"Dúvidas jurídicas", sub:"Pergunte com suas palavras. A resposta traz a regra, o prazo e o fundamento legal.", voltar, sug:["Quais verbas são devidas na demissão sem justa causa?","Qual o prazo da apelação?","Como conto prazo publicado no DJEN?","Quando cabe ANPP?"]})}</div>`;
  if(f==="direito") return `<div class="tool-view">${vDireito(voltar)}</div>`;
  if(f==="calculadoras") return `<div class="tool-view">${vCalculadoras(voltar)}</div>`;
  if(f==="assistente-ia"){
    const sug = ["Quais verbas são devidas na rescisão sem justa causa?","Como funciona a contagem de prazo em dias úteis no CPC?","Diferença entre apelação e agravo de instrumento","O que é prescrição intercorrente?"];
    return `<div class="tool-view"><div class="head"><div><span class="ia-tag">${ICON.ia} Inteligência artificial</span><h1>Assistente jurídico</h1><div class="sub">Dúvidas gerais de Direito. Não cole dados de clientes aqui.</div></div>${L.chat.length?`<button class="btn ghost" data-act="chat-limpar">Nova conversa</button>`:voltar}</div>
      <div class="chat">${!L.chat.length?`<div class="panel"><div class="empty"><h2>Pergunte qualquer dúvida jurídica</h2><p>Respostas com fundamento legal e passos práticos. Confira sempre leis e julgados na fonte oficial.</p><div class="pickchips" style="justify-content:center">${sug.map(s=>`<button data-act="chat-sug" data-q="${esc(s)}">${esc(s)}</button>`).join("")}</div></div></div>`:""}
      ${L.chat.map(m=>m.role==="user"?`<div class="msg user">${esc(m.content)}</div>`:`<div class="msg bot answer">${P.md(m.content)||`<span class="spinner"></span>`}</div>`).join("")}<div id="chat-fim"></div></div>
      <div class="composer"><textarea id="chat-in" rows="1" data-bind="L.chatInput" placeholder="Escreva sua dúvida">${esc(L.chatInput)}</textarea><button class="btn primary" data-act="chat-enviar" ${L.chatOcupado?"disabled":""}>${L.chatOcupado?`<span class="spinner"></span>`:"Enviar"}</button></div></div>`;
  }
  if(f==="prazos"){
    const c = L.calc, cont = c.contagem!=="auto" ? c.contagem : AREAS[c.area].contagem;
    const r = P.calcPrazo({inicio:c.inicio, dias:Number(c.dias), contagem:cont, djen:c.djen, suspende:c.suspende});
    return `<div class="tool-view"><div class="head"><div><h1>Calculadora de prazos</h1><div class="sub">Dias úteis no cível e no trabalhista, corridos no criminal. Feriados nacionais, Carnaval, Corpus Christi e recesso de 20/12 a 20/01 já entram na conta.</div></div>${voltar}</div>
      <div class="panel"><div class="panel-b" style="display:flex;flex-direction:column;gap:14px">
        <div class="seg" role="group" aria-label="Área">${Object.entries(AREAS).map(([k,v])=>`<button data-act="calc-area" data-a="${k}" aria-pressed="${c.area===k}">${v.nome} · ${v.lei}</button>`).join("")}</div>
        <div><span class="hint">Prazos comuns:</span><div class="pickchips" style="margin-top:6px">${P.PRAZOS_COMUNS[c.area].map(([n,d])=>`<button data-act="calc-dias" data-d="${d}">${esc(n)} · ${d}d</button>`).join("")}</div></div>
        <div class="grid3"><label class="f">Data da intimação<input type="date" id="cl-inicio" data-calc="inicio" value="${esc(c.inicio)}"></label><label class="f">Prazo (dias)<input type="number" min="1" max="365" id="cl-dias" data-calc="dias" value="${esc(c.dias)}"></label>
          <label class="f">Contagem<select id="cl-cont" data-calc="contagem">${opts([["auto","Pela área"],["uteis","Dias úteis"],["corridos","Dias corridos"]], c.contagem)}</select></label></div>
        <label class="check"><input type="checkbox" id="cl-djen" data-calc="djen" ${c.djen?"checked":""}> A data é a disponibilização no Diário Eletrônico (DJEN)</label>
        <label class="check"><input type="checkbox" id="cl-susp" data-calc="suspende" ${c.suspende?"checked":""}> Suspender no recesso forense (desmarque para réu preso ou urgência)</label>
        ${r?`<div class="calc"><div class="res"><div><span class="small muted">Começa a contar</span><b>${P.fmt(r.inicioContagem)}</b></div><div class="fatal"><span class="small muted">Prazo final</span><b>${P.fmt(r.fatal)}</b></div><div class="int"><span class="small muted">Sugestão de prazo interno</span><b>${P.fmt(P.prazoInterno(r.fatal,2))}</b></div></div>
          <div class="small muted">${c.dias} dia(s) ${cont==="uteis"?"úteis":"corridos"} (${AREAS[c.area].lei}). ${r.notas.map(esc).join(" ")}</div><div class="hint">Feriados estaduais, municipais e de tribunal não estão incluídos nesta ferramenta livre.</div></div>`:`<span class="small muted">Informe a data e o número de dias.</span>`}
      </div></div></div>`;
  }
  if(f==="cnj"){
    const i = P.cnjInfo(L.cnj), d = P.soDigitos(L.cnj);
    let trib = "";
    if(i.completo){ const tr = Number(d.slice(14,16)); trib = i.J==="8" ? "Tribunal de Justiça "+(TJ[tr]?"de "+TJ[tr]:"") : i.J==="5" ? (tr===0?"Tribunal Superior do Trabalho":`TRT da ${tr}ª Região`) : i.J==="4" ? (tr===0?"Conselho da Justiça Federal":`TRF da ${tr}ª Região`) : i.J==="6" ? "Tribunal Regional Eleitoral" : i.segmento; }
    const partes = i.completo ? [["NNNNNNN","Número sequencial do processo no ano",d.slice(0,7)],["DD","Dígito verificador",d.slice(7,9)],["AAAA","Ano em que o processo foi ajuizado",d.slice(9,13)],["J","Segmento da Justiça: "+i.segmento,d.slice(13,14)],["TR","Tribunal: "+trib,d.slice(14,16)],["OOOO","Unidade de origem (vara ou foro)",d.slice(16,20)]] : [];
    return `<div class="tool-view"><div class="head"><div><h1>Conferir número de processo</h1><div class="sub">Confere o dígito verificador do padrão CNJ e mostra o que cada parte do número significa.</div></div>${voltar}</div>
      <div class="panel"><div class="panel-b" style="display:flex;flex-direction:column;gap:14px">
        <label class="f">Número do processo<input type="text" id="cnj-in" class="mono" inputmode="numeric" value="${esc(L.cnj)}" placeholder="0000000-00.0000.0.00.0000" style="font-size:1.15rem;padding:14px"></label>
        ${!d.length?`<span class="hint">Digite ou cole os 20 dígitos.</span>`:!i.completo?`<span class="hint">${d.length}/20 dígitos.</span>`:`
        <div class="row">${i.valido?`<span class="chip ok" style="font-size:.85rem">Número válido</span>`:`<span class="chip danger" style="font-size:.85rem">Dígito verificador não confere</span>`}<b class="mono" style="font-size:1.05rem">${esc(i.formatado)}</b></div>
        <dl class="kv"><div><dt>Justiça</dt><dd>${esc(i.segmento)}</dd></div><div><dt>Tribunal</dt><dd>${esc(trib)}</dd></div><div><dt>Ano de ajuizamento</dt><dd>${esc(i.ano)}</dd></div></dl>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Parte</th><th>Valor</th><th>Significado</th></tr></thead><tbody>${partes.map(([k,s,v])=>`<tr style="cursor:default"><td class="mono">${k}</td><td class="mono gold">${v}</td><td>${esc(s)}</td></tr>`).join("")}</tbody></table></div>
        ${!i.valido?`<div class="notice">Um dígito errado é o motivo mais comum. Confira o número na intimação ou no site do tribunal.</div>`:""}`}
      </div></div></div>`;
  }
  if(f==="documento"){
    const a = L.doc ? P.analisarTexto(L.doc.texto) : null, x = L.docIA;
    return `<div class="tool-view"><div class="head"><div><h1>Ler documento</h1><div class="sub">Envie uma intimação, decisão, petição ou contrato. O texto é lido no seu próprio navegador, sem sair do aparelho, e o app aponta números de processo, prazos, audiências e valores.</div></div>${voltar}</div>
      <div class="dropzone" data-drop="livre"><span style="flex:1;min-width:200px"><b style="color:var(--ink)">Arraste o PDF ou Word aqui</b> ou escolha no aparelho. PDFs escaneados como imagem não têm texto para ler.</span><label class="btn primary" for="f-livre">Escolher arquivo</label><input type="file" id="f-livre" accept=".pdf,.docx,.txt" hidden data-file="livre">${L.docNome?`<span class="chip accent">${esc(L.docNome)}</span>`:""}</div>
      ${L.docErro?`<div class="err">${esc(L.docErro)}</div>`:""}
      ${a?`<div class="panel"><div class="panel-b" style="display:flex;flex-direction:column;gap:10px"><div class="row"><span class="chip accent">${esc(a.tipo)}</span>${a.numeros.map(n=>`<span class="chip neutral mono">${esc(n)}</span>`).join("")}${a.valores.map(v=>`<span class="chip neutral">${esc(v)}</span>`).join("")}${L.doc.comentarios.length?`<span class="chip warn">${L.doc.comentarios.length} comentário(s)</span>`:""}</div>
          ${a.prazos.map(p=>`<div class="small">Prazo de <b>${p.dias} dia(s)</b>${p.contagem?" "+(p.contagem==="uteis"?"úteis":"corridos"):""}: <span class="muted">“…${esc(p.trecho)}…”</span></div>`).join("")}
          ${a.audiencias.map(p=>`<div class="small">Audiência em <b>${P.fmt(p.data)}${p.hora?" às "+esc(p.hora):""}</b></div>`).join("")}
          ${!a.prazos.length && !a.audiencias.length?`<div class="small muted">Nenhum prazo ou audiência explícitos no texto.</div>`:""}
          ${P.temIA()?`<label class="f">Pergunta específica (opcional)<input type="text" id="doc-perg" data-bind="L.docPergunta" value="${esc(L.docPergunta)}" placeholder="Ex.: O que precisa ser feito e até quando?"></label>
          <div class="row" style="justify-content:flex-end"><button class="btn primary" data-act="doc-ia" ${L.docOcupado?"disabled":""}>${L.docOcupado?`<span class="spinner"></span> Lendo…`:ICON.ia+" Explicar com IA"}</button></div>`:""}
          <details><summary class="small muted" style="cursor:pointer">Ver texto extraído</summary><div class="pre" style="margin-top:8px">${esc(L.doc.texto.slice(0,6000))}</div></details></div></div>`:""}
      ${x?blocoIA(x, false):""}</div>`;
  }
  return "";
}
function blocoIA(x, comAcoes){
  const lista = (t, arr) => arr && arr.length ? `<div><h3 style="margin-bottom:6px">${t}</h3><ul style="margin:0;padding-left:20px">${arr.map(s=>`<li>${esc(s)}</li>`).join("")}</ul></div>` : "";
  return `<div class="ia-box"><span class="ia-tag">${ICON.ia} Leitura da IA · ${esc(x.tipo||"")}</span>
    <div>${esc(x.resumo||"")}</div>
    ${x.para_o_cliente?`<div class="notice"><b>Para explicar ao cliente:</b> ${esc(x.para_o_cliente)} <button class="linkbtn small" data-act="copiar-txt" data-t="${esc(x.para_o_cliente)}">Copiar</button></div>`:""}
    ${(x.prazos||[]).length?`<div><h3 style="margin-bottom:6px">Prazos</h3>${x.prazos.map((p,n)=>`<div class="row" style="justify-content:space-between;padding:6px 0;border-top:1px solid var(--line)"><span><b>${esc(p.descricao||"")}</b>${p.dias?` · ${p.dias} dia(s) ${p.contagem==="uteis"?"úteis":p.contagem==="corridos"?"corridos":""}`:""}${p.fundamento?`<span class="small muted"> · ${esc(p.fundamento)}</span>`:""}</span>${comAcoes&&p.dias?`<button class="btn" data-act="leitor-prazo-ia" data-i="${n}">Criar prazo</button>`:""}</div>`).join("")}</div>`:""}
    ${(x.audiencias||[]).length?`<div><h3 style="margin-bottom:6px">Audiências</h3>${x.audiencias.map((p,n)=>`<div class="row" style="justify-content:space-between;padding:6px 0;border-top:1px solid var(--line)"><span><b>${P.fmt(p.data)}${p.hora?" às "+esc(p.hora):""}</b> ${esc(p.descricao||"")} ${esc(p.modalidade||"")}</span>${comAcoes&&p.data?`<button class="btn" data-act="leitor-aud-ia" data-i="${n}">Agendar</button>`:""}</div>`).join("")}</div>`:""}
    ${lista("Próximos passos", x.providencias)}${lista("Atenção", x.riscos)}${lista("Valores", x.valores)}
    <span class="hint">Leitura automática: confira com o documento original antes de agir.</span></div>`;
}
/* ---------- shell ---------- */
function itensNav(){
  if(ehCliente()) return [["portal","Meus processos"]];
  const it = [["inicio","Início"],["agenda","Agenda"],["processos","Processos"]];
  if(pode("gerenciar_clientes")||pode("ver_todos_processos")) it.push(["clientes","Clientes"]);
  if(pode("revisar_minutas")) it.push(["minutas","Revisão de minuta"]);
  if(pode("gerenciar_equipe")) it.splice(1, 0, ["painel","Painel"]);
  if(pode("editar_processos")||pode("revisar_minutas")||pode("gerenciar_clientes")) it.push(["pecas","Peças e documentos"]);
  if(pode("atendimentos")||pode("gerenciar_clientes")) it.push(["atendimentos","Atendimentos"]);
  if(pode("financeiro")) it.push(["financeiro","Financeiro"]);
  it.push(["calculadoras","Calculadoras"]);
  it.push(["assistente","Assistente"]);
  it.push(["direito","Direito geral"]);
  it.push(["daily","Daily jurídico"]);
  if(pode("gerar_relatorios")||pode("enviar_cliente")) it.push(["relatorios","Relatórios"]);
  if(pode("gerenciar_equipe")) it.push(["equipe","Equipe e acessos"]);
  return it;
}
function montarShell(){
  $("#root").innerHTML = `<div class="app">
    <aside class="rail"><div class="brand"><div class="logo">§</div><div><b>Pauta</b><small id="office-name"></small></div></div>
      <nav class="navlist" id="nav" aria-label="Seções"></nav>
      <div class="rail-foot"><div class="me" data-act="perfil" role="button" tabindex="0"><span class="avatar" id="me-av"></span><div><b id="me-nome"></b><span id="me-papel"></span></div></div></div></aside>
    <main class="main"><div class="wrap" id="main"></div></main>
    <nav class="tabbar" id="tabbar" aria-label="Navegação"></nav></div>`;
}
function render(dados){
  if(!S.perfil || !$("#main")) return;
  const nav = itensNav();
  if(!nav.some(([k])=>k===view)) view = nav[0][0];
  $("#office-name").textContent = S.escritorio?.nome || "";
  $("#me-av").textContent = P.iniciais(S.perfil.nome); $("#me-nome").textContent = S.perfil.nome || ""; $("#me-papel").textContent = P.PAPEIS[S.perfil.papel] || "";
  const atr = S.tarefas.filter(t=>!t.done && t.data && t.data<hoje() && (escopoAgenda==="todos" || t.atribuido_a===meuId())).length;
  const pend = pode("gerenciar_equipe") ? S.pedidos.length : 0;
  const badge = k => k==="agenda" && atr ? `<span class="badge" title="Prazos vencidos">${atr}</span>` : k==="equipe" && pend ? `<span class="badge" title="Pedidos de acesso">${pend}</span>` : "";
  $("#nav").innerHTML = `<span class="ind"></span>` + nav.map(([k,l])=>`<button class="navbtn" data-act="nav" data-v="${k}" aria-current="${view===k}">${ICON[k]}<span>${l}</span>${badge(k)}</button>`).join("");
  const tb = ehCliente() ? [["portal","Processos"],["perfil","Conta"]] : [["inicio","Início"],["agenda","Agenda"],["processos","Processos"],["assistente","Assistente"],["mais","Mais"]];
  const extra = nav.map(([k])=>k).filter(k=>!tb.some(([x])=>x===k));
  $("#tabbar").style.setProperty("--n", tb.length);
  $("#tabbar").innerHTML = tb.map(([k,l])=>`<button data-act="${k==="mais"?"mais":k==="perfil"?"perfil":"nav"}" data-v="${k}" aria-current="${k==="mais"?extra.includes(view):view===k}"><span class="pill">${ICON[k]||ICON.ajustes}</span>${l}${badge(k)}${k==="mais"&&pend?`<span class="badge">${pend}</span>`:""}</button>`).join("");
  const vivo = ["inicio","agenda","processos","clientes","portal","equipe","relatorios","daily"].includes(view);
  const ae = document.activeElement;
  const editando = dados && ae && $("#main").contains(ae) && /INPUT|TEXTAREA|SELECT/.test(ae.tagName) && ae.id!=="busca";
  if((!dados || vivo) && !editando){
    const fn = {inicio:vInicio, agenda:vAgenda, processos:vProcessos, clientes:vClientes, minutas:vMinutas, assistente:vAssistente, pecas:vPecas, financeiro:vFinanceiro, atendimentos:vAtendimentos, calculadoras:()=>vCalculadoras(""), painel:vPainel, direito:()=>vDireito(""), daily:vDaily, relatorios:vRelatorios, equipe:vEquipe, portal:vPortal}[view];
    const main = $("#main");
    const foco = ae && ae.id==="busca" ? ae.selectionStart : null;
    main.innerHTML = (api.modo==="demo"?`<div class="banner">Demonstração fora do Claude: dados de exemplo, nada é salvo.</div>`:"") + fn();
    if(foco!==null){ const b = $("#busca"); if(b){ b.focus(); try{ b.setSelectionRange(foco,foco); }catch(_){} } }
    if(ultimaView !== view){ main.classList.remove("view-enter"); void main.offsetWidth; main.classList.add("view-enter"); ultimaView = view; }
    if(view==="assistente"){ const c = $("#chat-fim"); if(c) c.scrollIntoView({block:"end"}); }
  }
  posicionarIndicadores();
  if(modal && modal.vivo && dados) abrirModal(modal);
}
function moverInd(cont, alvo){
  const ind = cont && cont.querySelector(":scope > .ind"); if(!ind) return;
  if(!alvo){ ind.style.opacity = 0; return; }
  if(cont.classList.contains("navlist")){ ind.style.transform = `translateY(${alvo.offsetTop}px)`; ind.style.height = alvo.offsetHeight+"px"; }
  else { ind.style.transform = `translateX(${alvo.offsetLeft}px)`; ind.style.width = alvo.offsetWidth+"px"; }
  ind.style.opacity = 1;
}
function posicionarIndicadores(){ document.querySelectorAll(".navlist,.tabs").forEach(c=>moverInd(c, c.querySelector('[aria-current="true"],[aria-selected="true"]'))); }
let _hov = null;
document.addEventListener("mouseover", e=>{
  const b = e.target.closest && e.target.closest(".navlist .navbtn, .tabs button"); const c = b ? b.parentElement : null;
  if(_hov && _hov!==c) moverInd(_hov, _hov.querySelector('[aria-current="true"],[aria-selected="true"]'));
  if(c){ moverInd(c, b); _hov = c; } else _hov = null;
});
window.addEventListener("resize", posicionarIndicadores);
if(document.fonts && document.fonts.ready) document.fonts.ready.then(posicionarIndicadores);

const chipArea = a => a && AREAS[a] ? `<span class="chip ${a}">${AREAS[a].nome}</span>` : "";
function tabsArea(cont, extra){
  const itens = [["todas","Todas"],...Object.entries(AREAS).map(([k,v])=>[k,v.nome]), ...(extra||[])];
  return `<div class="tabs" role="tablist"><span class="ind"></span>${itens.map(([k,l])=>`<button role="tab" aria-selected="${filtroArea===k}" data-act="area" data-a="${k}">${AREAS[k]?`<span class="dot" style="background:var(--${AREAS[k].cor})"></span>`:""}${l}${cont?` <span class="n">${cont[k]||0}</span>`:""}</button>`).join("")}</div>`;
}

/* ---------- INÍCIO ---------- */
function vInicio(){
  const h = hoje(), d = new Date(), hr = d.getHours();
  const saud = hr<12 ? "Bom dia" : hr<18 ? "Boa tarde" : "Boa noite";
  const minhas = pode("ver_agenda_equipe") ? S.tarefas : S.tarefas.filter(t=>t.atribuido_a===meuId());
  const pend = minhas.filter(t=>!t.done && t.data);
  const venc = pend.filter(t=>t.data<h), hojeL = pend.filter(t=>t.data>=h && dataTrabalho(t)<=h);
  const feitasHoje = minhas.filter(t=>t.done && (t.concluido_em||"").slice(0,10)===h).length;
  const tot = hojeL.length + feitasHoje, pct = tot ? feitasHoje/tot : 0, CIRC = 2*Math.PI*38;
  const semana = pend.filter(t=>t.data>h && t.data<=iso(addDays(d,7))).length;
  const aud = pend.filter(t=>t.tipo==="Audiência" && t.data>=h).sort((a,b)=>(a.data+(a.hora||"")).localeCompare(b.data+(b.hora||"")));
  const prox = pend.filter(t=>t.data>=h && t!==aud[0]).sort((a,b)=>a.data.localeCompare(b.data)).slice(0,3);
  const vazio = !S.tarefas.length && !S.processos.length;
  const q = busca.trim().toLowerCase();
  const res = !q ? [] : S.processos.filter(p=>[p.numero,nomeCliente(p),p.parte_contraria,p.vara].join(" ").toLowerCase().includes(q)).slice(0,6).map(p=>({act:"abrir-processo", id:p.id, t:p.numero||"sem número", s:nomeCliente(p)+" × "+(p.parte_contraria||"—"), a:p.area}))
    .concat(S.clientes.filter(c=>(c.nome||"").toLowerCase().includes(q)).slice(0,4).map(c=>({act:"editar-cliente", id:c.id, t:c.nome, s:"Cliente"})));
  const audCard = t => { const p = procById(t.processo_id), dt = parse(t.data); return `<div class="next-card" data-act="editar-tarefa" data-id="${t.id}"><div class="cal"><span>${MESES[dt.getMonth()]}</span><b>${pad(dt.getDate())}</b></div><div style="min-width:0"><b style="display:block">${esc(t.titulo)}</b><span class="small muted">${t.hora?esc(t.hora)+" · ":""}${esc(t.modalidade||"")}${p?" · "+esc(nomeCliente(p)):""}</span>${t.local?`<div class="small muted" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(t.local)}</div>`:""}</div></div>`; };
  const mini = t => { const p = procById(t.processo_id); return `<div class="row" style="justify-content:space-between;flex-wrap:nowrap;cursor:pointer;padding:6px 2px" data-act="editar-tarefa" data-id="${t.id}"><div style="min-width:0"><div style="font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(t.titulo)}</div><div class="small muted">${esc(t.tipo)}${p?" · "+esc(nomeCliente(p)):""}</div></div><span class="chip ${t.data===h?"danger":"neutral"}">${t.data===h?"Hoje":fmtCurto(t.data)}</span></div>`; };
  const acoes = [
    pode("criar_tarefas") && ["nova-tarefa","Prazo","Novo prazo","Cálculo automático",ICON.agenda],
    pode("criar_tarefas") && ["nova-tarefa","Audiência","Audiência","Data, hora e local",ICON.gavel],
    pode("editar_processos") && ["novo-processo","","Processo","Número CNJ conferido",ICON.processos],
    (pode("editar_processos")||pode("registrar_andamentos")) && ["ler-pdf","","Ler intimação","PDF vira prazo",ICON.scan],
    pode("revisar_minutas") && ["nav","minutas","Revisar minuta","Comentários do cliente",ICON.minutas],
    pode("enviar_cliente") && ["nav","relatorios","Mensagem ao cliente","Resumo pronto para copiar",ICON.send],
    ["nav","assistente","Assistente","Pergunte sobre a carteira",ICON.assistente],
    ["nav","daily","Daily jurídico","Notícias do dia",ICON.daily],
    !pode("criar_tarefas") && ["nova-tarefa","Peça","Nova atividade","Para mim",ICON.plus]
  ].filter(Boolean).slice(0,6);
  const areaCard = k => { const ps = S.processos.filter(p=>p.area===k && p.fase!=="Arquivado"); const pr = pend.filter(t=>areaDaTarefa(t)===k); const vz = pr.filter(t=>t.data<h).length;
    return `<button class="area-card" data-act="ir-area" data-a="${k}" style="--c:var(--${AREAS[k].cor});--c-soft:var(--${AREAS[k].cor}-soft)"><div class="t"><b>${AREAS[k].nome}</b><span class="arrow">${ICON.arrow}</span></div>
      <div class="nums"><div><b>${ps.length}</b><span>processos ativos</span></div><div><b>${pr.length}</b><span>pendências</span></div>${vz?`<div><b style="color:var(--danger)">${vz}</b><span>vencidas</span></div>`:""}</div>
      <div class="rule">Prazos em dias ${AREAS[k].contagem==="uteis"?"úteis":"corridos"} · ${AREAS[k].lei}</div></button>`; };
  const lead = vazio ? (pode("editar_processos")?"Sua pauta está vazia. Cadastre o primeiro processo para começar.":"Nenhuma atividade atribuída a você por enquanto.")
    : hojeL.length ? `${hojeL.length===1?"item para resolver":"itens para resolver"} hoje${pode("ver_agenda_equipe")?", contando prazos internos.":", atribuídos a você."}` : "Nada para hoje. Bom momento para adiantar a semana.";
  return `
  <div class="topbar"><div><div class="eyebrow">${esc(d.toLocaleDateString("pt-BR",{weekday:"long", day:"numeric", month:"long"}))}</div><h1>${saud}, <span class="gold">${esc(P.primeiroNome(S.perfil.nome))}</span></h1></div></div>
  <div class="search">${ICON.search}<input type="search" id="busca" data-bind="busca" value="${esc(busca)}" placeholder="Buscar processo, cliente ou parte contrária" autocomplete="off"></div>
  ${q?`<div class="panel">${res.length?res.map(r=>`<div class="item" style="grid-template-columns:minmax(0,1fr) auto;cursor:pointer" data-act="${r.act}" data-id="${r.id}"><div style="min-width:0"><div class="${r.a?"mono":""}" style="font-weight:600">${esc(r.t)}</div><div class="small muted">${esc(r.s)}</div></div>${chipArea(r.a)}</div>`).join(""):`<div class="empty small">Nada encontrado para "${esc(busca)}".</div>`}</div>`:""}
  <div class="home">
    <section class="hero">
      <div class="hero-top"><div style="display:flex;flex-direction:column;gap:8px"><span class="eyebrow">${pode("ver_agenda_equipe")?"Pauta de hoje":"Suas atividades de hoje"}</span><span class="big">${hojeL.length}</span><span class="lead">${lead}</span></div>
        ${tot?`<svg class="ring" viewBox="0 0 92 92" role="img" aria-label="${Math.round(pct*100)}% concluído hoje"><circle class="bgc" cx="46" cy="46" r="38"/><circle class="fg" cx="46" cy="46" r="38" stroke-dasharray="${CIRC.toFixed(1)}" stroke-dashoffset="${(CIRC*(1-pct)).toFixed(1)}" transform="rotate(-90 46 46)"/><text x="46" y="53" text-anchor="middle">${feitasHoje}/${tot}</text></svg>`:""}</div>
      <div class="hero-alerts">
        ${vazio && pode("editar_processos")?`<button class="hero-pill gold" data-act="novo-processo">${ICON.plus} Cadastrar processo</button>`:`
        ${venc.length?`<button class="hero-pill alert" data-act="nav" data-v="agenda"><b>${venc.length}</b> vencido(s)</button>`:""}
        <button class="hero-pill" data-act="nav" data-v="agenda"><b>${semana}</b> nos próximos 7 dias</button>
        <button class="hero-pill" data-act="nav" data-v="agenda"><b>${aud.length}</b> audiência(s)</button>`}
        ${pode("gerenciar_equipe") && S.perfis.some(p=>p.status==="pendente")?`<button class="hero-pill gold" data-act="nav" data-v="equipe"><b>${S.perfis.filter(p=>p.status==="pendente").length}</b> cadastro(s) para liberar</button>`:""}
      </div>
    </section>
    <section class="next">
      <div class="sec-t"><h3>Próxima audiência</h3><button class="linkbtn" data-act="nav" data-v="agenda">Agenda</button></div>
      ${aud[0]?audCard(aud[0]):`<div class="next-card" ${pode("criar_tarefas")?`data-act="nova-tarefa" data-tipo="Audiência"`:""}><div class="cal"><span>—</span><b>·</b></div><div><b>Nenhuma audiência</b><div class="small muted">${pode("criar_tarefas")?"Toque para cadastrar":"Sem audiências atribuídas"}</div></div></div>`}
      <h3 style="margin-top:4px">Em seguida</h3>
      ${prox.length?prox.map(mini).join(""):`<span class="small muted">Sem outros compromissos.</span>`}
    </section>
  </div>
  <div class="sec-t"><h2>Atalhos</h2></div>
  <div class="actions">${acoes.map(([act,arg,l,sub,ic])=>`<button class="act" data-act="${act}" ${act==="nav"?`data-v="${arg}"`:arg?`data-tipo="${arg}"`:""}><span class="ic">${ic}</span><span>${l}<small>${sub}</small></span></button>`).join("")}</div>
  ${S.processos.length?`<div class="sec-t"><h2>Áreas do escritório</h2><button class="linkbtn" data-act="ir-area" data-a="todas">Todos os processos</button></div>
  <div class="areas">${Object.keys(AREAS).map(areaCard).join("")}</div>`:""}`;
}

/* ---------- AGENDA ---------- */
function vAgenda(){
  const h = hoje();
  let ts = tarefasVisiveis().filter(t=>t.data);
  if(filtroArea!=="todas") ts = ts.filter(t=>areaDaTarefa(t)===filtroArea);
  const pend = ts.filter(t=>!t.done).sort((a,b)=>(dataTrabalho(a)||"").localeCompare(dataTrabalho(b)||"") || (a.hora||"").localeCompare(b.hora||""));
  const em7 = iso(addDays(new Date(),7));
  const g = {atr:[], hoje:[], semana:[], depois:[]};
  pend.forEach(t=>{ const w = dataTrabalho(t); if(t.data<h) g.atr.push(t); else if(w<=h) g.hoje.push(t); else if(w<=em7) g.semana.push(t); else g.depois.push(t); });
  const aud30 = ts.filter(t=>!t.done && t.tipo==="Audiência" && t.data>=h && t.data<=iso(addDays(new Date(),30))).length;
  const feitas = ts.filter(t=>t.done).sort((a,b)=>(b.concluido_em||"").localeCompare(a.concluido_em||"")).slice(0,15);
  const grupo = (titulo, lista, cls, nota) => lista.length ? `<div class="group-t"><h3 class="${cls||""}">${titulo}</h3><span class="small muted">${lista.length}${nota?" · "+nota:""}</span></div>${lista.map(itemTarefa).join("")}` : "";
  return `<div class="head"><div><div class="eyebrow">${esc(new Date().toLocaleDateString("pt-BR",{weekday:"long", day:"numeric", month:"long"}))}</div><h1>Agenda</h1></div>
    <div class="row"><button class="btn ghost" data-act="agenda-celular">${ICON.agenda}<span class="lbl">No celular</span></button>${pode("criar_tarefas")?`<button class="btn" data-act="nova-tarefa" data-tipo="Audiência">${ICON.plus}<span class="lbl">Audiência</span></button><button class="btn" data-act="nova-tarefa" data-tipo="Peça">${ICON.plus}<span class="lbl">Tarefa</span></button><button class="btn primary" data-act="nova-tarefa" data-tipo="Prazo">${ICON.plus}Prazo</button>`:`<button class="btn primary" data-act="nova-tarefa" data-tipo="Peça">${ICON.plus}Nova atividade</button>`}</div></div>
  <div class="stats">
    <button class="stat ${g.atr.length?"danger":""}" data-act="rolar"><b>${g.atr.length}</b><span>Prazos vencidos</span></button>
    <button class="stat ${g.hoje.length?"warn":""}" data-act="rolar"><b>${g.hoje.length}</b><span>Para fazer hoje</span></button>
    <button class="stat" data-act="rolar"><b>${g.semana.length}</b><span>Próximos 7 dias</span></button>
    <button class="stat gold" data-act="rolar"><b>${aud30}</b><span>Audiências em 30 dias</span></button></div>
  <div class="row" style="justify-content:space-between">${tabsArea()}${pode("ver_agenda_equipe")?`<div class="seg" role="group" aria-label="De quem"><button data-act="escopo" data-e="todos" aria-pressed="${escopoAgenda==="todos"}">Equipe</button><button data-act="escopo" data-e="meus" aria-pressed="${escopoAgenda==="meus"}">Minhas</button></div>`:""}</div>
  <div class="panel" id="g-pauta"><div class="pauta">
    ${pend.length ? grupo("Vencidos",g.atr,"danger","prazo fatal já passou")+grupo("Fazer hoje",g.hoje,"","inclui prazos internos de hoje")+grupo("Próximos 7 dias",g.semana)+grupo("Mais adiante",g.depois)
      : `<div class="empty"><h2>Nada pendente</h2><p>${S.tarefas.length?"Todas as atividades deste filtro estão concluídas.":pode("criar_tarefas")?"Cadastre um prazo: o app calcula a data final em dias úteis ou corridos, pulando feriados e o recesso.":"Quando alguém atribuir uma atividade a você, ela aparece aqui."}</p></div>`}
  </div></div>
  ${feitas.length?`<div class="row"><button class="btn ghost" data-act="toggle-feitas">${verConcluidas?"Ocultar":"Mostrar"} concluídos recentes (${feitas.length})</button></div>${verConcluidas?`<div class="panel"><div class="pauta">${feitas.map(itemTarefa).join("")}</div></div>`:""}`:""}
  <p class="hint">O prazo interno é a data em que o escritório quer terminar o trabalho, ${P.margem()} dia(s) útil(eis) antes do prazo fatal.</p>`;
}
function itemTarefa(t){
  const h = hoje(), p = procById(t.processo_id), area = areaDaTarefa(t), w = dataTrabalho(t);
  let cls = "", estado = "";
  if(!t.done){
    if(t.data < h){ cls="danger"; estado=`<span class="chip danger">Vencido há ${diffDias(t.data,h)} dia(s)</span>`; }
    else if(t.data===h){ cls="today"; estado=`<span class="chip danger">${t.tipo==="Prazo"?"Prazo fatal hoje":"Hoje"}</span>`; }
    else if(w<=h){ cls="warn"; estado=`<span class="chip warn">Interno vencido · fatal ${fmtCurto(t.data)}</span>`; }
    else estado = `<span class="muted">em ${diffDias(h,t.data)} dia(s)</span>`;
  } else estado = `<span class="chip ok">Concluído</span>`;
  const mostra = parse(t.done || t.data < h ? t.data : (w || t.data));
  const podeMarcar = pode("criar_tarefas") || t.atribuido_a===meuId();
  return `<div class="item ${t.done?"done":""}">
    <input type="checkbox" class="tick" data-act="tick" data-id="${t.id}" ${t.done?"checked":""} ${podeMarcar?"":"disabled"} aria-label="Marcar como concluído">
    <div class="dbox ${t.done?"":cls}"><b>${pad(mostra.getDate())}</b><span>${MESES[mostra.getMonth()]}</span></div>
    <div style="min-width:0"><div class="titulo" data-act="editar-tarefa" data-id="${t.id}">${esc(t.titulo||t.tipo)}</div>
      <div class="meta"><span class="chip neutral">${esc(t.tipo)}${t.hora?" · "+esc(t.hora):""}</span>${chipArea(area)}${p?`<span class="mono" data-act="abrir-processo" data-id="${p.id}" style="cursor:pointer">${esc(p.numero||"sem número")}</span><span>${esc(nomeCliente(p))}</span>`:""}${t.atribuido_a?`<span>${t.atribuido_a===meuId()?"Com você":"Com "+esc(P.primeiroNome(nomePerfil(t.atribuido_a)))}</span>`:""}</div></div>
    <div class="right">${estado}${t.tipo==="Prazo"&&!t.done&&t.interno?`<span class="muted">interno ${fmtCurto(t.interno)} · fatal ${fmtCurto(t.data)}</span>`:""}</div></div>`;
}

/* ---------- PROCESSOS ---------- */
function vProcessos(){
  const cont = {todas:S.processos.length}; S.processos.forEach(p=>cont[p.area]=(cont[p.area]||0)+1);
  const q = busca.trim().toLowerCase();
  let ps = S.processos.filter(p=>filtroArea==="todas"||p.area===filtroArea);
  if(q) ps = ps.filter(p=>[p.numero,nomeCliente(p),p.parte_contraria,p.vara,nomePerfil(p.responsavel_id),p.resumo].join(" ").toLowerCase().includes(q));
  ps.sort((a,b)=>(proximo(a.id)?.data||"9999").localeCompare(proximo(b.id)?.data||"9999"));
  return `<div class="head"><div><h1>Processos</h1><div class="sub">${pode("ver_todos_processos")?"Toda a carteira do escritório, separada por área.":"Processos em que você é responsável ou tem atividade atribuída."}</div></div>
    ${pode("editar_processos")||pode("registrar_andamentos")?`<div class="row"><button class="btn" data-act="dj-todos" ${DJLOTE.rodando?"disabled":""}>${ICON.refresh}<span class="lbl">Andamentos DataJud</span></button>${pode("editar_processos")?`<button class="btn" data-act="ler-pdf">${ICON.scan}<span class="lbl">Ler intimação</span></button><button class="btn primary" data-act="novo-processo">${ICON.plus}Novo processo</button>`:""}</div>`:""}</div>
  ${bannerDataJud()}
  ${tabsArea(cont)}
  <div class="search">${ICON.search}<input type="search" id="busca" placeholder="Buscar por número, cliente, parte contrária, vara…" value="${esc(busca)}" data-bind="busca"></div>
  <div class="panel">${!S.processos.length?`<div class="empty"><h2>Nenhum processo</h2><p>${pode("editar_processos")?"Cadastre o primeiro processo com o número no padrão CNJ. O app confere o dígito verificador e identifica o ramo da Justiça.":"Os processos aparecem aqui quando você for responsável ou receber uma atividade."}</p>${pode("editar_processos")?`<button class="btn primary" data-act="novo-processo">${ICON.plus}Cadastrar processo</button>`:""}</div>`:!ps.length?`<div class="empty"><p>Nenhum processo com esse filtro.</p></div>`:`
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Processo</th><th>Cliente</th><th>Parte contrária</th><th>Fase</th><th>Próximo compromisso</th><th>Responsável</th></tr></thead><tbody>
  ${ps.map(p=>{ const nx = proximo(p.id), h = hoje();
    return `<tr data-act="abrir-processo" data-id="${p.id}"><td><div class="mono">${esc(p.numero||"sem número")}</div><div class="row" style="gap:6px;margin-top:3px">${chipArea(p.area)}<span class="small muted">${esc(p.vara||"")}</span></div></td>
    <td>${esc(nomeCliente(p))}</td><td>${esc(p.parte_contraria||"—")}</td><td><span class="chip neutral">${esc(p.fase||"—")}</span></td>
    <td>${nx?`<span class="${nx.data<h?"chip danger":nx.data<=iso(addDays(new Date(),3))?"chip warn":""}">${fmt(nx.data)}</span><div class="small muted">${esc(nx.titulo||nx.tipo)}</div>`:`<span class="muted">—</span>`}</td><td>${esc(P.primeiroNome(nomePerfil(p.responsavel_id))||"—")}</td></tr>`; }).join("")}
  </tbody></table></div>`}</div>`;
}

/* ---------- CLIENTES ---------- */
function vClientes(){
  const q = busca.trim().toLowerCase();
  let cs = S.clientes.slice().sort((a,b)=>(a.nome||"").localeCompare(b.nome||""));
  if(q) cs = cs.filter(c=>[c.nome,c.doc,c.email,c.telefone].join(" ").toLowerCase().includes(q));
  return `<div class="head"><div><h1>Clientes</h1><div class="sub">${S.clientes.length} cliente(s). Vincule a conta do cliente para ele acompanhar os processos pelo portal.</div></div>${pode("gerenciar_clientes")?`<button class="btn primary" data-act="novo-cliente">${ICON.plus}Novo cliente</button>`:""}</div>
  <div class="search">${ICON.search}<input type="search" id="busca" placeholder="Buscar cliente" value="${esc(busca)}" data-bind="busca"></div>
  <div class="panel">${!S.clientes.length?`<div class="empty"><h2>Nenhum cliente ainda</h2><p>Clientes também podem ser criados direto no cadastro do processo.</p></div>`:`
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Nome</th><th>Contato</th><th>Processos</th><th>Acesso ao portal</th></tr></thead><tbody>
  ${cs.map(c=>{ const ps = S.processos.filter(p=>p.cliente_id===c.id); const acc = c.conta_id ? {status:"ativo"} : null;
    return `<tr data-act="editar-cliente" data-id="${c.id}"><td><b style="font-weight:600">${esc(c.nome)}</b><div class="small muted">${esc(c.tipo||"")} ${esc(c.doc||"")}</div></td><td class="small">${esc(c.telefone||"")}<div class="muted">${esc(c.email||"")}</div></td>
      <td><div class="row" style="gap:4px"><span class="mono">${ps.length}</span>${[...new Set(ps.map(p=>p.area))].map(chipArea).join("")}</div></td>
      <td>${acc?`<span class="chip ok">Portal ativo</span>`:`<span class="chip neutral">Sem acesso</span>`}</td></tr>`;}).join("")}
  </tbody></table></div>`}</div>`;
}

/* ---------- REVISÃO DE MINUTA (sem IA: extração automática + biblioteca de respostas) ---------- */
const POS = {aceitar:["Aceitar","ok"], ajustar:["Contrapropor","warn"], manter:["Manter","danger"]};
function vMinutas(){
  const it = M.itens;
  const autores = [...new Set(it.map(i=>i.autor).filter(Boolean))];
  const temas = {}; it.forEach(i=>{ if(i.tema) temas[i.tema] = (temas[i.tema]||0)+1; });
  const feitos = it.filter(i=>i.posicao).length;
  return `<div class="head"><div><h1>Revisão de minuta</h1><div class="sub">Envie o contrato devolvido em Word ou PDF. O app encontra sozinho os comentários e as alterações e sugere respostas da biblioteca para você revisar.</div></div></div>
  <div class="dropzone" data-drop="minuta"><span style="flex:1;min-width:200px"><b style="color:var(--ink)">Arraste o arquivo aqui</b> ou escolha no computador. Lê comentários do Word, alterações controladas e anotações de PDF.</span>
    <label class="btn primary" for="f-minuta">Escolher arquivo</label><input type="file" id="f-minuta" accept=".docx,.pdf,.txt" hidden data-file="minuta">
    ${M.arquivo?`<span class="chip accent">${esc(M.arquivo)}</span>`:""}${M.carregando?`<span class="spinner"></span>`:""}</div>
  ${M.erro?`<div class="err">${esc(M.erro)}</div>`:""}
  ${it.length?`
  <div class="panel"><div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
    <div class="row" style="justify-content:space-between"><div><h2>${it.length} ponto(s) encontrados</h2><div class="small muted">${autores.length?"Comentários de "+esc(autores.join(", ")):"Autor não identificado no arquivo"} · ${feitos} de ${it.length} respondidos</div></div>
      <div class="row">${Object.entries(temas).map(([k,n])=>`<span class="chip accent">${esc(P.BIBLIOTECA.find(b=>b.id===k).nome)} ${n}</span>`).join("")}</div></div>
    <div class="grid3"><label class="f">Título<input type="text" id="m-titulo" data-bind="M.titulo" value="${esc(M.titulo)}"></label>
      <label class="f">Quem representamos<input type="text" id="m-lado" data-bind="M.lado" value="${esc(M.lado)}" placeholder="Ex.: a contratada"></label>
      <label class="f">Destinatário da resposta<input type="text" id="m-dest" data-bind="M.destinatario" value="${esc(M.destinatario)}" placeholder="Ex.: Dr. Carlos (jurídico da Alfa)"></label></div>
    ${P.temIA()?`<div class="ia-box"><div class="row" style="justify-content:space-between"><span class="ia-tag">${ICON.ia} Análise com IA</span><span class="hint">Usa o texto do contrato e cada comentário.</span></div>
      <div class="grid3"><label class="f">Quem comentou<select id="m-quem" data-bind="M.quem">${opts([["cliente","Nosso cliente"],["contraparte","A outra parte"]], M.quem)}</select></label>
        <label class="f">Tom<select id="m-tom" data-bind="M.tom">${opts(["firme","equilibrado","conciliador"], M.tom)}</select></label>
        <div style="display:flex;align-items:flex-end"><button class="btn primary block" data-act="minuta-ia" ${M.ia?"disabled":""}>${M.ia?`<span class="spinner"></span> Analisando…`:ICON.ia+" Analisar todos com IA"}</button></div></div>
      ${M.resumo?`<div><b>Visão geral:</b> ${esc(M.resumo)}</div>`:""}</div>`:""}
    <div class="row"><span class="hint" style="flex:1">Ou aplique a mesma decisão a todos os pontos ainda sem resposta.</span>${Object.entries(POS).map(([k,[l]])=>`<button class="btn ghost" data-act="pos-todos" data-p="${k}">${l} todos</button>`).join("")}</div>
  </div></div>
  ${it.map((i,n)=>{ const tema = P.BIBLIOTECA.find(b=>b.id===i.tema);
    return `<div class="rev"><div class="rev-h"><div class="row"><b>${esc(i.ref||"Ponto "+(n+1))}</b><span class="chip neutral">${esc(i.tipo)}</span>${tema?`<span class="chip accent">${esc(tema.nome)}</span>`:""}${i.risco?`<span class="chip ${i.risco==="alto"?"danger":i.risco==="médio"?"warn":"neutral"}">Risco ${esc(i.risco)}</span>`:""}${i._ia?`<span class="ia-tag" style="font-size:.65rem">${ICON.ia} IA</span>`:""}${i.autor?`<span class="small muted">${esc(i.autor)}</span>`:""}${i.pagina?`<span class="small muted">pág. ${i.pagina}</span>`:""}</div>
      <div class="seg" role="group" aria-label="Decisão">${Object.entries(POS).map(([k,[l]])=>`<button data-act="pos" data-i="${n}" data-p="${k}" aria-pressed="${i.posicao===k}">${l}</button>`).join("")}</div></div>
      <div class="rev-b"><div class="col"><h3>${i.tipo==="Comentário"?"Comentário recebido":i.tipo}</h3><div style="white-space:pre-wrap">${esc(i.comentario)}</div>${i.trecho?`<h3 style="margin-top:6px">Trecho da minuta</h3><div class="quote">${esc(i.trecho.length>420?i.trecho.slice(0,420)+"…":i.trecho)}</div>`:""}</div>
      <div class="col"><label class="f">Nossa resposta<textarea rows="4" id="m-r-${n}" data-mi="${n}" data-k="resposta" placeholder="Escolha uma decisão acima para receber uma sugestão, ou escreva livremente">${esc(i.resposta)}</textarea></label>
        ${i.posicao==="ajustar"?`<label class="f">Redação proposta para a cláusula<textarea rows="3" id="m-d-${n}" data-mi="${n}" data-k="redacao" placeholder="Nova redação">${esc(i.redacao)}</textarea></label>`:""}
        ${i.fundamento?`<div class="small muted">Fundamento: ${esc(i.fundamento)}</div>`:""}
        ${tema && i.posicao && i.posicao!=="aceitar"?`<div class="pickchips"><button data-act="usar-bib" data-i="${n}">Usar texto da biblioteca: ${esc(tema.nome)}</button></div>`:""}</div></div></div>`; }).join("")}
  <div class="panel"><div class="panel-h"><h2>Resposta pronta para enviar</h2><div class="row"><button class="btn" data-act="copiar-resposta">${ICON.copy}Copiar e-mail</button><button class="btn" data-act="pdf-minuta">${ICON.pdf}Quadro em PDF</button>${pode("revisar_minutas")?`<button class="btn primary" data-act="salvar-revisao">Salvar no histórico</button>`:""}</div></div>
    <div class="panel-b"><div class="pre">${esc(textoRespostaMinuta())}</div></div></div>`
  :`<details class="panel"><summary class="panel-h" style="cursor:pointer;list-style:none"><span class="small muted">O arquivo não tem comentários marcados? Cole as observações do cliente aqui (uma por parágrafo).</span></summary><div class="panel-b" style="display:flex;flex-direction:column;gap:10px"><textarea id="m-colar" data-bind="M.colar" rows="6">${esc(M.colar)}</textarea><div class="row" style="justify-content:flex-end"><button class="btn" data-act="usar-colado">Separar em pontos</button></div></div></details>`}
  ${S.revisoes.length?`<div class="panel"><div class="panel-h"><h2>Histórico de revisões</h2></div><div class="tbl-wrap"><table class="tbl"><tbody>${S.revisoes.slice().sort((a,b)=>(b.criado_em||"").localeCompare(a.criado_em||"")).map(v=>`<tr data-act="abrir-revisao" data-id="${v.id}"><td>${esc(v.titulo||"Revisão")}</td><td class="small muted">${fmt((v.criado_em||"").slice(0,10))}</td><td class="small">${((v.dados||{}).itens||[]).length} ponto(s)</td></tr>`).join("")}</tbody></table></div></div>`:""}`;
}
function montarItensMinuta(r){
  const itens = [];
  (r.comentarios||[]).forEach(c=>itens.push({tipo:"Comentário", autor:c.autor, comentario:c.texto, trecho:c.trecho||"", pagina:c.pagina||null}));
  (r.alteracoes||[]).forEach(a=>itens.push({tipo:a.tipo, autor:a.autor, comentario:(a.tipo==="Inclusão"?"Incluiu: ":"Excluiu: ")+"“"+a.texto+"”", trecho:a.trecho||""}));
  return itens.map(i=>Object.assign(i, {ref:P.refClausula(i.trecho)||P.refClausula(i.comentario), tema:(P.temaDe(i.comentario)||P.temaDe(i.trecho)||{}).id||"", posicao:"", resposta:"", redacao:""}));
}
function sugerir(i){
  const tema = P.BIBLIOTECA.find(b=>b.id===i.tema);
  if(i.posicao==="aceitar") return P.ACEITAR_PADRAO;
  if(tema) return tema[i.posicao==="ajustar"?"ajustar":"manter"];
  return i.posicao==="ajustar" ? "Propomos a seguinte redação alternativa, que atende à preocupação apresentada e mantém o equilíbrio do contrato:" : "Mantemos a redação original desta cláusula, pois ela é necessária para [motivo].";
}
function textoRespostaMinuta(){
  const linhas = M.itens.map((i,n)=>{ const [l] = POS[i.posicao]||["Em análise"]; return `${n+1}. ${i.ref||"Ponto "+(n+1)} — ${l}\n   Comentário: ${i.comentario}\n   Resposta: ${i.resposta||"(pendente)"}${i.redacao?`\n   Redação proposta: ${i.redacao}`:""}`; });
  return `${M.destinatario?"Prezado(a) "+M.destinatario+",":"Prezados,"}\n\nAgradecemos o envio dos comentários sobre ${M.titulo||"a minuta"}. Seguem nossas considerações, ponto a ponto:\n\n${linhas.join("\n\n")}\n\nFicamos à disposição para alinhar os pontos em aberto.\n\nAtenciosamente,\n${S.perfil.nome}\n${S.escritorio?.nome||""}`;
}

/* ---------- DAILY JURÍDICO ---------- */
function vDaily(){
  return `<div class="head"><div><div class="eyebrow">${esc(new Date().toLocaleDateString("pt-BR",{weekday:"long", day:"numeric", month:"long"}))}</div><h1>Daily jurídico</h1><div class="sub">As principais notícias do Direito, separadas por área e atualizadas todas as manhãs.</div></div></div>
  <div class="panel daily-box">${listaDaily(false)}</div>`;
}

/* ---------- ASSISTENTE (sem IA: lê os dados do escritório e a base de Direito) ---------- */
const nrm = s => String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
function refazer(){ if($("#main")) render(); else mostrarInicio(); }
function chatHTML(o){
  const vazio = !o.msgs.length;
  return `<div class="head"><div><span class="ia-tag">${ICON.assistente} Sem IA · respostas da base do app</span><h1>${o.titulo}</h1><div class="sub">${o.sub}</div></div>${o.msgs.length?`<button class="btn ghost" data-act="${o.act}-limpar">Nova conversa</button>`:(o.voltar||"")}</div>
  <div class="chat">
    ${vazio?`<div class="panel"><div class="empty"><h2>${o.vazioTitulo||"Pergunte com suas palavras"}</h2><p>${o.vazioTexto||"Exemplos:"}</p>
      <div class="pickchips" style="justify-content:center">${o.sug.map(s=>`<button data-act="${o.act}-sug" data-q="${esc(s)}">${esc(s)}</button>`).join("")}</div></div></div>`:""}
    ${o.msgs.map(m=>m.role==="user"?`<div class="msg user">${esc(m.content)}</div>`:`<div class="msg bot answer">${m.html}</div>`).join("")}
    <div id="chat-fim"></div></div>
  <div class="composer"><textarea id="${o.idIn}" rows="1" data-bind="${o.bind}" placeholder="${o.ph||"Escreva sua pergunta"}">${esc(o.input)}</textarea><button class="btn primary" data-act="${o.act}-enviar">Enviar</button></div>`;
}
function vAssistente(){
  return chatHTML({msgs:CH.msgs, input:CH.input, idIn:"ch-in", bind:"CH.input", act:"ch", titulo:"Assistente do escritório",
    sub:"Peça ações (cadastrar processo, cliente, prazo, audiência, andamento, relatórios, mensagens) ou pergunte sobre a carteira e dúvidas jurídicas.",
    vazioTitulo:"O que você quer fazer?", vazioTexto:`Tenho acesso a ${S.processos.length} processo(s) e ${S.tarefas.filter(t=>!t.done).length} compromisso(s) pendente(s). Antes de gravar algo, mostro um resumo para você confirmar.`,
    ph:"Ex.: Cadastre um processo de teste · Agende audiência dia 25/11 às 14h no processo da Maria",
    sug:["Cadastre um processo de teste com dados gerais","Gere a pauta dos próximos 7 dias","Gere o relatório da carteira","Prazos desta semana","O que você consegue fazer?"]});
}
/* respostas da base de Direito, em HTML */
function respostaBase(q, area, min){
  const r = P.buscarBase(q, area, 3, min);
  if(!r.length) return "";
  return r.map((e,i)=>`<div class="kb${i?" kb-mais":""}"><div class="row" style="gap:8px;margin-bottom:4px"><b>${esc(e.tema)}</b>${e.area!=="geral"?`<span class="chip ${e.area}">${P.NOME_AREA_DIREITO[e.area]}</span>`:""}</div>${P.md(e.resp)}<div class="small muted" style="margin-top:6px">Fundamento: ${esc(e.base)}</div></div>`).join("")
    + `<div class="row" style="gap:6px;margin-top:8px"><span class="small muted">Ver julgados sobre "${esc(r[0].tema)}":</span>${["stj","tst","jusbrasil"].map(o=>`<button class="linkbtn small" data-act="juris" data-o="${o}" data-q="${esc(r[0].tema)}">${P.ONDE_PESQUISAR.find(x=>x[0]===o)[1]}</button>`).join("")}</div>`
    + `<div class="hint" style="margin-top:6px">${esc(P.AVISO_BASE)}</div>`;
}
function semResposta(q){
  return `<p>Não encontrei esse assunto na base do app.</p><p class="small">Tente com outras palavras (por exemplo: <i>prazo apelação</i>, <i>verbas rescisórias</i>, <i>prisão preventiva</i>), veja os temas em <b>Direito geral</b> ou pesquise julgados:</p>
    <div class="row" style="gap:6px">${["stf","stj","tst","jusbrasil"].map(o=>`<button class="btn" data-act="juris" data-o="${o}" data-q="${esc(q)}">${P.ONDE_PESQUISAR.find(x=>x[0]===o)[1]}</button>`).join("")}</div>`;
}
/* perguntas sobre a carteira do escritório */
function responderEscritorio(q){
  const n = nrm(q), h = hoje();
  const li = arr => `<ul style="margin:6px 0 0;padding-left:18px">${arr.join("")}</ul>`;
  const linhaT = t => { const p = procById(t.processo_id); const atras = !t.done && t.data<h; return `<li><b>${fmt(t.data)}</b>${t.hora?" "+esc(t.hora):""} · ${esc(t.tipo)}: ${esc(t.titulo||"")}${p?` <span class="muted">(${esc(nomeCliente(p))}${p.numero?" · "+esc(p.numero):""})</span>`:""}${t.atribuido_a?` <span class="muted">· ${esc(nomePerfil(t.atribuido_a))}</span>`:""}${atras?` <span class="chip danger">vencido</span>`:""}</li>`; };
  const procs = encontrarProcessos(q);
  if(procs.length){
    return procs.slice(0,3).map(p=>{
      const ands = andamentosDe(p.id), docs = docsDe(p.id).filter(d=>["Rascunho","Aguardando cliente"].includes(d.status));
      const prox = S.tarefas.filter(t=>t.processo_id===p.id && !t.done).sort((a,b)=>(a.data||"").localeCompare(b.data||"")).slice(0,4);
      return `<div class="kb"><div class="row" style="gap:8px"><b class="mono">${esc(p.numero||"Sem número")}</b>${chipArea(p.area)}<span class="chip neutral">${esc(p.fase||"")}</span></div>
        <div class="small" style="margin-top:4px">${esc(nomeCliente(p))} × ${esc(p.parte_contraria||"—")}${p.vara?" · "+esc(p.vara):""}${p.responsavel_id?" · resp. "+esc(nomePerfil(p.responsavel_id)):""}</div>
        ${p.resumo?`<p style="margin:6px 0 0">${esc(p.resumo)}</p>`:""}
        <div style="margin-top:6px"><b class="small">Último andamento:</b> ${ands[0]?`${fmt(ands[0].data)} · ${esc(ands[0].texto)}`:`<span class="muted">nenhum registrado</span>`}</div>
        <div style="margin-top:6px"><b class="small">Próximos compromissos:</b> ${prox.length?li(prox.map(linhaT)):`<span class="muted">nenhum pendente</span>`}</div>
        ${docs.length?`<div style="margin-top:6px"><b class="small">Documentos pendentes:</b> ${li(docs.map(d=>`<li>${esc(d.nome)} <span class="muted">· ${esc(d.status)}</span></li>`))}</div>`:""}
        <button class="linkbtn small" data-act="abrir-processo" data-id="${p.id}" style="margin-top:6px">Abrir processo</button></div>`;
    }).join("") + (procs.length>3?`<div class="small muted">E mais ${procs.length-3} processo(s). Seja mais específico ou use a busca.</div>`:"");
  }
  // 2. prazos e agenda
  const area = /trabalh/.test(n) ? "trabalhista" : /civel|civil/.test(n) ? "civel" : /crimin|penal/.test(n) ? "criminal" : "";
  const daArea = t => !area || areaDaTarefa(t)===area;
  if(/audienc/.test(n)){
    const a = S.tarefas.filter(t=>t.tipo==="Audiência" && !t.done && t.data>=h && daArea(t)).sort((x,y)=>(x.data+(x.hora||"")).localeCompare(y.data+(y.hora||"")));
    return a.length ? `<b>${a.length} audiência(s) marcada(s)${area?" · "+AREAS[area].nome:""}:</b>${li(a.slice(0,15).map(linhaT))}` : "Nenhuma audiência futura cadastrada.";
  }
  if(/venc|agenda|semana|hoje|amanha|atras|pendent|pendenc|tarefa|compromisso|minhas|meus|atribu|proxim|\bmes\b|30 dias|7 dias/.test(n)){
    let t = S.tarefas.filter(x=>!x.done && x.data && daArea(x));
    if(/minhas|atribuid|para mim|meus/.test(n)) t = t.filter(x=>x.atribuido_a===meuId());
    if(/prazo/.test(n)) t = t.filter(x=>x.tipo==="Prazo");
    let rot = "pendentes";
    if(/atras|vencid/.test(n)){ t = t.filter(x=>x.data<h); rot = "vencidos"; }
    else if(/hoje/.test(n)){ t = t.filter(x=>x.data===h || dataTrabalho(x)===h); rot = "para hoje"; }
    else if(/amanha/.test(n)){ const a = iso(addDays(new Date(),1)); t = t.filter(x=>x.data===a); rot = "para amanhã"; }
    else if(/semana|7 dias/.test(n)){ const f = iso(addDays(new Date(),7)); t = t.filter(x=>x.data<=f); rot = "até os próximos 7 dias (inclui vencidos)"; }
    else if(/mes/.test(n)){ const f = iso(addDays(new Date(),30)); t = t.filter(x=>x.data<=f); rot = "nos próximos 30 dias"; }
    t.sort((a,b)=>a.data.localeCompare(b.data));
    return t.length ? `<b>${t.length} item(ns) ${rot}${area?" · "+AREAS[area].nome:""}:</b>${li(t.slice(0,20).map(linhaT))}${t.length>20?`<div class="small muted">Mostrando 20. Veja todos na Agenda.</div>`:""}` : `Nenhum item ${rot}${area?" na área "+AREAS[area].nome:""}.`;
  }
  // 3. documentos
  if(/document|assinat|aguardando/.test(n)){
    const d = S.documentos.filter(x=>["Aguardando cliente","Rascunho"].includes(x.status) && (!area || procById(x.processo_id)?.area===area));
    return d.length ? `<b>${d.length} documento(s) pendente(s):</b>${li(d.slice(0,20).map(x=>{ const p = procById(x.processo_id); return `<li>${esc(x.nome)} · <span class="muted">${esc(x.status)}${p?" · "+esc(nomeCliente(p))+(p.numero?" · "+esc(p.numero):""):""}</span></li>`; }))}` : "Nenhum documento aguardando o cliente ou em rascunho.";
  }
  // 4. panorama por fase
  if(/fase|carteira|panorama|quantos|resumo geral|situacao dos processos|processos (trabalh|civ|crim)/.test(n)){
    const ps = S.processos.filter(p=>!area || p.area===area);
    if(!ps.length) return "Nenhum processo cadastrado" + (area?" nessa área.":".");
    const porFase = FASES.map(f=>[f, ps.filter(p=>p.fase===f)]).filter(([,l])=>l.length);
    return `<b>${ps.length} processo(s)${area?" · "+AREAS[area].nome:""}</b>${li(porFase.map(([f,l])=>`<li><b>${esc(f)}</b>: ${l.length} <span class="muted">(${l.slice(0,4).map(p=>esc(nomeCliente(p))).join(", ")}${l.length>4?"…":""})</span></li>`))}`;
  }
  return "";
}
function enviarChatEscritorio(q){
  q = String(q ?? CH.input).trim(); if(!q) return;
  CH.msgs.push({role:"user", content:q}); CH.input = "";
  let r = null;
  try{ r = interpretarAcao(q); }catch(e){ console.error(e); r = {html:"Não consegui interpretar esse pedido. Tente com outras palavras ou veja <i>o que você consegue fazer?</i>"}; }
  if(!r){ const h = responderEscritorio(q) || respostaBase(q, null, 2.5); r = {html: h || ajudaHTML("Não entendi bem esse pedido. Veja exemplos do que consigo fazer:")}; }
  CH.msgs.push({role:"assistant", html:r.html, pendId:r.pendId||null}); render();
}
function enviarChatLivre(q){
  q = String(q ?? L.chatInput).trim(); if(!q) return;
  L.chat.push({role:"user", content:q}); L.chatInput = "";
  L.chat.push({role:"assistant", html: respostaBase(q) || semResposta(q)});
  mostrarInicio(); $("#chat-fim")?.scrollIntoView({block:"end"});
}
/* ---------- ASSISTENTE: ações (cadastrar, agendar, relatórios) ---------- */
const DELIM = /\s*(?:,|;|\.(?:\s|$)|\s+contra\s|\s+na\s|\s+no\s|\s+em\s|\s+dia\s|\s+para\s|\s+vara\b|\s+[áa]rea\b|\s+processo\b|\s+n[úu]mero\b|\s+com\s|\s+cpf\b|\s+cnpj\b|\s+telefone\b|\s+celular\b|\s+e-?mail\b|\s+às?\s|$)/i;
const rotProc = p => (p.numero ? p.numero+" · " : "") + nomeCliente(p);
const capitaliza = s => s.trim().replace(/\s+/g," ").split(" ").map(w=>/^(da|de|do|das|dos|e)$/i.test(w)?w.toLowerCase():w.charAt(0).toUpperCase()+w.slice(1)).join(" ");
function trecho(q, re){ const m = q.match(re); if(!m) return ""; const resto = q.slice(m.index + m[0].length); const fim = resto.search(DELIM); return (fim>=0 ? resto.slice(0, fim) : resto).replace(/^["'“”]+|["'“”]+$/g,"").trim(); }
function gerarCNJ(J, TR){
  const N = String(Math.floor(1000000 + Math.random()*8999999)), A = String(new Date().getFullYear()), O = String(Math.floor(1 + Math.random()*9998)).padStart(4,"0");
  const dv = String(98n - (BigInt(N + A + J + TR + O + "00") % 97n)).padStart(2,"0");
  return `${N}-${dv}.${A}.${J}.${TR}.${O}`;
}
const DIAS_SEM = ["domingo","segunda","terca","quarta","quinta","sexta","sabado"];
function lerData(q){
  const n = nrm(q), hj = new Date(); hj.setHours(12,0,0,0);
  if(/depois de amanha/.test(n)) return iso(addDays(hj,2));
  if(/\bamanha\b/.test(n)) return iso(addDays(hj,1));
  if(/\bhoje\b/.test(n)) return iso(hj);
  let m = n.match(/(?:em|daqui a|daqui)\s+(\d{1,3})\s+dias?(?!\s*ute)/); if(m && !/prazo de/.test(n)) return iso(addDays(hj, Number(m[1])));
  m = q.match(/\b(\d{1,2})[\/\-.](\d{1,2})(?:[\/\-.](\d{2,4}))?\b/);
  if(m){ let a = m[3] ? Number(m[3]) : hj.getFullYear(); if(a<100) a += 2000; const d = new Date(a, Number(m[2])-1, Number(m[1]), 12); if(!m[3] && d < addDays(hj,-1)) d.setFullYear(a+1); if(!isNaN(d) && d.getDate()===Number(m[1])) return iso(d); }
  m = n.match(/\bdia (\d{1,2})\b/); if(m){ const d = new Date(hj); d.setDate(Number(m[1])); if(d < hj) d.setMonth(d.getMonth()+1); return iso(d); }
  for(let i=0;i<7;i++){ if(new RegExp("\\b(proxima |nesta |na |no )?"+DIAS_SEM[i]+"(-feira)?\\b").test(n)){ let d = addDays(hj,1); while(d.getDay()!==i) d = addDays(d,1); return iso(d); } }
  return "";
}
function lerHora(q){ const m = q.match(/\b(?:às|as|a partir das)?\s*(\d{1,2})\s*(?:h|:)\s*(\d{2})?\b/i); if(!m) return ""; const h = Number(m[1]); if(h>23) return ""; return pad(h)+":"+(m[2]||"00"); }
function lerPessoa(q){
  const n = nrm(q); const eq = equipeAtiva();
  const alvo = n.match(/(?:atribu\w*|responsavel|responsavel e|com|para (?:o |a )?(?:dr\.?|dra\.?)?)\s+(?:a |o |para )?([a-z]+)/);
  const cand = eq.filter(u=>{ const pn = nrm(P.primeiroNome(u.nome)); return pn.length>=3 && new RegExp("\\b"+pn+"\\b").test(n); });
  if(alvo){ const u = cand.find(u=>nrm(P.primeiroNome(u.nome))===alvo[1]); if(u) return u; }
  return /\b(mim|me|eu)\b/.test(n) ? S.perfil : (cand[0] || null);
}
function encontrarProcessos(q){
  const n = nrm(q);
  const dig = (q.match(/\d[\d.\-]{6,}/g)||[]).map(x=>x.replace(/\D/g,"")).filter(x=>x.length>=7);
  let procs = dig.length ? S.processos.filter(p=>dig.some(d=>(p.numero||"").replace(/\D/g,"").includes(d))) : [];
  if(!procs.length){
    const fora = ["processo","processos","cliente","clientes","situacao","como","esta","qual","fase","andamento","prazo","prazos","sobre","caso","relatorio","gerar","gere","mensagem","audiencia","documento","para","registre","registrar","cadastre","cadastrar","abrir","abra","novo","nova","criar","crie","teste","exemplo","dados","gerais","agende","agendar","marque","marcar","amanha","hoje","semana","concluir","conclua","pauta","carteira","atualizacao","enviar","envie"];
    const palavras = n.split(/[^a-z0-9]+/).filter(w=>w.length>=4 && !fora.includes(w));
    const casa = nome => { const ws = nrm(nome).split(/[^a-z0-9]+/).filter(w=>w.length>=3); return ws.length && palavras.some(w=>ws.includes(w)); };
    procs = S.processos.filter(p=>casa(nomeCliente(p)) || casa(p.parte_contraria));
  }
  return procs;
}
const areaDoTexto = n => /trabalh|reclamat|clt\b|trt\b/.test(n) ? "trabalhista" : /crimin|penal|crime|inquerito|denuncia/.test(n) ? "criminal" : /civel|civil|consumidor|familia|cobranca|indeniza/.test(n) ? "civel" : "";

const AJUDA_ACOES = [
  ["Cadastrar processo","Cadastre um processo de teste com dados gerais"],
  ["Cadastrar processo com dados","Novo processo trabalhista do cliente Maria Souza contra Mercado Bom Preço Ltda"],
  ["Cadastrar cliente","Cadastre o cliente José Pereira, telefone 11 98888-7777"],
  ["Agendar audiência","Agende audiência para 25/11 às 14h no processo da Maria"],
  ["Criar prazo","Crie prazo de 15 dias úteis para contestação no processo da Maria"],
  ["Registrar andamento","Registre andamento no processo da Maria: juntada de procuração"],
  ["Relatório","Gere o relatório da carteira"],
  ["Pauta em PDF","Gere a pauta dos próximos 7 dias"],
  ["Mensagem ao cliente","Mensagem de atualização para o cliente do processo da Maria"],
  ["Primeira versão da inicial","Monte a inicial do processo da Maria"],
  ["Contrato e procuração","Gere contrato e procuração do cliente José"],
  ["Checklist de documentos","Checklist de documentos do processo da Maria"],
  ["Andamentos no DataJud","Verificar andamentos no DataJud"],
  ["Financeiro","Quais parcelas estão vencidas?"],
  ["Consultas","Prazos desta semana · Próximas audiências · Documentos aguardando o cliente"]
];
function ajudaHTML(intro){
  return `<p>${intro||"Posso fazer ações no escritório e consultar seus dados. É só pedir com suas palavras:"}</p>
    <div class="ajuda-acoes">${AJUDA_ACOES.map(([t,ex])=>`<button class="ajuda-item" data-act="ch-sug" data-q="${esc(ex.split(" · ")[0])}"><b>${t}</b><span>${esc(ex)}</span></button>`).join("")}</div>
    <p class="small muted" style="margin-top:8px">Também respondo dúvidas jurídicas gerais (prazos, verbas, recursos, prisão…). Antes de gravar qualquer coisa, mostro um resumo para você confirmar.</p>`;
}
/* cartão de confirmação */
function cartaoAcao(titulo, campos, extra){
  return `<div class="acao-card"><div class="acao-t">${ICON.assistente}<b>${titulo}</b></div>
    <dl class="acao-dl">${campos.filter(([,v])=>v).map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>${extra||""}</div>`;
}
function propor(acao, dados, titulo, campos, extra){
  const id = "a"+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
  CH.pend[id] = {acao, dados};
  return {pendId:id, html: cartaoAcao(titulo, campos, extra) + `<div class="row acao-bts" style="gap:8px;margin-top:10px"><button class="btn primary" data-act="ch-ok" data-k="${id}">Confirmar</button><button class="btn" data-act="ch-form" data-k="${id}">Ajustar no formulário</button><button class="btn ghost" data-act="ch-cancel" data-k="${id}">Cancelar</button></div>`};
}
function semPermissao(o){ return `Seu acesso não permite ${o}. Peça ao gestor em Equipe e acessos.`; }

function interpretarAcao(q){
  const n = nrm(q);
  const verboCriar = /\b(cadastr|cri[ae]|criar|nov[oa]|inclu|adicion|registr|lanc|abr[ai]r? um|insir|insere|coloque|coloca)\w*/;
  // ajuda
  if(/^(ajuda|help|menu|oi|ola|e ai|bom dia|boa tarde|boa noite)\b|o que (voce|vc) (faz|sabe|pode)|como (funciona|te uso|usar)|nao entendi|^\?+$|comandos/.test(n)) return {html: ajudaHTML()};
  // DataJud
  if(/datajud|andamentos? (novo|oficia)|verific\w* (os )?andamentos|atualiz\w* (os )?andamentos|movimentac\w* (nova|do tribunal)/.test(n)){
    const procs = encontrarProcessos(q);
    if(procs.length===1){ abrirModal({kind:"detalhe", id:procs[0].id, vivo:true, aba:"andamentos"}); buscarDataJud(procs[0].id); return {html:`Consultando o DataJud para <b>${esc(rotProc(procs[0]))}</b>. As movimentações novas aparecem para você importar.`}; }
    view = "processos"; verificarTodosDataJud(); return {html:"Estou verificando no DataJud todos os processos com número CNJ válido. O resultado aparece em Processos."};
  }
  // financeiro
  if(/financeiro|cobranc|parcela|a receber|inadimpl|honorarios? .*(receber|vencid|aberto)/.test(n) && !/contrato|procuracao/.test(n)){
    if(!pode("financeiro")) return {html: semPermissao("ver o financeiro")};
    const h = hoje(), fs = S.financeiro||[], ab = fs.filter(f=>!f.pago_em), vz = ab.filter(f=>f.vencimento<h);
    const lista = /vencid|inadimpl|atras/.test(n) ? vz : ab;
    FIN.filtro = /vencid|inadimpl|atras/.test(n) ? "vencidas" : "abertas";
    return {html:`<b>${lista.length} parcela(s) ${FIN.filtro==="vencidas"?"vencida(s)":"em aberto"}</b>, total ${moeda(lista.reduce((s,f)=>s+Number(f.valor),0))}.${lista.length?`<ul style="margin:6px 0 0;padding-left:18px">${lista.slice(0,10).map(f=>`<li>${fmt(f.vencimento)} · ${esc(cliById(f.cliente_id)?.nome||"—")} · ${esc(f.descricao)} · <b>${moeda(f.valor)}</b></li>`).join("")}</ul>`:""}<button class="linkbtn" data-act="nav" data-v="financeiro">Abrir o financeiro</button>`};
  }
  // atendimentos
  if(/atendimento|novos? contatos?|leads?|primeira consulta/.test(n)){
    if(!(pode("atendimentos")||pode("gerenciar_clientes"))) return {html: semPermissao("ver atendimentos")};
    const as = (S.atendimentos||[]).filter(a=>a.status==="novo");
    return {html:`<b>${as.length} atendimento(s) novo(s)</b>.${as.length?`<ul style="margin:6px 0 0;padding-left:18px">${as.slice(0,8).map(a=>`<li>${esc(a.nome)}${a.telefone?" · "+esc(a.telefone):""} · ${new Date(a.criado_em).toLocaleDateString("pt-BR")}</li>`).join("")}</ul>`:""}<button class="linkbtn" data-act="nav" data-v="atendimentos">Abrir atendimentos</button>`};
  }
  // checklist de documentos e cobrança
  if(/checklist|documentos? (que )?(falta|pendente)|cobr\w* (os |de )?documentos|pedir (os )?documentos|lista de documentos/.test(n)){
    const procs = encontrarProcessos(q); const p = procs.length===1 ? procs[0] : null;
    abrirPecas("checklist", p ? {processo_id:p.id} : {});
    return {html: p ? `Abri o checklist de documentos de <b>${esc(rotProc(p))}</b>, com a mensagem de cobrança pronta.` : `Abri o checklist de documentos. Escolha o processo para ver o que falta.`};
  }
  // contrato e procuração
  if(/contrato|procuracao/.test(n) && /(mont|ger|faz|faca|redij|cri|prepar|minut|emit|elabor)/.test(n)){
    if(!(pode("editar_processos")||pode("gerenciar_clientes"))) return {html: semPermissao("gerar contratos e procurações")};
    const procs = encontrarProcessos(q); const p = procs.length===1 ? procs[0] : null;
    const ws = n.split(/[^a-z0-9]+/).filter(w=>w.length>=4);
    const cli = p ? cliById(p.cliente_id) : S.clientes.find(c=>nrm(c.nome).split(/\s+/).some(w=>w.length>=4 && ws.includes(w)));
    abrirPecas("contrato", {ccli:cli?.id||"", cproc:p?.id||""});
    return {html: cli ? `Abri contrato e procuração com os dados de <b>${esc(cli.nome)}</b>. Confira honorários e poderes e clique em gerar.` : `Abri contrato e procuração. Escolha o cliente.`};
  }
  // petição inicial e peças
  if(/(inicial|peticao|\bpeca\b|reclamacao trabalhista|resposta a acusacao|revogacao d\w* preventiva|liberdade provisoria|acao indenizatori|acao de cobranca|obrigacao de fazer)/.test(n) && /(mont|ger|faz|faca|redij|escrev|elabor|cri|prepar|minut|rascunh|primeira versao)/.test(n)){
    if(!(pode("editar_processos")||pode("revisar_minutas"))) return {html: semPermissao("gerar peças")};
    const procs = encontrarProcessos(q.split(":")[0]); const p = procs.length===1 ? procs[0] : null;
    const modelo = /resposta a acusacao|defesa criminal/.test(n) ? "crim_resposta" : /preventiva|liberdade|soltura/.test(n) ? "crim_liberdade" : /reclamacao|trabalhist/.test(n) ? "trab_reclamatoria" : /cobranca/.test(n) ? "civ_cobranca" : /obrigacao de fazer|tutela/.test(n) ? "civ_obrigacao" : /consum|indeniza|dano/.test(n) ? "civ_consumidor" : "";
    const pre = {teses:null}; if(modelo) pre.modelo = modelo; if(p) pre.processo_id = p.id;
    if(q.includes(":")) pre.fatos = q.slice(q.indexOf(":")+1).trim();
    abrirPecas("inicial", pre);
    return {html:`Abri o gerador de peças${p?` com o processo <b>${esc(rotProc(p))}</b>`:""}. Confira os fatos e as teses marcadas e clique em <b>Gerar primeira versão</b>.`};
  }
  // relatórios
  if(/relatorio|\bpdf\b|imprim|exporta/.test(n) || /\b(ger[ae]r?|emit\w*|baix\w*|mont[ae]r?)\b.*\b(pauta|carteira|resumo)/.test(n)){
    if(!pode("gerar_relatorios") && !pode("enviar_cliente")) return {html: semPermissao("gerar relatórios")};
    const procs = /carteira|todos os processos|geral\b/.test(n) ? [] : encontrarProcessos(q);
    if(procs.length===1){ const cli = /cliente|simples|enviar/.test(n); pdfProcesso(procs[0].id, cli); return {html:`Gerei o PDF ${cli?"do resumo para o cliente":"do relatório"} do processo <b>${esc(procs[0].numero||nomeCliente(procs[0]))}</b>. O download começou.`}; }
    if(procs.length>1) return {html:`Encontrei ${procs.length} processos. Qual deles?<div class="pickchips" style="margin-top:8px">${procs.slice(0,6).map(p=>`<button data-act="pdf-processo" data-id="${p.id}">${esc(nomeCliente(p))} · ${esc(p.numero||AREAS[p.area]?.nome||"")}</button>`).join("")}</div>`};
    if(/pauta|agenda|prazo|compromiss|semana|audienc/.test(n)){
      const m = n.match(/(\d{1,3})\s*dias/); const dias = m ? Number(m[1]) : /semana/.test(n) ? 7 : /mes\b/.test(n) ? 30 : 15;
      const resp = /minha|meus|minhas|para mim/.test(n) ? meuId() : "";
      pdfPauta({dias, resp, venc:true}); return {html:`Gerei a pauta dos próximos <b>${dias} dias</b>${resp?" com os seus compromissos":" de toda a equipe"}, incluindo os vencidos. O download começou.`};
    }
    const area = areaDoTexto(n);
    if(/carteira|processos|geral|todos|escritorio/.test(n) || area){ pdfCarteira({area}); return {html:`Gerei o relatório da carteira${area?" "+AREAS[area].nome.toLowerCase():""}. O download começou.`}; }
    return {html:`Qual relatório você quer?<div class="pickchips" style="margin-top:8px"><button data-act="ch-sug" data-q="Gere o relatório da carteira">Carteira de processos</button><button data-act="ch-sug" data-q="Gere a pauta dos próximos 15 dias">Pauta dos próximos 15 dias</button><button data-act="nav" data-v="relatorios">Relatório de um processo</button></div>`};
  }
  // mensagem ao cliente
  if(/mensagem|atualizac\w* (para|ao|pro)|whats|avis\w* (o|ao) cliente|e-?mail (para|ao) (o )?cliente/.test(n) && !verboCriar.test(n.replace(/mensagem.*/,""))){
    if(!pode("enviar_cliente")) return {html: semPermissao("montar mensagens para clientes")};
    const procs = encontrarProcessos(q);
    if(procs.length===1){ abrirModal({kind:"comunicar", id:procs[0].id}); return {html:`Abri a mensagem pronta para <b>${esc(nomeCliente(procs[0]))}</b>. Revise e copie.`}; }
    if(procs.length>1) return {html:`Para qual processo?<div class="pickchips" style="margin-top:8px">${procs.slice(0,6).map(p=>`<button data-act="comunicar" data-id="${p.id}">${esc(nomeCliente(p))} · ${esc(p.numero||"")}</button>`).join("")}</div>`};
    return {html:`Diga o nome do cliente ou o número do processo. Ex.: <i>mensagem para o cliente do processo da Maria</i>.`};
  }
  // andamento
  if(/andamento|movimenta/.test(n) && /(registr|anot|lanc|adicion|inclu|cri|nov|insir)/.test(n)){
    if(!(pode("editar_processos")||pode("registrar_andamentos"))) return {html: semPermissao("registrar andamentos")};
    const procs = encontrarProcessos(q.split(":")[0]); const texto = q.includes(":") ? q.slice(q.indexOf(":")+1).trim() : trecho(q, /andamento\s*(?:de|que|:)?\s*/i);
    if(!procs.length) return {html:"Em qual processo? Diga o nome do cliente ou o número. Ex.: <i>registre andamento no processo da Maria: juntada de procuração</i>."};
    if(procs.length>1) return {html:`Encontrei ${procs.length} processos com esse nome. Use o número do processo para eu saber qual.`};
    if(!texto) return {html:"Qual é o texto do andamento? Escreva depois de dois-pontos. Ex.: <i>…: audiência redesignada</i>."};
    const vis = !/interno|so a equipe|nao mostrar/.test(n), data = lerData(q.split(":")[0]) || hoje();
    return propor("andamento", {processo_id:procs[0].id, texto, data, visivel_cliente:vis}, "Registrar andamento", [["Processo", rotProc(procs[0])],["Data", fmt(data)],["Texto", texto],["Cliente vê", vis?"Sim":"Não (interno)"]]);
  }
  // documento
  if(/documento/.test(n) && verboCriar.test(n) && !/process/.test(n.replace(/no processo|do processo/,""))){
    if(!(pode("editar_processos")||pode("registrar_andamentos"))) return {html: semPermissao("registrar documentos")};
    const procs = encontrarProcessos(q.split(":")[0]); const nome = q.includes(":") ? q.slice(q.indexOf(":")+1).trim() : "";
    if(procs.length!==1 || !nome) return {html:"Diga o processo e o nome do documento depois de dois-pontos. Ex.: <i>adicione documento no processo da Maria: procuração assinada</i>."};
    return propor("documento", {processo_id:procs[0].id, nome, status:/assinad/.test(nrm(nome))?"Assinado":"Aguardando cliente"}, "Adicionar documento", [["Processo",rotProc(procs[0])],["Documento",nome]]);
  }
  // tarefa: prazo, audiência, reunião, diligência, peça
  const tipoT = /audienc/.test(n) ? "Audiência" : /reuniao/.test(n) ? "Reunião" : /diligenc/.test(n) ? "Diligência" : /\bpeca\b|peticao|recurso|contestacao|minuta/.test(n) && !/prazo/.test(n) ? "Peça" : /prazo/.test(n) ? "Prazo" : /tarefa|lembrete|compromisso|atividade/.test(n) ? "Peça" : "";
  if(tipoT && (verboCriar.test(n) || /\b(agend|marc|lembr)\w*/.test(n))){
    if(!pode("criar_tarefas") && !/para mim|\bme\b/.test(n)) return {html: semPermissao("criar atividades para a equipe")+" Você pode criar para você mesmo: diga <i>para mim</i>."};
    const procs = encontrarProcessos(q); const p = procs.length===1 ? procs[0] : null;
    const area = p ? p.area : areaDoTexto(n);
    let data = lerData(q), calculo = null, interno = null;
    const mp = n.match(/prazo de (\d{1,3})\s*dias?\s*(uteis|corridos)?/) || n.match(/(\d{1,3})\s*dias?\s*(uteis|corridos)/);
    if(tipoT==="Prazo" && mp){
      const cont = mp[2] || (area ? AREAS[area].contagem : "uteis");
      const mi = q.match(/(?:intima\w*|publica\w*|disponibiliza\w*)\s*(?:em|no dia|dia)?\s*(\d{1,2}[\/\-.]\d{1,2}(?:[\/\-.]\d{2,4})?|hoje|ontem)/i);
      let inicio = hoje(); if(mi){ inicio = /ontem/i.test(mi[1]) ? iso(addDays(new Date(),-1)) : (lerData(mi[1]) || hoje()); }
      const djen = /disponibiliza|djen|diario/.test(n);
      const r = P.calcPrazo({inicio, dias:Number(mp[1]), contagem:cont, djen, suspende:true});
      if(r){ data = r.fatal; interno = P.prazoInterno(r.fatal); calculo = {inicio, dias:Number(mp[1]), djen, suspende:true, contagem:cont}; }
    }
    const hora = tipoT==="Audiência"||tipoT==="Reunião" ? lerHora(q) : "";
    const pessoa = lerPessoa(q) || S.perfil;
    let titulo = q.includes(":") ? q.slice(q.indexOf(":")+1).trim() : (trecho(q, /\bpara (?:a |o )?(?=contesta|apresenta|protocol|fazer|elabora|recurso|manifesta|juntar|réplica|replica|alega)/i) || "");
    if(!titulo){ const t2 = n.match(/(contestacao|replica|recurso ordinario|recurso|apelacao|embargos|manifestacao|alegacoes finais|contrarrazoes|defesa|instrucao|conciliacao|julgamento|inicial)/); titulo = t2 ? capitaliza(t2[1].replace("contestacao","contestação").replace("replica","réplica").replace("apelacao","apelação").replace("manifestacao","manifestação").replace("alegacoes","alegações").replace("instrucao","instrução").replace("conciliacao","conciliação")) : ""; }
    if(tipoT==="Audiência" && titulo && !/audi/i.test(titulo)) titulo = "Audiência de " + titulo.toLowerCase();
    titulo = titulo ? titulo.charAt(0).toUpperCase()+titulo.slice(1) : tipoT;
    const modalidade = tipoT==="Audiência" ? (/virtual|online|video|teams|zoom|meet/.test(n) ? "Virtual" : /hibrid/.test(n) ? "Híbrida" : "Presencial") : null;
    const dados = {tipo:tipoT, titulo, processo_id:p?.id||null, data, hora:hora||null, interno, atribuido_a:pessoa?.id||meuId(), modalidade, calculo};
    if(!data){ abrirModal({kind:"tarefa", tipo:tipoT, processo_id:p?.id||"", pre:{titulo, hora, atribuido_a:dados.atribuido_a}}); return {html:`Faltou a data. Abri o formulário de <b>${tipoT.toLowerCase()}</b> com o que entendi para você completar.`}; }
    const aviso = procs.length>1 ? `<div class="small muted" style="margin-top:6px">Encontrei ${procs.length} processos com esse nome e deixei sem vínculo. Ajuste no formulário se quiser vincular.</div>` : (!p && /process/.test(n) ? `<div class="small muted" style="margin-top:6px">Não identifiquei o processo; ficará sem vínculo.</div>` : "");
    return propor("tarefa", dados, "Nova atividade: "+tipoT, [["Descrição",titulo],["Processo",p?rotProc(p):""],["Data",fmt(data)+(hora?" às "+hora:"")],["Prazo interno",interno?fmt(interno):""],["Cálculo",calculo?`${calculo.dias} dia(s) ${calculo.contagem==="uteis"?"úteis":"corridos"} a partir de ${fmt(calculo.inicio)}`:""],["Modalidade",modalidade||""],["Responsável",pessoa?pessoa.nome:""]], aviso);
  }
  // processo
  if(/process/.test(n) && verboCriar.test(n)){
    if(!pode("editar_processos")) return {html: semPermissao("cadastrar processos")};
    const exemplo = /teste|exemplo|ficticio|generico|dados gerais|qualquer|aleatori|simulad|demonstra/.test(n);
    const numero = (q.match(/\d{7}-?\d{2}\.?\d{4}\.?\d\.?\d{2}\.?\d{4}/)||[""])[0];
    const info = numero ? P.cnjInfo(numero) : null;
    let area = areaDoTexto(n) || (info && info.J==="5" ? "trabalhista" : info && info.J==="8" ? "civel" : "");
    let cliente = capitaliza(trecho(q, /\b(?:do |da |para o |para a |pro )?cliente\s+(?:é\s+|chamad[oa]\s+)?/i) || "");
    let contra = capitaliza(trecho(q, /\bcontra\s+(?:o |a |os |as )?/i) || "");
    const vara = (q.match(/\b(\d{1,3}\s*[ªaº°]?\s*vara[^,;]*)/i)||["",""])[1].trim();
    const valor = (q.match(/r\$\s*[\d.,]+(?:\s*mil)?/i)||[""])[0];
    let resumo = "", fase = FASES[0];
    if(exemplo){
      area = area || "trabalhista";
      cliente = cliente || "Cliente Teste (exemplo)";
      contra = contra || (area==="trabalhista" ? "Empresa Exemplo Ltda." : area==="criminal" ? "Ministério Público" : "Banco Exemplo S.A.");
      resumo = "Processo fictício criado pelo assistente para teste. Pode excluir quando quiser.";
    }
    const num = numero ? (info.valido ? info.formatado : numero) : (exemplo ? gerarCNJ(area==="trabalhista"?"5":"8", area==="trabalhista"?"02":"26") : "");
    const varaF = vara || (exemplo ? (area==="trabalhista" ? "1ª Vara do Trabalho de São Paulo" : area==="criminal" ? "1ª Vara Criminal de São Paulo" : "1ª Vara Cível de São Paulo") : "");
    if(!area || !cliente){
      abrirModal({kind:"processo", pre:{numero:num, area, parte_contraria:contra, vara:varaF, valor, cliente_id:(S.clientes.find(c=>nrm(c.nome)===nrm(cliente))||{}).id||""}});
      return {html:`Abri o formulário de novo processo com o que entendi. ${!area?"Falta a <b>área</b>. ":""}${!cliente?"Falta o <b>cliente</b>. ":""}<br><span class="small muted">Dica: diga <i>cadastre um processo de teste</i> para eu preencher tudo com dados fictícios.</span>`};
    }
    const existente = S.clientes.find(c=>nrm(c.nome)===nrm(cliente));
    if(!existente && !pode("gerenciar_clientes")) return {html: semPermissao("cadastrar clientes novos")+` O cliente "${esc(cliente)}" ainda não existe.`};
    const dados = {processo:{numero:num, area, fase, polo:area==="criminal"?"Acusado":"Autor / reclamante", parte_contraria:contra, vara:varaF, valor:valor||(exemplo?"R$ 50.000,00":""), resumo, resumo_cliente:exemplo?"Processo de teste.":"", responsavel_id:meuId()}, cliente, cliente_id:existente?.id||null, exemplo};
    return propor("processo", dados, exemplo?"Novo processo de teste":"Novo processo", [["Número",num||"(sem número)"],["Área",AREAS[area].nome],["Cliente",cliente+(existente?"":" (novo cadastro)")],["Parte contrária",contra],["Vara",varaF],["Valor",dados.processo.valor],["Fase",fase]],
      exemplo?`<div class="small muted" style="margin-top:6px">Também vou criar um andamento e um prazo de contestação (15 dias) para você testar agenda, relatórios e mensagens.</div>`:"");
  }
  // cliente
  if(/cliente/.test(n) && verboCriar.test(n)){
    if(!pode("gerenciar_clientes")) return {html: semPermissao("cadastrar clientes")};
    const nome = capitaliza(trecho(q, /\bcliente\s+(?:chamad[oa]\s+|novo\s+|nova\s+)?/i) || "");
    if(!nome){ abrirModal({kind:"cliente"}); return {html:"Abri o cadastro de cliente para você preencher."}; }
    const docm = q.match(/\b(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})\b/);
    const tel = (q.match(/(?:\(?\d{2}\)?\s*)?9?\d{4}[-\s]?\d{4}/)||[""])[0];
    const email = (q.match(/[\w.+-]+@[\w-]+\.[\w.]+/)||[""])[0];
    const doc = docm ? docm[1] : "", tipo = doc.replace(/\D/g,"").length===14 || /ltda|s\.?a\.?|eireli|\bme\b|empresa/i.test(nome) ? "PJ" : "PF";
    if(S.clientes.some(c=>nrm(c.nome)===nrm(nome))) return {html:`Já existe um cliente chamado <b>${esc(nome)}</b>.`};
    return propor("cliente", {nome, tipo, doc, telefone:tel.replace(doc,""), email}, "Novo cliente", [["Nome",nome],["Tipo",tipo==="PJ"?"Pessoa jurídica":"Pessoa física"],["CPF/CNPJ",doc],["Telefone",tel],["E-mail",email]]);
  }
  // concluir
  if(/\b(conclu|finaliz|marc\w* como feit|dar baixa|baixar|feito)\w*/.test(n) && !/relatorio/.test(n)){
    const ws = n.split(/[^a-z0-9]+/).filter(w=>w.length>=4 && !["concluir","conclua","concluido","finalizar","marcar","como","feito","feita","tarefa","prazo","baixa"].includes(w));
    const cand = S.tarefas.filter(t=>!t.done && ws.some(w=>nrm((t.titulo||"")+" "+nomeCliente(procById(t.processo_id))).includes(w)));
    if(cand.length===1){ const t = cand[0]; return propor("concluir", {id:t.id}, "Concluir atividade", [["Atividade",t.titulo],["Tipo",t.tipo],["Data",fmt(t.data)]]); }
    if(cand.length>1) return {html:`Qual delas?<div class="pickchips" style="margin-top:8px">${cand.slice(0,6).map(t=>`<button data-act="editar-tarefa" data-id="${t.id}">${esc(t.titulo)} · ${fmt(t.data)}</button>`).join("")}</div>`};
  }
  return null;
}
async function executarAcao(id, op){
  const pd = CH.pend[id]; if(!pd) return;
  const msg = CH.msgs.find(m=>m.pendId===id);
  const fim = html => { if(msg){ msg.html = html; msg.pendId = null; } delete CH.pend[id]; render(); };
  const d = pd.dados;
  if(op==="cancel") return fim(`<span class="muted">Ação cancelada.</span>`);
  if(op==="form"){
    delete CH.pend[id]; if(msg){ msg.html += `<div class="small muted" style="margin-top:6px">Abri no formulário para ajuste.</div>`; msg.html = msg.html.replace(/<div class="row acao-bts"[\s\S]*?<\/div>/,""); msg.pendId = null; }
    if(pd.acao==="processo") abrirModal({kind:"processo", pre:Object.assign({}, d.processo, {cliente_id:d.cliente_id||""})});
    else if(pd.acao==="tarefa") abrirModal({kind:"tarefa", tipo:d.tipo, processo_id:d.processo_id||"", pre:Object.assign({}, d, d.calculo?{inicio:d.calculo.inicio, dias:d.calculo.dias, djen:d.calculo.djen, contagem:d.calculo.contagem}:{} )});
    else if(pd.acao==="cliente") abrirModal({kind:"cliente"});
    else if(pd.acao==="andamento"||pd.acao==="documento") abrirModal({kind:"detalhe", id:d.processo_id, vivo:true, aba:"andamentos"});
    else if(pd.acao==="concluir") abrirModal({kind:"tarefa", id:d.id});
    render(); return;
  }
  const btn = document.querySelector(`[data-act="ch-ok"][data-k="${id}"]`); if(btn){ btn.disabled = true; btn.innerHTML = `<span class="spinner"></span>`; }
  const esc_id = S.escritorio.id;
  try{
    if(pd.acao==="processo"){
      let cli = d.cliente_id || (S.clientes.find(c=>nrm(c.nome)===nrm(d.cliente))||{}).id;
      if(!cli){ const c = await api.inserir("clientes", {escritorio_id:esc_id, nome:d.cliente, tipo:/ltda|s\.a\.|eireli/i.test(d.cliente)?"PJ":"PF", obs:d.exemplo?"Cliente fictício criado para teste.":null}); cli = c.id; await recarregar("clientes", true); }
      const r = await api.inserir("processos", Object.assign({escritorio_id:esc_id, cliente_id:cli}, d.processo));
      if(d.exemplo){
        await api.inserir("andamentos", {escritorio_id:esc_id, processo_id:r.id, data:hoje(), texto:"Processo cadastrado para teste pelo assistente.", visivel_cliente:true});
        const c = P.calcPrazo({inicio:hoje(), dias:15, contagem:AREAS[d.processo.area].contagem, djen:false, suspende:true});
        if(c && (pode("criar_tarefas"))) await api.inserir("tarefas", {escritorio_id:esc_id, processo_id:r.id, tipo:"Prazo", titulo:"Contestação (teste)", data:c.fatal, interno:P.prazoInterno(c.fatal), atribuido_a:meuId(), done:false, calculo:{inicio:hoje(), dias:15, djen:false, suspende:true, contagem:"auto"}});
        await Promise.all(["andamentos","tarefas"].map(t=>recarregar(t,true)));
      }
      await recarregar("processos", true);
      return fim(`✓ Processo <b>${esc(d.processo.numero||"")}</b> cadastrado para <b>${esc(d.cliente)}</b>.${d.exemplo?" Criei também um andamento e o prazo de contestação.":""} <button class="linkbtn" data-act="abrir-processo" data-id="${r.id}">Abrir processo</button>`);
    }
    if(pd.acao==="cliente"){ const r = await api.inserir("clientes", Object.assign({escritorio_id:esc_id}, d)); await recarregar("clientes", true); return fim(`✓ Cliente <b>${esc(d.nome)}</b> cadastrado. <button class="linkbtn" data-act="editar-cliente" data-id="${r.id}">Abrir cadastro</button>`); }
    if(pd.acao==="tarefa"){ const row = {tipo:d.tipo, titulo:d.titulo, processo_id:d.processo_id, data:d.data, interno:d.interno, hora:d.hora, modalidade:d.modalidade, atribuido_a:d.atribuido_a, calculo:d.calculo, done:false, escritorio_id:esc_id}; const r = await api.inserir("tarefas", row); await recarregar("tarefas", true); return fim(`✓ Agendado: <b>${esc(d.titulo)}</b> (${esc(d.tipo.toLowerCase())}) em <b>${fmt(d.data)}${d.hora?" às "+esc(d.hora):""}</b>. <button class="linkbtn" data-act="editar-tarefa" data-id="${r.id}">Abrir</button>`); }
    if(pd.acao==="andamento"){ await api.inserir("andamentos", Object.assign({escritorio_id:esc_id}, d)); await recarregar("andamentos", true); return fim(`✓ Andamento registrado. <button class="linkbtn" data-act="abrir-processo" data-id="${d.processo_id}">Abrir processo</button>`); }
    if(pd.acao==="documento"){ await api.inserir("documentos", Object.assign({escritorio_id:esc_id, data:hoje(), visivel_cliente:false}, d)); await recarregar("documentos", true); return fim(`✓ Documento <b>${esc(d.nome)}</b> adicionado.`); }
    if(pd.acao==="concluir"){ await api.atualizar("tarefas", d.id, {done:true, concluido_em:new Date().toISOString()}); await recarregar("tarefas", true); return fim(`✓ Atividade concluída.`); }
  }catch(e){ if(btn){ btn.disabled = false; btn.textContent = "Confirmar"; } toast(P.erroAmigavel(e)); }
}

/* ---------- PEÇAS E DOCUMENTOS (inicial, contrato, procuração, checklist, teses) ---------- */
const PC = {aba:"inicial", modelo:"civ_consumidor", processo_id:"", cliente_id:"", cidade:"", juizo:"", contraria:"", contrariaQuali:"", resumo:"", fatos:"", cronologia:"", citacao:"", teses:null, pedidos:"", valorCausa:"", testemunhas:"", advogado:"",
  ccli:"", cproc:"", objeto:"", fixo:"", entrada:"", parcelas:"", exito:"", forma:"", especiais:[], finalidade:"", advs:null, kproc:"", ktipo:"", tema:""};
const docsCfg = () => (P.cfg().docs || {});
const modelosDe = tipo => (S.modelos||[]).filter(m=>m.tipo===tipo);
function tesesDisponiveis(area){
  const proprias = modelosDe("tese").filter(m=>!area || m.area===area).map(m=>({id:"m:"+m.id, area:m.area, titulo:m.titulo, texto:m.texto||"", fundamento:(m.extra||{}).fundamento||"", pedido:(m.extra||{}).pedido||"", propria:true}));
  return proprias.concat(P.TESES.filter(t=>!area || t.area===area));
}
function checklistsDisponiveis(area){
  const base = Object.entries(P.CHECKLISTS).filter(([,c])=>!area || c.area===area).map(([k,c])=>[k, c.nome, c.itens]);
  return modelosDe("checklist").filter(m=>!area || m.area===area).map(m=>["m:"+m.id, m.titulo+" (escritório)", String(m.texto||"").split(/\n+/).map(s=>s.trim()).filter(Boolean)]).concat(base);
}
function abrirPecas(aba, pre){ Object.assign(PC, pre||{}, {aba}); if(pre && pre.processo_id) pcProcesso(pre.processo_id, aba); view = "pecas"; fecharModal(); render(); window.scrollTo(0,0); }
function pcProcesso(pid, aba){
  const p = procById(pid); if(!p) return;
  if(aba==="checklist"){ PC.kproc = pid; PC.ktipo = ""; return; }
  if(aba==="contrato"){ PC.cproc = pid; PC.ccli = p.cliente_id||""; return; }
  PC.processo_id = pid; PC.cliente_id = p.cliente_id || ""; PC.contraria = p.parte_contraria || "";
  if(!P.MODELOS_PECA[PC.modelo] || P.MODELOS_PECA[PC.modelo].area!==p.area){ const k = Object.keys(P.MODELOS_PECA).find(k=>P.MODELOS_PECA[k].area===p.area); if(k){ PC.modelo = k; PC.teses = null; } }
}
function vPecas(){
  const abas = [["inicial","Petição e peças"],["contrato","Contrato e procuração"],["checklist","Checklist de documentos"],["modelos","Teses e modelos"]];
  const corpo = PC.aba==="contrato" ? pcContrato() : PC.aba==="checklist" ? pcChecklist() : PC.aba==="modelos" ? pcModelos() : pcInicial();
  return `<div class="head"><div><h1>Peças e documentos</h1><div class="sub">Primeira versão de peças, contrato, procuração e checklist no modelo do escritório, com visual law. Você revisa, ajusta e assina.</div></div></div>
  <div class="tabs" role="tablist"><span class="ind"></span>${abas.map(([k,l])=>`<button role="tab" aria-selected="${PC.aba===k}" data-act="pc-aba" data-a="${k}">${l}</button>`).join("")}</div>
  ${!docsCfg().nome && pode("gerenciar_equipe") ? `<div class="notice">Cadastre os dados do escritório (nome, CNPJ, endereço, advogados, logo e cores) em <button class="linkbtn" data-act="nav" data-v="equipe">Equipe e acessos › Ajustes</button> para eles saírem nos documentos.</div>` : ""}
  ${corpo}`;
}
const camposFaltando = c => { if(!c) return ["cliente"]; const d = c.dados||{}; return (c.tipo==="PJ" ? [["doc","CNPJ"],["endereco","endereço"],["representante","representante legal"]] : [["doc","CPF"],["rg","RG"],["nacionalidade","nacionalidade"],["estado_civil","estado civil"],["profissao","profissão"],["endereco","endereço"]]).filter(([k])=>!(k==="doc"?c.doc:d[k])).map(([,l])=>l); };
function avisoCliente(cid){
  const c = cliById(cid); if(!c) return "";
  const f = camposFaltando(c);
  return f.length ? `<div class="notice small">Faltam dados de <b>${esc(c.nome)}</b> para a qualificação: ${f.join(", ")}. <button class="linkbtn" data-act="editar-cliente" data-id="${c.id}">Completar cadastro</button> · ou eles saem destacados em amarelo para preencher.</div>` : `<div class="small muted">Qualificação de ${esc(c.nome)} completa.</div>`;
}
const optsProc = sel => `<option value="">Sem processo vinculado</option>` + opts(S.processos.slice().sort((a,b)=>nomeCliente(a).localeCompare(nomeCliente(b))).map(p=>[p.id, nomeCliente(p)+(p.numero?" · "+p.numero:"")+" · "+(AREAS[p.area]?.nome||"")]), sel);
const optsCli = sel => `<option value="">Selecione</option>` + opts(S.clientes.slice().sort((a,b)=>a.nome.localeCompare(b.nome)).map(c=>[c.id,c.nome]), sel);
function pcInicial(){
  const M = P.MODELOS_PECA[PC.modelo];
  if(!PC.teses) PC.teses = M.teses.slice();
  if(!PC.pedidos && M) PC.pedidos = "";
  const advs = P.advogadosDoc(docsCfg());
  const teses = tesesDisponiveis(M.area);
  return `<div class="pc-grid">
  <div class="panel"><div class="panel-b pc-form">
    <div class="grid2">
      <label class="f">Tipo de peça<select data-bind="PC.modelo" data-re="modelo">${Object.entries(P.MODELOS_PECA).map(([k,m])=>`<option value="${k}" ${PC.modelo===k?"selected":""}>${esc(AREAS[m.area].nome)} · ${esc(m.nome)}</option>`).join("")}</select></label>
      <label class="f">Processo (opcional)<select data-bind="PC.processo_id" data-re="processo">${optsProc(PC.processo_id)}</select></label>
      <label class="f">Cliente<select data-bind="PC.cliente_id" data-re="1">${optsCli(PC.cliente_id)}</select></label>
      <label class="f">Cidade / comarca<input type="text" data-bind="PC.cidade" value="${esc(PC.cidade || docsCfg().cidade || "")}" placeholder="Ex.: São Paulo"></label>
      ${M.defesa?"":`<label class="f">Parte contrária<input type="text" data-bind="PC.contraria" value="${esc(PC.contraria)}" placeholder="Nome ou razão social"></label>
      <label class="f">Qualificação da parte contrária<input type="text" data-bind="PC.contrariaQuali" value="${esc(PC.contrariaQuali)}" placeholder="CNPJ, endereço"></label>`}
    </div>
    ${avisoCliente(PC.cliente_id)}
    <label class="f">Endereçamento (juízo)<input type="text" data-bind="PC.juizo" value="${esc(PC.juizo)}" placeholder="${esc(M.juizo.replace("{cidade}", (PC.cidade||"___").toUpperCase()))}"></label>
    <label class="f">Resumo do caso (2 ou 3 linhas)<textarea rows="2" data-bind="PC.resumo" placeholder="Ex.: Consumidor comprou ingresso para área coberta que não existia no dia do evento.">${esc(PC.resumo)}</textarea></label>
    <label class="f">Fatos<textarea rows="7" data-bind="PC.fatos" placeholder="Conte o que aconteceu, em ordem. Cada parágrafo vira um parágrafo da peça.">${esc(PC.fatos)}</textarea></label>
    <label class="f">Linha do tempo (opcional, uma por linha: 10/03/2026 - fato)<textarea rows="3" data-bind="PC.cronologia" placeholder="05/02/2026 - Compra do ingresso&#10;14/03/2026 - Dia do evento, sem cobertura&#10;20/03/2026 - Reclamação sem resposta">${esc(PC.cronologia)}</textarea></label>
    <label class="f">Trecho em destaque (opcional: frase da publicidade, contrato ou documento)<input type="text" data-bind="PC.citacao" value="${esc(PC.citacao)}" placeholder='Ex.: "Teremos áreas cobertas em todos os setores"'></label>
    <label class="f">Pedidos adicionais (um por linha)<textarea rows="3" data-bind="PC.pedidos" placeholder="Ex.: a condenação ao pagamento de R$ 10.000,00 por danos morais">${esc(PC.pedidos)}</textarea></label>
    ${M.defesa?`<label class="f">Rol de testemunhas (opcional)<textarea rows="2" data-bind="PC.testemunhas">${esc(PC.testemunhas)}</textarea></label>`:M.intermediaria?"":`<label class="f">Valor da causa<input type="text" data-bind="PC.valorCausa" value="${esc(PC.valorCausa)}" placeholder="R$"></label>`}
    <label class="f">Assinatura<select data-bind="PC.advogado">${opts([["","Selecione o(a) advogado(a)"]].concat(advs.map(a=>[a,a.split(",")[0]])).concat(equipeAtiva().filter(u=>u.papel!=="estagiario").map(u=>[u.nome, u.nome])), PC.advogado)}</select></label>
  </div></div>
  <div class="panel pc-teses"><div class="panel-b" style="display:flex;flex-direction:column;gap:8px">
    <h2 style="font-size:1.05rem;margin:0">Teses (${PC.teses.length})</h2>
    <span class="hint">Marque as que entram no "Do direito". As do escritório aparecem primeiro; cadastre novas em Teses e modelos.</span>
    <div class="tese-list">${teses.map(t=>`<label class="tese ${PC.teses.includes(t.id)?"on":""}"><input type="checkbox" data-act="pc-tese" data-id="${esc(t.id)}" ${PC.teses.includes(t.id)?"checked":""}><span><b>${esc(t.titulo)}${t.propria?` <span class="chip accent">escritório</span>`:""}</b><span class="small muted">${esc(t.fundamento||"")}</span></span></label>`).join("")}</div>
    <button class="btn primary block" data-act="pc-gerar-peca">${ICON.minutas} Gerar primeira versão</button>
    <span class="hint">Campos sem dado saem destacados em amarelo para você completar. Baixe em Word para editar ou salve em PDF.</span>
  </div></div></div>`;
}
function gerarPeca(){
  const M = P.MODELOS_PECA[PC.modelo], todas = tesesDisponiveis(M.area);
  const teses = PC.teses.map(id=>todas.find(t=>t.id===id)).filter(Boolean);
  const p = procById(PC.processo_id);
  const pedidos = String(PC.pedidos||"").split(/\n+/).map(s=>s.trim()).filter(Boolean);
  const html = P.montarPeca({modelo:PC.modelo, docs:docsCfg(), escritorio:S.escritorio?.nome, cliente:cliById(PC.cliente_id), cidade:PC.cidade || docsCfg().cidade, juizo:PC.juizo, contraria:PC.contraria, contrariaQuali:PC.contrariaQuali, resumo:PC.resumo, fatos:PC.fatos, cronologia:PC.cronologia, citacao:PC.citacao, teses, pedidos, valorCausa:PC.valorCausa, testemunhas:PC.testemunhas, advogado:PC.advogado, numero:(M.defesa||M.intermediaria) && p ? p.numero : "", valores: M.liquidos ? teses.map(t=>t.pedido).filter(Boolean).concat(pedidos).map(x=>[x.charAt(0).toUpperCase()+x.slice(1), ""]) : []});
  abrirModal({kind:"docgerado", html, nome:`${M.nome} - ${cliById(PC.cliente_id)?.nome||"cliente"}`, processo_id:PC.processo_id});
}
function pcContrato(){
  const advs = P.advogadosDoc(docsCfg());
  if(!PC.advs) PC.advs = advs.slice(0,1);
  return `<div class="pc-grid">
  <div class="panel"><div class="panel-b pc-form">
    <div class="grid2">
      <label class="f">Cliente<select data-bind="PC.ccli" data-re="1">${optsCli(PC.ccli)}</select></label>
      <label class="f">Processo (opcional)<select data-bind="PC.cproc" data-re="cproc">${optsProc(PC.cproc)}</select></label>
    </div>
    ${avisoCliente(PC.ccli)}
    <label class="f">Objeto do contrato / finalidade da procuração<textarea rows="3" data-bind="PC.objeto" placeholder="Ex.: ajuizamento e acompanhamento de ação indenizatória contra Empresa X, decorrente de ...">${esc(PC.objeto)}</textarea></label>
    <h3 style="margin:4px 0 0">Honorários</h3>
    <div class="grid2">
      <label class="f">Valor fixo<input type="text" data-bind="PC.fixo" value="${esc(PC.fixo)}" placeholder="R$ 3.000,00"></label>
      <label class="f">Entrada<input type="text" data-bind="PC.entrada" value="${esc(PC.entrada)}" placeholder="R$ 1.000,00"></label>
      <label class="f">Parcelas do saldo<input type="text" data-bind="PC.parcelas" value="${esc(PC.parcelas)}" placeholder="4x de R$ 500,00"></label>
      <label class="f">Êxito (%)<input type="number" min="0" max="50" data-bind="PC.exito" value="${esc(PC.exito)}" placeholder="30"></label>
      <label class="f">Forma de pagamento<input type="text" data-bind="PC.forma" value="${esc(PC.forma)}" placeholder="PIX ou boleto, todo dia 10"></label>
      <label class="f">Cidade (foro e assinatura)<input type="text" data-bind="PC.cidade" value="${esc(PC.cidade || docsCfg().cidade || "")}"></label>
    </div>
    <h3 style="margin:4px 0 0">Advogados que constam</h3>
    ${advs.length?`<div class="pickchips">${advs.map(a=>`<button data-act="pc-adv" data-v="${esc(a)}" aria-pressed="${PC.advs.includes(a)}" class="${PC.advs.includes(a)?"on":""}">${esc(a.split(",")[0])}</button>`).join("")}</div>`:`<div class="notice small">Cadastre os advogados (nome, OAB, e-mail, um por linha) em Equipe e acessos › Ajustes › Dados para documentos.</div>`}
    <h3 style="margin:4px 0 0">Poderes especiais da procuração (art. 105 do CPC)</h3>
    <div class="perm compact">${P.PODERES_ESPECIAIS.map(x=>`<label><input type="checkbox" data-act="pc-poder" data-v="${esc(x)}" ${PC.especiais.includes(x)?"checked":""}><span><b>${esc(x.charAt(0).toUpperCase()+x.slice(1))}</b></span></label>`).join("")}</div>
  </div></div>
  <div class="panel pc-teses"><div class="panel-b" style="display:flex;flex-direction:column;gap:10px">
    <h2 style="font-size:1.05rem;margin:0">Gerar com um clique</h2>
    <p class="small muted" style="margin:0">Os dois documentos saem no modelo do escritório, com a qualificação do cliente, os advogados selecionados e o quadro de honorários.</p>
    <button class="btn primary block" data-act="pc-gerar-contrato">${ICON.minutas} Contrato de honorários</button>
    <button class="btn primary block" data-act="pc-gerar-procuracao">${ICON.minutas} Procuração</button>
    <button class="btn block" data-act="pc-gerar-ambos">Gerar os dois</button>
    <span class="hint">Depois de assinados, registre os documentos no processo para o cliente acompanhar.</span>
  </div></div></div>`;
}
function gerarContrato(qual){
  const c = cliById(PC.ccli); if(!c){ toast("Escolha o cliente."); return; }
  const base = {docs:docsCfg(), escritorio:S.escritorio?.nome, cliente:c, cidade:PC.cidade || docsCfg().cidade, advogados:PC.advs||[]};
  if(qual!=="procuracao") abrirModal({kind:"docgerado", html:P.montarContrato(Object.assign({}, base, {objeto:PC.objeto, honorarios:{fixo:PC.fixo, entrada:PC.entrada, parcelas:PC.parcelas, exito:PC.exito, forma:PC.forma}})), nome:`Contrato de honorários - ${c.nome}`, processo_id:PC.cproc, proximo: qual==="ambos" ? "procuracao" : "", financeiro:true});
  else abrirModal({kind:"docgerado", html:P.montarProcuracao(Object.assign({}, base, {especiais:PC.especiais, finalidade:PC.objeto})), nome:`Procuração - ${c.nome}`, processo_id:PC.cproc});
}
function pcChecklist(){
  const p = procById(PC.kproc);
  const lista = checklistsDisponiveis(p?.area);
  if(p && !PC.ktipo){ const k = lista.find(x=>P.CHECKLISTS[x[0]]?.area===p.area) || lista[0]; PC.ktipo = k ? k[0] : ""; }
  const ck = lista.find(x=>x[0]===PC.ktipo);
  const docs = p ? docsDe(p.id) : [];
  const achar = nome => docs.find(d=>nrm(d.nome)===nrm(nome));
  const ok = d => d && ["Recebido","Assinado","Protocolado","Enviado pelo cliente"].includes(d.status);
  const itens = ck ? ck[2] : [];
  const faltam = itens.filter(i=>!ok(achar(i)));
  const cli = p ? cliById(p.cliente_id) : null;
  const msg = P.mensagemDocs(cli?.nome, faltam, S.escritorio?.nome);
  const tel = String(cli?.telefone||"").replace(/\D/g,"");
  return `<div class="pc-grid">
  <div class="panel"><div class="panel-b pc-form">
    <div class="grid2">
      <label class="f">Processo<select data-bind="PC.kproc" data-re="kproc">${optsProc(PC.kproc).replace("Sem processo vinculado","Selecione o processo")}</select></label>
      <label class="f">Tipo de ação<select data-bind="PC.ktipo" data-re="1" ${p?"":"disabled"}>${lista.map(([k,n])=>`<option value="${esc(k)}" ${PC.ktipo===k?"selected":""}>${esc(n)}</option>`).join("")}</select></label>
    </div>
    ${!p?`<div class="empty small"><p>Escolha um processo para ver o que falta e montar a mensagem de cobrança.</p></div>`:`
    <div class="checklist">${itens.map(i=>{ const d = achar(i); return `<label class="ck ${ok(d)?"on":""}"><input type="checkbox" data-act="pc-ck" data-nome="${esc(i)}" ${ok(d)?"checked":""}><span>${esc(i)}</span>${d?`<span class="chip ${ok(d)?"ok":"warn"}">${esc(d.status)}</span>`:`<span class="chip neutral">não pedido</span>`}</label>`; }).join("")}</div>
    <div class="row" style="justify-content:space-between"><span class="small muted">${itens.length-faltam.length} de ${itens.length} recebidos</span>${faltam.some(i=>!achar(i))?`<button class="btn" data-act="pc-ck-criar">Adicionar itens pendentes ao processo</button>`:""}</div>
    <span class="hint">Os itens viram documentos do processo, com situação "Aguardando cliente". Marcou, vira "Recebido". O cliente vê a lista no portal.</span>`}
  </div></div>
  <div class="panel pc-teses"><div class="panel-b" style="display:flex;flex-direction:column;gap:10px">
    <h2 style="font-size:1.05rem;margin:0">Mensagem pronta</h2>
    ${!p?`<span class="small muted">Aparece aqui depois de escolher o processo.</span>`:!faltam.length?`<div class="okmsg">Tudo recebido. Nenhuma cobrança pendente.</div>`:`
    <textarea id="ck-msg" rows="10" class="msg-pronta">${esc(msg)}</textarea>
    <div class="row" style="gap:8px"><button class="btn primary" data-act="copiar-txt-el" data-el="ck-msg">${ICON.copy}Copiar</button>${tel?`<a class="btn" href="https://wa.me/${tel.length<=11?"55"+tel:tel}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">${ICON.wa}Abrir no WhatsApp</a>`:""}</div>
    <span class="hint">Nada é enviado sozinho: você copia ou abre o WhatsApp com o texto pronto.</span>`}
  </div></div></div>`;
}
function pcModelos(){
  const pode_ = pode("editar_processos") || pode("revisar_minutas");
  const linha = (m, tipo) => `<div class="mod-row"><div style="min-width:0"><b>${esc(m.titulo)}</b> ${chipArea(m.area)}<div class="small muted mod-prev">${esc((m.texto||"").slice(0,140))}</div></div>${pode_?`<div class="row" style="gap:4px;flex-wrap:nowrap"><button class="btn ghost" data-act="pc-mod-editar" data-id="${m.id}">Editar</button><button class="icon-btn" data-act="excluir" data-col="modelos" data-id="${m.id}" aria-label="Excluir">${ICON.x}</button></div>`:""}</div>`;
  return `<div class="dg-grid">
  <div class="dg-col" style="display:flex;flex-direction:column;gap:16px;min-width:0">
    <div class="panel"><div class="panel-h"><h2>Teses do escritório</h2>${pode_?`<button class="btn primary" data-act="pc-mod-novo" data-t="tese">${ICON.plus}Nova tese</button>`:""}</div><div class="panel-b">
      ${modelosDe("tese").length?modelosDe("tese").map(m=>linha(m)).join(""):`<div class="empty small"><p>Cadastre as teses que o escritório usa. Elas aparecem marcáveis no gerador de peças, com o fundamento e o pedido correspondente.</p></div>`}</div></div>
    <div class="panel"><div class="panel-h"><h2>Checklists do escritório</h2>${pode_?`<button class="btn" data-act="pc-mod-novo" data-t="checklist">${ICON.plus}Novo checklist</button>`:""}</div><div class="panel-b">
      ${modelosDe("checklist").length?modelosDe("checklist").map(m=>linha(m)).join(""):`<div class="empty small"><p>Crie listas de documentos para tipos de ação que o escritório atende.</p></div>`}</div></div>
  </div>
  <div class="panel dg-col"><div class="panel-b" style="display:flex;flex-direction:column;gap:8px">
    <h2 style="font-size:1.05rem;margin:0">Teses prontas do app</h2><span class="hint">Copie para o escritório para editar o texto do seu jeito.</span>
    ${["trabalhista","civel","criminal"].map(a=>`<h3 style="margin:10px 0 2px">${AREAS[a].nome}</h3>${P.TESES.filter(t=>t.area===a).map(t=>`<div class="mod-row"><div style="min-width:0"><b>${esc(t.titulo)}</b><div class="small muted">${esc(t.fundamento)}</div></div>${pode_?`<button class="btn ghost" data-act="pc-mod-copiar" data-id="${t.id}">Copiar</button>`:""}</div>`).join("")}`).join("")}
  </div></div></div>`;
}
function mModelo(m){
  const x = m.x || (m.x = m.id ? JSON.parse(JSON.stringify((S.modelos||[]).find(y=>y.id===m.id)||{})) : Object.assign({tipo:m.tipo||"tese", area:"civel", titulo:"", texto:"", extra:{}}, m.pre||{}));
  const tese = x.tipo==="tese";
  return cab(m.id?"Editar "+(tese?"tese":"checklist"):"Nova "+(tese?"tese":"lista de documentos")) + `<form class="sheet-b" autocomplete="off"><div class="grid2">
    <label class="f">Área<select id="md-area">${opts(Object.entries(AREAS).map(([k,v])=>[k,v.nome]), x.area)}</select></label>
    <label class="f">${tese?"Título da tese":"Tipo de ação"}<input type="text" id="md-tit" value="${esc(x.titulo||"")}" placeholder="${tese?"Ex.: Dano moral por atraso de voo":"Ex.: Revisional de contrato bancário"}"></label>
    <label class="f span2">${tese?"Texto (vira o parágrafo da peça)":"Documentos (um por linha)"}<textarea id="md-txt" rows="${tese?8:10}">${esc(x.texto||"")}</textarea></label>
    ${tese?`<label class="f span2">Fundamento legal<input type="text" id="md-fund" value="${esc((x.extra||{}).fundamento||"")}" placeholder="Ex.: CDC, art. 14; CC, art. 927"></label>
    <label class="f span2">Pedido correspondente (opcional)<input type="text" id="md-ped" value="${esc((x.extra||{}).pedido||"")}" placeholder="Ex.: a condenação ao pagamento de indenização por danos morais"></label>`:""}
  </div></form><div class="sheet-f"><button class="btn" data-act="fechar">Cancelar</button><button class="btn primary" data-act="pc-mod-salvar">Salvar</button></div>`;
}
function mDocGerado(m){
  return cab(esc(m.nome), "Primeira versão · campos em amarelo para completar") + `<div class="sheet-b" style="padding:0"><iframe id="doc-frame" class="doc-frame" title="Documento"></iframe></div>
  <div class="sheet-f">${m.financeiro && pode("financeiro")?`<button class="btn ghost" data-act="doc-financeiro" style="margin-right:auto">Lançar parcelas no financeiro</button>`:""}${m.processo_id && (pode("editar_processos")||pode("registrar_andamentos"))?`<button class="btn ghost" data-act="doc-registrar" ${m.financeiro&&pode("financeiro")?"":`style="margin-right:auto"`}>Registrar no processo</button>`:""}<button class="btn" data-act="doc-word">${ICON.pdf}Baixar Word</button><button class="btn" data-act="doc-imprimir">Imprimir / PDF</button>${m.proximo?`<button class="btn primary" data-act="doc-proximo">Próximo: procuração ${ICON.arrow}</button>`:`<button class="btn primary" data-act="fechar">Concluir</button>`}</div>`;
}
async function acaoPecas(a, el){
  switch(a){
    case "pc-aba": PC.aba = el.dataset.a; render(); return true;
    case "pc-tese": { const id = el.dataset.id; PC.teses = el.checked ? PC.teses.concat(id) : PC.teses.filter(x=>x!==id); el.closest(".tese")?.classList.toggle("on", el.checked); const h = el.closest(".panel-b")?.querySelector("h2"); if(h) h.textContent = `Teses (${PC.teses.length})`; return true; }
    case "pc-gerar-peca": gerarPeca(); return true;
    case "pc-adv": { const v = el.dataset.v; PC.advs = PC.advs.includes(v) ? PC.advs.filter(x=>x!==v) : PC.advs.concat(v); render(); return true; }
    case "pc-poder": { const v = el.dataset.v; PC.especiais = el.checked ? PC.especiais.concat(v) : PC.especiais.filter(x=>x!==v); return true; }
    case "pc-gerar-contrato": gerarContrato("contrato"); return true;
    case "pc-gerar-procuracao": gerarContrato("procuracao"); return true;
    case "pc-gerar-ambos": gerarContrato("ambos"); return true;
    case "doc-proximo": gerarContrato("procuracao"); return true;
    case "pc-ck": {
      const p = procById(PC.kproc); if(!p) return true; const nome = el.dataset.nome; const d = docsDe(p.id).find(x=>nrm(x.nome)===nrm(nome));
      await comErro(async()=>{ if(d) await api.atualizar("documentos", d.id, {status: el.checked ? "Recebido" : "Aguardando cliente"}); else await api.inserir("documentos", {escritorio_id:S.escritorio.id, processo_id:p.id, nome, status: el.checked?"Recebido":"Aguardando cliente", data:hoje(), visivel_cliente:true}); await recarregar("documentos", true); render(); });
      return true; }
    case "pc-ck-criar": {
      const p = procById(PC.kproc); const ck = checklistsDisponiveis(p?.area).find(x=>x[0]===PC.ktipo); if(!p || !ck) return true;
      const ja = new Set(docsDe(p.id).map(d=>nrm(d.nome)));
      await comErro(async()=>{ for(const nome of ck[2].filter(i=>!ja.has(nrm(i)))) await api.inserir("documentos", {escritorio_id:S.escritorio.id, processo_id:p.id, nome, status:"Aguardando cliente", data:hoje(), visivel_cliente:true}); await recarregar("documentos", true); toast("Checklist adicionado ao processo"); render(); });
      return true; }
    case "copiar-txt-el": { const t = el.dataset.txt || document.getElementById(el.dataset.el)?.value || ""; try{ await navigator.clipboard.writeText(t); toast(el.dataset.txt ? "Ementa copiada" : "Mensagem copiada"); }catch(_){ toast("Selecione e copie o texto"); } return true; }
    case "pc-mod-novo": abrirModal({kind:"modelo", tipo:el.dataset.t}); return true;
    case "pc-mod-editar": abrirModal({kind:"modelo", id:el.dataset.id}); return true;
    case "pc-mod-copiar": { const t = P.TESES.find(x=>x.id===el.dataset.id); abrirModal({kind:"modelo", tipo:"tese", pre:{area:t.area, titulo:t.titulo, texto:t.texto, extra:{fundamento:t.fundamento, pedido:t.pedido}}}); return true; }
    case "pc-mod-salvar": {
      const x = modal.x, row = {tipo:x.tipo, area:$("#md-area").value, titulo:$("#md-tit").value.trim(), texto:$("#md-txt").value, extra:x.tipo==="tese"?{fundamento:$("#md-fund").value.trim(), pedido:$("#md-ped").value.trim()}:{}};
      if(!row.titulo){ toast("Informe o título."); return true; }
      await comErro(async()=>{ if(modal.id) await api.atualizar("modelos", modal.id, row); else await api.inserir("modelos", Object.assign({escritorio_id:S.escritorio.id}, row)); await recarregar("modelos", true); fecharModal(); toast("Salvo"); render(); });
      return true; }
    case "doc-word": P.baixarWord(modal.html, modal.nome); return true;
    case "doc-imprimir": { const f = $("#doc-frame"); try{ f.contentWindow.focus(); f.contentWindow.print(); }catch(_){ const w = window.open("", "_blank"); w.document.write(modal.html); w.document.close(); w.print(); } return true; }
    case "doc-registrar": await comErro(async()=>{ await api.inserir("documentos", {escritorio_id:S.escritorio.id, processo_id:modal.processo_id, nome:modal.nome, status:"Rascunho", data:hoje(), visivel_cliente:false}); await recarregar("documentos", true); toast("Registrado no processo"); }); return true;
    case "radar-add": { const t = ($("#radar-in")?.value||"").trim(); if(!t) return true; await comErro(async()=>{ await api.inserir("modelos", {escritorio_id:S.escritorio.id, tipo:"tema", area:"", titulo:t, texto:""}); await recarregar("modelos", true); PC.tema = ""; await atualizarRadar(true); }); return true; }
    case "radar-atualizar": await atualizarRadar(true); return true;
  }
  return false;
}
function pcMudou(k){
  if(k==="modelo"){ PC.teses = null; }
  if(k==="processo"){ pcProcesso(PC.processo_id, "inicial"); }
  if(k==="cproc"){ const p = procById(PC.cproc); if(p){ PC.ccli = p.cliente_id || PC.ccli; if(!PC.objeto) PC.objeto = `atuação no processo ${p.numero||""} (${AREAS[p.area]?.nome||""}) contra ${p.parte_contraria||""}`.replace(/\s+/g," "); } }
  if(k==="kproc"){ PC.ktipo = ""; }
  render();
}
/* ---------- Radar semanal das teses (assistente que estuda) ---------- */
let RADAR = null, radarOcupado = false;
const chaveRadar = () => "pauta-radar-" + (S.escritorio?.id||"");
function lerRadar(){ if(RADAR) return RADAR; try{ RADAR = JSON.parse(localStorage.getItem(chaveRadar())||"null"); }catch(_){ RADAR = null; } return RADAR; }
async function atualizarRadar(forcar){
  const temas = modelosDe("tema"); if(!temas.length || radarOcupado) return;
  const r = lerRadar();
  if(!forcar && r && Date.now() - r.quando < 7*24*3600*1000 && temas.every(t=>r.itens[t.titulo])) return;
  radarOcupado = true; if($("#main")) render();
  const itens = {};
  await Promise.all(temas.map(async t=>{ try{ itens[t.titulo] = await api.radar(t.titulo); }catch(_){ itens[t.titulo] = (r&&r.itens[t.titulo]) || []; } }));
  RADAR = {quando:Date.now(), itens}; try{ localStorage.setItem(chaveRadar(), JSON.stringify(RADAR)); }catch(_){}
  radarOcupado = false; if(view==="direito") render();
}
function blocoRadar(){
  if(!S.perfil || ehCliente()) return "";
  const temas = modelosDe("tema"), r = lerRadar();
  if(temas.length && (!r || Date.now()-r.quando > 7*24*3600*1000) && !radarOcupado) setTimeout(()=>atualizarRadar(false), 50);
  const pode_ = pode("editar_processos") || pode("revisar_minutas");
  return `<div class="panel radar"><div class="panel-h"><div><h2>Radar semanal das teses</h2><div class="small muted">Toda semana o app busca o que saiu de novo sobre os temas que o escritório atende. Você abre o inteiro teor antes de citar.</div></div>
    <div class="row" style="gap:6px">${r?`<span class="small muted">Atualizado em ${new Date(r.quando).toLocaleDateString("pt-BR")}</span>`:""}<button class="btn" data-act="radar-atualizar" ${radarOcupado||!temas.length?"disabled":""}>${radarOcupado?`<span class="spinner"></span>`:ICON.refresh} Atualizar</button></div></div>
    <div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
      ${pode_?`<div class="row" style="gap:6px;flex-wrap:nowrap"><input type="text" id="radar-in" placeholder="Novo tema: ex. dano moral atraso de voo, horas extras motorista, tráfico privilegiado" style="flex:1"><button class="btn primary" data-act="radar-add">${ICON.plus}Adicionar</button></div>`:""}
      ${!temas.length?`<div class="empty small"><p>Cadastre os temas que o escritório acompanha. O radar mostra as novidades da semana e atalhos para os julgados no STF, STJ, TST e JusBrasil.</p></div>`:
      `<div class="radar-grid">${temas.map(t=>{ const its = (r && r.itens[t.titulo]) || []; return `<div class="radar-tema"><div class="row" style="justify-content:space-between;flex-wrap:nowrap"><b>${esc(t.titulo)}</b>${pode_?`<button class="icon-btn" data-act="excluir" data-col="modelos" data-id="${t.id}" aria-label="Remover tema">${ICON.x}</button>`:""}</div>
        ${its.length?`<ul>${its.slice(0,5).map(i=>`<li><a href="${esc(i.link)}" target="_blank" rel="noopener">${esc(i.titulo)}</a> <span class="muted small">${esc(i.fonte||"")}${i.data?" · "+new Date(i.data).toLocaleDateString("pt-BR",{day:"2-digit",month:"short"}):""}</span></li>`).join("")}</ul>`:`<div class="small muted">${radarOcupado?"Buscando…":"Nenhuma novidade nesta semana."}</div>`}
        <div class="row" style="gap:6px"><span class="small muted">Julgados:</span>${["stf","stj","tst","jusbrasil"].map(o=>`<button class="linkbtn small" data-act="juris" data-o="${o}" data-q="${esc(t.titulo)}">${P.ONDE_PESQUISAR.find(x=>x[0]===o)[1]}</button>`).join("")}</div></div>`; }).join("")}</div>`}
    </div></div>`;
}

/* =====================================================================
   VERSÃO 3: portal resumido, envio de arquivos, financeiro, atendimentos,
   calculadoras, painel do gestor, DataJud e agenda no celular
   ===================================================================== */
const moeda = v => (Number(v)||0).toLocaleString("pt-BR",{style:"currency", currency:"BRL"});
const numBR = s => { const t = String(s||"").replace(/[^\d,.-]/g,""); if(!t) return 0; const n = t.includes(",") ? t.replace(/\./g,"").replace(",",".") : t; return Number(n)||0; };
const waLink = (tel, txt) => { const d = String(tel||"").replace(/\D/g,""); if(d.length<10) return ""; return `https://wa.me/${d.length<=11?"55"+d:d}?text=${encodeURIComponent(txt||"")}`; };
const nomeArquivo = n => String(n||"arquivo").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w.\-]+/g,"_").slice(-80);

/* ---------- PORTAL DO CLIENTE (resumido) ---------- */
function vPortal(){
  const pt = S.portal;
  if(!pt) return `<div class="panel"><div class="empty"><span class="spinner"></span><p>Carregando seus processos…</p></div></div>`;
  if(!pt.vinculado) return `<div class="portal-hero"><h1>Olá, ${esc(P.primeiroNome(S.perfil.nome))}</h1><p class="muted" style="margin:0">Seu acesso está ativo. O escritório <b class="gold">${esc(pt.escritorio)}</b> ainda vai vincular seus processos ao seu cadastro.</p></div>`;
  const ps = pt.processos || [];
  const auds = ps.flatMap(p=>(p.audiencias||[]).map(a=>Object.assign({proc:p}, a))).sort((a,b)=>(a.data+(a.hora||"")).localeCompare(b.data+(b.hora||"")));
  const pend = ps.flatMap(p=>(p.documentos||[]).filter(d=>d.status==="Aguardando cliente").map(d=>Object.assign({proc:p}, d)));
  const advs = []; ps.forEach(p=>{ if(p.advogado && !advs.some(a=>a.nome===p.advogado.nome)) advs.push(Object.assign({proc:p}, p.advogado)); });
  const ct = pt.contato || {};
  const msgWa = p => `Olá! Sou ${pt.cliente||S.perfil.nome}, cliente do escritório. Tenho uma dúvida sobre o processo ${p?.numero||""}.`;
  const contatos = `<div class="panel contato-card"><div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
      <h2 style="font-size:1.05rem;margin:0">Fale com seu advogado</h2>
      ${advs.length?advs.map(a=>`<div class="adv"><span class="avatar">${esc(P.iniciais(a.nome))}</span><div style="min-width:0;flex:1"><b>${esc(a.nome)}</b><div class="small muted">Responsável pelo seu processo</div></div>
        <div class="row" style="gap:6px">${waLink(a.telefone, msgWa(a.proc))?`<a class="btn primary" href="${waLink(a.telefone, msgWa(a.proc))}" target="_blank" rel="noopener">${ICON.wa}WhatsApp</a>`:""}${a.email?`<a class="btn" href="mailto:${esc(a.email)}?subject=${encodeURIComponent("Processo "+(a.proc.numero||""))}">${ICON.mail}E-mail</a>`:""}</div></div>`).join(""):""}
      ${ct.telefone||ct.email?`<div class="adv"><span class="avatar">§</span><div style="min-width:0;flex:1"><b>${esc(pt.escritorio)}</b><div class="small muted">${esc([ct.telefone, ct.email].filter(Boolean).join(" · "))}</div></div>
        <div class="row" style="gap:6px">${waLink(ct.telefone, msgWa(ps[0]))?`<a class="btn" href="${waLink(ct.telefone, msgWa(ps[0]))}" target="_blank" rel="noopener">${ICON.wa}WhatsApp</a>`:""}${ct.telefone?`<a class="btn" href="tel:${esc(ct.telefone.replace(/[^\d+]/g,""))}">Ligar</a>`:""}${ct.email?`<a class="btn" href="mailto:${esc(ct.email)}">${ICON.mail}E-mail</a>`:""}</div></div>`:""}
      ${!advs.length && !ct.telefone && !ct.email?`<span class="small muted">O escritório ainda não cadastrou o contato. Responda à mensagem em que recebeu o link de acesso.</span>`:""}
    </div></div>`;
  const etapa = f => Math.max(0, ["Inicial / conhecimento","Instrução","Sentença","Recurso","Execução / cumprimento"].indexOf(f));
  const card = p => { const pd = (p.documentos||[]).filter(d=>d.status==="Aguardando cliente"); const and = p.andamentos||[];
    return `<div class="panel portal-proc"><div class="panel-b" style="display:flex;flex-direction:column;gap:14px">
      <div class="row" style="justify-content:space-between"><div style="min-width:0"><div class="mono small muted">${esc(p.numero||"")}</div><b style="font-size:1.05rem">${p.parte_contraria?"× "+esc(p.parte_contraria):esc(AREAS[p.area]?.nome||"Processo")}</b></div>${chipArea(p.area)}</div>
      <div><div class="small muted">Fase atual</div><b class="gold">${esc(p.fase||"—")}</b>${["Acordo","Suspenso","Arquivado"].includes(p.fase)?"":`<div class="steps" style="margin-top:8px">${[0,1,2,3,4].map(i=>`<i class="${i<=etapa(p.fase)?"on":""}"></i>`).join("")}</div>`}</div>
      ${p.resumo?`<div class="notice" style="font-size:.95rem;color:var(--ink)">${esc(p.resumo)}</div>`:""}
      ${(p.audiencias||[]).length?`<div class="small"><b>Próxima audiência:</b> ${fmt(p.audiencias[0].data)}${p.audiencias[0].hora?" às "+esc(p.audiencias[0].hora):""} · ${esc(p.audiencias[0].modalidade||"")} ${p.audiencias[0].local?"· "+esc(p.audiencias[0].local):""}</div>`:""}
      ${pd.length?`<div class="pend"><b>O escritório precisa destes documentos:</b>${pd.map(d=>`<div class="pend-i"><span>${esc(d.nome)}</span><label class="btn primary">${ICON.plus}Enviar<input type="file" hidden data-file="portal-doc" data-doc="${d.id}" data-proc="${p.id}" accept="image/*,.pdf,.doc,.docx"></label></div>`).join("")}</div>`:""}
      <div><b class="small">Últimas movimentações</b>${and.length?`<div class="timeline" style="margin-top:8px">${and.slice(0,3).map(a=>`<div class="ev"><div class="small muted mono">${fmt(a.data)}</div><div>${esc(a.texto)}</div></div>`).join("")}</div>${and.length>3?`<details><summary class="small gold" style="cursor:pointer;margin-top:6px">Ver todas (${and.length})</summary><div class="timeline" style="margin-top:8px">${and.slice(3).map(a=>`<div class="ev"><div class="small muted mono">${fmt(a.data)}</div><div>${esc(a.texto)}</div></div>`).join("")}</div></details>`:""}`:`<div class="small muted" style="margin-top:6px">Ainda não há movimentações para mostrar.</div>`}</div>
      ${(p.documentos||[]).filter(d=>d.status!=="Aguardando cliente").length?`<details><summary class="small muted" style="cursor:pointer">Documentos já entregues (${(p.documentos||[]).filter(d=>d.status!=="Aguardando cliente").length})</summary>${(p.documentos||[]).filter(d=>d.status!=="Aguardando cliente").map(d=>`<div class="row" style="justify-content:space-between;padding:6px 0;border-top:1px solid var(--line)"><span>${esc(d.nome)}</span><span class="chip ok">${esc(d.status)}</span></div>`).join("")}</details>`:""}
      <div class="row" style="gap:6px;flex-wrap:nowrap"><input type="text" id="pn-${p.id}" placeholder="Enviar outro documento: escreva o nome" style="flex:1"><label class="btn">${ICON.plus}Arquivo<input type="file" hidden data-file="portal-novo" data-proc="${p.id}" accept="image/*,.pdf,.doc,.docx"></label></div>
      <button class="linkbtn small" data-act="pdf-portal" data-id="${p.id}" style="align-self:flex-start">Baixar resumo em PDF</button>
    </div></div>`; };
  return `<div class="portal-hero">${pt.logo?`<img src="${pt.logo}" alt="" style="max-height:44px;max-width:200px;background:#fff;border-radius:8px;padding:4px;margin-bottom:6px">`:`<span class="small gold" style="text-transform:uppercase;letter-spacing:.12em;font-weight:600">${esc(pt.escritorio)}</span>`}
    <h1>Olá, ${esc(P.primeiroNome(pt.cliente||S.perfil.nome))}</h1>
    <div class="portal-kpis"><div><b>${ps.length}</b><span>processo(s)</span></div><div><b>${auds[0]?fmtCurto(auds[0].data):"—"}</b><span>próxima audiência</span></div><div class="${pend.length?"alerta":""}"><b>${pend.length}</b><span>documento(s) para enviar</span></div></div></div>
    <div class="portal-grid"><div style="display:flex;flex-direction:column;gap:16px;min-width:0">${ps.length?ps.map(card).join(""):`<div class="panel"><div class="empty"><p>Nenhum processo vinculado ao seu cadastro.</p></div></div>`}</div>${contatos}</div>`;
}
async function enviarPortal(tipo, file, el){
  if(!file) return;
  if(file.size > 10*1024*1024){ toast("Arquivo maior que 10 MB. Envie uma versão menor."); return; }
  const pid = el.dataset.proc, pt = S.portal || {};
  const nome = tipo==="portal-novo" ? ($("#pn-"+pid)?.value||"").trim() : "";
  if(tipo==="portal-novo" && !nome){ toast("Escreva o nome do documento antes de escolher o arquivo."); $("#pn-"+pid)?.focus(); return; }
  const caminho = `${pt.escritorio_id||S.perfil.escritorio_id}/${pid}/${Date.now()}-${nomeArquivo(file.name)}`;
  toast("Enviando…");
  try{
    await api.enviarArquivo(caminho, file);
    if(tipo==="portal-doc") await api.rpc("cliente_enviar_documento", {doc:el.dataset.doc, caminho});
    else await api.rpc("cliente_novo_documento", {pid, p_nome:nome, caminho});
    S.portal = await api.portal(); render(); toast("Documento enviado. O escritório foi avisado.");
  }catch(e){ toast(P.erroAmigavel(e)); }
}
async function verArquivo(caminho){ try{ const u = await api.urlArquivo(caminho); window.open(u, "_blank", "noopener"); }catch(e){ toast(P.erroAmigavel(e)); } }

/* ---------- FINANCEIRO ---------- */
const FIN = {filtro:"abertas", mes:""};
function vFinanceiro(){
  const h = hoje(), ini = h.slice(0,8)+"01", fimMes = iso(addDays(new Date(new Date().getFullYear(), new Date().getMonth()+1, 1), -1));
  const fs = (S.financeiro||[]).slice();
  const abertas = fs.filter(f=>!f.pago_em), venc = abertas.filter(f=>f.vencimento<h), mes = abertas.filter(f=>f.vencimento>=ini && f.vencimento<=fimMes);
  const pagosMes = fs.filter(f=>f.pago_em && f.pago_em>=ini && f.pago_em<=fimMes);
  const soma = a => a.reduce((s,f)=>s+Number(f.valor||0),0);
  let lista = FIN.filtro==="vencidas" ? venc : FIN.filtro==="pagas" ? fs.filter(f=>f.pago_em) : FIN.filtro==="todas" ? fs : abertas;
  if(FIN.mes) lista = lista.filter(f=>(f.vencimento||"").slice(0,7)===FIN.mes);
  lista.sort((a,b)=>(a.vencimento||"").localeCompare(b.vencimento||""));
  const st = f => f.pago_em ? ["Pago em "+fmt(f.pago_em),"ok"] : f.vencimento<h ? ["Vencida","danger"] : f.vencimento===h ? ["Vence hoje","warn"] : ["A vencer","neutral"];
  return `<div class="head"><div><h1>Financeiro</h1><div class="sub">Honorários a receber, parcelas dos contratos, recibos e mensagens de cobrança.</div></div><button class="btn primary" data-act="fin-novo">${ICON.plus}Nova cobrança</button></div>
  <div class="stats fin-stats"><div class="stat"><span>A receber no mês</span><b>${moeda(soma(mes))}</b><small>${mes.length} parcela(s)</small></div><div class="stat ${venc.length?"alerta":""}"><span>Vencidas</span><b>${moeda(soma(venc))}</b><small>${venc.length} parcela(s)</small></div><div class="stat"><span>Recebido no mês</span><b>${moeda(soma(pagosMes))}</b><small>${pagosMes.length} pagamento(s)</small></div><div class="stat"><span>Total em aberto</span><b>${moeda(soma(abertas))}</b><small>${abertas.length} parcela(s)</small></div></div>
  <div class="row" style="justify-content:space-between;margin:6px 0 12px"><div class="seg">${[["abertas","Em aberto"],["vencidas","Vencidas"],["pagas","Pagas"],["todas","Todas"]].map(([k,l])=>`<button data-act="fin-filtro" data-f="${k}" aria-pressed="${FIN.filtro===k}">${l}</button>`).join("")}</div><input type="month" data-bind="FIN.mes" data-re="fin" value="${esc(FIN.mes)}" style="width:auto"></div>
  <div class="panel"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Vencimento</th><th>Cliente</th><th>Descrição</th><th>Valor</th><th>Situação</th><th></th></tr></thead><tbody>
  ${lista.length?lista.map(f=>{ const [t,c] = st(f), cli = cliById(f.cliente_id); return `<tr style="cursor:default"><td class="mono">${fmt(f.vencimento)}</td><td>${esc(cli?.nome||"—")}</td><td>${esc(f.descricao)}${f.processo_id&&procById(f.processo_id)?`<div class="small muted mono">${esc(procById(f.processo_id).numero||"")}</div>`:""}</td><td><b>${moeda(f.valor)}</b></td><td><span class="chip ${c}">${t}</span></td>
    <td><div class="row" style="gap:4px;flex-wrap:nowrap;justify-content:flex-end">${f.pago_em?`<button class="btn ghost" data-act="fin-recibo" data-id="${f.id}">Recibo</button><button class="linkbtn small" data-act="fin-desfazer" data-id="${f.id}">Desfazer</button>`:`<button class="btn" data-act="fin-pagar" data-id="${f.id}">Recebido</button>${cli?.telefone?`<a class="icon-btn" title="Cobrar no WhatsApp" href="${waLink(cli.telefone, `Olá, ${P.primeiroNome(cli.nome)}! Lembrete: a parcela "${f.descricao}" de ${moeda(f.valor)} ${f.vencimento<h?"venceu em":"vence em"} ${fmt(f.vencimento)}. Qualquer dúvida, estamos à disposição. ${S.escritorio?.nome||""}`)}" target="_blank" rel="noopener">${ICON.wa}</a>`:""}`}<button class="icon-btn" data-act="fin-editar" data-id="${f.id}" aria-label="Editar">${ICON.ajustes}</button></div></td></tr>`; }).join(""):`<tr><td colspan="6"><div class="empty small"><p>Nenhuma cobrança neste filtro.</p></div></td></tr>`}
  </tbody></table></div></div>`;
}
function mFinanceiro(m){
  const f = m.f || (m.f = m.id ? Object.assign({}, (S.financeiro||[]).find(x=>x.id===m.id)) : Object.assign({descricao:"Honorários", valor:"", vencimento:hoje(), parcelas:1, forma:"PIX"}, m.pre||{}));
  return cab(m.id?"Editar cobrança":"Nova cobrança") + `<form class="sheet-b" autocomplete="off"><div class="grid2">
    <label class="f">Cliente<select id="fn-cli">${optsCli(f.cliente_id)}</select></label>
    <label class="f">Processo (opcional)<select id="fn-proc">${optsProc(f.processo_id)}</select></label>
    <label class="f span2">Descrição<input type="text" id="fn-desc" value="${esc(f.descricao||"")}" placeholder="Ex.: Honorários contratuais"></label>
    <label class="f">Valor ${m.id?"":"de cada parcela"}<input type="text" id="fn-valor" inputmode="decimal" value="${esc(f.valor===""?"":String(f.valor).replace(".",","))}" placeholder="500,00"></label>
    <label class="f">${m.id?"Vencimento":"1º vencimento"}<input type="date" id="fn-venc" value="${esc(f.vencimento||hoje())}"></label>
    ${m.id?"":`<label class="f">Número de parcelas (mensais)<input type="number" id="fn-parc" min="1" max="60" value="${esc(f.parcelas||1)}"></label>`}
    <label class="f">Forma de pagamento<input type="text" id="fn-forma" value="${esc(f.forma||"")}" placeholder="PIX, boleto, cartão"></label>
    <label class="f span2">Observações<input type="text" id="fn-obs" value="${esc(f.obs||"")}"></label>
  </div></form><div class="sheet-f">${m.id?`<button class="btn danger" data-act="excluir" data-col="financeiro" data-id="${m.id}" style="margin-right:auto">Excluir</button>`:""}<button class="btn" data-act="fechar">Cancelar</button><button class="btn primary" data-act="fin-salvar">Salvar</button></div>`;
}
function reciboPdf(f){
  if(!exigePdf()) return; const cli = cliById(f.cliente_id), dc = docsCfg();
  const ctx = P.pdfNovo("Recibo", `${moeda(f.valor)} · ${fmt(f.pago_em)}`);
  P.pdfTexto(ctx, `Recebemos de ${cli?.nome||"________"}${cli?.doc?", CPF/CNPJ "+cli.doc:""}, a importância de ${moeda(f.valor)}, referente a ${f.descricao}${f.processo_id&&procById(f.processo_id)?.numero?" (processo "+procById(f.processo_id).numero+")":""}, paga em ${fmt(f.pago_em)}${f.forma?" via "+f.forma:""}.`);
  P.pdfTexto(ctx, "Para clareza, firmamos o presente recibo.");
  P.pdfCampos(ctx, [["Emitente", dc.nome||S.escritorio?.nome||""],["CNPJ", dc.cnpj||""],["Endereço", dc.endereco||""],["Data", fmt(hoje())]]);
  P.pdfTexto(ctx, "\n\n______________________________________\n"+(dc.nome||S.escritorio?.nome||""));
  P.pdfSalvar(ctx, `Recibo ${nomeArquivo(cli?.nome||"")} ${f.pago_em}.pdf`);
}
function parcelasDoContrato(){
  const cli = PC.ccli, base = hoje(), linhas = [];
  const ent = numBR(PC.entrada); if(ent) linhas.push({descricao:"Honorários · entrada", valor:ent, vencimento:base});
  const m = String(PC.parcelas||"").match(/(\d+)\s*x\s*(?:de\s*)?(?:r\$\s*)?([\d.,]+)/i);
  if(m){ for(let i=1;i<=Number(m[1]);i++){ const d = new Date(); d.setMonth(d.getMonth()+i); linhas.push({descricao:`Honorários · parcela ${i}/${m[1]}`, valor:numBR(m[2]), vencimento:iso(d)}); } }
  if(!linhas.length && numBR(PC.fixo)) linhas.push({descricao:"Honorários contratuais", valor:numBR(PC.fixo), vencimento:base});
  return {cliente_id:cli, processo_id:PC.cproc||null, linhas};
}

/* ---------- ATENDIMENTOS (captação) ---------- */
const ATS = [["novo","Novos"],["em contato","Em contato"],["proposta","Proposta enviada"],["fechado","Fechados"],["perdido","Perdidos"]];
const linkAtendimento = () => location.origin + location.pathname + "?atendimento=" + (S.escritorio?.codigo||"");
function vAtendimentos(){
  const as = (S.atendimentos||[]).slice().sort((a,b)=>(b.criado_em||"").localeCompare(a.criado_em||""));
  return `<div class="head"><div><h1>Atendimentos</h1><div class="sub">Pedidos de primeira consulta que chegam pelo formulário "conte seu caso", do contato até o contrato fechado.</div></div><button class="btn primary" data-act="at-novo">${ICON.plus}Registrar atendimento</button></div>
  <div class="notice row" style="justify-content:space-between;gap:10px"><span><b>Link do formulário para divulgar</b> (site, Instagram, WhatsApp): <span class="mono small">${esc(linkAtendimento())}</span></span><button class="btn" data-act="copiar-txt" data-t="${esc(linkAtendimento())}">${ICON.copy}Copiar link</button></div>
  <div class="kanban">${ATS.map(([k,l])=>{ const col = as.filter(a=>a.status===k); return `<div class="kb-col"><div class="kb-h"><b>${l}</b><span class="chip neutral">${col.length}</span></div>${col.map(a=>`<div class="kb-card"><div class="row" style="justify-content:space-between;flex-wrap:nowrap"><b>${esc(a.nome)}</b>${a.area&&AREAS[a.area]?chipArea(a.area):""}</div>
      <div class="small muted">${new Date(a.criado_em).toLocaleDateString("pt-BR")}${a.telefone?" · "+esc(a.telefone):""}${a.email?" · "+esc(a.email):""}</div>
      ${a.relato?`<div class="small kb-rel">${esc(a.relato)}</div>`:""}
      <div class="row" style="gap:4px"><select data-act="at-status" data-id="${a.id}" aria-label="Situação">${opts(ATS.map(([v,t])=>[v,t]), a.status)}</select>${waLink(a.telefone,"")?`<a class="icon-btn" href="${waLink(a.telefone, `Olá, ${P.primeiroNome(a.nome)}! Aqui é do ${S.escritorio?.nome||"escritório"}. Recebemos seu contato e gostaríamos de entender melhor o seu caso.`)}" target="_blank" rel="noopener" title="WhatsApp">${ICON.wa}</a>`:""}
      ${a.cliente_id?`<button class="linkbtn small" data-act="editar-cliente" data-id="${a.cliente_id}">Ver cliente</button>`:`<button class="linkbtn small" data-act="at-cliente" data-id="${a.id}">Virar cliente</button>`}<button class="icon-btn" data-act="excluir" data-col="atendimentos" data-id="${a.id}" aria-label="Excluir">${ICON.x}</button></div></div>`).join("")||`<div class="small muted" style="padding:6px">—</div>`}</div>`; }).join("")}</div>`;
}
function formAtendimento(){
  const a = L.atend || {}, e = a.esc || {};
  if(a.enviado) return `<div class="login-card" style="max-width:520px"><h1>Recebemos seu contato</h1><p class="muted" style="margin:0">Obrigado, ${esc(P.primeiroNome(a.nome||""))}. A equipe do ${esc(e.nome||"escritório")} vai retornar em breve pelo telefone ou e-mail informado.</p></div>`;
  if(!e.nome) return `<div class="login-card" style="max-width:520px"><h1>Formulário indisponível</h1><p class="muted" style="margin:0">Este link não corresponde a nenhum escritório. Confira o endereço recebido.</p></div>`;
  return `<div class="login-card" style="max-width:560px">${e.logo?`<img src="${e.logo}" alt="" style="max-height:48px;max-width:220px;background:#fff;border-radius:8px;padding:4px">`:""}<span class="ia-tag">${esc(e.nome)}</span><h1>Conte seu caso</h1><p class="muted" style="margin:0">Descreva o que aconteceu. A equipe analisa e entra em contato. As informações são confidenciais.</p>
    <form id="f-atendimento" class="auth-card" style="gap:12px">
      <label class="f">Seu nome<input type="text" id="at-nome" required autocomplete="name"></label>
      <div class="grid2"><label class="f">Celular / WhatsApp<input type="tel" id="at-tel" autocomplete="tel" placeholder="(11) 90000-0000"></label><label class="f">E-mail<input type="email" id="at-email" autocomplete="email"></label></div>
      <label class="f">Assunto<select id="at-area"><option value="">Não sei dizer</option><option value="trabalhista">Trabalho (emprego, rescisão, verbas)</option><option value="civel">Consumidor, contratos, família, cobranças</option><option value="criminal">Criminal</option></select></label>
      <label class="f">O que aconteceu?<textarea id="at-relato" rows="6" required placeholder="Conte com suas palavras, com datas se lembrar."></textarea></label>
      <label class="check"><input type="checkbox" id="at-ok" required> Autorizo o escritório a usar estes dados para entrar em contato comigo sobre o meu caso.</label>
      ${L.erroForm?`<div class="err">${esc(L.erroForm)}</div>`:""}
      <button class="btn primary block" type="submit" ${L.enviando?"disabled":""}>${L.enviando?`<span class="spinner"></span>`:"Enviar"}</button></form></div>`;
}

/* ---------- CALCULADORAS ---------- */
const CALC = {aba:"atualizacao", valor:"", de:"", ate:"", indice:"ipca", juros:"nenhum", jurosDe:"", res:null, carregando:false, erro:"",
  salario:"", admissao:"", demissao:"", motivo:"sem_justa", aviso:"indenizado", feriasVencidas:"nao", fgts:"", rres:null};
const mesAtual = () => hoje().slice(0,7);
async function calcularAtualizacao(){
  CALC.erro = ""; const v = numBR(CALC.valor), de = CALC.de, ate = CALC.ate || mesAtual();
  if(!v || !de){ CALC.erro = "Informe o valor e o mês de início."; refazer(); return; }
  if(de > ate){ CALC.erro = "O mês de início deve ser anterior ao final."; refazer(); return; }
  CALC.carregando = true; refazer();
  const fmtM = m => `01/${m.slice(5,7)}/${m.slice(0,4)}`;
  const meses = []; { let [y,mm] = de.split("-").map(Number); const [yf,mf] = ate.split("-").map(Number); while(y<yf || (y===yf && mm<mf)){ meses.push(`${y}-${String(mm).padStart(2,"0")}`); mm++; if(mm>12){ mm=1; y++; } } }
  try{
    const serieDe = fmtM(de), serieAte = fmtM(ate);
    const pegar = async s => { const r = await api.servico("indices", {serie:s, de:serieDe, ate:serieAte}); if(r && r.erro) throw new Error(r.erro); const mp = {}; (r.valores||[]).forEach(x=>{ const [d,m,y] = x.data.split("/"); mp[`${y}-${m}`] = x.valor; }); return mp; };
    const precisaIpca = CALC.indice!=="nenhum" || CALC.juros==="legal";
    const idx = CALC.indice!=="nenhum" ? await pegar(CALC.indice) : {};
    const ipca = CALC.juros==="legal" ? (CALC.indice==="ipca" ? idx : await pegar("ipca")) : {};
    const selic = ["selic","legal"].includes(CALC.juros) ? await pegar("selic") : {};
    let fator = 1, jurosPct = 0; const jDe = CALC.jurosDe || de; const memoria = [];
    for(const m of meses){
      const i = CALC.indice!=="nenhum" ? (idx[m] ?? null) : null;
      if(i!==null) fator *= 1 + i/100;
      let j = 0;
      if(m >= jDe){ if(CALC.juros==="1am") j = 1; else if(CALC.juros==="selic") j = selic[m] ?? 0; else if(CALC.juros==="legal") j = Math.max(0, (selic[m] ?? 0) - (ipca[m] ?? 0)); }
      jurosPct += j;
      memoria.push([m, i, j, fator]);
    }
    const corrigido = v * fator, juros = corrigido * jurosPct/100;
    const faltando = memoria.filter(x=>CALC.indice!=="nenhum" && x[1]===null).length;
    CALC.res = {v, corrigido, juros, total:corrigido+juros, fator, jurosPct, memoria, faltando, precisaIpca};
  }catch(e){ CALC.erro = String(e.message||e); CALC.res = null; }
  CALC.carregando = false; refazer();
}
function calcularRescisao(){
  const sal = numBR(CALC.salario), ad = CALC.admissao, dm = CALC.demissao;
  if(!sal || !ad || !dm || dm < ad){ CALC.rres = {erro:"Informe salário, admissão e demissão (demissão depois da admissão)."}; refazer(); return; }
  const dA = parse(ad), dD = parse(dm), mot = CALC.motivo;
  const anos = Math.floor((dD - dA) / (365.25*864e5));
  const diasAviso = Math.min(90, 30 + 3*anos);
  const temAviso = mot==="sem_justa" || mot==="acordo";
  const avisoInd = temAviso && CALC.aviso==="indenizado";
  const projDias = avisoInd ? (mot==="acordo" ? Math.floor(diasAviso/2) : diasAviso) : 0;
  const fimProj = addDays(dD, projDias);
  const saldo = sal/30 * dD.getDate();
  const valAviso = avisoInd ? sal/30 * diasAviso * (mot==="acordo" ? 0.5 : 1) : 0;
  const mesesNoAno = (ini, fim) => { let n = 0; for(let m = 0; m < 12; m++){ const a = new Date(fim.getFullYear(), m, 1), b = new Date(fim.getFullYear(), m+1, 0); const s = ini > a ? ini : a, e = fim < b ? fim : b; if(e >= s && (e - s)/864e5 + 1 >= 15) n++; } return n; };
  const dec = mot==="justa" ? 0 : sal/12 * mesesNoAno(dA > new Date(fimProj.getFullYear(),0,1) ? dA : new Date(fimProj.getFullYear(),0,1), fimProj);
  let anivers = new Date(dA); while(addDays(new Date(anivers.getFullYear()+1, anivers.getMonth(), anivers.getDate()), 0) <= fimProj) anivers = new Date(anivers.getFullYear()+1, anivers.getMonth(), anivers.getDate());
  let mesesFer = 0; { let c = new Date(anivers); while(true){ const prox = new Date(c.getFullYear(), c.getMonth()+1, c.getDate()); if(prox <= addDays(fimProj,1)){ mesesFer++; c = prox; } else { if((fimProj - c)/864e5 + 1 >= 15) mesesFer++; break; } } mesesFer = Math.min(12, mesesFer); }
  const ferProp = mot==="justa" ? 0 : sal/12 * mesesFer * 4/3;
  const ferVenc = CALC.feriasVencidas==="sim" ? sal * 4/3 : 0;
  const fgtsSaldo = numBR(CALC.fgts);
  const fgtsRes = 0.08 * (saldo + valAviso + dec);
  const multa = mot==="sem_justa" ? 0.4*(fgtsSaldo+fgtsRes) : mot==="acordo" ? 0.2*(fgtsSaldo+fgtsRes) : 0;
  const linhas = [["Saldo de salário ("+dD.getDate()+" dias)", saldo], avisoInd?["Aviso prévio indenizado ("+diasAviso+" dias"+(mot==="acordo"?", metade":"")+")", valAviso]:null, dec?["13º salário proporcional", dec]:null, ferProp?[`Férias proporcionais + 1/3 (${mesesFer}/12)`, ferProp]:null, ferVenc?["Férias vencidas + 1/3", ferVenc]:null, multa?[`Multa do FGTS (${mot==="acordo"?"20":"40"}%)`, multa]:null].filter(Boolean);
  CALC.rres = {linhas, total:linhas.reduce((s,l)=>s+l[1],0), fgtsRes, saque: mot==="sem_justa" ? "Saque de 100% do FGTS e direito ao seguro-desemprego (se cumprir os requisitos)." : mot==="acordo" ? "Saque de até 80% do FGTS; sem seguro-desemprego." : "Sem saque do FGTS e sem seguro-desemprego.", diasAviso, anos};
  refazer();
}
function calcAtualizacaoHTML(){
  const r = CALC.res;
  return `<div class="panel"><div class="panel-b" style="display:flex;flex-direction:column;gap:14px">
    <div class="grid3"><label class="f">Valor original (R$)<input type="text" inputmode="decimal" data-bind="CALC.valor" value="${esc(CALC.valor)}" placeholder="10.000,00"></label>
      <label class="f">Mês de início<input type="month" data-bind="CALC.de" value="${esc(CALC.de)}"></label><label class="f">Mês final<input type="month" data-bind="CALC.ate" value="${esc(CALC.ate||mesAtual())}"></label></div>
    <div class="grid3"><label class="f">Correção monetária<select data-bind="CALC.indice">${opts([["ipca","IPCA (IBGE)"],["inpc","INPC (IBGE)"],["igpm","IGP-M (FGV)"],["nenhum","Sem correção"]], CALC.indice)}</select></label>
      <label class="f">Juros de mora<select data-bind="CALC.juros">${opts([["nenhum","Sem juros"],["1am","1% ao mês (simples)"],["selic","SELIC"],["legal","Taxa legal: SELIC − IPCA (Lei 14.905/24)"]], CALC.juros)}</select></label>
      <label class="f">Juros a partir de<input type="month" data-bind="CALC.jurosDe" value="${esc(CALC.jurosDe)}" placeholder="igual ao início"></label></div>
    <div class="row" style="justify-content:space-between"><span class="hint">Índices oficiais do Banco Central (séries do SGS), mês a mês. A SELIC já embute correção: ao usar SELIC como juros, prefira "Sem correção".</span><button class="btn primary" data-act="calc-atual" ${CALC.carregando?"disabled":""}>${CALC.carregando?`<span class="spinner"></span>`:"Calcular"}</button></div>
    ${CALC.erro?`<div class="err">${esc(CALC.erro)}</div>`:""}
    ${r?`<div class="calc"><div class="res"><div><span class="small muted">Valor corrigido</span><b>${moeda(r.corrigido)}</b></div><div><span class="small muted">Juros (${r.jurosPct.toFixed(2).replace(".",",")}%)</span><b>${moeda(r.juros)}</b></div><div class="fatal"><span class="small muted">Total atualizado</span><b>${moeda(r.total)}</b></div></div>
      <div class="small muted">Fator de correção ${r.fator.toFixed(6).replace(".",",")} · ${r.memoria.length} mês(es).${r.faltando?` ${r.faltando} mês(es) ainda sem índice publicado ficaram sem correção.`:""}</div>
      <details><summary class="small gold" style="cursor:pointer">Memória de cálculo</summary><div class="tbl-wrap" style="margin-top:8px"><table class="tbl"><thead><tr><th>Mês</th><th>Índice %</th><th>Juros %</th><th>Fator acumulado</th></tr></thead><tbody>${r.memoria.map(([m,i,j,f])=>`<tr style="cursor:default"><td class="mono">${m.slice(5)}/${m.slice(0,4)}</td><td>${i===null?"—":i.toFixed(2).replace(".",",")}</td><td>${j.toFixed(2).replace(".",",")}</td><td>${f.toFixed(6).replace(".",",")}</td></tr>`).join("")}</tbody></table></div></details>
      <div class="hint">Estimativa para conferência. Siga o índice e os marcos definidos na decisão ou no contrato.</div></div>`:""}
  </div></div>`;
}
function calcRescisaoHTML(){
  const r = CALC.rres;
  return `<div class="panel"><div class="panel-b" style="display:flex;flex-direction:column;gap:14px">
    <div class="grid3"><label class="f">Último salário (R$)<input type="text" inputmode="decimal" data-bind="CALC.salario" value="${esc(CALC.salario)}" placeholder="3.000,00"></label>
      <label class="f">Admissão<input type="date" data-bind="CALC.admissao" value="${esc(CALC.admissao)}"></label><label class="f">Último dia trabalhado<input type="date" data-bind="CALC.demissao" value="${esc(CALC.demissao)}"></label></div>
    <div class="grid3"><label class="f">Motivo<select data-bind="CALC.motivo">${opts([["sem_justa","Dispensa sem justa causa"],["pedido","Pedido de demissão"],["justa","Justa causa"],["acordo","Acordo (art. 484-A)"]], CALC.motivo)}</select></label>
      <label class="f">Aviso prévio<select data-bind="CALC.aviso">${opts([["indenizado","Indenizado"],["trabalhado","Trabalhado"]], CALC.aviso)}</select></label>
      <label class="f">Férias vencidas não gozadas?<select data-bind="CALC.feriasVencidas">${opts([["nao","Não"],["sim","Sim, 1 período"]], CALC.feriasVencidas)}</select></label></div>
    <div class="grid3"><label class="f">Saldo do FGTS (extrato)<input type="text" inputmode="decimal" data-bind="CALC.fgts" value="${esc(CALC.fgts)}" placeholder="opcional"></label></div>
    <div class="row" style="justify-content:space-between"><span class="hint">Simulação com regras gerais da CLT. Não considera horas extras, adicionais, médias de variáveis nem descontos de INSS e IR.</span><button class="btn primary" data-act="calc-resc">Simular</button></div>
    ${r&&r.erro?`<div class="err">${esc(r.erro)}</div>`:""}
    ${r&&!r.erro?`<div class="calc"><div class="tbl-wrap"><table class="tbl"><tbody>${r.linhas.map(([n,v])=>`<tr style="cursor:default"><td>${esc(n)}</td><td style="text-align:right"><b>${moeda(v)}</b></td></tr>`).join("")}<tr style="cursor:default"><td><b>Total estimado (bruto)</b></td><td style="text-align:right"><b class="gold">${moeda(r.total)}</b></td></tr></tbody></table></div>
      <div class="small muted">${r.anos} ano(s) completo(s) · aviso de ${r.diasAviso} dias (Lei 12.506/11). FGTS do mês e da rescisão a depositar: ${moeda(r.fgtsRes)}. ${esc(r.saque)}</div></div>`:""}
  </div></div>`;
}
function vCalculadoras(voltar){
  const abas = [["atualizacao","Atualização de valores"],["rescisao","Verbas rescisórias"]];
  return `<div class="head"><div><h1>Calculadoras</h1><div class="sub">Atualização monetária com índices oficiais e simulação de verbas rescisórias.</div></div>${voltar||""}</div>
  <div class="tabs" role="tablist"><span class="ind"></span>${abas.map(([k,l])=>`<button role="tab" aria-selected="${CALC.aba===k}" data-act="calc-aba" data-a="${k}">${l}</button>`).join("")}</div>
  ${CALC.aba==="rescisao" ? calcRescisaoHTML() : calcAtualizacaoHTML()}`;
}

/* ---------- PAINEL DO GESTOR ---------- */
function vPainel(){
  const h = hoje(), sem = iso(addDays(new Date(),7));
  const ativos = S.processos.filter(p=>!["Arquivado"].includes(p.fase));
  const porArea = Object.keys(AREAS).map(k=>[AREAS[k].nome, ativos.filter(p=>p.area===k).length, AREAS[k].cor]);
  const porFase = FASES.map(f=>[f, ativos.filter(p=>p.fase===f).length]).filter(x=>x[1]);
  const pend = S.tarefas.filter(t=>!t.done && t.data);
  const venc = pend.filter(t=>t.data<h), prox = pend.filter(t=>t.data>=h && t.data<=sem);
  const feitos = S.tarefas.filter(t=>t.done && t.tipo==="Prazo" && t.concluido_em);
  const noPrazo = feitos.filter(t=>(t.concluido_em||"").slice(0,10) <= (t.interno || t.data)).length;
  const pctPrazo = feitos.length ? Math.round(noPrazo/feitos.length*100) : null;
  const equipe = equipeAtiva().map(u=>[u.nome, pend.filter(t=>t.atribuido_a===u.id).length, pend.filter(t=>t.atribuido_a===u.id && t.data<h).length, S.processos.filter(p=>p.responsavel_id===u.id).length]).sort((a,b)=>b[1]-a[1]);
  const docsPend = {}; S.documentos.filter(d=>d.status==="Aguardando cliente").forEach(d=>{ const p = procById(d.processo_id); const n = nomeCliente(p); docsPend[n] = (docsPend[n]||0)+1; });
  const docsLista = Object.entries(docsPend).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const enviados = S.documentos.filter(d=>d.status==="Enviado pelo cliente");
  const fin = S.financeiro||[]; const venFin = fin.filter(f=>!f.pago_em && f.vencimento<h);
  const ats = S.atendimentos||[];
  const barra = (n, max, cor) => `<span class="bar"><i style="width:${max?Math.max(4, n/max*100):0}%;${cor?`background:var(--${cor})`:""}"></i></span>`;
  const maxA = Math.max(1,...porArea.map(x=>x[1])), maxF = Math.max(1,...porFase.map(x=>x[1])), maxE = Math.max(1,...equipe.map(x=>x[1]));
  return `<div class="head"><div><h1>Painel do escritório</h1><div class="sub">Visão geral da carteira, dos prazos e da equipe.</div></div><button class="btn" data-act="pdf-carteira-direto">${ICON.pdf}Carteira em PDF</button></div>
  <div class="stats"><div class="stat"><span>Processos ativos</span><b>${ativos.length}</b><small>${S.processos.length} no total</small></div><div class="stat ${venc.length?"alerta":""}"><span>Prazos vencidos</span><b>${venc.length}</b><small>sem conclusão</small></div><div class="stat"><span>Próximos 7 dias</span><b>${prox.length}</b><small>compromissos</small></div><div class="stat"><span>Cumpridos no prazo interno</span><b>${pctPrazo===null?"—":pctPrazo+"%"}</b><small>${feitos.length} prazo(s) concluído(s)</small></div></div>
  <div class="painel-grid">
    <div class="panel"><div class="panel-h"><h2>Por área</h2></div><div class="panel-b barras">${porArea.map(([n,v,c])=>`<div class="br"><span>${n}</span>${barra(v,maxA,c)}<b>${v}</b></div>`).join("")}</div></div>
    <div class="panel"><div class="panel-h"><h2>Por fase</h2></div><div class="panel-b barras">${porFase.length?porFase.map(([n,v])=>`<div class="br"><span>${esc(n)}</span>${barra(v,maxF)}<b>${v}</b></div>`).join(""):`<span class="small muted">Sem processos ativos.</span>`}</div></div>
    <div class="panel"><div class="panel-h"><h2>Carga da equipe</h2></div><div class="panel-b barras">${equipe.map(([n,v,vz,ps])=>`<div class="br"><span>${esc(n)}<small class="muted"> · ${ps} proc.</small></span>${barra(v,maxE)}<b>${v}${vz?` <span class="chip danger">${vz}</span>`:""}</b></div>`).join("")||`<span class="small muted">Sem equipe.</span>`}<div class="hint">Atividades pendentes por pessoa; em vermelho, as vencidas.</div></div></div>
    <div class="panel"><div class="panel-h"><h2>Documentos pendentes</h2>${enviados.length?`<span class="chip warn">${enviados.length} enviado(s) pelo cliente para conferir</span>`:""}</div><div class="panel-b">${docsLista.length?docsLista.map(([n,v])=>`<div class="row" style="justify-content:space-between;padding:6px 0;border-top:1px solid var(--line)"><span>${esc(n)}</span><span class="chip warn">${v} aguardando</span></div>`).join(""):`<span class="small muted">Nenhum documento aguardando cliente.</span>`}</div></div>
    ${pode("financeiro")?`<div class="panel"><div class="panel-h"><h2>Financeiro</h2><button class="linkbtn" data-act="nav" data-v="financeiro">Abrir</button></div><div class="panel-b"><div class="row" style="justify-content:space-between"><span>Em aberto</span><b>${moeda(fin.filter(f=>!f.pago_em).reduce((s,f)=>s+Number(f.valor),0))}</b></div><div class="row" style="justify-content:space-between;margin-top:6px"><span>Vencido</span><b style="color:var(--danger)">${moeda(venFin.reduce((s,f)=>s+Number(f.valor),0))}</b></div></div></div>`:""}
    ${pode("atendimentos")||pode("gerenciar_clientes")?`<div class="panel"><div class="panel-h"><h2>Atendimentos</h2><button class="linkbtn" data-act="nav" data-v="atendimentos">Abrir</button></div><div class="panel-b barras">${ATS.map(([k,l])=>`<div class="br"><span>${l}</span>${barra(ats.filter(a=>a.status===k).length, Math.max(1,ats.length))}<b>${ats.filter(a=>a.status===k).length}</b></div>`).join("")}</div></div>`:""}
  </div>`;
}

/* ---------- DATAJUD ---------- */
const DJ = {};
async function buscarDataJud(pid, silencioso){
  const p = procById(pid); if(!p) return null;
  DJ[pid] = {carregando:true}; if(!silencioso && modal) abrirModal(modal);
  try{
    const r = await api.servico("datajud", {numero:p.numero});
    if(r && r.erro) DJ[pid] = {erro:r.erro};
    else { const ja = new Set(andamentosDe(pid).map(a=>(a.data||"")+"|"+nrm(a.texto).slice(0,60)));
      const movs = (r.movimentos||[]).map(m=>{ const data = (m.data||"").slice(0,10), texto = m.nome + (m.detalhe?" ("+m.detalhe+")":""); return {data, texto, novo:!ja.has(data+"|"+nrm(texto).slice(0,60)) && !andamentosDe(pid).some(a=>a.data===data && nrm(a.texto).includes(nrm(m.nome)))}; });
      DJ[pid] = Object.assign({}, r, {movs, quando:Date.now()}); }
  }catch(e){ DJ[pid] = {erro:P.erroAmigavel(e)}; }
  if(!silencioso && modal) abrirModal(modal);
  return DJ[pid];
}
function blocoDataJud(p){
  const d = DJ[p.id], cnj = P.cnjInfo(p.numero||"");
  if(!cnj.completo) return `<div class="small muted">Cadastre o número CNJ completo para buscar os andamentos no DataJud.</div>`;
  if(!d) return `<div class="row" style="justify-content:space-between"><span class="small muted">Busque as movimentações oficiais na base pública do CNJ (DataJud).</span><button class="btn" data-act="dj-buscar" data-id="${p.id}">${ICON.refresh}Buscar no DataJud</button></div>`;
  if(d.carregando) return `<div class="row muted"><span class="spinner"></span> Consultando o DataJud…</div>`;
  if(d.erro) return `<div class="err">${esc(d.erro)}</div><button class="linkbtn small" data-act="dj-buscar" data-id="${p.id}">Tentar de novo</button>`;
  if(!d.encontrado) return `<div class="small muted">O DataJud (${esc(d.tribunal||"")}) ainda não tem este processo. A base do CNJ pode levar alguns dias para receber processos novos. <button class="linkbtn small" data-act="dj-buscar" data-id="${p.id}">Buscar de novo</button></div>`;
  const novos = d.movs.filter(m=>m.novo);
  return `<div class="dj"><div class="row" style="justify-content:space-between"><span class="small"><b>DataJud · ${esc(d.tribunal)}</b>${d.classe?" · "+esc(d.classe):""}${d.orgao?" · "+esc(d.orgao):""}</span><span class="chip ${novos.length?"warn":"ok"}">${novos.length} novo(s)</span></div>
    ${novos.length?`<div class="dj-lista">${novos.slice(0,40).map((m,i)=>`<label class="check"><input type="checkbox" data-dj="${i}" checked> <span class="mono small">${fmt(m.data)}</span> ${esc(m.texto)}</label>`).join("")}</div>
    <div class="row" style="justify-content:space-between"><label class="check"><input type="checkbox" id="dj-vis" checked> Cliente vê no portal</label><button class="btn primary" data-act="dj-importar" data-id="${p.id}">Importar selecionados</button></div>`:`<div class="small muted">Nenhuma movimentação nova em relação ao que já está registrado.</div>`}
    <div class="hint">A base pública do CNJ é atualizada pelos tribunais e pode ter alguns dias de atraso. Confira sempre no sistema do tribunal.</div></div>`;
}
const DJLOTE = {rodando:false, feito:0, total:0, res:[]};
async function verificarTodosDataJud(){
  const ps = S.processos.filter(p=>P.cnjInfo(p.numero||"").valido && p.fase!=="Arquivado").slice(0, 40);
  if(!ps.length){ toast("Nenhum processo com número CNJ válido."); return; }
  Object.assign(DJLOTE, {rodando:true, feito:0, total:ps.length, res:[]}); render();
  for(const p of ps){ const r = await buscarDataJud(p.id, true); DJLOTE.feito++; if(r && r.movs){ const n = r.movs.filter(m=>m.novo).length; if(n) DJLOTE.res.push([p.id, n]); } if(view==="processos") render(); }
  DJLOTE.rodando = false; render();
  toast(DJLOTE.res.length ? `${DJLOTE.res.length} processo(s) com movimentações novas` : "Nenhuma movimentação nova encontrada");
}
function bannerDataJud(){
  if(!DJLOTE.rodando && !DJLOTE.res.length) return "";
  if(DJLOTE.rodando) return `<div class="notice row"><span class="spinner"></span> Consultando o DataJud: ${DJLOTE.feito} de ${DJLOTE.total} processos…</div>`;
  return `<div class="notice"><b>Movimentações novas no DataJud:</b> ${DJLOTE.res.map(([id,n])=>`<button class="linkbtn" data-act="dj-abrir" data-id="${id}">${esc(nomeCliente(procById(id)))} (${n})</button>`).join(" · ")}</div>`;
}

/* ---------- AGENDA NO CELULAR ---------- */
function mAgendaCelular(){
  const tk = S.perfil?.agenda_token, url = tk ? api.agendaUrl(tk) : "";
  return cab("Agenda no celular", "Seus prazos e audiências no Google Agenda ou no iPhone") + `<div class="sheet-b" style="display:flex;flex-direction:column;gap:14px">
    ${url?`<label class="f">Link de assinatura (pessoal, não compartilhe)<input type="text" readonly class="mono" value="${esc(url)}" onfocus="this.select()"></label>
    <div class="row" style="gap:8px"><button class="btn primary" data-act="copiar-txt" data-t="${esc(url)}">${ICON.copy}Copiar link</button><a class="btn" href="${esc(url.replace(/^https:/,"webcal:"))}">Abrir no iPhone / Mac</a><a class="btn" href="https://calendar.google.com/calendar/r/settings/addbyurl" target="_blank" rel="noopener">Abrir Google Agenda</a></div>
    <div class="small muted"><b>Google Agenda (computador):</b> Outras agendas › + › Do URL › cole o link. <b>iPhone:</b> toque em "Abrir no iPhone" ou vá em Ajustes › Calendário › Contas › Adicionar conta › Outra › Calendário assinado. A agenda atualiza sozinha (o Google leva algumas horas).</div>`:`<div class="notice">O link de assinatura aparece aqui depois da atualização do banco de dados.</div>`}
    <div class="calc"><b>Sem assinatura:</b> baixe um arquivo com os compromissos de hoje em diante e importe uma vez.<div class="row" style="margin-top:8px"><button class="btn" data-act="agenda-ics">Baixar arquivo .ics</button></div></div>
  </div><div class="sheet-f"><button class="btn primary" data-act="fechar">Fechar</button></div>`;
}
function baixarIcs(){
  const L2 = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Pauta Juridica//PT-BR","CALSCALE:GREGORIAN"];
  const e = s => String(s||"").replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\n/g,"\\n");
  tarefasVisiveis().filter(t=>!t.done && t.data && t.data>=hoje()).forEach(t=>{ const p = procById(t.processo_id); const d = t.data.replace(/-/g,"");
    L2.push("BEGIN:VEVENT","UID:"+t.id+"@pauta","DTSTAMP:"+new Date().toISOString().replace(/[-:]/g,"").slice(0,15)+"Z");
    if(t.hora && /^\d{1,2}:\d{2}$/.test(t.hora)){ const [h,m] = t.hora.split(":"); L2.push(`DTSTART;TZID=America/Sao_Paulo:${d}T${h.padStart(2,"0")}${m}00`, `DTEND;TZID=America/Sao_Paulo:${d}T${String(Math.min(23,Number(h)+1)).padStart(2,"0")}${m}00`); }
    else { const n = iso(addDays(parse(t.data),1)).replace(/-/g,""); L2.push("DTSTART;VALUE=DATE:"+d, "DTEND;VALUE=DATE:"+n); }
    L2.push("SUMMARY:"+e(`${t.tipo}: ${t.titulo||""}${p?" · "+nomeCliente(p):""}`)); if(t.local) L2.push("LOCATION:"+e(t.local)); if(p?.numero) L2.push("DESCRIPTION:"+e("Processo "+p.numero)); L2.push("END:VEVENT"); });
  L2.push("END:VCALENDAR");
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([L2.join("\r\n")], {type:"text/calendar"})); a.download = "pauta-agenda.ics"; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 800);
}

/* ---------- ações da versão 3 ---------- */
async function acaoV3(a, el){
  const id = el.dataset.id;
  switch(a){
    case "fin-novo": abrirModal({kind:"financeiro"}); return true;
    case "fin-editar": abrirModal({kind:"financeiro", id}); return true;
    case "fin-filtro": FIN.filtro = el.dataset.f; render(); return true;
    case "fin-salvar": {
      const v = i => document.getElementById(i)?.value?.trim() ?? "";
      const valor = numBR(v("fn-valor")); if(!valor){ toast("Informe o valor."); return true; } if(!v("fn-venc")){ toast("Informe o vencimento."); return true; }
      const base = {cliente_id:v("fn-cli")||null, processo_id:v("fn-proc")||null, descricao:v("fn-desc")||"Honorários", valor, forma:v("fn-forma")||null, obs:v("fn-obs")||null};
      await comErro(async()=>{
        if(modal.id) await api.atualizar("financeiro", modal.id, Object.assign(base, {vencimento:v("fn-venc")}));
        else { const n = Math.max(1, Math.min(60, Number(v("fn-parc"))||1)); for(let i=0;i<n;i++){ const d = parse(v("fn-venc")); d.setMonth(d.getMonth()+i); await api.inserir("financeiro", Object.assign({escritorio_id:S.escritorio.id}, base, {descricao: n>1 ? `${base.descricao} · ${i+1}/${n}` : base.descricao, vencimento:iso(d)})); } }
        await recarregar("financeiro", true); fecharModal(); toast("Cobrança salva"); render(); });
      return true; }
    case "fin-pagar": await comErro(async()=>{ await api.atualizar("financeiro", id, {pago_em:hoje()}); await recarregar("financeiro", true); render(); toast("Marcado como recebido"); }); return true;
    case "fin-desfazer": await comErro(async()=>{ await api.atualizar("financeiro", id, {pago_em:null}); await recarregar("financeiro", true); render(); }); return true;
    case "fin-recibo": { const f = (S.financeiro||[]).find(x=>x.id===id); if(f) reciboPdf(f); return true; }
    case "doc-financeiro": {
      if(!pode("financeiro")){ toast("Seu acesso não inclui o financeiro."); return true; }
      const r = parcelasDoContrato(); if(!r.linhas.length){ toast("Preencha valor fixo, entrada ou parcelas (ex.: 4x de R$ 500,00)."); return true; }
      await comErro(async()=>{ for(const l of r.linhas) await api.inserir("financeiro", Object.assign({escritorio_id:S.escritorio.id, cliente_id:r.cliente_id||null, processo_id:r.processo_id||null, forma:PC.forma||null}, l)); await recarregar("financeiro", true); toast(`${r.linhas.length} lançamento(s) no financeiro`); });
      return true; }
    case "at-novo": abrirModal({kind:"atendimento"}); return true;
    case "at-salvar": {
      const v = i => document.getElementById(i)?.value?.trim() ?? "";
      if(!v("am-nome")){ toast("Informe o nome."); return true; }
      await comErro(async()=>{ await api.inserir("atendimentos", {escritorio_id:S.escritorio.id, nome:v("am-nome"), telefone:v("am-tel")||null, email:v("am-email")||null, area:v("am-area")||null, relato:v("am-relato")||null, origem:v("am-origem")||"manual"}); await recarregar("atendimentos", true); fecharModal(); render(); });
      return true; }
    case "at-cliente": {
      const at = (S.atendimentos||[]).find(x=>x.id===id); if(!at) return true;
      await comErro(async()=>{ const c = await api.inserir("clientes", {escritorio_id:S.escritorio.id, nome:at.nome, tipo:"PF", telefone:at.telefone, email:at.email, obs:at.relato ? "Primeiro contato: "+at.relato.slice(0,500) : null}); await api.atualizar("atendimentos", id, {cliente_id:c.id, status:"fechado"}); await Promise.all([recarregar("clientes",true), recarregar("atendimentos",true)]); render(); toast("Cliente cadastrado"); abrirModal({kind:"cliente", id:c.id}); });
      return true; }
    case "calc-aba": CALC.aba = el.dataset.a; refazer(); return true;
    case "calc-atual": await calcularAtualizacao(); return true;
    case "calc-resc": calcularRescisao(); return true;
    case "pdf-carteira-direto": pdfCarteira({area:""}); return true;
    case "dj-buscar": await buscarDataJud(id); return true;
    case "dj-abrir": abrirModal({kind:"detalhe", id, vivo:true, aba:"andamentos"}); return true;
    case "dj-todos": await verificarTodosDataJud(); return true;
    case "dj-importar": {
      const d = DJ[id]; if(!d || !d.movs) return true; const novos = d.movs.filter(m=>m.novo);
      const sel = [...document.querySelectorAll("[data-dj]")].filter(x=>x.checked).map(x=>novos[Number(x.dataset.dj)]).filter(Boolean);
      if(!sel.length){ toast("Selecione ao menos uma movimentação."); return true; }
      const vis = $("#dj-vis")?.checked ?? true;
      await comErro(async()=>{ for(const m of sel) await api.inserir("andamentos", {escritorio_id:S.escritorio.id, processo_id:id, data:m.data||hoje(), texto:m.texto, visivel_cliente:vis}); await recarregar("andamentos", true); sel.forEach(m=>m.novo=false); DJLOTE.res = DJLOTE.res.filter(x=>x[0]!==id); toast(`${sel.length} andamento(s) importado(s)`); if(modal) abrirModal(modal); });
      return true; }
    case "agenda-celular": abrirModal({kind:"agendaCelular"}); return true;
    case "agenda-ics": baixarIcs(); return true;
    case "ver-arquivo": await verArquivo(el.dataset.c); return true;
  }
  return false;
}
function mAtendimento(){
  return cab("Registrar atendimento") + `<form class="sheet-b" autocomplete="off"><div class="grid2">
    <label class="f span2">Nome<input type="text" id="am-nome"></label>
    <label class="f">Celular<input type="tel" id="am-tel"></label><label class="f">E-mail<input type="email" id="am-email"></label>
    <label class="f">Área<select id="am-area"><option value="">—</option>${opts(Object.entries(AREAS).map(([k,v])=>[k,v.nome]))}</select></label>
    <label class="f">Origem<select id="am-origem">${opts([["manual","Contato direto"],["indicacao","Indicação"],["instagram","Instagram"],["site","Site"],["whatsapp","WhatsApp"]])}</select></label>
    <label class="f span2">Relato<textarea id="am-relato" rows="4"></textarea></label></div></form>
    <div class="sheet-f"><button class="btn" data-act="fechar">Cancelar</button><button class="btn primary" data-act="at-salvar">Salvar</button></div>`;
}

/* ---------- DIREITO GERAL ---------- */
function listaTemas(){
  const t = DG.termo.trim();
  let itens = t ? P.buscarBase(t, DG.area, 12) : P.BASE_DIREITO.filter(e=>DG.area==="todas" || e.area===DG.area || (DG.area!=="todas" && e.area==="geral"));
  if(!itens.length) return `<div class="empty small">Nada encontrado para "${esc(t)}". Use a pesquisa de jurisprudência ao lado.</div>`;
  return itens.map(e=>`<div class="tema${DG.aberto===e.id?" aberto":""}"><button class="tema-h" data-act="dg-abrir" data-id="${e.id}" aria-expanded="${DG.aberto===e.id}"><span>${esc(e.tema)}</span>${e.area!=="geral"?`<span class="chip ${e.area}">${P.NOME_AREA_DIREITO[e.area]}</span>`:""}</button>
    ${DG.aberto===e.id?`<div class="tema-b">${P.md(e.resp)}<div class="small muted" style="margin-top:6px">Fundamento: ${esc(e.base)}</div><div class="row" style="gap:6px;margin-top:8px"><span class="small muted">Julgados:</span>${["stf","stj","tst","jusbrasil"].map(o=>`<button class="linkbtn small" data-act="juris" data-o="${o}" data-q="${esc(e.tema)}">${P.ONDE_PESQUISAR.find(x=>x[0]===o)[1]}</button>`).join("")}</div></div>`:""}</div>`).join("");
}
function vDireito(voltar){
  const areas = [["todas","Todas"],["trabalhista","Trabalhista"],["civel","Cível"],["criminal","Criminal"]];
  const sums = P.SUMULAS.filter(s=>DG.area==="todas" || s[3]===DG.area);
  const UF = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SE","SP","TO"];
  return `<div class="head"><div><h1>Direito geral</h1><div class="sub">Assistente para dúvidas, jurisprudência e consulta de processos, além dos temas com prazo e fundamento, súmulas e leis.</div></div>${voltar||""}</div>
  ${blocoAssistenteJuridico()}
  ${voltar?"":blocoRadar()}
  <div class="tabs" role="tablist"><span class="ind"></span>${areas.map(([k,l])=>`<button role="tab" aria-selected="${DG.area===k}" data-act="dg-area" data-a="${k}">${AREAS[k]?`<span class="dot" style="background:var(--${AREAS[k].cor})"></span>`:""}${l}</button>`).join("")}</div>
  <div class="dg-grid">
    <div class="panel dg-col"><div class="panel-b" style="display:flex;flex-direction:column;gap:10px">
      <h2 style="font-size:1.05rem;margin:0">Temas e regras</h2>
      <div class="search" style="margin:0">${ICON.search}<input type="search" id="dg-busca" value="${esc(DG.termo)}" placeholder="Buscar tema: prazo apelação, verbas, fiança…" autocomplete="off"></div>
      <div id="dg-lista" class="temas">${listaTemas()}</div>
      <div class="hint">${esc(P.AVISO_BASE)}</div></div></div>
    <div class="dg-col" style="display:flex;flex-direction:column;gap:16px;min-width:0">
      <div class="panel"><div class="panel-b" style="display:flex;flex-direction:column;gap:10px">
        <h2 style="font-size:1.05rem;margin:0">Pesquisar jurisprudência</h2>
        <label class="f">Tema ou palavras-chave<input type="text" id="jp-termo" value="${esc(DG.juris)}" placeholder="Ex.: dano moral atraso voo"></label>
        <div class="row" style="gap:6px">${["stf","stj","tst","jusbrasil"].map(o=>`<button class="btn" data-act="juris" data-o="${o}">${P.ONDE_PESQUISAR.find(x=>x[0]===o)[1]}</button>`).join("")}</div>
        <div class="row" style="gap:6px;flex-wrap:nowrap"><select id="jp-uf" aria-label="Estado" style="max-width:90px">${UF.map(u=>`<option ${u==="SP"?"selected":""}>${u}</option>`).join("")}</select><button class="btn" data-act="juris" data-o="tj" style="flex:1">TJ do estado</button></div>
        <div class="row" style="gap:6px;flex-wrap:nowrap"><select id="jp-trt" aria-label="Região" style="max-width:90px">${Array.from({length:24},(_,i)=>`<option value="${i+1}" ${i===1?"selected":""}>${i+1}ª</option>`).join("")}</select><button class="btn" data-act="juris" data-o="trt" style="flex:1">TRT da região</button></div>
        <button class="btn ghost" data-act="juris" data-o="lexml">Pesquisar na legislação (LexML)</button>
        <div class="hint">Abre a busca no site oficial ou no Google filtrado pelo tribunal, em nova aba.</div></div></div>
      <div class="panel"><div class="panel-b" style="display:flex;flex-direction:column;gap:8px">
        <h2 style="font-size:1.05rem;margin:0">Súmulas de consulta frequente</h2>
        ${sums.map(s=>`<div class="sumula"><span class="chip neutral mono">${s[0]} ${s[1]}</span><span class="small">${esc(s[2])}</span></div>`).join("")}
        <div class="hint">Resumo do enunciado. Leia o texto oficial no site do tribunal.</div></div></div>
      <div class="panel"><div class="panel-b" style="display:flex;flex-direction:column;gap:8px">
        <h2 style="font-size:1.05rem;margin:0">Leis (Planalto)</h2>
        <div class="leis">${P.LEIS.map(([n,u])=>`<a class="lei" href="${u}" target="_blank" rel="noopener">${esc(n)} ${ICON.arrow}</a>`).join("")}</div></div></div>
    </div></div>`;
}
/* ---------- ASSISTENTE JURÍDICO (Direito geral) ---------- */
const DGA = {msgs:[], input:"", ocupado:false, ctx:{}};
const RE_CNJ = /\b\d{7}-?\d{2}\.?\d{4}\.?\d\.?\d{2}\.?\d{4}\b/;
const L_ = "[0-9A-Za-zÀ-ÖØ-öø-ÿ]";
const PARADAS_JUR = new RegExp(`(?<!${L_})(pesquis${L_}*|busc${L_}*|procur${L_}*|encontr${L_}*|mostr${L_}*|traga|quero|preciso|gostaria|me|ver|veja|liste|jurisprud${L_}*|julgad${L_}*|ac[oó]rd[aã]${L_}*|precedent${L_}*|decis[oõ]${L_}*|entendiment${L_}*|sobre|acerca|respeito|tjsp|tj\\s?sp|do|da|de|dos|das|no|na|nos|nas|o|a|os|as|um|uma|que|tribuna${L_}*|dizem|diz|recent${L_}*|atua${L_}*|em|com|para|por|qual|quais|e|stf|stj|tst|trt\\d*|tj\\s?[a-z]{2}|supremo|superior)(?!${L_})`, "gi");
const ehPedidoJuris = q => /jurisprud|julgad|ac[oó]rd|precedent|decis[oõ]es|entendimento d|o que (os )?tribunais|como (o|os) (tj|tribuna)/i.test(q);
const termosJuris = q => q.replace(RE_CNJ,"").replace(/[?!.;:"“”]/g," ").replace(PARADAS_JUR," ").replace(/\s+/g," ").trim();
function tribunalCitado(q){
  const n = nrm(q);
  if(/\bstf\b|supremo/.test(n)) return "stf"; if(/\bstj\b|superior tribunal de justica/.test(n)) return "stj";
  if(/\btst\b|superior do trabalho/.test(n)) return "tst"; if(/\btrt\b|regional do trabalho/.test(n)) return "trt";
  const m = n.match(/\btj\s?([a-z]{2})\b/); if(m && m[1]!=="sp") return "tj:"+m[1].toUpperCase();
  return "";
}
function sumulasDe(q){
  const ws = nrm(q).split(/[^a-z0-9]+/).filter(w=>w.length>3).map(w=>w.slice(0,6));
  if(!ws.length) return [];
  return P.SUMULAS.map(s=>{ const t = nrm(s[2]+" "+s[1]); return [s, ws.filter(w=>t.includes(w)).length]; })
    .filter(([s,n])=>n>=Math.min(2, ws.length)).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0]);
}
function linksJuris(q){
  return `<div class="row" style="gap:6px;margin-top:8px"><span class="small muted">Pesquisar também em:</span>${["stf","stj","tst","jusbrasil"].map(o=>`<button class="linkbtn small" data-act="juris" data-o="${o}" data-q="${esc(q)}">${P.ONDE_PESQUISAR.find(x=>x[0]===o)[1]}</button>`).join("")}</div>`;
}
function htmlProcessoPublico(num, r){
  const c = P.cnjInfo(num);
  if(r.erro) return `<p><b>Processo ${esc(c.formatado||num)}</b></p><div class="err">${esc(r.erro)}</div>`;
  if(!r.encontrado) return `<p><b>Processo ${esc(c.formatado||num)}</b> · ${esc(r.tribunal||c.segmento||"")}</p><p class="small">Não encontrei este número na base pública do CNJ (DataJud). Pode ser processo em segredo de justiça, muito recente (a base leva alguns dias para receber) ou número digitado errado.</p>`;
  const movs = r.movimentos||[], ult = movs[0];
  const lin = m => `<li><span class="mono small">${fmt((m.data||"").slice(0,10))}</span> ${esc(m.nome)}${m.detalhe?` <span class="muted small">(${esc(m.detalhe)})</span>`:""}</li>`;
  const meu = typeof S!=="undefined" && S.processos && S.processos.find(p=>P.soDigitos(p.numero)===P.soDigitos(num));
  const equipe = typeof S!=="undefined" && S.perfil && !ehCliente();
  return `<div class="proc-pub"><div class="row" style="justify-content:space-between;gap:8px"><b>Processo ${esc(c.formatado||num)}</b><span class="chip neutral">${esc(r.tribunal)}</span></div>
    <div class="grid2 small" style="margin-top:6px;gap:4px 14px">
      ${r.classe?`<div><span class="muted">Classe:</span> ${esc(r.classe)}</div>`:""}${r.orgao?`<div><span class="muted">Órgão:</span> ${esc(r.orgao)}</div>`:""}
      ${r.assuntos&&r.assuntos.length?`<div><span class="muted">Assunto:</span> ${esc(r.assuntos.slice(0,3).join(", "))}</div>`:""}
      ${r.ajuizamento?`<div><span class="muted">Ajuizamento:</span> ${esc(r.ajuizamento.slice(6,8)+"/"+r.ajuizamento.slice(4,6)+"/"+r.ajuizamento.slice(0,4))}</div>`:""}</div>
    ${ult?`<div class="ultimo"><span class="muted small">Situação mais recente</span><div><b>${esc(ult.nome)}</b>${ult.detalhe?` · ${esc(ult.detalhe)}`:""} <span class="mono small">${fmt((ult.data||"").slice(0,10))}</span></div></div>`:""}
    ${movs.length?`<ul class="movs">${movs.slice(0,8).map(lin).join("")}</ul>${movs.length>8?`<details><summary class="small">Ver todas as ${movs.length} movimentações</summary><ul class="movs">${movs.slice(8).map(lin).join("")}</ul></details>`:""}`:""}
    <div class="row" style="gap:6px;margin-top:8px">${meu?`<button class="btn" data-act="dj-abrir" data-id="${meu.id}">Abrir no escritório</button>`:equipe?`<button class="btn" data-act="dga-cadastrar" data-n="${esc(c.formatado||num)}">Cadastrar no escritório</button>`:""}</div>
    <div class="hint">Dados públicos do CNJ (DataJud), atualizados pelos tribunais com alguns dias de atraso. Processos em segredo de justiça não aparecem. Confira no sistema do tribunal antes de agir.</div></div>`;
}
function htmlJuris(r, termo){
  if(r.erro) return `<div class="err">${esc(r.erro)}</div>`;
  if(!r.itens || !r.itens.length) return `<p class="small">O TJSP não retornou acórdãos para <b>${esc(termo)}</b>. Tente com menos palavras ou sinônimos.</p>`;
  const em = e => { const i = e.indexOf("Ementa:"); return (i>=0 ? e.slice(i+7) : e).trim(); };
  return `<p class="small muted">${Number(r.total||0).toLocaleString("pt-BR")} acórdão(s) no TJSP para <b>${esc(r.termo)}</b> · mais recentes primeiro</p>
    <div class="juris-lista">${r.itens.slice(0,8).map(x=>`<div class="juris-item">
      <div class="row" style="justify-content:space-between;gap:8px"><span class="mono small">${esc(x.numero)}</span><span class="small muted">${esc(x.julgamento)}</span></div>
      <div class="small"><b>${esc(x.classe)}</b></div>
      <div class="small muted">${esc([x.orgao, x.relator&&"Rel. "+x.relator, x.comarca].filter(Boolean).join(" · "))}</div>
      <details><summary class="small">${esc(em(x.ementa).slice(0,220))}${em(x.ementa).length>220?"…":""}</summary><div class="small" style="white-space:pre-line;margin-top:4px">${esc(em(x.ementa))}</div></details>
      <div class="row" style="gap:10px">${x.link?`<a class="linkbtn small" href="${esc(x.link)}" target="_blank" rel="noopener">Inteiro teor (PDF)</a>`:""}<button class="linkbtn small" data-act="copiar-txt-el" data-txt="${esc(em(x.ementa)+"\n(TJSP; "+x.classe+" "+x.numero+"; Relator(a): "+x.relator+"; Órgão Julgador: "+x.orgao+"; Data do Julgamento: "+x.julgamento+")")}">Copiar ementa com referência</button></div></div>`).join("")}</div>
    ${r.total>8?`<button class="btn ghost" data-act="dga-mais" data-q="${esc(r.termo)}" data-p="${(r.pagina||1)+1}">Ver mais acórdãos</button>`:""}`;
}
async function responderJuridico(q){
  const partes = [], cnj = (q.match(RE_CNJ)||[])[0];
  // 1) número de processo: consulta pública no DataJud (qualquer processo, não só da carteira)
  if(cnj){
    const c = P.cnjInfo(cnj);
    if(c.completo && !c.valido) partes.push(`<div class="err">O número ${esc(c.formatado)} tem dígito verificador inválido. Confira se foi digitado certo.</div>`);
    else { try{ partes.push(htmlProcessoPublico(cnj, await api.servico("datajud", {numero:cnj}) || {})); }catch(e){ partes.push(`<div class="err">${esc(P.erroAmigavel(e))}</div>`); } }
    if(!termosJuris(q.replace(cnj,"")).replace(/\b(status|situa\w*|andament\w*|process\w*|consult\w*|numero|n[ºo°])\b/gi,"").trim()) return partes.join("");
  }
  const texto = q.replace(RE_CNJ,"").trim();
  const pedeJuris = ehPedidoJuris(texto), trib = tribunalCitado(texto), termo = termosJuris(texto);
  // 2) base do app: regra, prazo e fundamento
  const temas = P.buscarBase(texto, "todas", 3, pedeJuris ? 3.5 : 2), kb = temas.length > 0;
  if(kb){ const e = temas[0];
    partes.push(`<div class="kb"><div class="row" style="gap:8px;margin-bottom:4px"><b>${esc(e.tema)}</b>${e.area!=="geral"?`<span class="chip ${e.area}">${P.NOME_AREA_DIREITO[e.area]}</span>`:""}</div>${P.md(e.resp)}<div class="small muted" style="margin-top:6px">Fundamento: ${esc(e.base)}</div>
      ${temas.length>1?`<div class="row" style="gap:6px;margin-top:8px"><span class="small muted">Temas próximos:</span>${temas.slice(1).map(t=>`<button class="linkbtn small" data-act="dga-sug" data-q="${esc(t.tema)}">${esc(t.tema)}</button>`).join("")}</div>`:""}</div>`); }
  const sums = sumulasDe(texto);
  if(sums.length) partes.push(`<div class="kb"><b>Súmulas relacionadas</b>${sums.map(s=>`<div class="sumula"><span class="chip neutral mono">${s[0]} ${s[1]}</span><span class="small">${esc(s[2])}</span></div>`).join("")}</div>`);
  // 3) jurisprudência: TJSP direto no app; demais tribunais por atalho
  if(termo && (pedeJuris || !kb)){
    if(trib && trib!=="tjsp"){
      const nome = trib.startsWith("tj:") ? "TJ"+trib.slice(3) : trib.toUpperCase();
      partes.push(`<p class="small">O ${esc(nome)} não permite consulta automática pelo app. Abra a busca já filtrada:</p><div class="row" style="gap:6px"><button class="btn" data-act="juris" data-o="${trib.startsWith("tj:")?"tj":trib}" data-q="${esc(termo)}">${esc(nome)}: ${esc(termo)}</button><button class="btn ghost" data-act="juris" data-o="jusbrasil" data-q="${esc(termo)}">JusBrasil</button></div>`);
    } else {
      try{ const r = await api.servico("jurisprudencia", {q:termo}); partes.push(`<div class="kb"><b>Jurisprudência do TJSP</b>${htmlJuris(r||{}, termo)}${linksJuris(termo)}</div>`); }
      catch(e){ partes.push(`<div class="err">Não consegui consultar o TJSP agora (${esc(P.erroAmigavel(e))}).</div>${linksJuris(termo)}`); }
    }
  } else if(kb && termo){
    partes.push(`<div class="row" style="gap:6px"><button class="btn ghost" data-act="dga-sug" data-q="${esc("jurisprudência "+termo)}">Ver acórdãos do TJSP sobre isto</button></div>`);
  }
  if(!partes.length) return semResposta(texto || q);
  return partes.join("");
}
async function enviarDGA(q){
  q = String(q ?? DGA.input).trim(); if(!q || DGA.ocupado) return;
  DGA.msgs.push({role:"user", content:q}); DGA.input = ""; DGA.ocupado = true;
  const m = {role:"assistant", html:`<div class="row muted"><span class="spinner"></span> ${RE_CNJ.test(q)?"Consultando o processo no DataJud…":ehPedidoJuris(q)?"Pesquisando acórdãos no TJSP…":"Procurando a resposta…"}</div>`};
  DGA.msgs.push(m); refazer(); rolarDGA();
  try{ m.html = await responderJuridico(q); }catch(e){ m.html = `<div class="err">${esc(P.erroAmigavel(e))}</div>`; }
  DGA.ocupado = false; refazer(); rolarDGA();
}
function rolarDGA(){ const f = $("#dga-fim"); if(f) f.scrollIntoView({block:"nearest"}); }
function blocoAssistenteJuridico(){
  const sug = ["Qual o prazo para contestar no trabalhista?","Jurisprudência sobre dano moral por atraso de voo","0000832-35.2018.4.01.3202","Prisão preventiva: requisitos","Julgados do TJSP sobre negativação indevida"];
  return `<div class="panel dga"><div class="panel-b" style="display:flex;flex-direction:column;gap:10px">
    <div class="row" style="justify-content:space-between;gap:8px"><div><h2 style="font-size:1.05rem;margin:0">${ICON.assistente} Assistente jurídico</h2><div class="small muted">Tire dúvidas, pesquise jurisprudência ou consulte o andamento de <b>qualquer processo</b> pelo número, mesmo que não seja do escritório.</div></div>${DGA.msgs.length?`<button class="btn ghost" data-act="dga-limpar">Nova conversa</button>`:""}</div>
    ${DGA.msgs.length?`<div class="chat dga-chat">${DGA.msgs.map(m=>m.role==="user"?`<div class="msg user">${esc(m.content)}</div>`:`<div class="msg bot answer">${m.html}</div>`).join("")}<div id="dga-fim"></div></div>`
      :`<div class="pickchips">${sug.map(s=>`<button data-act="dga-sug" data-q="${esc(s)}">${esc(s)}</button>`).join("")}</div>`}
    <div class="composer" style="position:static;margin:0"><textarea id="dga-in" rows="1" data-bind="DGA.input" placeholder="Pergunte, cole um número de processo ou peça jurisprudência">${esc(DGA.input)}</textarea><button class="btn primary" data-act="dga-enviar" ${DGA.ocupado?"disabled":""}>Enviar</button></div>
    <div class="hint">Sem IA paga: as respostas vêm da base do app, da consulta pública de jurisprudência do TJSP e do DataJud (CNJ). STF, STJ, TST e outros TJs abrem por atalho, porque não permitem consulta automática. Confira sempre a fonte oficial.</div></div></div>`;
}
/* ---------- RELATÓRIOS ---------- */
function vRelatorios(){
  const ps = S.processos.slice().sort((a,b)=>nomeCliente(a).localeCompare(nomeCliente(b)));
  const optsP = ps.map(p=>`<option value="${p.id}">${esc((p.numero||"sem número")+" · "+nomeCliente(p))}</option>`).join("");
  const resps = equipeAtiva();
  const coms = S.comunicacoes.slice().sort((a,b)=>(b.enviado_em||"").localeCompare(a.enviado_em||"")).slice(0,30);
  return `<div class="head"><div><h1>Relatórios e cliente</h1><div class="sub">Gere PDFs para a equipe e monte para o cliente um resumo do andamento, pronto para copiar.</div></div></div>
  <div class="grid2">
    ${pode("enviar_cliente")?`<div class="panel"><div class="panel-h"><h2>Mensagem ao cliente</h2>${ICON.send.replace("<svg",'<svg style="width:20px;color:var(--gold)"')}</div><div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
      <p class="small muted" style="margin:0">Monta um resumo em linguagem simples com a fase, as últimas movimentações visíveis ao cliente e a próxima audiência. Você revisa, copia e envia pelo seu e-mail ou WhatsApp.</p>
      <label class="f">Processo<select id="r-proc-cli">${optsP}</select></label>
      <button class="btn primary" data-act="comunicar-sel">${ICON.send}Montar mensagem</button></div></div>`:""}
    ${pode("gerar_relatorios")?`<div class="panel"><div class="panel-h"><h2>Pauta em PDF</h2>${ICON.agenda.replace("<svg",'<svg style="width:20px;color:var(--gold)"')}</div><div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
      <div class="grid2"><label class="f">Período<select id="r-per"><option value="7">Próximos 7 dias</option><option value="15">Próximos 15 dias</option><option value="30">Próximos 30 dias</option></select></label>
      <label class="f">Responsável<select id="r-resp"><option value="">Toda a equipe</option>${resps.map(u=>`<option value="${u.id}">${esc(u.nome)}</option>`).join("")}</select></label></div>
      <label class="check"><input type="checkbox" id="r-venc" checked> Incluir prazos vencidos no topo</label>
      <button class="btn" data-act="pdf-pauta">${ICON.pdf}Gerar PDF da pauta</button></div></div>
    <div class="panel"><div class="panel-h"><h2>Carteira de processos</h2>${ICON.processos.replace("<svg",'<svg style="width:20px;color:var(--gold)"')}</div><div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
      <label class="f">Área<select id="r-area"><option value="">Todas</option>${Object.entries(AREAS).map(([k,v])=>`<option value="${k}">${v.nome}</option>`).join("")}</select></label>
      <button class="btn" data-act="pdf-carteira">${ICON.pdf}Gerar PDF da carteira</button></div></div>
    <div class="panel"><div class="panel-h"><h2>Relatório de um processo</h2>${ICON.relatorios.replace("<svg",'<svg style="width:20px;color:var(--gold)"')}</div><div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
      <label class="f">Processo<select id="r-proc">${optsP}</select></label>
      <label class="check"><input type="checkbox" id="r-cli"> Versão para o cliente (só o que ele pode ver)</label>
      <button class="btn" data-act="pdf-processo-sel">${ICON.pdf}Gerar PDF do processo</button></div></div>`:""}
  </div>
  ${pode("enviar_cliente")?`<div class="panel"><div class="panel-h"><h2>Mensagens preparadas</h2></div>${coms.length?`<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Data</th><th>Cliente</th><th>Processo</th><th>Situação</th><th>Por</th></tr></thead><tbody>${coms.map(c=>`<tr data-act="ver-com" data-id="${c.id}"><td class="small">${new Date(c.enviado_em).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})}</td><td>${esc(cliById(c.cliente_id)?.nome||"—")}</td><td class="mono small">${esc(procById(c.processo_id)?.numero||"—")}</td><td><span class="chip accent">${esc(c.canal)}</span></td><td class="small">${esc(P.primeiroNome(nomePerfil(c.enviado_por)))}</td></tr>`).join("")}</tbody></table></div>`:`<div class="empty small">Nenhuma mensagem preparada ainda.</div>`}</div>`:""}`;
}

/* ---------- EQUIPE E ACESSOS (convites por link) ---------- */
function linkConvite(c){ return location.origin + location.pathname + "?convite=" + encodeURIComponent(c.token) + (c.papel==="cliente" ? "&portal=1" : ""); }
function situacaoConvite(c){ if(c.usado_em) return ["Usado","ok"]; if(c.expira_em && Date.parse(c.expira_em) < Date.now()) return ["Expirado","danger"]; return ["Aguardando","warn"]; }
function vEquipe(){
  const dc = (P.cfg().docs || {});
  const equipe = S.perfis.filter(u=>u.papel!=="cliente").sort((a,b)=>(a.nome||"").localeCompare(b.nome||""));
  const clientesAcesso = S.perfis.filter(u=>u.papel==="cliente");
  const cfg = P.cfg();
  const convs = (S.convites||[]).slice().sort((a,b)=>(b.criado_em||"").localeCompare(a.criado_em||""));
  const pend = convs.filter(c=>situacaoConvite(c)[0]==="Aguardando");
  return `<div class="head"><div><h1>Equipe e acessos</h1><div class="sub">Crie um link de convite para cada pessoa, já com a função e o que ela pode ver. Quem abre o link cria a própria senha e entra direto.</div></div><button class="btn primary" data-act="novo-convite">${ICON.plus}Criar link de acesso</button></div>
  <div class="panel"><div class="panel-h"><h2>Links de convite</h2><span class="small muted">${pend.length} aguardando uso</span></div>
    ${convs.length?`<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Para</th><th>Função</th><th>Situação</th><th>Validade</th><th></th></tr></thead><tbody>
    ${convs.map(c=>{ const [st,cl] = situacaoConvite(c); return `<tr style="cursor:default"><td><b style="font-weight:600">${esc(c.nome||"Sem nome")}</b><div class="small muted">${esc(c.email||"qualquer e-mail")}${c.cliente_id?" · cliente "+esc(cliById(c.cliente_id)?.nome||""):""}</div></td>
      <td><span class="chip neutral">${esc(P.PAPEIS[c.papel]||"")}</span></td><td><span class="chip ${cl}">${st}</span></td><td class="small">${c.expira_em?P.fmt(c.expira_em.slice(0,10)):"Sem prazo"}</td>
      <td style="text-align:right;white-space:nowrap">${st==="Aguardando"?`<button class="btn ghost" data-act="copiar-convite" data-id="${c.id}">${ICON.copy}Copiar link</button>`:""}<button class="btn ghost" data-act="excluir-convite" data-id="${c.id}">${st==="Aguardando"?"Cancelar":"Remover"}</button></td></tr>`; }).join("")}
    </tbody></table></div>`:`<div class="empty small"><p>Nenhum convite ainda. Crie um link para cada pessoa da equipe ou cliente.</p></div>`}</div>
  <div class="panel"><div class="panel-h"><h2>Equipe</h2><span class="small muted">${equipe.length} pessoa(s)</span></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Pessoa</th><th>Função</th><th>Situação</th><th>Acessos</th></tr></thead><tbody>
  ${equipe.map(u=>{ const n = u.papel==="gestor" ? "Tudo" : Object.values(u.permissoes||{}).filter(Boolean).length+" de "+P.PERMISSOES.length;
    return `<tr data-act="editar-usuario" data-id="${u.id}"><td><div class="row" style="flex-wrap:nowrap"><span class="avatar">${esc(P.iniciais(u.nome))}</span><div style="min-width:0"><b style="font-weight:600">${esc(u.nome||"Sem nome")}</b>${u.id===meuId()?` <span class="small gold">você</span>`:""}<div class="small muted">${esc(u.email||"")}</div></div></div></td>
    <td><span class="chip ${u.papel==="gestor"?"accent":"neutral"}">${P.PAPEIS[u.papel]||""}</span></td><td><span class="chip ${u.status==="ativo"?"ok":"danger"}">${u.status==="ativo"?"Ativo":"Bloqueado"}</span></td><td class="small">${esc(n)}</td></tr>`; }).join("")}
  </tbody></table></div></div>
  <div class="panel"><div class="panel-h"><h2>Clientes com acesso ao portal</h2></div>${clientesAcesso.length?`<div class="tbl-wrap"><table class="tbl"><tbody>${clientesAcesso.map(u=>`<tr data-act="editar-usuario" data-id="${u.id}"><td><b style="font-weight:600">${esc(u.nome||"")}</b><div class="small muted">${esc(u.email||"")}</div></td><td class="small">${esc(cliById(u.cliente_id)?.nome||"Sem cliente vinculado")}</td><td><span class="chip ${u.status==="ativo"?"ok":"danger"}">${u.status==="ativo"?"Ativo":"Bloqueado"}</span></td></tr>`).join("")}</tbody></table></div>`:`<div class="empty small"><p>Nenhum cliente com acesso. Na ficha do cliente, use "Criar link de acesso".</p></div>`}</div>
  <div class="panel"><div class="panel-h"><h2>Ajustes do escritório</h2></div><form class="panel-b" id="f-escritorio" style="display:flex;flex-direction:column;gap:14px">
    <div class="grid2"><label class="f">Nome do escritório<input type="text" id="a-nome" value="${esc(S.escritorio?.nome||"")}"></label>
    <label class="f">Margem do prazo interno (dias úteis)<input type="number" id="a-margem" min="0" max="15" value="${esc(cfg.margem ?? 2)}"></label></div>
    <label class="f">Feriados locais e do tribunal (um por linha: DD/MM para todo ano, ou DD/MM/AAAA)<textarea id="a-fer" rows="4" placeholder="25/01 Aniversário de São Paulo&#10;09/07 Revolução Constitucionalista&#10;08/12 Dia da Justiça">${esc(cfg.feriadosLocais||"")}</textarea><span class="hint">Feriados nacionais, Carnaval, Sexta-feira Santa, Corpus Christi e o recesso de 20/12 a 20/01 já entram no cálculo.</span></label>
    <h3 style="margin:6px 0 0">Dados para documentos (contrato, procuração e peças)</h3>
    <div class="grid2">
      <label class="f">Nome / razão social<input type="text" id="d-nome" value="${esc(dc.nome||S.escritorio?.nome||"")}"></label>
      <label class="f">CNPJ<input type="text" id="d-cnpj" value="${esc(dc.cnpj||"")}"></label>
      <label class="f">Registro da sociedade na OAB<input type="text" id="d-oab" value="${esc(dc.oab||"")}" placeholder="OAB/SP nº 00.000"></label>
      <label class="f">Cidade padrão (foro e assinatura)<input type="text" id="d-cidade" value="${esc(dc.cidade||"")}" placeholder="São Paulo/SP"></label>
      <label class="f span2">Endereço completo<input type="text" id="d-end" value="${esc(dc.endereco||"")}"></label>
      <label class="f">Telefone<input type="text" id="d-tel" value="${esc(dc.telefone||"")}"></label>
      <label class="f">E-mail<input type="email" id="d-email" value="${esc(dc.email||"")}"></label>
      <label class="f span2">Advogados (um por linha: nome, OAB/UF nº, e-mail)<textarea id="d-advs" rows="3" placeholder="Maria Silva, OAB/SP nº 123.456, maria@escritorio.com.br">${esc(dc.advogados||"")}</textarea></label>
      <label class="f">Cor principal<input type="color" id="d-cor" value="${esc(dc.cor||"#1f3a2e")}"></label>
      <label class="f">Cor de destaque<input type="color" id="d-cor2" value="${esc(dc.cor2||"#b8924a")}"></label>
      <label class="f span2">Logo (PNG ou JPG)<input type="file" id="a-logo" accept="image/png,image/jpeg"><img id="a-logo-prev" alt="" ${dc.logo?`src="${dc.logo}"`:"hidden"} style="max-height:56px;max-width:220px;margin-top:8px;background:#fff;padding:4px;border-radius:8px"></label>
    </div>
    <div class="row" style="justify-content:flex-end"><button class="btn primary" type="submit">Salvar ajustes</button></div></form></div>`;
}
function mConvite(m){
  const c = m.c || (m.c = Object.assign({nome:"", email:"", papel:"advogado", cliente_id:"", dias:7, permissoes:Object.assign({}, P.PADRAO.advogado)}, m.pre||{}));
  if(c.link) return cab("Link criado", esc(c.nome||"")) + `<div class="sheet-b">
    <div class="notice"><b>Envie este link para ${esc(c.nome||"a pessoa")}.</b> Ele ${c.expira_em?`vale até ${P.fmt(c.expira_em.slice(0,10))}`:"não expira"}, pode ser usado uma única vez${c.email?` e só com o e-mail <b>${esc(c.email)}</b>`:""}.</div>
    <label class="f">Link de acesso<input type="text" readonly value="${esc(c.link)}" class="mono" onfocus="this.select()"></label>
    <label class="f">Mensagem pronta<textarea id="cv-msg" rows="7">${esc(textoConvite(c))}</textarea></label>
  </div><div class="sheet-f"><button class="btn" data-act="fechar">Fechar</button><button class="btn" data-act="copiar-txt" data-t="${esc(c.link)}">${ICON.copy}Copiar link</button><button class="btn primary" data-act="copiar-msg-convite">${ICON.copy}Copiar mensagem</button></div>`;
  const lista = c.papel==="cliente" ? P.PERMISSOES_CLIENTE : P.PERMISSOES;
  return cab("Criar link de acesso", "Escolha quem é a pessoa, a função e o que ela pode ver") + `<div class="sheet-b">
    <div class="grid2"><label class="f">Nome da pessoa<input type="text" id="cv-n" value="${esc(c.nome)}" placeholder="Ex.: Júlia Prado"></label>
      <label class="f">E-mail (recomendado)<input type="email" id="cv-e" value="${esc(c.email)}" placeholder="O link só funciona com este e-mail"></label>
      <label class="f">Função<select id="cv-p">${opts([["advogado","Advogado(a)"],["estagiario","Estagiário(a)"],["gestor","Gestor"],["cliente","Cliente"]], c.papel)}</select></label>
      <label class="f">Validade do link<select id="cv-d">${opts([["1","1 dia"],["7","7 dias"],["30","30 dias"],["90","90 dias"],["0","Sem prazo"]], String(c.dias))}</select><span class="hint">Prazo só para usar o link. Depois de criar a conta, o acesso fica liberado sem prazo, até você suspender.</span></label>
      ${c.papel==="cliente"?`<label class="f span2">Cliente (ele verá só os processos deste cliente)<select id="cv-cli"><option value="">Selecione</option>${opts(S.clientes.slice().sort((a,b)=>a.nome.localeCompare(b.nome)).map(x=>[x.id,x.nome]), c.cliente_id)}</select></label>`:""}</div>
    ${c.papel==="gestor"?`<div class="notice">O gestor tem acesso total, inclusive para criar convites e mudar acessos.</div>`
    :`<div class="row" style="justify-content:space-between"><h3>O que pode ver e fazer</h3><button class="linkbtn" data-act="convite-padrao">Padrão da função</button></div>
      <div class="perm">${lista.map(([k,l,d])=>`<label><input type="checkbox" data-cperm="${k}" ${c.permissoes[k]?"checked":""}><span><b>${l}</b><span>${d}</span></span></label>`).join("")}</div>`}
    ${c.papel==="cliente"?`<div class="notice">No portal, o cliente vê a fase, o resumo para o cliente e os andamentos marcados como "cliente vê". Nunca vê anotações internas.</div>`:""}
  </div><div class="sheet-f"><button class="btn" data-act="fechar">Cancelar</button><button class="btn primary" data-act="salvar-convite">Gerar link</button></div>`;
}
function lerConviteForm(){ const c = modal.c; c.nome = $("#cv-n").value.trim(); c.email = $("#cv-e").value.trim(); c.papel = $("#cv-p").value; c.dias = Number($("#cv-d").value); const cl = $("#cv-cli"); if(cl) c.cliente_id = cl.value; const pm = Object.assign({}, c.permissoes); document.querySelectorAll("[data-cperm]").forEach(x=>pm[x.dataset.cperm] = x.checked); c.permissoes = pm; return c; }
function textoConvite(c){ return `Olá${c.nome?", "+P.primeiroNome(c.nome):""}! Você foi convidado(a) para acessar ${c.papel==="cliente"?"o acompanhamento dos seus processos com":"a área da equipe do"} ${S.escritorio?.nome||"escritório"}.\n\n1. Abra o link: ${c.link}\n2. Confira seu nome${c.email?" e use o e-mail "+c.email:""}\n3. Crie sua senha\n\n${c.expira_em?`O link vale até ${P.fmt(c.expira_em.slice(0,10))} e pode ser usado uma vez.`:"O link pode ser usado uma vez."} ${c.papel==="cliente" ? "Para acessar depois, entre em: "+location.origin+location.pathname+"?portal=1" : "Depois disso, é só entrar pelo mesmo endereço com e-mail e senha."}`; }
function mCliente(m){
  const c = m.c || (m.c = m.id ? Object.assign({}, cliById(m.id)) : {tipo:"PF"});
  const ps = m.id ? S.processos.filter(p=>p.cliente_id===m.id) : [];
  const ed = pode("gerenciar_clientes");
  const acessos = m.id ? S.perfis.filter(u=>u.papel==="cliente" && u.cliente_id===m.id) : [];
  const convPend = m.id ? (S.convites||[]).filter(x=>x.cliente_id===m.id && situacaoConvite(x)[0]==="Aguardando") : [];
  let portal = "";
  if(m.id && pode("gerenciar_equipe")) portal = `<div class="notice" style="display:flex;flex-direction:column;gap:10px"><div><b>Portal do cliente:</b> ${acessos.length?acessos.map(u=>`${esc(u.nome)} (${esc(u.email||"")}) ${u.status==="ativo"?"tem acesso":"está bloqueado"}`).join("; "):convPend.length?"link de convite enviado e aguardando uso.":"o cliente ainda não tem acesso."}</div>
      <div class="row"><button type="button" class="btn" data-act="convite-cliente" data-id="${m.id}">${ICON.send}Criar link de acesso</button>${acessos.map(u=>`<button type="button" class="btn ghost" data-act="editar-usuario" data-id="${u.id}">Acessos de ${esc(P.primeiroNome(u.nome))}</button>`).join("")}</div></div>`;
  return cab(m.id?esc(c.nome):"Novo cliente") + `<form class="sheet-b" autocomplete="off"><div class="grid2">
    <label class="f span2">Nome<input type="text" id="c-nome" value="${esc(c.nome||"")}" ${ed?"":"disabled"}></label>
    <label class="f">Tipo<select id="c-tipo" ${ed?"":"disabled"}>${opts([["PF","Pessoa física"],["PJ","Pessoa jurídica"]], c.tipo)}</select></label>
    <label class="f">CPF / CNPJ<input type="text" id="c-doc" value="${esc(c.doc||"")}" ${ed?"":"disabled"}></label>
    <label class="f">Celular (WhatsApp)<input type="tel" id="c-tel" value="${esc(c.telefone||"")}" ${ed?"":"disabled"}></label>
    <label class="f">E-mail<input type="email" id="c-email" value="${esc(c.email||"")}" ${ed?"":"disabled"}></label>
    <label class="f">Nacionalidade<input type="text" id="c-nac" value="${esc((c.dados||{}).nacionalidade||"")}" placeholder="brasileira" ${ed?"":"disabled"}></label>
    <label class="f">Estado civil<select id="c-ec" ${ed?"":"disabled"}>${opts([["","—"],"solteiro(a)","casado(a)","divorciado(a)","viúvo(a)","em união estável"], (c.dados||{}).estado_civil||"")}</select></label>
    <label class="f">Profissão<input type="text" id="c-prof" value="${esc((c.dados||{}).profissao||"")}" ${ed?"":"disabled"}></label>
    <label class="f">RG<input type="text" id="c-rg" value="${esc((c.dados||{}).rg||"")}" ${ed?"":"disabled"}></label>
    <label class="f span2">Endereço completo com CEP<input type="text" id="c-end" value="${esc((c.dados||{}).endereco||"")}" ${ed?"":"disabled"}></label>
    <label class="f span2">Representante legal (empresa)<input type="text" id="c-rep" value="${esc((c.dados||{}).representante||"")}" placeholder="Nome, cargo e CPF" ${ed?"":"disabled"}></label>
    <label class="f span2">Observações<textarea id="c-obs" rows="2" ${ed?"":"disabled"}>${esc(c.obs||"")}</textarea></label></div>
    ${portal}
    ${ps.length?`<div><h3 style="margin-bottom:6px">Processos</h3>${ps.map(p=>`<div class="row" style="padding:8px 0;border-top:1px solid var(--line)"><span class="mono gold" data-act="abrir-processo" data-id="${p.id}" style="cursor:pointer">${esc(p.numero||"sem número")}</span>${chipArea(p.area)}<span class="small muted">${esc(p.fase||"")}</span></div>`).join("")}</div>`:""}
  </form><div class="sheet-f">${m.id && pode("excluir_registros")?`<button class="btn danger" data-act="excluir" data-col="clientes" data-id="${m.id}" style="margin-right:auto">Excluir</button>`:""}<button class="btn" data-act="fechar">${ed?"Cancelar":"Fechar"}</button>${ed?`<button class="btn primary" data-act="salvar-cliente">Salvar</button>`:""}</div>`;
}
function mUsuario(m){
  if(!m.u) m.u = JSON.parse(JSON.stringify(S.perfis.find(x=>x.id===m.id)));
  const u = m.u, perms = u.permissoes || {}, cli = u.papel==="cliente";
  const lista = cli ? P.PERMISSOES_CLIENTE : P.PERMISSOES;
  return cab(esc(u.nome||u.email||"Pessoa"), esc(u.email||"")) + `<div class="sheet-b">
    <div class="grid2"><label class="f">Função<select id="u-papel">${opts(cli?[["cliente","Cliente"]]:[["gestor","Gestor"],["advogado","Advogado(a)"],["estagiario","Estagiário(a)"]], u.papel)}</select></label>
      <label class="f">Situação<select id="u-status">${opts([["ativo","Ativo"],["bloqueado","Bloqueado"]], u.status)}</select></label>
      ${cli?`<label class="f span2">Cliente vinculado<select id="u-cli"><option value="">Selecione</option>${opts(S.clientes.slice().sort((a,b)=>a.nome.localeCompare(b.nome)).map(x=>[x.id,x.nome]), u.cliente_id)}</select></label>`:""}</div>
    ${u.papel==="gestor" ? `<div class="notice">O gestor tem acesso total.</div>` : `<div class="row" style="justify-content:space-between"><h3>O que pode ver e fazer</h3><button class="linkbtn" data-act="perm-padrao">Padrão da função</button></div>
    <div class="perm">${lista.map(([k,l,d])=>`<label><input type="checkbox" data-perm="${k}" ${perms[k]?"checked":""}><span><b>${l}</b><span>${d}</span></span></label>`).join("")}</div>`}
  </div><div class="sheet-f">${u.id!==meuId()?`<button class="btn danger" data-act="excluir-usuario" data-id="${u.id}" style="margin-right:auto">Remover acesso</button>`:""}<button class="btn" data-act="fechar">Cancelar</button><button class="btn primary" data-act="salvar-usuario">Salvar</button></div>`;
}
function mPerfil(){
  const p = S.perfil;
  return cab("Minha conta", esc(p.email||"")) + `<div class="sheet-b">
    <div class="who"><span class="avatar">${esc(P.iniciais(p.nome))}</span><div><b style="display:block">${esc(p.nome||"")}</b><span class="small muted">${P.PAPEIS[p.papel]||""} · ${esc(S.escritorio?.nome||"")}</span></div></div>
    <button class="act" data-act="aparencia" style="flex-direction:row;align-items:center"><span class="ic">${ICON.paleta}</span><span>Aparência<small>Cores, fundo, estilo das letras e cantos</small></span></button>
    ${api.modo!=="demo"?`<label class="f">Nova senha<input type="password" id="me-s" minlength="6" autocomplete="new-password" placeholder="Deixe em branco para manter"></label>`:""}
    <div class="notice small">Para usar como app no celular: abra este endereço no navegador do celular e toque em <b>Compartilhar › Adicionar à Tela de Início</b> (iPhone) ou <b>⋮ › Instalar app</b> (Android).</div>
  </div><div class="sheet-f"><button class="btn danger" data-act="sair-conta" style="margin-right:auto">${ICON.sair}Sair da conta</button><button class="btn" data-act="sair">Tela inicial</button>${api.modo!=="demo"?`<button class="btn primary" data-act="salvar-senha">Salvar</button>`:""}</div>`;
}
function mNovaSenha(){ return cab("Criar nova senha") + `<div class="sheet-b"><label class="f">Nova senha<input type="password" id="ns" minlength="6" autocomplete="new-password"></label></div><div class="sheet-f"><button class="btn primary" data-act="salvar-nova-senha">Salvar senha</button></div>`; }
function mAparencia(m){
  const t = m.t || (m.t = Object.assign({}, P.tema));
  const segs = (k, lista) => `<div class="seg" role="group">${lista.map(([v,l])=>`<button data-act="tema" data-k="${k}" data-v="${v}" aria-pressed="${t[k]===v}">${l}</button>`).join("")}</div>`;
  return cab("Aparência", "Muda na hora; salve para manter neste aparelho") + `<div class="sheet-b">
    <div><h3 style="margin-bottom:10px">Fundo</h3><div class="fundos">${Object.entries(P.FUNDOS).map(([k,f])=>`<button class="fundo" data-act="tema" data-k="fundo" data-v="${k}" aria-pressed="${t.fundo===k}"><i style="background:linear-gradient(135deg,${f.t.bg} 55%,${f.t.surface} 55%)"></i>${f.nome}</button>`).join("")}</div></div>
    <div><h3 style="margin-bottom:10px">Cor de destaque</h3><div class="swatches">${Object.entries(P.DESTAQUES).map(([k,a])=>`<button class="sw" data-act="tema" data-k="destaque" data-v="${k}" aria-pressed="${t.destaque===k}" title="${a.nome}" aria-label="${a.nome}" style="background:linear-gradient(140deg,${a.hi},${a.c} 55%,${a.deep})"></button>`).join("")}</div></div>
    <div class="grid2"><div><h3 style="margin-bottom:10px">Estilo das letras</h3>${segs("estilo", Object.entries(P.ESTILOS).map(([k,e])=>[k,e.nome]))}</div>
      <div><h3 style="margin-bottom:10px">Cantos</h3>${segs("cantos", [["arredondados","Arredondados"],["retos","Retos"]])}</div>
      <div><h3 style="margin-bottom:10px">Espaçamento</h3>${segs("densidade", [["confortavel","Confortável"],["compacta","Compacto"]])}</div></div>
  </div><div class="sheet-f"><button class="btn ghost" data-act="tema-padrao" style="margin-right:auto">Restaurar padrão</button>${S.perfil && pode("gerenciar_equipe")?`<button class="btn" data-act="tema-escritorio">Usar como padrão do escritório</button>`:""}<button class="btn primary" data-act="tema-salvar">Salvar</button></div>`;
}
function mMais(){
  const extra = itensNav().filter(([k])=>!["inicio","agenda","processos","assistente"].includes(k));
  return cab("Mais") + `<div class="sheet-b"><div class="more-grid">${extra.map(([k,l])=>`<button class="act" data-act="nav" data-v="${k}"><span class="ic">${ICON[k]}</span><span>${l}</span></button>`).join("")}<button class="act" data-act="perfil"><span class="ic">${ICON.ajustes}</span><span>Minha conta</span></button></div></div>`;
}
function mCom(m){ const c = S.comunicacoes.find(x=>x.id===m.id); return cab("Mensagem de "+new Date(c.enviado_em||c.criado_em).toLocaleString("pt-BR"), esc(nomePerfil(c.enviado_por||c.criado_por))) + `<div class="sheet-b"><div class="small muted">Para: ${esc(cliById(c.cliente_id)?.nome||c.destino||"")}</div><div class="pre">${esc(c.texto||"")}</div><div class="row"><button class="btn" data-act="copiar-txt" data-t="${esc(c.texto||"")}">${ICON.copy}Copiar de novo</button></div></div>`; }

/* ---------- mensagem para o cliente (só montar e copiar) ---------- */
function textoAtualizacao(p){
  const c = cliById(p.cliente_id) || {};
  const and = andamentosDe(p.id).filter(a=>a.visivel_cliente).slice(0,3);
  const aud = S.tarefas.filter(t=>t.processo_id===p.id && t.tipo==="Audiência" && !t.done && t.data>=hoje()).sort((a,b)=>a.data.localeCompare(b.data))[0];
  return `Olá, ${P.primeiroNome(c.nome)||"tudo bem"}!\n\nSegue a atualização do seu processo nº ${p.numero||"(sem número)"} (${AREAS[p.area]?.nome||""}${p.parte_contraria?", contra "+p.parte_contraria:""}).\n\nFase atual: ${p.fase||"—"}.${p.resumo_cliente?"\n"+p.resumo_cliente:""}\n${and.length?`\nÚltimas movimentações:\n${and.map(a=>`• ${fmt(a.data)}: ${a.texto}`).join("\n")}\n`:""}${aud?`\nPróxima audiência: ${fmt(aud.data)}${aud.hora?" às "+aud.hora:""}${aud.modalidade?" ("+aud.modalidade.toLowerCase()+")":""}${aud.local?", "+aud.local:""}.\n`:""}${c.conta_id?`\nVocê também acompanha tudo pelo nosso portal, no mesmo link que compartilhamos com você.\n`:""}\nQualquer dúvida, estamos à disposição.\n\n${S.perfil.nome}\n${S.escritorio?.nome||""}`;
}
function mComunicar(m){
  const p = procById(m.id), c = cliById(p.cliente_id) || {};
  if(m.texto===undefined) m.texto = textoAtualizacao(p);
  return cab("Mensagem para o cliente", esc(c.nome||"Cliente")+" · <span class='mono'>"+esc(p.numero||"")+"</span>") + `<div class="sheet-b">
    <label class="f">Mensagem (revise e copie para enviar pelo seu e-mail ou WhatsApp)<textarea id="com-texto" rows="15">${esc(m.texto)}</textarea></label>
    ${c.telefone||c.email?`<div class="small muted">Contato do cliente: ${c.telefone?`<span class="mono">${esc(c.telefone)}</span>`:""}${c.telefone&&c.email?" · ":""}${c.email?`<span>${esc(c.email)}</span>`:""}</div>`:""}
    ${m.erro?`<div class="err">${esc(m.erro)}</div>`:""}
  </div><div class="sheet-f">${P.temIA()?`<button class="btn ghost" data-act="com-ia" style="margin-right:auto" ${m.ocupado?"disabled":""}>${m.ocupado?`<span class="spinner"></span>`:ICON.ia} Deixar mais simples com IA</button>`:""}<button class="btn" data-act="pdf-processo" data-id="${p.id}" data-cliente="1">${ICON.pdf}PDF</button><button class="btn primary" data-act="copiar-com">${ICON.copy}Copiar mensagem</button></div>`;
}

/* ---------- leitor de PDF / intimação ---------- */
function mLeitor(m){
  const r = m.r, a = P.analisarTexto(r.texto); m.a = a;
  const pMatch = m.processo_id ? procById(m.processo_id) : S.processos.find(p=>a.numeros.some(n=>P.soDigitos(n)===P.soDigitos(p.numero)));
  if(pMatch) m.processo_id = pMatch.id;
  const base = a.disponibilizacao || a.publicacao || hoje();
  return cab("Leitura do documento", esc(m.nome)+(r.paginas?` · ${r.paginas} página(s)`:"")) + `<div class="sheet-b">
    <div class="row"><span class="chip accent">${esc(a.tipo)}</span>${a.numeros.map(n=>`<span class="chip neutral mono">${esc(n)}</span>`).join("")}${a.valores.map(v=>`<span class="chip neutral">${esc(v)}</span>`).join("")}</div>
    ${pMatch?`<div class="notice"><b>Processo encontrado:</b> <span class="mono">${esc(pMatch.numero)}</span> · ${esc(nomeCliente(pMatch))} ${chipArea(pMatch.area)}</div>`
      : a.numeros.length ? `<div class="notice"><b>O número ${esc(a.numeros[0])} não está cadastrado.</b> ${pode("editar_processos")?`<div class="row" style="margin-top:8px"><button class="btn" data-act="leitor-novo-proc">${ICON.plus}Cadastrar este processo</button></div>`:""}</div>`
      : `<label class="f">Vincular a um processo<select id="lt-proc"><option value="">Escolha o processo</option>${opts(S.processos.map(p=>[p.id,(p.numero||"sem número")+" · "+nomeCliente(p)]), m.processo_id)}</select></label>`}
    <h3>Encontrado automaticamente</h3>
    <div class="pauta panel">
      ${a.prazos.map((x,i)=>`<div class="item" style="grid-template-columns:minmax(0,1fr) auto"><div style="min-width:0"><b>Prazo de ${x.dias} dia(s)${x.contagem?" "+(x.contagem==="uteis"?"úteis":"corridos"):""}</b><div class="small muted">“…${esc(x.trecho)}…”</div></div><button class="btn primary" data-act="leitor-prazo" data-i="${i}">Criar prazo</button></div>`).join("")}
      ${a.audiencias.map((x,i)=>`<div class="item" style="grid-template-columns:minmax(0,1fr) auto"><div style="min-width:0"><b>Audiência em ${fmt(x.data)}${x.hora?" às "+esc(x.hora):""}${x.modalidade?" · "+x.modalidade:""}</b><div class="small muted">“${esc(x.trecho)}…”</div></div><button class="btn primary" data-act="leitor-aud" data-i="${i}">Agendar</button></div>`).join("")}
      <div class="item" style="grid-template-columns:minmax(0,1fr) auto"><div style="min-width:0"><b>Registrar como andamento</b><div class="small muted">${esc(a.tipo)}${a.disponibilizacao?" disponibilizada em "+fmt(a.disponibilizacao):a.publicacao?" publicada em "+fmt(a.publicacao):""}</div></div><button class="btn" data-act="leitor-and">Registrar</button></div>
      ${!a.prazos.length && !a.audiencias.length ? `<div class="item" style="grid-template-columns:minmax(0,1fr)"><span class="small muted">Nenhum prazo ou audiência explícitos no texto. Peça a leitura da IA abaixo; a data-base sugerida é ${fmt(base)}.</span></div>`:""}
    </div>
    ${!P.temIA() ? "" : m.ia ? blocoIA(m.ia, true) : `<div class="row" style="justify-content:space-between"><span class="hint">A IA lê o documento inteiro e explica o que pede, os prazos, os próximos passos e um texto simples para o cliente.</span><button class="btn primary" data-act="leitor-ia" ${m.ocupado?"disabled":""}>${m.ocupado?`<span class="spinner"></span> Lendo…`:ICON.ia+" Interpretar com IA"}</button></div>`}
    ${m.erro?`<div class="err">${esc(m.erro)}</div>`:""}
    ${r.comentarios.length?`<div class="notice"><b>${r.comentarios.length} comentário(s) no PDF.</b> Para responder cláusula por cláusula, use a <button class="linkbtn" data-act="leitor-minuta">Revisão de minuta</button>.</div>`:""}
    <details><summary class="small muted" style="cursor:pointer">Ver texto extraído</summary><div class="pre" style="margin-top:8px">${esc(r.texto.slice(0,8000))}${r.texto.length>8000?"\n…":""}</div></details>
  </div>`;
}
function leitorProc(){ const s = $("#lt-proc"); if(s && s.value) modal.processo_id = s.value; return modal.processo_id || ""; }
/* ---------- PORTAL DO CLIENTE ---------- */

/* ---------- modais ---------- */
function abrirModal(m){
  modal = m;
  const fn = {tarefa:mTarefa, processo:mProcesso, detalhe:mDetalhe, cliente:mCliente, perfil:mPerfil, mais:mMais, usuario:mUsuario, comunicar:mComunicar, leitor:mLeitor, com:mCom, aparencia:mAparencia, convite:mConvite, novaSenha:mNovaSenha, docgerado:mDocGerado, modelo:mModelo, financeiro:mFinanceiro, atendimento:mAtendimento, agendaCelular:mAgendaCelular}[m.kind];
  const sheet = $("#sheet");
  sheet.className = "sheet" + (["detalhe","leitor"].includes(m.kind)?" wide":"") + (m.kind==="docgerado"?" wide docview":"");
  sheet.innerHTML = fn(m);
  $("#overlay").hidden = false;
  if(m.kind==="tarefa") atualizarCalc();
  if(m.kind==="processo") atualizarCNJ();
  if(m.kind==="docgerado"){ const f = $("#doc-frame"); if(f) f.srcdoc = m.html; }
  if(!m._focado){ m._focado = true; const f = sheet.querySelector("input:not([type=checkbox]):not([type=file]),select,textarea"); if(f && window.innerWidth>760) f.focus(); }
  requestAnimationFrame(posicionarIndicadores);
}
function fecharModal(){ modal = null; $("#overlay").hidden = true; $("#sheet").innerHTML = ""; }
const cab = (t, sub) => `<div class="sheet-h"><div style="min-width:0"><h2>${t}</h2>${sub?`<div class="small muted" style="margin-top:4px">${sub}</div>`:""}</div><button class="icon-btn" data-act="fechar" aria-label="Fechar">${ICON.x}</button></div>`;
const opts = (arr, sel) => arr.map(a=>{ const [v,l] = Array.isArray(a)?a:[a,a]; return `<option value="${esc(v)}" ${String(sel??"")===String(v)?"selected":""}>${esc(l)}</option>`; }).join("");

function mTarefa(m){
  if(!m.t){
    m.t = m.id ? Object.assign({}, S.tarefas.find(x=>x.id===m.id)) : Object.assign({tipo:m.tipo||"Prazo", processo_id:m.processo_id||"", atribuido_a:meuId(), modo:"calc", djen:true, suspende:true, data: m.data||""}, m.pre||{});
    const c = m.t.calculo || {}; m.t.inicio = m.t.inicio || c.inicio || hoje(); m.t.dias = m.t.dias || c.dias || 15; if(c.djen!==undefined) m.t.djen = c.djen; if(m.id && !c.inicio) m.t.modo = "manual";
    if(m.id && m.t.interno && m.t.data && m.t.interno !== P.prazoInterno(m.t.data)) m.t._intManual = true;
  }
  const t = m.t, edita = pode("criar_tarefas") || t.atribuido_a===meuId() || !m.id;
  const ps = S.processos.slice().sort((a,b)=>nomeCliente(a).localeCompare(nomeCliente(b)));
  return cab(m.id?"Atividade":"Nova atividade", t.criado_por && t.criado_por!==meuId() ? "Criada por "+esc(nomePerfil(t.criado_por)) : "") + `<form class="sheet-b" id="form-tarefa" autocomplete="off">
    <div class="seg" role="group" aria-label="Tipo">${TIPOS.map(k=>`<button type="button" data-act="tipo-tarefa" data-t="${k}" aria-pressed="${t.tipo===k}">${k}</button>`).join("")}</div>
    <div class="grid2">
      <label class="f span2">Processo<select id="t-proc"><option value="">Sem processo vinculado</option>${opts(ps.map(p=>[p.id,(p.numero||"sem número")+" · "+nomeCliente(p)+" · "+(AREAS[p.area]?.nome||"")]), t.processo_id)}</select></label>
      <label class="f span2">Descrição<input type="text" id="t-titulo" value="${esc(t.titulo||"")}" placeholder="${t.tipo==="Prazo"?"Ex.: Contestação":t.tipo==="Audiência"?"Ex.: Audiência de instrução":"Ex.: Pedir procuração assinada ao cliente"}"></label>
    </div>
    ${t.tipo==="Prazo"?`
      <div class="seg" role="group"><button type="button" data-act="modo-prazo" data-m="calc" aria-pressed="${t.modo!=="manual"}">Calcular a partir da intimação</button><button type="button" data-act="modo-prazo" data-m="manual" aria-pressed="${t.modo==="manual"}">Informar a data final</button></div>
      ${t.modo!=="manual"?`<div id="chips-prazo"></div>
      <div class="grid3"><label class="f">Data da intimação<input type="date" id="t-inicio" value="${esc(t.inicio)}"></label><label class="f">Prazo (dias)<input type="number" id="t-dias" min="1" max="365" value="${esc(t.dias)}"></label>
        <label class="f">Contagem<select id="t-contagem">${opts([["auto","Automática pela área"],["uteis","Dias úteis"],["corridos","Dias corridos"]], t.contagem||"auto")}</select></label></div>
      <label class="check"><input type="checkbox" id="t-djen" ${t.djen!==false?"checked":""}> A data é a disponibilização no Diário Eletrônico (DJEN). A publicação conta no dia útil seguinte.</label>
      <label class="check"><input type="checkbox" id="t-susp" ${t.suspende!==false?"checked":""}> Suspender no recesso forense (20/12 a 20/01). Desmarque em caso de réu preso ou medida urgente.</label>`
      :`<div class="grid3"><label class="f">Prazo fatal<input type="date" id="t-data" value="${esc(t.data||"")}"></label></div>`}
      <div class="calc" id="calc-box"></div>`
    :`<div class="grid3"><label class="f">Data<input type="date" id="t-data" value="${esc(t.data||hoje())}"></label><label class="f">Horário<input type="time" id="t-hora" value="${esc(t.hora||"")}"></label>
        ${t.tipo==="Audiência"?`<label class="f">Modalidade<select id="t-modal">${opts(["Presencial","Virtual","Híbrida"], t.modalidade||"Presencial")}</select></label>`:""}
        ${["Audiência","Reunião","Diligência"].includes(t.tipo)?`<label class="f span2">Local ou link<input type="text" id="t-local" value="${esc(t.local||"")}" placeholder="Ex.: 2ª Vara do Trabalho de Osasco, sala 3"></label>`:""}</div>`}
    <div class="grid2">
      <label class="f">Atribuída a<select id="t-atrib" ${pode("criar_tarefas")?"":"disabled"}>${opts(equipeAtiva().map(u=>[u.id, u.nome+(u.id===meuId()?" (você)":"")+" · "+P.PAPEIS[u.papel]]), t.atribuido_a)}</select></label>
      ${t.tipo==="Prazo"?`<label class="f">Prazo interno<input type="date" id="t-interno" value="${esc(t.interno||"")}"><span class="hint">${P.margem()} dia(s) útil(eis) antes do fatal; pode ajustar.</span></label>`:"<span></span>"}
      <label class="f span2">Observações<textarea id="t-obs" rows="2">${esc(t.obs||"")}</textarea></label></div>
  </form>
  <div class="sheet-f">${m.id && pode("criar_tarefas")?`<button class="btn danger" data-act="excluir" data-col="tarefas" data-id="${m.id}" style="margin-right:auto">Excluir</button>`:""}<button class="btn" data-act="fechar">Cancelar</button>${edita?`<button class="btn primary" data-act="salvar-tarefa">Salvar</button>`:""}</div>`;
}
function lerTarefaForm(){
  const t = modal.t, v = id => { const el = document.getElementById(id); return el ? (el.type==="checkbox" ? el.checked : el.value) : undefined; };
  [["t-proc","processo_id"],["t-titulo","titulo"],["t-inicio","inicio"],["t-dias","dias"],["t-contagem","contagem"],["t-djen","djen"],["t-susp","suspende"],["t-data","data"],["t-hora","hora"],["t-modal","modalidade"],["t-local","local"],["t-atrib","atribuido_a"],["t-obs","obs"],["t-interno","interno"]].forEach(([id,k])=>{ const x = v(id); if(x!==undefined) t[k] = x; });
  t.dias = Number(t.dias)||0; return t;
}
function atualizarCalc(origem){
  if(!modal || modal.kind!=="tarefa") return;
  const t = lerTarefaForm(), box = $("#calc-box"), area = procById(t.processo_id)?.area, chips = $("#chips-prazo");
  if(chips){ const lista = P.PRAZOS_COMUNS[area] || P.PRAZOS_COMUNS.civel;
    chips.innerHTML = `<span class="hint">Prazos comuns ${area?"em "+AREAS[area].nome:"(cível)"}:</span><div class="pickchips" style="margin-top:6px">${lista.map(([n,d])=>`<button type="button" data-act="pick-prazo" data-n="${esc(n)}" data-d="${d}">${esc(n)} · ${d}d</button>`).join("")}</div>`; }
  if(t.tipo!=="Prazo" || !box) return;
  const cont = (t.contagem && t.contagem!=="auto") ? t.contagem : (AREAS[area]?.contagem || "uteis");
  let fatal = t.data, notas = [], extra = "";
  if(t.modo!=="manual"){ const r = P.calcPrazo({inicio:t.inicio, dias:t.dias, contagem:cont, djen:t.djen, suspende:t.suspende});
    if(r){ fatal = r.fatal; notas = r.notas; t.data = r.fatal; extra = `<div><span class="small muted">Começa a contar</span><b>${fmt(r.inicioContagem)}</b></div>`; } else t.data = ""; }
  const ie = $("#t-interno");
  if(fatal && ie && origem!=="interno" && !t._intManual){ ie.value = P.prazoInterno(fatal); t.interno = ie.value; }
  box.innerHTML = fatal ? `<div class="res">${extra}<div class="fatal"><span class="small muted">Prazo fatal</span><b>${fmt(fatal)}</b></div><div class="int"><span class="small muted">Prazo interno</span><b>${fmt(ie?.value)}</b></div></div>
    <div class="small muted">${t.modo!=="manual"?`${t.dias} dia(s) ${cont==="uteis"?"úteis":"corridos"} (${area?AREAS[area].lei:"regra cível, sem processo vinculado"}). `:""}${notas.map(esc).join(" ")}</div>
    <div class="hint">Feriados nacionais já considerados. Feriados locais e do tribunal entram em Equipe e acessos › Ajustes.</div>` : `<span class="small muted">Informe a data e o número de dias.</span>`;
}
async function salvarTarefa(){
  const t = lerTarefaForm();
  if(t.tipo==="Prazo" && t.modo!=="manual") atualizarCalc();
  if(!t.data){ toast("Informe a data."); return; }
  const row = {tipo:t.tipo, titulo:t.titulo||t.tipo, processo_id:t.processo_id||null, data:t.data, interno:t.tipo==="Prazo"?(t.interno||null):null, hora:t.hora||null, local:t.local||null, modalidade:t.tipo==="Audiência"?(t.modalidade||null):null,
    atribuido_a:t.atribuido_a||meuId(), obs:t.obs||null, calculo:t.tipo==="Prazo"&&t.modo!=="manual"?{inicio:t.inicio, dias:t.dias, djen:!!t.djen, suspende:!!t.suspende, contagem:t.contagem||"auto"}:null};
  try{
    if(modal.id) await api.atualizar("tarefas", modal.id, row); else await api.inserir("tarefas", Object.assign({escritorio_id:S.escritorio.id, done:false}, row));
    fecharModal(); toast("Atividade salva"); agendarRecarga("tarefas");
  }catch(e){ toast(P.erroAmigavel(e)); }
}

function mProcesso(m){
  const p = m.p || (m.p = m.id ? Object.assign({}, procById(m.id)) : Object.assign({area:filtroArea!=="todas"&&AREAS[filtroArea]?filtroArea:"", fase:FASES[0], responsavel_id:meuId()}, m.pre||{}));
  return cab(m.id?"Editar processo":"Novo processo") + `<form class="sheet-b" id="form-proc" autocomplete="off"><div class="grid2">
    <label class="f span2">Número do processo (padrão CNJ)<input type="text" id="p-num" class="mono" inputmode="numeric" value="${esc(p.numero||"")}" placeholder="0000000-00.0000.0.00.0000"><span class="hint" id="cnj-info">20 dígitos. O app confere o dígito verificador.</span></label>
    <label class="f">Área<select id="p-area"><option value="">Selecione</option>${opts(Object.entries(AREAS).map(([k,v])=>[k,v.nome]), p.area)}</select></label>
    <label class="f">Fase<select id="p-fase">${opts(FASES, p.fase)}</select></label>
    <label class="f">Cliente<select id="p-cli"><option value="">Selecione</option>${opts(S.clientes.slice().sort((a,b)=>a.nome.localeCompare(b.nome)).map(c=>[c.id,c.nome]), p.cliente_id)}${pode("gerenciar_clientes")?`<option value="__novo">+ Cadastrar novo cliente</option>`:""}</select></label>
    <label class="f" id="novo-cli-wrap" hidden>Nome do novo cliente<input type="text" id="p-cli-novo"></label>
    <label class="f">Polo do cliente<select id="p-polo">${opts(["Autor / reclamante","Réu / reclamada","Acusado","Vítima / assistente de acusação","Interessado"], p.polo)}</select></label>
    <label class="f">Parte contrária<input type="text" id="p-contra" value="${esc(p.parte_contraria||"")}"></label>
    <label class="f">Vara / tribunal<input type="text" id="p-vara" value="${esc(p.vara||"")}" placeholder="Ex.: 3ª Vara Cível de Taboão da Serra"></label>
    <label class="f">Responsável<select id="p-resp">${opts(equipeAtiva().map(u=>[u.id,u.nome]), p.responsavel_id)}</select></label>
    <label class="f">Valor da causa<input type="text" id="p-valor" value="${esc(p.valor||"")}" placeholder="R$"></label>
    <label class="f span2">Situação interna (só a equipe vê)<textarea id="p-resumo" rows="3" placeholder="Estratégia, combinações com o cliente, riscos">${esc(p.resumo||"")}</textarea></label>
    <label class="f span2">Resumo para o cliente (aparece no portal e nas atualizações)<textarea id="p-resumo-cli" rows="2" placeholder="Ex.: Aguardamos a sentença. Avisaremos assim que sair.">${esc(p.resumo_cliente||"")}</textarea></label>
  </div></form>
  <div class="sheet-f">${m.id && pode("excluir_registros")?`<button class="btn danger" data-act="excluir" data-col="processos" data-id="${m.id}" style="margin-right:auto">Excluir</button>`:""}<button class="btn" data-act="fechar">Cancelar</button><button class="btn primary" data-act="salvar-processo">Salvar</button></div>`;
}
function atualizarCNJ(){
  const el = $("#p-num"), info = $("#cnj-info"); if(!el||!info) return;
  const i = P.cnjInfo(el.value);
  if(!i.completo){ info.innerHTML = `${i.digitos}/20 dígitos. O app confere o dígito verificador.`; return; }
  info.innerHTML = i.valido ? `<span class="chip ok">Dígito verificador confere</span> ${esc(i.segmento)} · ajuizado em ${esc(i.ano)}` : `<span class="chip danger">Dígito verificador não confere</span> confira o número`;
  const ar = $("#p-area"); if(ar && !ar.value && i.J==="5") ar.value = "trabalhista";
}
async function salvarProcesso(){
  const v = id => document.getElementById(id)?.value?.trim() ?? "";
  const row = {numero:v("p-num"), area:v("p-area"), fase:v("p-fase"), polo:v("p-polo"), parte_contraria:v("p-contra"), vara:v("p-vara"), responsavel_id:v("p-resp")||null, valor:v("p-valor"), resumo:v("p-resumo"), resumo_cliente:v("p-resumo-cli")};
  if(!row.area){ toast("Escolha a área do processo."); return; }
  let cli = v("p-cli");
  try{
    if(cli==="__novo"){ const nome = v("p-cli-novo"); if(!nome){ toast("Informe o nome do novo cliente."); return; } const c = await api.inserir("clientes",{escritorio_id:S.escritorio.id, nome, tipo:"PF"}); cli = c.id; await recarregar("clientes", true); }
    row.cliente_id = cli || null;
    let id = modal.id;
    if(id) await api.atualizar("processos", id, row); else { const r = await api.inserir("processos", Object.assign({escritorio_id:S.escritorio.id}, row)); id = r.id; }
    await recarregar("processos", true); toast("Processo salvo");
    if(modal.leitor){ const lt = modal.leitor; abrirModal({kind:"leitor", r:lt.r, nome:lt.nome, ia:lt.ia, processo_id:id}); return; }
    abrirModal({kind:"detalhe", id, vivo:true, aba:"resumo"});
  }catch(e){ toast(P.erroAmigavel(e)); }
}

function mDetalhe(m){
  const p = procById(m.id); if(!p) return cab("Processo indisponível") + `<div class="sheet-b"><p class="muted">Este processo foi excluído ou você não tem mais acesso a ele.</p></div>`;
  const aba = m.aba || "resumo";
  const ts = S.tarefas.filter(t=>t.processo_id===p.id).sort((a,b)=>(a.done-b.done)||(a.data||"").localeCompare(b.data||""));
  const and = andamentosDe(p.id), docs = docsDe(p.id), coms = S.comunicacoes.filter(c=>c.processo_id===p.id).sort((a,b)=>(b.enviado_em||"").localeCompare(a.enviado_em||""));
  const podeReg = pode("editar_processos") || pode("registrar_andamentos");
  const info = P.cnjInfo(p.numero);
  const abas = [["resumo","Resumo"],["prazos","Prazos "+ts.filter(t=>!t.done).length],["andamentos","Andamentos "+and.length],["documentos","Documentos "+docs.length]].concat(pode("enviar_cliente")?[["envios","Mensagens "+coms.length]]:[]);
  let corpo = "";
  if(aba==="resumo") corpo = `<dl class="kv"><div><dt>Cliente</dt><dd>${esc(nomeCliente(p))}${p.polo?`<div class="small muted">${esc(p.polo)}</div>`:""}</dd></div><div><dt>Parte contrária</dt><dd>${esc(p.parte_contraria||"—")}</dd></div><div><dt>Vara / tribunal</dt><dd>${esc(p.vara||"—")}</dd></div>
      <div><dt>Responsável</dt><dd>${esc(nomePerfil(p.responsavel_id)||"—")}</dd></div><div><dt>Valor da causa</dt><dd>${esc(p.valor||"—")}</dd></div><div><dt>Atualizado</dt><dd>${p.atualizado_em?new Date(p.atualizado_em).toLocaleDateString("pt-BR"):"—"}</dd></div></dl>
    <div class="notice"><b>Situação interna:</b> ${esc(p.resumo||"Sem anotação.")}</div>
    <div class="notice"><b>O cliente vê:</b> ${esc(p.resumo_cliente||"Nenhum resumo para o cliente. Edite o processo para escrever um.")}</div>`;
  if(aba==="prazos") corpo = `<div class="row" style="justify-content:flex-end">${pode("criar_tarefas")?`<button class="btn" data-act="nova-tarefa" data-tipo="Audiência" data-proc="${p.id}">${ICON.plus}Audiência</button><button class="btn" data-act="nova-tarefa" data-tipo="Peça" data-proc="${p.id}">${ICON.plus}Tarefa</button>`:""}<button class="btn primary" data-act="nova-tarefa" data-tipo="${pode("criar_tarefas")?"Prazo":"Peça"}" data-proc="${p.id}">${ICON.plus}${pode("criar_tarefas")?"Prazo":"Atividade"}</button></div>
    <div class="panel"><div class="pauta">${ts.length?ts.map(itemTarefa).join(""):`<div class="empty small">Nenhum compromisso neste processo.</div>`}</div></div>`;
  if(aba==="andamentos") corpo = `${podeReg?`<div class="calc dj-box">${blocoDataJud(p)}</div>`:""}${podeReg?`<div class="calc"><div class="row" style="flex-wrap:nowrap"><input type="date" id="and-data" value="${hoje()}" style="width:auto"><input type="text" id="and-txt" placeholder="Ex.: Juntada de contestação"><button class="btn primary" data-act="add-andamento" data-id="${p.id}">Incluir</button></div>
      <label class="check"><input type="checkbox" id="and-vis" checked> Visível para o cliente no portal</label></div>`:""}
    ${and.length?`<div class="timeline">${and.map(a=>`<div class="ev"><div class="row" style="justify-content:space-between"><span class="small muted mono">${fmt(a.data)}</span>${a.visivel_cliente?`<span class="chip ok">Cliente vê</span>`:`<span class="chip neutral">Interno</span>`}</div><div>${esc(a.texto)}</div>${pode("editar_processos")?`<div class="row" style="margin-top:4px"><button class="linkbtn small" data-act="and-vis" data-id="${a.id}">${a.visivel_cliente?"Ocultar do cliente":"Mostrar ao cliente"}</button><button class="linkbtn small" style="color:var(--danger)" data-act="del-and" data-id="${a.id}">Excluir</button></div>`:""}</div>`).join("")}</div>`:`<span class="small muted">Nenhum andamento registrado.</span>`}`;
  if(aba==="documentos") corpo = `${podeReg?`<div class="calc"><div class="row" style="flex-wrap:nowrap"><input type="text" id="doc-nome" placeholder="Ex.: Procuração, CTPS, contrato"><button class="btn primary" data-act="add-doc" data-id="${p.id}">Incluir</button></div><label class="check"><input type="checkbox" id="doc-vis" checked> Visível para o cliente (ele vê que o documento é necessário)</label></div>`:""}
    <div class="doclist">${docs.length?docs.map(d=>`<div class="doc"><div style="min-width:0"><div>${esc(d.nome)}${d.status==="Enviado pelo cliente"?` <span class="chip warn">novo</span>`:""}</div><div class="small muted">${fmt(d.data)} · ${d.visivel_cliente?"cliente vê":"interno"}${d.arquivo?` · <button class="linkbtn small" data-act="ver-arquivo" data-c="${esc(d.arquivo)}">Ver arquivo</button>`:""}</div></div><select data-act="doc-status" data-id="${d.id}" ${podeReg?"":"disabled"} aria-label="Situação">${opts(DOC_STATUS,d.status)}</select>${podeReg?`<button class="linkbtn small" data-act="doc-vis" data-id="${d.id}">${d.visivel_cliente?"Ocultar":"Mostrar"}</button>`:"<span></span>"}${pode("editar_processos")?`<button class="icon-btn" data-act="del-doc" data-id="${d.id}" aria-label="Remover">${ICON.x}</button>`:"<span></span>"}</div>`).join(""):`<span class="small muted">Nenhum documento listado.</span>`}</div>`;
  if(aba==="envios") corpo = coms.length?`<div class="timeline">${coms.map(c=>`<div class="ev"><div class="small muted">${new Date(c.enviado_em||c.criado_em).toLocaleString("pt-BR")} · ${esc(nomePerfil(c.enviado_por||c.criado_por))}</div><div class="pre" style="max-height:140px;margin-top:4px">${esc(c.texto||"")}</div></div>`).join("")}</div>`:`<span class="small muted">Nenhuma mensagem preparada para este processo.</span>`;
  return cab(`<span class="mono" style="font-size:1.05rem">${esc(p.numero||"Processo sem número")}</span>`, `${chipArea(p.area)} <span class="chip neutral">${esc(p.fase||"")}</span> ${info.completo?esc(info.segmento):""}`) + `<div class="sheet-b">
    <div class="row">${pode("enviar_cliente")?`<button class="btn primary" data-act="comunicar" data-id="${p.id}">${ICON.send}Mensagem ao cliente</button>`:""}${podeReg?`<button class="btn" data-act="ler-pdf" data-proc="${p.id}">${ICON.scan}Ler PDF</button>`:""}${pode("gerar_relatorios")?`<button class="btn" data-act="pdf-processo" data-id="${p.id}">${ICON.pdf}PDF</button>`:""}${pode("editar_processos")?`<button class="btn ghost" data-act="editar-processo" data-id="${p.id}">Editar</button>`:""}</div>
    <div class="tabs" role="tablist"><span class="ind"></span>${abas.map(([k,l])=>`<button role="tab" aria-selected="${aba===k}" data-act="aba" data-a="${k}">${l}</button>`).join("")}</div>
    ${corpo}</div>`;
}

/* ---------- PDFs ---------- */
function exigePdf(){ if(!P.pdfDisponivel()){ toast("Gerador de PDF não carregou. Verifique a internet."); return false; } return true; }
function pdfProcesso(pid, versaoCliente){
  if(!exigePdf()) return; const p = procById(pid); if(!p) return;
  const ctx = P.pdfNovo(versaoCliente?"Resumo do processo":"Relatório do processo", (p.numero||"")+" · "+(AREAS[p.area]?.nome||""));
  P.pdfCampos(ctx, [["Cliente",nomeCliente(p)],["Parte contrária",p.parte_contraria],["Vara / tribunal",p.vara],["Fase",p.fase],["Polo do cliente",p.polo],["Valor da causa",p.valor]].concat(versaoCliente?[]:[["Responsável",nomePerfil(p.responsavel_id)]]));
  if(p.resumo_cliente){ P.pdfTitulo(ctx,"Situação atual"); P.pdfTexto(ctx, p.resumo_cliente); }
  if(!versaoCliente && p.resumo){ P.pdfTitulo(ctx,"Anotações internas"); P.pdfTexto(ctx, p.resumo); }
  const ts = S.tarefas.filter(t=>t.processo_id===p.id && !t.done && t.data>=hoje() && (!versaoCliente || t.tipo==="Audiência")).sort((a,b)=>a.data.localeCompare(b.data));
  if(ts.length){ P.pdfTitulo(ctx, versaoCliente?"Próximas audiências":"Próximos compromissos"); P.pdfTabela(ctx, ["Data","Tipo","Descrição","Detalhes"], ts.map(t=>[fmt(t.data)+(t.hora?" "+t.hora:""), t.tipo, t.titulo||"", [t.modalidade,t.local].filter(Boolean).join(" · ")+(versaoCliente||!t.interno?"":" Interno: "+fmt(t.interno))])); }
  const and = andamentosDe(p.id).filter(a=>!versaoCliente || a.visivel_cliente);
  if(and.length){ P.pdfTitulo(ctx,"Movimentações"); P.pdfTabela(ctx, ["Data","Andamento"], and.map(a=>[fmt(a.data), a.texto]), {colunas:{0:{cellWidth:70}}}); }
  const docs = docsDe(p.id).filter(d=>!versaoCliente || d.visivel_cliente);
  if(docs.length){ P.pdfTitulo(ctx,"Documentos"); P.pdfTabela(ctx, ["Documento","Situação","Data"], docs.map(d=>[d.nome, d.status, fmt(d.data)])); }
  P.pdfSalvar(ctx, `${versaoCliente?"Resumo":"Relatorio"} ${P.soDigitos(p.numero)||"processo"}.pdf`);
}
function pdfPortal(pid){
  if(!exigePdf()) return; const p = (S.portal.processos||[]).find(x=>x.id===pid); if(!p) return;
  const ctx = P.pdfNovo("Resumo do processo", (p.numero||"")+" · "+(AREAS[p.area]?.nome||""));
  P.pdfCampos(ctx, [["Cliente",S.portal.cliente],["Parte contrária",p.parte_contraria],["Vara / tribunal",p.vara],["Fase",p.fase]]);
  if(p.resumo){ P.pdfTitulo(ctx,"Situação atual"); P.pdfTexto(ctx, p.resumo); }
  if((p.audiencias||[]).length){ P.pdfTitulo(ctx,"Próximas audiências"); P.pdfTabela(ctx, ["Data","Audiência","Local"], p.audiencias.map(a=>[fmt(a.data)+(a.hora?" "+a.hora:""), a.titulo||"", [a.modalidade,a.local].filter(Boolean).join(" · ")])); }
  if((p.andamentos||[]).length){ P.pdfTitulo(ctx,"Movimentações"); P.pdfTabela(ctx, ["Data","Andamento"], p.andamentos.map(a=>[fmt(a.data), a.texto]), {colunas:{0:{cellWidth:70}}}); }
  P.pdfSalvar(ctx, `Resumo ${P.soDigitos(p.numero)||"processo"}.pdf`);
}
function pdfPauta(o){
  if(!exigePdf()) return; o = o || {};
  const dias = Number(o.dias ?? $("#r-per")?.value ?? 15), resp = o.resp ?? $("#r-resp")?.value ?? "", venc = o.venc ?? $("#r-venc")?.checked ?? true, h = hoje(), ate = iso(addDays(new Date(), dias));
  let ts = S.tarefas.filter(t=>!t.done && t.data && (resp? t.atribuido_a===resp : true));
  const vencidos = ts.filter(t=>t.data<h), periodo = ts.filter(t=>t.data>=h && t.data<=ate).sort((a,b)=>(a.data+(a.hora||"")).localeCompare(b.data+(b.hora||"")));
  const ctx = P.pdfNovo("Pauta do escritório", `${fmt(h)} a ${fmt(ate)}${resp?" · "+nomePerfil(resp):" · toda a equipe"}`);
  const linha = t => { const p = procById(t.processo_id); return [fmt(t.data)+(t.hora?" "+t.hora:""), t.tipo, t.titulo||"", p?(p.numero||"")+"\n"+nomeCliente(p):"-", P.primeiroNome(nomePerfil(t.atribuido_a)), t.interno?fmt(t.interno):"-"]; };
  if(venc && vencidos.length){ P.pdfTitulo(ctx, `Vencidos (${vencidos.length})`); P.pdfTabela(ctx, ["Prazo fatal","Tipo","Descrição","Processo / cliente","Resp.","Interno"], vencidos.map(linha)); }
  P.pdfTitulo(ctx, `Próximos ${dias} dias (${periodo.length})`);
  if(periodo.length) P.pdfTabela(ctx, ["Data","Tipo","Descrição","Processo / cliente","Resp.","Interno"], periodo.map(linha)); else P.pdfTexto(ctx, "Nenhum compromisso no período.");
  P.pdfSalvar(ctx, `Pauta ${h}.pdf`);
}
function pdfCarteira(o){
  if(!exigePdf()) return; o = o || {};
  const area = o.area ?? $("#r-area")?.value ?? "";
  const ps = S.processos.filter(p=>!area || p.area===area).sort((a,b)=>(a.area+a.fase).localeCompare(b.area+b.fase));
  const ctx = P.pdfNovo("Carteira de processos", (area?AREAS[area].nome:"Todas as áreas")+` · ${ps.length} processo(s)`);
  const porFase = {}; ps.forEach(p=>porFase[p.fase||"—"]=(porFase[p.fase||"—"]||0)+1);
  P.pdfCampos(ctx, Object.entries(porFase).map(([k,v])=>[k, String(v)+" processo(s)"]));
  P.pdfTabela(ctx, ["Processo","Área","Cliente","Parte contrária","Fase","Próximo","Resp."], ps.map(p=>{ const nx = proximo(p.id); return [p.numero||"-", AREAS[p.area]?.nome||"", nomeCliente(p), p.parte_contraria||"-", p.fase||"-", nx?fmt(nx.data)+" "+(nx.titulo||""):"-", P.primeiroNome(nomePerfil(p.responsavel_id))]; }));
  P.pdfSalvar(ctx, `Carteira ${hoje()}.pdf`);
}
function pdfMinuta(){
  if(!exigePdf()) return;
  const ctx = P.pdfNovo("Quadro de respostas", M.titulo || M.arquivo || "Minuta");
  if(M.lado) P.pdfTexto(ctx, "Representamos: "+M.lado, {cor:[110,100,80]});
  P.pdfTabela(ctx, ["#","Cláusula","Comentário recebido","Decisão","Nossa resposta"], M.itens.map((i,n)=>[String(n+1), i.ref||"-", i.comentario, (POS[i.posicao]||["Em análise"])[0], i.resposta+(i.redacao?"\n\nRedação proposta: "+i.redacao:"")]), {colunas:{0:{cellWidth:22},1:{cellWidth:62},3:{cellWidth:64}}});
  P.pdfSalvar(ctx, `Respostas ${(M.titulo||"minuta").slice(0,40)}.pdf`);
}

/* ---------- eventos ---------- */
const armado = new Set();
function confirmar(el, chave, rotulo){ if(armado.has(chave)){ armado.delete(chave); return true; } armado.add(chave); el.classList.add("armed"); const orig = el.textContent; el.textContent = rotulo || "Confirmar"; setTimeout(()=>{ armado.delete(chave); if(el.isConnected){ el.classList.remove("armed"); el.textContent = orig; } }, 4000); return false; }
async function comErro(fn){ try{ return await fn(); }catch(err){ toast(P.erroAmigavel(err)); } }
function abrirAba(v){ view = v; busca = ""; fecharModal(); render(); window.scrollTo(0,0); }

document.addEventListener("click", async e => {
  const el = e.target.closest("[data-act]");
  if(!el){ if(e.target.id==="overlay") fecharModal(); return; }
  const a = el.dataset.act, id = el.dataset.id;
  if(el.tagName==="SELECT" || (el.tagName==="INPUT" && el.type!=="checkbox")) return;
  if(el.tagName==="A") return;
  if(/^(fin-|at-|dj-|agenda-)|^(calc-aba|calc-atual|calc-resc|ver-arquivo|pdf-carteira-direto|doc-financeiro)$/.test(a) && await acaoV3(a, el)) return;
  if(/^(pc-|doc-|radar-)|^copiar-txt-el$/.test(a) && await acaoPecas(a, el)) return;
  switch(a){
    /* tela inicial */
    case "entrar": await entrarNoApp(); break;
    case "demo-login": api.entrarComo(id); await identificar(); await entrarNoApp(); break;
    case "auth-tela": L.tela = el.dataset.t; L.erroForm = ""; L.msg = ""; mostrarInicio(); break;
    case "sair-conta": await sairDaConta(); break;
    case "ferramenta": L.ferramenta = el.dataset.f; L.pane = "ferramenta"; mostrarInicio(); window.scrollTo(0,0); break;
    case "ferramenta-fechar": L.ferramenta = ""; L.pane = "entrar"; mostrarInicio(); break;
    case "pane": L.pane = el.dataset.p; if(L.pane==="entrar") L.ferramenta = ""; mostrarInicio(); window.scrollTo(0,0); break;
    case "sair": voltarAoInicio(); break;
    case "chat-enviar": enviarChatLivre(); break;
    case "chat-sug": enviarChatLivre(el.dataset.q); break;
    case "chat-limpar": L.chat = []; mostrarInicio(); break;
    case "calc-area": L.calc.area = el.dataset.a; mostrarInicio(); break;
    case "calc-dias": L.calc.dias = Number(el.dataset.d); mostrarInicio(); break;
    case "doc-ia": {
      L.docOcupado = true; L.docErro = ""; mostrarInicio();
      try{ L.docIA = await P.iaInterpretar(L.doc.texto, L.docPergunta ? "O usuário quer saber: "+L.docPergunta : ""); }
      catch(err){ L.docErro = err.code==="indisponivel" ? "A IA funciona com a página aberta no Claude." : P.erroIA(err); }
      L.docOcupado = false; mostrarInicio(); break; }
    case "copiar-txt": P.copiar(el.dataset.t); break;
    case "daily-area": D.area = el.dataset.a; if(S.perfil && $("#main")) render(); else mostrarInicio(); break;
    /* aparência */
    case "aparencia": abrirModal({kind:"aparencia"}); break;
    case "tema": modal.t[el.dataset.k] = el.dataset.v; P.aplicarTema(modal.t); abrirModal(modal); break;
    case "tema-padrao": modal.t = Object.assign({}, P.TEMA_PADRAO, (S.escritorio?.config||{}).tema||{}); P.aplicarTema(modal.t); abrirModal(modal); break;
    case "tema-salvar": P.salvarTemaLocal(modal.t); api.salvarPrefs({tema:modal.t}); fecharModal(); toast("Aparência salva"); break;
    case "tema-escritorio": await comErro(async()=>{ const cfg = Object.assign({}, P.cfg(), {tema:modal.t}); S.escritorio = await api.atualizarEscritorio("escritorio", {nome:S.escritorio?.nome||"", config:cfg}); P.escritorio = S.escritorio; P.salvarTemaLocal(modal.t); fecharModal(); toast("Aparência definida como padrão do escritório"); }); break;
    /* navegação */
    case "nav": abrirAba(el.dataset.v); break;
    case "mais": abrirModal({kind:"mais"}); break;
    case "perfil": abrirModal({kind:"perfil"}); break;
    case "area": filtroArea = el.dataset.a; render(); break;
    case "ir-area": filtroArea = el.dataset.a; abrirAba("processos"); break;
    case "escopo": escopoAgenda = el.dataset.e; render(); break;
    case "rolar": $("#g-pauta")?.scrollIntoView({behavior:"smooth"}); break;
    case "toggle-feitas": verConcluidas = !verConcluidas; render(); break;
    case "aba": modal.aba = el.dataset.a; abrirModal(modal); break;
    case "fechar": fecharModal(); break;
    /* atividades */
    case "tick": { if(!S.tarefas.find(x=>x.id===id)) return; try{ await api.atualizar("tarefas", id, {done:el.checked, concluido_em: el.checked ? new Date().toISOString() : null}); if(el.checked) toast("Concluído"); agendarRecarga("tarefas"); }catch(err){ el.checked = !el.checked; toast(P.erroAmigavel(err)); } break; }
    case "nova-tarefa": abrirModal({kind:"tarefa", tipo:el.dataset.tipo, processo_id:el.dataset.proc||(modal&&modal.kind==="detalhe"?modal.id:"")}); break;
    case "editar-tarefa": abrirModal({kind:"tarefa", id}); break;
    case "tipo-tarefa": lerTarefaForm(); modal.t.tipo = el.dataset.t; $("#sheet").innerHTML = mTarefa(modal); atualizarCalc(); break;
    case "modo-prazo": lerTarefaForm(); modal.t.modo = el.dataset.m; $("#sheet").innerHTML = mTarefa(modal); atualizarCalc(); break;
    case "pick-prazo": { const ti = $("#t-titulo"), di = $("#t-dias"); if(ti) ti.value = el.dataset.n; if(di) di.value = el.dataset.d; modal.t._intManual = false; atualizarCalc(); break; }
    case "salvar-tarefa": salvarTarefa(); break;
    /* processos */
    case "novo-processo": abrirModal({kind:"processo"}); break;
    case "editar-processo": abrirModal({kind:"processo", id}); break;
    case "abrir-processo": e.stopPropagation(); abrirModal({kind:"detalhe", id, vivo:true}); break;
    case "salvar-processo": salvarProcesso(); break;
    case "add-andamento": { const txt = $("#and-txt").value.trim(); if(!txt) return; await comErro(async()=>{ await api.inserir("andamentos", {processo_id:id, data:$("#and-data").value||hoje(), texto:txt, visivel_cliente:$("#and-vis").checked}); agendarRecarga("andamentos"); toast("Andamento registrado"); }); break; }
    case "and-vis": { const x = S.andamentos.find(y=>y.id===id); await comErro(async()=>{ await api.atualizar("andamentos", id, {visivel_cliente:!x.visivel_cliente}); agendarRecarga("andamentos"); }); break; }
    case "del-and": await comErro(async()=>{ await api.excluir("andamentos", id); agendarRecarga("andamentos"); }); break;
    case "add-doc": { const nome = $("#doc-nome").value.trim(); if(!nome) return; await comErro(async()=>{ await api.inserir("documentos", {processo_id:id, nome, status:"Aguardando cliente", data:hoje(), visivel_cliente:$("#doc-vis").checked}); agendarRecarga("documentos"); }); break; }
    case "doc-vis": { const x = S.documentos.find(y=>y.id===id); await comErro(async()=>{ await api.atualizar("documentos", id, {visivel_cliente:!x.visivel_cliente}); agendarRecarga("documentos"); }); break; }
    case "del-doc": await comErro(async()=>{ await api.excluir("documentos", id); agendarRecarga("documentos"); }); break;
    case "excluir": { if(!confirmar(el, el.dataset.col+id, "Confirmar exclusão")) return;
      await comErro(async()=>{ await api.excluir(el.dataset.col, id); fecharModal(); toast("Excluído"); P.TABELAS.forEach(t=>agendarRecarga(t)); }); break; }
    /* clientes e portal */
    case "novo-cliente": abrirModal({kind:"cliente"}); break;
    case "editar-cliente": abrirModal({kind:"cliente", id}); break;
    case "salvar-cliente": { const v = i => document.getElementById(i)?.value?.trim() ?? ""; const row = {nome:v("c-nome"), tipo:v("c-tipo"), doc:v("c-doc"), telefone:v("c-tel"), email:v("c-email"), obs:v("c-obs"), dados:Object.assign({}, (modal.c||{}).dados||{}, {nacionalidade:v("c-nac"), estado_civil:v("c-ec"), profissao:v("c-prof"), rg:v("c-rg"), endereco:v("c-end"), representante:v("c-rep")})}; if(!row.nome){ toast("Informe o nome."); return; }
      await comErro(async()=>{ if(modal.id) await api.atualizar("clientes", modal.id, row); else await api.inserir("clientes", row); fecharModal(); toast("Cliente salvo"); agendarRecarga("clientes"); }); break; }
    case "vincular": { const c = modal.c, pid = el.dataset.pid; const outro = (RAW.clientes||[]).find(x=>x.conta_id===pid && x.id!==c.id); if(outro){ toast(`Esta conta já está vinculada a ${outro.nome}.`); return; }
      await comErro(async()=>{ await api.atualizar("clientes", c.id, {conta_id:pid, conta_nome:el.dataset.nome, conta_email:el.dataset.email}); agendarRecarga("clientes"); toast("Conta vinculada. O portal do cliente foi publicado."); fecharModal(); }); break; }
    case "desvincular": { if(!confirmar(el, "desv"+id, "Confirmar")) return; const c = cliById(id); await comErro(async()=>{ if(c.conta_id) await api.removerPortal(c.conta_id); await api.atualizar("clientes", id, {conta_id:null, conta_nome:null, conta_email:null}); agendarRecarga("clientes"); fecharModal(); toast("Conta desvinculada"); }); break; }
    case "sync-cliente": sincronizarCliente(id); toast("Portal atualizado"); break;
    case "sync-portais": sincronizarTodos(); toast("Portais atualizados"); break;
    /* equipe */
    case "novo-convite": abrirModal({kind:"convite"}); break;
    case "convite-cliente": { const c = cliById(id); abrirModal({kind:"convite", pre:{nome:c.nome, email:c.email||"", papel:"cliente", cliente_id:id, dias:0, permissoes:Object.assign({}, P.PADRAO.cliente)}}); break; }
    case "convite-padrao": lerConviteForm(); modal.c.permissoes = Object.assign({}, P.PADRAO[modal.c.papel]); abrirModal(modal); break;
    case "salvar-convite": { const c = lerConviteForm(); if(!c.nome){ toast("Informe o nome da pessoa."); return; } if(c.papel==="cliente" && !c.cliente_id){ toast("Escolha o cliente."); return; }
      el.disabled = true;
      await comErro(async()=>{ const r = await api.inserir("convites", {nome:c.nome, email:c.email||null, papel:c.papel, permissoes:c.papel==="gestor"?P.PADRAO.gestor:c.permissoes, cliente_id:c.papel==="cliente"?c.cliente_id:null, expira_em:c.dias>0 ? P.addDays(new Date(), c.dias).toISOString() : null});
        c.token = r.token; c.expira_em = r.expira_em; c.link = linkConvite(r); abrirModal(modal); agendarRecarga("convites"); });
      el.disabled = false; break; }
    case "copiar-convite": { const c = S.convites.find(x=>x.id===id); P.copiar(linkConvite(c)); break; }
    case "copiar-msg-convite": P.copiar($("#cv-msg").value); break;
    case "excluir-convite": { if(!confirmar(el, "cv"+id, "Confirmar")) return; await comErro(async()=>{ await api.excluir("convites", id); agendarRecarga("convites"); }); break; }
    case "salvar-senha": { const sn = $("#me-s")?.value||""; if(!sn){ fecharModal(); return; } if(sn.length<6){ toast("A senha precisa ter 6 caracteres."); return; } await comErro(async()=>{ await api.trocarSenha(sn); fecharModal(); toast("Senha atualizada"); }); break; }
    case "salvar-nova-senha": { const sn = $("#ns").value; if(sn.length<6){ toast("A senha precisa ter 6 caracteres."); return; } await comErro(async()=>{ await api.trocarSenha(sn); fecharModal(); toast("Senha atualizada"); }); break; }
    case "aprovar-pedido": { const p = S.pedidos.find(x=>x.id===id); abrirModal({kind:"usuario", novo:p}); break; }
    case "recusar-pedido": { if(!confirmar(el, "rec"+id, "Confirmar")) return; await comErro(async()=>{ await api.recusarPedido(id); S.pedidos = await api.pedidos(); render(); }); break; }
    case "adicionar-pessoa": abrirModal({kind:"adicionar"}); setTimeout(()=>buscarPessoas(""), 0); break;
    case "escolher-pessoa": { const pid = el.dataset.pid; if(S.perfis.some(u=>u.id===pid)){ toast("Essa pessoa já está na equipe."); return; } abrirModal({kind:"usuario", novo:{id:pid, nome:el.dataset.nome, email:el.dataset.email, papel:"advogado"}}); break; }
    case "editar-usuario": e.stopPropagation(); abrirModal({kind:"usuario", id}); break;
    case "perm-padrao": lerUsuarioForm(); modal.u.permissoes = Object.assign({}, P.PADRAO[modal.u.papel]); abrirModal(modal); break;
    case "salvar-usuario": { const u = lerUsuarioForm(); const cl = $("#u-cli"); if(cl) u.cliente_id = cl.value || null; const perfil = {papel:u.papel, status:u.status, permissoes:u.papel==="gestor"?P.PADRAO.gestor:u.permissoes}; if(u.papel==="cliente") perfil.cliente_id = u.cliente_id;
      await comErro(async()=>{ if(modal.novo){ await api.aprovarPedido(u.id, perfil); S.pedidos = await api.pedidos(); toast("Acesso liberado"); } else { await api.atualizar("perfis", u.id, perfil); toast("Acesso atualizado"); } fecharModal(); agendarRecarga("perfis"); }); break; }
    case "excluir-usuario": { if(!confirmar(el, "u"+id, "Confirmar remoção")) return; await comErro(async()=>{ await api.excluir("perfis", id); fecharModal(); toast("Pessoa removida da equipe"); agendarRecarga("perfis"); }); break; }
    /* mensagem ao cliente */
    case "comunicar": abrirModal({kind:"comunicar", id}); break;
    case "comunicar-sel": { const pid = $("#r-proc-cli").value; if(pid) abrirModal({kind:"comunicar", id:pid}); break; }
    case "copiar-com": { const tx = $("#com-texto").value; P.copiar(tx); const p = procById(modal.id); comErro(async()=>{ await api.inserir("comunicacoes", {processo_id:p.id, cliente_id:p.cliente_id, canal:"Mensagem copiada", texto:tx, enviado_em:new Date().toISOString(), enviado_por:meuId()}); agendarRecarga("comunicacoes"); }); break; }
    case "com-ia": { modal.texto = $("#com-texto").value; modal.ocupado = true; modal.erro = ""; abrirModal(modal);
      try{ modal.texto = await P.iaParaCliente(modal.texto, t=>{ const ta = $("#com-texto"); if(ta) ta.value = t; }); }catch(err){ modal.erro = err.code==="indisponivel" ? "A IA funciona com a página aberta no Claude." : P.erroIA(err); }
      modal.ocupado = false; abrirModal(modal); break; }
    case "ver-com": abrirModal({kind:"com", id}); break;
    /* PDFs */
    case "pdf-processo": pdfProcesso(id, el.dataset.cliente==="1"); break;
    case "pdf-processo-sel": pdfProcesso($("#r-proc").value, $("#r-cli").checked); break;
    case "pdf-pauta": pdfPauta(); break;
    case "pdf-carteira": pdfCarteira(); break;
    case "ch-ok": executarAcao(el.dataset.k, "ok"); break;
    case "ch-form": executarAcao(el.dataset.k, "form"); break;
    case "ch-cancel": executarAcao(el.dataset.k, "cancel"); break;
    case "pdf-portal": pdfPortal(id); break;
    case "pdf-minuta": salvarCamposMinuta(); pdfMinuta(); break;
    /* leitor */
    case "ler-pdf": { const inp = $("#f-leitor"); inp.dataset.proc = el.dataset.proc || ""; inp.click(); break; }
    case "leitor-prazo": { const x = modal.a.prazos[Number(el.dataset.i)], base = modal.a.disponibilizacao || modal.a.publicacao || hoje();
      abrirModal({kind:"tarefa", tipo:"Prazo", processo_id:leitorProc(), pre:{inicio:base, dias:x.dias, djen:!!modal.a.disponibilizacao, contagem:x.contagem||"auto", titulo:modal.a.tipo==="Sentença"?"Recurso contra a sentença":modal.a.tipo==="Citação"?"Contestação / defesa":"Manifestação"}}); break; }
    case "leitor-aud": { const x = modal.a.audiencias[Number(el.dataset.i)]; abrirModal({kind:"tarefa", tipo:"Audiência", processo_id:leitorProc(), pre:{data:x.data, hora:x.hora, modalidade:x.modalidade||"Presencial", titulo:"Audiência"}}); break; }
    case "leitor-and": { const pid = leitorProc(); if(!pid){ toast("Escolha o processo primeiro."); return; } const a2 = modal.a, ia = modal.ia; const txt = ia && ia.resumo ? `${ia.tipo||a2.tipo}: ${ia.resumo}` : `${a2.tipo}${a2.disponibilizacao?" disponibilizada em "+fmt(a2.disponibilizacao):""}: ${a2.resumo.slice(0,280)}${a2.resumo.length>280?"…":""}`;
      await comErro(async()=>{ await api.inserir("andamentos", {processo_id:pid, data:a2.disponibilizacao||hoje(), texto:txt, visivel_cliente:false}); agendarRecarga("andamentos"); toast("Andamento registrado como interno. Mude a visibilidade no processo se quiser."); }); break; }
    case "leitor-novo-proc": { const n = modal.a.numeros[0], info = P.cnjInfo(n); abrirModal({kind:"processo", pre:{numero:n, area: info.J==="5"?"trabalhista":"", fase:FASES[0]}, leitor:{r:modal.r, nome:modal.nome, ia:modal.ia}}); break; }
    case "leitor-minuta": { const r = modal.r; M.arquivo = modal.nome; M.texto = r.texto; M.titulo = modal.nome.replace(/\.\w+$/,""); M.itens = montarItensMinuta(r); fecharModal(); abrirAba("minutas"); break; }
    case "leitor-ia": { modal.ocupado = true; modal.erro = ""; abrirModal(modal); const p = procById(leitorProc());
      try{ modal.ia = await P.iaInterpretar(modal.r.texto, p ? `Processo ${p.numero}, área ${AREAS[p.area]?.nome}, cliente no polo: ${p.polo||"?"}.` : ""); }catch(err){ modal.erro = err.code==="indisponivel" ? "A IA funciona com a página aberta no Claude." : P.erroIA(err); }
      modal.ocupado = false; abrirModal(modal); break; }
    case "leitor-prazo-ia": { const x = modal.ia.prazos[Number(el.dataset.i)], base = x.data_base || modal.a.disponibilizacao || modal.a.publicacao || hoje();
      abrirModal({kind:"tarefa", tipo:"Prazo", processo_id:leitorProc(), pre:{inicio:base, dias:Number(x.dias)||15, djen:!!modal.a.disponibilizacao && !x.data_base, contagem:["uteis","corridos"].includes(x.contagem)?x.contagem:"auto", titulo:x.descricao||"Prazo"}}); break; }
    case "leitor-aud-ia": { const x = modal.ia.audiencias[Number(el.dataset.i)]; abrirModal({kind:"tarefa", tipo:"Audiência", processo_id:leitorProc(), pre:{data:x.data, hora:x.hora||"", modalidade:x.modalidade||"Presencial", titulo:x.descricao||"Audiência"}}); break; }
    /* minuta */
    case "pos": { salvarCamposMinuta(); const i = M.itens[Number(el.dataset.i)]; i.posicao = el.dataset.p; if(!i.resposta || i._auto){ i.resposta = sugerir(i); i._auto = true; } render(); break; }
    case "pos-todos": salvarCamposMinuta(); M.itens.forEach(i=>{ if(!i.posicao){ i.posicao = el.dataset.p; if(!i.resposta){ i.resposta = sugerir(i); i._auto = true; } } }); render(); break;
    case "usar-bib": { salvarCamposMinuta(); const i = M.itens[Number(el.dataset.i)]; i.resposta = sugerir(i); i._auto = true; render(); break; }
    case "usar-colado": { const partes = M.colar.split(/\n\s*\n|\n(?=\s*(?:\d+[.)-]|cl[aá]usula|•|-)\s)/i).map(s=>s.trim()).filter(Boolean); if(!partes.length){ toast("Cole as observações primeiro."); return; } M.itens = montarItensMinuta({comentarios:partes.map(t=>({texto:t, autor:"", trecho:""}))}); if(!M.titulo) M.titulo = "Observações coladas"; render(); break; }
    case "minuta-ia": { salvarCamposMinuta(); M.ia = true; M.erro = ""; render();
      try{ const r = await P.iaMinuta({itens:M.itens, texto:M.texto, lado:M.lado, quem:M.quem, tom:M.tom}); M.resumo = r.resumo || "";
        (r.itens||[]).forEach(x=>{ const i = M.itens[Number(x.i)]; if(!i) return; if(["aceitar","ajustar","manter"].includes(x.posicao)) i.posicao = x.posicao; i.resposta = x.resposta || i.resposta; i.redacao = x.redacao || ""; i.fundamento = x.fundamento || ""; i.risco = x.risco || ""; i._auto = false; i._ia = true; });
        toast("Análise da IA pronta. Revise antes de enviar."); }
      catch(err){ M.erro = err.code==="indisponivel" ? "A IA funciona com a página aberta no Claude." : P.erroIA(err); }
      M.ia = false; render(); break; }
    case "copiar-resposta": salvarCamposMinuta(); P.copiar(textoRespostaMinuta()); break;
    case "salvar-revisao": salvarCamposMinuta(); await comErro(async()=>{ await api.inserir("revisoes", {titulo:M.titulo||M.arquivo||"Revisão", dados:{arquivo:M.arquivo, lado:M.lado, destinatario:M.destinatario, resumo:M.resumo, itens:M.itens}}); toast("Revisão salva no histórico"); agendarRecarga("revisoes"); }); break;
    case "abrir-revisao": { const v = S.revisoes.find(x=>x.id===id); const dd = v.dados||{}; Object.assign(M, {titulo:v.titulo, arquivo:dd.arquivo||"", lado:dd.lado||"", destinatario:dd.destinatario||"", resumo:dd.resumo||"", itens:dd.itens||[], erro:""}); render(); window.scrollTo(0,0); break; }
    /* assistente do escritório */
    case "ch-enviar": enviarChatEscritorio(); break;
    case "ch-sug": enviarChatEscritorio(el.dataset.q); break;
    case "dga-enviar": enviarDGA(); break;
    case "dga-sug": enviarDGA(el.dataset.q); break;
    case "dga-limpar": DGA.msgs = []; refazer(); break;
    case "dga-cadastrar": abrirModal({kind:"processo", pre:{numero:el.dataset.n}}); break;
    case "dga-mais": { const q = el.dataset.q, pg = Number(el.dataset.p)||2; el.disabled = true; el.textContent = "Carregando…";
      try{ const r = await api.servico("jurisprudencia", {q, pagina:pg}); const msgEl = el.closest(".msg"); const idx = msgEl ? [...document.querySelectorAll(".dga-chat .msg")].indexOf(msgEl) : -1;
        const div = document.createElement("div"); div.innerHTML = htmlJuris(r||{}, q); el.replaceWith(div); if(idx>=0 && DGA.msgs[idx]) DGA.msgs[idx].html = msgEl.innerHTML; }
      catch(e){ el.disabled = false; el.textContent = "Tentar de novo"; toast(P.erroAmigavel(e)); } break; }
    case "ch-limpar": CH.msgs = []; render(); break;
    case "dg-area": DG.area = el.dataset.a; refazer(); break;
    case "dg-abrir": DG.aberto = DG.aberto===el.dataset.id ? "" : el.dataset.id; refazer(); break;
    case "juris": { const q = (el.dataset.q || $("#jp-termo")?.value || "").trim(); if(!q){ toast("Escreva o tema da pesquisa."); $("#jp-termo")?.focus(); break; } DG.juris = q; const o = P.ONDE_PESQUISAR.find(x=>x[0]===el.dataset.o); const extra = el.dataset.o==="tj" ? ($("#jp-uf")?.value||"SP") : el.dataset.o==="trt" ? ($("#jp-trt")?.value||"2") : ""; window.open(o[2](q, extra), "_blank", "noopener"); break; }
  }
});
function salvarCamposMinuta(){ document.querySelectorAll("[data-mi]").forEach(t=>{ const i = M.itens[Number(t.dataset.mi)]; if(i && i[t.dataset.k]!==t.value){ i[t.dataset.k] = t.value; if(t.dataset.k==="resposta") i._auto = false; } }); }
function lerUsuarioForm(){ const u = modal.u; u.papel = $("#u-papel").value; u.status = $("#u-status").value; const pm = Object.assign({}, u.permissoes||{}); document.querySelectorAll("[data-perm]").forEach(x=>pm[x.dataset.perm] = x.checked); u.permissoes = pm; return u; }

document.addEventListener("submit", async e => {
  e.preventDefault();
  const fid = e.target.id;
  if(fid==="f-atendimento"){
    const g = id => (document.getElementById(id)?.value || "").trim();
    const d = {c:L.atend.codigo, p_nome:g("at-nome"), p_telefone:g("at-tel"), p_email:g("at-email"), p_area:g("at-area"), p_relato:g("at-relato")};
    if(!d.p_telefone && !d.p_email){ L.erroForm = "Informe um celular ou e-mail para retorno."; mostrarInicio(); return; }
    L.enviando = true; L.erroForm = ""; mostrarInicio();
    try{ await api.rpc("novo_atendimento", d); L.atend.enviado = true; L.atend.nome = d.p_nome; }catch(err){ L.erroForm = P.erroAmigavel(err); }
    L.enviando = false; mostrarInicio(); return;
  }
  if(["f-login","f-criar","f-recuperar","f-convite"].includes(fid)){
    const fd = {}; e.target.querySelectorAll("input").forEach(x=>{ if(x.id) fd[x.id] = x.value; });
    const v = i => (fd[i] || "").trim();
    const senha = i => fd[i] || "";
    const repor = () => Object.entries(fd).forEach(([k,val])=>{ const x = document.getElementById(k); if(x && !x.readOnly) x.value = val; });
    L.enviando = true; L.erroForm = ""; L.msg = ""; mostrarInicio(); repor();
    try{
      if(fid==="f-login"){ L.emailDigitado = v("lg-email"); await api.entrar(v("lg-email"), senha("lg-senha")); }
      if(fid==="f-criar"){ const r = await api.criarEscritorio({escritorio:v("cr-esc"), nome:v("cr-nome"), email:v("cr-email"), senha:senha("cr-senha")}); if(r.confirmar){ L.enviando = false; L.tela = "entrar"; L.msg = "Escritório criado. Confirme o e-mail pelo link que enviamos e depois entre."; mostrarInicio(); return; } }
      if(fid==="f-convite"){ const r = await api.aceitarConvite({token:L.token, nome:v("cv-nome"), email:v("cv-email"), telefone:v("cv-tel"), senha:senha("cv-senha")}); if(r.confirmar){ L.enviando = false; L.tela = "entrar-convite"; L.msg = "Acesso criado. Confirme o e-mail pelo link que enviamos e depois entre."; mostrarInicio(); return; } }
      if(fid==="f-recuperar"){ await api.recuperar(v("rc-email")); L.enviando = false; L.msg = "Se o e-mail estiver cadastrado, o link chega em instantes."; mostrarInicio(); return; }
      L.enviando = false; await identificar(); if(S.perfil) await entrarNoApp();
    }catch(err){ L.enviando = false; L.erroForm = P.erroAmigavel(err); mostrarInicio(); repor(); }
    return;
  }
  if(e.target.id==="f-escritorio"){
    const dv = id => ($("#"+id)?.value||"").trim(), dAnt = P.cfg().docs || {};
    const docs = {nome:dv("d-nome"), cnpj:dv("d-cnpj"), oab:dv("d-oab"), cidade:dv("d-cidade"), endereco:dv("d-end"), telefone:dv("d-tel"), email:dv("d-email"), advogados:$("#d-advs")?.value||"", cor:dv("d-cor"), cor2:dv("d-cor2"), logo:LOGO_TMP ?? dAnt.logo ?? ""};
    const cfg = Object.assign({}, P.cfg(), {margem:Number($("#a-margem").value||2), feriadosLocais:$("#a-fer").value, docs});
    await comErro(async()=>{ S.escritorio = await api.atualizarEscritorio("escritorio", {nome:$("#a-nome").value.trim()||S.escritorio?.nome||"", config:cfg}); P.escritorio = S.escritorio; toast("Ajustes salvos"); render(); sincronizarTodos(); });
  }
});
document.addEventListener("input", e => {
  const el = e.target, b = el.dataset.bind;
  if(b){ if(b==="busca"){ busca = el.value; render(); return; } const [o,k] = b.split("."); ({M,L,CH,DG,DGA,PC,FIN,CALC})[o][k] = el.value; return; }
  if(el.id==="dg-busca"){ DG.termo = el.value; const l = $("#dg-lista"); if(l) l.innerHTML = listaTemas(); return; }
  if(el.dataset.calc && el.type!=="checkbox"){ L.calc[el.dataset.calc] = el.value; const pos = el.selectionStart; const idEl = el.id; mostrarInicio(); const n = document.getElementById(idEl); if(n && n.type!=="date"){ n.focus(); try{ n.setSelectionRange(pos,pos); }catch(_){} } return; }
  if(el.id==="cnj-in"){ L.cnj = P.mascaraCNJ(el.value); mostrarInicio(); const n = $("#cnj-in"); n.focus(); n.setSelectionRange(n.value.length, n.value.length); return; }
  if(el.id==="pessoa-q"){ buscarPessoas(el.value); return; }
  if(modal && modal.kind==="tarefa"){ if(el.id==="t-interno"){ modal.t._intManual = true; atualizarCalc("interno"); } else atualizarCalc(); }
  if(modal && modal.kind==="processo" && el.id==="p-num"){ el.value = P.mascaraCNJ(el.value); atualizarCNJ(); }
  if(modal && modal.kind==="comunicar" && el.id==="com-texto") modal.texto = el.value;
});
document.addEventListener("change", async e => {
  const el = e.target;
  if(el.dataset.file && el.dataset.file.startsWith("portal")){ await enviarPortal(el.dataset.file, el.files[0], el); el.value = ""; return; }
  if(el.dataset.file){ await receberArquivo(el.dataset.file, el.files[0], el.dataset.proc); el.value = ""; return; }
  if(el.dataset.act==="at-status"){ await comErro(async()=>{ await api.atualizar("atendimentos", el.dataset.id, {status:el.value}); await recarregar("atendimentos", true); render(); }); return; }
  if(el.dataset.bind && el.dataset.re && el.tagName==="INPUT"){ const [o,k] = el.dataset.bind.split("."); ({M,L,CH,DG,DGA,PC,FIN,CALC})[o][k] = el.value; pcMudou(el.dataset.re); return; }
  if(el.dataset.calc){ L.calc[el.dataset.calc] = el.type==="checkbox" ? el.checked : el.value; mostrarInicio(); return; }
  if(el.dataset.bind && el.tagName==="SELECT"){ const [o,k] = el.dataset.bind.split("."); ({M,L,CH,DG,DGA,PC,FIN,CALC})[o][k] = el.value; if(el.dataset.re) pcMudou(el.dataset.re); return; }
  if(el.id==="a-logo" && el.files[0]){ const f = el.files[0]; const img = new Image(); img.onload = ()=>{ const r = Math.min(1, 420/img.width, 140/img.height); const c = document.createElement("canvas"); c.width = Math.round(img.width*r); c.height = Math.round(img.height*r); c.getContext("2d").drawImage(img,0,0,c.width,c.height); LOGO_TMP = c.toDataURL("image/png"); const pv = $("#a-logo-prev"); if(pv){ pv.src = LOGO_TMP; pv.hidden = false; } URL.revokeObjectURL(img.src); }; img.src = URL.createObjectURL(f); return; }
  if(el.id==="daily-dia"){ D.dia = el.value; render(); return; }
  if(el.id==="l-papel"){ L.papelPedido = el.value; return; }
  if(el.dataset.act==="doc-status"){ await comErro(async()=>{ await api.atualizar("documentos", el.dataset.id, {status:el.value}); agendarRecarga("documentos"); }); return; }
  if(el.id==="p-cli"){ const w = $("#novo-cli-wrap"); if(w) w.hidden = el.value!=="__novo"; return; }
  if(el.id==="cv-p" && modal && modal.kind==="convite"){ lerConviteForm(); modal.c.permissoes = Object.assign({}, P.PADRAO[modal.c.papel]); abrirModal(modal); return; }
  if(el.id==="u-papel" && modal && modal.kind==="usuario"){ lerUsuarioForm(); modal.u.permissoes = Object.assign({}, P.PADRAO[modal.u.papel]); abrirModal(modal); return; }
  if(el.id==="lt-proc" && modal) modal.processo_id = el.value;
  if(modal && modal.kind==="tarefa") atualizarCalc();
});
document.addEventListener("keydown", e => {
  if(e.key==="Escape" && modal) fecharModal();
  if(e.key==="Enter" && !e.shiftKey && e.target.id==="chat-in"){ e.preventDefault(); enviarChatLivre(); }
  if(e.key==="Enter" && !e.shiftKey && e.target.id==="ch-in"){ e.preventDefault(); enviarChatEscritorio(); }
  if(e.key==="Enter" && !e.shiftKey && e.target.id==="dga-in"){ e.preventDefault(); enviarDGA(); }
  if(e.key==="Enter" && (e.target.id==="and-txt" || e.target.id==="doc-nome")){ e.preventDefault(); e.target.closest(".row").querySelector("button").click(); }
  if(e.key==="Enter" && e.target.classList && e.target.classList.contains("me")) abrirModal({kind:"perfil"});
});
["dragover","dragleave","drop"].forEach(ev=>document.addEventListener(ev, e=>{
  const z = e.target.closest && e.target.closest("[data-drop]"); if(!z) return;
  e.preventDefault(); if(ev==="dragover") z.classList.add("over"); else z.classList.remove("over");
  if(ev==="drop") receberArquivo(z.dataset.drop, e.dataTransfer.files[0]);
}));
async function receberArquivo(alvo, file, proc){
  if(!file) return;
  if(alvo==="minuta"){ M.carregando = true; M.erro = ""; render(); }
  else if(alvo==="livre"){ L.docErro = ""; L.docNome = file.name; L.doc = null; L.docIA = null; mostrarInicio(); }
  else toast("Lendo o documento…");
  try{
    const r = await P.lerArquivo(file);
    if(alvo==="minuta"){
      M.arquivo = file.name; M.texto = r.texto; M.titulo = file.name.replace(/\.\w+$/,""); M.itens = montarItensMinuta(r); M.resumo = ""; M.carregando = false;
      M.erro = M.itens.length ? "" : "Não encontramos comentários nem alterações marcadas neste arquivo. Se o cliente escreveu as observações no corpo do e-mail, cole-as no campo abaixo.";
      if(M.itens.length) toast(`${M.itens.length} ponto(s) encontrados`);
      render();
    } else if(alvo==="livre"){ L.doc = r; mostrarInicio(); }
    else abrirModal({kind:"leitor", r, nome:file.name, processo_id:proc||""});
  }catch(err){ const msg = err.message || "Não foi possível ler o arquivo.";
    if(alvo==="minuta"){ M.carregando = false; M.erro = msg; render(); } else if(alvo==="livre"){ L.docErro = msg; mostrarInicio(); } else toast(msg); }
}

if("serviceWorker" in navigator && location.protocol==="https:" && window.self===window.top){ window.addEventListener("load", ()=>navigator.serviceWorker.register("sw.js").catch(()=>{})); }
iniciar();
})();
