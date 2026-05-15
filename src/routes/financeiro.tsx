import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Inbox,
  Crop,
  Bell,
  Tag,
  RefreshCw,
  Briefcase,
  Contact,
  Sparkles,
  ShoppingBag,
  User,
  FileText,
  Maximize2,
  Search,
  Plus,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Wallet,
  Send,
  CalendarClock,
  AlertCircle,
  CheckCircle2,
  Download,
  Loader2,
  Star,
  Clock,
  Filter,
  ArrowUpDown,
  CheckCircle,
  TrendingUp as TrendingUpIcon,
  ChevronDown,
  ChevronUp,
  Receipt,
  Mail,
  Phone,
  MessageSquare,
  Scale,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Users,
} from "lucide-react";

const creditoOfertas = [
  {
    nome: "FinanBank",
    linha: "Antecipação de Recebíveis",
    aderencia: 97,
    tags: ["Melhor Taxa", "Liberação Rápida"],
    taxa: "1,29%",
    cet: "18,40%",
    parcela: "R$ 683.940",
    limite: "até R$ 2.000.000",
    economia: "R$ 12.400",
    garantias: "Duplicatas, Notas Fiscais",
    liberacao: "4h",
  },
  {
    nome: "SafeCredit",
    linha: "Risco Sacado",
    aderencia: 94,
    tags: ["Menor CET", "Alta Aderência"],
    taxa: "0,99%",
    cet: "14,20%",
    parcela: "R$ 862.445",
    limite: "até R$ 5.000.000",
    economia: "R$ 23.800",
    garantias: "Contrato com Sacado",
    liberacao: "48h",
  },
  {
    nome: "CapitalPro",
    linha: "Capital de Giro",
    aderencia: 91,
    tags: ["Recomendado", "Melhor Custo-Benefício"],
    taxa: "1,65%",
    cet: "22,30%",
    parcela: "R$ 152.394",
    limite: "até R$ 3.000.000",
    economia: "R$ 18.700",
    garantias: "Imóvel, Aval dos Sócios",
    liberacao: "48h",
  },
];

export const Route = createFileRoute("/financeiro")({
  validateSearch: (search: Record<string, unknown>) => ({
    start: typeof search.start === "string" ? search.start : undefined,
    variant: typeof search.variant === "string" ? search.variant : undefined,
  }),
  component: Index,
});

type View = "empty" | "chart" | "vencendo" | "processing" | "comprovantes" | "credito" | "comparacao" | "vencidos" | "boletos" | "risco";
type ProcessingTarget = "comprovantes" | "credito" | "comparacao" | "vencidos" | "boletos" | "risco";
type ComparacaoVariant = "anos" | "meses";

const comparacaoDataAnos = {
  periodoA: "Março 2026",
  periodoB: "Março 2025",
  metricas: [
    { label: "Receita", a: 92000, b: 72000, format: "currency", positiveIsGood: true },
    { label: "Custo", a: 64000, b: 58000, format: "currency", positiveIsGood: false },
    { label: "Caixa", a: 28000, b: 14000, format: "currency", positiveIsGood: true },
    { label: "Necessidade de crédito", a: 0, b: 35000, format: "currency", positiveIsGood: false },
    { label: "Custo de juros", a: 1200, b: 4800, format: "currency", positiveIsGood: false },
  ],
  serie: [
    { label: "Receita", a: 92, b: 72 },
    { label: "Custo", a: 64, b: 58 },
    { label: "Margem", a: 28, b: 14 },
  ],
  insights: [
    {
      title: "Receita cresceu 27,8% YoY",
      desc: "Mar/2026 fechou em R$ 92k vs R$ 72k em Mar/2025. Crescimento puxado pelos 5 maiores clientes (+R$ 14k).",
      impact: "+R$ 20k receita",
      tone: "positive" as const,
    },
    {
      title: "Custos subiram menos que a receita",
      desc: "Custo cresceu 10,3% (R$ 58k → R$ 64k), abaixo da receita. Margem operacional ganhou 11pp.",
      impact: "+11pp margem",
      tone: "positive" as const,
    },
    {
      title: "Caixa dobrou no comparativo anual",
      desc: "Posição de caixa saiu de R$ 14k para R$ 28k, reduzindo dependência de capital de terceiros.",
      impact: "+100% caixa",
      tone: "positive" as const,
    },
    {
      title: "Necessidade de crédito zerada",
      desc: "Em Mar/2025 foi necessário captar R$ 35k. Em Mar/2026 a operação se autofinanciou.",
      impact: "-R$ 35k captação",
      tone: "positive" as const,
    },
    {
      title: "Despesa financeira caiu 75%",
      desc: "Juros pagos passaram de R$ 4,8k para R$ 1,2k, reflexo do menor uso de crédito.",
      impact: "-R$ 3,6k juros",
      tone: "positive" as const,
    },
    {
      title: "Atenção ao mix de custos",
      desc: "Apesar do crescimento saudável, custos fixos representam 62% (vs 55% em 2025). Avaliar renegociação.",
      impact: "+7pp custo fixo",
      tone: "warning" as const,
    },
  ],
};

const comparacaoDataMeses: typeof comparacaoDataAnos = {
  periodoA: "Março 2026",
  periodoB: "Fevereiro 2026",
  metricas: [
    { label: "Receita", a: 92000, b: 81000, format: "currency", positiveIsGood: true },
    { label: "Custo", a: 64000, b: 60000, format: "currency", positiveIsGood: false },
    { label: "Caixa", a: 28000, b: 22000, format: "currency", positiveIsGood: true },
    { label: "Necessidade de crédito", a: 0, b: 8000, format: "currency", positiveIsGood: false },
    { label: "Custo de juros", a: 1200, b: 1900, format: "currency", positiveIsGood: false },
  ],
  serie: [
    { label: "Receita", a: 92, b: 81 },
    { label: "Custo", a: 64, b: 60 },
    { label: "Margem", a: 28, b: 21 },
  ],
  insights: [
    {
      title: "Receita cresceu 13,6% no mês",
      desc: "Mar/2026 fechou em R$ 92k vs R$ 81k em Fev/2026. Aumento puxado por novos contratos fechados na 2ª quinzena.",
      impact: "+R$ 11k receita",
      tone: "positive" as const,
    },
    {
      title: "Custos sob controle",
      desc: "Custo cresceu apenas 6,7% (R$ 60k → R$ 64k), abaixo do ritmo da receita. Margem ganhou 4pp.",
      impact: "+4pp margem",
      tone: "positive" as const,
    },
    {
      title: "Caixa fortaleceu 27%",
      desc: "Posição de caixa subiu de R$ 22k para R$ 28k, sustentada por melhor giro de recebíveis.",
      impact: "+R$ 6k caixa",
      tone: "positive" as const,
    },
    {
      title: "Necessidade de crédito zerada",
      desc: "Em Fev/2026 ainda foi preciso captar R$ 8k. Em Mar/2026 a operação se autofinanciou.",
      impact: "-R$ 8k captação",
      tone: "positive" as const,
    },
    {
      title: "Despesa financeira caiu 36,8%",
      desc: "Juros pagos passaram de R$ 1,9k para R$ 1,2k, reflexo da menor utilização de crédito no mês.",
      impact: "-R$ 0,7k juros",
      tone: "positive" as const,
    },
    {
      title: "Atenção à concentração de receita",
      desc: "65% da receita de Mar/2026 vem de 3 clientes (vs 52% em Fev/2026). Avaliar diversificação da carteira.",
      impact: "+13pp concentração",
      tone: "warning" as const,
    },
  ],
};

