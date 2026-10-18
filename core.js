/* Pauta Jurídica · núcleo: domínio, prazos, leitura de arquivos e geração de PDF */
(function(){
"use strict";
const P = window.Pauta = window.Pauta || {};

/* ---------- domínio ---------- */
P.AREAS = {
  trabalhista:{nome:"Trabalhista", contagem:"uteis", lei:"CLT", cor:"trab"},
  civel:{nome:"Cível", contagem:"uteis", lei:"CPC", cor:"civ"},
  criminal:{nome:"Criminal", contagem:"corridos", lei:"CPP", cor:"crim"}
};
P.FASES = ["Inicial / conhecimento","Instrução","Sentença","Recurso","Execução / cumprimento","Acordo","Suspenso","Arquivado"];
P.TIPOS = ["Prazo","Audiência","Peça","Diligência","Reunião"];
P.DOC_STATUS = ["Rascunho","Aguardando cliente","Enviado pelo cliente","Recebido","Assinado","Protocolado"];
P.PAPEIS = {gestor:"Gestor", advogado:"Advogado(a)", estagiario:"Estagiário(a)", cliente:"Cliente"};
P.PERMISSOES = [
  ["ver_todos_processos","Ver todos os processos","Sem isso, vê só os processos em que é responsável ou tem atividade atribuída."],
  ["editar_processos","Cadastrar e editar processos","Inclui andamentos, documentos e dados do processo."],
  ["registrar_andamentos","Registrar andamentos e documentos","Nos processos que consegue ver."],
  ["excluir_registros","Excluir registros","Apagar processos e clientes."],
  ["gerenciar_clientes","Gerenciar clientes","Cadastrar e editar clientes."],
  ["ver_agenda_equipe","Ver a agenda da equipe","Sem isso, vê só as atividades atribuídas a ele."],
  ["criar_tarefas","Criar e atribuir atividades","Cadastrar prazos e passar tarefas para outras pessoas."],
  ["revisar_minutas","Revisar minutas","Usar a revisão de comentários de contratos."],
  ["gerar_relatorios","Gerar relatórios em PDF","Pauta, carteira e relatórios de processos."],
  ["enviar_cliente","Preparar mensagens a clientes","Montar o resumo do andamento para copiar e enviar."],
  ["gerenciar_equipe","Gerenciar equipe","Criar links de convite, mudar funções e acessos, ajustes do escritório."],
  ["financeiro","Financeiro","Ver e lançar honorários, parcelas e recibos."],
  ["atendimentos","Atendimentos","Ver pedidos de primeira consulta e transformar em clientes."]
];
P.PERMISSOES_CLIENTE = [["ver_documentos","Ver documentos","Lista de documentos marcados como visíveis."],["ver_audiencias","Ver audiências","Datas e locais das próximas audiências."]];
P.PADRAO = {
  gestor:Object.fromEntries(P.PERMISSOES.map(([k])=>[k,true])),
  advogado:{ver_todos_processos:true,editar_processos:true,registrar_andamentos:true,excluir_registros:false,gerenciar_clientes:true,ver_agenda_equipe:true,criar_tarefas:true,revisar_minutas:true,gerar_relatorios:true,enviar_cliente:true,gerenciar_equipe:false,financeiro:false,atendimentos:true},
  estagiario:{ver_todos_processos:false,editar_processos:false,registrar_andamentos:true,excluir_registros:false,gerenciar_clientes:false,ver_agenda_equipe:false,criar_tarefas:false,revisar_minutas:false,gerar_relatorios:false,enviar_cliente:false,gerenciar_equipe:false,financeiro:false,atendimentos:false},
  cliente:{ver_documentos:true,ver_audiencias:true}
};
P.PRAZOS_COMUNS = {
  civel:[["Contestação",15],["Réplica",15],["Apelação",15],["Contrarrazões",15],["Agravo de instrumento",15],["Embargos de declaração",5],["Recurso especial",15],["Manifestação (prazo genérico)",5]],
  trabalhista:[["Recurso ordinário",8],["Contrarrazões",8],["Recurso de revista",8],["Agravo de petição",8],["Embargos de declaração",5],["Embargos à execução",5],["Manifestação sobre documentos",5]],
  criminal:[["Resposta à acusação",10],["Apelação (interposição)",5],["Razões de apelação",8],["Recurso em sentido estrito",5],["Embargos de declaração",2],["Memoriais",5],["Recurso especial",15]]
};
P.SEGMENTOS = {"1":"STF","2":"CNJ","3":"STJ","4":"Justiça Federal","5":"Justiça do Trabalho","6":"Justiça Eleitoral","7":"Justiça Militar da União","8":"Justiça Estadual","9":"Justiça Militar Estadual"};
P.MESES = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

/* ---------- utilidades ---------- */
P.$ = s => document.querySelector(s);
P.esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
P.uid = () => (crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => { const r = Math.random()*16|0; return (c==="x"?r:(r&3|8)).toString(16); }));
P.pad = n => String(n).padStart(2,"0");
P.iso = d => d.getFullYear()+"-"+P.pad(d.getMonth()+1)+"-"+P.pad(d.getDate());
P.parse = s => { const [y,m,d] = String(s).slice(0,10).split("-").map(Number); return new Date(y,m-1,d,12); };
P.addDays = (d,n) => { const x = new Date(d); x.setDate(x.getDate()+n); return x; };
P.fmt = s => { if(!s) return "—"; const [y,m,d] = String(s).slice(0,10).split("-"); return d+"/"+m+"/"+y; };
P.fmtCurto = s => { if(!s) return "—"; const [,m,d] = String(s).slice(0,10).split("-"); return d+"/"+m; };
P.hoje = () => P.iso(new Date());
P.diffDias = (a,b) => Math.round((P.parse(b)-P.parse(a))/864e5);
P.iniciais = n => String(n||"?").trim().split(/\s+/).filter(w=>!/^(d[aeo]s?|e)$/i.test(w)).slice(0,2).map(w=>w[0]).join("").toUpperCase() || "?";
P.primeiroNome = n => String(n||"").trim().split(/\s+/)[0] || "";
P.toast = msg => { const t = P.$("#toast"); if(!t) return; t.textContent = msg; t.hidden = false; clearTimeout(P.toast._t); P.toast._t = setTimeout(()=>t.hidden = true, 2800); };
P.copiar = async txt => { try{ await navigator.clipboard.writeText(txt); P.toast("Copiado"); } catch(e){ P.toast("Não foi possível copiar automaticamente. Selecione o texto e copie."); } };
P.telefoneWa = tel => { let d = String(tel||"").replace(/\D/g,""); if(!d) return ""; if(d.length<=11) d = "55"+d; return d; };

/* ---------- feriados e prazos ---------- */
function pascoa(y){ const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31),da=((h+l-7*m+114)%31)+1; return new Date(y,mo-1,da,12); }
const _fer = {};
function feriadosAno(y){
  if(_fer[y]) return _fer[y];
  const f = new Map();
  [["01-01","Confraternização Universal"],["04-21","Tiradentes"],["05-01","Dia do Trabalho"],["09-07","Independência"],["10-12","Nossa Senhora Aparecida"],["11-02","Finados"],["11-15","Proclamação da República"],["11-20","Consciência Negra"],["12-25","Natal"]].forEach(([md,n])=>f.set(y+"-"+md,n));
  const p = pascoa(y);
  f.set(P.iso(P.addDays(p,-48)),"Carnaval"); f.set(P.iso(P.addDays(p,-47)),"Carnaval"); f.set(P.iso(P.addDays(p,-2)),"Sexta-feira Santa"); f.set(P.iso(P.addDays(p,60)),"Corpus Christi");
  return (_fer[y]=f);
}
let _locTxt = null, _loc = new Map();
P.cfg = () => (P.escritorio && P.escritorio.config) || {};
function feriadosLocais(){
  const txt = String(P.cfg().feriadosLocais||"");
  if(txt === _locTxt) return _loc;
  _locTxt = txt; _loc = new Map();
  txt.split(/\n|;/).forEach(l=>{ const m = l.trim().match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?\s*(.*)$/); if(!m) return;
    _loc.set(m[3] ? m[3]+"-"+P.pad(m[2])+"-"+P.pad(m[1]) : "*-"+P.pad(m[2])+"-"+P.pad(m[1]), m[4]||"Feriado local"); });
  return _loc;
}
function nomeFeriado(d){ const s = P.iso(d); const f = feriadosAno(d.getFullYear()).get(s); if(f) return f; const l = feriadosLocais(); return l.get(s) || l.get("*-"+s.slice(5)) || null; }
const emRecesso = d => (d.getMonth()===11 && d.getDate()>=20) || (d.getMonth()===0 && d.getDate()<=20);
function diaUtil(d, recesso){ const w=d.getDay(); if(w===0||w===6) return false; if(nomeFeriado(d)) return false; if(recesso && emRecesso(d)) return false; return true; }
P.diaUtil = diaUtil;

