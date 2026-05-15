import { createFileRoute, Link } from "@tanstack/react-router";
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
  ArrowLeft,
  Bot,
  AlertCircle,
  CheckCircle2,
  Activity,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/digital-worker")({
  component: DigitalWorker,
});

function SideIcon({
  icon: Icon,
  active = false,
  to,
}: {
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  to?: string;
}) {
  const cls = `flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
    active ? "bg-muted text-foreground" : "text-sidebar-foreground hover:bg-muted"
  }`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        <Icon className="h-5 w-5" />
      </Link>
    );
  }
  return (
    <button className={cls}>
      <Icon className="h-5 w-5" />
    </button>
  );
}

const agentes = [
  { id: "A1", nome: "Copilot", status: "ok" },
  { id: "A2", nome: "Anomalia", status: "ok" },
  { id: "A3", nome: "Close", status: "alert" },
  { id: "A4", nome: "Forecast", status: "ok" },
  { id: "A5", nome: "Fiscal", status: "ok" },
  { id: "A6", nome: "DRE", status: "alert" },
  { id: "A7", nome: "Crédito", status: "ok" },
] as const;

const kpis = [
  { label: "Caixa disponível", valor: "R$ 14,2M", delta: "↑ 3,1% vs ontem", up: true },
  { label: "Receita acumulada maio", valor: "R$ 38,7M", delta: "↓ 4,2% vs orçado", up: false },
  { label: "Score ERP", valor: "847/1000", delta: "↑ 12 pts vs mês", up: true },
  { label: "Compliance fiscal", valor: "100%", delta: "↑ IBS/CBS aderente", up: true },
];

const alertas = [
  {
    tipo: "critico",
    icon: AlertCircle,
    agente: "A2",
    titulo: "Pagamento duplicado bloqueado",
    descricao: "NF 48.291 · Metais Gerais · R$ 184.700 · Bloqueio automático às 07:12",
    acao: "Ver XAI",
  },
  {
    tipo: "atencao",
    icon: Activity,
    agente: "A4",
    titulo: "Gap de caixa detectado",
    descricao: "Caixa D+9 projetado em R$ 2,1M — abaixo do threshold R$ 3,5M. Oferta de crédito preparada.",
    acao: "Ver oferta",
  },
  {
    tipo: "info",
    icon: ShieldCheck,
    agente: "A5",
    titulo: "SPED × ERP conciliado",
    descricao: "0 divergências · EFD-Contribuições mai/26 pronta para transmissão ao Fisco",
    acao: "Transmitir",
  },
];

const atividades = [
  { hora: "02:14", agente: "A3", desc: "1.847 transações Bradesco conciliadas automaticamente" },
  { hora: "03:41", agente: "A5", desc: "EFD-Contribuições validada: 0 divergências vs SPED" },
  { hora: "05:07", agente: "A4", desc: "Modelo de forecast retreinado com 18 meses de histórico" },
  { hora: "07:12", agente: "A2", desc: "Duplicata NF 48.291 bloqueada antes do pagamento" },
  { hora: "07:18", agente: "A7", desc: "Oferta de crédito R$ 8M pré-calculada para gap D+9" },
];

const dre = [
  { item: "Receita bruta", valor: -4.2, neg: true },
  { item: "Serviços", valor: -11.4, neg: true },
  { item: "Produtos", valor: 2.1, neg: false },
  { item: "CMV", valor: -1.8, neg: true },
  { item: "EBITDA", valor: -7.3, neg: true },
];

