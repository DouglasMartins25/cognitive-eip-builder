import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { BookOpen, Calculator, FileSpreadsheet, Sparkles } from "lucide-react";

export const Route = createFileRoute("/contabil-transicao")({
  component: ContabilTransicao,
});

function ContabilTransicao() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate({ to: "/contabil" });
    }, 4000);
    return () => clearTimeout(t);
  }, [navigate]);

  const steps = [
    { icon: BookOpen, label: "Carregando plano de contas e lançamentos", delay: "0ms" },
    { icon: Calculator, label: "Conciliando razão e auxiliares", delay: "600ms" },
    { icon: FileSpreadsheet, label: "Gerando balancete e DRE preliminares", delay: "1200ms" },
  ];

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, oklch(0.95 0.06 200 / 0.55) 0%, oklch(0.99 0 0 / 0) 70%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center px-8 text-center">
        <div className="relative mb-8 flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <span className="absolute inset-2 animate-pulse rounded-full bg-primary/30" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <Sparkles className="h-6 w-6" />
          </div>
        </div>

        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
          Contábil Digital Workers
        </div>
        <h1 className="text-2xl font-semibold text-foreground">
          Preparando seu painel contábil e de fechamento mensal
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Estamos consolidando lançamentos contábeis, conciliações e
          encerramentos para apresentar balancete, DRE e razão atualizados.
        </p>

        <div className="mt-8 h-1 w-full max-w-sm overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary"
            style={{
              animation: "contabil-transicao-progress 4s linear forwards",
              width: "0%",
            }}
          />
        </div>

        <ul className="mt-8 w-full max-w-sm space-y-3 text-left">
          {steps.map((s) => (
            <li
              key={s.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 opacity-0"
              style={{
                animation: `contabil-transicao-step 0.5s ease-out ${s.delay} forwards`,
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-primary">
                <s.icon className="h-4 w-4" />
              </div>
              <span className="text-sm text-foreground">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @keyframes contabil-transicao-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes contabil-transicao-step {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
