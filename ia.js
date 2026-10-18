/* Pauta Jurídica · IA (Claude da própria conta de quem usa, pelo artefato) e aparência */
(function(){
"use strict";
const P = window.Pauta;
P.temIA = () => !!(window.PAUTA_CONFIG && window.PAUTA_CONFIG.ia);

/* ---------- IA ---------- */
let _s;
P.ia = async function(){ if(!P.temIA()) return null; if(_s!==undefined) return _s; try{ _s = window.claude && window.claude.use ? await window.claude.use("sample") : null; }catch(e){ _s = null; } return _s; };
P.erroIA = function(e){
  const c = e && e.code;
  if(c==="not_granted") return "A IA precisa da sua permissão. Recarregue a página e aceite o pedido para usar.";
  if(c==="rate_limited") return "Muitas consultas seguidas. Aguarde um minuto e tente de novo.";
  if(c==="prompt_too_large") return "O texto é grande demais para uma análise só. Divida o documento em partes.";
  if(c==="invalid_json") return "A resposta veio fora do formato esperado. Tente de novo.";
  if(c==="refused") return "A IA não respondeu a este pedido. Reformule a pergunta.";
  return "Não foi possível usar a IA agora. Tente de novo em instantes.";
};
P.SEM_INVENTAR = "Nunca invente números de processos, súmulas, temas repetitivos, artigos ou julgados. Cite apenas dispositivos legais e súmulas que você tem certeza que existem e dizem o que você afirma; se não tiver certeza, descreva o entendimento sem número e recomende conferir na fonte oficial. Responda em português do Brasil.";

/* conversa com streaming; onText recebe o texto inteiro a cada atualização */
P.iaConversar = async function(mensagens, onText, tier){
  const s = await P.ia(); if(!s){ const e = new Error("sem IA"); e.code = "indisponivel"; throw e; }
  const r = await s(mensagens, {cache:false, modelTier:tier||"default", onText:({text})=>onText && onText(text)});
  return r.text;
};
P.iaJson = async function(prompt, tier){
  const s = await P.ia(); if(!s){ const e = new Error("sem IA"); e.code = "indisponivel"; throw e; }
  return s.json(prompt, {modelTier:tier||"complex"});
};

P.PROMPT_GERAL = `Você é um assistente jurídico para advogados e estudantes de Direito no Brasil. Responda de forma direta e prática, em markdown simples (títulos curtos e listas). Estrutura sugerida: resposta em 1 a 2 frases; "Fundamentos" (lei aplicável); "Na prática" (passos, prazos, documentos); "Atenção" (riscos e divergências). ${P.SEM_INVENTAR} Não peça nem trate dados pessoais de clientes: se o usuário colar dados sensíveis, oriente a anonimizar.`;

P.iaMinuta = async function({itens, texto, lado, quem, tom}){
  const lista = itens.map((i,n)=>`[${n}] ${i.ref?i.ref+" — ":""}${i.tipo}${i.autor?" de "+i.autor:""}: ${i.comentario}${i.trecho?`\n    Trecho: "${i.trecho.slice(0,600)}"`:""}`).join("\n");
  const prompt = `Você é advogado(a) brasileiro(a) sênior em contratos. Recebemos de volta uma minuta com comentários.
Representamos: ${lado||"não informado (deduza pelo contexto)"}.
Quem comentou: ${quem==="contraparte" ? "a outra parte (negociar: aceitar o razoável, contrapropor um meio-termo ou manter com justificativa)" : "o nosso próprio cliente (orientar com clareza: aceitar o razoável, ajustar o que dá para melhorar e explicar em linguagem simples por que certas cláusulas protegem o cliente)"}.
Tom: ${tom||"equilibrado"}.
Para CADA item numerado abaixo decida "aceitar", "ajustar" ou "manter" e escreva a resposta pronta para enviar. ${P.SEM_INVENTAR}
Devolva SOMENTE JSON: {"resumo":"2 a 3 frases com a visão geral e os pontos mais sensíveis","itens":[{"i":0,"posicao":"aceitar|ajustar|manter","risco":"baixo|médio|alto","resposta":"texto pronto","redacao":"nova redação completa da cláusula quando posicao=ajustar, senão vazio","fundamento":"base legal ou comercial curta, ou vazio"}]}

<itens>
${lista}
</itens>

<minuta>
${String(texto||"").slice(0,50000) || "(texto completo não disponível)"}
</minuta>`;
  return P.iaJson(prompt, "complex");
};

P.iaInterpretar = async function(texto, contexto){
  const prompt = `Você é advogado(a) brasileiro(a) experiente. Leia o documento abaixo (intimação, decisão, sentença, petição ou contrato) e explique para a equipe do escritório. ${P.SEM_INVENTAR}
${contexto?`Contexto: ${contexto}\n`:""}Devolva SOMENTE JSON:
{"tipo":"Sentença|Decisão|Despacho|Citação|Intimação|Acórdão|Petição|Contrato|Outro",
 "resumo":"o que o documento diz, em 3 a 5 frases simples",
 "para_o_cliente":"explicação em linguagem leiga, 2 a 4 frases, sem jargão, pronta para mandar ao cliente",
 "prazos":[{"descricao":"o que precisa ser feito","dias":15,"contagem":"uteis|corridos|desconhecida","data_base":"AAAA-MM-DD ou vazio","fundamento":"curto"}],
 "audiencias":[{"data":"AAAA-MM-DD","hora":"HH:MM ou vazio","modalidade":"Presencial|Virtual|vazio","descricao":"tipo da audiência"}],
 "providencias":["próximos passos práticos para o advogado"],
 "riscos":["pontos de atenção"],
 "valores":["valores citados com o que representam"]}

<documento>
${String(texto||"").slice(0,60000)}
</documento>`;
  return P.iaJson(prompt, "complex");
};

P.iaParaCliente = async function(texto, onText){
  return P.iaConversar(`Reescreva a mensagem abaixo para o cliente de um escritório de advocacia: linguagem simples, cordial, sem juridiquês, sem prometer resultado, mantendo todos os fatos, datas e números exatamente como estão. Não acrescente informações. Devolva só a mensagem final, sem comentários.\n\n<mensagem>\n${texto}\n</mensagem>`, onText, "default");
};

/* ---------- aparência ---------- */
P.FUNDOS = {
  preto:{nome:"Preto", escuro:true, t:{bg:"#09090a",surface:"#121213","surface-2":"#18181a","surface-3":"#212124",ink:"#f3eee3",muted:"#a39b8b",line:"#252528","line-strong":"#36363b",rail:"#050505"}},
  grafite:{nome:"Grafite", escuro:true, t:{bg:"#15171b",surface:"#1c1f24","surface-2":"#22262c","surface-3":"#2b2f36",ink:"#eef0f3",muted:"#9ca3ae",line:"#2d3139","line-strong":"#3b414b",rail:"#0e1013"}},
  marinho:{nome:"Marinho", escuro:true, t:{bg:"#0a1020",surface:"#101a2e","surface-2":"#152139","surface-3":"#1c2a47",ink:"#edf1fa",muted:"#93a0bd",line:"#22304d","line-strong":"#304066",rail:"#060b17"}},
  claro:{nome:"Claro", escuro:false, t:{bg:"#f4f2ed",surface:"#ffffff","surface-2":"#f8f6f1","surface-3":"#ece8df",ink:"#17150f",muted:"#686253",line:"#e3ded2","line-strong":"#cdc5b4",rail:"#14120d",
    danger:"#c0362a","danger-soft":"#fbe7e4",warn:"#a35a06","warn-soft":"#fbefd9",ok:"#1d7a4d","ok-soft":"#e0f2e8",trab:"#b4581b","trab-soft":"#fbeadf",civ:"#2f4fb8","civ-soft":"#e5eafb",crim:"#a32d6e","crim-soft":"#f8e4ef"}}
};
P.DESTAQUES = {
  dourado:{nome:"Dourado", c:"#cfa856", hi:"#f0d38f", deep:"#8c6d2c"},
  champanhe:{nome:"Champanhe", c:"#d6bf98", hi:"#f3e6cf", deep:"#8f7a55"},
  cobre:{nome:"Cobre", c:"#d27a4a", hi:"#f2b48f", deep:"#8f4a26"},
  esmeralda:{nome:"Esmeralda", c:"#3fb68b", hi:"#8be0bf", deep:"#1f7a5a"},
  safira:{nome:"Safira", c:"#5b8def", hi:"#a9c4ff", deep:"#2f55a8"},
  rubi:{nome:"Rubi", c:"#e0566f", hi:"#f5a3b2", deep:"#9c2a40"},
  prata:{nome:"Prata", c:"#b8bec8", hi:"#e6e9ee", deep:"#6f7680"}
};
P.ESTILOS = {
  moderno:{nome:"Moderno", display:'"Familjen Grotesk", "Helvetica Neue", Arial, sans-serif', body:'"Onest", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'},
  classico:{nome:"Clássico", display:'"Cormorant Garamond", Georgia, "Times New Roman", serif', body:'"Onest", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'},
  tecnico:{nome:"Técnico", display:'"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif', body:'"IBM Plex Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'}
};
P.TEMA_PADRAO = {fundo:"preto", destaque:"dourado", estilo:"moderno", cantos:"arredondados", densidade:"confortavel"};
P.tema = Object.assign({}, P.TEMA_PADRAO);
P.aplicarTema = function(t){
  P.tema = Object.assign({}, P.TEMA_PADRAO, t||{});
  const r = document.documentElement, f = P.FUNDOS[P.tema.fundo] || P.FUNDOS.preto, a = P.DESTAQUES[P.tema.destaque] || P.DESTAQUES.dourado, e = P.ESTILOS[P.tema.estilo] || P.ESTILOS.moderno;
  ["danger","danger-soft","warn","warn-soft","ok","ok-soft","trab","trab-soft","civ","civ-soft","crim","crim-soft"].forEach(k=>r.style.removeProperty("--"+k));
  Object.entries(f.t).forEach(([k,v])=>r.style.setProperty("--"+k, v));
  r.style.setProperty("--gold", f.escuro ? a.c : a.deep);
  r.style.setProperty("--gold-hi", f.escuro ? a.hi : a.deep);
  r.style.setProperty("--gold-deep", a.deep);
  r.style.setProperty("--gold-btn", a.c); r.style.setProperty("--gold-btn-hi", a.hi);
  r.style.setProperty("--f-display", e.display); r.style.setProperty("--f-body", e.body);
  r.style.colorScheme = f.escuro ? "dark" : "light";
  r.dataset.fundo = f.escuro ? "escuro" : "claro"; r.dataset.cantos = P.tema.cantos; r.dataset.densidade = P.tema.densidade; r.dataset.estilo = P.tema.estilo;
  const meta = document.querySelector('meta[name="theme-color"]'); if(meta) meta.content = f.t.bg;
};
P.carregarTemaLocal = function(){ try{ const s = localStorage.getItem("pauta-tema"); return s ? JSON.parse(s) : null; }catch(e){ return null; } };
P.salvarTemaLocal = function(t){ try{ localStorage.setItem("pauta-tema", JSON.stringify(t)); }catch(e){} };
P.aplicarTema(P.carregarTemaLocal());
})();
