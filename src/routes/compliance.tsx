import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Scale,
  FileCheck2,
  AlertTriangle,
  CalendarClock,
  TrendingUp,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock,
  Bell,
  Inbox,
  Crop,
  Tag,
  RefreshCw,
  Briefcase,
  Contact,
  Maximize2,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/compliance")({
  component: CompliancePage,
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

type ChatMessage = { id: number; from: "user" | "agent"; text: string };

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint: string;
  tone?: "default" | "warning" | "success";
}) {
  const toneCls =
    tone === "warning"
      ? "text-amber-600"
      : tone === "success"
      ? "text-emerald-600"
      : "text-primary";
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <Icon className={`h-4 w-4 ${toneCls}`} />
      </div>
      <div className="mt-3 text-2xl font-semibold text-foreground">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
    </div>
  );
}

function CompliancePage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, from: "user", text: "Como está o compliance fiscal e a Reforma Tributária?" },
    {
      id: 2,
      from: "agent",
      text:
        "Índice de conformidade em 96%. Há 12 obrigações nos próximos 30 dias e 7 alertas preventivos. O radar da Reforma Tributária aponta R$ 2,4M de impacto anual estimado em CBS/IBS — veja o detalhamento ao lado.",
    },
  ]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text }]);
    setInput("");
  };

  const obrigacoes = [
    { nome: "SPED Fiscal (EFD ICMS/IPI)", categoria: "Fiscal", prazo: "25/05/2026", status: "Em dia", tone: "success" as const },
    { nome: "EFD Contribuições (PIS/COFINS)", categoria: "Fiscal", prazo: "28/05/2026", status: "Em dia", tone: "success" as const },
    { nome: "DCTFWeb", categoria: "Trabalhista", prazo: "15/06/2026", status: "Pendente", tone: "warning" as const },
    { nome: "ECF — Escrituração Contábil Fiscal", categoria: "Contábil", prazo: "31/07/2026", status: "Em preparação", tone: "default" as const },
    { nome: "DIRBI — Benefícios Fiscais", categoria: "Fiscal", prazo: "20/06/2026", status: "Atenção", tone: "warning" as const },
  ];

  const reforma = [
    { titulo: "CBS — Contribuição sobre Bens e Serviços", descricao: "Substitui PIS/COFINS. Período de transição inicia em 2026 com alíquota teste de 0,9%.", impacto: "Alto" },
    { titulo: "IBS — Imposto sobre Bens e Serviços", descricao: "Substitui ICMS e ISS. Implementação gradual de 2026 a 2033, com partilha entre estados e municípios.", impacto: "Alto" },
    { titulo: "Imposto Seletivo", descricao: "Incide sobre produtos prejudiciais à saúde e ao meio ambiente. Regulamentação em andamento.", impacto: "Médio" },
    { titulo: "Split Payment", descricao: "Recolhimento automático do tributo no momento da liquidação financeira da operação.", impacto: "Operacional" },
  ];

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
      <section className="flex w-[340px] flex-col bg-card">
        <header className="flex items-center justify-between px-6 py-5">
          <h1 className="text-base font-medium text-foreground">Compliance</h1>
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
              placeholder="Pergunte ao compliance..."
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
      <main className="ml-4 flex-1 overflow-y-auto">
        <header className="border-b border-border bg-card">
          <div className="flex items-center justify-between px-6 py-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Link>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
              <Sparkles className="h-3 w-3" /> Compliance Digital Workers
            </span>
          </div>
        </header>

        <div className="px-6 py-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">
                Compliance fiscal, contábil e Reforma Tributária
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Acompanhe obrigações em tempo real, antecipe riscos e prepare a
                operação para a nova arquitetura tributária brasileira (CBS, IBS
                e Imposto Seletivo).
              </p>
            </div>
            <button className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              <Bell className="h-4 w-4" /> Configurar alertas
            </button>
          </div>

          {/* Stats */}
          <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={ShieldCheck} label="Índice de conformidade" value="96%" hint="+4 p.p. vs. mês anterior" tone="success" />
            <StatCard icon={CalendarClock} label="Obrigações nos próximos 30 dias" value="12" hint="3 com risco de atraso" tone="warning" />
            <StatCard icon={AlertTriangle} label="Alertas preventivos" value="7" hint="2 críticos · 5 informativos" tone="warning" />
            <StatCard icon={TrendingUp} label="Impacto Reforma Tributária" value="R$ 2,4M" hint="Estimativa anual em CBS/IBS" />
          </section>

          {/* Obrigações */}
          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Obrigações fiscais, financeiras e contábeis
                </h2>
                <p className="text-sm text-muted-foreground">
                  Calendário monitorado de forma autônoma pelo Digital Worker.
                </p>
              </div>
              <button className="text-sm text-primary hover:underline">
                Ver calendário completo
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 text-left font-medium">Obrigação</th>
                    <th className="px-5 py-3 text-left font-medium">Categoria</th>
                    <th className="px-5 py-3 text-left font-medium">Prazo</th>
                    <th className="px-5 py-3 text-left font-medium">Status</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {obrigacoes.map((o) => (
                    <tr key={o.nome} className="border-t border-border">
                      <td className="px-5 py-4 font-medium text-foreground">{o.nome}</td>
                      <td className="px-5 py-4 text-muted-foreground">{o.categoria}</td>
                      <td className="px-5 py-4 text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" /> {o.prazo}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            o.tone === "success"
                              ? "bg-emerald-100 text-emerald-700"
                              : o.tone === "warning"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          {o.tone === "success" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <AlertTriangle className="h-3 w-3" />
                          )}
                          {o.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button className="text-xs font-medium text-primary hover:underline">
                          Revisar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Reforma Tributária */}
          <section className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                Reforma Tributária — radar de impacto
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {reforma.map((r) => (
                <div key={r.titulo} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{r.titulo}</h3>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      Impacto {r.impacto}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{r.descricao}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <button className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
                      Simular impacto
                    </button>
                    <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-primary hover:bg-accent">
                      Ver checklist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ações sugeridas */}
          <section className="mt-10 mb-10 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-accent/30 p-6">
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                Ações sugeridas pelo Digital Worker
              </h2>
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-foreground">
                  Revisar parametrização de PIS/COFINS para 32 produtos antes do fechamento de maio.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <span className="text-foreground">
                  Atualizar cadastro de CST para alinhamento com a nova matriz CBS/IBS — 18 itens pendentes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Scale className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-foreground">
                  Simular split payment em 3 operações piloto para validar fluxo financeiro e contábil.
                </span>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                Executar ações
              </button>
              <button className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">
                Exportar relatório
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
