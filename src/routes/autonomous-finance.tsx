import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { resolveChatRoute } from "@/lib/chat-routing";
import { useState } from "react";
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
  ArrowRight,
  Bot,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Activity,
  FileWarning,
  Scale,
  Receipt,
  Maximize2,
} from "lucide-react";

export const Route = createFileRoute("/autonomous-finance")({
  component: AutonomousFinance,
});

function SideIcon({
  icon: Icon,
  to,
}: {
  icon: React.ComponentType<{ className?: string }>;
  to?: string;
}) {
  const cls =
    "flex h-10 w-10 items-center justify-center rounded-full text-sidebar-foreground transition-colors hover:bg-muted";
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
  { id: "A1", nome: "Anomalia Financeira", status: "alert" },
  { id: "A2", nome: "Compliance Tributário", status: "alert" },
] as const;

const kpis = [
  { label: "Transações monitoradas hoje", valor: "8.421", delta: "↑ 1.204 vs ontem", up: true },
  { label: "Anomalias detectadas", valor: "17", delta: "12 resolvidas auto · 5 escaladas", up: true },
  { label: "Cobertura Reforma Tributária", valor: "100%", delta: "847 regras vigentes monitoradas", up: true },
  { label: "Contingências evitadas", valor: "R$ 1,8M", delta: "↑ R$ 312k esta semana", up: true },
];

const alertas: {
  tipo: "critico" | "atencao" | "info";
  icon: typeof AlertCircle;
  agente: string;
  titulo: string;
  descricao: string;
  acao: string;
}[] = [
  {
    tipo: "critico",
    icon: AlertCircle,
    agente: "A1",
    titulo: "Pagamento fora do padrão — revisão necessária",
    descricao: "NF 48.291 · Fornecedor Metais Gerais · R$ 87.450 · Acima da média de pagamentos e sem histórico para este fornecedor",
    acao: "Revisar",
  },
  {
    tipo: "critico",
    icon: FileWarning,
    agente: "A2",
    titulo: "CST divergente da nova legislação IBS/CBS",
    descricao: "342 itens com CST desatualizado · Risco de autuação estimado: R$ 412k · Sugestão de reparametrização pronta",
    acao: "Aplicar correção",
  },
  {
    tipo: "atencao",
    icon: Activity,
    agente: "A1",
    titulo: "Variação de valor 187% acima do histórico",
    descricao: "Fornecedor Tech Components · Pagamento R$ 248.900 vs média 12m R$ 86.700",
    acao: "Autorizar",
  },
  {
    tipo: "atencao",
    icon: Scale,
    agente: "A2",
    titulo: "Alíquota IBS aplicada incorretamente",
    descricao: "NCM 8471.30 · 28 operações últimos 7 dias · Crédito fiscal subaproveitado R$ 64.200",
    acao: "Recalcular",
  },
  {
    tipo: "info",
    icon: ShieldCheck,
    agente: "A2",
    titulo: "Nova IN RFB nº 2.314/26 publicada",
    descricao: "Impacto analisado: 14 parametrizações afetadas · Plano de adequação pronto para revisão",
    acao: "Ver plano",
  },
];

const atividades = [
  { hora: "01:08", agente: "A1", desc: "8.421 lançamentos analisados — 17 anomalias sinalizadas" },
  { hora: "02:42", agente: "A2", desc: "Cronograma da Reforma Tributária revalidado · 0 lacunas" },
  { hora: "03:55", agente: "A1", desc: "Pagamento duplicado NF 48.291 bloqueado automaticamente" },
  { hora: "05:21", agente: "A2", desc: "847 regras CFOP/CST/NCM cruzadas com tabelas oficiais" },
  { hora: "06:14", agente: "A2", desc: "IN RFB nº 2.314/26 ingerida e mapeada para 14 parametrizações" },
  { hora: "06:47", agente: "A1", desc: "Modelo de série temporal retreinado com 90 dias de fluxo" },
  { hora: "07:03", agente: "A1", desc: "Recebimento atrasado Cliente Vértice escalado ao gestor" },
];

const anomalias = [
  { tipo: "Pagamento duplicado", qtd: 3, sev: "critico" },
  { tipo: "Valor fora do histórico", qtd: 6, sev: "atencao" },
  { tipo: "Recebimento em atraso", qtd: 4, sev: "atencao" },
  { tipo: "Concentração anômala", qtd: 2, sev: "info" },
  { tipo: "Risco de liquidez D+9", qtd: 2, sev: "critico" },
];