/* CPC art. 219/224/220 · CLT art. 775/775-A · CPP art. 798/798-A · DJEN: publicação no 1º dia útil após a disponibilização */
P.calcPrazo = function({inicio, dias, contagem, djen, suspende}){
  if(!inicio || !(dias>0)) return null;
  const {parse, addDays, iso, fmt, fmtCurto} = P;
  const util = d => diaUtil(d, suspende);
  const notas = []; const pulados = new Map(); let recessoPulado = false;
  let base = parse(inicio);
  if(djen){ let p = addDays(base,1); while(!util(p)) p = addDays(p,1); notas.push("Disponibilizado em "+fmt(inicio)+", publicação considerada em "+fmt(iso(p))+"."); base = p; }
  else if(!util(base)){ let p = base; while(!util(p)) p = addDays(p,1); notas.push("Intimação em dia não útil: considerada feita em "+fmt(iso(p))+"."); base = p; }
  const marca = d => { if(suspende && emRecesso(d)){ recessoPulado = true; return; } const n = nomeFeriado(d); if(n && d.getDay()%6!==0) pulados.set(iso(d), n); };
  let x = base, cont = 0, primeiro = null;
  if(contagem === "uteis"){
    while(cont < dias){ x = addDays(x,1); if(util(x)){ cont++; if(!primeiro) primeiro = x; } else marca(x); }
  } else {
    x = addDays(base,1); while(!util(x)){ marca(x); x = addDays(x,1); }
    primeiro = x; cont = 1;
    while(cont < dias){ x = addDays(x,1); if(suspende && emRecesso(x)){ recessoPulado = true; continue; } cont++; }
    let prorrog = false; while(!util(x)){ marca(x); x = addDays(x,1); prorrog = true; }
    if(prorrog) notas.push("O último dia caiu em dia não útil; prorrogado para "+fmt(iso(x))+".");
  }
  if(recessoPulado) notas.push("Recesso forense (20/12 a 20/01) suspendeu a contagem.");
  if(pulados.size) notas.push("Feriados desconsiderados: "+[...pulados].map(([d,n])=>fmtCurto(d)+" ("+n+")").join(", ")+".");
  return {fatal: iso(x), inicioContagem: iso(primeiro), notas};
};
P.margem = () => Number(P.cfg().margem ?? 2);
P.prazoInterno = function(fatal, margem){
  if(!fatal) return ""; margem = Number(margem ?? P.margem()); if(!(margem>0)) return fatal;
  let x = P.parse(fatal), n = 0; while(n < margem){ x = P.addDays(x,-1); if(diaUtil(x,true)) n++; } return P.iso(x);
};

