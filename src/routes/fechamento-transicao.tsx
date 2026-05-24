import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Activity, Brain, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/fechamento-transicao")({
  component: FechamentoTransicao,
});

function FechamentoTransicao() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate({ to: "/fechamento" });
    }, 4000);
    return () => clearTimeout(t);
  }, [navigate]);

  const steps = [
    { icon: Activity, label: "Consolidando KPIs executivos em tempo real", delay: "0ms" },
    { icon: Brain, label: "Acionando agentes Fiscal, Financeiro, Contábil e Compliance", delay: "600ms" },
    { icon: ShieldCheck, label: "Priorizando riscos, decisões e oportunidades", delay: "1200ms" },
  ];

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-[oklch(0.18_0.03_260)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, oklch(0.55 0.18 200 / 0.35) 0%, oklch(0.18 0.03 260 / 0) 70%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center px-8 text-center">
        <div className="relative mb-8 flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-[oklch(0.7_0.18_200)]/30" />
          <span className="absolute inset-2 animate-pulse rounded-full bg-[oklch(0.7_0.18_200)]/40" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.7_0.18_200)] text-[oklch(0.18_0.03_260)] shadow-lg">
            <Sparkles className="h-6 w-6" />
          </div>
        </div>

        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.8_0.15_200)]">
          Painel Executivo Contábil
        </div>
        <h1 className="text-2xl font-semibold">
          Preparando seu Cockpit Executivo de Saúde do Fechamento
        </h1>
        <p className="mt-2 max-w-md text-sm text-white/60">
          Estamos orquestrando os agentes autônomos, consolidando KPIs estratégicos
          e priorizando decisões críticas para a sua diretoria financeira.
        </p>

        <div className="mt-8 h-1 w-full max-w-sm overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[oklch(0.7_0.18_200)]"
            style={{
              animation: "fechamento-transicao-progress 4s linear forwards",
              width: "0%",
            }}
          />
        </div>

        <ul className="mt-8 w-full max-w-sm space-y-3 text-left">
          {steps.map((s) => (
            <li
              key={s.label}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 opacity-0 backdrop-blur"
              style={{
                animation: `fechamento-transicao-step 0.5s ease-out ${s.delay} forwards`,
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[oklch(0.7_0.18_200)]/20 text-[oklch(0.8_0.15_200)]">
                <s.icon className="h-4 w-4" />
              </div>
              <span className="text-sm text-white/90">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @keyframes fechamento-transicao-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes fechamento-transicao-step {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
