/* Pauta Jurídica · base de Direito sem IA
   Respostas curtas com fundamento legal, súmulas e atalhos de pesquisa de jurisprudência.
   Tudo roda no navegador; nada é enviado para fora. Confira sempre a redação vigente na fonte oficial. */
(function(P){
const B = []; // base de respostas
const add = (area, tema, chaves, resp, base) => B.push({id:"d"+B.length, area, tema, chaves, resp, base});

/* ---------------- TRABALHISTA ---------------- */
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

/* ---------------- SÚMULAS DE CONSULTA FREQUENTE ---------------- */
P.SUMULAS = [
  ["STF","SV 11","Uso de algemas só em caso de resistência, fuga ou perigo, com justificativa escrita.","criminal"],
  ["STF","SV 14","O defensor tem acesso aos elementos de prova já documentados no inquérito.","criminal"],
  ["STF","SV 25","É ilícita a prisão civil do depositário infiel.","civel"],
  ["STF","SV 56","Falta de vaga no regime adequado não autoriza manter o preso em regime mais gravoso.","criminal"],
  ["STJ","54","Juros moratórios correm desde o evento danoso na responsabilidade extracontratual.","civel"],
  ["STJ","231","Atenuante não reduz a pena abaixo do mínimo legal.","criminal"],
  ["STJ","297","O CDC se aplica às instituições financeiras.","civel"],
  ["STJ","309","Prisão civil por alimentos: até as 3 parcelas anteriores à execução e as que vencerem no processo.","civel"],
  ["STJ","362","Correção do dano moral corre desde o arbitramento.","civel"],
  ["STJ","385","Negativação anterior legítima afasta dano moral por nova anotação, ressalvado o cancelamento.","civel"],
  ["STJ","444","Inquéritos e ações em curso não agravam a pena-base.","criminal"],
  ["STJ","479","Bancos respondem objetivamente por fraudes de terceiros em operações bancárias.","civel"],
  ["STJ","536","Suspensão do processo e transação penal não se aplicam à Lei Maria da Penha.","criminal"],
  ["STJ","589","Insignificância é inaplicável em violência doméstica contra a mulher.","criminal"],
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
  ["Lei Maria da Penha (11.340)", PL+"_ato2004-2006/2006/lei/l11340.htm"]
];

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
const tokens = s => norm(s).split(/\s+/).filter(t=>t && t.length>1 && !PARADAS.has(t)).map(t=>SIN[t]||t);
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
P.NOME_AREA_DIREITO = {trabalhista:"Trabalhista", civel:"Cível", criminal:"Criminal", geral:"Geral"};
P.AVISO_BASE = "Base de consulta rápida do app, sem IA. Confira a redação vigente da lei e a jurisprudência atual antes de usar em peça ou orientação ao cliente.";
})(window.Pauta);
