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

const saidas: Doc[] = [
  { id: "s1", nfe: "412347", data: "18/08/2025", cliente: "Metalúrgica Dias ME", valor: "R$ 3.200", rota: "MG→SP", status: "erros", statusLabel: "1 erro" },
  { id: "s2", nfe: "412349", data: "25/08/2025", cliente: "Ind. Becker Ltda", valor: "R$ 7.650", rota: "MG→RS", status: "erros", statusLabel: "3 erros" },
  { id: "s3", nfe: "412354", data: "01/09/2025", cliente: "Comp. Sul S/A", valor: "R$ 8.900", rota: "MG→SP", status: "erros", statusLabel: "1 erro" },
];

type Diagnostico = {
  tipo: "Entrada" | "Saída";
  alertTitle: string;
  alertSub: string;
  regraLabel: string;
  regraValor: string;
  campo: string;
  de: string;
  para: string;
  impactoTitulo: string;
  linha1Label: string;
  linha1Valor: string;
  linha2Label: string;
  linha2Valor: string;
  totalLabel: string;
  totalValor: string;
  actionLabel: string;
  pendentes: string;
};

type Audit = {
  id: string;
  titulo: string;
  desc: string;
  detalhe: string;
  asis: string;
  progresso: number;
  diagnostico: Diagnostico;
};

