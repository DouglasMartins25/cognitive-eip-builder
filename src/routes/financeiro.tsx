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
} from "lucide-react";

export const Route = createFileRoute("/financeiro")({
  validateSearch: (search: Record<string, unknown>) => ({
    start: typeof search.start === "string" ? search.start : undefined,
  }),
  component: Index,
});

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
  { id: "TIT-006", cliente: "Tech Solutions Ltda", documento: "NF 12348", valor: "R$ 6.320,00", status: "A receber", tipo: "receita" },
];

type Message = { id: number; text: string; from: "user" | "bot" };

function Index() {
  const max = 120;
  const { start } = Route.useSearch();
  const startsWithChart = start === "analise";
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [view, setView] = useState<
    "empty" | "chart" | "vencendo" | "processing" | "comprovantes"
  >(startsWithChart ? "chart" : "empty");
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
      const t = setTimeout(() => setView("comprovantes"), 5000);
      return () => clearTimeout(t);
    }
  }, [view]);

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
    if (pagamentoTerms.some((t) => lower.includes(t))) {
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
                Pensando a melhor forma de você visualizar seus comprovantes...
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
    </div>
  );
}
