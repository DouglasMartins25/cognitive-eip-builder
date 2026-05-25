import { createFileRoute, Link } from "@tanstack/react-router";
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
  BarChart3,
  Scale,
  Maximize2,
  BookOpen,
  CalendarClock,
} from "lucide-react";

export const Route = createFileRoute("/compliance")({
  component: CompliancePage,
});

function SideIcon({
  icon: Icon,
  to,
  active = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  to?: string;
  active?: boolean;
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
  { id: "C1", nome: "Obrigações Fiscais", status: "alert" },
  { id: "C2", nome: "Reforma Tributária", status: "alert" },
] as const;

const kpis = [
  {
    label: "Índice de conformidade",
    valor: "",
    delta: "",
    up: true,
    gauge: { value: 96, max: 100, status: "Conformidade Alta", deltaPts: 1.8, sparkline: [89, 91, 90, 92, 93, 94, 95, 95, 96, 96] },
  },
  {
    label: "Auditoria",
    valor: "",
    delta: "",
    up: true,
    detalhes: [
      { label: "Total de documentos auditados", valor: "100" },
      { label: "Total de documentos com divergência", valor: "56" },
      { label: "Risco autuações", valor: "18,4K" },
    ],
  },
  {
    label: "Diagnóstico Contábil",
    valor: "",
    delta: "",
    up: true,
    detalhes: [
      { label: "Lançamentos Contábeis Analisados", valor: "1000" },
      { label: "Lançamentos Contábeis Não Conciliados", valor: "20" },
      { label: "Lançamentos Contábeis fora do Padrão", valor: "14" },
    ],
  },
  { label: "Impacto Reforma Tributária", valor: "R$ 2,4M", delta: "Estimativa anual CBS/IBS", up: true },
  {
    label: "Apuração Simulada",
    valor: "",
    delta: "",
    up: true,
    detalhes: [
      { label: "Saldo IBS/CBS a recolher", valor: "R$ 2.240" },
      { label: "Créditos não aproveitados", valor: "R$ 1.210" },
      { label: "Divergências entre módulos", valor: "3" },
      { label: "Ações sugeridas (ND/NCP)", valor: "2" },
    ],
  },
];

const alertas: {
  tipo: "critico" | "atencao" | "info";
  icon: typeof AlertCircle;
  agente: string;
  titulo: string;
  descricao: string;
  acao: string;
  to?: string;
}[] = [
  {
    tipo: "critico",
    icon: AlertCircle,
    agente: "C2",
    titulo: "Divergência de ICMS nas NFs de saída",
    descricao: "47 NFs com base de cálculo divergente · necessária emissão de NFs complementares · 6 pré-emitidas aguardando autorização",
    acao: "Revisar",
    to: "/nfs-complementares",
  },
  {
    tipo: "critico",
    icon: FileWarning,
    agente: "C2",
    titulo: "CST divergente da nova legislação IBS/CBS",
    descricao: "342 itens com CST desatualizado · Risco de autuação estimado: R$ 412k · Sugestão de reparametrização pronta",
    acao: "Aplicar correção",
  },
  {
    tipo: "atencao",
    icon: Scale,
    agente: "C2",
    titulo: "Alíquota IBS aplicada incorretamente",
    descricao: "NCM 8471.30 · 28 operações últimos 7 dias · Crédito fiscal subaproveitado R$ 64.200",
    acao: "Recalcular",
  },
  {
    tipo: "atencao",
    icon: CalendarClock,
    agente: "C1",
    titulo: "DIRBI — benefícios fiscais com atenção",
    descricao: "Vencimento em 20/06 · 4 benefícios pendentes de documentação comprobatória",
    acao: "Preparar entrega",
  },
  {
    tipo: "info",
    icon: ShieldCheck,
    agente: "C2",
    titulo: "Nova IN RFB nº 2.314/26 publicada",
    descricao: "Impacto analisado: 14 parametrizações afetadas · Plano de adequação pronto para revisão",
    acao: "Ver plano",
  },
];

const atividades = [
  { hora: "01:08", agente: "C1", desc: "Calendário fiscal revalidado — 12 obrigações nos próximos 30 dias" },
  { hora: "02:14", agente: "C2", desc: "847 regras CFOP/CST/NCM cruzadas com tabelas oficiais" },
  { hora: "02:42", agente: "C2", desc: "Cronograma da Reforma Tributária revalidado · 0 lacunas" },
  { hora: "03:18", agente: "C1", desc: "SPED Fiscal pré-validado · 6 estabelecimentos · 0 erros estruturais" },
  { hora: "03:55", agente: "C1", desc: "EFD Contribuições conciliada com escrituração contábil · 99,7% de match" },
  { hora: "04:32", agente: "C2", desc: "Simulação de Split Payment em 3 operações piloto concluída" },
  { hora: "05:21", agente: "C1", desc: "ECF — 184 lançamentos contábeis classificados automaticamente" },
  { hora: "05:48", agente: "C2", desc: "Mapeamento CBS/IBS atualizado para 1.284 SKUs" },
  { hora: "06:14", agente: "C2", desc: "IN RFB nº 2.314/26 ingerida e mapeada para 14 parametrizações" },
  { hora: "06:47", agente: "C1", desc: "DCTFWeb — 3 pendências de transmissão sinalizadas ao gestor" },
  { hora: "07:03", agente: "C2", desc: "Radar de Imposto Seletivo atualizado · 18 NCMs em monitoramento" },
];

const conformidadeBenchmark = {
  setor: 88.0,
  empresa: 96.0,
  gap: 8.0,
  drivers: [
    { label: "Obrigações principais", valor: "+6 pp", tone: "positivo" as const, desc: "acima da mediana setorial" },
    { label: "Obrigações acessórias", valor: "+3 pp", tone: "positivo" as const, desc: "rotina automatizada" },
    { label: "Reforma Tributária", valor: "−1 pp", tone: "negativo" as const, desc: "adequações em andamento" },
  ],
};

const radarReforma: { label: string; valor: string; tone: "positivo" | "negativo" | "neutro" }[] = [
  { label: "CBS — cobertura de regras", valor: "100%", tone: "positivo" },
  { label: "IBS — SKUs mapeados", valor: "1.284 / 1.310", tone: "neutro" },
  { label: "Imposto Seletivo — NCMs", valor: "18 monitorados", tone: "neutro" },
  { label: "Split Payment — pilotos", valor: "3 operações", tone: "positivo" },
  { label: "Risco residual estimado", valor: "Baixo · 6%", tone: "neutro" },
];

const acoesReforma = [
  { acao: "Reparametrizar CST de 342 itens para matriz IBS/CBS", impacto: "Reduz risco de autuação em R$ 412k" },
  { acao: "Concluir mapeamento dos 26 SKUs restantes para IBS", impacto: "Eleva cobertura para 100%" },
  { acao: "Expandir piloto de Split Payment para mais 5 operações", impacto: "+ R$ 38k em crédito antecipado/mês" },
];

function Gauge({ value, max, status, deltaPts, sparkline }: { value: number; max: number; status: string; deltaPts: number; sparkline: number[] }) {
  const pct = Math.min(1, Math.max(0, value / max));
  const angle = -90 + pct * 180; // -90 (left) to 90 (right)
  const cx = 90, cy = 80, r = 64;
  const arc = (startA: number, endA: number) => {
    const toXY = (a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
    const [x1, y1] = toXY(startA);
    const [x2, y2] = toXY(endA);
    const large = endA - startA > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };
  const needle = (() => {
    const a = (angle * Math.PI) / 180;
    return [cx + (r - 4) * Math.cos(a), cy + (r - 4) * Math.sin(a)];
  })();
  const min = Math.min(...sparkline), maxS = Math.max(...sparkline);
  const range = maxS - min || 1;
  const points = sparkline.map((v, i) => `${(i / (sparkline.length - 1)) * 100},${20 - ((v - min) / range) * 18}`).join(" ");
  return (
    <div className="mt-2">
      <div className="flex justify-center">
        <svg viewBox="0 0 180 110" className="h-[120px] w-full">
          <defs>
            <linearGradient id="gaugeGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="oklch(0.6 0.22 25)" />
              <stop offset="50%" stopColor="oklch(0.78 0.18 75)" />
              <stop offset="100%" stopColor="oklch(0.65 0.2 150)" />
            </linearGradient>
          </defs>
          <path d={arc(180, 360)} stroke="url(#gaugeGrad)" strokeWidth="14" fill="none" strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={needle[0]} y2={needle[1]} stroke="oklch(0.25 0.02 240)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={cx} cy={cy} r="4" fill="oklch(0.25 0.02 240)" />
          <text x={cx - r} y={cy + 18} textAnchor="middle" fontSize="9" fill="currentColor" className="text-muted-foreground">0</text>
          <text x={cx + r} y={cy + 18} textAnchor="middle" fontSize="9" fill="currentColor" className="text-muted-foreground">{max}</text>
        </svg>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-foreground leading-none">{value}</p>
        <p className="mt-1 text-xs font-medium text-[oklch(0.6_0.18_75)]">{status}</p>
      </div>
      <div className="mt-3 rounded-md border border-border p-2">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-semibold text-[oklch(0.55_0.18_150)]">↗ {deltaPts} pontos</span>
          <span className="text-muted-foreground">vs mês anterior</span>
        </div>
        <svg viewBox="0 0 100 22" preserveAspectRatio="none" className="mt-1 h-5 w-full">
          <polyline points={points} fill="none" stroke="oklch(0.55 0.18 150)" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
}

function CompliancePage() {
  const acoesPendentes = alertas.length;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ id: number; from: "user" | "bot"; text: string }[]>([
    { id: 1, from: "bot", text: "Bom dia, João. Sou o Compliance Digital Workers. Os 2 workers analisaram 184 obrigações e 847 regras fiscais — 5 ações aguardam sua decisão." },
  ]);
  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [
      ...m,
      { id: m.length + 1, from: "user", text },
      { id: m.length + 2, from: "bot", text: "Estou correlacionando os sinais dos workers de Obrigações Fiscais e Reforma Tributária e em instantes trarei o resultado." },
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
            <SideIcon icon={Briefcase} active />
            <SideIcon icon={Contact} />
          </nav>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary hover:bg-muted">
          <Sparkles className="h-5 w-5" />
        </button>
      </aside>

      <section className="flex w-[340px] flex-col border-r border-border bg-card">
        <header className="flex items-center justify-between px-6 py-5">
          <h1 className="text-base font-medium text-foreground">Compliance Digital Workers</h1>
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
              placeholder="Pergunte ao Compliance Digital Workers..."
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
        <div className="w-full px-4 py-6">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>

          {/* Hero */}
          {(() => {
            const conformidade = kpis.find((k) => k.label === "Índice de conformidade")!;
            const g = conformidade.gauge!;
            const pct = Math.round((g.value / g.max) * 100);
            return (
              <div className="rounded-2xl bg-[oklch(0.2_0.04_240)] p-6 text-white">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold tracking-widest text-white/60">
                      SEXTA-FEIRA, 15 DE MAIO DE 2026 · 07:24 · COMPLIANCE DIGITAL WORKERS
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold leading-tight">
                      Bom dia, João Silva.{" "}
                      <span className="text-[oklch(0.78_0.18_150)]">{acoesPendentes} ações</span>{" "}
                      dos workers aguardam decisão.
                    </h1>
                    <p className="mt-2 text-sm text-white/60">
                      Os 2 workers analisaram 184 obrigações fiscais, contábeis e trabalhistas e 847 regras tributárias nesta noite.
                      7 alertas preventivos detectados — 2 críticos relacionados à Reforma Tributária.
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

                  <Link
                    to="/apuracao-transicao"
                    className="group flex w-full flex-col rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all hover:border-[oklch(0.78_0.18_150)]/60 hover:bg-white/10 lg:w-72"
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                        Índice de conformidade
                      </p>
                      <span className="text-[11px] font-semibold text-[oklch(0.78_0.18_150)]">
                        +{g.deltaPts} pts
                      </span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-5xl font-semibold leading-none text-white">{g.value}</span>
                      <span className="text-sm text-white/50">/ {g.max}</span>
                    </div>
                    <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[oklch(0.65_0.2_150)] to-[oklch(0.78_0.18_150)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed text-white/60">
                      {g.status}. Score combina obrigações principais, acessórias e Reforma Tributária.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-[oklch(0.78_0.18_150)] opacity-0 transition-opacity group-hover:opacity-100">
                      Abrir apuração simulada <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </div>
              </div>
            );
          })()}

          {/* KPIs */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kpis
              .filter((k) => k.label !== "Índice de conformidade" && k.label !== "Diagnóstico Contábil")
              .map((k) => {
                const isAuditoria = k.label === "Auditoria";
                const isApuracao = k.label === "Apuração Simulada";
                const clickable = isAuditoria || isApuracao;
                const cardClass = `rounded-xl border border-border bg-card p-4 ${
                  clickable ? "cursor-pointer transition-shadow hover:shadow-md hover:border-primary/40" : ""
                }`;
                const inner = (
                  <>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      {k.label}
                    </p>
                    {"detalhes" in k && k.detalhes ? (
                      <div className="mt-3 space-y-2">
                        {k.detalhes.map((d) => (
                          <div key={d.label} className="flex items-baseline justify-between">
                            <span className="text-xs text-muted-foreground">{d.label}:</span>
                            <span className="text-sm font-semibold text-foreground">{d.valor}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <p className="mt-3 text-2xl font-semibold text-foreground">{k.valor}</p>
                        <p className={`mt-2 text-xs ${k.up ? "text-primary" : "text-[oklch(0.55_0.2_25)]"}`}>
                          {k.delta}
                        </p>
                      </>
                    )}
                  </>
                );
                if (isAuditoria) {
                  return (
                    <Link key={k.label} to="/icms-transicao" className={cardClass}>
                      {inner}
                    </Link>
                  );
                }
                if (isApuracao) {
                  return (
                    <Link key={k.label} to="/apuracao-transicao" className={cardClass}>
                      {inner}
                    </Link>
                  );
                }
                return (
                  <div key={k.label} className={cardClass}>
                    {inner}
                  </div>
                );
              })}
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
                  {a.to ? (
                    <Link to={a.to} className={`rounded-lg border bg-card px-4 py-2 text-xs font-medium ${styles.btn} hover:opacity-80`}>
                      {a.acao}
                    </Link>
                  ) : (
                    <button className={`rounded-lg border bg-card px-4 py-2 text-xs font-medium ${styles.btn} hover:opacity-80`}>
                      {a.acao}
                    </button>
                  )}
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
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                    CONFORMIDADE — SUA vs SETOR
                  </p>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Sua conformidade</p>
                    <p className="text-2xl font-semibold text-foreground">{conformidadeBenchmark.empresa.toString().replace(".", ",")}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Mediana setorial</p>
                    <p className="text-2xl font-semibold text-foreground">{conformidadeBenchmark.setor.toString().replace(".", ",")}%</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-[oklch(0.95_0.06_150)] px-3 py-2">
                  <ShieldCheck className="h-4 w-4 text-[oklch(0.55_0.18_150)]" />
                  <p className="text-xs text-[oklch(0.4_0.16_150)]">
                    <span className="font-semibold">+{conformidadeBenchmark.gap.toString().replace(".", ",")} pp</span> acima da mediana setorial
                  </p>
                </div>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Drivers da conformidade
                </p>
                <ul className="mt-2 space-y-2">
                  {conformidadeBenchmark.drivers.map((d) => {
                    const color = d.tone === "positivo" ? "text-[oklch(0.55_0.18_150)]" : "text-[oklch(0.55_0.2_25)]";
                    return (
                      <li key={d.label} className="flex items-center justify-between text-xs">
                        <div>
                          <span className="text-foreground">{d.label}</span>
                          <span className="ml-2 text-[11px] text-muted-foreground">{d.desc}</span>
                        </div>
                        <span className={`font-mono font-semibold ${color}`}>{d.valor}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                    REFORMA TRIBUTÁRIA — RADAR DE IMPACTO
                  </p>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {radarReforma.map((p) => {
                    const color =
                      p.tone === "positivo"
                        ? "text-[oklch(0.55_0.18_150)]"
                        : p.tone === "negativo"
                        ? "text-[oklch(0.55_0.2_25)]"
                        : "text-foreground";
                    return (
                      <li key={p.label} className="flex items-center justify-between text-xs">
                        <span className="text-foreground">{p.label}</span>
                        <span className={`font-mono font-semibold ${color}`}>{p.valor}</span>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Ações sugeridas
                </p>
                <ul className="mt-2 space-y-2">
                  {acoesReforma.map((a) => (
                    <li key={a.acao} className="rounded-lg border border-border bg-background/40 p-2.5">
                      <p className="text-xs font-medium text-foreground">{a.acao}</p>
                      <p className="mt-0.5 text-[11px] text-[oklch(0.55_0.18_150)]">{a.impacto}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-[11px] text-muted-foreground">
            <Bot className="h-3.5 w-3.5" />
            Compliance Digital Workers · 2 workers ativos · última sincronização há 1 min
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
