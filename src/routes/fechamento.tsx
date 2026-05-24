import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  AlertTriangle,
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  DollarSign,
  FileWarning,
  Gauge as GaugeIcon,
  LineChart,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
  Zap,
  Target,
  Receipt,
  Landmark,
  XCircle,
  Eye,
} from "lucide-react";

export const Route = createFileRoute("/fechamento")({
  component: FechamentoPage,
});

// ---------- Data ----------
const kpis = [
  { label: "Receita Total", valor: "R$ 48,2M", delta: "+12,4%", up: true, prev: "R$ 42,9M", icon: DollarSign, status: "ok", insight: "Crescimento sustentado por região Sudeste." },
  { label: "Lucro Líquido", valor: "R$ 7,1M", delta: "+8,9%", up: true, prev: "R$ 6,5M", icon: TrendingUp, status: "ok", insight: "Margem líquida em 14,7%." },
  { label: "EBITDA", valor: "R$ 11,4M", delta: "+6,2%", up: true, prev: "R$ 10,7M", icon: Activity, status: "ok", insight: "Acima da meta trimestral." },
  { label: "Fluxo de Caixa", valor: "R$ 18,9M", delta: "-3,1%", up: false, prev: "R$ 19,5M", icon: Wallet, status: "warn", insight: "Atrasos em 4 contratos chave." },
  { label: "Caixa 30/60/90", valor: "R$ 22M / 19M / 15M", delta: "Projeção IA", up: true, prev: "Modelo v3.2", icon: LineChart, status: "ok", insight: "Runway saudável por 9 meses." },
  { label: "Inadimplência", valor: "3,8%", delta: "+0,6 pp", up: false, prev: "3,2%", icon: AlertTriangle, status: "warn", insight: "12 clientes com atraso >30d." },
  { label: "Margem Operacional", valor: "21,3%", delta: "-1,2 pp", up: false, prev: "22,5%", icon: GaugeIcon, status: "warn", insight: "Custo logístico subiu 8%." },
  { label: "Custo Operacional", valor: "R$ 28,4M", delta: "+4,7%", up: false, prev: "R$ 27,1M", icon: TrendingDown, status: "warn", insight: "Revisar fornecedores A e B." },
  { label: "Impostos Provisionados", valor: "R$ 5,9M", delta: "+2,1%", up: true, prev: "R$ 5,8M", icon: Receipt, status: "ok", insight: "Alinhado à apuração SPED." },
  { label: "Impostos em Risco", valor: "R$ 412k", delta: "3 autuações", up: false, prev: "R$ 280k", icon: FileWarning, status: "critical", insight: "ICMS-ST com glosa potencial." },
  { label: "Burn Rate", valor: "R$ 2,1M/mês", delta: "Estável", up: true, prev: "R$ 2,1M", icon: Zap, status: "ok", insight: "Consistente nos últimos 6 meses." },
  { label: "Runway Financeiro", valor: "9,2 meses", delta: "+0,4 m", up: true, prev: "8,8 m", icon: Clock, status: "ok", insight: "Cenário realista mantido." },
  { label: "ROI Operacional", valor: "24,8%", delta: "+1,9 pp", up: true, prev: "22,9%", icon: Target, status: "ok", insight: "Investimento em automação." },
  { label: "Saúde Financeira", valor: "92 / 100", delta: "+2 pts", up: true, prev: "90", icon: ShieldCheck, status: "ok", insight: "Top quartil do setor." },
  { label: "Score Contábil", valor: "94 / 100", delta: "+1,3", up: true, prev: "92,7", icon: CheckCircle2, status: "ok", insight: "Conciliações em dia." },
  { label: "Score Compliance", valor: "88 / 100", delta: "-1,2", up: false, prev: "89,2", icon: Landmark, status: "warn", insight: "2 contratos pendentes LGPD." },
];

