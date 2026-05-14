import { createFileRoute } from "@tanstack/react-router";
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
  Users,
  Search,
  Plus,
  ArrowRight,
  ArrowLeft,
  Loader2,
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

function Index() {
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
          <h1 className="text-base font-medium text-foreground">Gerente de vendas</h1>
          <button className="text-muted-foreground hover:text-foreground">
            <Maximize2 className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 space-y-4 px-6 pb-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-bubble px-5 py-2.5 text-sm text-bubble-foreground">
              Criar pedido de venda
            </div>
          </div>

          <div className="space-y-3 pt-2 text-sm text-foreground">
            <p>Vamos começar.</p>
            <p>Quem é o cliente deste pedido?</p>
            <div className="flex flex-col items-start gap-2 pt-1">
              <button className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2 text-sm text-primary transition-colors hover:bg-accent">
                <Users className="h-4 w-4" />
                Cliente já cadastrado
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2 text-sm text-primary transition-colors hover:bg-accent">
                <Plus className="h-4 w-4" />
                Novo cliente
              </button>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <div className="rounded-full bg-bubble px-5 py-2.5 text-sm text-bubble-foreground">
              Cliente já cadastrado
            </div>
          </div>

          <p className="text-sm text-foreground">
            Me diga o nome, CPF ou CNPJ. Eu busco para você.
          </p>
        </div>

        <div className="space-y-2 px-6 pb-5">
          <div className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Plus className="h-4 w-4" />
              Pedidos realizados hoje
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90">
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
        <div className="flex h-[560px] flex-col rounded-2xl border border-border bg-card shadow-sm">
          <header className="flex items-start gap-4 border-b border-border px-8 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-medium text-foreground">Buscar cliente</h2>
              <p className="text-sm text-muted-foreground">
                Use nome, CPF ou CNPJ para encontrar um cliente cadastrado
              </p>
            </div>
          </header>

          <div className="flex-1 px-8 py-6">
            <div className="relative">
              <input
                type="text"
                defaultValue="Estrela"
                className="w-full rounded-full border border-border bg-card px-5 py-3 pr-12 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full text-primary hover:bg-accent">
                <Search className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Buscando cliente...</p>
            </div>
          </div>

          <footer className="flex justify-end border-t border-border px-8 py-4">
            <button className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-5 py-2 text-sm text-primary transition-colors hover:bg-accent">
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
