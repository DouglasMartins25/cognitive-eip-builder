import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
  Plus,
  Mic,
  FileSpreadsheet,
  DollarSign,
  UserPlus,
  LineChart,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function SideIcon({
  icon: Icon,
  active = false,
  to,
}: {
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  to?: string;
}) {
  const cls = `flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
    active
      ? "bg-muted text-foreground"
      : "text-sidebar-foreground hover:bg-muted"
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

function QuickAction({
  icon: Icon,
  label,
  to,
  search,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  to?: string;
  search?: Record<string, string>;
}) {
  const cls =
    "inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-primary/30 bg-card px-4 py-2 text-sm text-primary transition-colors hover:bg-accent";
  const inner = (
    <>
      <Icon className="h-4 w-4" />
      {label}
    </>
  );
  if (to) {
    return (
      <Link to={to} search={search} className={cls}>
        {inner}
      </Link>
    );
  }
  return <button className={cls}>{inner}</button>;
}

function Home() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    const text = input.trim();
    if (!text) return;
    const lower = text.toLowerCase();
    const pagamentoTerms = [
      "realizar pagamento",
      "realizar o pagamento",
      "realizar pagamentos",
      "realizar os pagamentos",
      "efetuar pagamento",
      "efetuar os pagamentos",
      "pagar título",
      "pagar titulo",
      "pagar títulos",
      "pagar titulos",
      "fazer pagamento",
      "fazer os pagamentos",
    ];
    const tituloTerms = [
      "título",
      "titulo",
      "títulos",
      "titulos",
      "vencendo hoje",
      "vencimento hoje",
      "vencer hoje",
      "vencido",
      "vencidos",
      "pagamento de hoje",
      "pagamentos de hoje",
      "recebimento de hoje",
      "recebimentos de hoje",
      "pagar e receber",
      "receber e pagar",
    ];
    const creditoTerms = [
      "crédito",
      "credito",
      "créditos",
      "creditos",
      "ofertas de crédito",
      "ofertas de credito",
      "linhas de crédito",
      "linhas de credito",
      "empréstimo",
      "emprestimo",
      "antecipação",
      "antecipacao",
      "capital de giro",
    ];
    const comparacaoTerms = [
      "comparar",
      "comparação",
      "comparacao",
      "compare ",
      " vs ",
      " versus ",
      "comparativo",
      "ano contra ano",
      "yoy",
      "year over year",
      "período financeiro",
      "periodo financeiro",
      "últimos 2 meses",
      "ultimos 2 meses",
      "últimos dois meses",
      "ultimos dois meses",
      "últimos meses",
      "ultimos meses",
      "últimos 2 anos",
      "ultimos 2 anos",
      "últimos dois anos",
      "ultimos dois anos",
      "últimos anos",
      "ultimos anos",
      "últimos trimestres",
      "ultimos trimestres",
      "últimos semestres",
      "ultimos semestres",
      "mês passado",
      "mes passado",
      "ano passado",
      "compara ",
      "compra os últimos",
      "compra os ultimos",
    ];
    const analiseTerms = [
      "análise financeira",
      "analise financeira",
      "análise receita",
      "analise receita",
      "receita",
      "despesa",
      "financeir",
    ];
    const vencidosReceberTerms = [
      "títulos vencidos",
      "titulos vencidos",
      "título vencido",
      "titulo vencido",
      "recebimento vencido",
      "recebimentos vencidos",
      "recebimento em atraso",
      "recebimentos em atraso",
      "receber em atraso",
      "a receber em atraso",
      "ainda não foram pagos",
      "ainda nao foram pagos",
      "não pagaram",
      "nao pagaram",
      "não pagos pelos meus clientes",
      "nao pagos pelos meus clientes",
      "inadimplên",
      "inadimplen",
      "inadimplência",
      "inadimplencia",
      "clientes em atraso",
      "cobrança",
      "cobranca",
      "em atraso",
      "estão em atraso",
      "estao em atraso",
      "atrasado",
      "atrasados",
      "títulos atrasados",
      "titulos atrasados",
      "títulos a receber",
      "titulos a receber",
      "title a receber",
    ];
    const boletosTerms = [
      "emitir novos boletos",
      "emitir boletos",
      "novos boletos",
      "gerar boletos",
      "gerar novos boletos",
      "emitir boleto",
      "novo boleto",
      "boletos de cobrança",
      "boletos de cobranca",
      "realizar cobrança",
      "realizar cobranca",
      "fazer cobrança",
      "fazer cobranca",
      "iniciar cobrança",
      "iniciar cobranca",
      "ativar régua de cobrança",
      "ativar regua de cobranca",
      "régua de cobrança",
      "regua de cobranca",
      "disparar cobrança",
      "disparar cobranca",
      "cobrar clientes",
      "cobrar os clientes",
    ];
    const riscoTerms = [
      "saúde da minha carteira",
      "saude da minha carteira",
      "saúde da carteira",
      "saude da carteira",
      "saúde carteira",
      "saude carteira",
      "score do meu cliente",
      "score dos meus clientes",
      "score do meus clientes",
      "score dos clientes",
      "score do cliente",
      "score de cliente",
      "análise de risco",
      "analise de risco",
      "análise dos risco",
      "analise dos risco",
      "risco do cliente",
      "risco dos clientes",
      "risco dos meus clientes",
      "risco do meus clientes",
      "risco da carteira",
      "risco de crédito",
      "risco de credito",
      "perfil de risco",
      "exposição da carteira",
      "exposicao da carteira",
      "carteira de clientes",
    ];
    let start:
      | "analise"
      | "vencendo"
      | "pagamento"
      | "credito"
      | "comparacao"
      | "vencidos"
      | "boletos"
      | "risco"
      | undefined;
    if (riscoTerms.some((t) => lower.includes(t))) start = "risco";
    else if (boletosTerms.some((t) => lower.includes(t))) start = "boletos";
    else if (vencidosReceberTerms.some((t) => lower.includes(t))) start = "vencidos";
    else if (comparacaoTerms.some((t) => lower.includes(t))) start = "comparacao";
    else if (creditoTerms.some((t) => lower.includes(t))) start = "credito";
    else if (pagamentoTerms.some((t) => lower.includes(t))) start = "pagamento";
    else if (tituloTerms.some((t) => lower.includes(t))) start = "vencendo";
    else if (analiseTerms.some((t) => lower.includes(t))) start = "analise";
    if (start) {
      const searchParams: { start: string; variant?: string } = { start };
      if (start === "comparacao") {
        const mesesTerms = [
          "últimos 2 meses",
          "ultimos 2 meses",
          "últimos dois meses",
          "ultimos dois meses",
          "últimos meses",
          "ultimos meses",
          "mês passado",
          "mes passado",
          "fevereiro",
          "março",
          "marco",
        ];
        searchParams.variant = mesesTerms.some((t) => lower.includes(t)) ? "meses" : "anos";
      }
      navigate({ to: "/financeiro", search: searchParams });
    }
    setInput("");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left sidebar */}
      <aside className="flex w-16 flex-col items-center justify-between border-r border-border bg-sidebar py-5">
        <div className="flex flex-col items-center gap-5">
          <Link to="/" className="text-primary">
            <svg
              viewBox="0 0 32 32"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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

      {/* Main */}
      <main className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="16" cy="16" r="11" />
              <circle cx="12" cy="14" r="1.2" fill="currentColor" />
              <circle cx="20" cy="14" r="1.2" fill="currentColor" />
              <path d="M11 19c1.5 1.5 3.2 2.2 5 2.2s3.5-.7 5-2.2" />
            </svg>
          </div>

          <h1 className="mt-5 text-3xl font-semibold text-primary">
            Olá, João Silva!
          </h1>
          <p className="mt-1 text-2xl font-light text-foreground">
            O que vamos fazer hoje?
          </p>

          <div className="mt-8 inline-flex flex-col">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-muted/40 px-4 py-3.5"
            >
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-background hover:text-foreground"
              >
                <Plus className="h-4 w-4" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Descreva o que precisa"
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                aria-label="Enviar"
                className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-background hover:text-foreground"
              >
                <Mic className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-4 flex flex-nowrap items-center justify-between gap-3">
              <QuickAction icon={LineChart} label="Análise financeira" to="/financeiro" search={{ start: "analise" }} />
              <QuickAction icon={FileSpreadsheet} label="Criar pedido de venda" />
              <QuickAction icon={DollarSign} label="Consultar preços" />
              <QuickAction icon={UserPlus} label="Cadastrar cliente" />
            </div>
          </div>
        </div>

        <p className="pb-5 text-center text-[11px] text-muted-foreground">
          A BIA é uma IA e pode cometer erros. Verifique informações importantes
        </p>
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
