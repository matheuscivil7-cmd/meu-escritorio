/* Meu Escritório · base de Direito sem IA
   Respostas curtas com fundamento legal, súmulas e atalhos de pesquisa de jurisprudência.
   Tudo roda no navegador; nada é enviado para fora. Confira sempre a redação vigente na fonte oficial. */
(function(P){
const B = []; // base de respostas
const add = (area, tema, chaves, resp, base) => B.push({id:"d"+B.length, area, tema, chaves, resp, base});

/* ---------------- TRABALHISTA ---------------- */
add("trabalhista","Contestação (defesa) trabalhista","contestacao contestar defesa reclamada reclamado prazo audiencia trabalhista pje resposta",
"- A defesa da reclamada é apresentada **na audiência**: oral, em até 20 minutos, ou escrita (art. 847 da CLT).\n- No PJe, a contestação e os documentos podem ser juntados **até a audiência** (art. 847, parágrafo único).\n- A notificação deve chegar pelo menos **5 dias** antes da audiência (art. 841).\n- Se a reclamada faltar à audiência, há revelia e confissão sobre os fatos (art. 844).",
"CLT, arts. 841, 844 e 847");
add("trabalhista","Prazo do recurso ordinário","recurso ordinario prazo trabalhista sentenca vara trt recorrer contrarrazoes deposito recursal custas",
"- **8 dias úteis** para interpor recurso ordinário contra sentença da Vara do Trabalho; contrarrazões no mesmo prazo.\n- Desde a Reforma de 2017, os prazos da CLT contam em **dias úteis**.\n- O empregador recorrente precisa comprovar **depósito recursal e custas** no prazo do recurso, salvo isenções legais.",
"CLT, arts. 775, 895 e 899");
add("trabalhista","Embargos de declaração (trabalhista)","embargos declaracao trabalhista prazo omissao contradicao obscuridade",
"- **5 dias úteis**, para omissão, contradição, obscuridade ou erro material.\n- Interrompem o prazo dos demais recursos.",
"CLT, art. 897-A");
add("trabalhista","Recurso de revista, agravo de petição e agravo de instrumento","recurso revista tst agravo peticao execucao agravo instrumento trabalhista prazo",
"- **Recurso de revista** (ao TST): 8 dias úteis.\n- **Agravo de petição** (decisões na execução): 8 dias úteis.\n- **Agravo de instrumento** (contra decisão que nega seguimento a recurso): 8 dias úteis.",
"CLT, arts. 896 e 897");
add("trabalhista","Prescrição trabalhista","prescricao trabalhista prazo quanto tempo processar empresa dois anos cinco anos fgts intercorrente",
"- O trabalhador pode cobrar os **últimos 5 anos**, desde que ajuíze a ação em até **2 anos** após o fim do contrato.\n- **FGTS**: segue a mesma regra de 5 anos (STF, ARE 709.212; Súmula 362 do TST para a transição).\n- **Prescrição intercorrente**: 2 anos de paralisação na execução por inércia do exequente.",
"CF, art. 7º, XXIX; CLT, arts. 11 e 11-A");
add("trabalhista","Verbas na demissão sem justa causa","verbas rescisorias demissao sem justa causa dispensa imotivada rescisao direitos calculo multa 40 fgts seguro desemprego",
"- Saldo de salário.\n- Aviso prévio (trabalhado ou indenizado), proporcional ao tempo de casa.\n- 13º salário proporcional.\n- Férias vencidas e proporcionais, com 1/3.\n- FGTS do mês e da rescisão, com **multa de 40%** sobre os depósitos, e saque do saldo.\n- Guias do seguro-desemprego.\n- Pagamento em até **10 dias** do fim do contrato; atraso gera multa de um salário.",
"CLT, art. 477, §§ 6º e 8º; Lei 8.036/90, art. 18");
add("trabalhista","Verbas no pedido de demissão","pedido demissao pediu conta verbas direitos empregado saiu",
"- Saldo de salário, 13º proporcional, férias vencidas e proporcionais com 1/3.\n- **Não há** multa de 40%, saque do FGTS nem seguro-desemprego.\n- O empregado deve cumprir o aviso prévio ou pode ter o valor descontado.",
"CLT, arts. 477 e 487, § 2º");
add("trabalhista","Demissão por justa causa","justa causa demissao falta grave hipoteses verbas abandono emprego desidia improbidade",
"- Hipóteses do **art. 482 da CLT** (improbidade, desídia, embriaguez habitual, abandono de emprego, insubordinação, entre outras).\n- Verbas: saldo de salário e férias vencidas com 1/3.\n- Perde aviso prévio, 13º proporcional, férias proporcionais (Súmula 171 do TST), multa de 40% e seguro-desemprego.\n- Exige imediatidade, proporcionalidade e prova do empregador.",
"CLT, art. 482; Súmula 171 do TST");
add("trabalhista","Rescisão por acordo","rescisao acordo comum acordo 484-a demissao consensual",
"- Metade do aviso prévio indenizado e **multa de 20%** do FGTS.\n- Saque de até **80%** do FGTS; sem seguro-desemprego.\n- Demais verbas (saldo, férias, 13º) integrais.",
"CLT, art. 484-A");
add("trabalhista","Aviso prévio proporcional","aviso previo proporcional dias quanto tempo calculo",
"- **30 dias** + **3 dias por ano completo** de serviço, até o máximo de **90 dias**.\n- O acréscimo proporcional beneficia o empregado.",
"Lei 12.506/2011; CF, art. 7º, XXI");
add("trabalhista","Horas extras","horas extras hora extra adicional 50 jornada limite controle ponto banco horas",
"- Adicional mínimo de **50%** sobre a hora normal; limite de 2 horas extras por dia.\n- Empresas com **mais de 20 empregados** devem manter controle de ponto; sem ele, presume-se verdadeira a jornada alegada pelo empregado, salvo prova em contrário.\n- Banco de horas por acordo individual escrito deve compensar em até 6 meses.",
"CF, art. 7º, XVI; CLT, arts. 59 e 74, § 2º; Súmula 338 do TST");
add("trabalhista","Insalubridade e periculosidade","insalubridade periculosidade adicional percentual grau minimo medio maximo perigoso",
"- **Insalubridade**: 10%, 20% ou 40% (graus mínimo, médio e máximo), calculados sobre o salário mínimo.\n- **Periculosidade**: 30% sobre o salário-base.\n- Não se acumulam: o empregado escolhe um deles.\n- Depende de perícia técnica.",
"CLT, arts. 192, 193 e 195");
add("trabalhista","Estabilidade da gestante","gestante gravida estabilidade gravidez demissao garantia emprego",
"- Garantia de emprego **da confirmação da gravidez até 5 meses após o parto**.\n- Vale também no contrato por prazo determinado e no aviso prévio.\n- O desconhecimento do empregador não afasta o direito.",
"ADCT, art. 10, II, b; Súmula 244 do TST; CLT, art. 391-A");
add("trabalhista","Estabilidade por acidente de trabalho","acidente trabalho estabilidade acidentaria auxilio doenca 12 meses",
"- **12 meses** de garantia de emprego após o fim do auxílio por incapacidade acidentário.\n- Requer afastamento superior a 15 dias e recebimento do benefício, ou doença ocupacional reconhecida depois da dispensa.",
"Lei 8.213/91, art. 118; Súmula 378 do TST");
add("trabalhista","Terceirização","terceirizacao terceirizado tomador servico responsabilidade subsidiaria empresa contratante",
"- A empresa tomadora responde de forma **subsidiária** pelas verbas devidas ao terceirizado no período em que se beneficiou do serviço.\n- Para a administração pública, depende de prova de falha na fiscalização.",
"Súmula 331 do TST; Lei 6.019/74, art. 5º-A, § 5º");
add("trabalhista","Honorários e justiça gratuita (trabalhista)","honorarios sucumbencia trabalhista justica gratuita gratuidade custas reclamante",
"- Honorários de sucumbência de **5% a 15%**.\n- Justiça gratuita para quem recebe até 40% do teto do RGPS, ou comprova insuficiência.\n- O STF (ADI 5.766) limitou a cobrança de honorários e custas do beneficiário da gratuidade.",
"CLT, arts. 790, § 3º e § 4º, e 791-A");
add("trabalhista","Audiência trabalhista: ausências","audiencia trabalhista ausencia falta reclamante reclamado arquivamento revelia confissao preposto",
"- Falta do **reclamante**: arquivamento; pode pagar custas se não justificar em 15 dias.\n- Falta do **reclamado**: revelia e confissão quanto à matéria de fato.\n- O preposto não precisa ser empregado.",
"CLT, arts. 843 e 844");
add("trabalhista","Férias","ferias periodo aquisitivo fracionamento pagamento terco",
"- 30 dias após cada 12 meses de trabalho, com adicional de 1/3.\n- Pagamento até **2 dias antes** do início.\n- Pode dividir em até 3 períodos: um com pelo menos 14 dias e os demais com pelo menos 5 dias.",
"CF, art. 7º, XVII; CLT, arts. 134 e 145");
add("trabalhista","Intervalo para almoço","intervalo intrajornada almoco descanso refeicao supressao",
"- Jornada acima de 6 horas: intervalo de **1 a 2 horas**; de 4 a 6 horas: 15 minutos.\n- Se não concedido, paga-se só o tempo suprimido, com 50%, de natureza indenizatória.",
"CLT, art. 71 e § 4º");

/* ---------------- CÍVEL E PROCESSO CIVIL ---------------- */
add("civel","Prazos do CPC","prazo cpc dias uteis contestacao replica recurso apelacao quinze dias fazenda publica dobro",
"- Prazos processuais do CPC contam em **dias úteis**.\n- **15 dias**: contestação, réplica, apelação, agravo, recursos aos tribunais superiores e contrarrazões.\n- **5 dias**: embargos de declaração.\n- Fazenda Pública, MP e Defensoria têm prazo em **dobro**. Litisconsortes com advogados de escritórios diferentes também, mas só em autos físicos.",
"CPC, arts. 180, 183, 186, 219, 229, 335 e 1.003, § 5º");
add("civel","Contestação","contestacao contestar defesa reu prazo resposta citacao audiencia conciliacao",
"- **15 dias úteis**.\n- Conta da audiência de conciliação ou mediação (ou da última sessão), do protocolo do pedido de cancelamento da audiência pelo réu, ou, nos demais casos, da juntada da citação.\n- Toda a matéria de defesa deve vir na contestação, inclusive a reconvenção.",
"CPC, arts. 335, 336 e 343");
add("civel","Apelação","apelacao recurso sentenca prazo efeito suspensivo",
"- Cabe contra **sentença**, em **15 dias úteis**.\n- Em regra tem efeito suspensivo; as exceções estão no art. 1.012, § 1º.\n- Questões não agraváveis decididas antes podem ser levantadas na apelação ou nas contrarrazões.",
"CPC, arts. 1.009 e 1.012");
add("civel","Agravo de instrumento","agravo instrumento decisao interlocutoria cabimento rol taxatividade mitigada",
"- Contra decisões interlocutórias do rol do **art. 1.015** do CPC, em **15 dias úteis**.\n- O STJ admite fora do rol quando houver **urgência** que torne inútil esperar a apelação (taxatividade mitigada, Tema 988).",
"CPC, art. 1.015; STJ, Tema 988");
add("civel","Embargos de declaração (cível)","embargos declaracao civel cpc prazo omissao contradicao",
"- **5 dias úteis**, para omissão, contradição, obscuridade ou erro material.\n- Interrompem o prazo para outros recursos. Embargos protelatórios geram multa.",
"CPC, arts. 1.022 a 1.026");
add("civel","Tutela de urgência (liminar)","tutela urgencia liminar antecipada cautelar requisitos evidencia",
"- Requisitos: **probabilidade do direito** e **perigo de dano** ou risco ao resultado útil do processo.\n- Não se concede se houver risco de irreversibilidade.\n- A **tutela da evidência** dispensa o perigo de dano nas hipóteses do art. 311.",
"CPC, arts. 300 a 311");
add("civel","Prescrição cível","prescricao civil prazo cobranca divida reparacao civil indenizacao aluguel contrato",
"- Regra geral: **10 anos**.\n- Reparação civil (indenização extracontratual): **3 anos**.\n- Aluguéis: 3 anos. Dívidas líquidas em instrumento público ou particular: 5 anos.\n- Responsabilidade **contratual**: o STJ aplica 10 anos.\n- Relação de consumo, fato do produto ou serviço: 5 anos (CDC, art. 27).",
"CC, arts. 205 e 206; CDC, art. 27");
add("civel","Produto com defeito (CDC)","vicio produto defeito consumidor troca garantia prazo reclamar 30 90 dias",
"- Prazo para reclamar: **30 dias** (não duráveis) ou **90 dias** (duráveis); vício oculto conta da descoberta.\n- O fornecedor tem **30 dias** para consertar. Depois disso, o consumidor escolhe: troca, devolução do valor ou abatimento.",
"CDC, arts. 18 e 26");
add("civel","Inversão do ônus da prova","inversao onus prova consumidor hipossuficiencia verossimilhanca distribuicao dinamica",
"- No CDC, o juiz pode inverter o ônus quando a alegação for **verossímil** ou o consumidor for **hipossuficiente**.\n- Fora do consumo, o CPC permite a distribuição dinâmica do ônus da prova.",
"CDC, art. 6º, VIII; CPC, art. 373, § 1º");
add("civel","Juizado Especial Cível","juizado especial civel pequenas causas jec limite valor sem advogado recurso inominado",
"- Causas até **40 salários mínimos**; até **20** a parte pode ir sem advogado.\n- Sem custas no 1º grau.\n- Recurso inominado em **10 dias**, com preparo em 48 horas.\n- Prazos em dias úteis.",
"Lei 9.099/95, arts. 3º, 9º, 12-A, 42 e 54");
add("civel","Dano moral no transporte aéreo (atraso e cancelamento de voo)","dano moral atraso voo cancelamento aereo companhia aerea overbooking bagagem extravio passageiro anac montreal",
"- O dano moral por atraso ou cancelamento de voo **não é presumido**: é preciso provar o prejuízo concreto (art. 251-A do Código Brasileiro de Aeronáutica, incluído pela Lei 14.034/2020; STJ, REsp 1.796.716/MG).\n- Pesam no caso: tempo de atraso, assistência prestada, perda de compromisso, chegada de madrugada, crianças ou idosos.\n- Assistência material da Resolução ANAC 400/2016: a partir de 1 hora, comunicação; 2 horas, alimentação; 4 horas, hospedagem (quando houver pernoite) e reacomodação ou reembolso.\n- Voo internacional: dano material segue as Convenções de Varsóvia e Montreal (STF, Tema 210); dano moral não segue a Convenção (STF, Tema 1.240).",
"CBA, art. 251-A; Resolução ANAC 400/2016; STF, Temas 210 e 1.240");
add("civel","Dano moral e negativação indevida","dano moral negativacao indevida nome sujo serasa spc indenizacao juros correcao",
"- Anotação anterior legítima afasta o dano moral pela nova negativação (Súmula 385 do STJ).\n- Juros de mora desde o evento danoso, na responsabilidade extracontratual (Súmula 54 do STJ).\n- Correção monetária desde o arbitramento (Súmula 362 do STJ).\n- Bancos respondem por fraudes de terceiros em operações bancárias (Súmula 479 do STJ).",
"Súmulas 54, 362, 385 e 479 do STJ");
add("civel","Honorários de sucumbência (cível)","honorarios sucumbencia civel advogado percentual equidade recursal",
"- **10% a 20%** sobre a condenação, o proveito econômico ou o valor da causa.\n- Contra a Fazenda Pública, faixas do § 3º.\n- Majoração em grau recursal (§ 11).\n- Equidade só quando o valor for inestimável ou irrisório (STJ, Tema 1.076).",
"CPC, art. 85");
add("civel","Pensão alimentícia","pensao alimenticia alimentos filho prisao civil execucao atraso",
"- Fixada pelo binômio **necessidade de quem recebe e possibilidade de quem paga**.\n- Prisão civil cabe pelas **3 últimas parcelas** anteriores à execução e as que vencerem no curso dela.\n- Prisão de 1 a 3 meses, em regime fechado, separado dos presos comuns.",
"CC, art. 1.694; CPC, art. 528; Súmula 309 do STJ");
add("civel","Divórcio","divorcio separacao cartorio consensual litigioso partilha guarda",
"- Não exige prazo nem separação prévia.\n- Consensual pode ser feito em **cartório**, com advogado. Regras do CNJ recentes ampliaram os casos com filhos menores; confira os requisitos atuais.\n- Litigioso ou com questões de filhos pendentes: via judicial.",
"CF, art. 226, § 6º; CPC, art. 733");
add("civel","Inventário","inventario partilha heranca obito prazo cartorio extrajudicial",
"- Abertura em **2 meses** do óbito; conclusão em 12 meses (prorrogáveis).\n- Extrajudicial em cartório quando os herdeiros concordam, com advogado. Confira as regras atuais do CNJ quando há herdeiro menor ou testamento.\n- Atraso pode gerar multa do ITCMD, conforme a lei estadual.",
"CPC, arts. 610 e 611");
add("civel","Usucapião","usucapiao prazo imovel posse anos urbana rural extraordinaria ordinaria",
"- **Extraordinária**: 15 anos (10 se for moradia ou houver obras produtivas).\n- **Ordinária**: 10 anos, com justo título e boa-fé (5 em hipóteses do parágrafo único).\n- **Especial urbana**: 5 anos, até 250 m², para moradia, sem outro imóvel.\n- **Especial rural**: 5 anos, até 50 hectares.\n- Pode ser feita em cartório (usucapião extrajudicial).",
"CC, arts. 1.238 a 1.242; CF, arts. 183 e 191; Lei 6.015/73, art. 216-A");
add("civel","Despejo","despejo locacao aluguel atrasado inquilino liminar desocupacao purgar mora",
"- Falta de pagamento: liminar para desocupação em **15 dias** quando o contrato não tem garantia.\n- O inquilino pode evitar o despejo pagando o débito atualizado em **15 dias** (purgação da mora).\n- Contrato residencial de 30 meses ou mais permite retomada sem motivo ao fim do prazo.",
"Lei 8.245/91, arts. 46, 59 e 62");
add("civel","Cumprimento de sentença","cumprimento sentenca execucao pagar 15 dias multa 10 impugnacao penhora",
"- O devedor é intimado para pagar em **15 dias**; se não pagar, **multa de 10%** e honorários de 10%.\n- Depois disso, **15 dias** para impugnação.",
"CPC, arts. 523 e 525");
add("civel","Execução de título extrajudicial","execucao titulo extrajudicial cheque nota promissoria contrato citacao 3 dias embargos execucao",
"- Citação para pagar em **3 dias**; se pagar nesse prazo, honorários caem pela metade.\n- **Embargos à execução** em 15 dias, contados da juntada do mandado de citação.",
"CPC, arts. 827, 829 e 915");
add("civel","Justiça gratuita","justica gratuita gratuidade assistencia judiciaria custas pobreza declaracao",
"- Para quem não pode pagar custas e honorários sem prejuízo do sustento.\n- A declaração de pessoa natural é presumida verdadeira; o juiz pode pedir comprovação se houver indícios em contrário.\n- Ter advogado particular não impede a gratuidade.",
"CPC, arts. 98 e 99");
add("civel","Revelia","revelia reu nao contestou efeitos presuncao",
"- Sem contestação, presumem-se verdadeiros os fatos alegados pelo autor, com as exceções do art. 345.\n- Os prazos para o revel sem advogado correm da publicação.",
"CPC, arts. 344 a 346");

/* ---------------- CRIMINAL ---------------- */
add("criminal","Prazos no processo penal","prazo cpp penal criminal dias corridos contagem continuo",
"- Prazos do CPP são **contínuos (corridos)**: exclui o dia do começo e inclui o do vencimento.\n- Se terminar em dia sem expediente, prorroga para o próximo dia útil.\n- Ficam suspensos de 20/12 a 20/01, salvo réu preso e outras urgências (art. 798-A).",
"CPP, arts. 798 e 798-A");
add("criminal","Apelação criminal","apelacao criminal penal prazo razoes sentenca condenatoria",
"- Interposição em **5 dias**; razões em **8 dias**.\n- No Juizado Especial Criminal: **10 dias**, já com as razões.",
"CPP, arts. 593 e 600; Lei 9.099/95, art. 82");
add("criminal","Recurso em sentido estrito (RESE)","recurso sentido estrito rese prazo cabimento pronuncia",
"- **5 dias** para interpor; razões em 2 dias.\n- Cabe nas hipóteses do art. 581 (por exemplo, rejeição da denúncia, pronúncia, concessão ou negação de liberdade).",
"CPP, arts. 581, 586 e 588");
add("criminal","Embargos de declaração (penal)","embargos declaracao penal criminal prazo dois dias",
"- **2 dias** no CPP; **5 dias** no Juizado Especial Criminal.",
"CPP, arts. 382 e 619; Lei 9.099/95, art. 83");
add("criminal","Resposta à acusação","resposta acusacao defesa previa prazo citacao denuncia",
"- **10 dias** após a citação.\n- Momento de arguir preliminares, juntar documentos e arrolar testemunhas.\n- Se não apresentada, o juiz nomeia defensor.",
"CPP, arts. 396 e 396-A");
add("criminal","Prisão em flagrante e audiência de custódia","prisao flagrante audiencia custodia 24 horas relaxamento liberdade provisoria",
"- O preso deve ser apresentado ao juiz em até **24 horas**.\n- O juiz relaxa a prisão ilegal, converte em preventiva (se presentes os requisitos) ou concede liberdade provisória, com ou sem fiança.",
"CPP, art. 310");
add("criminal","Prisão preventiva","prisao preventiva requisitos cabimento revisao 90 dias",
"- Requisitos: prova do crime, indício de autoria e **perigo gerado pela liberdade**, para garantir a ordem pública ou econômica, a instrução ou a aplicação da lei penal.\n- Cabimento principal: crime doloso com pena máxima acima de 4 anos.\n- Não pode ser decretada de ofício. Revisão obrigatória a cada **90 dias**.",
"CPP, arts. 311 a 316");
add("criminal","Fiança","fianca afiancavel inafiancavel delegado valor",
"- O delegado pode arbitrar fiança em crimes com pena máxima de até **4 anos**; acima disso, só o juiz.\n- Inafiançáveis: racismo, tortura, tráfico, terrorismo, hediondos e ação de grupos armados contra o Estado.",
"CPP, arts. 322 e 323");
add("criminal","Acordo de não persecução penal (ANPP)","anpp acordo nao persecucao penal confissao requisitos",
"- Requisitos: confissão formal, crime **sem violência ou grave ameaça**, pena mínima **inferior a 4 anos**, e não ser caso de transação penal.\n- Não cabe em violência doméstica ou contra a mulher.",
"CPP, art. 28-A");
add("criminal","Transação penal e suspensão do processo","transacao penal suspensao condicional processo sursis processual menor potencial ofensivo juizado",
"- **Transação penal**: infrações de menor potencial ofensivo (pena máxima até 2 anos).\n- **Suspensão condicional do processo**: pena mínima até 1 ano; período de prova de 2 a 4 anos.\n- Nenhuma das duas se aplica à Lei Maria da Penha.",
"Lei 9.099/95, arts. 61, 76 e 89; Súmula 536 do STJ");
add("criminal","Prescrição penal","prescricao penal crime prazo tabela pena maxima menor 21 maior 70",
"- Pela pena máxima: acima de 12 anos, **20 anos**; de 8 a 12, **16**; de 4 a 8, **12**; de 2 a 4, **8**; de 1 a 2, **4**; menos de 1 ano, **3**.\n- Prazos caem pela metade se o réu tinha menos de 21 anos no fato ou mais de 70 na sentença.",
"CP, arts. 109 e 115");
add("criminal","Regime inicial e penas alternativas","regime fechado semiaberto aberto pena substituicao restritiva direitos",
"- Acima de 8 anos: **fechado**. De 4 a 8 (não reincidente): **semiaberto**. Até 4 (não reincidente): **aberto**.\n- Substituição por penas restritivas: pena até 4 anos, crime sem violência ou grave ameaça (ou culposo) e requisitos subjetivos favoráveis.",
"CP, arts. 33 e 44");
add("criminal","Dosimetria da pena","dosimetria pena base agravante atenuante causa aumento diminuicao trifasico",
"- Três fases: **pena-base** (circunstâncias do art. 59), **agravantes e atenuantes**, **causas de aumento e diminuição**.\n- Atenuante não leva a pena abaixo do mínimo (Súmula 231 do STJ).\n- Inquéritos e ações em curso não aumentam a pena-base (Súmula 444 do STJ).",
"CP, arts. 59 e 68; Súmulas 231 e 444 do STJ");
add("criminal","Habeas corpus","habeas corpus hc constrangimento ilegal liberdade",
"- Cabe contra ameaça ou violência à liberdade de locomoção por ilegalidade ou abuso de poder.\n- Não tem prazo e pode ser impetrado por qualquer pessoa, mesmo sem advogado.",
"CF, art. 5º, LXVIII; CPP, arts. 647 e 648");
add("criminal","Lei Maria da Penha","maria penha violencia domestica medida protetiva descumprimento",
"- Medidas protetivas de urgência: afastamento do lar, proibição de contato e aproximação, entre outras.\n- Descumprir medida protetiva é crime.\n- Não se aplicam os benefícios da Lei 9.099/95 nem o princípio da insignificância.",
"Lei 11.340/06, arts. 22 a 24-A e 41; Súmulas 536 e 589 do STJ");
add("criminal","Drogas: uso e tráfico","drogas trafico uso porte maconha privilegiado quantidade pena traficante",
"- **Uso** (art. 28): sem prisão; advertência, prestação de serviços ou medida educativa.\n- O STF (RE 635.659, 2024) entendeu que portar **maconha** para uso pessoal não é crime, presumindo uso até 40 g ou 6 plantas fêmeas.\n- **Tráfico** (art. 33): 5 a 15 anos; redução de 1/6 a 2/3 para primário, de bons antecedentes, que não se dedica ao crime nem integra organização (§ 4º).",
"Lei 11.343/06, arts. 28 e 33; STF, RE 635.659");
add("criminal","Revisão criminal","revisao criminal condenacao transito julgado erro prova nova",
"- Cabe a qualquer tempo após o trânsito em julgado: sentença contrária à lei ou à prova, prova falsa ou provas novas de inocência.",
"CPP, arts. 621 e 622");

/* ---------------- GERAL ---------------- */
add("geral","Contagem de prazo e DJEN","contagem prazo publicacao disponibilizacao djen diario eletronico intimacao portal comeca",
"- A publicação considera-se feita no **primeiro dia útil seguinte à disponibilização** no Diário Eletrônico (DJEN).\n- O prazo começa no **dia útil seguinte à publicação**: exclui-se o dia do começo e inclui-se o do vencimento.\n- Intimação pelo portal: considera-se feita na consulta ou, no máximo, **10 dias corridos** após o envio.",
"CPC, art. 224; Lei 11.419/06, arts. 4º e 5º");
add("geral","Recesso forense","recesso forense ferias forenses suspensao prazos dezembro janeiro",
"- Prazos ficam **suspensos de 20/12 a 20/01** no cível e no trabalhista.\n- No criminal também, salvo réu preso, medidas urgentes e outras exceções do art. 798-A.\n- Audiências e sessões não ocorrem no período, salvo urgência.",
"CPC, art. 220; CLT, art. 775-A; CPP, art. 798-A");
add("geral","Procuração e poderes especiais","procuracao poderes especiais ad judicia transigir receber quitacao",
"- A procuração geral para o foro não abrange: receber citação, confessar, reconhecer o pedido, **transigir**, desistir, renunciar, **receber e dar quitação**, firmar compromisso e assinar declaração de hipossuficiência.\n- Esses poderes precisam constar expressamente.",
"CPC, art. 105");

/* ---------------- FAMÍLIA E SUCESSÕES ---------------- */
add("familia","Pensão alimentícia","alimentos pensao alimenticia pensão filho valor fixacao revisao exoneracao prisao civil devedor atrasada",
"- Fixada pelo binômio **necessidade de quem pede × possibilidade de quem paga** (proporcionalidade).\n- Cabe revisão ou exoneração se mudar a situação financeira de uma das partes.\n- Prisão civil do devedor: **1 a 3 meses**, em regime fechado separado dos presos comuns.\n- A prisão só alcança as **3 últimas prestações** anteriores ao ajuizamento da execução e as que vencerem no curso do processo (Súmula 309 do STJ).",
"CC, arts. 1.694 a 1.710; Lei 5.478/68; CPC, arts. 528 a 533; Súmula 309 do STJ");
add("familia","Divórcio","divorcio separacao casamento fim cartorio extrajudicial litigioso consensual partilha",
"- Não há prazo mínimo de casamento nem exigência de separação prévia (EC 66/2010).\n- Consensual sem filhos menores ou incapazes e sem nascituro: pode ser feito **em cartório**, por escritura pública, com advogado.\n- Havendo filhos menores, guarda, visitas e alimentos precisam estar resolvidos (judicialmente ou na forma admitida pelas normas do CNJ) antes do divórcio em cartório.\n- A partilha pode ser feita depois do divórcio.",
"CF, art. 226, § 6º; CPC, art. 733; CC, art. 1.581");
add("familia","Guarda dos filhos","guarda compartilhada unilateral filhos visitas convivencia alienacao parental",
"- A **guarda compartilhada é a regra**, mesmo sem acordo entre os pais, salvo se um deles declarar que não quer a guarda ou se houver risco à criança.\n- Na compartilhada, o tempo de convívio deve ser dividido de forma equilibrada; a base de moradia pode ser a casa de um dos pais.\n- Atos de alienação parental podem levar a advertência, ampliação do convívio do outro genitor e até alteração da guarda.",
"CC, arts. 1.583 a 1.584; Lei 12.318/2010");
add("familia","União estável","uniao estavel convivencia companheiro companheira reconhecimento dissolucao regime bens",
"- Convivência pública, contínua e duradoura com objetivo de constituir família.\n- Sem contrato escrito, vale o regime da **comunhão parcial de bens**.\n- Pode ser declarada em cartório (escritura) ou reconhecida judicialmente; a dissolução segue as mesmas regras do divórcio quanto a bens, filhos e alimentos.",
"CC, arts. 1.723 a 1.727");
add("familia","Inventário","inventario partilha heranca espolio falecimento herdeiros prazo itcmd extrajudicial cartorio",
"- Deve ser aberto em até **2 meses** do falecimento e encerrado em até **12 meses** (a demora pode gerar multa do ITCMD, conforme a lei estadual).\n- Extrajudicial (em cartório) quando todos os herdeiros são capazes, concordam com a partilha e estão assistidos por advogado.\n- Havendo testamento ou herdeiro incapaz, a regra é o inventário judicial, salvo as hipóteses admitidas pelas normas do CNJ.",
"CPC, arts. 610 e 611");

/* ---------------- CONSUMIDOR ---------------- */
add("consumidor","Prazo para reclamar de defeito (vício)","vicio defeito produto servico reclamar prazo 30 90 dias garantia troca conserto",
"- **30 dias** para produtos e serviços não duráveis; **90 dias** para duráveis.\n- Vício aparente: o prazo conta da entrega ou do fim do serviço. Vício oculto: conta de quando o defeito aparecer.\n- O fornecedor tem **30 dias** para consertar; depois disso, o consumidor escolhe troca, devolução do dinheiro ou abatimento do preço.",
"CDC, arts. 18 e 26");
add("consumidor","Direito de arrependimento","arrependimento desistencia compra internet telefone fora estabelecimento 7 dias devolucao",
"- Compra feita **fora do estabelecimento** (internet, telefone, catálogo, em casa): **7 dias** para desistir, contados da assinatura ou do recebimento.\n- Os valores pagos devem ser devolvidos de imediato e com correção, inclusive o frete.",
"CDC, art. 49");
add("consumidor","Cobrança indevida e devolução em dobro","cobranca indevida repeticao indebito dobro devolucao valor pago a mais banco tarifa",
"- Quem pagou quantia indevida tem direito à devolução **em dobro**, com correção e juros, salvo engano justificável do fornecedor.\n- O STJ fixou que a devolução em dobro **não depende de má-fé**: basta a cobrança contrária à boa-fé objetiva (EAREsp 676.608/RS).",
"CDC, art. 42, parágrafo único");
add("consumidor","Prescrição por acidente de consumo","fato produto acidente consumo prescricao 5 anos dano produto perigoso",
"- Danos causados por **fato do produto ou do serviço** (acidente de consumo): **5 anos**, contados do conhecimento do dano e de quem o causou.\n- Inversão do ônus da prova a critério do juiz, quando a alegação for verossímil ou o consumidor for hipossuficiente.",
"CDC, arts. 6º, VIII, e 27");

/* ---------------- EMPRESARIAL ---------------- */
add("empresarial","Recuperação judicial","recuperacao judicial empresa crise plano credores stay period suspensao execucoes",
"- Suspende as execuções contra a empresa por **180 dias** (stay period), prorrogável uma vez por igual prazo.\n- O plano de recuperação deve ser apresentado em **60 dias** da decisão que defere o processamento.\n- Credores podem apresentar objeção ao plano; havendo objeção, ele é votado em assembleia.",
"Lei 11.101/2005, arts. 6º, § 4º, 53 e 55");
add("empresarial","Pedido de falência","falencia pedido impontualidade titulo protesto 40 salarios minimos",
"- Cabe por **impontualidade** no pagamento de título protestado acima de **40 salários mínimos**, por execução frustrada ou por atos de falência.\n- O devedor pode evitar a falência depositando o valor (depósito elisivo) dentro do prazo de contestação.",
"Lei 11.101/2005, arts. 94 e 98");
add("empresarial","Desconsideração da personalidade jurídica","desconsideracao personalidade juridica socio patrimonio confusao patrimonial desvio finalidade incidente",
"- Atinge o patrimônio dos sócios quando há **abuso da personalidade**: desvio de finalidade ou confusão patrimonial.\n- No processo, exige o **incidente de desconsideração**, com citação dos sócios e contraditório (ou pedido na petição inicial).\n- No consumidor e no trabalhista, a regra é mais ampla (teoria menor).",
"CC, art. 50; CPC, arts. 133 a 137; CDC, art. 28");
add("empresarial","Prescrição de títulos (cheque, duplicata, nota promissória)","cheque duplicata nota promissoria prescricao execucao titulo credito prazo cobrar",
"- **Cheque**: execução em **6 meses** após o fim do prazo de apresentação (30 dias na mesma praça, 60 em praça diferente).\n- **Duplicata** e **nota promissória**: execução em **3 anos** do vencimento contra o devedor principal.\n- Prescrita a execução, ainda cabem ação de cobrança ou ação monitória (Súmulas 299 e 503 do STJ).",
"Lei 7.357/85, arts. 33 e 59; Lei 5.474/68, art. 18; Decreto 57.663/66 (LUG), art. 70");

/* ---------------- TRIBUTÁRIO ---------------- */
add("tributario","Decadência e prescrição tributária","decadencia prescricao tributaria tributo cobranca 5 anos lancamento fisco",
"- **Decadência** (prazo para o Fisco lançar o tributo): **5 anos**.\n- **Prescrição** (prazo para cobrar o crédito já constituído): **5 anos** da constituição definitiva.\n- Ambas podem ser reconhecidas de ofício e alegadas em exceção de pré-executividade.",
"CTN, arts. 150, § 4º, 173 e 174");
add("tributario","Embargos à execução fiscal","embargos execucao fiscal prazo garantia penhora defesa divida ativa",
"- Prazo de **30 dias**, contados do depósito, da juntada da fiança bancária ou do seguro-garantia, ou da intimação da penhora.\n- Exigem **garantia do juízo**.\n- Sem garantia, a defesa possível é a **exceção de pré-executividade**, para matérias que o juiz pode conhecer de ofício e que não exigem prova (Súmula 393 do STJ).",
"Lei 6.830/80, art. 16; Súmula 393 do STJ");
add("tributario","Restituição de tributo pago a mais","restituicao repeticao indebito tributario compensacao pago a mais indevido",
"- Prazo de **5 anos** para pedir restituição ou compensar tributo pago indevidamente.\n- Pode ser pedida administrativamente ou em ação judicial; a compensação de tributos federais segue as regras da Receita Federal.",
"CTN, arts. 165 e 168");
add("tributario","Mandado de segurança tributário","mandado seguranca tributario 120 dias liminar suspensao exigibilidade",
"- Prazo de **120 dias** da ciência do ato a ser impugnado.\n- A liminar suspende a exigibilidade do crédito tributário.\n- Não cabe para cobrar valores do passado (não substitui a ação de cobrança), mas serve para declarar o direito à compensação (Súmula 213 do STJ).",
"Lei 12.016/2009, art. 23; CTN, art. 151, IV; Súmula 213 do STJ");

/* ---------------- ADMINISTRATIVO ---------------- */
add("administrativo","Licitações (Lei 14.133/2021)","licitacao modalidades pregao concorrencia leilao concurso dialogo competitivo contratacao direta dispensa inexigibilidade",
"- Modalidades: **pregão, concorrência, concurso, leilão e diálogo competitivo**.\n- Contratação direta por **dispensa** (hipóteses e valores da lei) ou **inexigibilidade** (quando não há competição possível).\n- Impugnação ao edital: até **3 dias úteis** antes da abertura das propostas.",
"Lei 14.133/2021, arts. 28, 72 a 75 e 164");
add("administrativo","Improbidade administrativa","improbidade administrativa dolo agente publico enriquecimento ilicito prejuizo erario prescricao",
"- Desde a Lei 14.230/2021, exige **dolo** (vontade de praticar o ato ilícito); não há mais improbidade culposa.\n- Prescrição: **8 anos** contados da ocorrência do fato.\n- Sanções: ressarcimento, perda da função, suspensão de direitos políticos, multa e proibição de contratar com o poder público.",
"Lei 8.429/1992, arts. 1º, 12 e 23");
add("administrativo","Prescrição contra a Fazenda Pública","prescricao fazenda publica municipio estado uniao cobrar indenizacao 5 anos",
"- Ações contra União, estados, municípios e suas autarquias prescrevem em **5 anos** da data do ato ou fato.\n- Fazenda Pública tem **prazo em dobro** para se manifestar no processo.",
"Decreto 20.910/1932, art. 1º; CPC, art. 183");
add("administrativo","Concurso público: direito à nomeação","concurso publico nomeacao aprovado dentro vagas edital cadastro reserva preterição",
"- Aprovado **dentro do número de vagas** do edital tem direito à nomeação durante a validade do concurso (STF, Tema 161).\n- Fora das vagas, há direito se houver preterição na ordem ou contratação precária para a mesma função.",
"CF, art. 37, II a IV; STF, RE 598.099 (Tema 161)");

/* ---------------- CONSTITUCIONAL ---------------- */
add("constitucional","Remédios constitucionais","habeas corpus mandado seguranca injuncao habeas data acao popular remedios constitucionais",
"- **Habeas corpus**: liberdade de locomoção.\n- **Mandado de segurança**: direito líquido e certo violado por autoridade (prazo de 120 dias).\n- **Mandado de injunção**: falta de norma que impede exercer um direito.\n- **Habeas data**: acesso ou retificação de dados pessoais.\n- **Ação popular**: anular ato lesivo ao patrimônio público (qualquer cidadão).",
"CF, art. 5º, LXVIII a LXXIII");
add("constitucional","Recurso extraordinário","recurso extraordinario stf repercussao geral prazo admissibilidade prequestionamento",
"- Prazo de **15 dias úteis**.\n- Exige **repercussão geral** da questão constitucional e prequestionamento da matéria.\n- Interposto no tribunal de origem, que faz o primeiro juízo de admissibilidade.",
"CF, art. 102, III e § 3º; CPC, arts. 1.003, § 5º, e 1.029 a 1.035");
add("constitucional","Controle concentrado (ADI, ADC, ADPF)","adi adc adpf acao direta inconstitucionalidade legitimados stf controle concentrado",
"- Propostas diretamente no STF por legitimados específicos: Presidente da República, Mesas do Congresso e das Assembleias, governadores, PGR, Conselho Federal da OAB, partido com representação no Congresso e confederação sindical ou entidade de classe nacional.\n- A decisão vale para todos e vincula o Judiciário e a administração pública.",
"CF, arts. 102, I, a, e 103; Leis 9.868/99 e 9.882/99");

/* ---------------- PREVIDENCIÁRIO ---------------- */
add("previdenciario","Aposentadoria por idade","aposentadoria idade inss requisitos tempo contribuicao reforma previdencia 62 65 anos",
"- Após a Reforma da Previdência (EC 103/2019): **62 anos (mulher)** e **65 anos (homem)**.\n- Tempo mínimo de contribuição: **15 anos** para mulheres e para homens filiados antes da reforma; **20 anos** para homens filiados depois.\n- Quem já tinha os requisitos antes de 13/11/2019 mantém as regras antigas (direito adquirido); há regras de transição.",
"EC 103/2019, arts. 18 e 19; Lei 8.213/91");
add("previdenciario","BPC/LOAS","bpc loas beneficio prestacao continuada idoso deficiente renda baixa assistencial",
"- Um salário mínimo mensal para **idoso a partir de 65 anos** ou **pessoa com deficiência** de longo prazo.\n- Renda familiar por pessoa de até **1/4 do salário mínimo**, critério que pode ser flexibilizado conforme a situação concreta.\n- Não exige contribuição ao INSS e não gera pensão por morte.",
"Lei 8.742/93, art. 20");
add("previdenciario","Pensão por morte","pensao morte dependentes prazo requerer inss conjuge filhos duracao",
"- Pedida em até **90 dias** do óbito, é paga desde a data do falecimento (**180 dias** para filhos menores de 16 anos); depois disso, só a partir do pedido.\n- A duração para cônjuge ou companheiro depende da idade e do tempo de casamento ou união e de contribuição.",
"Lei 8.213/91, arts. 74 e 77");
add("previdenciario","Revisão de benefício (prazo)","revisao beneficio inss decadencia 10 anos recalculo aposentadoria",
"- Prazo de **10 anos** para pedir a revisão do ato de concessão do benefício, contado do 1º dia do mês seguinte ao do primeiro pagamento.\n- Diferenças atrasadas: só os últimos **5 anos** antes do pedido.",
"Lei 8.213/91, art. 103");

/* ---------------- AMBIENTAL ---------------- */
add("ambiental","Responsabilidade por dano ambiental","dano ambiental responsabilidade objetiva reparacao poluidor imprescritivel",
"- Responsabilidade **objetiva**: independe de culpa (teoria do risco integral).\n- A pretensão de reparação civil do dano ambiental é **imprescritível** (STF, Tema 999).\n- A obrigação de recuperar a área acompanha o imóvel: o novo proprietário responde (Súmula 623 do STJ).",
"Lei 6.938/81, art. 14, § 1º; CF, art. 225, § 3º; Súmula 623 do STJ");
add("ambiental","Crimes e infrações ambientais","crime ambiental infracao multa ibama lei 9605 pessoa juridica",
"- Pessoa jurídica pode responder criminalmente por crime ambiental.\n- Infrações administrativas geram multa, embargo e outras sanções; o autuado tem **20 dias** para apresentar defesa ao órgão ambiental.",
"Lei 9.605/98, arts. 3º e 71; Decreto 6.514/2008");

/* ---------------- DIGITAL E LGPD ---------------- */
add("digital","LGPD: bases legais e direitos do titular","lgpd dados pessoais tratamento consentimento base legal titular direitos exclusao acesso",
"- O tratamento de dados pessoais exige uma das **bases legais** da lei (consentimento, cumprimento de obrigação legal, execução de contrato, legítimo interesse, entre outras).\n- O titular pode pedir confirmação, acesso, correção, anonimização, portabilidade, eliminação e informação sobre compartilhamento.",
"Lei 13.709/2018 (LGPD), arts. 7º, 11 e 18");
add("digital","Vazamento de dados (incidente de segurança)","vazamento dados incidente seguranca anpd comunicacao prazo multa sancao",
"- O controlador deve comunicar à **ANPD** e aos titulares o incidente que possa causar risco ou dano relevante; o regulamento da ANPD fixa prazo de **3 dias úteis**.\n- Sanções: advertência, multa de até **2% do faturamento** (limitada a R$ 50 milhões por infração), publicização e bloqueio ou eliminação dos dados.",
"LGPD, arts. 48 e 52; Resolução CD/ANPD 15/2024");
add("digital","Remoção de conteúdo na internet","remocao conteudo internet rede social provedor marco civil ofensa perfil falso",
"- O Marco Civil previa responsabilidade do provedor só após ordem judicial.\n- Em 2025 o STF ampliou essa responsabilidade (Temas 533 e 987): para vários conteúdos ilícitos, basta a notificação; para crimes contra a honra segue exigida ordem judicial. Confira o alcance exato na decisão.\n- Conteúdo íntimo sem consentimento: remoção após simples notificação da vítima.",
"Lei 12.965/2014 (Marco Civil), arts. 19 e 21; STF, Temas 533 e 987");

/* ---------------- COMPLIANCE ---------------- */
add("compliance","Lei Anticorrupção e programa de integridade","compliance anticorrupcao programa integridade leniencia multa empresa corrupcao",
"- Empresas respondem **objetivamente** por atos lesivos à administração pública praticados em seu interesse.\n- Multa de **0,1% a 20% do faturamento bruto**; um programa de integridade efetivo reduz a multa.\n- O **acordo de leniência** pode reduzir a multa em até 2/3.",
"Lei 12.846/2013, arts. 2º, 6º, 7º e 16; Decreto 11.129/2022");
add("compliance","Canal de denúncias e assédio","canal denuncias assedio moral sexual cipa empresa obrigatorio prevencao",
"- Empresas obrigadas a ter CIPA devem adotar medidas de prevenção e combate ao assédio, com **canal de denúncias**, procedimentos de apuração e treinamentos periódicos.\n- O sigilo do denunciante deve ser preservado.",
"Lei 14.457/2022, art. 23; NR-5");

/* ---------------- SÚMULAS DE CONSULTA FREQUENTE ---------------- */
P.SUMULAS = [
  ["STF","SV 11","Uso de algemas só em caso de resistência, fuga ou perigo, com justificativa escrita.","criminal"],
  ["STF","SV 14","O defensor tem acesso aos elementos de prova já documentados no inquérito.","criminal"],
  ["STF","SV 25","É ilícita a prisão civil do depositário infiel.","civel"],
  ["STF","SV 56","Falta de vaga no regime adequado não autoriza manter o preso em regime mais gravoso.","criminal"],
  ["STJ","54","Juros moratórios correm desde o evento danoso na responsabilidade extracontratual.","civel"],
  ["STJ","231","Atenuante não reduz a pena abaixo do mínimo legal.","criminal"],
  ["STJ","297","O CDC se aplica às instituições financeiras.","consumidor"],
  ["STJ","309","Prisão civil por alimentos: até as 3 parcelas anteriores à execução e as que vencerem no processo.","familia"],
  ["STJ","362","Correção do dano moral corre desde o arbitramento.","civel"],
  ["STJ","385","Negativação anterior legítima afasta dano moral por nova anotação, ressalvado o cancelamento.","civel"],
  ["STJ","444","Inquéritos e ações em curso não agravam a pena-base.","criminal"],
  ["STJ","479","Bancos respondem objetivamente por fraudes de terceiros em operações bancárias.","consumidor"],
  ["STJ","536","Suspensão do processo e transação penal não se aplicam à Lei Maria da Penha.","criminal"],
  ["STJ","589","Insignificância é inaplicável em violência doméstica contra a mulher.","criminal"],
  ["STF","SV 13","Proíbe o nepotismo (nomeação de parentes) na administração pública.","administrativo"],
  ["STF","SV 21","É inconstitucional exigir depósito prévio para recorrer na esfera administrativa.","administrativo"],
  ["STJ","213","Mandado de segurança serve para declarar o direito à compensação tributária.","tributario"],
  ["STJ","393","Exceção de pré-executividade cabe na execução fiscal para matérias de ofício que não exigem prova.","tributario"],
  ["STJ","416","Há pensão por morte se o falecido, mesmo sem qualidade de segurado, já tinha direito à aposentadoria.","previdenciario"],
  ["STJ","623","Obrigações ambientais acompanham o imóvel: o novo dono responde pela recuperação.","ambiental"],
  ["STJ","596","Avós só pagam alimentos de forma complementar e subsidiária, se os pais não puderem.","familia"],
  ["TST","171","Na justa causa, não são devidas férias proporcionais.","trabalhista"],
  ["TST","244","Gestante tem estabilidade, inclusive no contrato por prazo determinado.","trabalhista"],
  ["TST","331","Tomador de serviços responde subsidiariamente pelas verbas do terceirizado.","trabalhista"],
  ["TST","338","Sem controle de ponto obrigatório, presume-se verdadeira a jornada alegada pelo empregado.","trabalhista"],
  ["TST","378","Estabilidade acidentária exige afastamento superior a 15 dias e auxílio acidentário, salvo doença ocupacional.","trabalhista"]
];

/* ---------------- LEIS ---------------- */
const PL = "https://www.planalto.gov.br/ccivil_03/";
P.LEIS = [
  ["Constituição Federal", PL+"constituicao/constituicao.htm"],
  ["Código de Processo Civil", PL+"_ato2015-2018/2015/lei/l13105.htm"],
  ["Código Civil", PL+"leis/2002/l10406compilada.htm"],
  ["CLT", PL+"decreto-lei/del5452.htm"],
  ["Código Penal", PL+"decreto-lei/del2848compilado.htm"],
  ["Código de Processo Penal", PL+"decreto-lei/del3689compilado.htm"],
  ["Código de Defesa do Consumidor", PL+"leis/l8078compilado.htm"],
  ["Juizados Especiais (Lei 9.099)", PL+"leis/l9099.htm"],
  ["Lei do Inquilinato (8.245)", PL+"leis/l8245.htm"],
  ["Lei Maria da Penha (11.340)", PL+"_ato2004-2006/2006/lei/l11340.htm"],
  ["Código Tributário Nacional", PL+"leis/l5172compilado.htm"],
  ["Lei de Benefícios do INSS (8.213)", PL+"leis/l8213cons.htm"],
  ["Lei de Licitações (14.133)", PL+"_ato2019-2022/2021/lei/l14133.htm"],
  ["LGPD (13.709)", PL+"_ato2015-2018/2018/lei/l13709.htm"],
  ["Recuperação e Falência (11.101)", PL+"_ato2004-2006/2005/lei/l11101.htm"],
  ["Lei Anticorrupção (12.846)", PL+"_ato2011-2014/2013/lei/l12846.htm"]
];
/* fundamento com link: cada citação abre a lei no Planalto, já no artigo; súmulas e temas abrem a busca no tribunal */
const LEI_URL = {
  "CF":"constituicao/constituicao.htm", "EC 103/2019":"constituicao/emendas/emc/emc103.htm", "CPC":"_ato2015-2018/2015/lei/l13105.htm", "CC":"leis/2002/l10406compilada.htm",
  "CLT":"decreto-lei/del5452.htm", "CP":"decreto-lei/del2848compilado.htm", "CPP":"decreto-lei/del3689compilado.htm", "CDC":"leis/l8078compilado.htm",
  "CTN":"leis/l5172compilado.htm", "CBA":"leis/l7565compilado.htm", "LGPD":"_ato2015-2018/2018/lei/l13709.htm", "ECA":"leis/l8069.htm"
};
const LEI_NUM = {
  "5.478":"leis/l5478.htm","6.830":"leis/l6830.htm","6.938":"leis/l6938.htm","7.357":"leis/l7357.htm","5.474":"leis/l5474.htm","8.036":"leis/l8036consol.htm","8.213":"leis/l8213cons.htm",
  "8.245":"leis/l8245.htm","8.429":"leis/l8429.htm","8.742":"leis/l8742.htm","9.099":"leis/l9099.htm","9.605":"leis/l9605.htm","9.784":"leis/l9784.htm","9.868":"leis/l9868.htm","9.882":"leis/l9882.htm",
  "11.101":"_ato2004-2006/2005/lei/l11101.htm","11.340":"_ato2004-2006/2006/lei/l11340.htm","12.016":"_ato2007-2010/2009/lei/l12016.htm","12.318":"_ato2007-2010/2010/lei/l12318.htm",
  "12.846":"_ato2011-2014/2013/lei/l12846.htm","12.965":"_ato2011-2014/2014/lei/l12965.htm","13.709":"_ato2015-2018/2018/lei/l13709.htm","14.034":"_ato2019-2022/2020/lei/l14034.htm",
  "14.133":"_ato2019-2022/2021/lei/l14133.htm","14.230":"_ato2019-2022/2021/lei/l14230.htm","14.457":"_ato2019-2022/2022/lei/l14457.htm","13.467":"_ato2015-2018/2017/lei/l13467.htm"
};
const DEC_URL = {"20.910":"decreto/antigos/d20910.htm","6.514":"_ato2007-2010/2008/decreto/d6514.htm","11.129":"_ato2019-2022/2022/decreto/d11129.htm","57.663":"decreto/antigos/d57663.htm"};
const ancora = art => { const m = String(art||"").match(/(\d{1,4}(?:\.\d{3})?)(?:º|o)?(?:-([A-Z]))?/i); return m ? "#art" + m[1].replace(".","") + (m[2]?m[2].toLowerCase():"") : ""; };
P.urlFundamento = function(trecho){
  const t = String(trecho||"").trim(); let m;
  if((m = t.match(/S[úu]mula(?:\s+Vinculante)?\s+(\d+)\s+do\s+(STF|STJ|TST)/i)) || (m = t.match(/S[úu]mulas?\s+([\d e,]+?)\s+do\s+(STF|STJ|TST)/i))){
    const n = m[1].match(/\d+/)[0], tr = m[2].toUpperCase();
    if(tr==="STF") return "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=" + (/vinculante/i.test(t)?"26":"30") + "&sumula=" + n;
    return "https://www.google.com/search?q=" + encodeURIComponent(`"Súmula ${n}" ${tr} enunciado site:${tr==="STJ"?"stj.jus.br":"tst.jus.br"}`);
  }
  if(/^S[úu]mula\s+Vinculante\s+(\d+)/i.test(t)) return "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=26&sumula=" + t.match(/\d+/)[0];
  if((m = t.match(/^(STF|STJ|TST),?\s+(.+)$/i))){ const tr = m[1].toUpperCase(); return "https://www.google.com/search?q=" + encodeURIComponent(m[2] + " " + tr + " site:" + ({STF:"stf.jus.br",STJ:"stj.jus.br",TST:"tst.jus.br"})[tr]); }
  if((m = t.match(/^ADCT/i))) return PL + LEI_URL.CF + "#adct";
  if((m = t.match(/^Leis?\s+(?:Complementar\s+)?(\d{1,2}\.\d{3})\/?\d*(?:\s*\([^)]*\))?,?\s*(arts?\..*)?/i))){ const u = LEI_NUM[m[1]]; return u ? PL + u + ancora(m[2]) : "https://www.google.com/search?q=" + encodeURIComponent("Lei " + m[1] + " planalto"); }
  if((m = t.match(/^(CF|CPC|CC|CLT|CPP|CP|CDC|CTN|CBA|LGPD|ECA)\b[^,]*?,?\s*(arts?\..*)?$/i)) || (m = t.match(/\((LGPD|CTN|CDC|CBA)\)/))){ const k = m[1].toUpperCase(); return LEI_URL[k] ? PL + LEI_URL[k] + ancora(m[2]) : ""; }
  if((m = t.match(/^EC\s*103\/2019/i))) return PL + LEI_URL["EC 103/2019"];
  if((m = t.match(/^Decreto(?:-Lei)?\s+(\d{1,2}\.\d{3})/i))){ const u = DEC_URL[m[1]]; return u ? PL + u : "https://www.google.com/search?q=" + encodeURIComponent("Decreto " + m[1] + " planalto"); }
  if(/^(NR-\d+|Resolu)/i.test(t)) return "https://www.google.com/search?q=" + encodeURIComponent(t);
  return "";
};
P.linkFundamento = function(base){
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  return String(base||"").split(/;\s*/).map(seg=>{ const u = P.urlFundamento(seg); return u ? `<a class="fund-link" href="${esc(u)}" target="_blank" rel="noopener" title="Abrir a fonte">${esc(seg)}</a>` : esc(seg); }).join("; ");
};

/* ---------------- PESQUISA DE JURISPRUDÊNCIA ---------------- */
const g = (q, site) => "https://www.google.com/search?q=" + encodeURIComponent(q + " site:" + site);
P.ONDE_PESQUISAR = [
  ["stf","STF", q=>g(q,"stf.jus.br")],
  ["stj","STJ", q=>g(q,"stj.jus.br")],
  ["tst","TST", q=>g(q,"tst.jus.br")],
  ["tj","TJ do estado", (q,uf)=>g(q, uf==="DF" ? "tjdft.jus.br" : "tj"+String(uf||"sp").toLowerCase()+".jus.br")],
  ["trt","TRT da região", (q,n)=>g(q, "trt"+(n||2)+".jus.br")],
  ["jusbrasil","JusBrasil", q=>"https://www.jusbrasil.com.br/jurisprudencia/busca?q="+encodeURIComponent(q)],
  ["lexml","Legislação (LexML)", q=>"https://www.lexml.gov.br/busca/search?keyword="+encodeURIComponent(q)]
];

/* ---------------- BUSCA NA BASE ---------------- */
const norm = s => String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9§ ]+/g," ");
const PARADAS = new Set("a o e de da do das dos em no na nos nas um uma uns umas para por com sem que qual quais como quando onde quanto quantos e ou se ao aos as os meu minha sobre isso esse essa este esta tem ter ha pode posso deve devo sao foi ser fazer faz mais menos muito pra pro me te lhe nao sim entendi entender entendo processo processos dados gerais geral teste favor quero gostaria preciso voce vc mim eu ele ela isso aqui ok obrigado obrigada cadastre cadastrar crie criar gere gerar".split(" "));
const SIN = {demitido:"demissao", demitir:"demissao", mandado:"demissao", rescindir:"rescisao", recorrer:"recurso", recursos:"recurso", gravida:"gestante", gravidez:"gestante", inquilino:"despejo", aluguel:"despejo", heranca:"inventario", morreu:"inventario", liminar:"tutela", preso:"prisao", presa:"prisao", maconha:"drogas", trafico:"drogas", feriado:"prazo", vencimento:"prazo", contar:"contagem", conta:"contagem", hora:"horas", extra:"extras", pensao:"alimenticia", alimentos:"alimenticia", banco:"bancaria"};
/* ---------------- CORRETOR ORTOGRÁFICO (sem IA: distância de edição contra o vocabulário do app) ---------------- */
const PALAVRAS_APP = ("cadastre cadastrar cadastra cadastro crie criar cria novo nova novos novas incluir inclua inclui adicione adicionar adiciona registre registrar registra lance lancar lanca abra abrir abre insira inserir coloque colocar " +
  "processo processos cliente clientes audiencia audiencias prazo prazos reuniao reunioes diligencia diligencias peticao peticoes recurso recursos contestacao replica minuta minutas tarefa tarefas lembrete lembretes compromisso compromissos atividade atividades " +
  "agende agendar agenda marque marcar marca lembre lembrar relatorio relatorios imprimir imprima exportar exporte gere gerar gera emitir emita baixar baixe monte montar monta pauta carteira resumo panorama mensagem mensagens atualizacao atualizacoes whatsapp avise avisar email " +
  "andamento andamentos movimentacao movimentacoes documento documentos assinatura assinado assinada aguardando checklist cobrar cobre pedir peca pecas lista contrato contratos procuracao procuracoes inicial iniciais " +
  "financeiro cobranca cobrancas parcela parcelas receber recebidas inadimplencia inadimplentes honorarios vencidas vencido vencidos vencida atrasados atrasadas atrasado atendimento atendimentos contatos contato leads datajud verificar verifique atualizar atualize " +
  "semana hoje amanha ontem proximos proximas proxima proximo dias uteis corridos intimacao intimado publicacao publicado disponibilizacao trabalhista trabalho civel civil criminal penal familia consumidor empresarial tributario administrativo constitucional previdenciario ambiental digital compliance " +
  "fase fases jurisprudencia julgados julgado acordaos acordao precedentes precedente tribunal tribunais sumula sumulas status situacao consulta consultar numero pendentes pendencias pendente minhas meus minha atribuidas atribuido responsavel concluir conclua concluido " +
  "ajuda comandos telefone celular contra vara area teste exemplo dados gerais quais qual quando quanto quantos quantas mostre mostrar liste listar busque buscar procure procurar pesquise pesquisar encontre encontrar sobre preciso quero gostaria favor " +
  "segunda terca quarta quinta sexta sabado domingo janeiro fevereiro marco abril maio junho julho agosto setembro outubro novembro dezembro horas manha tarde noite equipe advogado advogada estagiario gestor escritorio modelo modelos configuracoes " +
  "indenizacao dano danos moral morais rescisao demissao verbas ferias aviso previo justa causa salario horas extras pensao alimenticia alimentos divorcio guarda inventario heranca despejo aluguel cobranca execucao penhora prisao preventiva fianca habeas corpus liberdade provisoria " +
  "aposentadoria beneficio inss auxilio doenca acidente imposto tributo icms iss multa licitacao servidor concurso empresa sociedade falencia recuperacao judicial consumidor produto defeito servico negativacao indevida voo atraso cancelamento bagagem plano saude").split(" ");