/* ---------- número CNJ ---------- */
P.cnjInfo = function(s){
  const d = String(s||"").replace(/\D/g,"");
  if(d.length !== 20) return {completo:false, digitos:d.length};
  const N=d.slice(0,7),DD=d.slice(7,9),A=d.slice(9,13),J=d.slice(13,14),TR=d.slice(14,16),O=d.slice(16,20);
  let valido = false; try{ valido = (98n - (BigInt(N+A+J+TR+O+"00") % 97n)) === BigInt(DD); }catch(e){}
  return {completo:true, valido, formatado:`${N}-${DD}.${A}.${J}.${TR}.${O}`, segmento:P.SEGMENTOS[J]||"?", J, ano:A};
};
P.mascaraCNJ = function(v){
  const d = v.replace(/\D/g,"").slice(0,20); let o = "";
  for(const [a,b,sep] of [[0,7,""],[7,9,"-"],[9,13,"."],[13,14,"."],[14,16,"."],[16,20,"."]]){ if(d.length>a) o += sep + d.slice(a,b); }
  return o;
};
P.soDigitos = s => String(s||"").replace(/\D/g,"");

/* ---------- leitura de Word (.docx) com comentários e alterações ---------- */
const W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const wa = (el, n) => el.getAttributeNS(W, n) || el.getAttribute("w:"+n) || "";
async function lerDocx(file){
  if(!window.JSZip) throw new Error("Leitor de Word indisponível no momento.");
  const zip = await JSZip.loadAsync(file);
  const xml = await zip.file("word/document.xml")?.async("string"); if(!xml) throw new Error("Arquivo Word inválido.");
  const dom = new DOMParser().parseFromString(xml, "application/xml");
  const pars = [], refPar = {}, alteracoes = [];
  [...dom.getElementsByTagNameNS(W,"p")].forEach(p=>{
    const idx = pars.length; let txt = "";
    for(const el of p.getElementsByTagNameNS(W,"*")){
      const n = el.localName;
      if(n==="t") txt += el.textContent; else if(n==="tab") txt += "\t"; else if(n==="br") txt += "\n";
      else if(n==="commentRangeStart"||n==="commentReference"){ const id = wa(el,"id"); if(!(id in refPar)) refPar[id] = idx; }
    }
    pars.push(txt);
    for(const ins of p.getElementsByTagNameNS(W,"ins")){ const t = [...ins.getElementsByTagNameNS(W,"t")].map(x=>x.textContent).join(""); if(t.trim()) alteracoes.push({tipo:"Inclusão", autor:wa(ins,"author"), texto:t, par:idx}); }
    for(const del of p.getElementsByTagNameNS(W,"del")){ const t = [...del.getElementsByTagNameNS(W,"delText")].map(x=>x.textContent).join(""); if(t.trim()) alteracoes.push({tipo:"Exclusão", autor:wa(del,"author"), texto:t, par:idx}); }
  });
  const comentarios = [];
  const cx = await zip.file("word/comments.xml")?.async("string");
  if(cx){ const cd = new DOMParser().parseFromString(cx,"application/xml");
    for(const c of cd.getElementsByTagNameNS(W,"comment")){ const id = wa(c,"id");
      const texto = [...c.getElementsByTagNameNS(W,"p")].map(p=>[...p.getElementsByTagNameNS(W,"t")].map(t=>t.textContent).join("")).join(" ").trim();
      if(texto) comentarios.push({autor:wa(c,"author"), texto, trecho: refPar[id]!==undefined ? pars[refPar[id]] : ""}); } }
  alteracoes.forEach(a=>a.trecho = pars[a.par]||"");
  return {tipo:"docx", texto: pars.filter(s=>s.trim()).join("\n"), comentarios, alteracoes};
}

