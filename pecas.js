/* Meu Escritório · peças, contratos, procurações e checklists (sem IA, tudo no navegador)
   Os textos são modelos de partida: o advogado revisa, ajusta e assina. */
(function(P){
"use strict";
const e = s => String(s ?? "").replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const F = s => `<span class="preencher">[${e(s)}]</span>`;
const val = (v, rot) => v && String(v).trim() ? e(v) : F(rot);

/* ---------------- CHECKLISTS DE DOCUMENTOS POR AÇÃO ---------------- */
P.CHECKLISTS = {
  trab_reclamatoria:{area:"trabalhista", nome:"Reclamação trabalhista", itens:["RG e CPF","Comprovante de residência","Procuração assinada","Declaração de hipossuficiência assinada","Carteira de trabalho (física ou digital)","Holerites / contracheques","Termo de rescisão (TRCT) e guias","Extrato do FGTS","Cartões de ponto ou registros de jornada","Contrato de trabalho e aditivos","Mensagens, e-mails ou provas do caso","Nomes e contatos das testemunhas"]},
  trab_acidente:{area:"trabalhista", nome:"Acidente ou doença do trabalho", itens:["RG e CPF","Comprovante de residência","Procuração assinada","Carteira de trabalho","CAT (Comunicação de Acidente de Trabalho)","Atestados, exames e laudos médicos","Comunicações do INSS (benefício)","Holerites","Fotos do local ou do acidente","Nomes e contatos das testemunhas"]},
  civ_consumidor:{area:"civel", nome:"Indenizatória · consumidor", itens:["RG e CPF","Comprovante de residência","Procuração assinada","Declaração de hipossuficiência (se pedir gratuidade)","Nota fiscal ou comprovante da compra","Contrato, oferta ou publicidade","Protocolo do atendimento","Prints da conversa com a empresa","Fotos ou vídeos do problema","Comprovantes de gastos (danos materiais)","Reclamação no Procon ou consumidor.gov.br (se houver)"]},
  civ_cobranca:{area:"civel", nome:"Ação de cobrança", itens:["Documentos pessoais ou contrato social (empresa)","Procuração assinada","Contrato, nota, cheque ou outro título","Comprovantes da entrega ou do serviço","Notificações e cobranças já enviadas","Planilha do débito atualizado"]},
  civ_divorcio:{area:"civel", nome:"Divórcio", itens:["RG e CPF","Certidão de casamento atualizada","Certidão de nascimento dos filhos","Comprovante de residência","Comprovantes de renda","Documentos dos bens (matrículas, veículos, extratos)","Pacto antenupcial (se houver)","Procuração assinada"]},
  civ_alimentos:{area:"civel", nome:"Alimentos (pensão)", itens:["Certidão de nascimento da criança","RG e CPF do representante","Comprovante de residência","Comprovantes de despesas da criança (escola, saúde, alimentação)","Informações sobre a renda de quem vai pagar","Procuração assinada","Declaração de hipossuficiência"]},
  civ_inventario:{area:"civel", nome:"Inventário", itens:["Certidão de óbito","Documentos pessoais do falecido","Documentos e certidões dos herdeiros","Certidão de casamento do falecido","Certidão de testamento (CENSEC)","Matrículas dos imóveis","Extratos bancários e investimentos","Documentos dos veículos","Certidões negativas de débitos","Procuração assinada"]},
  crim_defesa:{area:"criminal", nome:"Defesa criminal", itens:["RG e CPF","Comprovante de residência","Comprovante de trabalho ou ocupação","Certidões de antecedentes","Cópia do inquérito ou da denúncia","Boletim de ocorrência","Documentos que ajudam a defesa (álibi, recibos, mensagens)","Nomes e contatos das testemunhas","Procuração assinada"]}
};

/* ---------------- TESES (modelos de fundamentação) ---------------- */
P.TESES = [
  // trabalhista
  {id:"t_gratuidade_trab", area:"trabalhista", titulo:"Justiça gratuita", fundamento:"CLT, art. 790, §§ 3º e 4º; CPC, art. 99, § 3º",
   texto:"O(A) Reclamante não tem condições de arcar com as custas do processo sem prejuízo do próprio sustento e de sua família, conforme declaração anexa, razão pela qual requer os benefícios da justiça gratuita.",
   pedido:"a concessão dos benefícios da justiça gratuita"},
  {id:"t_verbas", area:"trabalhista", titulo:"Verbas rescisórias", fundamento:"CLT, arts. 477 e 487; Lei 8.036/90, art. 18",
   texto:"Dispensado(a) sem justa causa, o(a) Reclamante não recebeu corretamente as verbas rescisórias devidas, como saldo de salário, aviso prévio proporcional, 13º salário proporcional, férias vencidas e proporcionais acrescidas de 1/3 e a indenização de 40% sobre os depósitos do FGTS. O pagamento fora do prazo de 10 dias também gera a multa do art. 477, § 8º, da CLT.",
   pedido:"o pagamento das verbas rescisórias não quitadas, com a multa do art. 477, § 8º, da CLT"},
  {id:"t_horas", area:"trabalhista", titulo:"Horas extras", fundamento:"CF, art. 7º, XIII e XVI; CLT, arts. 58, 59 e 74, § 2º; Súmula 338 do TST",
   texto:"O(A) Reclamante cumpria jornada superior ao limite legal de 8 horas diárias e 44 semanais, sem o correto pagamento das horas extras com o adicional mínimo de 50%. Cabe ao empregador com mais de 20 empregados manter o registro de jornada; a ausência ou invalidade dos controles faz presumir verdadeira a jornada alegada.",
   pedido:"o pagamento das horas extras excedentes à 8ª diária e à 44ª semanal, com adicional de 50% e reflexos"},
  {id:"t_intervalo", area:"trabalhista", titulo:"Intervalo para refeição suprimido", fundamento:"CLT, art. 71, caput e § 4º",
   texto:"Embora trabalhasse mais de 6 horas por dia, o(a) Reclamante não usufruía integralmente do intervalo mínimo de 1 hora, sendo devido o pagamento do período suprimido com acréscimo de 50%.",
   pedido:"o pagamento do intervalo intrajornada suprimido, com acréscimo de 50%"},
  {id:"t_insalubridade", area:"trabalhista", titulo:"Adicional de insalubridade", fundamento:"CLT, arts. 189, 192 e 195",
   texto:"O(A) Reclamante trabalhava exposto(a) a agentes nocivos à saúde sem a devida neutralização, fazendo jus ao adicional de insalubridade, a ser apurado em perícia técnica.",
   pedido:"o pagamento do adicional de insalubridade em grau a ser apurado em perícia, com reflexos"},
  {id:"t_fgts", area:"trabalhista", titulo:"Depósitos de FGTS em atraso", fundamento:"Lei 8.036/90, arts. 15 e 18",
   texto:"Os depósitos do FGTS não foram realizados de forma regular durante o contrato, conforme extrato anexo, devendo o empregador recolher as diferenças com a indenização de 40%.",
   pedido:"o recolhimento das diferenças de FGTS e da indenização de 40%"},
  {id:"t_honor_trab", area:"trabalhista", titulo:"Honorários de sucumbência", fundamento:"CLT, art. 791-A",
   texto:"São devidos honorários de sucumbência entre 5% e 15% sobre o valor que resultar da liquidação da sentença.",
   pedido:"a condenação da Reclamada em honorários de sucumbência de 15%"},
  // cível / consumidor
  {id:"c_consumo", area:"civel", titulo:"Relação de consumo e responsabilidade objetiva", fundamento:"CDC, arts. 2º, 3º e 14",
   texto:"A relação entre as partes é de consumo: o(a) Autor(a) é destinatário(a) final do produto ou serviço, e a Ré atua como fornecedora. Assim, a Ré responde pelos danos causados independentemente de culpa, bastando a demonstração do defeito, do dano e do nexo entre eles.",
   pedido:""},
  {id:"c_inversao", area:"civel", titulo:"Inversão do ônus da prova", fundamento:"CDC, art. 6º, VIII",
   texto:"As alegações são verossímeis e o(a) consumidor(a) é tecnicamente hipossuficiente frente à fornecedora, que detém os registros e informações do atendimento. Requer a inversão do ônus da prova.",
   pedido:"a inversão do ônus da prova"},
  {id:"c_oferta", area:"civel", titulo:"Força vinculante da oferta e publicidade enganosa", fundamento:"CDC, arts. 30, 35 e 37",
   texto:"Toda informação ou publicidade suficientemente precisa obriga o fornecedor e integra o contrato. A Ré anunciou condição que não cumpriu, o que caracteriza publicidade enganosa e autoriza o consumidor a exigir o cumprimento da oferta ou a restituição dos valores, com perdas e danos.",
   pedido:"o cumprimento da oferta ou a restituição dos valores pagos, com perdas e danos"},
  {id:"c_solidaria", area:"civel", titulo:"Responsabilidade solidária da cadeia de fornecimento", fundamento:"CDC, arts. 7º, parágrafo único, e 25, § 1º",
   texto:"Todos os que participam da cadeia de fornecimento e auferem proveito econômico com a operação respondem solidariamente pelos danos causados ao consumidor.",
   pedido:"a condenação solidária das Rés"},
  {id:"c_moral", area:"civel", titulo:"Dano moral", fundamento:"CF, art. 5º, V e X; CC, arts. 186 e 927; CDC, art. 6º, VI",
   texto:"A conduta da Ré ultrapassou o mero aborrecimento: frustrou a legítima expectativa do(a) Autor(a), exigiu inúmeras tentativas de solução sem êxito e causou abalo que merece reparação, com caráter compensatório e pedagógico.",
   pedido:"a condenação ao pagamento de indenização por danos morais"},
  {id:"c_material", area:"civel", titulo:"Dano material", fundamento:"CC, arts. 402 e 944; CDC, art. 6º, VI",
   texto:"O(A) Autor(a) suportou prejuízos materiais comprovados pelos documentos anexos, que devem ser integralmente ressarcidos, com correção monetária e juros.",
   pedido:"a condenação ao ressarcimento dos danos materiais comprovados, com correção e juros"},
  {id:"c_tutela", area:"civel", titulo:"Tutela de urgência", fundamento:"CPC, art. 300",
   texto:"Há probabilidade do direito, demonstrada pelos documentos anexos, e perigo de dano, pois a demora agrava o prejuízo do(a) Autor(a). A medida é reversível. Requer a concessão de tutela de urgência.",
   pedido:"a concessão de tutela de urgência, liminarmente"},
  {id:"c_gratuidade", area:"civel", titulo:"Justiça gratuita", fundamento:"CPC, arts. 98 e 99, § 3º",
   texto:"O(A) Autor(a) não pode arcar com as custas e despesas processuais sem prejuízo do próprio sustento, conforme declaração anexa, presumida verdadeira para a pessoa natural.",
   pedido:"a concessão dos benefícios da justiça gratuita"},
  {id:"c_cobranca", area:"civel", titulo:"Inadimplemento e cobrança", fundamento:"CC, arts. 389, 394 e 395",
   texto:"A Ré deixou de pagar a quantia devida no vencimento, conforme documentos anexos, constituindo-se em mora e respondendo pelo valor principal, correção monetária, juros e honorários.",
   pedido:"a condenação ao pagamento do débito, com correção monetária e juros de mora"},
  // defesas e recursos
  {id:"c_preliminares", area:"civel", titulo:"Preliminares", fundamento:"CPC, art. 337",
   texto:"Antes do mérito, a Ré aponta questões preliminares que impedem o exame do pedido: [indicar, por exemplo, ilegitimidade de parte, inépcia da inicial, incompetência, falta de interesse de agir ou prescrição], conforme se demonstra.",
   pedido:"o acolhimento das preliminares, com a extinção do processo sem resolução do mérito"},
  {id:"c_impugna_gratuidade", area:"civel", titulo:"Impugnação à justiça gratuita", fundamento:"CPC, art. 100",
   texto:"A parte autora não comprovou a insuficiência de recursos alegada, e há elementos nos autos que indicam capacidade financeira para arcar com as custas do processo.",
   pedido:"a revogação da gratuidade de justiça concedida à parte autora"},
  {id:"c_aborrecimento", area:"civel", titulo:"Ausência de dano moral (mero aborrecimento)", fundamento:"CF, art. 5º, X; CC, arts. 186 e 927",
   texto:"Os fatos narrados configuram, no máximo, aborrecimento do cotidiano, sem prova de ofensa a direito da personalidade, o que não gera dever de indenizar.",
   pedido:"a improcedência do pedido de indenização por danos morais"},
  {id:"c_onus_autor", area:"civel", titulo:"Ônus da prova da parte autora", fundamento:"CPC, art. 373, I",
   texto:"Cabe à parte autora provar o fato constitutivo do seu direito, o que não ocorreu: os documentos juntados não demonstram as alegações da inicial.",
   pedido:"a improcedência dos pedidos"},
  {id:"c_replica", area:"civel", titulo:"Impugnação aos argumentos da defesa", fundamento:"CPC, arts. 350 e 351",
   texto:"As alegações da contestação não afastam os fatos e fundamentos da inicial. Os documentos juntados pela parte contrária não comprovam o que foi alegado e, em parte, até confirmam a versão do(a) Autor(a).",
   pedido:"a rejeição das preliminares e a procedência integral dos pedidos iniciais"},
  {id:"c_recurso_admissivel", area:"civel", titulo:"Tempestividade e preparo", fundamento:"CPC, arts. 1.003, § 5º, e 1.007",
   texto:"O recurso é tempestivo, interposto dentro do prazo de 15 dias úteis, e o preparo foi recolhido conforme guia anexa (ou a parte é beneficiária da justiça gratuita).",
   pedido:"o conhecimento do recurso"},
  {id:"c_reforma", area:"civel", titulo:"Razões para reformar a sentença", fundamento:"CPC, art. 1.010",
   texto:"A sentença merece reforma, pois [indicar o ponto da decisão] não considerou corretamente as provas e o direito aplicável, conforme se demonstra a seguir.",
   pedido:"o provimento do recurso, para reformar a sentença"},
  {id:"t_prescricao", area:"trabalhista", titulo:"Prescrição quinquenal", fundamento:"CF, art. 7º, XXIX; CLT, art. 11",
   texto:"Estão prescritas as pretensões relativas ao período anterior aos cinco anos contados do ajuizamento da ação.",
   pedido:"a pronúncia da prescrição quinquenal, com a extinção dos pedidos anteriores a esse marco"},
  {id:"t_jornada_ok", area:"trabalhista", titulo:"Jornada registrada e paga", fundamento:"CLT, arts. 59 e 74, § 2º",
   texto:"A jornada do(a) Reclamante foi registrada em controles de ponto válidos, e as horas extras eventualmente prestadas foram pagas ou compensadas, conforme documentos anexos.",
   pedido:"a improcedência do pedido de horas extras e reflexos"},
  {id:"t_quitacao", area:"trabalhista", titulo:"Verbas rescisórias pagas", fundamento:"CLT, art. 477",
   texto:"As verbas rescisórias foram pagas no prazo legal, conforme termo de rescisão e comprovante de pagamento anexos.",
   pedido:"a improcedência dos pedidos de verbas rescisórias e da multa do art. 477 da CLT"},
  {id:"t_recurso_admissivel", area:"trabalhista", titulo:"Tempestividade e preparo", fundamento:"CLT, arts. 895 e 899",
   texto:"O recurso é tempestivo, interposto no prazo de 8 dias úteis, com depósito recursal e custas recolhidos quando devidos, conforme guias anexas.",
   pedido:"o conhecimento do recurso ordinário"},
  {id:"t_reforma", area:"trabalhista", titulo:"Razões para reformar a sentença", fundamento:"CLT, art. 895, I",
   texto:"A sentença merece reforma, pois [indicar o ponto da decisão] não considerou corretamente a prova produzida e a legislação aplicável, conforme se demonstra.",
   pedido:"o provimento do recurso, para reformar a sentença"},
  // criminal
  {id:"p_inepcia", area:"criminal", titulo:"Inépcia da denúncia", fundamento:"CPP, arts. 41 e 395, I",
   texto:"A denúncia não descreve de forma individualizada a conduta atribuída ao(à) Acusado(a), o que impede o exercício da ampla defesa e impõe a sua rejeição.",
   pedido:"a rejeição da denúncia por inépcia"},
  {id:"p_absolvicao", area:"criminal", titulo:"Absolvição sumária", fundamento:"CPP, art. 397",
   texto:"Os elementos dos autos demonstram, de plano, causa que afasta a responsabilidade penal do(a) Acusado(a), autorizando a absolvição sumária.",
   pedido:"a absolvição sumária do(a) Acusado(a)"},
  {id:"p_preventiva", area:"criminal", titulo:"Ausência dos requisitos da preventiva", fundamento:"CPP, arts. 312, 313 e 315",
   texto:"Não há fundamentos concretos que demonstrem perigo gerado pelo estado de liberdade do(a) Acusado(a), que é primário(a), tem residência fixa e ocupação lícita. A gravidade abstrata do delito não justifica a prisão.",
   pedido:"a revogação da prisão preventiva"},
  {id:"p_cautelares", area:"criminal", titulo:"Medidas cautelares diversas da prisão", fundamento:"CPP, arts. 282, § 6º, e 319",
   texto:"Ainda que se entenda necessária alguma cautela, as medidas do art. 319 do CPP são suficientes e adequadas ao caso, devendo a prisão ser a última opção.",
   pedido:"subsidiariamente, a substituição da prisão por medidas cautelares diversas"},
  {id:"p_testemunhas", area:"criminal", titulo:"Produção de provas e rol de testemunhas", fundamento:"CPP, art. 396-A",
   texto:"A defesa requer a produção de todas as provas admitidas em direito e apresenta o rol de testemunhas abaixo, para intimação.",
   pedido:"a produção de provas e a intimação das testemunhas arroladas"}
];

/* ---------------- MODELOS DE PEÇA ---------------- */
P.MODELOS_PECA = {
  trab_reclamatoria:{area:"trabalhista", nome:"Reclamação trabalhista", acao:"RECLAMAÇÃO TRABALHISTA", juizo:"EXCELENTÍSSIMO(A) SENHOR(A) JUIZ(A) DO TRABALHO DA ___ VARA DO TRABALHO DE {cidade}", autor:"Reclamante", reu:"Reclamada", verbo:"propor a presente", teses:["t_gratuidade_trab","t_verbas","t_horas","t_honor_trab"], pedidosFixos:["a notificação da Reclamada para comparecer à audiência e apresentar defesa, sob pena de revelia e confissão","a procedência dos pedidos, com valores apurados em liquidação, acrescidos de juros e correção monetária","a produção de todas as provas admitidas em direito, especialmente depoimento pessoal, testemunhas e perícia"], liquidos:true},
  civ_consumidor:{area:"civel", nome:"Indenizatória · consumidor", acao:"AÇÃO INDENIZATÓRIA POR DANOS MORAIS E MATERIAIS", juizo:"EXCELENTÍSSIMO(A) SENHOR(A) JUIZ(A) DE DIREITO DA ___ VARA CÍVEL / JUIZADO ESPECIAL CÍVEL DA COMARCA DE {cidade}", autor:"Autor(a)", reu:"Ré", verbo:"propor a presente", teses:["c_consumo","c_inversao","c_moral","c_material"], pedidosFixos:["a citação da Ré para, querendo, apresentar defesa","a condenação da Ré ao pagamento das custas processuais e honorários advocatícios","a produção de todas as provas admitidas em direito"]},
  civ_cobranca:{area:"civel", nome:"Ação de cobrança", acao:"AÇÃO DE COBRANÇA", juizo:"EXCELENTÍSSIMO(A) SENHOR(A) JUIZ(A) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE {cidade}", autor:"Autor(a)", reu:"Ré", verbo:"propor a presente", teses:["c_cobranca"], pedidosFixos:["a citação da Ré para pagar ou apresentar defesa","a condenação da Ré ao pagamento das custas e honorários advocatícios","a produção de todas as provas admitidas em direito"]},
  civ_obrigacao:{area:"civel", nome:"Obrigação de fazer com tutela de urgência", acao:"AÇÃO DE OBRIGAÇÃO DE FAZER COM PEDIDO DE TUTELA DE URGÊNCIA", juizo:"EXCELENTÍSSIMO(A) SENHOR(A) JUIZ(A) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE {cidade}", autor:"Autor(a)", reu:"Ré", verbo:"propor a presente", teses:["c_tutela"], pedidosFixos:["a citação da Ré para cumprir a obrigação e, querendo, apresentar defesa","a fixação de multa diária para o caso de descumprimento","a condenação da Ré ao pagamento das custas e honorários advocatícios","a produção de todas as provas admitidas em direito"]},
  trab_contestacao:{area:"trabalhista", nome:"Contestação trabalhista", acao:"CONTESTAÇÃO", juizo:"EXCELENTÍSSIMO(A) SENHOR(A) JUIZ(A) DO TRABALHO DA ___ VARA DO TRABALHO DE {cidade}", autor:"Reclamada", reu:"Reclamante", verbo:"apresentar a sua", teses:["t_prescricao","t_jornada_ok","t_quitacao"], pedidosFixos:["a improcedência dos pedidos","a condenação do(a) Reclamante em honorários de sucumbência, nos termos do art. 791-A da CLT","a produção de todas as provas admitidas em direito"], intermediaria:true},
  trab_ro:{area:"trabalhista", nome:"Recurso ordinário", acao:"RECURSO ORDINÁRIO", juizo:"EXCELENTÍSSIMO(A) SENHOR(A) JUIZ(A) DO TRABALHO DA ___ VARA DO TRABALHO DE {cidade}", autor:"Recorrente", reu:"Recorrido(a)", verbo:"interpor o presente", teses:["t_recurso_admissivel","t_reforma"], pedidosFixos:["a intimação da parte contrária para contrarrazões e a remessa dos autos ao Tribunal Regional do Trabalho"], intermediaria:true},
  civ_contestacao:{area:"civel", nome:"Contestação (cível)", acao:"CONTESTAÇÃO", juizo:"EXCELENTÍSSIMO(A) SENHOR(A) JUIZ(A) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE {cidade}", autor:"Ré", reu:"Autor(a)", verbo:"apresentar a sua", teses:["c_preliminares","c_onus_autor","c_aborrecimento"], pedidosFixos:["a improcedência dos pedidos","a condenação da parte autora ao pagamento das custas e honorários advocatícios","a produção de todas as provas admitidas em direito"], intermediaria:true},
  civ_replica:{area:"civel", nome:"Réplica", acao:"RÉPLICA À CONTESTAÇÃO", juizo:"EXCELENTÍSSIMO(A) SENHOR(A) JUIZ(A) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE {cidade}", autor:"Autor(a)", reu:"Ré", verbo:"apresentar a sua", teses:["c_replica"], pedidosFixos:["a produção das provas já requeridas na inicial"], intermediaria:true},
  civ_apelacao:{area:"civel", nome:"Apelação", acao:"APELAÇÃO", juizo:"EXCELENTÍSSIMO(A) SENHOR(A) JUIZ(A) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE {cidade}", autor:"Apelante", reu:"Apelado(a)", verbo:"interpor a presente", teses:["c_recurso_admissivel","c_reforma"], pedidosFixos:["a intimação da parte contrária para contrarrazões e a remessa dos autos ao Tribunal de Justiça"], intermediaria:true},
  civ_manifestacao:{area:"civel", nome:"Manifestação (genérica)", acao:"MANIFESTAÇÃO", juizo:"EXCELENTÍSSIMO(A) SENHOR(A) JUIZ(A) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE {cidade}", autor:"Parte", reu:"Parte contrária", verbo:"apresentar a presente", teses:[], pedidosFixos:["o recebimento da presente manifestação e o prosseguimento do feito"], intermediaria:true},
  crim_resposta:{area:"criminal", nome:"Resposta à acusação", acao:"RESPOSTA À ACUSAÇÃO", juizo:"EXCELENTÍSSIMO(A) SENHOR(A) JUIZ(A) DE DIREITO DA ___ VARA CRIMINAL DA COMARCA DE {cidade}", autor:"Acusado(a)", reu:"Ministério Público", verbo:"apresentar, no prazo legal, a sua", teses:["p_inepcia","p_absolvicao","p_testemunhas"], pedidosFixos:[], defesa:true},
  crim_liberdade:{area:"criminal", nome:"Pedido de revogação da preventiva", acao:"PEDIDO DE REVOGAÇÃO DE PRISÃO PREVENTIVA", juizo:"EXCELENTÍSSIMO(A) SENHOR(A) JUIZ(A) DE DIREITO DA ___ VARA CRIMINAL DA COMARCA DE {cidade}", autor:"Acusado(a)", reu:"Ministério Público", verbo:"formular o presente", teses:["p_preventiva","p_cautelares"], pedidosFixos:["a expedição do alvará de soltura"], defesa:true}
};

/* ---------------- QUALIFICAÇÃO ---------------- */
P.qualificar = function(c){
  if(!c) return F("qualificação completa");
  const d = c.dados || {};
  if(c.tipo==="PJ") return `<b>${e((c.nome||"").toUpperCase())}</b>, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº ${val(c.doc,"CNPJ")}, com sede em ${val(d.endereco,"endereço completo")}, neste ato representada por ${val(d.representante,"representante legal")}, e-mail ${val(c.email,"e-mail")}`;
  return `<b>${e((c.nome||"").toUpperCase())}</b>, ${val(d.nacionalidade,"nacionalidade")}, ${val(d.estado_civil,"estado civil")}, ${val(d.profissao,"profissão")}, portador(a) do RG nº ${val(d.rg,"RG")}, inscrito(a) no CPF sob o nº ${val(c.doc,"CPF")}, residente e domiciliado(a) em ${val(d.endereco,"endereço completo com CEP")}, e-mail ${val(c.email,"e-mail")}`;
};
P.advogadosDoc = function(cfgDocs){
  return String((cfgDocs||{}).advogados||"").split(/\n+/).map(l=>l.trim()).filter(Boolean);
};

P.DOC_COR = "#0f2747"; P.DOC_OURO = "#c5a253";
/* ---------------- DOCUMENTO VISUAL LAW (HTML para imprimir/PDF e Word) ---------------- */
P.docVisual = function(o){
  const d = o.docs || {}, cor = /^#[0-9a-f]{6}$/i.test(d.cor||"") ? d.cor : P.DOC_COR, ouro = /^#[0-9a-f]{6}$/i.test(d.cor2||"") ? d.cor2 : P.DOC_OURO;
  const FONTES = {serif:'Georgia,"Times New Roman",serif', sans:'Arial,Helvetica,sans-serif', garamond:'Garamond,"EB Garamond","Times New Roman",serif', calibri:'Calibri,Carlito,Arial,sans-serif'};
  const fonte = FONTES[d.fonte] || FONTES.serif, tam = ({"11":"11pt","12":"12pt","13":"13pt"})[d.tamanho] || "12pt";
  const nomeEsc = e(d.nome||o.escritorio||""), marca = d.logo?`<img src="${d.logo}" alt="" style="max-height:${d.logoAltura==="grande"?76:d.logoAltura==="pequena"?40:54}px;max-width:240px">`:`<span class="marca">${nomeEsc}</span>`;
  const cab = d.cabecalho==="centro"
    ? `<div style="text-align:center">${marca}${d.logo?`<div class="topo-d" style="margin-top:4px">${nomeEsc}${d.oab?` · ${e(d.oab)}`:""}</div>`:d.oab?`<div class="topo-d">${e(d.oab)}</div>`:""}</div><div class="faixa"></div>`
    : d.cabecalho==="nenhum" ? ""
    : `<table class="topo" width="100%"><tr><td>${marca}</td><td align="right" class="topo-d">${nomeEsc}${d.oab?`<br>${e(d.oab)}`:""}</td></tr></table><div class="faixa"></div>`;
  const rod = `<div class="rodape">${d.rodape ? e(d.rodape) : [d.endereco, d.telefone, d.email].filter(Boolean).map(e).join(" · ")}</div>`;
  return `<!DOCTYPE html><html lang="pt-BR" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>${e(o.titulo||"Documento")}</title>
<style>
@page{size:A4;margin:22mm 20mm 20mm 22mm}
body{font-family:${fonte};font-size:${tam};line-height:${d.entrelinha==="1.15"?"1.35":d.entrelinha==="2"?"2":"1.6"};color:#1d1d1b;margin:0;padding:24px;background:#fff}
.doc{max-width:760px;margin:0 auto}
.topo td{vertical-align:middle;border:0;padding:0}.marca{font-family:Arial,sans-serif;font-weight:bold;font-size:15pt;color:${cor};letter-spacing:.04em}
.topo-d{font-family:Arial,sans-serif;font-size:8.5pt;color:#6b6b66}
.faixa{height:4px;background:${cor};border-bottom:2px solid ${ouro};margin:10px 0 22px}
h1{font-family:Arial,sans-serif;font-size:15pt;text-align:center;color:${cor};margin:6px 0 2px;letter-spacing:.03em}
.sub{text-align:center;font-family:Arial,sans-serif;font-size:9pt;color:${ouro};letter-spacing:.12em;text-transform:uppercase;margin-bottom:18px}
.juizo{font-weight:bold;text-transform:uppercase;margin:0 0 34px}
p{margin:0 0 12px;text-align:justify;text-indent:2.2em}
p.ni{text-indent:0}
h2{font-family:Arial,sans-serif;font-size:11pt;color:#fff;background:${cor};padding:6px 12px;margin:26px 0 12px;letter-spacing:.04em;text-transform:uppercase}
h3{font-family:Arial,sans-serif;font-size:11pt;color:${cor};margin:18px 0 8px;border-left:4px solid ${ouro};padding-left:9px}
.box{border:1px solid #d9d2c3;background:#f7f3ea;padding:12px 14px;margin:12px 0 16px}
.box b.t{display:block;font-family:Arial,sans-serif;font-size:8.5pt;letter-spacing:.12em;text-transform:uppercase;color:${ouro};margin-bottom:4px}
.partes{width:100%;border-collapse:collapse;margin:8px 0 16px}.partes td{width:50%;vertical-align:top;border:1px solid #d9d2c3;padding:10px 12px;font-size:10.5pt;line-height:1.45}
.partes .r{font-family:Arial,sans-serif;font-size:8pt;letter-spacing:.12em;text-transform:uppercase;color:${ouro};display:block;margin-bottom:4px}
.fund{font-family:Arial,sans-serif;font-size:8.5pt;color:${cor};background:#eef2f8;border-left:3px solid ${cor};padding:5px 10px;margin:-4px 0 14px}
.crono{width:100%;border-collapse:collapse;margin:8px 0 16px;font-size:10.5pt}.crono td{border-bottom:1px solid #e3ddcf;padding:6px 8px;vertical-align:top}
.crono td.dt{width:110px;font-family:Arial,sans-serif;font-weight:bold;color:#fff;background:${cor};text-align:center;white-space:nowrap}
.ped{margin:0 0 14px;padding-left:22px}.ped li{margin:0 0 6px;text-align:justify}
.tab{width:100%;border-collapse:collapse;margin:8px 0 16px;font-size:10.5pt}.tab th{background:${cor};color:#fff;font-family:Arial,sans-serif;font-size:9pt;text-align:left;padding:6px 8px}.tab td{border-bottom:1px solid #e3ddcf;padding:6px 8px}
.cards{width:100%;border-collapse:separate;border-spacing:8px 0;margin:6px 0 16px}.cards td{background:${cor};color:#fff;text-align:center;padding:10px 6px;font-family:Arial,sans-serif;font-size:8.5pt;letter-spacing:.06em;text-transform:uppercase}.cards td b{display:block;font-size:12.5pt;letter-spacing:0;text-transform:none;margin-top:3px}
.passos{width:100%;border-collapse:collapse;margin:4px 0 18px}.passos td{text-align:center;font-family:Arial,sans-serif;font-size:8.5pt;color:#555;padding:4px}.passos .n{display:inline-block;width:22px;height:22px;line-height:22px;border-radius:50%;background:${ouro};color:#fff;font-weight:bold}
.destaque{border:1px solid ${ouro};background:#fbf6ec;padding:10px 14px;margin:10px 0 16px;font-family:Arial,sans-serif;font-size:10pt;text-align:center;color:${cor};font-weight:bold}
.ass{margin:46px auto 0;text-align:center;width:70%}.ass .l{border-top:1px solid #1d1d1b;padding-top:6px;font-family:Arial,sans-serif;font-size:10pt}
.ass2{width:100%;margin-top:40px}.ass2 td{width:50%;text-align:center;padding:30px 10px 0;font-family:Arial,sans-serif;font-size:9.5pt}.ass2 .l{border-top:1px solid #1d1d1b;padding-top:5px}
.local{text-align:right;margin-top:26px}
.preencher{background:#ffe9a8;color:#6b4b00;font-family:Arial,sans-serif;font-size:.9em;padding:0 3px}
.rodape{margin-top:40px;border-top:1px solid #e3ddcf;padding-top:8px;font-family:Arial,sans-serif;font-size:8pt;color:#8a857a;text-align:center}
@media print{body{padding:0}.preencher{background:#ffe9a8 !important;-webkit-print-color-adjust:exact;print-color-adjust:exact}h2,.crono td.dt,.cards td,.tab th,.faixa,.passos .n{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body><div class="doc">${cab}${o.corpo}${rod}</div></body></html>`;
};
const paragrafos = t => String(t||"").split(/\n\s*\n|\n/).map(s=>s.trim()).filter(Boolean).map(s=>`<p>${e(s)}</p>`).join("");
const hojeExtenso = () => new Date().toLocaleDateString("pt-BR",{day:"numeric", month:"long", year:"numeric"});
P.cronologia = function(txt){
  return String(txt||"").split(/\n+/).map(l=>l.trim()).filter(Boolean).map(l=>{ const m = l.match(/^(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)\s*[-–—:]\s*(.+)$/); return m ? [m[1], m[2]] : ["", l]; });
};

/* Petição / peça */
P.montarPeca = function(o){
  const M = P.MODELOS_PECA[o.modelo]; if(!M) return "";
  const cidade = o.cidade || "";
  const juizo = (o.juizo || M.juizo).replace("{cidade}", cidade ? cidade.toUpperCase() : "___");
  const qualiCli = P.qualificar(o.cliente);
  const contra = o.contraria ? `<b>${e(o.contraria.toUpperCase())}</b>${o.contrariaQuali?", "+e(o.contrariaQuali):`, ${F("qualificação da parte contrária (CPF/CNPJ e endereço)")}`}` : F("parte contrária e qualificação");
  const adv = o.advogado ? e(o.advogado) : F("advogado(a) e OAB");
  const teses = o.teses || [];
  const crono = P.cronologia(o.cronologia);
  const pedidos = [].concat(teses.map(t=>t.pedido).filter(Boolean), o.pedidos || []);
  let c = `<p class="juizo ni">${e(juizo)}</p>`;
  if(o.numero && !M.intermediaria) c += `<p class="ni"><b>Processo nº ${e(o.numero)}</b></p>`;
  if(M.intermediaria){
    c += `<p class="ni"><b>${e((o.cliente?.nome||"").toUpperCase())||F("cliente")}</b>, já qualificado(a) nos autos do processo ${o.numero?`nº <b>${e(o.numero)}</b>`:F("número do processo")}, em que litiga com <b>${e((o.contraria||"").toUpperCase())||F("parte contrária")}</b>, por seu(sua) advogado(a) que esta subscreve, vem, respeitosamente, à presença de Vossa Excelência, ${e(M.verbo)}</p>`;
    c += `<h1>${e(M.acao)}</h1><div class="sub">pelos fatos e fundamentos a seguir</div>`;
  } else {
  c += `<p class="ni">${qualiCli}, por seu(sua) advogado(a) que esta subscreve (procuração anexa), vem, respeitosamente, à presença de Vossa Excelência, ${e(M.verbo)}</p>`;
  c += `<h1>${e(M.acao)}</h1><div class="sub">${M.defesa?"":"em face de"}</div>`;
  if(!M.defesa) c += `<p class="ni">${contra}, pelos fatos e fundamentos a seguir expostos.</p>`;
  else c += `<p class="ni">nos autos da ação penal movida pelo <b>MINISTÉRIO PÚBLICO</b>, pelos fatos e fundamentos a seguir expostos.</p>`;
  }
  c += `<table class="partes"><tr><td><span class="r">${e(M.autor)}</span>${e(o.cliente?.nome||"")||F("cliente")}</td><td><span class="r">${e(M.reu)}</span>${M.defesa?"Ministério Público":(e(o.contraria||"")||F("parte contrária"))}</td></tr></table>`;
  c += `<div class="box"><b class="t">Resumo do caso</b>${e(o.resumo||"") || F("em duas ou três linhas, o que aconteceu e o que se pede")}</div>`;
  c += `<h2>I. ${M.intermediaria ? "Síntese" : "Dos fatos"}</h2>${paragrafos(o.fatos) || `<p>${F(M.intermediaria ? "resuma o processo e o ponto que esta peça responde" : "narre os fatos em ordem, com datas e documentos")}</p>`}`;
  if(crono.length) c += `<h3>Linha do tempo</h3><table class="crono">${crono.map(([d,t])=>`<tr><td class="dt">${e(d||"—")}</td><td>${e(t)}</td></tr>`).join("")}</table>`;
  if(o.citacao) c += `<div class="destaque">“${e(o.citacao)}”</div>`;
  c += `<h2>II. Do direito</h2>`;
  teses.forEach(t=>{ c += `<h3>${e(t.titulo)}</h3>${paragrafos(t.texto)}${t.fundamento?`<div class="fund">Fundamento: ${e(t.fundamento)}</div>`:""}`; });
  if(!teses.length) c += `<p>${F("fundamentos jurídicos")}</p>`;
  c += `<h2>III. Dos pedidos</h2><p class="ni">Diante do exposto, requer:</p><ol class="ped" type="a">${pedidos.concat(M.pedidosFixos||[]).map(p=>`<li>${e(p.charAt(0).toLowerCase()+p.slice(1))};</li>`).join("")}</ol>`;
  if(M.liquidos && (o.valores||[]).length) c += `<table class="tab"><tr><th>Pedido</th><th style="width:140px">Valor estimado</th></tr>${o.valores.map(([p,v])=>`<tr><td>${e(p)}</td><td>${e(v)||F("R$")}</td></tr>`).join("")}</table>`;
  if(M.defesa && teses.some(t=>t.id==="p_testemunhas")) c += `<h3>Rol de testemunhas</h3><p class="ni">${o.testemunhas?e(o.testemunhas).replace(/\n/g,"<br>"):F("nome, qualificação e endereço de cada testemunha")}</p>`;
  if(!M.defesa && !M.intermediaria) c += `<p class="ni">Dá-se à causa o valor de <b>${o.valorCausa?e(o.valorCausa):F("R$ valor da causa")}</b>.</p>`;
  c += `<p class="ni">Termos em que pede deferimento.</p><p class="local">${e(cidade||"")||F("cidade")}, ${hojeExtenso()}.</p><div class="ass"><div class="l">${adv}</div></div>`;
  return P.docVisual({docs:o.docs, escritorio:o.escritorio, titulo:M.nome, corpo:c});
};

/* Contrato de honorários */
P.montarContrato = function(o){
  const d = o.docs || {}, h = o.honorarios || {};
  const cards = [["Honorários fixos", h.fixo||"—"],["Entrada", h.entrada||"—"],["Parcelas", h.parcelas||"—"],["Êxito", h.exito?h.exito+"%":"—"]];
  let c = `<h1>CONTRATO DE HONORÁRIOS ADVOCATÍCIOS</h1><div class="sub">Prestação de serviços jurídicos</div>`;
  c += `<p class="ni"><b>CONTRATANTE:</b> ${P.qualificar(o.cliente)}.</p>`;
  c += `<p class="ni"><b>CONTRATADA:</b> <b>${e((d.nome||o.escritorio||"").toUpperCase())}</b>${d.cnpj?`, inscrita no CNPJ sob o nº ${e(d.cnpj)}`:""}${d.oab?`, registro ${e(d.oab)}`:""}, com sede em ${val(d.endereco,"endereço do escritório")}, e-mail ${val(d.email,"e-mail")}, neste ato representada por ${o.advogados&&o.advogados.length?e(o.advogados.join("; ")):F("advogado(a) e OAB")}.</p>`;
  c += `<p class="ni">As partes acima identificadas têm, entre si, justo e acertado o presente contrato, que se regerá pelas cláusulas seguintes:</p>`;
  c += `<table class="cards"><tr>${cards.map(([k,v])=>`<td>${e(k)}<b>${e(v)}</b></td>`).join("")}</tr></table>`;
  c += `<table class="passos"><tr>${["Assinatura","Documentos","Ajuizamento","Acompanhamento"].map((t,i)=>`<td><span class="n">${i+1}</span><br>${t}</td>`).join("")}</tr></table>`;
  const cl = [
    ["Do objeto", `A CONTRATADA prestará ao CONTRATANTE os serviços de advocacia consistentes em: ${o.objeto?e(o.objeto):F("descrever o serviço: ex. ajuizamento e acompanhamento de ação indenizatória contra ...")}, em todas as instâncias ordinárias, salvo disposição em contrário.`],
    ["Dos honorários", `Pelos serviços, o CONTRATANTE pagará à CONTRATADA ${h.fixo?`honorários fixos de <b>${e(h.fixo)}</b>`:"honorários fixos de "+F("valor")}${h.entrada?`, sendo <b>${e(h.entrada)}</b> de entrada`:""}${h.parcelas?` e o saldo em <b>${e(h.parcelas)}</b>`:""}${h.exito?`, além de honorários de êxito de <b>${e(h.exito)}%</b> sobre o proveito econômico obtido pelo CONTRATANTE, devidos no recebimento`:""}. Forma de pagamento: ${h.forma?e(h.forma):F("PIX, boleto ou transferência")}.`],
    ["Das despesas", "Custas, emolumentos, perícias, cópias, deslocamentos e demais despesas necessárias ao andamento do caso correm por conta do CONTRATANTE, mediante prévia comunicação."],
    ["Dos honorários de sucumbência", "Os honorários de sucumbência pertencem exclusivamente à CONTRATADA e não se compensam com os honorários contratados (Lei 8.906/94, arts. 22 e 23)."],
    ["Das obrigações do contratante", "O CONTRATANTE se compromete a fornecer, com veracidade e no prazo solicitado, as informações e os documentos necessários, e a comunicar mudança de endereço, telefone ou e-mail."],
    ["Da rescisão", "O contrato poderá ser rescindido por qualquer das partes mediante comunicação escrita. Em caso de revogação do mandato sem culpa da CONTRATADA, serão devidos os honorários proporcionais aos serviços prestados e, havendo êxito posterior, a parcela correspondente."],
    ["Do sigilo e dados pessoais", "A CONTRATADA manterá sigilo sobre as informações recebidas e tratará os dados pessoais do CONTRATANTE apenas para a execução deste contrato e o cumprimento de obrigações legais (Lei 13.709/18)."],
    ["Do foro", `Fica eleito o foro da comarca de ${val(o.cidade,"cidade")} para dirimir questões oriundas deste contrato.`]
  ];
  c += cl.map(([t,x],i)=>`<h3>Cláusula ${i+1}ª — ${e(t)}</h3><p>${x}</p>`).join("");
  c += `<p class="ni">E, por estarem assim justos e contratados, assinam o presente em duas vias de igual teor.</p><p class="local">${val(o.cidade,"cidade")}, ${hojeExtenso()}.</p>`;
  c += `<table class="ass2"><tr><td><div class="l">${e(o.cliente?.nome||"CONTRATANTE")}<br>Contratante</div></td><td><div class="l">${e(d.nome||o.escritorio||"CONTRATADA")}<br>Contratada</div></td></tr><tr><td><div class="l">Testemunha 1 · CPF</div></td><td><div class="l">Testemunha 2 · CPF</div></td></tr></table>`;
  return P.docVisual({docs:d, escritorio:o.escritorio, titulo:"Contrato de honorários", corpo:c});
};

/* Procuração */
P.PODERES_ESPECIAIS = ["receber citação","confessar","reconhecer a procedência do pedido","transigir","desistir","renunciar ao direito sobre o qual se funda a ação","receber e dar quitação","firmar compromisso","assinar declaração de hipossuficiência econômica"];
P.montarProcuracao = function(o){
  const d = o.docs || {};
  const outorgados = (o.advogados||[]).length ? o.advogados.map(a=>`<li>${e(a)}</li>`).join("") : `<li>${F("nome do(a) advogado(a), OAB/UF nº, e-mail")}</li>`;
  let c = `<h1>PROCURAÇÃO</h1><div class="sub">Ad judicia et extra</div>`;
  c += `<div class="box"><b class="t">Outorgante</b>${P.qualificar(o.cliente)}.</div>`;
  c += `<div class="box"><b class="t">Outorgados</b><ul style="margin:4px 0 0;padding-left:18px">${outorgados}</ul>${d.nome?`<div style="margin-top:6px">integrantes de <b>${e(d.nome)}</b>${d.cnpj?`, CNPJ ${e(d.cnpj)}`:""}${d.endereco?`, com escritório em ${e(d.endereco)}`:""}${d.email?`, e-mail ${e(d.email)}`:""}.</div>`:""}</div>`;
  c += `<h2>Dos poderes</h2><p>Pelo presente instrumento, o(a) OUTORGANTE nomeia e constitui seus bastantes procuradores os OUTORGADOS acima, a quem confere os poderes da cláusula <b>ad judicia et extra</b>, para o foro em geral, podendo propor e contestar ações, recorrer, acompanhar processos em qualquer juízo, instância ou tribunal, e praticar todos os atos necessários ao fiel cumprimento deste mandato, inclusive substabelecer com ou sem reserva de poderes.</p>`;
  const esp = o.especiais || [];
  if(esp.length) c += `<p>Confere ainda os <b>poderes especiais</b> para ${esp.map(e).join(", ")}, nos termos do art. 105 do Código de Processo Civil.</p>`;
  c += `<h3>Finalidade</h3><p>${o.finalidade?e(o.finalidade):F("ex.: propor ação indenizatória contra ... e acompanhá-la até o final")}.</p>`;
  c += `<p class="local">${val(o.cidade,"cidade")}, ${hojeExtenso()}.</p><div class="ass"><div class="l">${e(o.cliente?.nome||"OUTORGANTE")}<br>Outorgante</div></div>`;
  return P.docVisual({docs:d, escritorio:o.escritorio, titulo:"Procuração", corpo:c});
};

/* exportações */
P.baixarWord = function(html, nome){
  const blob = new Blob(["﻿", html], {type:"application/msword"});
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = nome.replace(/[\\/:*?"<>|]+/g,"-") + ".doc"; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 800);
};
P.textoSimples = function(html){ const d = document.createElement("div"); d.innerHTML = html.replace(/<style[\s\S]*?<\/style>/i,""); d.querySelectorAll("p,h1,h2,h3,li,tr,div").forEach(n=>n.insertAdjacentText("afterend","\n")); return d.innerText.replace(/\n{3,}/g,"\n\n").trim(); };
P.mensagemDocs = function(nome, faltam, escritorio){
  const pn = String(nome||"").trim().split(/\s+/)[0] || "";
  return `Olá${pn?", "+pn:""}! Para darmos andamento ao seu caso, faltam só estes documentos:\n\n${faltam.map((x,i)=>`${i+1}. ${x}`).join("\n")}\n\nPode mandar por aqui mesmo, em foto ou PDF. Qualquer dúvida, estamos à disposição.${escritorio?"\n\n"+escritorio:""}`;
};

/* ---------------- MODELOS PRÓPRIOS EM WORD (.docx) ----------------
   O escritório envia o próprio contrato/procuração/petição em Word com campos {{CAMPO}}.
   O app troca só os campos e devolve o mesmo arquivo: margens, fontes, cabeçalho, rodapé e logo ficam iguais. */
P.TIPOS_MODELO = [["contrato","Contrato de honorários"],["procuracao","Procuração"],["peticao","Petição / peça"],["declaracao","Declaração"],["notificacao","Notificação / carta"],["outro","Outro documento"]];
P.CAMPOS_MODELO = [
  ["Cliente", [["CLIENTE_NOME","Nome do cliente"],["CLIENTE_QUALIFICACAO","Qualificação completa (nome, nacionalidade, estado civil, profissão, RG, CPF e endereço)"],["CLIENTE_CPF_CNPJ","CPF ou CNPJ"],["CLIENTE_RG","RG"],["CLIENTE_NACIONALIDADE","Nacionalidade"],["CLIENTE_ESTADO_CIVIL","Estado civil"],["CLIENTE_PROFISSAO","Profissão"],["CLIENTE_ENDERECO","Endereço"],["CLIENTE_TELEFONE","Telefone"],["CLIENTE_EMAIL","E-mail"],["CLIENTE_REPRESENTANTE","Representante legal (empresa)"]]],
  ["Processo", [["PROCESSO_NUMERO","Número do processo"],["PROCESSO_VARA","Vara / juízo"],["PROCESSO_AREA","Área"],["PARTE_CONTRARIA","Parte contrária"],["VALOR_CAUSA","Valor da causa"]]],
  ["Escritório", [["ESCRITORIO_NOME","Nome do escritório"],["ESCRITORIO_CNPJ","CNPJ"],["ESCRITORIO_OAB","Registro na OAB"],["ESCRITORIO_ENDERECO","Endereço"],["ESCRITORIO_TELEFONE","Telefone"],["ESCRITORIO_EMAIL","E-mail"],["ADVOGADO_NOME","Advogado(a) principal"],["ADVOGADO_OAB","OAB do advogado(a)"],["ADVOGADOS","Todos os advogados"],["CIDADE","Cidade"]]],
  ["Datas", [["DATA_HOJE","Data de hoje (dd/mm/aaaa)"],["DATA_EXTENSO","Data por extenso"]]],
  ["Preencher na hora", [["OBJETO","Objeto do contrato / serviço"],["HONORARIOS_VALOR","Valor dos honorários"],["HONORARIOS_PARCELAS","Forma de pagamento / parcelas"],["HONORARIOS_PERCENTUAL","Percentual de êxito"]]]
];
P.ROTULO_CAMPO = k => { for(const [,l] of P.CAMPOS_MODELO){ const f = l.find(x=>x[0]===k); if(f) return f[1]; } return k.replace(/_/g," ").toLowerCase().replace(/^./, c=>c.toUpperCase()); };
const chaveCampo = t => String(t||"").normalize("NFD").replace(/[̀-ͯ]/g,"").trim().toUpperCase().replace(/[^A-Z0-9]+/g,"_").replace(/^_|_$/g,"");
const RE_CAMPO = /\{\{\s*([^{}]{1,60}?)\s*\}\}/g;
const WNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const partesDocx = zip => Object.keys(zip.files).filter(n=>/^word\/(document|header\d*|footer\d*|footnotes|endnotes)\.xml$/.test(n));
function paragrafosXml(doc){
  return [...doc.getElementsByTagNameNS(WNS,"p")].map(p=>({p, ts:[...p.getElementsByTagNameNS(WNS,"t")].filter(t=>{ let a = t.parentNode; while(a && !(a.namespaceURI===WNS && a.localName==="p")) a = a.parentNode; return a===p; })}));
}
P.lerCamposDocx = async function(buf){
  if(!window.JSZip) throw new Error("Leitor de Word indisponível. Recarregue a página.");
  let zip; try{ zip = await JSZip.loadAsync(buf); }catch(e){ throw new Error("O arquivo não parece um Word (.docx). Se for .doc antigo, abra no Word e salve como .docx."); }
  if(!zip.file("word/document.xml")) throw new Error("O arquivo não parece um Word (.docx). Se for .doc antigo, abra no Word e salve como .docx.");
  const campos = new Set(); let texto = "";
  for(const n of partesDocx(zip)){
    const doc = new DOMParser().parseFromString(await zip.file(n).async("string"), "application/xml");
    for(const {ts} of paragrafosXml(doc)){ const full = ts.map(t=>t.textContent).join(""); if(n==="word/document.xml") texto += full + "\n"; let m; RE_CAMPO.lastIndex = 0; while((m = RE_CAMPO.exec(full))) campos.add(chaveCampo(m[1])); }
  }
  return {campos:[...campos].filter(Boolean), texto:texto.trim()};
};
P.preencherDocx = async function(buf, valores){
  const zip = await JSZip.loadAsync(buf), ser = new XMLSerializer();
  for(const n of partesDocx(zip)){
    const xml = await zip.file(n).async("string"); if(!xml.includes("{{")) continue;
    const doc = new DOMParser().parseFromString(xml, "application/xml");
    for(const {ts} of paragrafosXml(doc)){
      const full = ts.map(t=>t.textContent).join(""); if(!full.includes("{{")) continue;
      const ms = []; let m; RE_CAMPO.lastIndex = 0; while((m = RE_CAMPO.exec(full))) ms.push([m.index, m.index + m[0].length, chaveCampo(m[1])]);
      for(let k = ms.length-1; k>=0; k--){
        const [ini, fim, chave] = ms[k]; let v = valores[chave]; v = (v===undefined || v===null || String(v).trim()==="") ? "__________" : String(v).replace(/\s*\n\s*/g," ");
        let pos = 0, a = -1, oa = 0, b = -1, ob = 0;
        ts.forEach((t,i)=>{ const L = t.textContent.length; if(a<0 && ini < pos+L){ a = i; oa = ini-pos; } if(b<0 && fim-1 < pos+L){ b = i; ob = fim-1-pos; } pos += L; });
        if(a<0 || b<0) continue;
        if(a===b){ const tx = ts[a].textContent; ts[a].textContent = tx.slice(0,oa) + v + tx.slice(ob+1); }
        else { ts[a].textContent = ts[a].textContent.slice(0,oa) + v; for(let i=a+1;i<b;i++) ts[i].textContent = ""; ts[b].textContent = ts[b].textContent.slice(ob+1); }
        [a,b].forEach(i=>ts[i].setAttribute("xml:space","preserve"));
      }
    }
    zip.file(n, ser.serializeToString(doc));
  }
  return zip.generateAsync({type:"blob", mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"});
};
const qualiTexto = c => { if(!c) return ""; const d = c.dados||{}, x = (v, r) => v || "___ ("+r+")";
  return c.tipo==="PJ" ? `${(c.nome||"").toUpperCase()}, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº ${x(c.doc,"CNPJ")}, com sede em ${x(d.endereco,"endereço")}, neste ato representada por ${x(d.representante,"representante legal")}`
    : `${(c.nome||"").toUpperCase()}, ${x(d.nacionalidade,"nacionalidade")}, ${x(d.estado_civil,"estado civil")}, ${x(d.profissao,"profissão")}, portador(a) do RG nº ${x(d.rg,"RG")}, inscrito(a) no CPF sob o nº ${x(c.doc,"CPF")}, residente e domiciliado(a) em ${x(d.endereco,"endereço")}`; };
P.valoresModelo = function({cliente, processo, docs, escritorio, area}){
  const c = cliente || {}, d = c.dados || {}, p = processo || {}, k = docs || {};
  const advs = P.advogadosDoc(k), a1 = (advs[0]||"").split(",").map(x=>x.trim());
  const hoje = new Date();
  const moeda = v => v ? Number(v).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}) : "";
  return {
    CLIENTE_NOME:c.nome||"", CLIENTE_QUALIFICACAO:cliente?qualiTexto(c):"", CLIENTE_CPF_CNPJ:c.doc||"", CLIENTE_RG:d.rg||"", CLIENTE_NACIONALIDADE:d.nacionalidade||"", CLIENTE_ESTADO_CIVIL:d.estado_civil||"", CLIENTE_PROFISSAO:d.profissao||"", CLIENTE_ENDERECO:d.endereco||"", CLIENTE_TELEFONE:c.telefone||"", CLIENTE_EMAIL:c.email||"", CLIENTE_REPRESENTANTE:d.representante||"",
    PROCESSO_NUMERO:p.numero||"", PROCESSO_VARA:p.vara||"", PROCESSO_AREA:area||"", PARTE_CONTRARIA:p.parte_contraria||"", VALOR_CAUSA:moeda(p.valor),
    ESCRITORIO_NOME:k.nome||escritorio||"", ESCRITORIO_CNPJ:k.cnpj||"", ESCRITORIO_OAB:k.oab||"", ESCRITORIO_ENDERECO:k.endereco||"", ESCRITORIO_TELEFONE:k.telefone||"", ESCRITORIO_EMAIL:k.email||"",
    ADVOGADO_NOME:a1[0]||"", ADVOGADO_OAB:a1.find(x=>/oab/i.test(x))||"", ADVOGADOS:advs.join("; "), CIDADE:k.cidade||"",
    DATA_HOJE:hoje.toLocaleDateString("pt-BR"), DATA_EXTENSO:hoje.toLocaleDateString("pt-BR",{day:"numeric",month:"long",year:"numeric"})
  };
};
/* modelo de exemplo, gerado no navegador, já com os campos */
P.docxExemplo = async function(docs){
  const k = docs || {}, x = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const cor = (k.cor||P.DOC_COR).replace("#",""), ouro = (k.cor2||P.DOC_OURO).replace("#","");
  const par = (t, o={}) => `<w:p><w:pPr>${o.c?'<w:jc w:val="center"/>':'<w:jc w:val="both"/>'}<w:spacing w:after="${o.after??160}" w:line="300" w:lineRule="auto"/>${o.ind?'<w:ind w:firstLine="709"/>':""}</w:pPr>${t.split(/(\{\{[^}]+\}\})/).filter(Boolean).map(seg=>`<w:r><w:rPr><w:rFonts w:ascii="Georgia" w:hAnsi="Georgia"/>${o.b?"<w:b/>":""}${o.cor?`<w:color w:val="${o.cor}"/>`:""}<w:sz w:val="${o.sz||23}"/></w:rPr><w:t xml:space="preserve">${x(seg)}</w:t></w:r>`).join("")}</w:p>`;
  const corpo = [
    par("CONTRATO DE PRESTAÇÃO DE SERVIÇOS ADVOCATÍCIOS",{c:1,b:1,cor,sz:28,after:80}),
    par("{{ESCRITORIO_NOME}}",{c:1,cor:ouro,sz:18,after:360}),
    par("CONTRATANTE: {{CLIENTE_QUALIFICACAO}}.",{ind:1}),
    par("CONTRATADO: {{ESCRITORIO_NOME}}, inscrito no CNPJ sob o nº {{ESCRITORIO_CNPJ}}, registro {{ESCRITORIO_OAB}}, com sede em {{ESCRITORIO_ENDERECO}}, neste ato representado por {{ADVOGADO_NOME}}, {{ADVOGADO_OAB}}.",{ind:1}),
    par("CLÁUSULA PRIMEIRA – DO OBJETO",{b:1,cor}),
    par("O CONTRATADO prestará ao CONTRATANTE os serviços de {{OBJETO}}, referentes ao processo nº {{PROCESSO_NUMERO}}, em face de {{PARTE_CONTRARIA}}.",{ind:1}),
    par("CLÁUSULA SEGUNDA – DOS HONORÁRIOS",{b:1,cor}),
    par("Pelos serviços, o CONTRATANTE pagará {{HONORARIOS_VALOR}}, da seguinte forma: {{HONORARIOS_PARCELAS}}, além de {{HONORARIOS_PERCENTUAL}} sobre o proveito econômico obtido.",{ind:1}),
    par("CLÁUSULA TERCEIRA – DO FORO",{b:1,cor}),
    par("Fica eleito o foro da comarca de {{CIDADE}} para dirimir dúvidas oriundas deste contrato.",{ind:1}),
    par("{{CIDADE}}, {{DATA_EXTENSO}}.",{after:720}),
    par("_______________________________________",{c:1,after:0}), par("{{CLIENTE_NOME}}",{c:1,b:1,after:480}),
    par("_______________________________________",{c:1,after:0}), par("{{ESCRITORIO_NOME}}",{c:1,b:1})
  ].join("");
  const zip = new JSZip();
  zip.file("[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/></Types>`);
  zip.file("_rels/.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`);
  zip.file("word/_rels/document.xml.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/></Relationships>`);
  zip.file("word/footer1.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr xmlns:w="${WNS}">${par("{{ESCRITORIO_NOME}} · {{ESCRITORIO_ENDERECO}} · {{ESCRITORIO_TELEFONE}}",{c:1,sz:16,cor:"808080",after:0})}</w:ftr>`);
  zip.file("word/document.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="${WNS}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>${corpo}<w:sectPr><w:footerReference w:type="default" r:id="rId1"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1418" w:right="1134" w:bottom="1134" w:left="1701" w:header="709" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>`);
  return zip.generateAsync({type:"blob", mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"});
};
/* visualização fiel (docx-preview) e PDF pela impressão do navegador */
P.carregarScript = src => new Promise((ok, erro)=>{ if(document.querySelector(`script[src="${src}"]`) && window.docx){ ok(); return; } const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = ()=>erro(new Error("Não consegui carregar o visualizador de Word. Verifique a internet.")); document.head.appendChild(s); });
P.mostrarDocx = async function(blob, alvo){
  await P.carregarScript("https://cdn.jsdelivr.net/npm/docx-preview@0.3.6/dist/docx-preview.min.js");
  alvo.innerHTML = "";
  await window.docx.renderAsync(blob, alvo, alvo, {inWrapper:true, ignoreWidth:false, ignoreHeight:false, breakPages:true, renderHeaders:true, renderFooters:true, useBase64URL:true});
};
P.imprimirDocx = function(alvo, titulo){
  const w = window.open("", "_blank"); if(!w) throw new Error("O navegador bloqueou a janela. Permita pop-ups para salvar em PDF.");
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${String(titulo||"Documento").replace(/</g,"")}</title><style>@page{size:A4;margin:0}html,body{margin:0;background:#fff}.docx-wrapper{background:#fff!important;padding:0!important}.docx-wrapper>section.docx{box-shadow:none!important;margin:0 auto!important;page-break-after:always}</style></head><body>${alvo.innerHTML}<script>setTimeout(()=>{print()},500)<\/script></body></html>`);
  w.document.close();
};

})(window.Pauta);
