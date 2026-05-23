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
  Bot,
  CheckCircle2,
  Users,
} from "lucide-react";
import { resolveChatRoute } from "@/lib/chat-routing";

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
    const route = resolveChatRoute(text);
    if (route) {
      if (route.start === "icms") {
        navigate({ to: "/icms-transicao" });
      } else {
        const searchParams: { start: string; variant?: string } = { start: route.start };
        if (route.variant) searchParams.variant = route.variant;
        navigate({ to: "/financeiro", search: searchParams });
      }
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

            <div className="mt-8 flex items-center gap-2 text-sidebar-foreground">
              <Users className="h-4 w-4" />
              <span className="text-xs font-semibold tracking-wider">TEAM WORKERS</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Aqui estão suas equipes de Digital Workers
            </p>

            <Link
              to="/finance-transicao"
              className="group mt-3 flex items-center gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-accent/30 p-4 transition-all hover:border-primary/60 hover:shadow-lg"
            >
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Bot className="h-6 w-6" />
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-primary ring-2 ring-card" />
                </span>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">Finance</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    <CheckCircle2 className="h-2.5 w-2.5" /> 2 agentes ativos
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Automações e Análise financeiras - execução 24/7
                </p>
              </div>
              <Sparkles className="h-4 w-4 text-primary opacity-60 transition-opacity group-hover:opacity-100" />
            </Link>


            <Link
              to="/compliance-transicao"
              className="group mt-3 flex items-center gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-accent/30 p-4 transition-all hover:border-primary/60 hover:shadow-lg"
            >
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Bot className="h-6 w-6" />
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-primary ring-2 ring-card" />
                </span>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">Compliance</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    <CheckCircle2 className="h-2.5 w-2.5" /> 2 agentes ativos
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Adequações das obrigações fiscais, financeiras, contábeis e Reforma tributária. · conformidade contínua e alertas preventivos
                </p>
              </div>
              <Sparkles className="h-4 w-4 text-primary opacity-60 transition-opacity group-hover:opacity-100" />
            </Link>
          </div>
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