/* ---------- leitura de PDF: texto e comentários (anotações) ---------- */
async function lerPdf(file){
  const lib = window.pdfjsLib;
  if(!lib) throw new Error("Leitor de PDF indisponível no momento.");
  if(!lib.GlobalWorkerOptions.workerSrc) lib.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";
  const pdf = await lib.getDocument({data: new Uint8Array(await file.arrayBuffer())}).promise;
  const paginas = [], comentarios = [];
  for(let n=1; n<=pdf.numPages; n++){
    const pg = await pdf.getPage(n);
    const tc = await pg.getTextContent();
    let linhas = [], ultY = null, linha = "";
    tc.items.forEach(it=>{ const y = Math.round(it.transform[5]); if(ultY!==null && Math.abs(y-ultY)>2){ linhas.push(linha); linha = ""; } linha += it.str + (it.hasEOL?"":""); ultY = y; });
    if(linha) linhas.push(linha);
    paginas.push(linhas.join("\n"));
    const anots = await pg.getAnnotations();
    anots.forEach(a=>{
      if(!a || a.subtype==="Popup" || a.subtype==="Link" || a.subtype==="Widget") return;
      const texto = (a.contentsObj && a.contentsObj.str) || a.contents || "";
      const autor = (a.titleObj && a.titleObj.str) || a.title || "";
      let trecho = "";
      if(a.rect){ const [x1,y1,x2,y2] = a.rect;
        trecho = tc.items.filter(it=>{ const x=it.transform[4], y=it.transform[5]; return x>=x1-3 && x<=x2+3 && y>=y1-5 && y<=y2+3; }).map(it=>it.str).join(" ").replace(/\s+/g," ").trim(); }
      if(!texto.trim() && !trecho) return;
      if(a.inReplyTo && !texto.trim()) return;
      const tipoMarca = {Highlight:"Destaque",Underline:"Sublinhado",StrikeOut:"Riscado",Squiggly:"Sublinhado",FreeText:"Texto",Text:"Nota"}[a.subtype] || a.subtype;
      comentarios.push({autor, texto: texto.trim() || `(${tipoMarca} sem comentário)`, trecho, pagina:n, marca:tipoMarca});
    });
  }
  const texto = paginas.join("\n\n");
  if(!texto.trim() && !comentarios.length) throw new Error("Este PDF parece ser uma imagem escaneada, sem texto para ler. Use a versão digital do documento.");
  return {tipo:"pdf", texto, comentarios, alteracoes:[], paginas:pdf.numPages};
}

