export type ChatStart =
  | "analise"
  | "vencendo"
  | "pagamento"
  | "credito"
  | "comparacao"
  | "vencidos"
  | "boletos"
  | "risco"
  | "fluxocaixa"
  | "dda";

export type ChatRouteResult = {
  start: ChatStart;
  variant?: string;
};

const pagamentoTerms = [
  "realizar pagamento","realizar o pagamento","realizar pagamentos","realizar os pagamentos",
  "efetuar pagamento","efetuar os pagamentos","pagar título","pagar titulo","pagar títulos","pagar titulos",
  "fazer pagamento","fazer os pagamentos","autorizar pagamento","autorizar os pagamentos",
  "pague os boletos","pague os boletos de hoje","realizar pagamentos de boleto","pagar boletos de hoje",
  "pagar boleto","pagar boletos",
];
const tituloTerms = [
  "título","titulo","títulos","titulos","vencendo hoje","vencimento hoje","vencer hoje",
  "vencido","vencidos","pagamento de hoje","pagamentos de hoje","recebimento de hoje",
  "recebimentos de hoje","pagar e receber","receber e pagar",
];
const creditoTerms = [
  "avaliar crédito","avaliar credito","avaliar créditos","avaliar creditos",
  "créditos disponíveis","creditos disponiveis","crédito disponível","credito disponivel",
  "ofertas de crédito","ofertas de credito","oferta de crédito","oferta de credito",
  "melhor crédito","melhor credito","melhores créditos","melhores creditos",
  "melhores opções de crédito","melhores opcoes de credito","opções de crédito","opcoes de credito",
  "qual o melhor crédito","qual o melhor credito","crédito","credito","créditos","creditos",
  "linhas de crédito","linhas de credito","empréstimo","emprestimo","antecipação","antecipacao","capital de giro",
];
const comparacaoTerms = [
  "comparar","comparação","comparacao","compare "," vs "," versus ","comparativo",
  "ano contra ano","yoy","year over year","período financeiro","periodo financeiro",
  "últimos 2 meses","ultimos 2 meses","últimos dois meses","ultimos dois meses",
  "últimos meses","ultimos meses","últimos 2 anos","ultimos 2 anos","últimos dois anos",
  "ultimos dois anos","últimos anos","ultimos anos","últimos trimestres","ultimos trimestres",
  "últimos semestres","ultimos semestres","mês passado","mes passado","ano passado",
  "compara ","compra os últimos","compra os ultimos",
];
const analiseTerms = [
  "análise financeira","analise financeira","análise receita","analise receita",
  "receita","despesa","financeir",
];
const vencidosReceberTerms = [
  "títulos vencidos","titulos vencidos","título vencido","titulo vencido",
  "recebimento vencido","recebimentos vencidos","recebimento em atraso","recebimentos em atraso",
  "receber em atraso","a receber em atraso","ainda não foram pagos","ainda nao foram pagos",
  "não pagaram","nao pagaram","não pagos pelos meus clientes","nao pagos pelos meus clientes",
  "inadimplên","inadimplen","inadimplência","inadimplencia","clientes em atraso",
  "cobrança","cobranca","em atraso","estão em atraso","estao em atraso","atrasado","atrasados",
  "títulos atrasados","titulos atrasados","títulos a receber","titulos a receber","title a receber",
];
const boletosTerms = [
  "emitir novos boletos","emitir boletos","novos boletos","gerar boletos","gerar novos boletos",
  "emitir boleto","novo boleto","boletos de cobrança","boletos de cobranca",
  "realizar cobrança","realizar cobranca","fazer cobrança","fazer cobranca",
  "iniciar cobrança","iniciar cobranca","ativar régua de cobrança","ativar regua de cobranca",
  "régua de cobrança","regua de cobranca","disparar cobrança","disparar cobranca",
  "cobrar clientes","cobrar os clientes",
];
const fluxoCaixaTerms = [
  "fluxo de caixa","fluxo caixa","projeção do fluxo","projecao do fluxo",
  "projeção de caixa","projecao de caixa","avaliar fluxo","como está o fluxo",
  "como esta o fluxo","previsão de caixa","previsao de caixa",
];
const riscoTerms = [
  "saúde da minha carteira","saude da minha carteira","saúde da carteira","saude da carteira",
  "saúde carteira","saude carteira","score do meu cliente","score dos meus clientes",
  "score do meus clientes","score dos clientes","score do cliente","score de cliente",
  "análise de risco","analise de risco","análise dos risco","analise dos risco",
  "risco do cliente","risco dos clientes","risco dos meus clientes","risco do meus clientes",
  "risco da carteira","risco de crédito","risco de credito","perfil de risco",
  "exposição da carteira","exposicao da carteira","carteira de clientes",
  "minha carteira de clientes","minha carteira",
  "saúde financeira da minha carteira","saude financeira da minha carteira",
  "saúde financeira da carteira","saude financeira da carteira",
  "visão da minha carteira","visao da minha carteira","visão da carteira","visao da carteira",
  "clientes com maior risco","clientes de maior risco","maior risco","clientes mais arriscados",
];

const ddaTerms = [
  "dda","busca dda","buscar dda","buscar novos dda","novos dda",
  "boletos dda","boleto dda","lançamentos dda","lancamentos dda","lançamento dda","lancamento dda",
  "dda vinculados","dda vinculado","dda agendados","dda agendado","dda programado","dda programados",
  "dda pendente","dda pendentes","dda sem vínculo","dda sem vinculo",
  "títulos de recebimento","titulos de recebimento","título de recebimento","titulo de recebimento",
];

export function resolveChatRoute(text: string): ChatRouteResult | undefined {
  const lower = text.toLowerCase();
  let start: ChatStart | undefined;
  if (ddaTerms.some((t) => lower.includes(t))) start = "dda";
  else if (fluxoCaixaTerms.some((t) => lower.includes(t))) start = "fluxocaixa";
  else if (riscoTerms.some((t) => lower.includes(t))) start = "risco";
  else if (boletosTerms.some((t) => lower.includes(t))) start = "boletos";
  else if (vencidosReceberTerms.some((t) => lower.includes(t))) start = "vencidos";
  else if (comparacaoTerms.some((t) => lower.includes(t))) start = "comparacao";
  else if (creditoTerms.some((t) => lower.includes(t))) start = "credito";
  else if (pagamentoTerms.some((t) => lower.includes(t))) start = "pagamento";
  else if (tituloTerms.some((t) => lower.includes(t))) start = "vencendo";
  else if (analiseTerms.some((t) => lower.includes(t))) start = "analise";
  if (!start) return undefined;
  const result: ChatRouteResult = { start };
  if (start === "comparacao") {
    const mesesTerms = [
      "últimos 2 meses","ultimos 2 meses","últimos dois meses","ultimos dois meses",
      "últimos meses","ultimos meses","mês passado","mes passado","fevereiro","março","marco",
    ];
    result.variant = mesesTerms.some((t) => lower.includes(t)) ? "meses" : "anos";
  }
  return result;
}
