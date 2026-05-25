import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calculator,
  Workflow,
  Settings2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Wallet,
  Receipt,
  Inbox,
  Crop,
  Bell,
  Tag,
  RefreshCw,
  Briefcase,
  Contact,
  Maximize2,
} from "lucide-react";

export const Route = createFileRoute("/portal-reforma")({
  component: PortalReformaPage,
});

function SideIcon({
  icon: Icon,
  to,
  href,
  active = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  to?: string;
  href?: string;
  active?: boolean;
}) {
  const cls = `flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
    active ? "bg-muted text-foreground" : "text-sidebar-foreground hover:bg-muted"
  }`;
  if (href) {
    return (
      <a href={href} className={cls}>
        <Icon className="h-5 w-5" />
      </a>
    );
  }
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


type Cenario = "atual" | "transicao" | "plena";

const cenarios: { id: Cenario; label: string; ano: string; desc: string }[] = [
  { id: "atual", label: "Regime Atual", ano: "2025", desc: "PIS/COFINS, ICMS, ISS, IPI" },
  { id: "transicao", label: "Transição", ano: "2027–2032", desc: "Coexistência com CBS/IBS" },
  { id: "plena", label: "Reforma Plena", ano: "2033+", desc: "CBS + IBS + IS" },
];

const parametros = [
  { grupo: "CBS", itens: [
    { label: "Alíquota CBS", valor: "8,8%", ref: "Federal" },
    { label: "Crédito presumido", valor: "20%", ref: "Regimes específicos" },
  ]},

  { grupo: "IBS", itens: [
    { label: "Alíquota estadual IBS", valor: "12,3%", ref: "UF de destino" },
    { label: "Alíquota municipal IBS", valor: "5,4%", ref: "Município de destino" },
    { label: "Regime regular", valor: "Não-cumulativo pleno", ref: "Art. 156-A CF" },
  ]},
  { grupo: "Imposto Seletivo", itens: [
    { label: "NCMs monitorados", valor: "18", ref: "Bebidas, fumo, veículos" },
    { label: "Alíquota média projetada", valor: "9,5%", ref: "Estimativa LC 214/25" },
  ]},
];

const splitPayment = [
  { label: "Operações elegíveis identificadas", valor: "1.842" },
  { label: "Operações em piloto", valor: "3" },
  { label: "Antecipação média de crédito", valor: "R$ 186k / mês" },
  { label: "Redução de risco de inadimplência", valor: "−42%" },
  { label: "Liquidação automática (D+0)", valor: "Habilitada · 4 PSPs" },
];

const adequacao = [
  { label: "Itens com CST atualizado", valor: 968, total: 1310, tone: "ok" as const },
  { label: "SKUs mapeados para IBS", valor: 1284, total: 1310, tone: "warn" as const },
  { label: "Operações com Split Payment", valor: 3, total: 1842, tone: "warn" as const },
  { label: "Regras CBS reparametrizadas", valor: 847, total: 847, tone: "ok" as const },
];

function formatMoney(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function PortalReformaPage() {
  const [cenario, setCenario] = useState<Cenario>("transicao");
  const [faturamento, setFaturamento] = useState(12_000_000);
  const [creditos, setCreditos] = useState(35); // %
  const [splitAtivo, setSplitAtivo] = useState(true);

  const simulacao = useMemo(() => {
    const aliqAtual = 0.0925 + 0.18; // PIS/COFINS + ICMS médio simplificado
    const aliqTransicao = 0.0925 + 0.18 + 0.009; // overhead transição
    const aliqPlena = 0.088 + 0.123 + 0.054; // CBS + IBS UF + Mun

    const aliq = cenario === "atual" ? aliqAtual : cenario === "transicao" ? aliqTransicao : aliqPlena;
    const debito = faturamento * aliq;
    const credito = debito * (creditos / 100);
    const aRecolher = debito - credito;
    const splitImpacto = splitAtivo ? aRecolher * 0.08 : 0; // antecipação 8%
    const liquido = aRecolher - splitImpacto;

    return { aliq, debito, credito, aRecolher, splitImpacto, liquido };
  }, [cenario, faturamento, creditos, splitAtivo]);

  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ id: number; from: "user" | "bot"; text: string }[]>([
    { id: 1, from: "bot", text: "Bom dia, João. Sou o Portal Reforma. Já parametrizei CBS, IBS e Imposto Seletivo conforme LC 214/25 — posso simular impactos por cenário ou priorizar itens de adequação." },
  ]);
  const handleSend = () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatMessages((m) => [
      ...m,
      { id: m.length + 1, from: "user", text },
      { id: m.length + 2, from: "bot", text: "Estou recalculando o cenário com base nas suas premissas e em instantes trarei o resultado." },
    ]);
    setChatInput("");
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
            <SideIcon icon={Contact} href="https://id-preview--fc83a047-dc91-4a91-a387-9ee13c75e17e.lovable.app/" />
          </nav>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary hover:bg-muted">
          <Sparkles className="h-5 w-5" />
        </button>
      </aside>

      <section className="flex w-[340px] flex-col border-r border-border bg-card">
        <header className="flex items-center justify-between px-6 py-5">
          <h1 className="text-base font-medium text-foreground">Portal Reforma</h1>
          <button className="text-muted-foreground hover:text-foreground">
            <Maximize2 className="h-4 w-4" />
          </button>
        </header>
        <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-4">
          {chatMessages.map((m) => (
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
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Pergunte ao Portal Reforma..."
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

      <main className="flex-1 overflow-y-auto bg-background">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link to="/compliance" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar ao Compliance
          </Link>


        {/* Hero */}
        <div className="mt-6 rounded-2xl bg-[oklch(0.2_0.04_240)] p-6 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <p className="text-[11px] font-semibold tracking-widest text-white/60">
                PORTAL REFORMA TRIBUTÁRIA · LC 214/25 · EC 132/23
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight">
                Parametrize, simule e antecipe o impacto da{" "}
                <span className="text-[oklch(0.78_0.18_150)]">CBS, IBS e Split Payment</span>.
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-white/60">
                Cenários de transição e regime pleno, ajuste de alíquotas, créditos, regimes
                específicos e simulação financeira por operação.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {cenarios.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCenario(c.id)}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      cenario === c.id
                        ? "border-[oklch(0.78_0.18_150)] bg-[oklch(0.78_0.18_150)]/15 text-white"
                        : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <span className="font-semibold">{c.label}</span>
                    <span className="ml-2 text-white/50">{c.ano}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur lg:w-80">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Carga tributária simulada
              </p>
              <p className="mt-3 text-4xl font-semibold text-white">
                {(simulacao.aliq * 100).toFixed(1).replace(".", ",")}%
              </p>
              <p className="mt-1 text-xs text-white/60">
                sobre faturamento de {formatMoney(faturamento)}
              </p>
              <div className="mt-4 space-y-1.5 text-xs">
                <Row label="Débito bruto" valor={formatMoney(simulacao.debito)} />
                <Row label="Créditos apurados" valor={`− ${formatMoney(simulacao.credito)}`} />
                {splitAtivo && (
                  <Row label="Antecipação Split Payment" valor={`− ${formatMoney(simulacao.splitImpacto)}`} tone="positivo" />
                )}
                <div className="mt-2 border-t border-white/10 pt-2">
                  <Row label="A recolher (líquido)" valor={formatMoney(simulacao.liquido)} bold />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulador controls */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-primary" />
              <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                SIMULADOR DE IMPACTO
              </p>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Faturamento mensal</span>
                  <span className="font-semibold text-foreground">{formatMoney(faturamento)}</span>
                </div>
                <input
                  type="range"
                  min={1_000_000}
                  max={50_000_000}
                  step={500_000}
                  value={faturamento}
                  onChange={(e) => setFaturamento(Number(e.target.value))}
                  className="mt-2 w-full accent-primary"
                />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">% de créditos aproveitados</span>
                  <span className="font-semibold text-foreground">{creditos}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={80}
                  step={1}
                  value={creditos}
                  onChange={(e) => setCreditos(Number(e.target.value))}
                  className="mt-2 w-full accent-primary"
                />
              </div>
              <label className="flex items-center justify-between rounded-lg border border-border bg-background/40 px-3 py-2 text-xs">
                <span className="flex items-center gap-2 text-foreground">
                  <Workflow className="h-4 w-4 text-primary" />
                  Aplicar Split Payment
                </span>
                <input
                  type="checkbox"
                  checked={splitAtivo}
                  onChange={(e) => setSplitAtivo(e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                COMPARATIVO ENTRE CENÁRIOS · ANUALIZADO
              </p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {cenarios.map((c) => {
                const aliq = c.id === "atual" ? 0.2725 : c.id === "transicao" ? 0.2815 : 0.265;
                const anual = faturamento * 12 * aliq;
                const active = c.id === cenario;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCenario(c.id)}
                    className={`rounded-lg border p-3 text-left transition ${
                      active
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background/40 hover:border-primary/40"
                    }`}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {c.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      {formatMoney(anual)}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {(aliq * 100).toFixed(1).replace(".", ",")}% efetivo · {c.ano}
                    </p>
                  </button>
                );
              })}
            </div>

            <p className="mt-5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Status de adequação
            </p>
            <ul className="mt-3 space-y-2">
              {adequacao.map((a) => {
                const pct = Math.round((a.valor / a.total) * 100);
                const ok = a.tone === "ok";
                return (
                  <li key={a.label} className="text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">{a.label}</span>
                      <span className="font-mono font-semibold text-foreground">
                        {a.valor.toLocaleString("pt-BR")} / {a.total.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${
                          ok ? "bg-[oklch(0.65_0.18_150)]" : "bg-[oklch(0.7_0.16_70)]"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Parametrização */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-primary" />
              <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                PARAMETRIZAÇÃO CBS / IBS / IS
              </p>
            </div>
            <div className="mt-4 space-y-5">
              {parametros.map((g) => (
                <div key={g.grupo}>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5 text-primary" />
                    <p className="text-xs font-semibold text-foreground">{g.grupo}</p>
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {g.itens.map((i) => (
                      <li
                        key={i.label}
                        className="flex items-center justify-between rounded-lg border border-border bg-background/40 px-3 py-2 text-xs"
                      >
                        <div>
                          <p className="font-medium text-foreground">{i.label}</p>
                          <p className="text-[11px] text-muted-foreground">{i.ref}</p>
                        </div>
                        <span className="font-mono font-semibold text-foreground">{i.valor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-primary" />
                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                  SPLIT PAYMENT — OPERAÇÃO
                </p>
              </div>
              <ul className="mt-4 space-y-2">
                {splitPayment.map((s) => (
                  <li key={s.label} className="flex items-center justify-between text-xs">
                    <span className="text-foreground">{s.label}</span>
                    <span className="font-mono font-semibold text-foreground">{s.valor}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-[oklch(0.95_0.06_150)] px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-[oklch(0.55_0.18_150)]" />
                <p className="text-xs text-[oklch(0.4_0.16_150)]">
                  Liquidação D+0 antecipa <span className="font-semibold">R$ 186k/mês</span> em crédito tributário.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-[oklch(0.6_0.16_60)]" />
                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                  ITENS NÃO ADEQUADOS — REQUEREM AÇÃO
                </p>
              </div>
              <ul className="mt-4 space-y-2">
                {[
                  { titulo: "342 itens com CST desatualizado", desc: "Risco de autuação: R$ 412k", acao: "Reparametrizar" },
                  { titulo: "26 SKUs sem mapeamento IBS", desc: "Cobertura atual 98%", acao: "Mapear" },
                  { titulo: "1.839 operações fora do Split Payment", desc: "Antecipação potencial: R$ 1,2M/mês", acao: "Habilitar" },
                ].map((i) => (
                  <li
                    key={i.titulo}
                    className="flex items-center justify-between rounded-lg border border-border bg-background/40 px-3 py-2.5 text-xs"
                  >
                    <div>
                      <p className="font-medium text-foreground">{i.titulo}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{i.desc}</p>
                    </div>
                    <button className="rounded-md border border-primary px-3 py-1 text-[11px] font-medium text-primary hover:bg-primary/5">
                      {i.acao}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Cronograma */}
        <div className="mt-6 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Receipt className="h-4 w-4 text-primary" />
            <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
              CRONOGRAMA DE TRANSIÇÃO
            </p>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-5">
            {[
              { ano: "2026", marco: "Regulamentação LC 214", status: "Concluído" },
              { ano: "2027", marco: "CBS teste 0,9% · IS vigente", status: "Em execução" },
              { ano: "2029", marco: "Início redução ICMS/ISS", status: "Planejado" },
              { ano: "2032", marco: "Coexistência plena", status: "Planejado" },
              { ano: "2033", marco: "Extinção PIS/COFINS/ICMS/ISS", status: "Meta" },
            ].map((c) => (
              <div key={c.ano} className="rounded-lg border border-border bg-background/40 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {c.ano}
                </p>
                <p className="mt-2 text-xs font-medium text-foreground">{c.marco}</p>
                <p className="mt-1 text-[11px] text-primary">{c.status}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-[11px] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          Portal Reforma · simulações baseadas em LC 214/25 e EC 132/23 · valores estimados
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  valor,
  tone,
  bold,
}: {
  label: string;
  valor: string;
  tone?: "positivo";
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/60">{label}</span>
      <span
        className={`font-mono ${bold ? "text-base font-semibold text-white" : "text-white/90"} ${
          tone === "positivo" ? "text-[oklch(0.78_0.18_150)]" : ""
        }`}
      >
        {valor}
      </span>
    </div>
  );
}