P.lerArquivo = async function(file){
  const n = file.name.toLowerCase();
  if(n.endsWith(".docx")) return lerDocx(file);
  if(n.endsWith(".pdf")) return lerPdf(file);
  if(n.endsWith(".txt")||n.endsWith(".md")) return {tipo:"txt", texto: await file.text(), comentarios:[], alteracoes:[]};
  if(n.endsWith(".doc")) throw new Error("Formato .doc antigo: salve como .docx no Word e envie de novo.");
  throw new Error("Formato não suportado. Use PDF, Word (.docx) ou .txt.");
};

/* ---------- leitor de intimações e decisões (regras, sem IA) ---------- */
const NUM_EXT = {um:1,uma:1,dois:2,duas:2,"três":3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,quinze:15,vinte:20,trinta:30,quarenta:40,sessenta:60};
P.analisarTexto = function(texto){
  const t = String(texto||"").replace(/ /g," ");
  const plano = t.replace(/\s+/g," ");
  const numeros = [...new Set((plano.match(/\b\d{7}-?\d{2}\.?\d{4}\.?\d\.?\d{2}\.?\d{4}\b/g)||[]).map(s=>P.mascaraCNJ(s)))];
  const tipos = [["Sentença",/\bSENTEN[ÇC]A\b/i],["Acórdão",/\bAC[ÓO]RD[ÃA]O\b/i],["Decisão",/\bDECIS[ÃA]O\b/i],["Despacho",/\bDESPACHO\b/i],["Citação",/\bCITA[ÇC][ÃA]O\b|\bCITE-SE\b/i],["Intimação",/\bINTIMA[ÇC][ÃA]O\b|\bINTIME-SE\b/i]];
  const tipo = (tipos.find(([,re])=>re.test(plano))||["Documento"])[0];
  const prazos = [];
  const reP = /prazo\s+(?:legal\s+|comum\s+|sucessivo\s+)?de\s+(\d{1,3}|[a-zçê]+)\s*(?:\([^)]{1,25}\)\s*)?dias?(\s+[úu]teis|\s+corridos)?/gi;
  let m; while((m = reP.exec(plano))){ const n = /^\d+$/.test(m[1]) ? Number(m[1]) : NUM_EXT[m[1].toLowerCase()]; if(n){ const ini = Math.max(0,m.index-90); prazos.push({dias:n, contagem: /corridos/i.test(m[2]||"") ? "corridos" : (/[úu]teis/i.test(m[2]||"") ? "uteis" : null), trecho: plano.slice(ini, m.index+m[0].length+60).trim()}); } }
  const audiencias = [];
  const reA = /audi[êe]ncia[^.;]{0,140}?(\d{1,2})\/(\d{1,2})\/(\d{2,4})(?:[^.;\d]{0,30}?(\d{1,2})\s*(?:h|:|horas?)\s*(\d{2})?)?/gi;
  while((m = reA.exec(plano))){ const y = m[3].length===2 ? "20"+m[3] : m[3]; const data = y+"-"+P.pad(m[2])+"-"+P.pad(m[1]); audiencias.push({data, hora: m[4] ? P.pad(m[4])+":"+(m[5]||"00") : "", trecho: plano.slice(m.index, m.index+m[0].length+40).trim(), modalidade: /virtual|videoconfer|telepresencial|teams|zoom|meet/i.test(plano.slice(m.index, m.index+400)) ? "Virtual" : ""}); }
  const disp = plano.match(/disponibiliza(?:do|da|[çc][ãa]o)[^0-9]{0,60}(\d{1,2})\/(\d{1,2})\/(\d{4})/i);
  const pub = plano.match(/publica(?:do|da|[çc][ãa]o)[^0-9]{0,60}(\d{1,2})\/(\d{1,2})\/(\d{4})/i);
  const toIso = mm => mm ? mm[3]+"-"+P.pad(mm[2])+"-"+P.pad(mm[1]) : "";
  const valores = [...new Set(plano.match(/R\$\s?\d{1,3}(?:\.\d{3})*,\d{2}/g)||[])].slice(0,6);
  const partes = (plano.match(/(?:RECLAMANTE|AUTOR(?:A)?|REQUERENTE|EXEQUENTE|APELANTE)\s*:\s*([^:]{3,80}?)\s+(?=(?:RECLAMAD|R[ÉE]U|REQUERID|EXECUTAD|APELAD|ADVOGAD|ADV\.)\w*\s*:)/i)||[])[1];
  const resumo = plano.slice(0, 600);
  return {tipo, numeros, prazos, audiencias, disponibilizacao: toIso(disp), publicacao: toIso(pub), valores, partes, resumo};
};