const decisoes = [
  { titulo: "Aprovar pagamento crítico — Fornecedor A", impacto: "R$ 1,2M", urgencia: "alta", risco: "Multa contratual 0,8%/dia", responsavel: "CFO", ia: "Liquidez suficiente. Recomenda-se aprovação imediata.", prioridade: "P1" },
  { titulo: "Risco tributário — Glosa de crédito ICMS-ST", impacto: "R$ 412k", urgencia: "alta", risco: "Autuação fiscal", responsavel: "Controller Fiscal", ia: "Provisionar e abrir defesa administrativa.", prioridade: "P1" },
  { titulo: "Centro de Custo Logística — 18% acima do orçamento", impacto: "R$ 340k", urgencia: "média", risco: "Pressão sobre margem", responsavel: "Diretor de Operações", ia: "Renegociar com transportadora B em 7 dias.", prioridade: "P2" },
  { titulo: "Contrato com Cliente XPTO vence em 14 dias", impacto: "R$ 2,8M ARR", urgencia: "média", risco: "Perda de receita recorrente", responsavel: "CRO", ia: "Iniciar renovação com upsell de 12%.", prioridade: "P2" },
  { titulo: "Despesa suspeita — duplicidade detectada", impacto: "R$ 48k", urgencia: "baixa", risco: "Fraude potencial", responsavel: "Auditoria Interna", ia: "Bloquear e abrir investigação.", prioridade: "P3" },
];

const agentes = [
  { nome: "Agente Fiscal", funcao: "Apuração, SPED e cruzamento fiscal", status: "online", tarefas: 1284, economia: "R$ 312k", tempo: "186h", assertividade: 98.4, anomalias: 3 },
  { nome: "Agente Financeiro", funcao: "Conciliação, caixa e inadimplência", status: "online", tarefas: 2147, economia: "R$ 198k", tempo: "224h", assertividade: 99.1, anomalias: 1 },
  { nome: "Agente Contábil", funcao: "Lançamentos, classificação e fechamento", status: "online", tarefas: 12480, economia: "R$ 412k", tempo: "498h", assertividade: 97.8, anomalias: 6 },
  { nome: "Agente Compliance", funcao: "Auditoria contínua, fraudes e LGPD", status: "atencao", tarefas: 642, economia: "R$ 120k", tempo: "78h", assertividade: 96.2, anomalias: 4 },
  { nome: "Agente Estratégico", funcao: "Previsões, cenários e simulações", status: "online", tarefas: 89, economia: "R$ 540k", tempo: "—", assertividade: 94.5, anomalias: 0 },
];

const insights = [
  { titulo: "Margem operacional caiu 1,2pp", texto: "Aumento de 8% no custo logístico no Sudeste. Recomenda-se renegociação com transportadoras A e B nos próximos 7 dias.", tag: "Oportunidade", tone: "warn" },
  { titulo: "Economia tributária identificada", texto: "Reclassificação de 142 NFs para CFOP 5.949 pode gerar economia estimada de R$ 186k no trimestre.", tag: "Economia", tone: "ok" },
  { titulo: "Previsão de tensão de caixa em 67 dias", texto: "Modelo preditivo aponta 32% de probabilidade de aperto se 3 contratos não forem renovados.", tag: "Risco", tone: "critical" },
  { titulo: "Gargalo no fechamento", texto: "Conciliação bancária do Banco C concentra 41% do tempo de fechamento. Automação ampliada economizaria 22h/mês.", tag: "Eficiência", tone: "ok" },
];

const cenarios = [
  { nome: "Otimista", receita: "R$ 54,2M", lucro: "R$ 9,1M", caixa: "R$ 26M", prob: "22%", color: "oklch(0.7 0.18 150)" },
  { nome: "Realista", receita: "R$ 49,8M", lucro: "R$ 7,4M", caixa: "R$ 21M", prob: "58%", color: "oklch(0.7 0.18 200)" },
  { nome: "Pessimista", receita: "R$ 44,1M", lucro: "R$ 5,2M", caixa: "R$ 14M", prob: "20%", color: "oklch(0.65 0.2 25)" },
];

