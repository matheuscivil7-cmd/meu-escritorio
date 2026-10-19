/* Pauta Jurídica · dados no Supabase (ou demonstração quando o config.js está vazio) */
(function(){
"use strict";
const P = window.Pauta;
const TABELAS = ["perfis","clientes","processos","andamentos","documentos","tarefas","revisoes","comunicacoes","modelos","financeiro","atendimentos"];
P.TABELAS = TABELAS;
const agora = () => new Date().toISOString();
const base = () => location.origin + location.pathname;

P.erroAmigavel = function(e){
  const m = (e && (e.message || e.error_description || e.msg)) || String(e||"");
  if(/Anonymous sign-ins/i.test(m)) return "Preencha o e-mail e a senha.";
  if(/Invalid login credentials/i.test(m)) return "E-mail ou senha incorretos.";
  if(/Email not confirmed/i.test(m)) return "Confirme seu e-mail pelo link que enviamos antes de entrar.";
  if(/User already registered|already been registered/i.test(m)) return "Este e-mail já tem conta. Use Entrar ou Esqueci a senha.";
  if(/Password should be at least|weak password/i.test(m)) return "A senha precisa ter pelo menos 6 caracteres.";
  if(/Convite feito para outro/i.test(m)) return "Este convite foi feito para outro e-mail. Use o e-mail indicado no convite.";
  if(/Convite invalido|Database error saving new user/i.test(m)) return "Convite inválido, expirado ou já usado. Peça um novo link ao escritório.";
  if(/somente por convite/i.test(m)) return "O cadastro é feito só pelo link de convite enviado pelo escritório.";
  if(/row-level security|permission denied/i.test(m)) return "Seu acesso não permite esta ação.";
  if(/Apenas o gestor/i.test(m)) return "Apenas o gestor pode alterar tipo de usuário e acessos.";
  if(/ao menos um gestor/i.test(m)) return "O escritório precisa de ao menos um gestor ativo.";
  if(/rate limit|security purposes/i.test(m)) return "Muitas tentativas seguidas. Aguarde um minuto e tente de novo.";
  if(/Failed to fetch|NetworkError|Load failed/i.test(m)) return "Sem conexão com o servidor. Verifique a internet.";
  return m || "Algo deu errado. Tente de novo.";
};

function edicao(d){
  return {id:P.hoje(), geradoEm:d.geradoEm, fontes:d.fontes||[], itens:(d.itens||[]).map(i=>({titulo:i.titulo, resumo:i.resumo, fonte:i.fonte, link:i.link, data:i.data, areas:i.areas||[], area:(i.areas||[])[0]||"geral", imagem:i.imagem||""}))};
}

/* ================= Supabase ================= */
P.criarSupabase = function(url, chave){
  const sbUrl = url;
  const sb = window.supabase.createClient(url, chave, {auth:{persistSession:true, autoRefreshToken:true, detectSessionInUrl:true}});
  const ok = r => { if(r.error) throw r.error; return r.data; };
  let perfilAtual = null, canal = null;
  const api = {
    modo:"supabase", sb, eu:{},
    aoMudarAuth(cb){ sb.auth.onAuthStateChange((ev, s)=>cb(ev, s ? s.user : null)); },
    async sessao(){ const {data} = await sb.auth.getSession(); return data.session ? data.session.user : null; },
    async entrar(email, senha){ ok(await sb.auth.signInWithPassword({email, password:senha})); },
    async criarEscritorio(d){ const r = ok(await sb.auth.signUp({email:d.email, password:d.senha, options:{data:{nome:d.nome, telefone:d.telefone||"", escritorio_nome:d.escritorio}, emailRedirectTo:base()}})); return {confirmar:!r.session}; },
    async aceitarConvite(d){ const r = ok(await sb.auth.signUp({email:d.email, password:d.senha, options:{data:{nome:d.nome, telefone:d.telefone||"", convite:d.token}, emailRedirectTo:base()}})); return {confirmar:!r.session}; },
    async verConvite(t){ return ok(await sb.rpc("ver_convite", {t})); },
    async recuperar(email){ ok(await sb.auth.resetPasswordForEmail(email, {redirectTo:base()})); },
    async trocarSenha(n){ ok(await sb.auth.updateUser({password:n})); },
    async sair(){ if(canal){ sb.removeChannel(canal); canal = null; } await sb.auth.signOut(); perfilAtual = null; api.eu = {}; },
    async meuPerfil(){
      const {data:{user}} = await sb.auth.getUser();
      if(!user) return {perfil:null, escritorio:null, motivo:"sem_login"};
      api.eu = {id:user.id, nome:(user.user_metadata||{}).nome||"", email:user.email};
      const p = ok(await sb.from("perfis").select("*").eq("id", user.id).maybeSingle());
      if(!p) return {perfil:null, escritorio:null, motivo:"sem_perfil"};
      const e = ok(await sb.from("escritorios").select("*").eq("id", p.escritorio_id).maybeSingle());
      perfilAtual = p; api.eu.nome = p.nome;
      return {perfil:p, escritorio: e ? {id:e.id, nome:e.nome, codigo:e.codigo, config:e.config||{}} : null};
    },
    async carregar(t){ return ok(await sb.from(t).select("*").limit(5000)) || []; },
    async inserir(t, row){ const r = Object.assign({}, row); delete r.id; if(t!=="perfis" && !r.escritorio_id) r.escritorio_id = perfilAtual.escritorio_id; return ok(await sb.from(t).insert(r).select().single()); },
    async atualizar(t, id, patch){ const r = Object.assign({}, patch); delete r.atualizado_em; return ok(await sb.from(t).update(r).eq("id", id).select().maybeSingle()); },
    async excluir(t, id){ ok(await sb.from(t).delete().eq("id", id)); },
    ouvir(cb){
      if(canal) sb.removeChannel(canal);
      canal = sb.channel("pauta-"+Math.random().toString(36).slice(2));
      [...TABELAS, "escritorios", "convites"].forEach(t=>canal.on("postgres_changes", {event:"*", schema:"public", table:t}, ()=>cb(t)));
      canal.subscribe();
    },
    async atualizarEscritorio(_, patch){ const r = ok(await sb.from("escritorios").update(patch).eq("id", perfilAtual.escritorio_id).select().single()); return {id:r.id, nome:r.nome, config:r.config||{}}; },
    async portal(){ return ok(await sb.rpc("portal_cliente")); },
    async salvarPortal(){}, async removerPortal(){},
    async pedidos(){ return []; },
    async convites(){ return ok(await sb.from("convites").select("*").order("criado_em", {ascending:false})) || []; },
    async daily(){ const {data, error} = await sb.functions.invoke("noticias", {body:{}}); if(error) throw error; return data && data.itens ? [edicao(data)] : []; },
    async radar(tema){ const {data, error} = await sb.functions.invoke("noticias", {body:{radar:tema}}); if(error) throw error; return ((data && data.itens) || []).slice(0, 8).map(i=>({titulo:i.titulo, link:i.link, fonte:i.fonte, data:i.data, imagem:i.imagem||"", area:(i.areas||[]).find(a=>a!=="tribunais")||""})); },
    async prefs(){ return null; }, async salvarPrefs(){},
    async servico(acao, dados){ const {data, error} = await sb.functions.invoke("servicos", {body:Object.assign({acao}, dados||{})}); if(error) throw error; return data; },
    async rpc(nome, args){ return ok(await sb.rpc(nome, args||{})); },
    async enviarArquivo(caminho, arquivo){ ok(await sb.storage.from("documentos").upload(caminho, arquivo, {upsert:false, contentType:arquivo.type||"application/octet-stream"})); return caminho; },
    async urlArquivo(caminho){ const r = ok(await sb.storage.from("documentos").createSignedUrl(caminho, 600)); return r.signedUrl; },
    async baixarArquivo(caminho){ return ok(await sb.storage.from("documentos").download(caminho)); },
    async apagarArquivo(caminho){ ok(await sb.storage.from("documentos").remove([caminho])); },
    agendaUrl(token){ return (sbUrl||"") + "/functions/v1/agenda?t=" + token; }
  };
  return api;
};

/* ================= Demonstração (sem Supabase configurado) ================= */
P.criarDemo = function(){
  const d = n => P.iso(P.addDays(new Date(), n));
  const U = {gestor:"u-gestor", adv:"u-adv", est:"u-est", cli:"u-cli"};
  const C = {joao:"c-joao", pad:"c-pad", marcos:"c-marcos"};
  const PR = {p1:"p-1", p2:"p-2", p3:"p-3", p4:"p-4"};
  const db = {
    conversas:[],
    esc:{id:"escritorio", nome:"Lima & Reis Advocacia", codigo:"DEMO01", config:{margem:2}},
    perfis:[
      {id:U.gestor, nome:"Ana Lima", email:"ana@limareis.adv.br", papel:"gestor", status:"ativo", permissoes:P.PADRAO.gestor},
      {id:U.adv, nome:"Paulo Reis", email:"paulo@limareis.adv.br", papel:"advogado", status:"ativo", permissoes:P.PADRAO.advogado},
      {id:U.est, nome:"Júlia Prado", email:"julia@limareis.adv.br", papel:"estagiario", status:"ativo", permissoes:P.PADRAO.estagiario},
      {id:U.cli, nome:"João Batista Souza", email:"joao.souza@email.com", papel:"cliente", status:"ativo", permissoes:P.PADRAO.cliente, cliente_id:C.joao}
    ],
    convites:[{id:"cv1", token:"demo-convite-123", nome:"Rafael Nunes", email:"rafael@limareis.adv.br", papel:"advogado", permissoes:P.PADRAO.advogado, criado_em:new Date().toISOString(), expira_em:P.addDays(new Date(),7).toISOString()}],
    clientes:[
      {id:C.joao, nome:"João Batista Souza", tipo:"PF", telefone:"(11) 98888-0001", email:"joao.souza@email.com"},
      {id:C.pad, nome:"Padaria Bom Grão Ltda.", tipo:"PJ", telefone:"(11) 4000-0002", email:"contato@bomgrao.com.br"},
      {id:C.marcos, nome:"Marcos Vieira", tipo:"PF", telefone:"(11) 97777-0003"}
    ],
    processos:[
      {id:PR.p1, numero:"1000123-06.2026.5.02.0384", area:"trabalhista", cliente_id:C.joao, polo:"Autor / reclamante", parte_contraria:"Transportes Rápido S.A.", vara:"4ª Vara do Trabalho de Osasco", fase:"Instrução", responsavel_id:U.gestor, valor:"R$ 85.000,00", resumo:"Horas extras e insalubridade. Laudo pericial favorável. Cliente aceita acordo acima de R$ 60 mil.", resumo_cliente:"A perícia foi favorável a você. Agora aguardamos a audiência em que as testemunhas serão ouvidas.", atualizado_em:new Date().toISOString()},
      {id:PR.p2, numero:"1004567-68.2026.8.26.0609", area:"civel", cliente_id:C.pad, polo:"Réu / reclamada", parte_contraria:"Distribuidora Alfa Ltda.", vara:"2ª Vara Cível de Taboão da Serra", fase:"Inicial / conhecimento", responsavel_id:U.adv, valor:"R$ 42.300,00", resumo:"Cobrança de duplicatas. Cliente alega mercadoria com defeito.", resumo_cliente:"Recebemos a citação e estamos preparando a defesa.", atualizado_em:new Date().toISOString()},
      {id:PR.p3, numero:"0001234-90.2025.8.26.0050", area:"criminal", cliente_id:C.marcos, polo:"Acusado", parte_contraria:"Ministério Público do Estado de SP", vara:"12ª Vara Criminal da Capital", fase:"Instrução", responsavel_id:U.gestor, resumo:"Receptação (art. 180 CP). Réu solto.", atualizado_em:new Date().toISOString()},
      {id:PR.p4, numero:"1012345-98.2025.8.26.0100", area:"civel", cliente_id:C.joao, polo:"Autor / reclamante", parte_contraria:"Banco Exemplo S.A.", vara:"15ª Vara Cível do Foro Central", fase:"Recurso", responsavel_id:U.adv, valor:"R$ 15.000,00", resumo:"Negativação indevida. Sentença procedente (R$ 8 mil). Banco apelou.", resumo_cliente:"Ganhamos em primeira instância. O banco recorreu e vamos responder ao recurso.", atualizado_em:new Date().toISOString()}
    ],
    andamentos:[
      {id:"a1", processo_id:PR.p1, data:d(-20), texto:"Laudo pericial juntado, favorável ao reclamante.", visivel_cliente:true},
      {id:"a2", processo_id:PR.p1, data:d(-45), texto:"Perícia de insalubridade realizada no local de trabalho.", visivel_cliente:true},
      {id:"a3", processo_id:PR.p1, data:d(-10), texto:"Conversa com o preposto sobre proposta de acordo (interno).", visivel_cliente:false},
      {id:"a4", processo_id:PR.p2, data:d(-6), texto:"Citação por carta com AR juntado.", visivel_cliente:true},
      {id:"a6", processo_id:PR.p4, data:d(-3), texto:"Intimação para contrarrazões à apelação.", visivel_cliente:true},
      {id:"a7", processo_id:PR.p4, data:d(-40), texto:"Sentença de procedência: indenização de R$ 8.000,00.", visivel_cliente:true}
    ],
    documentos:[
      {id:"d1", processo_id:PR.p1, nome:"Procuração", status:"Assinado", data:d(-90), visivel_cliente:true},
      {id:"d3", processo_id:PR.p2, nome:"Notas fiscais e fotos da mercadoria", status:"Aguardando cliente", data:d(-5), visivel_cliente:true}
    ],
    tarefas:[], revisoes:[], comunicacoes:[], modelos:[{id:"md1", tipo:"tema", area:"", titulo:"dano moral atraso de voo", texto:""}], financeiro:[], atendimentos:[{id:"at1", nome:"Carla Mendes", telefone:"(11) 95555-0101", email:"carla@email.com", area:"civel", relato:"Comprei um celular que parou de funcionar em 10 dias e a loja não quer trocar.", status:"novo", criado_em:new Date().toISOString()}]
  };
  const r1 = P.calcPrazo({inicio:d(-6), dias:15, contagem:"uteis", djen:false, suspende:true});
  db.tarefas = [
    {id:"t1", tipo:"Prazo", titulo:"Contestação", processo_id:PR.p2, data:r1.fatal, interno:P.prazoInterno(r1.fatal,2), atribuido_a:U.adv, calculo:{inicio:d(-6), dias:15, djen:false}},
    {id:"t3", tipo:"Audiência", titulo:"Audiência de instrução", processo_id:PR.p1, data:d(9), hora:"14:30", modalidade:"Presencial", local:"4ª VT de Osasco, sala 2", atribuido_a:U.gestor},
    {id:"t4", tipo:"Peça", titulo:"Finalizar rol de testemunhas", processo_id:PR.p1, data:d(0), atribuido_a:U.est},
    {id:"t6", tipo:"Diligência", titulo:"Cobrar notas fiscais do cliente", processo_id:PR.p2, data:d(-1), atribuido_a:U.est}
  ].map(t=>Object.assign({done:false}, t));
  const USUARIOS = [
    {id:U.gestor, nome:"Ana Lima", rotulo:"Gestor"}, {id:U.adv, nome:"Paulo Reis", rotulo:"Advogado(a)"},
    {id:U.est, nome:"Júlia Prado", rotulo:"Estagiário(a)"}, {id:U.cli, nome:"João Batista Souza", rotulo:"Cliente"}
  ];
  let me = null, cbs = [];
  const avisar = t => setTimeout(()=>cbs.forEach(cb=>cb(t)), 0);
  const api = {
    modo:"demo", usuariosDemo:USUARIOS, eu:{},
    entrarComo(uid){ me = uid; const p = db.perfis.find(x=>x.id===uid); api.eu = p ? {id:uid, nome:p.nome, email:p.email} : {}; },
    aoMudarAuth(){}, async sessao(){ return me ? {id:me} : null; },
    async entrar(email){ const p = db.perfis.find(x=>x.email===email); if(!p) throw new Error("Invalid login credentials"); api.entrarComo(p.id); },
    async criarEscritorio(){ throw new Error("Na demonstração, use os perfis prontos."); },
    async aceitarConvite(){ throw new Error("Na demonstração, use os perfis prontos."); },
    async verConvite(t){ const c = db.convites.find(x=>x.token===t); return c ? {escritorio:db.esc.nome, nome:c.nome, email:c.email, papel:c.papel, valido:true} : null; },
    async recuperar(){}, async trocarSenha(){},
    async sair(){ me = null; api.eu = {}; },
    async meuPerfil(){ if(!me) return {perfil:null, escritorio:db.esc, motivo:"sem_login"}; return {perfil:Object.assign({}, db.perfis.find(p=>p.id===me)), escritorio:db.esc}; },
    async carregar(t){ return (db[t]||[]).map(r=>Object.assign({}, r)); },
    async inserir(t, row){ const r = Object.assign({id:P.uid(), criado_em:agora(), criado_por:me}, row); if(t==="convites"){ r.token = Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2); if(r.expira_em===undefined) r.expira_em = P.addDays(new Date(),7).toISOString(); } db[t].push(r); avisar(t); return Object.assign({}, r); },
    async atualizar(t, k, patch){ const r = db[t].find(x=>x.id===k); if(r) Object.assign(r, patch, {atualizado_em:agora()}); avisar(t); return patch; },
    async excluir(t, k){ db[t] = db[t].filter(x=>x.id!==k); if(t==="processos") ["tarefas","andamentos","documentos"].forEach(c=>db[c] = db[c].filter(x=>x.processo_id!==k)); avisar(t); },
    ouvir(cb){ cbs = [cb]; },
    async atualizarEscritorio(_, patch){ Object.assign(db.esc, patch); avisar("escritorios"); return Object.assign({}, db.esc); },
    async portal(){ const p = db.perfis.find(x=>x.id===me); if(!p || !p.cliente_id) return {vinculado:false, escritorio:db.esc.nome}; const c = db.clientes.find(x=>x.id===p.cliente_id); return P.montarPortal({escritorio:db.esc, cliente:Object.assign({}, c, {portal_perm:p.permissoes}), processos:db.processos, andamentos:db.andamentos, documentos:db.documentos, tarefas:db.tarefas, perfis:db.perfis}); },
    async salvarPortal(){}, async removerPortal(){}, async pedidos(){ return []; },
    async convites(){ return db.convites.slice(); },
    async radar(tema){ return [{titulo:`Exemplo: tribunal julga caso sobre ${tema}`, link:"https://www.jusbrasil.com.br/jurisprudencia/busca?q="+encodeURIComponent(tema), fonte:"Demonstração", data:agora()}]; },
    async daily(){ return [{id:P.hoje(), geradoEm:agora(), demo:true, itens:[
      {titulo:"Exemplo: tribunal fixa tese sobre tema trabalhista", resumo:"Com o Supabase configurado, esta coluna traz as manchetes do STJ, Consultor Jurídico, Migalhas e notícias por área.", fonte:"Demonstração", link:"", area:"trabalhista", areas:["trabalhista"]},
      {titulo:"Exemplo: decisão sobre direito do consumidor", resumo:"Cada notícia mostra a fonte e abre a matéria original.", fonte:"Demonstração", link:"", area:"civel", areas:["civel"]}]}]; },
    async prefs(){ return null; }, async salvarPrefs(){},
    async servico(acao, d){
      if(acao==="datajud" && P.soDigitos(d.numero)[13]==="1") return {tribunal:"STF", encontrado:false, foraDataJud:true, movimentos:[], aviso:"O STF não publica os processos na base pública do CNJ (DataJud). Consulte direto no portal do STF."};
      if(acao==="datajud") return {tribunal:"TRT2", encontrado:true, classe:"Ação Trabalhista - Rito Ordinário", orgao:"4ª Vara do Trabalho de Osasco", assuntos:["Horas Extras"], movimentos:[{data:new Date().toISOString(), nome:"Juntada de Petição", detalhe:"Manifestação"},{data:P.addDays(new Date(),-9).toISOString(), nome:"Audiência designada", detalhe:"instrução"},{data:P.addDays(new Date(),-40).toISOString(), nome:"Distribuído por sorteio", detalhe:""}]};
      if(acao==="jurisprudencia") return {fonte:"TJSP (demonstração)", termo:d.q, pagina:d.pagina||1, total:2, itens:[
        {numero:"1000592-29.2025.8.26.0106", classe:"Apelação Cível / Transporte Aéreo", relator:"Relator de exemplo", comarca:"São Paulo", orgao:"16ª Câmara de Direito Privado", julgamento:"15/10/2026", publicacao:"16/10/2026", ementa:"Ementa: APELAÇÃO CÍVEL – Exemplo de acórdão. Com o Supabase configurado, aqui aparecem os acórdãos reais do TJSP.", link:""},
        {numero:"1014228-79.2025.8.26.0068", classe:"Apelação Cível / Cancelamento de voo", relator:"Relatora de exemplo", comarca:"Barueri", orgao:"16ª Câmara de Direito Privado", julgamento:"15/10/2026", publicacao:"16/10/2026", ementa:"Ementa: Segundo exemplo de acórdão.", link:""}]};
      if(acao==="indices"){ const [di,mi,ai] = d.de.split("/").map(Number), [df,mf,af] = d.ate.split("/").map(Number); const v = []; let y = ai, m = mi; while(y<af || (y===af && m<=mf)){ v.push({data:`01/${String(m).padStart(2,"0")}/${y}`, valor: d.serie==="selic"?0.9:d.serie==="igpm"?0.3:0.4}); m++; if(m>12){ m=1; y++; } } return {serie:d.serie, valores:v}; }
      return {};
    },
    async rpc(nome, a){
      if(nome==="cliente_enviar_documento"){ const doc = db.documentos.find(x=>x.id===a.doc); if(doc){ doc.arquivo = a.caminho; doc.status = "Enviado pelo cliente"; avisar("documentos"); } return true; }
      if(nome==="cliente_novo_documento"){ db.documentos.push({id:P.uid(), processo_id:a.pid, nome:a.p_nome||"Documento enviado", status:"Enviado pelo cliente", data:P.hoje(), visivel_cliente:true, arquivo:a.caminho}); avisar("documentos"); return true; }
      if(nome==="escritorio_publico") return {nome:db.esc.nome};
      if(nome==="novo_atendimento"){ db.atendimentos.push({id:P.uid(), nome:a.p_nome, telefone:a.p_telefone, email:a.p_email, area:a.p_area, relato:a.p_relato, status:"novo", criado_em:agora()}); avisar("atendimentos"); return true; }
      return null;
    },
    async enviarArquivo(caminho, arquivo){ (P._arqDemo = P._arqDemo || {})[caminho] = arquivo; return caminho; },
    async urlArquivo(caminho){ const b = (P._arqDemo||{})[caminho]; return b ? URL.createObjectURL(b) : "about:blank"; },
    async baixarArquivo(caminho){ const b = (P._arqDemo||{})[caminho]; if(!b) throw new Error("Arquivo não encontrado"); return b; },
    async apagarArquivo(caminho){ delete (P._arqDemo||{})[caminho]; },
    agendaUrl(token){ return location.origin + "/functions/v1/agenda?t=" + (token||"demo"); }
  };
  return api;
};

/* portal: usado pela demonstração */
P.montarPortal = function({escritorio, cliente, processos, andamentos, documentos, tarefas, perfis}){
  const perm = cliente.portal_perm || {ver_documentos:true, ver_audiencias:true};
  return {vinculado:true, escritorio:escritorio?.nome||"", escritorio_id:escritorio?.id, logo:((escritorio?.config||{}).docs||{}).logo||"", contato:{telefone:"(11) 4000-1000", email:"contato@limareis.adv.br"}, cliente:cliente.nome,
    processos: processos.filter(p=>p.cliente_id===cliente.id).map(p=>({id:p.id, numero:p.numero||"", area:p.area, fase:p.fase||"", vara:p.vara||"", parte_contraria:p.parte_contraria||"", resumo:p.resumo_cliente||"", atualizado_em:p.atualizado_em||"", advogado:(()=>{ const a = (perfis||[]).find(u=>u.id===p.responsavel_id); return a ? {nome:a.nome, email:a.email, telefone:a.telefone||"(11) 98888-1234"} : null; })(),
      andamentos: andamentos.filter(a=>a.processo_id===p.id && a.visivel_cliente).sort((a,b)=>(b.data||"").localeCompare(a.data||"")).map(a=>({data:a.data, texto:a.texto, arquivo:a.arquivo||null, arquivo_nome:a.arquivo_nome||null})),
      documentos: perm.ver_documentos===false ? [] : documentos.filter(x=>x.processo_id===p.id && x.visivel_cliente).map(x=>({id:x.id, nome:x.nome, status:x.status, data:x.data, arquivo:!!x.arquivo, caminho:x.arquivo||null})),
      audiencias: perm.ver_audiencias===false ? [] : tarefas.filter(t=>t.processo_id===p.id && t.tipo==="Audiência" && !t.done && t.data>=P.hoje()).map(t=>({data:t.data, hora:t.hora||"", titulo:t.titulo||"", local:t.local||"", modalidade:t.modalidade||""}))}))};
};
})();