/* ---------- biblioteca de respostas para minutas ---------- */
P.BIBLIOTECA = [
  {id:"multa", nome:"Multa", re:/multa|cl[aá]usula penal|penalidade/i,
    manter:"Mantemos a multa prevista, pois é proporcional à obrigação e serve para garantir o cumprimento do contrato pelas duas partes. A própria lei já limita a cláusula penal ao valor da obrigação principal e permite sua redução em caso de excesso (arts. 412 e 413 do Código Civil).",
    ajustar:"Podemos rever o percentual da multa para [X]%, desde que ela continue se aplicando de forma recíproca às duas partes."},
  {id:"foro", nome:"Foro", re:/\bforo\b|comarca|jurisdi/i,
    manter:"Mantemos o foro indicado, por ser o local de cumprimento do contrato, conforme permite o art. 63 do Código de Processo Civil.",
    ajustar:"Aceitamos alterar o foro para a comarca de [cidade]."},
  {id:"reajuste", nome:"Reajuste", re:/reajust|[ií]ndice|IPCA|IGP|corre[cç][aã]o monet/i,
    manter:"Mantemos o reajuste anual pelo índice previsto, que é o usual neste tipo de contrato e preserva o equilíbrio econômico durante a vigência.",
    ajustar:"Propomos usar o IPCA/IBGE, com reajuste a cada 12 meses contados da assinatura."},
  {id:"rescisao", nome:"Rescisão", re:/rescis|resili|aviso pr[eé]vio|encerramento|t[eé]rmino antecipado/i,
    manter:"Mantemos as regras de rescisão, pois o aviso prévio dá às partes tempo razoável para se reorganizar sem prejuízo.",
    ajustar:"Propomos aviso prévio de [30] dias para rescisão sem motivo, sem multa após o período mínimo de [X] meses."},
  {id:"sigilo", nome:"Confidencialidade", re:/confidencial|sigilo|\bNDA\b/i,
    manter:"Mantemos a obrigação de confidencialidade, essencial para proteger as informações trocadas durante a relação.",
    ajustar:"Aceitamos limitar o dever de sigilo a [2] anos após o término do contrato, salvo informações protegidas por lei."},
  {id:"lgpd", nome:"Dados pessoais", re:/LGPD|dados pessoais|prote[cç][aã]o de dados/i,
    manter:"Mantemos a cláusula de proteção de dados, necessária para atender à Lei Geral de Proteção de Dados (Lei 13.709/2018) e deixar claras as responsabilidades de cada parte.",
    ajustar:"Podemos detalhar o papel de cada parte (controladora e operadora), mantendo a obrigação de comunicar incidentes."},
  {id:"pagamento", nome:"Pagamento", re:/pagamento|vencimento|parcela|juros|\bmora\b|boleto/i,
    manter:"Mantemos as condições de pagamento e os encargos por atraso, que seguem os limites legais (art. 406 do Código Civil quanto aos juros de mora).",
    ajustar:"Aceitamos alterar o vencimento para o dia [X] de cada mês, mantidos os encargos por atraso."},
  {id:"responsabilidade", nome:"Responsabilidade", re:/responsabilidade|indeniza|limita[cç][aã]o|danos/i,
    manter:"Mantemos a limitação de responsabilidade, que equilibra os riscos do contrato e é compatível com o valor negociado.",
    ajustar:"Propomos limitar a responsabilidade ao valor pago nos últimos [12] meses, exceto em caso de dolo ou culpa grave."},
  {id:"garantia", nome:"Garantia", re:/garantia|fian[cç]a|cau[cç][aã]o|seguro/i,
    manter:"Mantemos a garantia prevista, que assegura o cumprimento das obrigações sem onerar demais a outra parte.",
    ajustar:"Aceitamos substituir a garantia por [seguro-fiança / caução de X meses], conforme a preferência da outra parte."},
  {id:"vigencia", nome:"Vigência", re:/vig[eê]ncia|renova[cç]|prazo contratual|prazo de dura/i,
    manter:"Mantemos o prazo de vigência proposto, adequado ao tempo necessário para executar o objeto do contrato.",
    ajustar:"Propomos vigência de [12] meses com renovação automática, salvo aviso contrário com [30] dias de antecedência."}
];
P.ACEITAR_PADRAO = "De acordo. A cláusula será ajustada conforme a sugestão.";
P.temaDe = txt => P.BIBLIOTECA.find(b=>b.re.test(txt||"")) || null;
P.refClausula = txt => { const m = String(txt||"").match(/cl[aá]usula\s+([\dIVXLC]+(?:[.\-ºª°]\s?\d+)*)/i) || String(txt||"").match(/^\s*(\d+(?:\.\d+){0,3})[.\s)\-–]/); return m ? "Cláusula "+m[1].replace(/[ºª°]/g,"") : ""; };

