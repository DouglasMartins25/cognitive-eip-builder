import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  AlertTriangle,
  Send,
  ArrowDown,
  ArrowUp,
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
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/icms-diagnostico")({
  component: IcmsDiagnostico,
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
        active ? "bg-muted text-foreground" : "text-sidebar-foreground hover:bg-muted"
      }`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

const kpis = [
  { value: "R$ 18,4k", label: "Impacto estimado", sub: "todas as divergências", tone: "primary" },
  { value: "28", label: "Entradas c/ divergência", sub: "notificação ao fornecedor", tone: "info" },
  { value: "19", label: "Saídas c/ divergência", sub: "ajuste de regra disponível", tone: "warning" },
  { value: "23", label: "Ações pendentes", sub: "entre entrada e saída", tone: "danger" },
  { value: "8", label: "Resolvidas", sub: "esta sessão", tone: "success" },
] as const;

const toneBar: Record<string, string> = {
  primary: "border-l-primary",
  info: "border-l-[oklch(0.55_0.16_250)]",
  warning: "border-l-[oklch(0.7_0.15_60)]",
  danger: "border-l-[oklch(0.6_0.2_25)]",
  success: "border-l-primary/70",
};
const toneText: Record<string, string> = {
  primary: "text-primary",
  info: "text-[oklch(0.55_0.16_250)]",
  warning: "text-[oklch(0.65_0.18_60)]",
  danger: "text-[oklch(0.55_0.2_25)]",
  success: "text-primary",
};

const topParceiros = [
  { nome: "Ind. Becker Ltda", valor: 21 },
  { nome: "Comp. Sul S/A", valor: 12 },
  { nome: "Metalúrg. Dias", valor: 9 },
  { nome: "Eletro Norte", valor: 5 },
];
const topProdutos = [
  { nome: "Motor elétr. 5cv", valor: 19 },
  { nome: "Parafuso M8", valor: 13 },
  { nome: "Cabo coaxial", valor: 8 },
  { nome: "Relé 24v", valor: 7 },
];
const topUFs = [
  { nome: "MG", valor: 18 },
  { nome: "SP", valor: 14 },
  { nome: "RS", valor: 7 },
  { nome: "PR", valor: 5 },
];

type Doc = {
  id: string;
  nfe: string;
  data: string;
  cliente: string;
  valor: string;
  rota: string;
  status: "erros" | "alerta" | "ok";
  statusLabel: string;
};

const entradas: Doc[] = [
  { id: "d1", nfe: "110507", data: "03/09/2025", cliente: "EMPRESA JR DF", valor: "R$ 1.000", rota: "DF→MG", status: "erros", statusLabel: "2 erros" },
  { id: "d2", nfe: "412346", data: "15/08/2025", cliente: "Componentes Sul S/A", valor: "R$ 9.800", rota: "SP→MG", status: "alerta", statusLabel: "1 alerta" },
  { id: "d3", nfe: "412348", data: "20/08/2025", cliente: "Eletro Norte Ltda", valor: "R$ 11.200", rota: "RS→MG", status: "alerta", statusLabel: "1 alerta" },
  { id: "d4", nfe: "412350", data: "22/08/2025", cliente: "Metalúrgica Dias", valor: "R$ 4.500", rota: "PR→MG", status: "erros", statusLabel: "3 erros" },
  { id: "d5", nfe: "412355", data: "25/08/2025", cliente: "Ind. Becker Ltda", valor: "R$ 18.300", rota: "SC→MG", status: "alerta", statusLabel: "1 alerta" },
];

const auditorias = [
  {
    id: "a1",
    titulo: "ICMS · Alíquota — Rejeição",
    desc: "Alíquota diverge da tabela interestadual",
    detalhe: "4% → 12% · R$80 crédito",
    asis: "RN 1549 · 2129",
    progresso: 91,
  },
  {
    id: "a2",
    titulo: "Indpres x Finnfe",
    desc: "Indicador de presença diverge",
    detalhe: "",
    asis: "RN 3913",
    progresso: 0,
  },
];

function Bar({ items, color }: { items: { nome: string; valor: number }[]; color: string }) {
  const max = Math.max(...items.map((i) => i.valor));
  return (
    <div className="space-y-2">
      {items.map((i) => (
        <div key={i.nome} className="flex items-center gap-3 text-xs">
          <div className="w-24 shrink-0 text-muted-foreground">{i.nome}</div>
          <div className="relative h-2 flex-1 rounded-full bg-muted">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${(i.valor / max) * 100}%`, background: color }}
            />
          </div>
          <div className="w-8 text-right tabular-nums text-foreground">{i.valor}</div>
        </div>
      ))}
    </div>
  );
}