const docAuditorias: Record<string, Audit[]> = {
  d1: [
    {
      id: "a1",
      titulo: "ICMS · Alíquota — Rejeição",
      desc: "Alíquota diverge da tabela interestadual",
      detalhe: "4% → 12% · R$80 crédito",
      asis: "RN 1549 · 2129",
      progresso: 91,
      diagnostico: {
        tipo: "Entrada",
        alertTitle: "Documento de entrada — alteração bloqueada",
        alertSub: "Notifique o fornecedor para correção e reemissão.",
        regraLabel: "Regra",
        regraValor: "RN 1549 · Alíquotas Interestaduais",
        campo: "Alíquota aplicada",
        de: "4,00%",
        para: "12,00%",
        impactoTitulo: "Impacto no crédito",
        linha1Label: "Crédito escriturado (4%)",
        linha1Valor: "R$ 40,00",
        linha2Label: "Crédito correto (12%)",
        linha2Valor: "R$ 120,00",
        totalLabel: "A recuperar",
        totalValor: "R$ 80,00",
        actionLabel: "Notificar fornecedor",
        pendentes: "28 pendentes",
      },
    },
    {
      id: "a2",
      titulo: "Indpres x Finnfe",
      desc: "Indicador de presença diverge",
      detalhe: "",
      asis: "RN 3913",
      progresso: 0,
      diagnostico: {
        tipo: "Entrada",
        alertTitle: "Indicador de presença inconsistente",
        alertSub: "Reclassifique conforme a operação real do destinatário.",
        regraLabel: "Regra",
        regraValor: "RN 3913 · Indpres × FinNFe",
        campo: "Indicador de presença",
        de: "1 — Presencial",
        para: "9 — Não presencial, outros",
        impactoTitulo: "Impacto fiscal",
        linha1Label: "Operações reclassificadas",
        linha1Valor: "12 NF-e",
        linha2Label: "Risco de glosa",
        linha2Valor: "Médio",
        totalLabel: "Ajuste recomendado",
        totalValor: "Reemissão",
        actionLabel: "Abrir chamado",
        pendentes: "12 pendentes",
      },
    },
  ],
  d2: [
    {
      id: "a1",
      titulo: "ICMS-ST · Base de cálculo",
      desc: "MVA aplicada abaixo do protocolo",
      detalhe: "38% → 45,8%",
      asis: "RN 2207",
      progresso: 64,
      diagnostico: {
        tipo: "Entrada",
        alertTitle: "Base de ICMS-ST insuficiente",
        alertSub: "Recalcular MVA conforme protocolo SP-MG vigente.",
        regraLabel: "Protocolo",
        regraValor: "Protocolo ICMS 41/08 · MVA SP-MG",
        campo: "MVA aplicada",
        de: "38,00%",
        para: "45,80%",
        impactoTitulo: "Impacto no ST",
        linha1Label: "ST recolhido",
        linha1Valor: "R$ 1.176,00",
        linha2Label: "ST devido",
        linha2Valor: "R$ 1.418,40",
        totalLabel: "Diferença a recolher",
        totalValor: "R$ 242,40",
        actionLabel: "Gerar GNRE complementar",
        pendentes: "5 pendentes",
      },
    },
  ],
  d3: [
    {
      id: "a1",
      titulo: "CFOP × CST — Inconsistência",
      desc: "CFOP de revenda com CST de industrialização",
      detalhe: "5102 ↔ CST 00",
      asis: "RN 4421",
      progresso: 40,
      diagnostico: {
        tipo: "Entrada",
        alertTitle: "CFOP incompatível com CST informado",
        alertSub: "Verifique a natureza da operação e ajuste o XML.",
        regraLabel: "Regra",
        regraValor: "RN 4421 · CFOP × CST",
        campo: "CFOP / CST",
        de: "5102 / 00",
        para: "5101 / 00",
        impactoTitulo: "Impacto operacional",
        linha1Label: "NF-e impactadas",
        linha1Valor: "3",
        linha2Label: "Valor envolvido",
        linha2Valor: "R$ 33.600,00",
        totalLabel: "Status",
        totalValor: "Aguarda reemissão",
        actionLabel: "Solicitar correção",
        pendentes: "7 pendentes",
      },
    },
  ],
  d4: [
    {
      id: "a1",
      titulo: "Crédito · NCM divergente",
      desc: "NCM declarada incompatível com produto",
      detalhe: "7318.15 → 8482.10",
      asis: "RN 5012",
      progresso: 25,
      diagnostico: {
        tipo: "Entrada",
        alertTitle: "NCM divergente — crédito em risco",
        alertSub: "Validar NCM correta junto ao cadastro de produtos.",
        regraLabel: "Regra",
        regraValor: "RN 5012 · NCM × Cadastro",
        campo: "NCM",
        de: "7318.15.00",
        para: "8482.10.10",
        impactoTitulo: "Impacto no crédito",
        linha1Label: "Crédito tomado",
        linha1Valor: "R$ 540,00",
        linha2Label: "Crédito reconhecido",
        linha2Valor: "R$ 405,00",
        totalLabel: "Glosa potencial",
        totalValor: "R$ 135,00",
        actionLabel: "Notificar fornecedor",
        pendentes: "9 pendentes",
      },
    },
    {
      id: "a2",
      titulo: "PIS/COFINS · CST 06",
      desc: "CST 06 sem amparo legal informado",
      detalhe: "",
      asis: "RN 5290",
      progresso: 0,
      diagnostico: {
        tipo: "Entrada",
        alertTitle: "Alíquota zero sem fundamento",
        alertSub: "Solicitar enquadramento legal ao fornecedor.",
        regraLabel: "Regra",
        regraValor: "RN 5290 · CST PIS/COFINS",
        campo: "CST",
        de: "06",
        para: "01",
        impactoTitulo: "Impacto",
        linha1Label: "Crédito presumido",
        linha1Valor: "R$ 0,00",
        linha2Label: "Crédito correto",
        linha2Valor: "R$ 416,25",
        totalLabel: "A recuperar",
        totalValor: "R$ 416,25",
        actionLabel: "Notificar fornecedor",
        pendentes: "4 pendentes",
      },
    },
  ],
  d5: [
    {
      id: "a1",
      titulo: "ICMS · Diferimento parcial",
      desc: "Diferimento aplicado fora do regime estadual",
      detalhe: "Diferido → Tributado",
      asis: "RN 6101",
      progresso: 78,
      diagnostico: {
        tipo: "Entrada",
        alertTitle: "Diferimento indevido na operação",
        alertSub: "Regime não se aplica para SC → MG nesta NCM.",
        regraLabel: "Regra",
        regraValor: "RN 6101 · Diferimento Interestadual",
        campo: "Tratamento",
        de: "Diferido (0%)",
        para: "Tributado (12%)",
        impactoTitulo: "Impacto tributário",
        linha1Label: "ICMS declarado",
        linha1Valor: "R$ 0,00",
        linha2Label: "ICMS devido",
        linha2Valor: "R$ 2.196,00",
        totalLabel: "A recolher",
        totalValor: "R$ 2.196,00",
        actionLabel: "Abrir ajuste de apuração",
        pendentes: "3 pendentes",
      },
    },
  ],
};