/* ---------- geração de PDF (jsPDF) ---------- */
const limpaPdf = s => String(s ?? "").replace(/[–—]/g,"-").replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/…/g,"...").replace(/[•]/g,"-").replace(/[^\x00-\xFF\n]/g,"");
P.pdfDisponivel = () => !!(window.jspdf && window.jspdf.jsPDF);
P.pdfNovo = function(titulo, subtitulo){
  const doc = new window.jspdf.jsPDF({unit:"pt", format:"a4"});
  const W = doc.internal.pageSize.getWidth();
  doc.setFillColor(10,10,11); doc.rect(0,0,W,84,"F");
  doc.setFillColor(207,168,86); doc.rect(0,84,W,3,"F");
  doc.setTextColor(207,168,86); doc.setFont("helvetica","bold"); doc.setFontSize(18); doc.text(limpaPdf(titulo), 40, 42);
  doc.setFont("helvetica","normal"); doc.setFontSize(10); doc.setTextColor(220,214,200);
  if(subtitulo) doc.text(limpaPdf(subtitulo), 40, 62);
  doc.setTextColor(207,168,86); doc.setFontSize(10); doc.text(limpaPdf((P.escritorio && P.escritorio.nome) || ""), W-40, 42, {align:"right"});
  doc.setTextColor(160,154,140); doc.text("Emitido em "+new Date().toLocaleDateString("pt-BR")+" às "+new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}), W-40, 62, {align:"right"});
  return {doc, y:116, W, M:40};
};
P.pdfQuebra = (ctx, h) => { const H = ctx.doc.internal.pageSize.getHeight(); if(ctx.y + h > H - 50){ ctx.doc.addPage(); ctx.y = 50; } };
P.pdfTitulo = function(ctx, txt){ P.pdfQuebra(ctx, 40); const d = ctx.doc; d.setFont("helvetica","bold"); d.setFontSize(12); d.setTextColor(25,25,25); d.text(limpaPdf(txt), ctx.M, ctx.y); d.setDrawColor(207,168,86); d.setLineWidth(1); d.line(ctx.M, ctx.y+6, ctx.M+40, ctx.y+6); ctx.y += 22; };
P.pdfTexto = function(ctx, txt, opt={}){
  const d = ctx.doc; d.setFont("helvetica", opt.bold?"bold":"normal"); d.setFontSize(opt.size||10); d.setTextColor(...(opt.cor||[40,40,40]));
  const linhas = d.splitTextToSize(limpaPdf(txt), ctx.W - ctx.M*2);
  linhas.forEach(l=>{ P.pdfQuebra(ctx, 14); d.text(l, ctx.M, ctx.y); ctx.y += (opt.size||10)*1.45; });
  ctx.y += opt.after ?? 6;
};
P.pdfCampos = function(ctx, pares){
  const d = ctx.doc, col = (ctx.W - ctx.M*2)/3; let i = 0;
  pares.forEach(([k,v])=>{ const x = ctx.M + (i%3)*col; if(i%3===0){ P.pdfQuebra(ctx, 34); }
    d.setFont("helvetica","normal"); d.setFontSize(8); d.setTextColor(140,134,120); d.text(limpaPdf(k).toUpperCase(), x, ctx.y);
    d.setFont("helvetica","bold"); d.setFontSize(10); d.setTextColor(30,30,30); d.text(d.splitTextToSize(limpaPdf(v||"-"), col-10)[0], x, ctx.y+13);
    i++; if(i%3===0) ctx.y += 32; });
  if(i%3!==0) ctx.y += 32; ctx.y += 4;
};
P.pdfTabela = function(ctx, head, body, opt={}){
  ctx.doc.autoTable({startY: ctx.y, head:[head.map(limpaPdf)], body: body.map(r=>r.map(limpaPdf)), theme:"grid", margin:{left:ctx.M, right:ctx.M},
    headStyles:{fillColor:[18,18,19], textColor:[207,168,86], fontStyle:"bold", fontSize:8.5}, styles:{fontSize:8.8, cellPadding:5, lineColor:[225,222,214], textColor:[35,35,35], valign:"top"},
    alternateRowStyles:{fillColor:[250,248,243]}, columnStyles: opt.colunas || {}});
  ctx.y = ctx.doc.lastAutoTable.finalY + 18;
};
P.pdfSalvar = function(ctx, nome){
  const d = ctx.doc, n = d.internal.getNumberOfPages(), H = d.internal.pageSize.getHeight();
  for(let i=1;i<=n;i++){ d.setPage(i); d.setFontSize(8); d.setTextColor(150,150,150); d.text("Pauta Jurídica · página "+i+" de "+n, ctx.W/2, H-24, {align:"center"}); }
  P.baixar(nome, d.output("blob"));
};
let _dl;
P.baixar = async function(nome, blob){
  try{
    if(_dl===undefined) _dl = window.claude && window.claude.use ? await window.claude.use("downloads") : null;
    if(_dl){ const r = await _dl.save({filename:nome, data:blob}); if(r && r.status==="saved") P.toast("PDF salvo"); return; }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = nome; document.body.appendChild(a); a.click(); a.remove(); P.toast("PDF gerado");
  }catch(e){ if(e && e.code==="cancelled") return; P.toast("Não foi possível salvar o PDF aqui."); }
};
/* markdown simples para respostas da IA */
P.md = function(t){
  if(!t) return "";
  const inl = s => P.esc(s).replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|[^*])\*([^*\s][^*]*)\*/g,"$1<i>$2</i>");
  const out = []; let lista = null; const fecha = () => { if(lista){ out.push(`</${lista}>`); lista = null; } };
  String(t).split(/\n/).forEach(l=>{ let m;
    if((m = l.match(/^\s*#{1,4}\s+(.*)/))){ fecha(); out.push(`<h4>${inl(m[1])}</h4>`); }
    else if((m = l.match(/^\s*[-*•]\s+(.*)/))){ if(lista!=="ul"){ fecha(); out.push("<ul>"); lista="ul"; } out.push(`<li>${inl(m[1])}</li>`); }
    else if((m = l.match(/^\s*\d+[.)]\s+(.*)/))){ if(lista!=="ol"){ fecha(); out.push("<ol>"); lista="ol"; } out.push(`<li>${inl(m[1])}</li>`); }
    else if((m = l.match(/^\s*>\s?(.*)/))){ fecha(); out.push(`<blockquote>${inl(m[1])}</blockquote>`); }
    else if(!l.trim()) fecha(); else { fecha(); out.push(`<p>${inl(l)}</p>`); } });
  fecha(); return out.join("");
};
})();
