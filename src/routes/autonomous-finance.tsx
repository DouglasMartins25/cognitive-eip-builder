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
  ShieldCheck,
  Activity,
  Zap,
  Database,
  GitBranch,
  CheckCircle2,
  TrendingUp,
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

const principios = [
  {
    icon: ShieldCheck,
    titulo: "Governança primeiro",
    desc: "Workers nunca operam fora de política, alçada, compliance, regras fiscais ou limites financeiros.",
  },
  {
    icon: GitBranch,
    titulo: "Escalonamento por exceção",
    desc: "O humano atua apenas em risco, ambiguidade, conflito, baixa confiança ou impacto relevante.",
  },
  {
    icon: Activity,
    titulo: "Operação contínua",
    desc: "24/7, processando eventos em tempo real, aprendendo padrões e reduzindo backlog operacional.",
  },
  {
    icon: Zap,
    titulo: "Event-driven",
    desc: "Ativados por anomalias, lançamentos fora do padrão, mudanças legislativas e eventos críticos.",
  },
];

const tiposComparacao = [
  { tipo: "Assistente", faz: "Responde", exemplo: "Há uma anomalia no fluxo de caixa." },
  { tipo: "Agente", faz: "Analisa e recomenda", exemplo: "Sugiro revisar este pagamento suspeito." },
  { tipo: "Digital Worker", faz: "Executa", exemplo: "Alerta gerado e encaminhado ao gestor." },
];

const agentes = [
  {
    id: "A1",
    nome: "Worker de Anomalia Financeira",
    icon: AlertCircle,
    objetivo:
      "Garantir a integridade e o padrão da operação financeira por meio de detecção contínua de anomalias em pagamentos e recebimentos.",
    monitora: [
      "Volume e frequência de pagamentos por fornecedor",
      "Padrão de recebimentos por cliente",
      "Variações anômalas em valores e datas",
      "Duplicidade de lançamentos e fluxo de caixa",
    ],
    detecta: [
      "Pagamentos duplicados ou com valores divergentes",
      "Fornecedores com variação acima do histórico",
      "Recebimentos fora do padrão do cliente",
      "Risco de liquidez detectado com antecedência",
    ],
    inputs: [
      "Contas a pagar e contas a receber",
      "Lançamentos e conciliações bancárias",
      "Fluxo de caixa e histórico transacional",
    ],
    outputs: [
      "Alertas classificados por criticidade",
      "Relatórios de anomalias detectadas",
      "Insights de comportamento financeiro",
    ],
  },
  {
    id: "A2",
    nome: "Worker de Compliance Tributário",
    icon: ShieldCheck,
    objetivo:
      "Assegurar a conformidade fiscal e tributária da operação frente à Reforma Tributária, normativas e legislação vigente.",
    monitora: [
      "Legislação da Reforma Tributária e regulamentações",
      "Instruções normativas, decretos e portarias",
      "Cronograma de vigência e prazos de transição",
      "Impacto por setor, regime e tipo de operação",
    ],
    detecta: [
      "CFOP, CST e NCM divergentes da nova legislação",
      "Alíquotas IBS/CBS aplicadas incorretamente",
      "Regras de crédito/débito fiscal inconsistentes",
      "Parametrizações de regimes especiais desatualizadas",
    ],
    inputs: [
      "Parametrizações fiscais do ERP",
      "Tabelas oficiais de alíquotas IBS/CBS",
      "Instruções normativas e decretos",
      "Histórico de configurações do sistema",
    ],
    outputs: [
      "Alertas de inconformidade fiscal classificados",
      "Diagnóstico de parametrizações do ERP",
      "Mapa de impacto da Reforma Tributária",
    ],
  },
];

const fluxo = [
  "Evento financeiro / mudança legislativa detectada",
  "Worker analisa contexto e aplica políticas",
  "Gera alerta classificado e encaminha ao gestor",
  "Monitora resolução e aprende com o padrão",
  "Escala apenas exceções críticas ao humano",
];

const valores = [
  { label: "Risco operacional", valor: "↓ 78%", desc: "anomalias detectadas em tempo real" },
  { label: "Cobertura legislativa", valor: "100%", desc: "Reforma Tributária analisada continuamente" },
  { label: "Tempo de adequação", valor: "−92%", desc: "entre mudança legislativa e ajuste" },
  { label: "Conferência manual", valor: "−85%", desc: "monitoramento 24/7 sem esforço humano" },
];