const compliance = [
  { regra: "CFOP × operação", cobertura: 100, status: "ok" },
  { regra: "CST atualizado IBS/CBS", cobertura: 87, status: "alert" },
  { regra: "NCM × alíquota oficial", cobertura: 96, status: "warn" },
  { regra: "Regimes especiais", cobertura: 100, status: "ok" },
  { regra: "Créditos fiscais", cobertura: 92, status: "warn" },
];

function AutonomousFinance() {
  const acoesPendentes = alertas.length;
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ id: number; from: "user" | "bot"; text: string }[]>([
    { id: 1, from: "bot", text: "Bom dia, João. Sou o Finance Digital Workers. Os 2 workers analisaram 8.421 lançamentos e 847 regras fiscais — 5 ações aguardam sua decisão." },
  ]);
  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const route = resolveChatRoute(text);
    if (route) {
      const searchParams: { start: string; variant?: string } = { start: route.start };
      if (route.variant) searchParams.variant = route.variant;
      navigate({ to: "/financeiro", search: searchParams });
      setInput("");
      return;
    }
    setMessages((m) => [
      ...m,
      { id: m.length + 1, from: "user", text },
      { id: m.length + 2, from: "bot", text: "Estou correlacionando os sinais dos workers de Anomalia Financeira e Compliance Tributário e em instantes trarei o resultado." },
    ]);
    setInput("");
  };

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

      <section className="flex w-[340px] flex-col border-r border-border bg-card">
        <header className="flex items-center justify-between px-6 py-5">
          <h1 className="text-base font-medium text-foreground">Finance Digital Workers</h1>
          <button className="text-muted-foreground hover:text-foreground">
            <Maximize2 className="h-4 w-4" />
          </button>
        </header>
        <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-4">
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
              placeholder="Pergunte ao Finance Digital Workers..."
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
        </div>
      </section>

      <main className="flex flex-1 flex-col overflow-y-auto">

        <div className="mx-auto w-full max-w-5xl px-8 py-8">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>

          {/* Hero */}
          <div className="rounded-2xl bg-[oklch(0.2_0.04_240)] p-6 text-white">
            <p className="text-[11px] font-semibold tracking-widest text-white/60">
              SEXTA-FEIRA, 15 DE MAIO DE 2026 · 07:24 · FINANCE DIGITAL WORKERS
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight">
              Bom dia, João Silva.{" "}
              <span className="text-[oklch(0.78_0.18_150)]">{acoesPendentes} ações</span>{" "}
              dos workers aguardam decisão.
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Os 2 workers analisaram 8.421 lançamentos e 847 regras fiscais nesta noite.
              17 anomalias detectadas — 12 resolvidas automaticamente.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {agentes.map((a) => (
                <span
                  key={a.id}
                  className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.55_0.18_260)]/60 bg-[oklch(0.3_0.1_260)]/40 px-3 py-1 text-xs text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.18_260)]" />
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
            ALERTAS GERADOS PELOS WORKERS — REQUEREM SUA ATENÇÃO
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

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-[oklch(0.55_0.2_25)]" />
                  <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                    ANOMALIAS POR TIPO — A1
                  </p>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {anomalias.map((a) => {
                    const color =
                      a.sev === "critico"
                        ? "bg-[oklch(0.55_0.2_25)]"
                        : a.sev === "atencao"
                        ? "bg-[oklch(0.6_0.16_60)]"
                        : "bg-[oklch(0.5_0.18_260)]";
                    return (
                      <li key={a.tipo} className="flex items-center gap-3 text-xs">
                        <span className={`h-2 w-2 rounded-full ${color}`} />
                        <span className="flex-1 text-foreground">{a.tipo}</span>
                        <span className="font-mono font-semibold text-foreground">{a.qtd}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-primary" />
                  <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                    COMPLIANCE TRIBUTÁRIO — A2
                  </p>
                </div>
                <ul className="mt-4 space-y-3">
                  {compliance.map((c) => {
                    const color =
                      c.status === "ok"
                        ? "bg-[oklch(0.65_0.15_150)]"
                        : c.status === "warn"
                        ? "bg-[oklch(0.7_0.14_70)]"
                        : "bg-[oklch(0.7_0.15_25)]";
                    return (
                      <li key={c.regra} className="text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-foreground">{c.regra}</span>
                          <span className="font-mono font-semibold text-foreground">{c.cobertura}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full rounded bg-muted">
                          <div className={`h-1.5 rounded ${color}`} style={{ width: `${c.cobertura}%` }} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-[11px] text-muted-foreground">
            <Bot className="h-3.5 w-3.5" />
            Finance Digital Workers · 2 workers ativos · última sincronização há 1 min
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