const saidasAuditorias: Record<string, Audit[]> = {
  s1: [
    {
      id: "a1",
      titulo: "ICMS · Alíquota — Rejeição",
      desc: "Alíquota diverge da legislação MG→SP",
      detalhe: "12% → 7% · ▼ R$ 1.225",
      asis: "RN-ICMS-047",
      progresso: 91,
      diagnostico: {
        tipo: "Saída",
        alertTitle: "Sugestão de regra · ICMS Alíquota",
        alertSub: "Ajuste a alíquota de saída conforme protocolo MG→SP vigente.",
        regraLabel: "Regra",
        regraValor: "RN-ICMS-047 · DIFAL MG→SP",
        campo: "CFOP / CST",
        de: "6.102 · CST 000",
        para: "6.102 · CST 000",
        impactoTitulo: "Ajuste sugerido na TOP",
        linha1Label: "TOP afetada",
        linha1Valor: "1.01 · Venda de mercadoria",
        linha2Label: "Valor",
        linha2Valor: "12,00% → 7,00%",
        totalLabel: "Simulação · sem valor fiscal",
        totalValor: "▼ R$ 1.225,00",
        actionLabel: "Aplicar regra",
        pendentes: "19 pendentes",
      },
    },
  ],
  s2: [
    {
      id: "a1",
      titulo: "ICMS-ST · Base divergente",
      desc: "MVA aplicada acima do protocolo MG→RS",
      detalhe: "45,8% → 38%",
      asis: "RN-ICMS-2207",
      progresso: 72,
      diagnostico: {
        tipo: "Saída",
        alertTitle: "Sugestão de regra · ICMS-ST",
        alertSub: "Recalcular MVA conforme protocolo MG-RS vigente.",
        regraLabel: "Protocolo",
        regraValor: "Protocolo ICMS 41/08 · MG-RS",
        campo: "MVA aplicada",
        de: "45,80%",
        para: "38,00%",
        impactoTitulo: "Ajuste sugerido na TOP",
        linha1Label: "TOP afetada",
        linha1Valor: "1.04 · Venda c/ ST",
        linha2Label: "ST recolhido",
        linha2Valor: "R$ 1.418,40 → R$ 1.176,00",
        totalLabel: "Diferença simulada",
        totalValor: "▼ R$ 242,40",
        actionLabel: "Aplicar regra",
        pendentes: "5 pendentes",
      },
    },
    {
      id: "a2",
      titulo: "CFOP × CST — Inconsistência",
      desc: "CFOP de saída interestadual com CST incompatível",
      detalhe: "6.102 ↔ CST 60",
      asis: "RN-ICMS-4421",
      progresso: 35,
      diagnostico: {
        tipo: "Saída",
        alertTitle: "Sugestão de regra · CFOP/CST",
        alertSub: "Realinhar CFOP/CST conforme natureza da operação.",
        regraLabel: "Regra",
        regraValor: "RN-ICMS-4421 · CFOP × CST",
        campo: "CFOP / CST",
        de: "6.102 / 60",
        para: "6.102 / 00",
        impactoTitulo: "Ajuste sugerido na TOP",
        linha1Label: "TOP afetada",
        linha1Valor: "1.02 · Venda interestadual",
        linha2Label: "Operações reclassificadas",
        linha2Valor: "3 NF-e",
        totalLabel: "Status",
        totalValor: "Aguarda aplicação",
        actionLabel: "Aplicar regra",
        pendentes: "7 pendentes",
      },
    },
    {
      id: "a3",
      titulo: "PIS/COFINS · CST 06",
      desc: "Alíquota zero sem fundamento legal",
      detalhe: "",
      asis: "RN-ICMS-5290",
      progresso: 0,
      diagnostico: {
        tipo: "Saída",
        alertTitle: "Sugestão de regra · PIS/COFINS",
        alertSub: "Aplicar enquadramento legal correto para CST 06.",
        regraLabel: "Regra",
        regraValor: "RN-ICMS-5290 · CST PIS/COFINS",
        campo: "CST",
        de: "06",
        para: "01",
        impactoTitulo: "Ajuste sugerido",
        linha1Label: "TOP afetada",
        linha1Valor: "1.01 · Venda padrão",
        linha2Label: "Receita afetada",
        linha2Valor: "R$ 7.650,00",
        totalLabel: "Simulação",
        totalValor: "▼ R$ 416,25",
        actionLabel: "Aplicar regra",
        pendentes: "4 pendentes",
      },
    },
  ],
  s3: [
    {
      id: "a1",
      titulo: "ICMS · Alíquota — Rejeição",
      desc: "Alíquota diverge da legislação MG→SP",
      detalhe: "12% → 7% · ▼ R$ 1.068",
      asis: "RN-ICMS-047",
      progresso: 88,
      diagnostico: {
        tipo: "Saída",
        alertTitle: "Sugestão de regra · ICMS Alíquota",
        alertSub: "Ajuste a alíquota de saída conforme protocolo MG→SP vigente.",
        regraLabel: "Regra",
        regraValor: "RN-ICMS-047 · DIFAL MG→SP",
        campo: "CFOP / CST",
        de: "6.102 · CST 000",
        para: "6.102 · CST 000",
        impactoTitulo: "Ajuste sugerido na TOP",
        linha1Label: "TOP afetada",
        linha1Valor: "1.01 · Venda de mercadoria",
        linha2Label: "Valor",
        linha2Valor: "12,00% → 7,00%",
        totalLabel: "Simulação · sem valor fiscal",
        totalValor: "▼ R$ 1.068,00",
        actionLabel: "Aplicar regra",
        pendentes: "19 pendentes",
      },
    },
  ],
};


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

