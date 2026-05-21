import { createFileRoute, Link } from "@tanstack/react-router";
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
} from "lucide-react";

export const Route = createFileRoute("/compliance")({
  component: CompliancePage,
});

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
  const obrigacoes = [
    {
      nome: "SPED Fiscal (EFD ICMS/IPI)",
      categoria: "Fiscal",
      prazo: "25/05/2026",
      status: "Em dia",
      tone: "success" as const,
    },
    {
      nome: "EFD Contribuições (PIS/COFINS)",
      categoria: "Fiscal",
      prazo: "28/05/2026",
      status: "Em dia",
      tone: "success" as const,
    },
    {
      nome: "DCTFWeb",
      categoria: "Trabalhista",
      prazo: "15/06/2026",
      status: "Pendente",
      tone: "warning" as const,
    },
    {
      nome: "ECF — Escrituração Contábil Fiscal",
      categoria: "Contábil",
      prazo: "31/07/2026",
      status: "Em preparação",
      tone: "default" as const,
    },
    {
      nome: "DIRBI — Benefícios Fiscais",
      categoria: "Fiscal",
      prazo: "20/06/2026",
      status: "Atenção",
      tone: "warning" as const,
    },
  ];

  const reforma = [
    {
      titulo: "CBS — Contribuição sobre Bens e Serviços",
      descricao:
        "Substitui PIS/COFINS. Período de transição inicia em 2026 com alíquota teste de 0,9%.",
      impacto: "Alto",
    },
    {
      titulo: "IBS — Imposto sobre Bens e Serviços",
      descricao:
        "Substitui ICMS e ISS. Implementação gradual de 2026 a 2033, com partilha entre estados e municípios.",
      impacto: "Alto",
    },
    {
      titulo: "Imposto Seletivo",
      descricao:
        "Incide sobre produtos prejudiciais à saúde e ao meio ambiente. Regulamentação em andamento.",
      impacto: "Médio",
    },
    {
      titulo: "Split Payment",
      descricao:
        "Recolhimento automático do tributo no momento da liquidação financeira da operação.",
      impacto: "Operacional",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
              <Sparkles className="h-3 w-3" /> Compliance Digital Workers
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
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
        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard
            icon={ShieldCheck}
            label="Índice de conformidade"
            value="96%"
            hint="+4 p.p. vs. mês anterior"
            tone="success"
          />
          <StatCard
            icon={CalendarClock}
            label="Obrigações nos próximos 30 dias"
            value="12"
            hint="3 com risco de atraso"
            tone="warning"
          />
          <StatCard
            icon={AlertTriangle}
            label="Alertas preventivos"
            value="7"
            hint="2 críticos · 5 informativos"
            tone="warning"
          />
          <StatCard
            icon={TrendingUp}
            label="Impacto Reforma Tributária"
            value="R$ 2,4M"
            hint="Estimativa anual em CBS/IBS"
          />
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
                    <td className="px-5 py-4 font-medium text-foreground">
                      {o.nome}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {o.categoria}
                    </td>
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
              <div
                key={r.titulo}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {r.titulo}
                    </h3>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    Impacto {r.impacto}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {r.descricao}
                </p>
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
        <section className="mt-10 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-accent/30 p-6">
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
                Revisar parametrização de PIS/COFINS para 32 produtos antes do
                fechamento de maio.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <span className="text-foreground">
                Atualizar cadastro de CST para alinhamento com a nova matriz
                CBS/IBS — 18 itens pendentes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-foreground">
                Simular split payment em 3 operações piloto para validar fluxo
                financeiro e contábil.
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
      </main>
    </div>
  );
}