function AutonomousFinance() {
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
              SANKHYA FINANCE · DIGITAL WORKERS
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight">
              Autonomous Finance.{" "}
              <span className="text-[oklch(0.78_0.18_150)]">Da automação assistiva</span>{" "}
              para execução operacional autônoma.
            </h1>
            <p className="mt-2 text-sm text-white/60">
              O ERP deixa de apenas registrar transações para incorporar mão de obra digital
              que monitora eventos, interpreta contexto, decide dentro de políticas e executa
              processos ponta a ponta — escalando humanos apenas em exceções.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {agentes.map((a) => (
                <span
                  key={a.id}
                  className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.5_0.12_150)]/60 bg-[oklch(0.25_0.08_150)]/40 px-3 py-1 text-xs text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.18_150)]" />
                  <span className="font-semibold">{a.id}</span> {a.nome}
                </span>
              ))}
            </div>
          </div>

          {/* Diferença */}
          <p className="mt-8 text-[11px] font-semibold tracking-widest text-muted-foreground">
            ASSISTENTE × AGENTE × DIGITAL WORKER
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
            {tiposComparacao.map((t) => (
              <div key={t.tipo} className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">{t.tipo}</p>
                <p className="mt-2 text-sm font-medium text-foreground">{t.faz}</p>
                <p className="mt-2 text-xs italic text-muted-foreground">"{t.exemplo}"</p>
              </div>
            ))}
          </div>

          {/* Princípios */}
          <p className="mt-8 text-[11px] font-semibold tracking-widest text-muted-foreground">
            PRINCÍPIOS DE ARQUITETURA
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {principios.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.titulo} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{p.titulo}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Agentes detalhados */}
          <p className="mt-8 text-[11px] font-semibold tracking-widest text-muted-foreground">
            AGENTES ATIVOS NO SANKHYA FINANCE
          </p>
          <div className="mt-3 space-y-4">
            {agentes.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.id} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-muted-foreground">
                        Agente {a.id.replace("A", "")}
                      </p>
                      <p className="text-base font-semibold text-foreground">{a.nome}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-foreground/80">{a.objetivo}</p>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">MONITORA</p>
                      <ul className="mt-2 space-y-1.5">
                        {a.monitora.map((m) => (
                          <li key={m} className="flex items-start gap-2 text-xs text-foreground">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">DETECTA</p>
                      <ul className="mt-2 space-y-1.5">
                        {a.detecta.map((m) => (
                          <li key={m} className="flex items-start gap-2 text-xs text-foreground">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[oklch(0.6_0.16_60)]" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="flex items-center gap-2">
                        <Database className="h-3.5 w-3.5 text-muted-foreground" />
                        <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">INPUTS</p>
                      </div>
                      <ul className="mt-2 space-y-1">
                        {a.inputs.map((i) => (
                          <li key={i} className="text-xs text-foreground/80">· {i}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                        <p className="text-[11px] font-semibold tracking-widest text-primary">OUTPUTS</p>
                      </div>
                      <ul className="mt-2 space-y-1">
                        {a.outputs.map((o) => (
                          <li key={o} className="text-xs text-foreground/80">· {o}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fluxo */}
          <p className="mt-8 text-[11px] font-semibold tracking-widest text-muted-foreground">
            FLUXO DE EXECUÇÃO AUTÔNOMA
          </p>
          <div className="mt-3 rounded-xl border border-border bg-card p-5">
            <ol className="space-y-3">
              {fluxo.map((passo, i) => (
                <li key={passo} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm text-foreground">{passo}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Valor gerado */}
          <p className="mt-8 text-[11px] font-semibold tracking-widest text-muted-foreground">
            VALOR GERADO
          </p>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map((v) => (
              <div key={v.label} className="rounded-xl border border-border bg-card p-4">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  {v.label}
                </p>
                <p className="mt-3 text-2xl font-semibold text-primary">{v.valor}</p>
                <p className="mt-2 text-xs text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-accent/30 p-5">
            <div className="flex items-start gap-3">
              <TrendingUp className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  O ERP como sistema operacional da empresa
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  A conformidade com a Reforma Tributária não pode depender de revisão manual periódica.
                  Ela precisa ser contínua, inteligente e automatizada — operada por workers digitais
                  especializados que escalam humanos apenas em exceções.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-[11px] text-muted-foreground">
            <Bot className="h-3.5 w-3.5" />
            Autonomous Finance · 2 agentes ativos · Sankhya Finance
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