const COMUNS = ("para pela pelo pelas pelos com sem que qual como quando onde este esta esse essa isso isto aquele aquela tudo todo toda todos todas cada outro outra outros outras mesmo mesma muito muita muitos muitas pouco pouca mais menos tambem ainda agora depois antes entre sobre ate desde " +
  "fazer faca feito feita fiz fez tem tenho temos teve tinha estou esta estao estava estamos foram sera seria pode podem posso poderia deve devem devo precisa precisam vai vamos vou dar dou deu ver veja vejo olhe olhar saber sei sabe ficar fica ficou passar passa passou " +
  "dizer diga disse falar fale falou pedido pedidos caso casos parte partes pessoa pessoas nome nomes valor valores data datas hora tempo vez vezes coisa coisas forma modo tipo tipos geral grande pequeno primeiro primeira ultimo ultima novo velho certo errado bom boa " +
  "sim nao talvez obrigado obrigada please aqui ali onde porque pois entao assim apenas somente sempre nunca logo hoje ontem ano anos mes meses dia semana senhor senhora doutor doutora desta deste destes destas nesta neste nestes nestas dessa desse nessa nesse daquele daquela naquele naquela dela dele delas deles nela nele seus suas sua seu nossa nosso nossos nossas " +
  "previsao prevista previsto saida entrada conta contas casa casas pasta pastas porta mesa base bases lado lados campo campos texto textos linha linhas pagina paginas arquivo arquivos foto fotos prova provas juiz juiza vara varas comarca foro forum " +
  "mandar mande enviar envie enviado enviada receber recebi recebeu pagar pague pago paga pagamento ligar ligue ligou responder responda resposta perguntar pergunta duvida duvidas explicar explique entender significa significado diferenca " +
  "certidao audiencias marcada marcadas marcado remarcar cancelar cancele adiar adiada redesignada sentenca decisao despacho citacao intimacao mandado alvara acordo acordos homologacao cumprimento").split(" ");