const governanca = [
  { item: "Trilha de Auditoria", status: "Ativa", detalhe: "24.812 eventos registrados nas últimas 24h" },
  { item: "Logs dos Agentes", status: "Ativo", detalhe: "100% das decisões explicáveis e rastreáveis" },
  { item: "Segregação de Funções", status: "Conforme", detalhe: "Matriz SoD revisada em 12/05" },
  { item: "Conformidade LGPD", status: "Atenção", detalhe: "2 contratos com cláusula pendente" },
  { item: "Controle de Acesso", status: "Ativo", detalhe: "MFA obrigatório, 0 incidentes" },
  { item: "Riscos Tributários", status: "Médio", detalhe: "3 teses em monitoramento" },
];

// ---------- Helpers ----------
function statusColor(s: string) {
  if (s === "ok") return "oklch(0.7 0.18 150)";
  if (s === "warn") return "oklch(0.75 0.16 80)";
  return "oklch(0.65 0.2 25)";
}

function StatusDot({ status }: { status: string }) {
  return (
    <span
      className="h-2 w-2 rounded-full"
      style={{ background: statusColor(status), boxShadow: `0 0 8px ${statusColor(status)}` }}
    />
  );
}

function Sparkline({ data, color = "oklch(0.75 0.16 200)" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${30 - ((v - min) / range) * 28}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 30" className="h-8 w-full" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function FechamentoPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.16_0.02_260)] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[oklch(0.16_0.02_260)]/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/contabil"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.8_0.15_200)]">
                Painel Executivo Contábil
              </div>
              <h1 className="text-xl font-semibold leading-tight">Saúde do Fechamento — Cockpit C-Level</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-[oklch(0.7_0.18_150)]/40 bg-[oklch(0.7_0.18_150)]/10 px-3 py-1.5 text-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[oklch(0.7_0.18_150)]" />
              <span className="text-[oklch(0.85_0.15_150)]">5 agentes em operação</span>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
              Competência 05/2026
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] space-y-10 px-6 py-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[oklch(0.22_0.05_260)] via-[oklch(0.2_0.05_240)] to-[oklch(0.18_0.06_200)] p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(40% 60% at 80% 20%, oklch(0.7 0.18 200 / 0.35), transparent 70%)",
            }}
          />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_280px]">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.85_0.15_200)]">
                <Sparkles className="h-3.5 w-3.5" />
                Resumo Executivo IA
              </div>
              <h2 className="mt-2 text-2xl font-semibold leading-tight">
                Fechamento <span className="text-[oklch(0.78_0.18_150)]">94% pronto</span>.
                5 decisões críticas aguardam aprovação do CFO.
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-white/60">
                Receita +12,4% YoY, EBITDA acima da meta trimestral e runway de 9,2 meses.
                Atenção para margem operacional (-1,2pp) e R$ 412k em impostos sob risco.
                IA estratégica recomenda 3 ações imediatas para preservar a margem.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="rounded-lg bg-[oklch(0.7_0.18_200)] px-4 py-2 text-xs font-semibold text-[oklch(0.16_0.02_260)] hover:opacity-90">
                  Revisar 5 decisões P1
                </button>
                <button className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 hover:bg-white/10">
                  Aprovar fechamento contábil
                </button>
                <button className="rounded-lg border border-white/10 px-4 py-2 text-xs text-white/60 hover:bg-white/5">
                  Exportar pacote do conselho
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-white/50">Índice geral</span>
                <span className="text-[oklch(0.78_0.18_150)]">+2 pts</span>
              </div>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-tight">94</span>
                <span className="pb-2 text-sm text-white/50">/ 100</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.18_200)] to-[oklch(0.75_0.18_150)]"
                  style={{ width: "94%" }}
                />
              </div>
              <p className="mt-3 text-xs text-white/60">
                Pronto para fechar. Score combina contábil, fiscal, compliance e liquidez.
              </p>
            </div>
          </div>
        </section>

        {/* KPIs */}
        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                Resumo Executivo
              </p>
              <h3 className="text-lg font-semibold">KPIs estratégicos em tempo real</h3>
            </div>
            <span className="text-xs text-white/50">Atualizado há 2 min</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((k) => {
              const Icon = k.icon;
              return (
                <div
                  key={k.label}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition-all hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-20 blur-2xl"
                    style={{ background: statusColor(k.status) }}
                  />
                  <div className="flex items-start justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80">
                      <Icon className="h-4 w-4" />
                    </div>
                    <StatusDot status={k.status} />
                  </div>
                  <p className="mt-3 text-[11px] uppercase tracking-wider text-white/50">{k.label}</p>
                  <p className="mt-1 text-xl font-semibold tracking-tight">{k.valor}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    {k.up ? (
                      <ArrowUpRight className="h-3 w-3 text-[oklch(0.78_0.18_150)]" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-[oklch(0.7_0.2_25)]" />
                    )}
                    <span className={k.up ? "text-[oklch(0.78_0.18_150)]" : "text-[oklch(0.7_0.2_25)]"}>
                      {k.delta}
                    </span>
                    <span className="text-white/40">· vs {k.prev}</span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-[11px] text-white/55">
                    <Brain className="mr-1 inline h-3 w-3 text-[oklch(0.8_0.15_200)]" />
                    {k.insight}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Decisões */}
        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                Central de Decisões Executivas
              </p>
              <h3 className="text-lg font-semibold">Ações que precisam de decisão</h3>
            </div>
            <span className="rounded-full border border-[oklch(0.7_0.2_25)]/40 bg-[oklch(0.7_0.2_25)]/10 px-3 py-1 text-xs text-[oklch(0.8_0.18_25)]">
              {decisoes.length} pendentes
            </span>
          </div>
          <div className="space-y-2.5">
            {decisoes.map((d, i) => {
              const cor = d.prioridade === "P1" ? "oklch(0.65 0.2 25)" : d.prioridade === "P2" ? "oklch(0.75 0.16 80)" : "oklch(0.7 0.15 260)";
              return (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
                >
                  <div className="flex flex-wrap items-start gap-4">
                    <span
                      className="rounded-md px-2 py-1 text-[10px] font-bold tracking-wider"
                      style={{ background: `${cor}/0.15`, color: cor, backgroundColor: `color-mix(in oklab, ${cor} 18%, transparent)` }}
                    >
                      {d.prioridade}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">{d.titulo}</p>
                      <p className="mt-1 text-xs text-white/60">
                        <Brain className="mr-1 inline h-3 w-3 text-[oklch(0.8_0.15_200)]" />
                        {d.ia}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/50">
                        <span>Impacto: <span className="text-white/80">{d.impacto}</span></span>
                        <span>Risco: <span className="text-white/80">{d.risco}</span></span>
                        <span>Urgência: <span className="text-white/80">{d.urgencia}</span></span>
                        <span>Responsável: <span className="text-white/80">{d.responsavel}</span></span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button className="flex items-center gap-1 rounded-lg border border-[oklch(0.7_0.18_150)]/40 bg-[oklch(0.7_0.18_150)]/10 px-3 py-1.5 text-xs font-medium text-[oklch(0.85_0.15_150)] hover:bg-[oklch(0.7_0.18_150)]/20">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Aprovar
                      </button>
                      <button className="flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10">
                        <XCircle className="h-3.5 w-3.5" /> Rejeitar
                      </button>
                      <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-white/60 hover:bg-white/10">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Agentes */}
        <section>
          <div className="mb-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Digital Workers
            </p>
            <h3 className="text-lg font-semibold">Agentes autônomos em operação</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {agentes.map((a) => (
              <div key={a.nome} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[oklch(0.7_0.18_200)]/30 to-[oklch(0.5_0.18_260)]/30 text-[oklch(0.85_0.15_200)]">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{a.nome}</p>
                    <p className="truncate text-[11px] text-white/55">{a.funcao}</p>
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      background: a.status === "online"
                        ? "color-mix(in oklab, oklch(0.7 0.18 150) 18%, transparent)"
                        : "color-mix(in oklab, oklch(0.75 0.16 80) 18%, transparent)",
                      color: a.status === "online" ? "oklch(0.85 0.15 150)" : "oklch(0.85 0.15 80)",
                    }}
                  >
                    {a.status}
                  </span>
                </div>
                <Sparkline data={[10, 14, 12, 18, 22, 19, 25, 28, 30]} />
                <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-white/50">Tarefas</p>
                    <p className="font-semibold text-white">{a.tarefas.toLocaleString("pt-BR")}</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-white/50">Economia</p>
                    <p className="font-semibold text-[oklch(0.85_0.15_150)]">{a.economia}</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-white/50">Tempo poupado</p>
                    <p className="font-semibold text-white">{a.tempo}</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-white/50">Assertividade</p>
                    <p className="font-semibold text-white">{a.assertividade}%</p>
                  </div>
                </div>
                {a.anomalias > 0 && (
                  <p className="mt-2 flex items-center gap-1 text-[11px] text-[oklch(0.85_0.15_80)]">
                    <AlertTriangle className="h-3 w-3" />
                    {a.anomalias} anomalias detectadas
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Insights + Cenários */}
        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                Insights Estratégicos
              </p>
              <h3 className="text-lg font-semibold">Gerados automaticamente pela IA</h3>
            </div>
            <div className="space-y-2.5">
              {insights.map((ins, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-semibold">{ins.titulo}</p>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{
                        background: `color-mix(in oklab, ${statusColor(ins.tone)} 18%, transparent)`,
                        color: statusColor(ins.tone),
                      }}
                    >
                      {ins.tag}
                    </span>
                  </div>
                  <p className="text-xs text-white/65">{ins.texto}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                Previsões e Cenários
              </p>
              <h3 className="text-lg font-semibold">Central de simulações</h3>
            </div>
            <div className="space-y-2.5">
              {cenarios.map((c) => (
                <div key={c.nome} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                      <p className="text-sm font-semibold">{c.nome}</p>
                    </div>
                    <span className="text-xs text-white/50">prob. {c.prob}</span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
                    <div>
                      <p className="text-white/50">Receita</p>
                      <p className="font-semibold">{c.receita}</p>
                    </div>
                    <div>
                      <p className="text-white/50">Lucro</p>
                      <p className="font-semibold">{c.lucro}</p>
                    </div>
                    <div>
                      <p className="text-white/50">Caixa</p>
                      <p className="font-semibold">{c.caixa}</p>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10">
                Abrir simulador completo
              </button>
            </div>
          </div>
        </section>

        {/* Governança */}
        <section className="pb-10">
          <div className="mb-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Governança & Compliance
            </p>
            <h3 className="text-lg font-semibold">Trilha de auditoria e controles</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {governanca.map((g) => (
              <div key={g.item} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{g.item}</p>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      background:
                        g.status === "Ativa" || g.status === "Ativo" || g.status === "Conforme"
                          ? "color-mix(in oklab, oklch(0.7 0.18 150) 18%, transparent)"
                          : "color-mix(in oklab, oklch(0.75 0.16 80) 18%, transparent)",
                      color:
                        g.status === "Ativa" || g.status === "Ativo" || g.status === "Conforme"
                          ? "oklch(0.85 0.15 150)"
                          : "oklch(0.85 0.15 80)",
                    }}
                  >
                    {g.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/60">{g.detalhe}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