type DetRow = {
  tipo: "entrada" | "saida";
  nfe: string;
  chave: string;
  data: string;
  parceiro: string;
  cnpj: string;
  uf: string;
  valor: string;
  auditoria: string;
  status: "notificado" | "pendente" | "aplicada" | "rejeitada";
};

const detRows: DetRow[] = [
  { tipo: "entrada", nfe: "110507", chave: "532509263140620007…", data: "03/09/2025", parceiro: "EMPRESA JR DF", cnpj: "26.314.062/0007-57", uf: "DF→MG", valor: "R$ 1.000,00", auditoria: "1549 · Alíquota ICMS", status: "notificado" },
  { tipo: "entrada", nfe: "412346", chave: "352508151234000001…", data: "15/08/2025", parceiro: "Componentes Sul S/A", cnpj: "12.345.678/0001-90", uf: "SP→MG", valor: "R$ 9.800,00", auditoria: "3852 · ICMS-ST", status: "pendente" },
  { tipo: "entrada", nfe: "412348", chave: "352508209876000003…", data: "20/08/2025", parceiro: "Eletro Norte Ltda", cnpj: "98.765.432/0001-10", uf: "RS→MG", valor: "R$ 11.200,00", auditoria: "3873 · PIS/COFINS", status: "pendente" },
  { tipo: "saida",   nfe: "412347", chave: "312508183331000004…", data: "18/08/2025", parceiro: "Metalúrgica Dias ME", cnpj: "33.310.000/0001-45", uf: "MG→SP", valor: "R$ 3.200,00", auditoria: "1549 · Alíquota ICMS", status: "aplicada" },
  { tipo: "saida",   nfe: "412349", chave: "312508254444000007…", data: "25/08/2025", parceiro: "Ind. Becker Ltda", cnpj: "44.400.000/0001-78", uf: "MG→RS", valor: "R$ 7.650,00", auditoria: "3852 · ICMS-ST", status: "rejeitada" },
  { tipo: "saida",   nfe: "412354", chave: "312509015555000000…", data: "01/09/2025", parceiro: "Comp. Sul S/A", cnpj: "55.500.000/0001-23", uf: "MG→SP", valor: "R$ 8.900,00", auditoria: "1549 · Alíquota ICMS", status: "aplicada" },
];

const statusStyles: Record<DetRow["status"], string> = {
  notificado: "bg-accent text-accent-foreground",
  pendente: "bg-[oklch(0.95_0.05_85)] text-[oklch(0.55_0.18_60)]",
  aplicada: "bg-accent text-primary",
  rejeitada: "bg-[oklch(0.95_0.05_25)] text-[oklch(0.55_0.2_25)]",
};
const statusIcon: Record<DetRow["status"], string> = {
  notificado: "✉",
  pendente: "⏳",
  aplicada: "✔",
  rejeitada: "✕",
};
const statusLabel: Record<DetRow["status"], string> = {
  notificado: "Notificado",
  pendente: "Pendente",
  aplicada: "Aplicada",
  rejeitada: "Rejeitada",
};