function SideIcon({
  icon: Icon,
  active = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}) {
  return (
    <button
      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
        active
          ? "bg-muted text-foreground"
          : "text-sidebar-foreground hover:bg-muted"
      }`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

const chartData = [
  { month: "Ago", receita: 70, despesa: 50 },
  { month: "Set", receita: 74, despesa: 54 },
  { month: "Out", receita: 80, despesa: 56 },
  { month: "Nov", receita: 76, despesa: 58 },
  { month: "Dez", receita: 90, despesa: 62 },
  { month: "Jan", receita: 78, despesa: 52 },
  { month: "Fev", receita: 85, despesa: 60 },
  { month: "Mar", receita: 72, despesa: 58 },
  { month: "Abr", receita: 92, despesa: 64 },
  { month: "Mai", receita: 88, despesa: 70 },
  { month: "Jun", receita: 96, despesa: 68 },
  { month: "Jul", receita: 105, despesa: 74 },
];

const titulosVencendoHoje = [
  { id: "TIT-001", cliente: "Mercado Vista Alegre", documento: "NF 12345", valor: "R$ 4.250,00", status: "A receber", tipo: "receita" },
  { id: "TIT-002", cliente: "Distribuidora Norte Sul", documento: "NF 12346", valor: "R$ 12.800,00", status: "A receber", tipo: "receita" },
  { id: "TIT-003", cliente: "Energia Brasil S/A", documento: "Boleto 88291", valor: "R$ 2.140,00", status: "A pagar", tipo: "despesa" },
  { id: "TIT-004", cliente: "Padaria Central", documento: "NF 12347", valor: "R$ 980,00", status: "A receber", tipo: "receita" },
  { id: "TIT-005", cliente: "Aluguel Sede", documento: "Contrato 0021", valor: "R$ 8.500,00", status: "A pagar", tipo: "despesa" },
];

const titulosVencidosReceber = [
  {
    id: "REC-1042",
    cliente: "Mercado Vista Alegre",
    documento: "NF 11820",
    emissao: "12/02/2026",
    vencimento: "27/02/2026",
    diasAtraso: 77,
    valorOriginal: 4250,
    juros: 218.45,
    multa: 85,
    valorAtualizado: 4553.45,
    meioPagamento: "Boleto",
  },
  {
    id: "REC-1058",
    cliente: "Distribuidora Norte Sul",
    documento: "NF 11885",
    emissao: "20/02/2026",
    vencimento: "06/03/2026",
    diasAtraso: 70,
    valorOriginal: 12800,
    juros: 597.33,
    multa: 256,
    valorAtualizado: 13653.33,
    meioPagamento: "Boleto",
  },
  {
    id: "REC-1071",
    cliente: "Padaria Central",
    documento: "NF 11932",
    emissao: "01/03/2026",
    vencimento: "16/03/2026",
    diasAtraso: 60,
    valorOriginal: 980,
    juros: 39.2,
    multa: 19.6,
    valorAtualizado: 1038.8,
    meioPagamento: "Pix",
  },
  {
    id: "REC-1090",
    cliente: "Tech Solutions Ltda",
    documento: "NF 12011",
    emissao: "10/03/2026",
    vencimento: "25/03/2026",
    diasAtraso: 51,
    valorOriginal: 6320,
    juros: 215.04,
    multa: 126.4,
    valorAtualizado: 6661.44,
    meioPagamento: "TED",
  },
  {
    id: "REC-1112",
    cliente: "Farmácia Saúde+",
    documento: "NF 12077",
    emissao: "22/03/2026",
    vencimento: "06/04/2026",
    diasAtraso: 39,
    valorOriginal: 2780,
    juros: 72.28,
    multa: 55.6,
    valorAtualizado: 2907.88,
    meioPagamento: "Boleto",
  },
  {
    id: "REC-1133",
    cliente: "Restaurante Sabor da Terra",
    documento: "NF 12148",
    emissao: "05/04/2026",
    vencimento: "20/04/2026",
    diasAtraso: 25,
    valorOriginal: 3450,
    juros: 57.5,
    multa: 69,
    valorAtualizado: 3576.5,
    meioPagamento: "Pix",
  },
  {
    id: "REC-1156",
    cliente: "Auto Peças Veloz",
    documento: "NF 12219",
    emissao: "18/04/2026",
    vencimento: "03/05/2026",
    diasAtraso: 12,
    valorOriginal: 8750,
    juros: 70,
    multa: 175,
    valorAtualizado: 8995,
    meioPagamento: "Boleto",
  },
];

const carteiraRisco = {
  scoreGeral: 78,
  saudeLabel: "Saudável",
  totalCarteira: 248500,
  inadimplencia: 6.4,
  tendencia: -1.2,
  distribuicao: [
    { faixa: "Baixo risco", clientes: 14, valor: 158400, cor: "oklch(0.72 0.14 160)", pct: 64 },
    { faixa: "Risco moderado", clientes: 7, valor: 58700, cor: "oklch(0.78 0.13 85)", pct: 24 },
    { faixa: "Alto risco", clientes: 4, valor: 23900, cor: "oklch(0.7 0.16 45)", pct: 9 },
    { faixa: "Crítico", clientes: 2, valor: 7500, cor: "oklch(0.6 0.18 25)", pct: 3 },
  ],
  clientes: [
    {
      nome: "Mercado Vista Alegre",
      segmento: "Varejo alimentar",
      score: 92,
      tendencia: 3,
      faixa: "Baixo",
      limite: 25000,
      utilizado: 12400,
      atraso: 0,
      ticket: 4250,
      ultimaCompra: "08/05/2026",
      sinais: ["Pagamentos em dia há 18 meses", "Compras crescentes", "Score Serasa 820"],
    },
    {
      nome: "Distribuidora Norte Sul",
      segmento: "Distribuição",
      score: 84,
      tendencia: 1,
      faixa: "Baixo",
      limite: 60000,
      utilizado: 38200,
      atraso: 0,
      ticket: 12800,
      ultimaCompra: "11/05/2026",
      sinais: ["Cliente fiel há 4 anos", "Aumento de frequência", "Boa reputação no mercado"],
    },
    {
      nome: "Tech Solutions Ltda",
      segmento: "Tecnologia",
      score: 71,
      tendencia: -2,
      faixa: "Moderado",
      limite: 30000,
      utilizado: 22100,
      atraso: 12,
      ticket: 6320,
      ultimaCompra: "02/05/2026",
      sinais: ["1 título em atraso", "Utilização do limite em 73%", "Score Serasa em queda"],
    },
    {
      nome: "Padaria Central",
      segmento: "Varejo alimentar",
      score: 68,
      tendencia: -1,
      faixa: "Moderado",
      limite: 8000,
      utilizado: 5200,
      atraso: 18,
      ticket: 980,
      ultimaCompra: "28/04/2026",
      sinais: ["Atraso recorrente em < 30 dias", "Volume estável", "Sem registros negativos"],
    },
    {
      nome: "Auto Peças Veloz",
      segmento: "Autopeças",
      score: 58,
      tendencia: -4,
      faixa: "Alto",
      limite: 15000,
      utilizado: 13800,
      atraso: 25,
      ticket: 8750,
      ultimaCompra: "20/04/2026",
      sinais: ["Limite quase esgotado", "Atrasos crescentes", "Queda de 12% no faturamento"],
    },
    {
      nome: "Restaurante Sabor da Terra",
      segmento: "Alimentação",
      score: 45,
      tendencia: -8,
      faixa: "Crítico",
      limite: 6000,
      utilizado: 5800,
      atraso: 42,
      ticket: 3450,
      ultimaCompra: "15/03/2026",
      sinais: ["Atraso > 40 dias", "Negativação no SPC", "Redução de pedidos"],
    },
  ],
  alertas: [
    {
      titulo: "Concentração em 3 clientes",
      desc: "55% da carteira está concentrada em apenas 3 clientes. Diversifique para reduzir exposição.",
      tone: "warning" as const,
    },
    {
      titulo: "2 clientes em situação crítica",
      desc: "Restaurante Sabor da Terra e mais 1 cliente acumulam R$ 7,5k em risco elevado de inadimplência.",
      tone: "negative" as const,
    },
    {
      titulo: "Score médio da carteira: 78",
      desc: "Acima da média do setor (72). Mantenha a política atual de concessão e revise mensalmente.",
      tone: "positive" as const,
    },
    {
      titulo: "Inadimplência caindo",
      desc: "Índice passou de 7,6% para 6,4% nos últimos 60 dias. Reflexo da régua de cobrança ativa.",
      tone: "positive" as const,
    },
  ],
};

type Message = { id: number; text: string; from: "user" | "bot" };


function Index() {
  const max = 120;
  const { start, variant } = Route.useSearch();
  const processingStarts = ["pagamento", "credito", "comparacao", "vencidos", "boletos", "risco"];
  const initialView: View =
    start === "analise"
      ? "chart"
      : start === "vencendo"
        ? "vencendo"
        : start && processingStarts.includes(start)
          ? "processing"
          : "empty";
  const initialTarget: ProcessingTarget =
    start === "credito"
      ? "credito"
      : start === "comparacao"
        ? "comparacao"
        : start === "vencidos"
          ? "vencidos"
          : start === "boletos"
            ? "boletos"
            : start === "risco"
              ? "risco"
              : "comprovantes";
  const initialVariant: ComparacaoVariant = variant === "meses" ? "meses" : "anos";
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [view, setView] = useState<View>(initialView);
  const [processingTarget, setProcessingTarget] = useState<ProcessingTarget>(initialTarget);
  const [comparacaoVariant, setComparacaoVariant] = useState<ComparacaoVariant>(initialVariant);
  const [expandedBoleto, setExpandedBoleto] = useState<string | null>(null);
  const [selectedCliente, setSelectedCliente] = useState<
    null | (typeof carteiraRisco.clientes)[number]
  >(null);
  const comparacaoData =
    comparacaoVariant === "meses" ? comparacaoDataMeses : comparacaoDataAnos;
  const [selectedComprovante, setSelectedComprovante] = useState<
    null | { id: string; cliente: string; documento: string; valor: string; autenticacao: string }
  >(null);
  const [autenticacoes] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      titulosVencendoHoje
        .filter((t) => t.tipo === "despesa")
        .map((t) => [t.id, Math.random().toString(36).slice(2, 10).toUpperCase()]),
    ),
  );

  useEffect(() => {
    if (view === "processing") {
      const t = setTimeout(() => setView(processingTarget), 5000);
      return () => clearTimeout(t);
    }
  }, [view, processingTarget]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: Date.now(), text, from: "user" }]);
    setInput("");
    const lower = text.toLowerCase();
    const pagamentoTerms = [
      "realizar pagamento",
      "realizar o pagamento",
      "realizar pagamentos",
      "realizar os pagamentos",
      "efetuar pagamento",
      "efetuar os pagamentos",
      "pagar títulos",
      "pagar titulos",
      "pagar os títulos",
      "pagar os titulos",
      "fazer pagamento",
      "fazer os pagamentos",
    ];
    const vencendoTerms = [
      "vencendo hoje",
      "vencimento hoje",
      "vencer hoje",
      "a vencer",
      "vencido",
      "vencidos",
      "pagamento de hoje",
      "pagamentos de hoje",
      "recebimento de hoje",
      "recebimentos de hoje",
      "pagar e receber",
      "receber e pagar",
      "título",
      "titulo",
    ];
    const creditoTerms = [
      "crédito",
      "credito",
      "créditos",
      "creditos",
      "ofertas de crédito",
      "ofertas de credito",
      "linhas de crédito",
      "linhas de credito",
      "empréstimo",
      "emprestimo",
      "antecipação",
      "antecipacao",
      "capital de giro",
    ];
    const comparacaoTerms = [
      "comparar",
      "comparação",
      "comparacao",
      "compare ",
      "vs ",
      " versus ",
      "comparativo",
      "ano contra ano",
      "yoy",
      "year over year",
      "período financeiro",
      "periodo financeiro",
      "últimos 2 meses",
      "ultimos 2 meses",
      "últimos dois meses",
      "ultimos dois meses",
      "últimos meses",
      "ultimos meses",
      "últimos 2 anos",
      "ultimos 2 anos",
      "últimos dois anos",
      "ultimos dois anos",
      "últimos anos",
      "ultimos anos",
      "últimos trimestres",
      "ultimos trimestres",
      "últimos semestres",
      "ultimos semestres",
      "mês passado",
      "mes passado",
      "ano passado",
      "compara ",
      "compra os últimos",
      "compra os ultimos",
    ];
    const vencidosReceberTerms = [
      "títulos vencidos",
      "titulos vencidos",
      "título vencido",
      "titulo vencido",
      "recebimento vencido",
      "recebimentos vencidos",
      "recebimento em atraso",
      "recebimentos em atraso",
      "receber em atraso",
      "a receber em atraso",
      "ainda não foram pagos",
      "ainda nao foram pagos",
      "não pagaram",
      "nao pagaram",
      "não pagos pelos meus clientes",
      "nao pagos pelos meus clientes",
      "inadimplên",
      "inadimplen",
      "inadimplência",
      "inadimplencia",
      "clientes em atraso",
      "cobrança",
      "cobranca",
      "em atraso",
      "estão em atraso",
      "estao em atraso",
      "atrasado",
      "atrasados",
      "títulos atrasados",
      "titulos atrasados",
      "títulos a receber",
      "titulos a receber",
      "title a receber",
    ];
    const boletosTerms = [
      "emitir novos boletos",
      "emitir boletos",
      "novos boletos",
      "gerar boletos",
      "gerar novos boletos",
      "emitir boleto",
      "novo boleto",
      "boletos de cobrança",
      "boletos de cobranca",
      "realizar cobrança",
      "realizar cobranca",
      "fazer cobrança",
      "fazer cobranca",
      "iniciar cobrança",
      "iniciar cobranca",
      "ativar régua de cobrança",
      "ativar regua de cobranca",
      "régua de cobrança",
      "regua de cobranca",
      "disparar cobrança",
      "disparar cobranca",
      "cobrar clientes",
      "cobrar os clientes",
    ];
    const riscoTerms = [
      "saúde da minha carteira",
      "saude da minha carteira",
      "saúde da carteira",
      "saude da carteira",
      "saúde carteira",
      "saude carteira",
      "score do meu cliente",
      "score dos meus clientes",
      "score do meus clientes",
      "score dos clientes",
      "score do cliente",
      "score de cliente",
      "análise de risco",
      "analise de risco",
      "análise dos risco",
      "analise dos risco",
      "risco do cliente",
      "risco dos clientes",
      "risco dos meus clientes",
      "risco do meus clientes",
      "risco da carteira",
      "risco de crédito",
      "risco de credito",
      "perfil de risco",
      "exposição da carteira",
      "exposicao da carteira",
      "carteira de clientes",
    ];
    if (riscoTerms.some((t) => lower.includes(t))) {
      setProcessingTarget("risco");
      setView("processing");
    } else if (boletosTerms.some((t) => lower.includes(t))) {
      setProcessingTarget("boletos");
      setView("processing");
    } else if (vencidosReceberTerms.some((t) => lower.includes(t))) {
      setProcessingTarget("vencidos");
      setView("processing");
    } else if (comparacaoTerms.some((t) => lower.includes(t))) {
      const mesesTerms = [
        "últimos 2 meses",
        "ultimos 2 meses",
        "últimos dois meses",
        "ultimos dois meses",
        "últimos meses",
        "ultimos meses",
        "mês passado",
        "mes passado",
        "fevereiro",
        "março",
        "marco",
      ];
      setComparacaoVariant(mesesTerms.some((t) => lower.includes(t)) ? "meses" : "anos");
      setProcessingTarget("comparacao");
      setView("processing");
    } else if (creditoTerms.some((t) => lower.includes(t))) {
      setProcessingTarget("credito");
      setView("processing");
    } else if (pagamentoTerms.some((t) => lower.includes(t))) {
      setProcessingTarget("comprovantes");
      setView("processing");
    } else if (vencendoTerms.some((t) => lower.includes(t))) {
      setView("vencendo");
    } else if (
      lower.includes("análise financeira") ||
      lower.includes("analise financeira") ||
      lower.includes("receita") ||
      lower.includes("despesa") ||
      lower.includes("financeir")
    ) {
      setView("chart");
    }
  };

  const totalReceber = "R$ 24.350,00";
  const totalPagar = "R$ 10.640,00";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left sidebar */}
      <aside className="flex w-16 flex-col items-center justify-between border-r border-border bg-sidebar py-5">
        <div className="flex flex-col items-center gap-5">
          <Link to="/" className="text-primary">
            <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 22c4-8 12-8 16 0" />
              <path d="M6 10c4 8 12 8 16 0" />
            </svg>
          </Link>
          <nav className="mt-4 flex flex-col items-center gap-2">
            <SideIcon icon={Inbox} />
            <SideIcon icon={Crop} />
            <SideIcon icon={Bell} />
            <SideIcon icon={Tag} />
            <SideIcon icon={RefreshCw} />
            <SideIcon icon={Briefcase} active />
            <SideIcon icon={Contact} />
          </nav>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-primary hover:bg-muted">
          <Sparkles className="h-5 w-5" />
        </button>
      </aside>

      {/* Conversation column */}
      <section className="flex w-[340px] flex-col border-r border-border bg-card">
        <header className="flex items-center justify-between px-6 py-5">
          <h1 className="text-base font-medium text-foreground">Gerente financeiro</h1>
          <button className="text-muted-foreground hover:text-foreground">
            <Maximize2 className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-4">
          {view === "chart" && (
            <div className="space-y-3 text-sm text-foreground">
              <p>Qual período você quer analisar?</p>
              <div className="flex flex-col items-start gap-2 pt-1">
                <button className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2 text-sm text-primary transition-colors hover:bg-accent">
                  <BarChart3 className="h-4 w-4" />
                  Últimos 12 meses
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2 text-sm text-primary transition-colors hover:bg-accent">
                  <Plus className="h-4 w-4" />
                  Outro período
                </button>
              </div>
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id}>
              {m.from === "user" ? (
                <div className="flex justify-center">
                  <div className="rounded-full bg-bubble px-5 py-2.5 text-sm text-bubble-foreground">
                    {m.text}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-foreground">{m.text}</p>
              )}
            </div>
          ))}
          {view === "vencendo" && (
            <p className="text-sm text-foreground">
              Encontrei {titulosVencendoHoje.length} títulos com vencimento para hoje. Veja a lista ao lado.
            </p>
          )}
        </div>

        <div className="space-y-2 px-6 pb-5">
          <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Pergunte ao gerente financeiro..."
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={handleSend}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
              aria-label="Enviar"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <p className="text-center text-[11px] text-muted-foreground">
            A BIA é uma IA e pode cometer erros. Verifique informações importantes
          </p>
        </div>
      </section>

      {/* Main panel */}
      <main className="flex min-h-0 flex-1 flex-col p-6">
        {view === "empty" ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-lg font-medium text-foreground">
              Como posso ajudar com sua análise financeira?
            </h2>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Comece pedindo, por exemplo, "Gostaria de fazer a análise financeira" ou "Quais títulos vencem hoje".
            </p>
          </div>
        ) : view === "processing" ? (
          <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card/40 text-center">
            <div
              className="absolute h-[420px] w-[420px] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.72 0.14 160 / 0.55) 0%, oklch(0.72 0.14 160 / 0) 70%)",
              }}
            />
            <div className="relative z-10 flex flex-col items-center">
              <Loader2 className="mb-6 h-8 w-8 animate-spin text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                Carregando informações
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {processingTarget === "credito"
                  ? "Pensando a melhor forma de você visualizar as ofertas de crédito..."
                  : processingTarget === "comparacao"
                    ? "Analisando os períodos e gerando insights da comparação financeira..."
                    : processingTarget === "vencidos"
                      ? "Analisando os títulos financeiros e calculando juros e multas dos atrasos..."
                      : processingTarget === "boletos"
                        ? "Emitindo novos boletos e ativando a régua de cobrança para cada título..."
                        : processingTarget === "risco"
                          ? "Analisando o score, histórico e exposição de cada cliente da carteira..."
                          : "Pensando a melhor forma de você visualizar seus comprovantes..."}
              </p>
            </div>
          </div>
        ) : view === "comprovantes" ? (
          <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-border bg-card shadow-sm">
            <header className="flex items-start gap-4 border-b border-border px-8 py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-medium text-foreground">
                  Pagamentos realizados com sucesso
                </h2>
                <p className="text-sm text-muted-foreground">
                  Confira abaixo os comprovantes dos títulos pagos hoje
                </p>
              </div>
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                {titulosVencendoHoje.filter((t) => t.tipo === "despesa").length} pagamentos
              </span>
            </header>
            <div className="flex-1 space-y-3 overflow-auto px-8 py-6">
              {titulosVencendoHoje
                .filter((t) => t.tipo === "despesa")
                .map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() =>
                      setSelectedComprovante({
                        id: t.id,
                        cliente: t.cliente,
                        documento: t.documento,
                        valor: t.valor,
                        autenticacao: autenticacoes[t.id],
                      })
                    }
                    className="flex w-full items-center gap-4 rounded-2xl border border-border bg-background px-5 py-4 text-left transition-colors hover:border-primary/40 hover:bg-accent/40"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-foreground">
                          {t.cliente}
                        </p>
                        <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                          Pago
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {t.documento} • {t.id} • Autenticação {autenticacoes[t.id]}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{t.valor}</p>
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full text-primary hover:bg-accent"
                      aria-label="Baixar comprovante"
                    >
                      <Download className="h-4 w-4" />
                    </span>
                  </button>
                ))}
            </div>
            <footer className="flex items-center justify-between border-t border-border px-8 py-4">
              <p className="text-sm text-muted-foreground">
                Total pago: <span className="font-semibold text-foreground">{totalPagar}</span>
              </p>
              <button
                onClick={() => setView("vencendo")}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-5 py-2 text-sm text-primary transition-colors hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </button>
            </footer>
          </div>
        ) : view === "credito" ? (
          <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-border bg-card shadow-sm">
            <header className="flex items-start justify-between gap-4 border-b border-border px-8 py-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-medium text-foreground">
                    Ofertas disponíveis
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {creditoOfertas.length} ofertas personalizadas para o seu perfil
                  </p>
                </div>
              </div>
              <button
                onClick={() => setView("empty")}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2 text-sm text-primary transition-colors hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </button>
            </header>

            <div className="flex-1 overflow-auto px-8 py-6">
              <div className="flex items-center gap-2 text-sm">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground">
                  Todas as Linhas
                </button>
                <button className="rounded-full border border-border bg-card px-4 py-1.5 text-xs text-foreground hover:bg-accent">
                  Antecipação de Recebíveis
                </button>
                <button className="rounded-full border border-border bg-card px-4 py-1.5 text-xs text-foreground hover:bg-accent">
                  Risco Sacado
                </button>
                <button className="rounded-full border border-border bg-card px-4 py-1.5 text-xs text-foreground hover:bg-accent">
                  Capital de Giro
                </button>
              </div>

              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <ArrowUpDown className="h-3.5 w-3.5" />
                Ordenar por:
                <button className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">
                  Maior Aderência
                </button>
                <button className="hover:text-foreground">Menor Taxa</button>
                <button className="hover:text-foreground">Menor CET</button>
                <button className="hover:text-foreground">Mais Rápido</button>
                <button className="hover:text-foreground">Maior Limite</button>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
                {creditoOfertas.map((o) => (
                  <div
                    key={o.nome}
                    className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
                  >
                    <div className="flex items-center gap-1.5 self-start rounded-br-2xl bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                      <Star className="h-3 w-3 fill-current" />
                      Recomendado para Você
                    </div>

                    <div className="flex items-start justify-between gap-3 px-5 pt-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-semibold text-foreground">{o.nome}</h3>
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <span className="mt-1.5 inline-block rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-muted-foreground">
                          {o.linha}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary text-sm font-semibold text-primary">
                          {o.aderencia}
                        </div>
                        <span className="mt-1 text-[10px] text-muted-foreground">Aderência</span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5 px-5">
                      {o.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-primary/30 bg-accent/40 px-2.5 py-0.5 text-[11px] text-primary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 px-5">
                      <div className="rounded-xl border border-border bg-card px-3 py-2">
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <TrendingUpIcon className="h-3 w-3" />
                          Taxa a.m.
                        </div>
                        <p className="mt-0.5 text-base font-semibold text-foreground">{o.taxa}</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card px-3 py-2">
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Star className="h-3 w-3" />
                          CET a.a.
                        </div>
                        <p className="mt-0.5 text-base font-semibold text-foreground">{o.cet}</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card px-3 py-2">
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Wallet className="h-3 w-3" />
                          Parcela
                        </div>
                        <p className="mt-0.5 text-sm font-semibold text-foreground">{o.parcela}</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card px-3 py-2">
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Star className="h-3 w-3" />
                          Limite
                        </div>
                        <p className="mt-0.5 text-sm font-semibold text-foreground">{o.limite}</p>
                      </div>
                    </div>

                    <div className="mx-5 mt-4 flex items-center gap-2 rounded-xl border border-primary/20 bg-accent/40 px-3 py-2 text-xs text-foreground">
                      <TrendingUpIcon className="h-3.5 w-3.5 text-primary" />
                      Economia estimada de{" "}
                      <span className="font-semibold text-primary">R$ {o.economia.replace("R$ ", "")}</span>
                    </div>

                    <div className="mt-4 space-y-1 px-5 text-xs text-muted-foreground">
                      <p>
                        <span className="text-foreground">Garantias:</span> {o.garantias}
                      </p>
                      <p className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="text-foreground">Liberação:</span> {o.liberacao}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-2 border-t border-border px-5 py-4">
                      <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                        Contratar
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-accent">
                        Comparar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : view === "comparacao" ? (
          <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-border bg-card shadow-sm">
            <header className="flex items-start justify-between gap-4 border-b border-border px-8 py-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-medium text-foreground">
                    Comparativo financeiro
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {comparacaoData.periodoA} vs {comparacaoData.periodoB}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setView("empty")}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2 text-sm text-primary transition-colors hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </button>
            </header>

            <div className="flex-1 overflow-auto px-8 py-6">
              {/* Cards de métricas */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
                {comparacaoData.metricas.map((m) => {
                  const diff = m.a - m.b;
                  const pct = m.b === 0 ? (m.a === 0 ? 0 : 100) : (diff / m.b) * 100;
                  const up = diff > 0;
                  const good = m.positiveIsGood ? up : !up;
                  const fmt = (v: number) =>
                    v >= 1000 ? `R$ ${(v / 1000).toFixed(1)}k` : `R$ ${v}`;
                  return (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-border bg-background px-4 py-3"
                    >
                      <p className="text-xs text-muted-foreground">{m.label}</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">{fmt(m.a)}</p>
                      <p className="text-[11px] text-muted-foreground">
                        vs {fmt(m.b)} em {comparacaoData.periodoB}
                      </p>
                      <div
                        className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          good
                            ? "bg-accent text-accent-foreground"
                            : "bg-[oklch(0.95_0.04_25)] text-[oklch(0.45_0.15_25)]"
                        }`}
                      >
                        {up ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {pct > 0 ? "+" : ""}
                        {pct.toFixed(1)}%
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Gráfico de barras comparativas */}
              <div className="mt-5 rounded-2xl border border-border bg-background p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">
                    Receita, Custo e Margem (R$ mil)
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {comparacaoData.periodoA}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/60" />
                      {comparacaoData.periodoB}
                    </div>
                  </div>
                </div>
                {(() => {
                  const w = 700;
                  const h = 200;
                  const pad = { l: 40, r: 12, t: 10, b: 28 };
                  const iw = w - pad.l - pad.r;
                  const ih = h - pad.t - pad.b;
                  const yMax = 100;
                  const groups = comparacaoData.serie.length;
                  const groupW = iw / groups;
                  const barW = groupW / 3;
                  const y = (v: number) => pad.t + ih - (v / yMax) * ih;
                  const yTicks = [0, 25, 50, 75, 100];
                  return (
                    <svg viewBox={`0 0 ${w} ${h}`} className="h-[200px] w-full">
                      {yTicks.map((t) => (
                        <g key={t}>
                          <line
                            x1={pad.l}
                            x2={w - pad.r}
                            y1={y(t)}
                            y2={y(t)}
                            stroke="oklch(0.92 0.005 180)"
                            strokeDasharray="3 3"
                          />
                          <text
                            x={pad.l - 6}
                            y={y(t) + 3}
                            textAnchor="end"
                            fontSize="9"
                            fill="oklch(0.55 0.015 180)"
                          >
                            {t}
                          </text>
                        </g>
                      ))}
                      {comparacaoData.serie.map((g, i) => {
                        const cx = pad.l + groupW * i + groupW / 2;
                        const xa = cx - barW - 2;
                        const xb = cx + 2;
                        return (
                          <g key={g.label}>
                            <rect
                              x={xa}
                              y={y(g.a)}
                              width={barW}
                              height={y(0) - y(g.a)}
                              rx={4}
                              fill="oklch(0.52 0.13 160)"
                            />
                            <rect
                              x={xb}
                              y={y(g.b)}
                              width={barW}
                              height={y(0) - y(g.b)}
                              rx={4}
                              fill="oklch(0.75 0.02 180)"
                            />
                            <text
                              x={cx}
                              y={h - 8}
                              textAnchor="middle"
                              fontSize="11"
                              fill="oklch(0.45 0.015 180)"
                            >
                              {g.label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  );
                })()}
              </div>

              {/* Insights */}
              <div className="mt-5 rounded-2xl border border-border bg-accent/30 p-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Insights da comparação
                  </h3>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Análise automática dos principais indicadores entre os períodos
                </p>
                <div className="mt-4 grid gap-2 lg:grid-cols-2">
                  {comparacaoData.insights.map((ins, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3"
                    >
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                          ins.tone === "positive"
                            ? "bg-accent text-primary"
                            : "bg-[oklch(0.95_0.04_70)] text-[oklch(0.55_0.15_70)]"
                        }`}
                      >
                        {ins.tone === "positive" ? (
                          <TrendingUp className="h-3.5 w-3.5" />
                        ) : (
                          <AlertCircle className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">{ins.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{ins.desc}</p>
                      </div>
                      <span
                        className={`shrink-0 text-xs font-semibold ${
                          ins.tone === "positive"
                            ? "text-primary"
                            : "text-[oklch(0.55_0.15_70)]"
                        }`}
                      >
                        {ins.impact}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : view === "vencidos" ? (
          (() => {
            const fmt = (v: number) =>
              v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
            const totalOriginal = titulosVencidosReceber.reduce((a, t) => a + t.valorOriginal, 0);
            const totalJuros = titulosVencidosReceber.reduce((a, t) => a + t.juros + t.multa, 0);
            const totalAtualizado = titulosVencidosReceber.reduce(
              (a, t) => a + t.valorAtualizado,
              0,
            );
            return (
              <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-border bg-card shadow-sm">
                <header className="flex items-start justify-between gap-4 border-b border-border px-8 py-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(0.95_0.04_25)] text-[oklch(0.45_0.15_25)]">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-medium text-foreground">
                        Títulos a receber em atraso
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {titulosVencidosReceber.length} títulos vencidos · juros e multa calculados
                        até hoje
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setView("empty")}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2 text-sm text-primary transition-colors hover:bg-accent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </button>
                </header>

                <div className="flex-1 overflow-auto px-8 py-6">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <p className="text-xs text-muted-foreground">Valor original em atraso</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        {fmt(totalOriginal)}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <p className="text-xs text-muted-foreground">Juros + multa acumulados</p>
                      <p className="mt-1 text-lg font-semibold text-[oklch(0.45_0.15_25)]">
                        {fmt(totalJuros)}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <p className="text-xs text-muted-foreground">Total atualizado a receber</p>
                      <p className="mt-1 text-lg font-semibold text-primary">
                        {fmt(totalAtualizado)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 overflow-auto rounded-2xl border border-border">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium">Título</th>
                          <th className="px-4 py-3 text-left font-medium">Cliente</th>
                          <th className="px-4 py-3 text-left font-medium">Emissão</th>
                          <th className="px-4 py-3 text-left font-medium">Vencimento</th>
                          <th className="px-4 py-3 text-right font-medium">Atraso</th>
                          <th className="px-4 py-3 text-right font-medium">Valor original</th>
                          <th className="px-4 py-3 text-right font-medium">Juros + multa</th>
                          <th className="px-4 py-3 text-right font-medium">Valor atualizado</th>
                          <th className="px-4 py-3 text-left font-medium">Meio de pagamento</th>
                          <th className="px-4 py-3 text-left font-medium" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {titulosVencidosReceber.map((t) => (
                          <tr key={t.id} className="text-foreground">
                            <td className="px-4 py-3">
                              <p className="font-medium">{t.id}</p>
                              <p className="text-xs text-muted-foreground">{t.documento}</p>
                            </td>
                            <td className="px-4 py-3">{t.cliente}</td>
                            <td className="px-4 py-3 text-muted-foreground">{t.emissao}</td>
                            <td className="px-4 py-3 text-muted-foreground">{t.vencimento}</td>
                            <td className="px-4 py-3 text-right">
                              <span className="inline-flex items-center rounded-full bg-[oklch(0.95_0.04_25)] px-2 py-0.5 text-[11px] font-medium text-[oklch(0.45_0.15_25)]">
                                {t.diasAtraso} dias
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right tabular-nums">
                              {fmt(t.valorOriginal)}
                            </td>
                            <td className="px-4 py-3 text-right tabular-nums text-[oklch(0.45_0.15_25)]">
                              + {fmt(t.juros + t.multa)}
                            </td>
                            <td className="px-4 py-3 text-right font-medium tabular-nums">
                              {fmt(t.valorAtualizado)}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted-foreground">
                                {t.meioPagamento}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90">
                                <Send className="h-3 w-3" />
                                Cobrar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-3 text-[11px] text-muted-foreground">
                    Juros calculados a 1% a.m. e multa de 2% sobre o valor original conforme
                    contrato padrão.
                  </p>
                </div>
              </div>
            );
          })()
        ) : view === "boletos" ? (
          (() => {
            const fmt = (v: number) =>
              v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
            const today = new Date();
            const novoVencto = new Date(today);
            novoVencto.setDate(today.getDate() + 5);
            const novoVenctoStr = novoVencto.toLocaleDateString("pt-BR");
            const totalEmitido = titulosVencidosReceber.reduce(
              (a, t) => a + t.valorAtualizado,
              0,
            );
            const reguaSteps = (vencimento: string) => [
              {
                dia: "D+0",
                titulo: "Boleto emitido e enviado por e-mail",
                desc: `Novo boleto com vencimento em ${vencimento} enviado ao cliente.`,
                icon: Receipt,
                done: true,
              },
              {
                dia: "D+1",
                titulo: "Lembrete por WhatsApp",
                desc: "Mensagem automática com link do boleto e canal de atendimento.",
                icon: MessageSquare,
                done: false,
              },
              {
                dia: "D+3",
                titulo: "E-mail de cobrança formal",
                desc: "E-mail com aviso de juros, multa e impacto no score interno.",
                icon: Mail,
                done: false,
              },
              {
                dia: "D+7",
                titulo: "Ligação do time de cobrança",
                desc: "Contato telefônico para negociação e parcelamento.",
                icon: Phone,
                done: false,
              },
              {
                dia: "D+15",
                titulo: "Negativação e protesto",
                desc: "Envio para serviços de proteção ao crédito e protesto em cartório.",
                icon: Scale,
                done: false,
              },
            ];
            return (
              <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-border bg-card shadow-sm">
                <header className="flex items-start justify-between gap-4 border-b border-border px-8 py-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                      <Receipt className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-medium text-foreground">
                        Novos boletos emitidos com régua de cobrança ativa
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {titulosVencidosReceber.length} boletos gerados · novo vencimento{" "}
                        {novoVenctoStr} · expanda um título para ver a régua
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setView("vencidos")}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2 text-sm text-primary transition-colors hover:bg-accent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </button>
                </header>

                <div className="flex-1 overflow-auto px-8 py-6">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <p className="text-xs text-muted-foreground">Boletos emitidos</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        {titulosVencidosReceber.length}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <p className="text-xs text-muted-foreground">Total cobrado</p>
                      <p className="mt-1 text-lg font-semibold text-primary">
                        {fmt(totalEmitido)}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <p className="text-xs text-muted-foreground">Régua de cobrança</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        Ativa em todos
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {titulosVencidosReceber.map((t) => {
                      const isOpen = expandedBoleto === t.id;
                      const novoBoletoId = `BOL-${t.id.split("-")[1]}`;
                      const steps = reguaSteps(novoVenctoStr);
                      return (
                        <div
                          key={t.id}
                          className="overflow-hidden rounded-2xl border border-border bg-background"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedBoleto(isOpen ? null : t.id)
                            }
                            className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                              <Receipt className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className="truncate text-sm font-medium text-foreground">
                                  {t.cliente}
                                </p>
                                <span className="inline-flex items-center rounded-full bg-[oklch(0.95_0.06_160)] px-2 py-0.5 text-[11px] font-medium text-[oklch(0.4_0.12_160)]">
                                  Boleto emitido
                                </span>
                              </div>
                              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                {novoBoletoId} · referente {t.id} · novo vencimento{" "}
                                {novoVenctoStr}
                              </p>
                            </div>
                            <div className="hidden text-right md:block">
                              <p className="text-xs text-muted-foreground">Valor cobrado</p>
                              <p className="text-sm font-medium tabular-nums text-foreground">
                                {fmt(t.valorAtualizado)}
                              </p>
                            </div>
                            <div className="hidden text-right md:block">
                              <p className="text-xs text-muted-foreground">Atraso original</p>
                              <p className="text-sm font-medium tabular-nums text-[oklch(0.45_0.15_25)]">
                                {t.diasAtraso} dias
                              </p>
                            </div>
                            <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground">
                              {isOpen ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </div>
                          </button>
                          {isOpen && (
                            <div className="border-t border-border bg-muted/20 px-5 py-5">
                              <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                                <div>
                                  <p className="text-[11px] text-muted-foreground">
                                    Valor original
                                  </p>
                                  <p className="text-sm font-medium tabular-nums text-foreground">
                                    {fmt(t.valorOriginal)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[11px] text-muted-foreground">
                                    Juros + multa
                                  </p>
                                  <p className="text-sm font-medium tabular-nums text-[oklch(0.45_0.15_25)]">
                                    + {fmt(t.juros + t.multa)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[11px] text-muted-foreground">
                                    Total no boleto
                                  </p>
                                  <p className="text-sm font-medium tabular-nums text-primary">
                                    {fmt(t.valorAtualizado)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[11px] text-muted-foreground">
                                    Meio de pagamento
                                  </p>
                                  <p className="text-sm font-medium text-foreground">
                                    {t.meioPagamento}
                                  </p>
                                </div>
                              </div>

                              <div className="mb-3 flex items-center justify-between">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                  Régua de cobrança
                                </p>
                                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-primary">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Ativa
                                </span>
                              </div>
                              <ol className="relative space-y-3 border-l border-border pl-5">
                                {steps.map((s, i) => {
                                  const Icon = s.icon;
                                  return (
                                    <li key={i} className="relative">
                                      <span
                                        className={`absolute -left-[26px] flex h-4 w-4 items-center justify-center rounded-full ${
                                          s.done
                                            ? "bg-primary text-primary-foreground"
                                            : "border border-border bg-card text-muted-foreground"
                                        }`}
                                      >
                                        {s.done ? (
                                          <CheckCircle2 className="h-3 w-3" />
                                        ) : (
                                          <Clock className="h-2.5 w-2.5" />
                                        )}
                                      </span>
                                      <div className="flex items-start gap-3 rounded-xl border border-border bg-background px-3 py-2.5">
                                        <div
                                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                                            s.done
                                              ? "bg-accent text-primary"
                                              : "bg-muted text-muted-foreground"
                                          }`}
                                        >
                                          <Icon className="h-3.5 w-3.5" />
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                              {s.dia}
                                            </span>
                                            <p className="text-sm font-medium text-foreground">
                                              {s.titulo}
                                            </p>
                                          </div>
                                          <p className="mt-0.5 text-xs text-muted-foreground">
                                            {s.desc}
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                })}
                              </ol>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <p className="mt-4 text-[11px] text-muted-foreground">
                    Boletos com novo vencimento em {novoVenctoStr}. A régua de cobrança
                    dispara mensagens automáticas em D+1, D+3, D+7 e D+15 caso o pagamento
                    não seja identificado.
                  </p>
                </div>
              </div>
            );
          })()
        ) : view === "risco" ? (
          (() => {
            const fmt = (v: number) =>
              v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
            const r = carteiraRisco;
            const scoreColor =
              r.scoreGeral >= 80
                ? "oklch(0.6 0.14 160)"
                : r.scoreGeral >= 60
                  ? "oklch(0.65 0.15 85)"
                  : "oklch(0.6 0.18 25)";
            const faixaTone = (f: string) =>
              f === "Baixo"
                ? "bg-[oklch(0.95_0.05_160)] text-[oklch(0.4_0.12_160)]"
                : f === "Moderado"
                  ? "bg-[oklch(0.96_0.05_85)] text-[oklch(0.45_0.13_85)]"
                  : f === "Alto"
                    ? "bg-[oklch(0.96_0.06_45)] text-[oklch(0.45_0.15_45)]"
                    : "bg-[oklch(0.95_0.05_25)] text-[oklch(0.45_0.15_25)]";
            const total = r.distribuicao.reduce((a, d) => a + d.pct, 0);
            return (
              <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-border bg-card shadow-sm">
                <header className="flex items-start justify-between gap-4 border-b border-border px-8 py-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-medium text-foreground">
                        Análise de risco da carteira
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Score, exposição e sinais de alerta de cada cliente
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setView("empty")}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2 text-sm text-primary transition-colors hover:bg-accent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </button>
                </header>

                <div className="flex-1 overflow-auto px-8 py-6">
                  {/* Score geral + KPIs */}
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                    <div className="flex items-center gap-4 rounded-2xl border border-border bg-background px-5 py-4 lg:col-span-1">
                      {(() => {
                        const radius = 32;
                        const c = 2 * Math.PI * radius;
                        const offset = c - (r.scoreGeral / 100) * c;
                        return (
                          <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
                            <circle cx="40" cy="40" r={radius} stroke="oklch(0.92 0.005 180)" strokeWidth="8" fill="none" />
                            <circle
                              cx="40"
                              cy="40"
                              r={radius}
                              stroke={scoreColor}
                              strokeWidth="8"
                              fill="none"
                              strokeLinecap="round"
                              strokeDasharray={c}
                              strokeDashoffset={offset}
                            />
                            <text x="40" y="44" textAnchor="middle" fontSize="18" fontWeight="600" fill="oklch(0.25 0.02 180)" transform="rotate(90 40 40)">
                              {r.scoreGeral}
                            </text>
                          </svg>
                        );
                      })()}
                      <div>
                        <p className="text-xs text-muted-foreground">Score geral da carteira</p>
                        <p className="mt-0.5 text-base font-semibold text-foreground">
                          {r.saudeLabel}
                        </p>
                        <span className="mt-1 inline-flex items-center gap-1 text-xs text-primary">
                          <TrendingUp className="h-3 w-3" />
                          Acima da média do setor
                        </span>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Wallet className="h-3.5 w-3.5 text-primary" />
                        Exposição total
                      </div>
                      <p className="mt-1 text-lg font-semibold text-foreground">{fmt(r.totalCarteira)}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {r.clientes.length}+ clientes ativos
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Activity className="h-3.5 w-3.5 text-[oklch(0.6_0.18_25)]" />
                        Inadimplência
                      </div>
                      <p className="mt-1 text-lg font-semibold text-foreground">{r.inadimplencia}%</p>
                      <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-primary">
                        <TrendingDown className="h-3 w-3" />
                        {Math.abs(r.tendencia)}pp em 60 dias
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5 text-primary" />
                        Clientes monitorados
                      </div>
                      <p className="mt-1 text-lg font-semibold text-primary">
                        {r.distribuicao.reduce((a, d) => a + d.clientes, 0)}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        Score atualizado diariamente
                      </p>
                    </div>
                  </div>

                  {/* Distribuição por faixa de risco */}
                  <div className="mt-5 rounded-2xl border border-border bg-background p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-foreground">
                        Distribuição da carteira por faixa de risco
                      </h3>
                      <span className="text-xs text-muted-foreground">% da exposição</span>
                    </div>
                    <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full">
                      {r.distribuicao.map((d) => (
                        <div
                          key={d.faixa}
                          style={{ width: `${(d.pct / total) * 100}%`, background: d.cor }}
                          title={`${d.faixa}: ${d.pct}%`}
                        />
                      ))}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                      {r.distribuicao.map((d) => (
                        <div key={d.faixa} className="rounded-xl border border-border bg-card px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.cor }} />
                            <p className="text-xs font-medium text-foreground">{d.faixa}</p>
                          </div>
                          <p className="mt-1.5 text-sm font-semibold text-foreground">{fmt(d.valor)}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {d.clientes} clientes · {d.pct}%
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tabela de clientes */}
                  <div className="mt-5 overflow-auto rounded-2xl border border-border">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium">Cliente</th>
                          <th className="px-4 py-3 text-left font-medium">Score</th>
                          <th className="px-4 py-3 text-left font-medium">Faixa</th>
                          <th className="px-4 py-3 text-right font-medium">Limite</th>
                          <th className="px-4 py-3 text-left font-medium">Utilização</th>
                          <th className="px-4 py-3 text-right font-medium">Atraso</th>
                          <th className="px-4 py-3 text-left font-medium">Sinais</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {r.clientes.map((c) => {
                          const util = Math.round((c.utilizado / c.limite) * 100);
                          const utilTone =
                            util > 85
                              ? "bg-[oklch(0.6_0.18_25)]"
                              : util > 65
                                ? "bg-[oklch(0.7_0.15_45)]"
                                : "bg-primary";
                          const ScoreIcon =
                            c.score >= 80 ? ShieldCheck : c.score >= 60 ? Shield : ShieldAlert;
                          const scoreTone =
                            c.score >= 80
                              ? "text-primary"
                              : c.score >= 60
                                ? "text-[oklch(0.55_0.15_85)]"
                                : "text-[oklch(0.55_0.18_25)]";
                          return (
                            <tr
                              key={c.nome}
                              onClick={() => setSelectedCliente(c)}
                              className="cursor-pointer text-foreground transition-colors hover:bg-accent/40"
                            >
                              <td className="px-4 py-3">
                                <p className="font-medium">{c.nome}</p>
                                <p className="text-xs text-muted-foreground">{c.segmento}</p>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <ScoreIcon className={`h-4 w-4 ${scoreTone}`} />
                                  <span className="text-sm font-semibold tabular-nums">{c.score}</span>
                                  <span
                                    className={`inline-flex items-center text-[11px] ${
                                      c.tendencia >= 0
                                        ? "text-primary"
                                        : "text-[oklch(0.55_0.18_25)]"
                                    }`}
                                  >
                                    {c.tendencia >= 0 ? (
                                      <TrendingUp className="h-3 w-3" />
                                    ) : (
                                      <TrendingDown className="h-3 w-3" />
                                    )}
                                    {Math.abs(c.tendencia)}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${faixaTone(c.faixa)}`}>
                                  {c.faixa}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right tabular-nums">{fmt(c.limite)}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                                    <div className={`h-full ${utilTone}`} style={{ width: `${Math.min(util, 100)}%` }} />
                                  </div>
                                  <span className="text-xs tabular-nums text-muted-foreground">{util}%</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-right tabular-nums">
                                {c.atraso > 0 ? (
                                  <span className="text-[oklch(0.5_0.16_25)]">{c.atraso} dias</span>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <ul className="space-y-0.5 text-[11px] text-muted-foreground">
                                  {c.sinais.slice(0, 2).map((s) => (
                                    <li key={s} className="flex items-start gap-1">
                                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                                      {s}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Alertas e insights */}
                  <div className="mt-5 rounded-2xl border border-border bg-accent/30 p-5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground">
                        Alertas e recomendações
                      </h3>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Sinais detectados pela BIA com base no comportamento da carteira
                    </p>
                    <div className="mt-4 grid gap-2 lg:grid-cols-2">
                      {r.alertas.map((a) => {
                        const tone =
                          a.tone === "positive"
                            ? { bg: "bg-accent", fg: "text-primary", Icon: ShieldCheck }
                            : a.tone === "warning"
                              ? { bg: "bg-[oklch(0.96_0.05_85)]", fg: "text-[oklch(0.5_0.13_85)]", Icon: AlertCircle }
                              : { bg: "bg-[oklch(0.95_0.05_25)]", fg: "text-[oklch(0.5_0.16_25)]", Icon: ShieldAlert };
                        const Icon = tone.Icon;
                        return (
                          <div
                            key={a.titulo}
                            className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3"
                          >
                            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${tone.bg} ${tone.fg}`}>
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-foreground">{a.titulo}</p>
                              <p className="mt-0.5 text-xs text-muted-foreground">{a.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
        <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-border bg-card shadow-sm">
          <header className="flex items-start gap-4 border-b border-border px-8 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
              {view === "chart" ? <Wallet className="h-5 w-5" /> : <CalendarClock className="h-5 w-5" />}
            </div>
            <div>
              <h2 className="text-base font-medium text-foreground">
                {view === "chart" ? "Análise de receitas e despesas" : "Títulos com vencimento hoje"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {view === "chart"
                  ? "Compare entradas e saídas para entender o desempenho financeiro"
                  : "Lista de contas a pagar e a receber com vencimento para hoje"}
              </p>
            </div>
          </header>

          <div className="flex-1 overflow-auto px-8 py-6">
            {view === "chart" ? (
              <>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="Últimos 12 meses"
                    className="w-full rounded-full border border-border bg-card px-5 py-3 pr-12 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full text-primary hover:bg-accent">
                    <Search className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-border bg-background px-4 py-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                      Receitas
                    </div>
                    <p className="mt-1 text-lg font-semibold text-foreground">R$ 616k</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background px-4 py-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingDown className="h-3.5 w-3.5 text-[oklch(0.6_0.18_25)]" />
                      Despesas
                    </div>
                    <p className="mt-1 text-lg font-semibold text-foreground">R$ 446k</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background px-4 py-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Wallet className="h-3.5 w-3.5 text-primary" />
                      Saldo
                    </div>
                    <p className="mt-1 text-lg font-semibold text-primary">R$ 170k</p>
                  </div>
                </div>

                <div className="mt-5">
                  {/* Evolução mês a mês (área + linha) */}
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-sm font-medium text-foreground">Evolução de Receitas e Despesas</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-primary" />
                          Receitas
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-[oklch(0.7_0.15_25)]" />
                          Despesas
                        </div>
                      </div>
                    </div>
                    {(() => {
                      const w = 700;
                      const h = 160;
                      const pad = { l: 36, r: 8, t: 8, b: 22 };
                      const iw = w - pad.l - pad.r;
                      const ih = h - pad.t - pad.b;
                      const yMax = 120;
                      const x = (i: number) =>
                        pad.l + (chartData.length === 1 ? 0 : (i * iw) / (chartData.length - 1));
                      const y = (v: number) => pad.t + ih - (v / yMax) * ih;
                      const linePath = (key: "receita" | "despesa") =>
                        chartData
                          .map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d[key])}`)
                          .join(" ");
                      const areaPath = (key: "receita" | "despesa") =>
                        `${linePath(key)} L${x(chartData.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;
                      const yTicks = [0, 30, 60, 90, 120];
                      return (
                        <svg viewBox={`0 0 ${w} ${h}`} className="h-[180px] w-full">
                          <defs>
                            <linearGradient id="recFill" x1="0" x2="0" y1="0" y2="1">
                              <stop offset="0%" stopColor="oklch(0.52 0.13 160)" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="oklch(0.52 0.13 160)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="despFill" x1="0" x2="0" y1="0" y2="1">
                              <stop offset="0%" stopColor="oklch(0.7 0.15 25)" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="oklch(0.7 0.15 25)" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          {yTicks.map((t) => (
                            <g key={t}>
                              <line
                                x1={pad.l}
                                x2={w - pad.r}
                                y1={y(t)}
                                y2={y(t)}
                                stroke="oklch(0.92 0.005 180)"
                                strokeDasharray="3 3"
                              />
                              <text
                                x={pad.l - 6}
                                y={y(t) + 3}
                                textAnchor="end"
                                fontSize="9"
                                fill="oklch(0.55 0.015 180)"
                              >
                                R${t}k
                              </text>
                            </g>
                          ))}
                          <path d={areaPath("receita")} fill="url(#recFill)" />
                          <path d={areaPath("despesa")} fill="url(#despFill)" />
                          <path
                            d={linePath("despesa")}
                            fill="none"
                            stroke="oklch(0.7 0.15 25)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d={linePath("receita")}
                            fill="none"
                            stroke="oklch(0.52 0.13 160)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {chartData.map((d, i) => (
                            <g key={d.month}>
                              <circle cx={x(i)} cy={y(d.receita)} r="2.5" fill="oklch(0.52 0.13 160)" />
                              <circle cx={x(i)} cy={y(d.despesa)} r="2.5" fill="oklch(0.7 0.15 25)" />
                              <text
                                x={x(i)}
                                y={h - 6}
                                textAnchor="middle"
                                fontSize="10"
                                fill="oklch(0.55 0.015 180)"
                              >
                                {d.month}
                              </text>
                            </g>
                          ))}
                        </svg>
                      );
                    })()}
                  </div>
                </div>

                {/* Recomendações Inteligentes */}
                <div className="mt-5 rounded-2xl border border-border bg-accent/30 p-5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Recomendações Inteligentes</h3>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Ações priorizadas com base na análise de dados financeiros
                  </p>
                  <div className="mt-4 space-y-2">
                    {[
                      {
                        title: "Antecipar cobrança de recebíveis",
                        desc: "Oferecer 2% de desconto para pagamento antecipado aos 5 maiores clientes com saldo > 60 dias.",
                        impact: "+R$ 800K melhoria de caixa",
                      },
                      {
                        title: "Renegociar prazos com fornecedores",
                        desc: "Três fornecedores-chave indicaram disposição para estender de 30 para 45 dias.",
                        impact: "+18 dias de extensão PMP",
                      },
                      {
                        title: "Compensar créditos tributários a vencer",
                        desc: "Créditos de PIS/COFINS vencem em 30 dias. Agendar compensação contra obrigações atuais.",
                        impact: "R$ 145K em economia tributária",
                      },
                      {
                        title: "Consolidar operações bancárias",
                        desc: "Migrar contas secundárias para o banco principal e negociar redução de tarifas por volume.",
                        impact: "-R$ 42K/ano em tarifas",
                      },
                    ].map((rec, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 rounded-xl border border-border bg-card px-4 py-3"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                          {i + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground">{rec.title}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{rec.desc}</p>
                        </div>
                        <span className="shrink-0 text-xs font-semibold text-primary">
                          {rec.impact}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-border bg-background px-4 py-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                      A receber
                    </div>
                    <p className="mt-1 text-lg font-semibold text-foreground">{totalReceber}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background px-4 py-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingDown className="h-3.5 w-3.5 text-[oklch(0.6_0.18_25)]" />
                      A pagar
                    </div>
                    <p className="mt-1 text-lg font-semibold text-foreground">{totalPagar}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background px-4 py-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <AlertCircle className="h-3.5 w-3.5 text-primary" />
                      Total de títulos
                    </div>
                    <p className="mt-1 text-lg font-semibold text-primary">{titulosVencendoHoje.length}</p>
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Título</th>
                        <th className="px-4 py-3 text-left font-medium">Cliente / Fornecedor</th>
                        <th className="px-4 py-3 text-left font-medium">Documento</th>
                        <th className="px-4 py-3 text-right font-medium">Valor</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {titulosVencendoHoje.map((t) => (
                        <tr key={t.id} className="border-t border-border">
                          <td className="px-4 py-3 font-medium text-foreground">{t.id}</td>
                          <td className="px-4 py-3 text-foreground">{t.cliente}</td>
                          <td className="px-4 py-3 text-muted-foreground">{t.documento}</td>
                          <td className="px-4 py-3 text-right font-medium text-foreground">{t.valor}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                t.tipo === "receita"
                                  ? "bg-accent text-accent-foreground"
                                  : "bg-[oklch(0.95_0.04_25)] text-[oklch(0.45_0.15_25)]"
                              }`}
                            >
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          <footer className="flex justify-end border-t border-border px-8 py-4">
            <button
              onClick={() => setView("chart")}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-5 py-2 text-sm text-primary transition-colors hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
          </footer>
        </div>
        )}
      </main>

      {/* Right sidebar */}
      <aside className="flex w-14 flex-col items-center gap-4 border-l border-border bg-card py-5 text-sidebar-foreground">
        <button className="hover:text-foreground"><ShoppingBag className="h-5 w-5" /></button>
        <button className="hover:text-foreground"><User className="h-5 w-5" /></button>
        <button className="hover:text-foreground"><FileText className="h-5 w-5" /></button>
      </aside>

      {selectedCliente && (() => {
        const c = selectedCliente;
        const util = Math.round((c.utilizado / c.limite) * 100);
        const ScoreIcon =
          c.score >= 80 ? ShieldCheck : c.score >= 60 ? Shield : ShieldAlert;
        const scoreTone =
          c.score >= 80
            ? "text-primary"
            : c.score >= 60
              ? "text-[oklch(0.55_0.15_85)]"
              : "text-[oklch(0.55_0.18_25)]";
        const scoreRingColor =
          c.score >= 80
            ? "oklch(0.72 0.14 160)"
            : c.score >= 60
              ? "oklch(0.78 0.13 85)"
              : "oklch(0.6 0.18 25)";
        // Histórico de score (últimos 6 meses) — derivado da tendência
        const historico = Array.from({ length: 6 }).map((_, i) => {
          const base = c.score - c.tendencia * (5 - i) * 0.6;
          return Math.max(20, Math.min(100, Math.round(base + (i % 2 === 0 ? -1 : 1))));
        });
        const meses = ["Dez", "Jan", "Fev", "Mar", "Abr", "Mai"];
        // Fatores que compõem o score
        const fatores = [
          {
            label: "Pagamentos em dia",
            valor: c.atraso === 0 ? 95 : c.atraso < 15 ? 72 : c.atraso < 30 ? 48 : 22,
            peso: "35%",
          },
          {
            label: "Utilização do limite",
            valor: Math.max(10, 100 - util),
            peso: "25%",
          },
          {
            label: "Tempo de relacionamento",
            valor: c.faixa === "Baixo" ? 88 : c.faixa === "Moderado" ? 70 : 55,
            peso: "15%",
          },
          {
            label: "Histórico de compras",
            valor: c.tendencia >= 0 ? 82 : 60,
            peso: "15%",
          },
          {
            label: "Reputação externa (Serasa/SPC)",
            valor: c.faixa === "Crítico" ? 30 : c.faixa === "Alto" ? 55 : 80,
            peso: "10%",
          },
        ];
        const recomendacoes =
          c.faixa === "Crítico"
            ? [
                "Suspender novas vendas a prazo até regularização",
                "Acionar régua de cobrança jurídica (D+15)",
                "Negociar parcelamento com entrada mínima de 30%",
              ]
            : c.faixa === "Alto"
              ? [
                  "Reduzir limite de crédito em 30%",
                  "Solicitar garantias adicionais para novas vendas",
                  "Monitorar semanalmente o comportamento de pagamento",
                ]
              : c.faixa === "Moderado"
                ? [
                    "Manter limite atual e revisar em 60 dias",
                    "Oferecer desconto para pagamento antecipado",
                    "Acompanhar evolução do score Serasa",
                  ]
                : [
                    "Cliente elegível para aumento de limite (+20%)",
                    "Oferecer condições especiais de pagamento",
                    "Considerar para programa de fidelidade",
                  ];
        const fatorTone = (v: number) =>
          v >= 75
            ? "bg-primary"
            : v >= 50
              ? "bg-[oklch(0.78_0.13_85)]"
              : "bg-[oklch(0.65_0.18_25)]";
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-6 backdrop-blur-sm"
            onClick={() => setSelectedCliente(null)}
          >
            <div
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-border bg-accent/30 px-7 py-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-card text-foreground shadow-sm">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Detalhe do score
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">{c.nome}</h3>
                    <p className="text-xs text-muted-foreground">
                      {c.segmento} · Última compra em {c.ultimaCompra}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCliente(null)}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground hover:bg-accent"
                >
                  Fechar
                </button>
              </div>

              {/* Score + métricas */}
              <div className="grid gap-5 px-7 py-6 lg:grid-cols-[220px_1fr]">
                {/* Score circular */}
                <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-accent/20 p-5">
                  <div className="relative h-32 w-32">
                    <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="oklch(0.92 0.01 240)"
                        strokeWidth="10"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke={scoreRingColor}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${(c.score / 100) * 326.7} 326.7`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <ScoreIcon className={`h-4 w-4 ${scoreTone}`} />
                      <span className="text-3xl font-semibold tabular-nums text-foreground">
                        {c.score}
                      </span>
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        de 100
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs">
                    {c.tendencia >= 0 ? (
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5 text-[oklch(0.55_0.18_25)]" />
                    )}
                    <span
                      className={
                        c.tendencia >= 0
                          ? "text-primary"
                          : "text-[oklch(0.55_0.18_25)]"
                      }
                    >
                      {c.tendencia >= 0 ? "+" : ""}
                      {c.tendencia} pts em 30 dias
                    </span>
                  </div>
                  <span
                    className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${faixaTone(c.faixa)}`}
                  >
                    Risco {c.faixa.toLowerCase()}
                  </span>
                </div>

                {/* Métricas chave */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      Limite aprovado
                    </p>
                    <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">
                      {fmt(c.limite)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      Em uso
                    </p>
                    <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">
                      {fmt(c.utilizado)}
                    </p>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={
                          util > 85
                            ? "h-full bg-[oklch(0.6_0.18_25)]"
                            : util > 65
                              ? "h-full bg-[oklch(0.7_0.15_45)]"
                              : "h-full bg-primary"
                        }
                        style={{ width: `${Math.min(util, 100)}%` }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">{util}% utilizado</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      Ticket médio
                    </p>
                    <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">
                      {fmt(c.ticket)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      Maior atraso
                    </p>
                    <p
                      className={`mt-1 text-lg font-semibold tabular-nums ${
                        c.atraso > 0
                          ? "text-[oklch(0.5_0.16_25)]"
                          : "text-foreground"
                      }`}
                    >
                      {c.atraso > 0 ? `${c.atraso} dias` : "Em dia"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Histórico de score */}
              <div className="border-t border-border px-7 py-6">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">
                    Evolução do score (últimos 6 meses)
                  </h4>
                </div>
                <div className="mt-4 flex items-end gap-2">
                  {historico.map((v, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                      <span className="text-[10px] tabular-nums text-muted-foreground">{v}</span>
                      <div
                        className="w-full rounded-md bg-primary/80"
                        style={{ height: `${(v / 100) * 80}px`, opacity: 0.4 + (i / 6) * 0.6 }}
                      />
                      <span className="text-[10px] text-muted-foreground">{meses[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fatores do score */}
              <div className="border-t border-border px-7 py-6">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">
                    Fatores que compõem o score
                  </h4>
                </div>
                <div className="mt-4 space-y-3">
                  {fatores.map((f) => (
                    <div key={f.label}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground">{f.label}</span>
                        <span className="tabular-nums text-muted-foreground">
                          {f.valor}/100 · peso {f.peso}
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full ${fatorTone(f.valor)}`}
                          style={{ width: `${f.valor}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sinais detectados */}
              <div className="border-t border-border px-7 py-6">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">
                    Sinais detectados pela BIA
                  </h4>
                </div>
                <ul className="mt-3 space-y-2">
                  {c.sinais.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 rounded-xl border border-border bg-accent/20 px-3 py-2 text-xs text-foreground"
                    >
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recomendações */}
              <div className="border-t border-border bg-accent/20 px-7 py-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">
                    Recomendações da BIA
                  </h4>
                </div>
                <ul className="mt-3 space-y-2">
                  {recomendacoes.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-2 text-xs text-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })()}

      {selectedComprovante && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-6 backdrop-blur-sm"
          onClick={() => setSelectedComprovante(null)}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-3 border-b border-border bg-accent/40 px-8 py-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-medium text-foreground">Comprovante de pagamento</h3>
                <p className="text-xs text-muted-foreground">Pagamento realizado com sucesso</p>
              </div>
              <p className="text-2xl font-semibold text-foreground">{selectedComprovante.valor}</p>
            </div>
            <dl className="space-y-3 px-8 py-6 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Beneficiário</dt>
                <dd className="text-right font-medium text-foreground">{selectedComprovante.cliente}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Documento</dt>
                <dd className="text-right text-foreground">{selectedComprovante.documento}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Título</dt>
                <dd className="text-right text-foreground">{selectedComprovante.id}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Autenticação</dt>
                <dd className="text-right font-mono text-foreground">{selectedComprovante.autenticacao}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Data</dt>
                <dd className="text-right text-foreground">
                  {new Date().toLocaleDateString("pt-BR")}
                </dd>
              </div>
            </dl>
            <div className="flex items-center justify-between gap-3 border-t border-border px-8 py-4">
              <button
                onClick={() => setSelectedComprovante(null)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-accent"
              >
                Fechar
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90">
                <Download className="h-4 w-4" />
                Baixar comprovante
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
