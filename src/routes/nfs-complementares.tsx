import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Bot,
  Download,
  Filter,
} from "lucide-react";

export const Route = createFileRoute("/nfs-complementares")({
  component: NFsComplementaresPage,
});

type Status = "pendente" | "autorizada" | "recusada";

type NFItem = {
  id: string;
  numero: string;
  cliente: string;
  cnpj: string;
  nfOrigem: string;
  emissao: string;
  uf: string;
  baseOriginal: number;
  baseCorrigida: number;
  icmsOriginal: number;
  icmsCorrigido: number;
  diferenca: number;
  motivo: string;
  cfop: string;
  agente: string;
};

const dataset: NFItem[] = [
  {
    id: "1",
    numero: "000.124.881",
    cliente: "Indústria Metalsul Ltda.",
    cnpj: "12.345.678/0001-90",
    nfOrigem: "000.118.402",
    emissao: "12/05/2026",
    uf: "RS",
    baseOriginal: 184250.0,
    baseCorrigida: 198410.0,
    icmsOriginal: 33165.0,
    icmsCorrigido: 35713.8,
    diferenca: 2548.8,
    motivo: "Base de cálculo divergente — frete não incluído",
    cfop: "5102",
    agente: "C2",
  },
  {
    id: "2",
    numero: "000.124.882",
    cliente: "Atacado Norte Distribuidora S/A",
    cnpj: "23.456.789/0001-12",
    nfOrigem: "000.118.517",
    emissao: "12/05/2026",
    uf: "PR",
    baseOriginal: 92100.0,
    baseCorrigida: 96705.0,
    icmsOriginal: 11052.0,
    icmsCorrigido: 11604.6,
    diferenca: 552.6,
    motivo: "Alíquota interestadual aplicada incorretamente (10% → 12%)",
    cfop: "6102",
    agente: "C2",
  },
  {
    id: "3",
    numero: "000.124.883",
    cliente: "Comercial Vale do Aço Ltda.",
    cnpj: "34.567.890/0001-34",
    nfOrigem: "000.118.624",
    emissao: "13/05/2026",
    uf: "MG",
    baseOriginal: 47820.0,
    baseCorrigida: 51260.0,
    icmsOriginal: 8607.6,
    icmsCorrigido: 9226.8,
    diferenca: 619.2,
    motivo: "Desconto condicional somado indevidamente à base",
    cfop: "6102",
    agente: "C2",
  },
  {
    id: "4",
    numero: "000.124.884",
    cliente: "Logística Sudeste Express ME",
    cnpj: "45.678.901/0001-56",
    nfOrigem: "000.118.701",
    emissao: "13/05/2026",
    uf: "SP",
    baseOriginal: 28940.0,
    baseCorrigida: 30410.0,
    icmsOriginal: 5209.2,
    icmsCorrigido: 5473.8,
    diferenca: 264.6,
    motivo: "ICMS-ST destacado em operação sem substituição",
    cfop: "5405",
    agente: "C2",
  },
  {
    id: "5",
    numero: "000.124.885",
    cliente: "Construtora Horizonte SA",
    cnpj: "56.789.012/0001-78",
    nfOrigem: "000.118.812",
    emissao: "14/05/2026",
    uf: "BA",
    baseOriginal: 312480.0,
    baseCorrigida: 328104.0,
    icmsOriginal: 56246.4,
    icmsCorrigido: 59058.7,
    diferenca: 2812.3,
    motivo: "Diferença entre base CIF/FOB documentada",
    cfop: "6102",
    agente: "C2",
  },
  {
    id: "6",
    numero: "000.124.886",
    cliente: "Tech Solutions Importadora Ltda.",
    cnpj: "67.890.123/0001-90",
    nfOrigem: "000.118.890",
    emissao: "14/05/2026",
    uf: "SC",
    baseOriginal: 71250.0,
    baseCorrigida: 75812.0,
    icmsOriginal: 12825.0,
    icmsCorrigido: 13646.2,
    diferenca: 821.2,
    motivo: "Reclassificação NCM impacta base de cálculo",
    cfop: "6102",
    agente: "C2",
  },
];

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function NFsComplementaresPage() {
  const [items, setItems] = useState<(NFItem & { status: Status })[]>(
    dataset.map((d) => ({ ...d, status: "pendente" as Status })),
  );
  const [filter, setFilter] = useState<Status | "todas">("pendente");
  const [selected, setSelected] = useState<string | null>(items[0]?.id ?? null);

  const visible = items.filter((i) => filter === "todas" || i.status === filter);
  const current = items.find((i) => i.id === selected) ?? visible[0];

  const update = (id: string, status: Status) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));

  const counts = {
    pendente: items.filter((i) => i.status === "pendente").length,
    autorizada: items.filter((i) => i.status === "autorizada").length,
    recusada: items.filter((i) => i.status === "recusada").length,
  };

  const totalDiferenca = items
    .filter((i) => i.status === "pendente")
    .reduce((s, i) => s + i.diferenca, 0);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/compliance"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar ao Compliance
            </Link>
            <span className="h-5 w-px bg-border" />
            <div>
              <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                AUDITORIA FISCAL · ICMS
              </p>
              <h1 className="text-base font-semibold text-foreground">
                NFs complementares pré-emitidas
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground">
              <Bot className="h-3.5 w-3.5 text-primary" />
              <span className="font-semibold">C2</span> Auditor Tributário
            </span>
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground hover:bg-muted">
              <Download className="h-3.5 w-3.5" /> Exportar lote
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-6 py-6">
        {/* Summary */}
        <div className="rounded-2xl bg-[oklch(0.2_0.04_240)] p-6 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-widest text-white/60">
                DIAGNÓSTICO DA AUDITORIA
              </p>
              <h2 className="mt-2 text-2xl font-semibold leading-tight">
                Divergência de ICMS encontrada em{" "}
                <span className="text-[oklch(0.78_0.18_150)]">
                  {items.length} notas fiscais
                </span>{" "}
                de saída.
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                O agente C2 cruzou a escrituração com os XMLs autorizados e pré-emitiu
                as NFs complementares necessárias. Revise cada documento e
                autorize ou recuse a emissão.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">
                <p className="text-[10px] uppercase tracking-widest text-white/60">
                  Pendentes
                </p>
                <p className="mt-1 text-2xl font-semibold">{counts.pendente}</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">
                <p className="text-[10px] uppercase tracking-widest text-white/60">
                  Autorizadas
                </p>
                <p className="mt-1 text-2xl font-semibold text-[oklch(0.78_0.18_150)]">
                  {counts.autorizada}
                </p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">
                <p className="text-[10px] uppercase tracking-widest text-white/60">
                  Recusadas
                </p>
                <p className="mt-1 text-2xl font-semibold text-[oklch(0.75_0.18_25)]">
                  {counts.recusada}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4 text-xs text-white/70">
            <span className="inline-flex items-center gap-2">
              <AlertCircle className="h-3.5 w-3.5 text-[oklch(0.78_0.18_60)]" />
              Diferença total a regularizar:{" "}
              <span className="font-semibold text-white">
                {brl(totalDiferenca)}
              </span>
            </span>
            <span className="text-white/30">·</span>
            <span>Competência 05/2026</span>
            <span className="text-white/30">·</span>
            <span>Prazo SEFAZ: 30 dias da emissão original</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 text-xs">
            {(
              [
                ["pendente", "Pendentes"],
                ["autorizada", "Autorizadas"],
                ["recusada", "Recusadas"],
                ["todas", "Todas"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
                  filter === k
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Filter className="h-3.5 w-3.5" />
            Ordenado por maior diferença de ICMS
          </div>
        </div>

        {/* Two-pane: list + detail */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-3">
            {visible.length === 0 && (
              <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
                Nenhum documento neste filtro.
              </div>
            )}
            {visible.map((nf) => {
              const isSel = current?.id === nf.id;
              const statusStyles =
                nf.status === "autorizada"
                  ? "bg-[oklch(0.95_0.05_150)] text-[oklch(0.4_0.14_150)] border-[oklch(0.7_0.14_150)]/40"
                  : nf.status === "recusada"
                  ? "bg-[oklch(0.95_0.04_25)] text-[oklch(0.45_0.18_25)] border-[oklch(0.7_0.15_25)]/40"
                  : "bg-[oklch(0.96_0.05_85)] text-[oklch(0.45_0.14_60)] border-[oklch(0.7_0.14_70)]/40";
              return (
                <button
                  key={nf.id}
                  onClick={() => setSelected(nf.id)}
                  className={`w-full rounded-xl border bg-card p-4 text-left transition-colors ${
                    isSel
                      ? "border-foreground/40 ring-1 ring-foreground/20"
                      : "border-border hover:border-foreground/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          NF-e {nf.numero}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {nf.cliente} · {nf.uf}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusStyles}`}
                    >
                      {nf.status}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">NF origem</p>
                      <p className="font-medium text-foreground">
                        {nf.nfOrigem}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">CFOP</p>
                      <p className="font-medium text-foreground">{nf.cfop}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Diferença ICMS</p>
                      <p className="font-semibold text-foreground">
                        {brl(nf.diferenca)}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          {current && (
            <aside className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                    NF-E COMPLEMENTAR PRÉ-EMITIDA
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">
                    {current.numero}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Emissão prevista {current.emissao} · CFOP {current.cfop}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  <Bot className="h-3 w-3" /> {current.agente}
                </span>
              </div>

              <div className="mt-4 rounded-xl border border-border bg-background p-3 text-xs">
                <p className="text-muted-foreground">Destinatário</p>
                <p className="mt-0.5 font-medium text-foreground">
                  {current.cliente}
                </p>
                <p className="text-muted-foreground">
                  CNPJ {current.cnpj} · UF {current.uf}
                </p>
                <p className="mt-2 text-muted-foreground">NF de origem</p>
                <p className="font-medium text-foreground">{current.nfOrigem}</p>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border border-border">
                <table className="w-full text-xs">
                  <thead className="bg-muted/40 text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">Campo</th>
                      <th className="px-3 py-2 text-right font-medium">
                        Original
                      </th>
                      <th className="px-3 py-2 text-right font-medium">
                        Corrigido
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    <tr>
                      <td className="px-3 py-2 text-foreground">
                        Base de cálculo
                      </td>
                      <td className="px-3 py-2 text-right text-muted-foreground">
                        {brl(current.baseOriginal)}
                      </td>
                      <td className="px-3 py-2 text-right font-medium text-foreground">
                        {brl(current.baseCorrigida)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-foreground">ICMS</td>
                      <td className="px-3 py-2 text-right text-muted-foreground">
                        {brl(current.icmsOriginal)}
                      </td>
                      <td className="px-3 py-2 text-right font-medium text-foreground">
                        {brl(current.icmsCorrigido)}
                      </td>
                    </tr>
                    <tr className="bg-[oklch(0.96_0.05_85)]/40">
                      <td className="px-3 py-2 font-semibold text-foreground">
                        Diferença a complementar
                      </td>
                      <td className="px-3 py-2" />
                      <td className="px-3 py-2 text-right font-semibold text-[oklch(0.45_0.14_60)]">
                        {brl(current.diferenca)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 rounded-xl border border-border bg-background p-3">
                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                  MOTIVO DA DIVERGÊNCIA
                </p>
                <p className="mt-1 text-sm text-foreground">{current.motivo}</p>
              </div>

              {current.status === "pendente" ? (
                <div className="mt-5 flex items-center gap-2">
                  <button
                    onClick={() => update(current.id, "autorizada")}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[oklch(0.55_0.16_150)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Autorizar emissão
                  </button>
                  <button
                    onClick={() => update(current.id, "recusada")}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    <XCircle className="h-4 w-4" /> Recusar
                  </button>
                </div>
              ) : (
                <div className="mt-5 flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-xs text-muted-foreground">
                  <span>
                    Decisão registrada:{" "}
                    <span className="font-semibold text-foreground">
                      {current.status === "autorizada"
                        ? "NF-e autorizada para transmissão à SEFAZ"
                        : "Emissão recusada — divergência será reanalisada pelo C2"}
                    </span>
                  </span>
                  <button
                    onClick={() => update(current.id, "pendente")}
                    className="text-foreground hover:underline"
                  >
                    Reverter
                  </button>
                </div>
              )}
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}
