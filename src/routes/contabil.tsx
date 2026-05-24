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
  Activity,
  FileWarning,
  BarChart3,
  Calculator,
  Maximize2,
  BookOpen,
  CalendarClock,
  Landmark,
  Receipt,
} from "lucide-react";

export const Route = createFileRoute("/contabil")({
  component: ContabilPage,
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
  { id: "K1", nome: "Conciliação Contábil", status: "alert" },
  { id: "K2", nome: "Fechamento & Relatórios", status: "alert" },
] as const;

const kpis = [
  {
    label: "Saúde do fechamento",
    valor: "",
    delta: "",
    up: true,
    gauge: { value: 94, max: 100, status: "Pronto para fechar", deltaPts: 2.3, sparkline: [85, 87, 88, 89, 90, 91, 92, 93, 94, 94] },
  },
  {
    label: "Lançamentos Analisados",
    valor: "",
    delta: "",
    up: true,
    detalhes: [
      { label: "Lançamentos do mês", valor: "12.480" },
      { label: "Classificados pelo worker", valor: "12.114" },
      { label: "Aguardando revisão", valor: "366" },
    ],
  },
  { label: "Resultado prévio (DRE)", valor: "R$ 1,82M", delta: "+4,6% vs mês anterior", up: true },
  {
    label: "Obrigações Contábeis",
    valor: "",
    delta: "",
    up: true,
    detalhes: [
      { label: "ECD — status preparação", valor: "82%" },
      { label: "ECF — partidas vinculadas", valor: "96%" },
      { label: "SPED Contribuições", valor: "Pronto" },
      { label: "Vencimentos em 30 dias", valor: "4" },
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
}[] = [
  {
    tipo: "critico",
    icon: FileWarning,
    agente: "K1",
    titulo: "Divergência entre razão auxiliar e contábil",
    descricao: "Conta 1.1.02.001 (Bancos · Itaú) · diferença de R$ 24.318,52 · 7 lançamentos sem correspondência no extrato",
    acao: "Conciliar",
  },
  {
    tipo: "critico",
    icon: AlertCircle,
    agente: "K2",
    titulo: "Provisões de férias e 13º desatualizadas",
    descricao: "Cálculo do passivo trabalhista pendente desde 30/04 · impacto estimado de R$ 184k no resultado",
    acao: "Recalcular",
  },
  {
    tipo: "atencao",
    icon: Calculator,
    agente: "K1",
    titulo: "Lançamentos sem centro de custo",
    descricao: "84 lançamentos classificados pelo worker aguardam validação do centro de custo · impacto em rateios gerenciais",
    acao: "Revisar",
  },
  {
    tipo: "atencao",
    icon: CalendarClock,
    agente: "K2",
    titulo: "ECD 2026 — preparação em 82%",
    descricao: "Faltam 3 ajustes contábeis e validação de 2 contas redutoras · prazo legal em 28/06",
    acao: "Continuar preparo",
  },
  {
    tipo: "info",
    icon: BookOpen,
    agente: "K2",
    titulo: "Nota técnica CFC nº 14/2026 publicada",
    descricao: "Atualização do CPC 06 (R2) — Arrendamentos · 6 contratos em revisão de mensuração automática",
    acao: "Ver impacto",
  },
];

const atividades = [
  { hora: "00:42", agente: "K1", desc: "Extratos OFX de 5 bancos importados e normalizados (3.812 movimentos)" },
  { hora: "01:18", agente: "K1", desc: "Conciliação automática concluída · 96,4% de match com razão contábil" },
  { hora: "01:55", agente: "K2", desc: "Provisões de impostos a recolher recalculadas para competência 05/2026" },
  { hora: "02:34", agente: "K1", desc: "12.114 lançamentos classificados por IA no plano de contas (BR-GAAP)" },
  { hora: "03:12", agente: "K2", desc: "Depreciações e amortizações lançadas em 248 itens do ativo imobilizado" },
  { hora: "03:48", agente: "K1", desc: "Conciliação de cartões e maquininhas — 7 estornos identificados" },
  { hora: "04:21", agente: "K2", desc: "Balancete diário gerado · 0 contas sem natureza definida" },
  { hora: "05:02", agente: "K1", desc: "Encerramento parcial de contas de resultado simulado para 31/05" },
  { hora: "05:39", agente: "K2", desc: "DRE preliminar e DRA atualizadas com últimos lançamentos" },
  { hora: "06:11", agente: "K2", desc: "ECF — 184 lançamentos vinculados a partidas M-300/N-630" },
  { hora: "06:48", agente: "K2", desc: "Notas explicativas preliminares geradas para o fechamento mensal" },
];

const benchmarkFechamento = {
  setor: 7.2,
  empresa: 4.1,
  gap: 3.1,
  drivers: [
    { label: "Conciliação bancária", valor: "+1,8 d", tone: "positivo" as const, desc: "automação noturna" },
    { label: "Classificação de lançamentos", valor: "+0,9 d", tone: "positivo" as const, desc: "IA com 97% de acerto" },
    { label: "Provisões e ajustes", valor: "−0,4 d", tone: "negativo" as const, desc: "dependência de RH/Fiscal" },
  ],
};

const radarFechamento: { label: string; valor: string; tone: "positivo" | "negativo" | "neutro" }[] = [
  { label: "Balancete — contas validadas", valor: "100%", tone: "positivo" },
  { label: "Razão — lançamentos classificados", valor: "97,1%", tone: "positivo" },
  { label: "Conciliação bancária", valor: "18/19 contas", tone: "neutro" },
  { label: "Ativo Imobilizado — depreciação", valor: "248 itens · OK", tone: "positivo" },
  { label: "Risco de re-trabalho no fechamento", valor: "Baixo · 4%", tone: "neutro" },
];

const acoesContabeis = [
  { acao: "Conciliar R$ 24,3k pendentes na conta Bancos · Itaú", impacto: "Libera fechamento da competência 05/2026" },
  { acao: "Atualizar provisões trabalhistas (férias e 13º)", impacto: "Ajuste estimado de R$ 184k no resultado" },
  { acao: "Validar centro de custo em 84 lançamentos sugeridos", impacto: "Garante rateio gerencial e relatórios por filial" },
];

function Gauge({ value, max, status, deltaPts, sparkline }: { value: number; max: number; status: string; deltaPts: number; sparkline: number[] }) {
  const pct = Math.min(1, Math.max(0, value / max));
  const angle = -90 + pct * 180;
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
            <linearGradient id="contabilGaugeGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="oklch(0.6 0.22 25)" />
              <stop offset="50%" stopColor="oklch(0.78 0.18 75)" />
              <stop offset="100%" stopColor="oklch(0.65 0.2 150)" />
            </linearGradient>
          </defs>
          <path d={arc(180, 360)} stroke="url(#contabilGaugeGrad)" strokeWidth="14" fill="none" strokeLinecap="round" />
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

function ContabilPage() {
  const acoesPendentes = alertas.length;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ id: number; from: "user" | "bot"; text: string }[]>([
    { id: 1, from: "bot", text: "Bom dia, João. Sou o Contábil Digital Workers. Os 2 workers conciliaram 12.480 lançamentos e prepararam o fechamento — 5 ações aguardam sua decisão." },
  ]);
  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [
      ...m,
      { id: m.length + 1, from: "user", text },
      { id: m.length + 2, from: "bot", text: "Vou cruzar os sinais dos workers de Conciliação e Fechamento e te trago o resultado em instantes." },
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
          <h1 className="text-base font-medium text-foreground">Contábil Digital Workers</h1>
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
              placeholder="Pergunte ao Contábil Digital Workers..."
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
          <div className="rounded-2xl bg-[oklch(0.2_0.04_240)] p-6 text-white">
            <p className="text-[11px] font-semibold tracking-widest text-white/60">
              SEXTA-FEIRA, 15 DE MAIO DE 2026 · 07:24 · CONTÁBIL DIGITAL WORKERS
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight">
              Bom dia, João Silva.{" "}
              <span className="text-[oklch(0.78_0.18_150)]">{acoesPendentes} ações</span>{" "}
              dos workers aguardam decisão.
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Os 2 workers conciliaram 12.480 lançamentos contábeis, classificaram 12.114 por IA e
              prepararam balancete, DRE e provisões da competência 05/2026.
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
            {kpis.map((k) => {
              const isGauge = "gauge" in k && k.gauge;
              const cardClass = `rounded-xl border border-border bg-card p-4`;
              return (
                <div key={k.label} className={cardClass}>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    {k.label}
                  </p>
                  {isGauge ? (
                    <Gauge {...k.gauge!} />
                  ) : "detalhes" in k && k.detalhes ? (
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
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                    DIAS PARA FECHAR O MÊS — SUA vs SETOR
                  </p>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Seu fechamento</p>
                    <p className="text-2xl font-semibold text-foreground">{benchmarkFechamento.empresa.toString().replace(".", ",")} dias</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Mediana setorial</p>
                    <p className="text-2xl font-semibold text-foreground">{benchmarkFechamento.setor.toString().replace(".", ",")} dias</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-[oklch(0.95_0.06_150)] px-3 py-2">
                  <Activity className="h-4 w-4 text-[oklch(0.55_0.18_150)]" />
                  <p className="text-xs text-[oklch(0.4_0.16_150)]">
                    <span className="font-semibold">−{benchmarkFechamento.gap.toString().replace(".", ",")} dias</span> abaixo da mediana setorial
                  </p>
                </div>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Drivers do fechamento
                </p>
                <ul className="mt-2 space-y-2">
                  {benchmarkFechamento.drivers.map((d) => {
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
                  <Landmark className="h-4 w-4 text-primary" />
                  <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                    QUALIDADE CONTÁBIL — RADAR DO FECHAMENTO
                  </p>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {radarFechamento.map((p) => {
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
                  {acoesContabeis.map((a) => (
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
            Contábil Digital Workers · 2 workers ativos · última sincronização há 1 min
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