function DigitalWorker() {
  const acoesPendentes = alertas.length;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
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
            <SideIcon icon={Briefcase} />
            <SideIcon icon={Contact} />
          </nav>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary hover:bg-muted">
          <Sparkles className="h-5 w-5" />
        </button>
      </aside>

      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-8 py-8">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>

          {/* Hero */}
          <div className="rounded-2xl bg-[oklch(0.2_0.04_240)] p-6 text-white">
            <p className="text-[11px] font-semibold tracking-widest text-white/60">
              SEXTA-FEIRA, 15 DE MAIO DE 2026 · 07:24
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight">
              Bom dia, João Silva.{" "}
              <span className="text-[oklch(0.78_0.18_150)]">{acoesPendentes} ações</span>{" "}
              aguardam sua decisão.
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Os 7 agentes processaram 3.466 transações durante a noite. Tudo sob controle — exceto {acoesPendentes} pontos críticos abaixo.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {agentes.map((a) => (
                <span
                  key={a.id}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${
                    a.status === "alert"
                      ? "border-[oklch(0.55_0.18_260)]/60 bg-[oklch(0.3_0.1_260)]/40 text-white"
                      : "border-[oklch(0.5_0.12_150)]/60 bg-[oklch(0.25_0.08_150)]/40 text-white"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${a.status === "alert" ? "bg-[oklch(0.7_0.18_260)]" : "bg-[oklch(0.78_0.18_150)]"}`} />
                  <span className="font-semibold">{a.id}</span> {a.nome}
                </span>
              ))}
            </div>
          </div>

          {/* KPIs */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-xl border border-border bg-card p-4">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  {k.label}
                </p>
                <p className="mt-3 text-2xl font-semibold text-foreground">{k.valor}</p>
                <p className={`mt-2 text-xs ${k.up ? "text-primary" : "text-[oklch(0.55_0.2_25)]"}`}>
                  {k.delta}
                </p>
              </div>
            ))}
          </div>

          {/* Alertas */}
          <p className="mt-8 text-[11px] font-semibold tracking-widest text-muted-foreground">
            ALERTAS GERADOS PELOS AGENTES — REQUEREM SUA ATENÇÃO
          </p>
          <div className="mt-3 space-y-3">
            {alertas.map((a, i) => {
              const styles =
                a.tipo === "critico"
                  ? { bg: "bg-[oklch(0.95_0.04_25)]", border: "border-[oklch(0.7_0.15_25)]/40", icon: "bg-[oklch(0.55_0.2_25)] text-white", text: "text-[oklch(0.45_0.18_25)]", btn: "border-[oklch(0.55_0.2_25)] text-[oklch(0.45_0.18_25)]" }
                  : a.tipo === "atencao"
                  ? { bg: "bg-[oklch(0.96_0.05_85)]", border: "border-[oklch(0.7_0.14_70)]/40", icon: "bg-[oklch(0.6_0.16_60)] text-white", text: "text-[oklch(0.45_0.14_60)]", btn: "border-[oklch(0.6_0.16_60)] text-[oklch(0.45_0.14_60)]" }
                  : { bg: "bg-[oklch(0.95_0.04_260)]", border: "border-[oklch(0.65_0.15_260)]/40", icon: "bg-[oklch(0.5_0.18_260)] text-white", text: "text-[oklch(0.4_0.18_260)]", btn: "border-[oklch(0.5_0.18_260)] text-[oklch(0.4_0.18_260)]" };
              const Icon = a.icon;
              return (
                <div key={i} className={`flex items-center gap-4 rounded-xl border ${styles.border} ${styles.bg} p-4`}>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${styles.text}`}>
                      {a.titulo} <span className="text-xs font-normal opacity-70">— {a.agente}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-foreground/70">{a.descricao}</p>
                  </div>
                  <button className={`rounded-lg border bg-card px-4 py-2 text-xs font-medium ${styles.btn} hover:opacity-80`}>
                    {a.acao}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Two columns */}
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                ATIVIDADE AUTÔNOMA ESTA NOITE
              </p>
              <ul className="mt-4 space-y-3">
                {atividades.map((at, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-12 shrink-0 text-xs font-mono text-muted-foreground">{at.hora}</span>
                    <span className="mt-0.5 inline-flex h-5 shrink-0 items-center rounded bg-muted px-1.5 text-[10px] font-semibold text-foreground/80">
                      {at.agente}
                    </span>
                    <span className="flex-1 text-xs text-foreground">{at.desc}</span>
                    <span className="inline-flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      <CheckCircle2 className="h-3 w-3" /> AUTO
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                DRE — VARIAÇÕES MAIO VS. ORÇADO
              </p>
              <ul className="mt-4 space-y-3">
                {dre.map((d) => {
                  const abs = Math.abs(d.valor);
                  const w = Math.min(100, abs * 8);
                  return (
                    <li key={d.item} className="flex items-center gap-3 text-xs">
                      <span className="w-24 shrink-0 text-foreground">{d.item}</span>
                      <div className="flex-1">
                        <div
                          className={`h-2 rounded ${d.neg ? "bg-[oklch(0.7_0.15_25)]/60" : "bg-[oklch(0.65_0.15_150)]/70"}`}
                          style={{ width: `${w}%` }}
                        />
                      </div>
                      <span className={`w-14 text-right font-medium ${d.neg ? "text-[oklch(0.55_0.2_25)]" : "text-primary"}`}>
                        {d.valor > 0 ? "+" : ""}
                        {d.valor.toFixed(1)}%
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-[11px] text-muted-foreground">
            <Bot className="h-3.5 w-3.5" />
            Digital Worker Financeiro · 7 agentes ativos · última sincronização há 2 min
          </div>
        </div>
      </main>

      <aside className="flex w-14 flex-col items-center gap-4 border-l border-border bg-card py-5 text-sidebar-foreground">
        <button className="hover:text-foreground"><ShoppingBag className="h-5 w-5" /></button>
        <button className="hover:text-foreground"><User className="h-5 w-5" /></button>
        <button className="hover:text-foreground"><FileText className="h-5 w-5" /></button>
      </aside>
    </div>
  );
}