const VOCAB = new Map();
const addVoc = (w, f) => { if(w.length>=3 && /^[a-z]+$/.test(w)) VOCAB.set(w, (VOCAB.get(w)||0) + (f||1)); };
PALAVRAS_APP.forEach(w=>addVoc(w, 50)); COMUNS.forEach(w=>addVoc(w, 30));
B.forEach(e=>norm(e.tema+" "+e.chaves+" "+e.resp).split(/\s+/).forEach(w=>addVoc(w, 1)));
function distancia(a, b, lim){
  if(Math.abs(a.length-b.length)>lim) return lim+1;
  const m = a.length, n = b.length, d = [];
  for(let i=0;i<=m;i++){ d[i] = [i]; }
  for(let j=1;j<=n;j++) d[0][j] = j;
  for(let i=1;i<=m;i++){ let min = 1e9;
    for(let j=1;j<=n;j++){ const c = a[i-1]===b[j-1] ? 0 : 1;
      d[i][j] = Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+c);
      if(i>1 && j>1 && a[i-1]===b[j-2] && a[i-2]===b[j-1]) d[i][j] = Math.min(d[i][j], d[i-2][j-2]+1);
      if(d[i][j]<min) min = d[i][j]; }
    if(min>lim) return lim+1; }
  return d[m][n];
}
const CACHE_COR = new Map();
P.corrigirPalavra = function(w){
  w = norm(w).trim(); if(w.length<4 || /\d/.test(w) || VOCAB.has(w) || PARADAS.has(w)) return w;
  if(CACHE_COR.has(w)) return CACHE_COR.get(w);
  const lim = w.length>=7 ? 2 : 1; let melhor = w, md = lim+1, mf = 0;
  for(const [v,f] of VOCAB){ if(v.length<3 || Math.abs(v.length-w.length)>lim) continue;
    const dd = distancia(w, v, lim); if(dd<md || (dd===md && f>mf)){ melhor = v; md = dd; mf = f; } }
  const r = md<=lim ? melhor : w; CACHE_COR.set(w, r); return r;
};
P.addVocab = function(textos){ let novo = false; (textos||[]).forEach(t=>norm(t).split(/\s+/).forEach(w=>{ if(w.length>=3 && !VOCAB.has(w)){ addVoc(w, 40); novo = true; } })); if(novo) CACHE_COR.clear(); };
/* corrige só palavras desconhecidas; preserva nomes próprios (com inicial maiúscula), números e o texto livre depois de ":" */
P.corrigirTexto = function(q){
  q = String(q||""); const i = q.indexOf(":"); const cab = i>=0 ? q.slice(0,i) : q, resto = i>=0 ? q.slice(i) : "";
  const trocas = []; let primeira = true;
  const out = cab.replace(/[A-Za-zÀ-ÖØ-öø-ÿ]+/g, w=>{
    const ehPrimeira = primeira; primeira = false;
    if(w.length<4 || (!ehPrimeira && /^[A-ZÀ-Ö]/.test(w))) return w;
    const c = P.corrigirPalavra(w); if(c===norm(w)) return w;
    trocas.push([w,c]); return c;
  });
  return {texto: out + resto, trocas};
};
const tokens = s => norm(s).split(/\s+/).filter(t=>t && t.length>1 && !PARADAS.has(t)).map(t=>P.corrigirPalavra(t)).map(t=>SIN[t]||t);
const stem = t => t.length>6 ? t.slice(0,6) : t;
const IDX = B.map(e=>({e, ch:new Set(tokens(e.chaves).map(stem)), te:new Set(tokens(e.tema).map(stem)), rp:norm(e.resp+" "+e.base)}));
P.BASE_DIREITO = B;
P.buscarBase = function(q, area, max, min){
  const ts = tokens(q); if(!ts.length) return [];
  return IDX.filter(x=>!area || area==="todas" || x.e.area===area || x.e.area==="geral").map(x=>{
    let s = 0;
    ts.forEach(t=>{ const st = stem(t); if(x.ch.has(st)) s += 3; else if(st.length>4 && [...x.ch].some(c=>c.length>4 && (c.startsWith(st) || st.startsWith(c)))) s += 2; if(x.te.has(st)) s += 2; if(st.length>3 && x.rp.includes(st)) s += 1; });
    return {e:x.e, s:s/Math.sqrt(ts.length)};
  }).filter(r=>r.s>=(min||1.5)).sort((a,b)=>b.s-a.s).filter((r,i,arr)=>r.s>=arr[0].s*0.6).slice(0, max||3).map(r=>r.e);
};
P.NOME_AREA_DIREITO = Object.assign({geral:"Geral"}, Object.fromEntries(Object.entries(P.AREAS||{}).map(([k,v])=>[k,v.nome])));
P.AVISO_BASE = "Base de consulta rápida do app, sem IA. Confira a redação vigente da lei e a jurisprudência atual antes de usar em peça ou orientação ao cliente.";
})(window.Pauta);