type ChatMessage = { id: number; from: "user" | "agent"; text: string };

function IcmsDiagnostico() {
  const [tab, setTab] = useState<"resumo" | "detalhamento" | "historico">("resumo");
  const [selectedDoc, setSelectedDoc] = useState<string>("d1");
  const [selectedAuditoria, setSelectedAuditoria] = useState<string>("a1");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, from: "user", text: "Como está as apurações de ICMS?" },
    {
      id: 2,
      from: "agent",
      text:
        "Identifiquei 47 documentos auditados nesta sessão, com R$ 18,4k de impacto estimado entre divergências de alíquota, CFOP e indicador de presença. Veja o diagnóstico ao lado.",
    },
  ]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text }]);
    setInput("");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left icon sidebar */}
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

      {/* Chat column */}
      <section className="flex w-[340px] flex-col border-r border-border bg-card">
        <header className="flex items-center justify-between px-6 py-5">
          <h1 className="text-base font-medium text-foreground">Diagnóstico fiscal</h1>
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
              placeholder="Pergunte ao diagnóstico fiscal..."
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

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div>


        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-xl font-semibold text-foreground">
            Diagnóstico Fiscal <span className="text-muted-foreground">· Auditoria de ICMS</span>
          </h1>
        </div>

        {/* Tabs */}
        <div className="mt-5 flex items-center gap-6 border-b border-border">
          {[
            { id: "resumo", label: "Resumo" },
            { id: "detalhamento", label: "Detalhamento Documentos" },
            { id: "historico", label: "Histórico de Aplicações" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={`relative pb-3 text-sm transition-colors ${
                tab === t.id ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
              {tab === t.id && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
            </button>
          ))}
        </div>

        {/* KPIs */}
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          {kpis.map((k) => (
            <div
              key={k.label}
              className={`rounded-xl border border-border bg-card p-4 border-l-4 ${toneBar[k.tone]}`}
            >
              <div className={`text-2xl font-semibold ${toneText[k.tone]}`}>{k.value}</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {k.label}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Top blocks */}
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Top parceiros · divergências
            </div>
            <Bar items={topParceiros} color="oklch(0.6 0.2 25)" />
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Top produtos · divergências
            </div>
            <Bar items={topProdutos} color="oklch(0.7 0.15 60)" />
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Top UFs destino · divergências
            </div>
            <Bar items={topUFs} color="oklch(0.52 0.13 160)" />
          </div>
        </div>

        {/* Detail row */}
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[280px_320px_1fr]">
          {/* Documentos */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="text-sm font-medium text-foreground">Documentos</div>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">47</span>
            </div>
            <div className="flex gap-2 border-b border-border px-3 py-2 text-xs">
              <button className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 font-medium text-foreground">
                <ArrowDown className="h-3 w-3" /> Entradas <span className="text-muted-foreground">28</span>
              </button>
              <button className="flex items-center gap-1 rounded-md px-2 py-1 text-muted-foreground hover:bg-muted">
                <ArrowUp className="h-3 w-3" /> Saídas <span>19</span>
              </button>
            </div>
            <div className="flex gap-2 border-b border-border px-3 py-2">
              <select className="flex-1 rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground">
                <option>Produto: Todos</option>
              </select>
              <select className="flex-1 rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground">
                <option>UF: Todas</option>
              </select>
            </div>
            <ul className="max-h-[420px] overflow-auto">
              {entradas.map((d) => {
                const active = selectedDoc === d.id;
                return (
                  <li
                    key={d.id}
                    onClick={() => setSelectedDoc(d.id)}
                    className={`cursor-pointer border-b border-border px-4 py-3 text-xs transition-colors ${
                      active ? "bg-accent/60" : "hover:bg-muted/60"
                    }`}
                  >
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>NFe · <span className="text-foreground">{d.nfe}</span></span>
                      <span>{d.data}</span>
                    </div>
                    <div className="mt-1 font-medium text-foreground">{d.cliente}</div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-muted-foreground">{d.valor} · {d.rota}</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          d.status === "erros"
                            ? "bg-[oklch(0.95_0.05_25)] text-[oklch(0.5_0.2_25)]"
                            : "bg-[oklch(0.95_0.05_60)] text-[oklch(0.55_0.18_60)]"
                        }`}
                      >
                        <AlertTriangle className="h-3 w-3" />
                        {d.statusLabel}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Auditorias */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="text-sm font-medium text-foreground">
                Auditorias <span className="text-muted-foreground">· NFe 110507</span>
              </div>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">2</span>
            </div>
            <ul>
              {auditorias.map((a) => {
                const active = selectedAuditoria === a.id;
                return (
                  <li
                    key={a.id}
                    onClick={() => setSelectedAuditoria(a.id)}
                    className={`cursor-pointer border-b border-border px-4 py-3 text-xs transition-colors ${
                      active ? "bg-accent/60" : "hover:bg-muted/60"
                    }`}
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[oklch(0.55_0.2_25)]">
                      {a.titulo}
                    </div>
                    <div className="mt-1 font-medium text-foreground">{a.desc}</div>
                    {a.detalhe && (
                      <div className="mt-1 text-muted-foreground">
                        <span className="text-[oklch(0.55_0.2_25)]">{a.detalhe}</span>
                      </div>
                    )}
                    <div className="mt-1 text-muted-foreground">Asis · {a.asis}</div>
                    {a.progresso > 0 && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="relative h-1.5 flex-1 rounded-full bg-muted">
                          <div
                            className="absolute inset-y-0 left-0 rounded-full bg-[oklch(0.6_0.2_25)]"
                            style={{ width: `${a.progresso}%` }}
                          />
                        </div>
                        <span className="text-[10px] tabular-nums text-muted-foreground">{a.progresso}%</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Diagnóstico */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="text-sm font-medium text-foreground">
                Diagnóstico <span className="text-muted-foreground">· ICMS Alíquota</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                <ArrowDown className="h-3 w-3" /> Entrada
              </span>
            </div>

            <div className="space-y-4 p-4">
              <div className="rounded-lg border border-[oklch(0.85_0.1_85)] bg-[oklch(0.97_0.04_85)] p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.6_0.18_60)]" />
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      Documento de entrada — alteração bloqueada
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      Notifique o fornecedor para correção e reemissão.
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Diagnóstico Asis
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Regra</span>
                    <span className="text-foreground">RN 1549 · Alíquotas Interestaduais</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Alíquota aplicada</span>
                    <span>
                      <span className="text-[oklch(0.55_0.2_25)] line-through">4,00%</span>{" "}
                      <span className="text-muted-foreground">→</span>{" "}
                      <span className="font-medium text-primary">12,00%</span>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Impacto no crédito
                </div>
                <div className="space-y-2 rounded-lg border border-primary/20 bg-accent/40 p-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-foreground">Crédito escriturado (4%)</span>
                    <span className="tabular-nums text-[oklch(0.55_0.2_25)]">R$ 40,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Crédito correto (12%)</span>
                    <span className="tabular-nums text-foreground">R$ 120,00</span>
                  </div>
                  <div className="flex justify-between border-t border-primary/20 pt-2">
                    <span className="font-medium text-foreground">A recuperar</span>
                    <span className="tabular-nums font-semibold text-primary">R$ 80,00</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-3">
                <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                  <Send className="h-3.5 w-3.5" /> Notificar fornecedor
                </button>
                <span className="inline-flex items-center gap-1 text-xs text-[oklch(0.55_0.2_25)]">
                  <AlertTriangle className="h-3 w-3" /> 28 pendentes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