function DetalhamentoDocumentos() {
  const counts = {
    entradas: detRows.filter((r) => r.tipo === "entrada").length,
    saidas: detRows.filter((r) => r.tipo === "saida").length,
    pendentes: detRows.filter((r) => r.status === "pendente").length,
    aplicadas: detRows.filter((r) => r.status === "aplicada").length,
    rejeitadas: detRows.filter((r) => r.status === "rejeitada").length,
  };

  return (
    <div className="mt-4 space-y-4">
      {/* Filters */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Tipo</label>
            <select className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground">
              <option>Entrada e Saída</option>
              <option>Entrada</option>
              <option>Saída</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Data — de</label>
            <input type="date" defaultValue="2025-08-01" className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Data — até</label>
            <input type="date" defaultValue="2025-09-30" className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground" />
          </div>
          <div className="flex flex-1 min-w-[200px] flex-col gap-1">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Número / chave</label>
            <input placeholder="Buscar NF ou chave…" className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Status</label>
            <select className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground">
              <option>Todos</option>
              <option>Notificado</option>
              <option>Pendente</option>
              <option>Aplicada</option>
              <option>Rejeitada</option>
            </select>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">Filtrar</button>
            <button className="rounded-full border border-border bg-background px-4 py-1.5 text-xs text-foreground hover:bg-muted">Limpar</button>
            <button className="rounded-full border border-primary/30 bg-card px-4 py-1.5 text-xs text-primary hover:bg-accent">↗ Exportar</button>
          </div>
        </div>
      </div>

      {/* Counters */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs">
        <span className="text-muted-foreground">Exibindo {detRows.length} NF-es</span>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-accent-foreground">↓ {counts.entradas} Entradas</span>
          <span className="rounded-full bg-[oklch(0.95_0.05_140)] px-2.5 py-0.5 text-[oklch(0.45_0.13_160)]">↑ {counts.saidas} Saídas</span>
          <span className="rounded-full px-2.5 py-0.5 text-[oklch(0.55_0.18_60)]">{counts.pendentes} Pendentes</span>
          <span className="rounded-full px-2.5 py-0.5 text-primary">{counts.aplicadas} Aplicadas</span>
          <span className="rounded-full px-2.5 py-0.5 text-[oklch(0.55_0.2_25)]">{counts.rejeitadas} Rejeitada</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 text-left">Tipo</th>
                <th className="px-4 py-3 text-left">NF-e</th>
                <th className="px-4 py-3 text-left">Número único (chave)</th>
                <th className="px-4 py-3 text-left">Data emissão</th>
                <th className="px-4 py-3 text-left">Parceiro</th>
                <th className="px-4 py-3 text-left">UF</th>
                <th className="px-4 py-3 text-right">Valor total</th>
                <th className="px-4 py-3 text-left">Auditoria</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {detRows.map((r) => (
                <tr key={r.nfe} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="px-4 py-3">
                    {r.tipo === "entrada" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-accent-foreground">↓ Entrada</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[oklch(0.95_0.05_140)] px-2 py-0.5 text-[oklch(0.45_0.13_160)]">↑ Saída</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">{r.nfe}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{r.chave}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.data}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{r.parceiro}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{r.cnpj}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.uf}</td>
                  <td className="px-4 py-3 text-right font-medium text-foreground tabular-nums">{r.valor}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.auditoria}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 ${statusStyles[r.status]}`}>
                      {statusIcon[r.status]} {statusLabel[r.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground">
                      ↗
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <span>Exibindo 1–{detRows.length} de {detRows.length}</span>
          <div className="flex items-center gap-1">
            <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-muted">‹</button>
            <button className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">1</button>
            <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-muted">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}


function IcmsDiagnostico() {
  const [tab, setTab] = useState<"resumo" | "detalhamento" | "historico">("resumo");
  const [docTab, setDocTab] = useState<"entradas" | "saidas">("entradas");
  const docsList = docTab === "entradas" ? entradas : saidas;
  const auditMap = docTab === "entradas" ? docAuditorias : saidasAuditorias;
  const [selectedDoc, setSelectedDoc] = useState<string>("d1");
  const activeDocId = docsList.some((d) => d.id === selectedDoc) ? selectedDoc : docsList[0]?.id ?? "";
  const auditorias = auditMap[activeDocId] ?? [];
  const [selectedAuditoria, setSelectedAuditoria] = useState<string>("a1");
  const currentDoc = docsList.find((d) => d.id === activeDocId);
  const currentAudit = auditorias.find((a) => a.id === selectedAuditoria) ?? auditorias[0];
  const diag = currentAudit?.diagnostico;
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
      <section className="flex w-[340px] flex-col bg-card">
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
      <main className="ml-4 flex-1 overflow-y-auto px-6 pt-6">
        <div>
        {/* Header */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-foreground">
            Diagnóstico Fiscal <span className="text-muted-foreground">· ICMS</span>
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

        {tab === "resumo" && (
          <>
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
              <button
                onClick={() => {
                  setDocTab("entradas");
                  const firstDoc = entradas[0];
                  if (firstDoc) {
                    setSelectedDoc(firstDoc.id);
                    const firstA = docAuditorias[firstDoc.id]?.[0]?.id;
                    if (firstA) setSelectedAuditoria(firstA);
                  }
                }}
                className={`flex items-center gap-1 rounded-md px-2 py-1 ${
                  docTab === "entradas" ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <ArrowDown className="h-3 w-3" /> Entradas <span className="text-muted-foreground">28</span>
              </button>
              <button
                onClick={() => {
                  setDocTab("saidas");
                  const firstDoc = saidas[0];
                  if (firstDoc) {
                    setSelectedDoc(firstDoc.id);
                    const firstA = saidasAuditorias[firstDoc.id]?.[0]?.id;
                    if (firstA) setSelectedAuditoria(firstA);
                  }
                }}
                className={`flex items-center gap-1 rounded-md px-2 py-1 ${
                  docTab === "saidas" ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <ArrowUp className="h-3 w-3" /> Saídas <span className="text-muted-foreground">19</span>
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
              {docsList.map((d) => {
                const active = activeDocId === d.id;
                return (
                  <li
                    key={d.id}
                    onClick={() => {
                      setSelectedDoc(d.id);
                      const first = auditMap[d.id]?.[0]?.id;
                      if (first) setSelectedAuditoria(first);
                    }}
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
                Auditorias <span className="text-muted-foreground">· NFe {currentDoc?.nfe ?? "—"}</span>
              </div>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{auditorias.length}</span>
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
                Diagnóstico <span className="text-muted-foreground">· {currentAudit?.titulo.split("—")[0].trim() ?? "—"}</span>
              </div>
              {diag && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                  {diag.tipo === "Entrada" ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />} {diag.tipo}
                </span>
              )}
            </div>

            {diag && (
              <div className="space-y-4 p-4">
                <div className="rounded-lg border border-[oklch(0.85_0.1_85)] bg-[oklch(0.97_0.04_85)] p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.6_0.18_60)]" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{diag.alertTitle}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{diag.alertSub}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Diagnóstico Asis
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">{diag.regraLabel}</span>
                      <span className="text-right text-foreground">{diag.regraValor}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">{diag.campo}</span>
                      <span className="text-right">
                        <span className="text-[oklch(0.55_0.2_25)] line-through">{diag.de}</span>{" "}
                        <span className="text-muted-foreground">→</span>{" "}
                        <span className="font-medium text-primary">{diag.para}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {diag.impactoTitulo}
                  </div>
                  <div className="space-y-2 rounded-lg border border-primary/20 bg-accent/40 p-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-foreground">{diag.linha1Label}</span>
                      <span className="tabular-nums text-[oklch(0.55_0.2_25)]">{diag.linha1Valor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground">{diag.linha2Label}</span>
                      <span className="tabular-nums text-foreground">{diag.linha2Valor}</span>
                    </div>
                    <div className="flex justify-between border-t border-primary/20 pt-2">
                      <span className="font-medium text-foreground">{diag.totalLabel}</span>
                      <span className="tabular-nums font-semibold text-primary">{diag.totalValor}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-3">
                  <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                    <Send className="h-3.5 w-3.5" /> {diag.actionLabel}
                  </button>
                  <span className="inline-flex items-center gap-1 text-xs text-[oklch(0.55_0.2_25)]">
                    <AlertTriangle className="h-3 w-3" /> {diag.pendentes}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
          </>
        )}

        {tab === "detalhamento" && <DetalhamentoDocumentos />}

        {tab === "historico" && (
          <div className="mt-6 rounded-xl border border-dashed border-border bg-card/40 p-10 text-center text-sm text-muted-foreground">
            Histórico de aplicações será exibido aqui.
          </div>
        )}
        </div>

      </main>

      {/* Right icon sidebar */}
      <aside className="flex w-14 flex-col items-center gap-4 border-l border-border bg-card py-5 text-sidebar-foreground">
        <button className="hover:text-foreground"><ShoppingBag className="h-5 w-5" /></button>
        <button className="hover:text-foreground"><User className="h-5 w-5" /></button>
        <button className="hover:text-foreground"><FileText className="h-5 w-5" /></button>
      </aside>
    </div>
  );
}

