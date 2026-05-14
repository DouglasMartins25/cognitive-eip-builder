import { createFileRoute } from "@tanstack/react-router";
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
} from "lucide-react";

export const Route = createFileRoute("/")({
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
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Analisar pagamentos e recebimentos", from: "user" },
    { id: 2, text: "Últimos 7 meses", from: "user" },
  ]);
  const [input, setInput] = useState("");
  const [view, setView] = useState<"chart" | "vencendo">("chart");

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: Date.now(), text, from: "user" }]);
    setInput("");
    if (text.toLowerCase().includes("vencendo hoje") || text.toLowerCase().includes("vencimento hoje")) {
      setView("vencendo");
    }
  };

  const totalReceber = "R$ 24.350,00";
  const totalPagar = "R$ 10.640,00";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left sidebar */}
      <aside className="flex w-16 flex-col items-center justify-between border-r border-border bg-sidebar py-5">
        <div className="flex flex-col items-center gap-5">
          <div className="text-primary">
            <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 22c4-8 12-8 16 0" />
              <path d="M6 10c4 8 12 8 16 0" />
            </svg>
          </div>
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
          {messages.map((m, idx) => (
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
              {idx === 0 && (
                <div className="space-y-3 pt-4 text-sm text-foreground">
                  <p>Olá! Posso te ajudar com isso.</p>
                  <p>Qual período você quer analisar?</p>
                  <div className="flex flex-col items-start gap-2 pt-1">
                    <button className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2 text-sm text-primary transition-colors hover:bg-accent">
                      <BarChart3 className="h-4 w-4" />
                      Últimos 7 meses
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2 text-sm text-primary transition-colors hover:bg-accent">
                      <Plus className="h-4 w-4" />
                      Outro período
                    </button>
                  </div>
                </div>
              )}
              {idx === 1 && (
                <p className="pt-4 text-sm text-foreground">
                  Perfeito. Aqui está o comparativo entre receitas e despesas no período.
                </p>
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
      <main className="flex-1 p-6">
        <div className="flex h-[640px] flex-col rounded-2xl border border-border bg-card shadow-sm">
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
                    defaultValue="Últimos 7 meses"
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
                  <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                      Receita
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.15_25)]" />
                      Despesa
                    </div>
                  </div>
                  <div className="flex h-[180px] items-end gap-3 border-b border-border">
                    {chartData.map((d) => (
                      <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                        <div className="flex h-full w-full items-end justify-center gap-1">
                          <div
                            className="w-1/2 rounded-t-md bg-primary"
                            style={{ height: `${(d.receita / max) * 100}%` }}
                          />
                          <div
                            className="w-1/2 rounded-t-md bg-[oklch(0.7_0.15_25)]"
                            style={{ height: `${(d.despesa / max) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-3">
                    {chartData.map((d) => (
                      <div key={d.month} className="flex-1 text-center text-[11px] text-muted-foreground">
                        {d.month}
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
