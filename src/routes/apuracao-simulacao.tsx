import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Receipt,
  Wallet,
  BookOpen,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  CalendarClock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export const Route = createFileRoute("/apuracao-simulacao")({
  component: ApuracaoSimulacao,
});

type Modulo = "fiscal" | "financeiro" | "contabil" | "apuracao" | "compliance";
type FiscalSub = "fornecimento" | "aquisicao";
type ContabilSub = "balanco" | "dre";

type CreditoStatus = "a_apropriar" | "nao_utilizado" | "utilizado";
type DebitoStatus = "estornado" | "em_aberto" | "extinto";

type NotaFiscal = {
  id: string;
  tipo: "fornecimento" | "aquisicao";
  parceiro: string;
  cpfCnpj: string;
  valorTotal: number;
  valorMerc: number;
  ibs: number;
  cbs: number;
  natureza: "debito" | "credito";
  creditoStatus?: CreditoStatus;
  debitoStatus?: DebitoStatus;
  tituloFinId: string;
  marcador?: "ND" | "NCP";
};

type Titulo = {
  id: string;
  tipo: "pagar" | "receber";
  emissao: string;
  vencimento: string;
  valorTotal: number;
  valorMerc: number;
  ibs: number;
  cbs: number;
  ipi: number;
  is: number;
  tipoTitulo: "Boleto" | "PIX" | "TED";
  docFiscalId: string;
  split: boolean;
  multaJuros?: number;
  parceiro: string;
};

// ============ Dados de simulação ============
const initialNotas: NotaFiscal[] = [
  // Fornecimento (saídas) - emitidas pela empresa
  { id: "NF-1001", tipo: "fornecimento", parceiro: "Comércio Andrade", cpfCnpj: "12.345.678/0001-90", valorTotal: 12000, valorMerc: 10800, ibs: 720, cbs: 480, natureza: "debito", debitoStatus: "em_aberto", tituloFinId: "T-2001" },
  { id: "NF-1002", tipo: "fornecimento", parceiro: "Loja Boavista", cpfCnpj: "98.765.432/0001-10", valorTotal: 5400, valorMerc: 4860, ibs: 324, cbs: 216, natureza: "debito", debitoStatus: "extinto", tituloFinId: "T-2002" },
  { id: "NF-1003", tipo: "fornecimento", parceiro: "Tech Solutions", cpfCnpj: "11.222.333/0001-44", valorTotal: 8200, valorMerc: 7380, ibs: 492, cbs: 328, natureza: "debito", debitoStatus: "em_aberto", tituloFinId: "T-2003" },
  // Aquisição (entradas) - recebidas
  { id: "NF-2001", tipo: "aquisicao", parceiro: "Atacado Minas (revenda)", cpfCnpj: "55.444.333/0001-22", valorTotal: 7500, valorMerc: 6750, ibs: 450, cbs: 300, natureza: "credito", creditoStatus: "a_apropriar", tituloFinId: "T-3001" },
  { id: "NF-2002", tipo: "aquisicao", parceiro: "Distribuidor Sul", cpfCnpj: "77.666.555/0001-33", valorTotal: 3200, valorMerc: 2880, ibs: 192, cbs: 128, natureza: "credito", creditoStatus: "utilizado", tituloFinId: "T-3002" },
  { id: "NF-2003", tipo: "aquisicao", parceiro: "Insumos BR", cpfCnpj: "22.111.000/0001-99", valorTotal: 4600, valorMerc: 4140, ibs: 276, cbs: 184, natureza: "credito", creditoStatus: "nao_utilizado", tituloFinId: "T-3003" },
];

const initialTitulos: Titulo[] = [
  // a receber (notas de fornecimento)
  { id: "T-2001", tipo: "receber", emissao: "02/05/2026", vencimento: "01/06/2026", valorTotal: 12000, valorMerc: 10800, ibs: 720, cbs: 480, ipi: 0, is: 0, tipoTitulo: "Boleto", docFiscalId: "NF-1001", split: false, parceiro: "Comércio Andrade" },
  { id: "T-2002", tipo: "receber", emissao: "05/05/2026", vencimento: "10/05/2026", valorTotal: 5400, valorMerc: 4860, ibs: 324, cbs: 216, ipi: 0, is: 0, tipoTitulo: "PIX", docFiscalId: "NF-1002", split: true, multaJuros: 162, parceiro: "Loja Boavista" },
  { id: "T-2003", tipo: "receber", emissao: "08/05/2026", vencimento: "07/06/2026", valorTotal: 8200, valorMerc: 7380, ibs: 492, cbs: 328, ipi: 0, is: 0, tipoTitulo: "Boleto", docFiscalId: "NF-1003", split: false, parceiro: "Tech Solutions" },
  // a pagar (aquisições)
  { id: "T-3001", tipo: "pagar", emissao: "03/05/2026", vencimento: "02/06/2026", valorTotal: 7500, valorMerc: 6750, ibs: 450, cbs: 300, ipi: 0, is: 0, tipoTitulo: "Boleto", docFiscalId: "NF-2001", split: false, parceiro: "Atacado Minas (revenda)" },
  { id: "T-3002", tipo: "pagar", emissao: "04/05/2026", vencimento: "04/06/2026", valorTotal: 3200, valorMerc: 2880, ibs: 192, cbs: 128, ipi: 0, is: 0, tipoTitulo: "TED", docFiscalId: "NF-2002", split: false, parceiro: "Distribuidor Sul" },
  { id: "T-3003", tipo: "pagar", emissao: "06/05/2026", vencimento: "05/06/2026", valorTotal: 4600, valorMerc: 4140, ibs: 276, cbs: 184, ipi: 0, is: 0, tipoTitulo: "PIX", docFiscalId: "NF-2003", split: false, parceiro: "Insumos BR" },
  // PF
  { id: "T-3010", tipo: "pagar", emissao: "07/05/2026", vencimento: "07/06/2026", valorTotal: 2800, valorMerc: 2800, ibs: 0, cbs: 0, ipi: 0, is: 0, tipoTitulo: "PIX", docFiscalId: "—", split: false, parceiro: "João da Silva (PF)" },
];

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

// ============ Componente ============
function ApuracaoSimulacao() {
  const [modulo, setModulo] = useState<Modulo>("fiscal");
  const [fiscalSub, setFiscalSub] = useState<FiscalSub>("fornecimento");
  const [contabilSub, setContabilSub] = useState<ContabilSub>("balanco");
  const [notas, setNotas] = useState<NotaFiscal[]>(initialNotas);
  const [titulos, setTitulos] = useState<Titulo[]>(initialTitulos);
  const [prefill, setPrefill] = useState<null | {
    tipo: "ND" | "NCP";
    parceiro: string;
    cpfCnpj: string;
    valorTotal: number;
    valorMerc: number;
    ibs: number;
    cbs: number;
    origemTituloId: string;
  }>(null);

  // Cálculos derivados
  const totaisFiscal = useMemo(() => {
    const debitos = notas.filter((n) => n.natureza === "debito");
    const creditos = notas.filter((n) => n.natureza === "credito");
    const totalDebitosIBS = debitos.reduce((s, n) => s + n.ibs, 0);
    const totalDebitosCBS = debitos.reduce((s, n) => s + n.cbs, 0);
    const totalCreditosUtil = creditos
      .filter((n) => n.creditoStatus === "utilizado")
      .reduce((s, n) => s + n.ibs + n.cbs, 0);
    const totalReceita = debitos.reduce((s, n) => s + n.valorTotal, 0);
    return { totalDebitosIBS, totalDebitosCBS, totalCreditosUtil, totalReceita };
  }, [notas]);

  const totaisFin = useMemo(() => {
    const pagar = titulos.filter((t) => t.tipo === "pagar");
    const receber = titulos.filter((t) => t.tipo === "receber");
    return {
      totalPagar: pagar.reduce((s, t) => s + t.valorTotal, 0),
      totalReceber: receber.reduce((s, t) => s + t.valorTotal, 0),
      qtdPagar: pagar.length,
      qtdReceber: receber.length,
      multaJuros: receber.reduce((s, t) => s + (t.multaJuros ?? 0), 0),
    };
  }, [titulos]);

  // ====== Ações ======
  const handleEmitirND = (t: Titulo) => {
    setPrefill({
      tipo: "ND",
      parceiro: t.parceiro,
      cpfCnpj: "—",
      valorTotal: t.multaJuros ?? 0,
      valorMerc: t.multaJuros ?? 0,
      ibs: 0,
      cbs: 0,
      origemTituloId: t.id,
    });
    setModulo("fiscal");
    setFiscalSub("fornecimento");
  };

  const handleEmitirNCP = (t: Titulo) => {
    setPrefill({
      tipo: "NCP",
      parceiro: t.parceiro,
      cpfCnpj: "111.222.333-44",
      valorTotal: t.valorTotal,
      valorMerc: t.valorTotal,
      ibs: Math.round(t.valorTotal * 0.06),
      cbs: Math.round(t.valorTotal * 0.04),
      origemTituloId: t.id,
    });
    setModulo("fiscal");
    setFiscalSub("aquisicao");
  };

  const confirmarPrefill = () => {
    if (!prefill) return;
    const isND = prefill.tipo === "ND";
    const newId = isND ? `ND-${1100 + notas.filter((n) => n.marcador === "ND").length + 1}` : `NCP-${4100 + notas.filter((n) => n.marcador === "NCP").length + 1}`;
    const nova: NotaFiscal = {
      id: newId,
      tipo: isND ? "fornecimento" : "aquisicao",
      parceiro: prefill.parceiro,
      cpfCnpj: prefill.cpfCnpj,
      valorTotal: prefill.valorTotal,
      valorMerc: prefill.valorMerc,
      ibs: prefill.ibs,
      cbs: prefill.cbs,
      natureza: isND ? "debito" : "credito",
      debitoStatus: isND ? "em_aberto" : undefined,
      creditoStatus: isND ? undefined : "a_apropriar",
      tituloFinId: prefill.origemTituloId,
      marcador: prefill.tipo,
    };
    setNotas((n) => [...n, nova]);
    setPrefill(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/compliance" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Voltar ao Compliance
            </Link>
            <span className="hidden h-4 w-px bg-border md:inline-block" />
            <div className="hidden md:block">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">Simulação de apuração</p>
              <h1 className="text-base font-semibold text-foreground">ERP integrado — IBS / CBS / IS</h1>
            </div>
          </div>
          <nav className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
            {([
              { id: "fiscal", label: "Fiscal", icon: Receipt },
              { id: "financeiro", label: "Financeiro", icon: Wallet },
              { id: "contabil", label: "Contábil", icon: BookOpen },
              { id: "apuracao", label: "Apuração", icon: Calculator },
              { id: "compliance", label: "Compliance", icon: ShieldCheck },
            ] as const).map((t) => {
              const Icon = t.icon;
              const active = modulo === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setModulo(t.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-6">
        {modulo === "fiscal" && (
          <FiscalView
            sub={fiscalSub}
            onChangeSub={setFiscalSub}
            notas={notas}
            prefill={prefill}
            onConfirmPrefill={confirmarPrefill}
            onDescartar={() => setPrefill(null)}
          />
        )}
        {modulo === "financeiro" && (
          <FinanceiroView titulos={titulos} totais={totaisFin} onEmitirND={handleEmitirND} onEmitirNCP={handleEmitirNCP} />
        )}
        {modulo === "contabil" && (
          <ContabilView sub={contabilSub} onChangeSub={setContabilSub} totaisFin={totaisFin} totaisFiscal={totaisFiscal} />
        )}
        {modulo === "apuracao" && (
          <ApuracaoView totaisFiscal={totaisFiscal} notas={notas} titulos={titulos} setTitulos={setTitulos} />
        )}
        {modulo === "compliance" && (
          <ComplianceView notas={notas} totaisFiscal={totaisFiscal} totaisFin={totaisFin} />
        )}
      </main>
    </div>
  );
}

// ============ Fiscal ============
function FiscalView({
  sub, onChangeSub, notas, prefill, onConfirmPrefill, onDescartar,
}: {
  sub: FiscalSub;
  onChangeSub: (s: FiscalSub) => void;
  notas: NotaFiscal[];
  prefill: null | { tipo: "ND" | "NCP"; parceiro: string; cpfCnpj: string; valorTotal: number; valorMerc: number; ibs: number; cbs: number; origemTituloId: string };
  onConfirmPrefill: () => void;
  onDescartar: () => void;
}) {
  const lista = notas.filter((n) => n.tipo === sub);
  const isCred = sub === "aquisicao";

  return (
    <div>
      <SubNav
        items={[
          { id: "fornecimento", label: "Notas de fornecimento (saída)", count: notas.filter((n) => n.tipo === "fornecimento").length },
          { id: "aquisicao", label: "Notas de aquisição (entrada)", count: notas.filter((n) => n.tipo === "aquisicao").length },
        ]}
        active={sub}
        onChange={(v) => onChangeSub(v as FiscalSub)}
      />

      {prefill && (
        <div className="mt-4 rounded-xl border border-primary/40 bg-primary/5 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                {prefill.tipo === "ND" ? "Nota de débito pré-preenchida" : "Nota de crédito presumido pré-preenchida"}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {prefill.parceiro} · {prefill.cpfCnpj} · Origem título {prefill.origemTituloId}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                <span>Valor total: <strong className="text-foreground">{fmt(prefill.valorTotal)}</strong></span>
                <span>Mercadoria/serviço: <strong className="text-foreground">{fmt(prefill.valorMerc)}</strong></span>
                <span>IBS: <strong className="text-foreground">{fmt(prefill.ibs)}</strong></span>
                <span>CBS: <strong className="text-foreground">{fmt(prefill.cbs)}</strong></span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onDescartar} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground hover:bg-muted">
                Descartar
              </button>
              <button onClick={onConfirmPrefill} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">
                Confirmar e escriturar como {prefill.tipo}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted/40 text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left">Doc.</th>
                <th className="px-3 py-2 text-left">Parceiro</th>
                <th className="px-3 py-2 text-right">Valor total</th>
                <th className="px-3 py-2 text-right">Mercadoria/Serv.</th>
                <th className="px-3 py-2 text-right">IBS</th>
                <th className="px-3 py-2 text-right">CBS</th>
                <th className="px-3 py-2 text-center">Natureza</th>
                <th className="px-3 py-2 text-center">{isCred ? "Status crédito" : "Status débito"}</th>
                <th className="px-3 py-2 text-left">ID Título Fin.</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((n) => (
                <tr key={n.id} className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-foreground">
                    {n.id}
                    {n.marcador && (
                      <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
                        {n.marcador}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-foreground">
                    {n.parceiro}
                    <div className="text-[10px] text-muted-foreground">{n.cpfCnpj}</div>
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-foreground">{fmt(n.valorTotal)}</td>
                  <td className="px-3 py-2 text-right font-mono text-muted-foreground">{fmt(n.valorMerc)}</td>
                  <td className="px-3 py-2 text-right font-mono text-muted-foreground">{fmt(n.ibs)}</td>
                  <td className="px-3 py-2 text-right font-mono text-muted-foreground">{fmt(n.cbs)}</td>
                  <td className="px-3 py-2 text-center">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        n.natureza === "debito"
                          ? "bg-[oklch(0.55_0.2_25)]/10 text-[oklch(0.45_0.2_25)]"
                          : "bg-[oklch(0.55_0.16_250)]/10 text-[oklch(0.45_0.16_250)]"
                      }`}
                    >
                      {n.natureza === "debito" ? "Débito" : "Crédito"}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    {n.natureza === "credito" ? (
                      <CreditoChip status={n.creditoStatus!} />
                    ) : (
                      <DebitoChip status={n.debitoStatus!} />
                    )}
                  </td>
                  <td className="px-3 py-2 font-mono text-[11px] text-primary">{n.tituloFinId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        Após escrituração, IBS/CBS de aquisição entram como <strong>"a apropriar"</strong>; com retorno da API do governo, migram para <strong>"utilizado"</strong> ou <strong>"não utilizado"</strong>.
        Débitos de fornecimento percorrem <strong>"em aberto" → "extinto"</strong> (ou <strong>"estornado"</strong>).
      </p>
    </div>
  );
}

function CreditoChip({ status }: { status: CreditoStatus }) {
  const map: Record<CreditoStatus, { label: string; cls: string }> = {
    a_apropriar: { label: "A apropriar", cls: "bg-[oklch(0.65_0.18_60)]/10 text-[oklch(0.45_0.18_60)]" },
    nao_utilizado: { label: "Não utilizado", cls: "bg-muted text-muted-foreground" },
    utilizado: { label: "Utilizado", cls: "bg-primary/10 text-primary" },
  };
  const s = map[status];
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.cls}`}>{s.label}</span>;
}
function DebitoChip({ status }: { status: DebitoStatus }) {
  const map: Record<DebitoStatus, { label: string; cls: string }> = {
    em_aberto: { label: "Em aberto", cls: "bg-[oklch(0.65_0.18_60)]/10 text-[oklch(0.45_0.18_60)]" },
    extinto: { label: "Extinto", cls: "bg-primary/10 text-primary" },
    estornado: { label: "Estornado", cls: "bg-muted text-muted-foreground" },
  };
  const s = map[status];
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.cls}`}>{s.label}</span>;
}

// ============ Financeiro ============
function FinanceiroView({
  titulos, totais, onEmitirND, onEmitirNCP,
}: {
  titulos: Titulo[];
  totais: { totalPagar: number; totalReceber: number; qtdPagar: number; qtdReceber: number; multaJuros: number };
  onEmitirND: (t: Titulo) => void;
  onEmitirNCP: (t: Titulo) => void;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <KpiCard label="A receber" value={fmt(totais.totalReceber)} sub={`${totais.qtdReceber} títulos`} tone="info" />
        <KpiCard label="A pagar" value={fmt(totais.totalPagar)} sub={`${totais.qtdPagar} títulos`} tone="danger" />
        <KpiCard label="Multa / juros recebidos" value={fmt(totais.multaJuros)} sub="acréscimos por atraso" tone="warning" />
        <KpiCard label="Saldo operacional" value={fmt(totais.totalReceber - totais.totalPagar)} sub="receitas − pagamentos" tone="success" />
      </div>

      <h2 className="mt-6 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Títulos financeiros</h2>
      <div className="mt-2 overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted/40 text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">Tipo</th>
                <th className="px-3 py-2 text-left">Emissão</th>
                <th className="px-3 py-2 text-left">Vencto.</th>
                <th className="px-3 py-2 text-right">Total</th>
                <th className="px-3 py-2 text-right">Merc./Serv.</th>
                <th className="px-3 py-2 text-right">IBS</th>
                <th className="px-3 py-2 text-right">CBS</th>
                <th className="px-3 py-2 text-right">IPI</th>
                <th className="px-3 py-2 text-right">IS</th>
                <th className="px-3 py-2 text-right">Multa/Juros</th>
                <th className="px-3 py-2 text-left">Tipo título</th>
                <th className="px-3 py-2 text-left">Doc. fiscal</th>
                <th className="px-3 py-2 text-center">Split</th>
                <th className="px-3 py-2 text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {titulos.map((t) => {
                const isPF = t.docFiscalId === "—" && t.tipo === "pagar";
                return (
                  <tr key={t.id} className="border-t border-border align-middle">
                    <td className="px-3 py-2 font-mono text-[11px] text-foreground">{t.id}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          t.tipo === "pagar"
                            ? "bg-[oklch(0.55_0.2_25)]/10 text-[oklch(0.45_0.2_25)]"
                            : "bg-[oklch(0.55_0.16_250)]/10 text-[oklch(0.45_0.16_250)]"
                        }`}
                      >
                        {t.tipo === "pagar" ? "À pagar" : "À receber"}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{t.emissao}</td>
                    <td className="px-3 py-2 text-muted-foreground">{t.vencimento}</td>
                    <td className="px-3 py-2 text-right font-mono text-foreground">{fmt(t.valorTotal)}</td>
                    <td className="px-3 py-2 text-right font-mono text-muted-foreground">{fmt(t.valorMerc)}</td>
                    <td className="px-3 py-2 text-right font-mono text-muted-foreground">{fmt(t.ibs)}</td>
                    <td className="px-3 py-2 text-right font-mono text-muted-foreground">{fmt(t.cbs)}</td>
                    <td className="px-3 py-2 text-right font-mono text-muted-foreground">{fmt(t.ipi)}</td>
                    <td className="px-3 py-2 text-right font-mono text-muted-foreground">{fmt(t.is)}</td>
                    <td className="px-3 py-2 text-right font-mono text-[oklch(0.55_0.2_25)]">
                      {t.multaJuros ? fmt(t.multaJuros) : "—"}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{t.tipoTitulo}</td>
                    <td className="px-3 py-2 font-mono text-[11px] text-primary">{t.docFiscalId}</td>
                    <td className="px-3 py-2 text-center">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          t.split ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {t.split ? "Sim" : "Não"}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right">
                      {t.multaJuros ? (
                        <button
                          onClick={() => onEmitirND(t)}
                          className="rounded-lg border border-[oklch(0.55_0.2_25)]/40 bg-[oklch(0.55_0.2_25)]/5 px-2 py-1 text-[10px] font-medium text-[oklch(0.45_0.2_25)] hover:bg-[oklch(0.55_0.2_25)]/10"
                        >
                          Emitir nota de débito
                        </button>
                      ) : isPF ? (
                        <button
                          onClick={() => onEmitirNCP(t)}
                          className="rounded-lg border border-primary/40 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary hover:bg-primary/10"
                        >
                          Emitir nota de crédito presumido
                        </button>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fluxo de caixa */}
      <h2 className="mt-6 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Fluxo de caixa — período</h2>
      <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Receitas (fornecimento)</p>
          <p className="mt-2 font-mono text-xl text-foreground">{fmt(titulos.filter((t) => t.tipo === "receber").reduce((s, t) => s + t.valorTotal, 0))}</p>
          <p className="mt-1 text-xs text-muted-foreground">{totais.qtdReceber} títulos a receber</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Recebidos (extintos)</p>
          <p className="mt-2 font-mono text-xl text-primary">
            {fmt(titulos.filter((t) => t.tipo === "receber" && t.split).reduce((s, t) => s + t.valorTotal, 0))}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">via split / liquidação direta</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">A receber em aberto</p>
          <p className="mt-2 font-mono text-xl text-[oklch(0.65_0.18_60)]">
            {fmt(titulos.filter((t) => t.tipo === "receber" && !t.split).reduce((s, t) => s + t.valorTotal, 0))}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">confronto com receitas do período</p>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        Títulos com <strong>split = Sim</strong> alimentam automaticamente o débito como <strong>"extinto"</strong> no Fiscal, sem alterar o valor do título a receber.
      </p>
    </div>
  );
}

// ============ Contábil ============
function ContabilView({
  sub, onChangeSub, totaisFin, totaisFiscal,
}: {
  sub: ContabilSub;
  onChangeSub: (s: ContabilSub) => void;
  totaisFin: { totalPagar: number; totalReceber: number };
  totaisFiscal: { totalReceita: number; totalDebitosIBS: number; totalDebitosCBS: number };
}) {
  const icmsProprio = 0; // simulação — pode ser ajustado
  const icmsST = 0;
  const icmsDifal = 0;
  const is = 0;
  const receitaBruta = totaisFiscal.totalReceita;
  const redutores = icmsProprio + icmsST + icmsDifal + is;
  const receitaLiquida = receitaBruta - redutores;

  return (
    <div>
      <SubNav
        items={[
          { id: "balanco", label: "Balanço Patrimonial" },
          { id: "dre", label: "DRE" },
        ]}
        active={sub}
        onChange={(v) => onChangeSub(v as ContabilSub)}
      />

      {sub === "balanco" ? (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-primary">Ativo Circulante</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <Linha label="Clientes (= títulos a receber do Financeiro)" valor={fmt(totaisFin.totalReceber)} bold />
              <Linha label="Caixa / Bancos" valor={fmt(35000)} />
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-[oklch(0.55_0.2_25)]">Passivo Circulante</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <Linha label="Fornecedores (= títulos a pagar do Financeiro)" valor={fmt(totaisFin.totalPagar)} bold />
              <Linha label="Obrigações tributárias" valor={fmt(4200)} />
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-border bg-card p-5">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">DRE — Período</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <Linha label="(+) Receita bruta (= notas de fornecimento)" valor={fmt(receitaBruta)} bold />
            <Linha label="(−) ICMS próprio" valor={`− ${fmt(icmsProprio)}`} muted />
            <Linha label="(−) ICMS-ST" valor={`− ${fmt(icmsST)}`} muted />
            <Linha label="(−) ICMS Difal" valor={`− ${fmt(icmsDifal)}`} muted />
            <Linha label="(−) IS (Imposto Seletivo)" valor={`− ${fmt(is)}`} muted />
            <li className="my-2 border-t border-border" />
            <Linha label="(=) Receita líquida" valor={fmt(receitaLiquida)} bold />
            <li className="mt-2 rounded-lg bg-muted/40 p-2 text-[11px] text-muted-foreground">
              IBS / CBS <strong>não</strong> reduzem a receita na DRE (apuração separada).
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function Linha({ label, valor, bold, muted }: { label: string; valor: string; bold?: boolean; muted?: boolean }) {
  return (
    <li className="flex items-baseline justify-between">
      <span className={`text-sm ${muted ? "text-muted-foreground" : "text-foreground"}`}>{label}</span>
      <span className={`font-mono text-sm ${bold ? "font-semibold text-foreground" : muted ? "text-muted-foreground" : "text-foreground"}`}>{valor}</span>
    </li>
  );
}

// ============ Apuração ============
function ApuracaoView({
  totaisFiscal, notas, titulos, setTitulos,
}: {
  totaisFiscal: { totalDebitosIBS: number; totalDebitosCBS: number; totalCreditosUtil: number };
  notas: NotaFiscal[];
  titulos: Titulo[];
  setTitulos: React.Dispatch<React.SetStateAction<Titulo[]>>;
}) {
  const saldoCredorAnt = 1200;
  const notasDebito = notas.filter((n) => n.marcador === "ND").reduce((s, n) => s + n.valorTotal, 0);
  const notasCredito = notas.filter((n) => n.marcador === "NCP").reduce((s, n) => s + n.ibs + n.cbs, 0);
  const splits = titulos.filter((t) => t.split).reduce((s, t) => s + (t.ibs + t.cbs), 0);
  const rad = 450;

  const totalDebitos = totaisFiscal.totalDebitosIBS + totaisFiscal.totalDebitosCBS;
  const saldo =
    totalDebitos - saldoCredorAnt - totaisFiscal.totalCreditosUtil + notasDebito - notasCredito - splits - rad;

  const tituloApuracao = titulos.find((t) => t.id === "T-APUR");
  const handleGerarTitulo = () => {
    if (saldo <= 0 || tituloApuracao) return;
    setTitulos((curr) => [
      ...curr,
      {
        id: "T-APUR",
        tipo: "pagar",
        emissao: "31/05/2026",
        vencimento: "20/06/2026",
        valorTotal: saldo,
        valorMerc: 0,
        ibs: 0,
        cbs: 0,
        ipi: 0,
        is: 0,
        tipoTitulo: "Boleto",
        docFiscalId: "APUR-2026/05",
        split: false,
        parceiro: "Receita Federal",
      },
    ]);
  };

  const linhas = [
    { sinal: "+", label: "Débitos do período (IBS + CBS)", valor: totalDebitos },
    { sinal: "−", label: "Saldo credor de período anterior", valor: saldoCredorAnt },
    { sinal: "−", label: 'Créditos utilizados (coluna "utilizados")', valor: totaisFiscal.totalCreditosUtil },
    { sinal: "+", label: "Notas de débito (ND)", valor: notasDebito },
    { sinal: "−", label: "Notas de crédito (NCP)", valor: notasCredito },
    { sinal: "−", label: "Splits liquidados via título", valor: splits },
    { sinal: "−", label: "RAD (Regime Automático de Devolução)", valor: rad },
  ];

  return (
    <div>
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Apuração IBS / CBS — período 05/2026
          </h2>
        </div>
        <ul className="divide-y divide-border">
          {linhas.map((l) => (
            <li key={l.label} className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-foreground">
                <span className={`mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  l.sinal === "+" ? "bg-primary/10 text-primary" : "bg-[oklch(0.55_0.2_25)]/10 text-[oklch(0.45_0.2_25)]"
                }`}>{l.sinal}</span>
                {l.label}
              </span>
              <span className="font-mono text-foreground">{fmt(l.valor)}</span>
            </li>
          ))}
          <li className="flex items-center justify-between bg-muted/40 px-5 py-4">
            <span className="text-sm font-semibold text-foreground">(=) Saldo a recolher pelo contribuinte</span>
            <span className={`font-mono text-lg font-semibold ${saldo > 0 ? "text-[oklch(0.45_0.2_25)]" : "text-primary"}`}>
              {fmt(saldo)}
            </span>
          </li>
        </ul>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
        <div>
          <p className="text-sm text-foreground">
            {saldo > 0
              ? "Saldo positivo: deve gerar um título no Financeiro como à pagar e ser baixado conforme retorno da instituição de pagamento."
              : "Saldo negativo: mantido e carregado para o mês seguinte como saldo credor."}
          </p>
          {tituloApuracao && (
            <p className="mt-2 text-xs text-primary">
              Título <strong className="font-mono">T-APUR</strong> gerado no Financeiro · {fmt(tituloApuracao.valorTotal)}
            </p>
          )}
        </div>
        {saldo > 0 && !tituloApuracao && (
          <button
            onClick={handleGerarTitulo}
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            Gerar título à pagar
          </button>
        )}
      </div>
    </div>
  );
}

// ============ Compliance Fiscal ============
function ComplianceView({
  notas, totaisFiscal, totaisFin,
}: {
  notas: NotaFiscal[];
  totaisFiscal: { totalReceita: number; totalDebitosIBS: number; totalDebitosCBS: number };
  totaisFin: { totalReceber: number; totalPagar: number };
}) {
  const docsEmitidos = notas.filter((n) => n.tipo === "fornecimento").length + 2; // alguns não escriturados
  const docsRecebidos = notas.filter((n) => n.tipo === "aquisicao").length + 1;
  const escriturados = notas.length;

  const [naoEscriturados, setNaoEscriturados] = useState([
    { id: "NF-1099", parceiro: "Auto Peças MG", valor: 4280, tipo: "fornecimento" as const, motivo: "pulo de numeração" },
    { id: "NF-2099", parceiro: "Móveis & Cia", valor: 1680, tipo: "aquisicao" as const, motivo: "captura sem escrituração" },
    { id: "NF-2100", parceiro: "Têxtil Brasil", valor: 920, tipo: "aquisicao" as const, motivo: "duplicidade c/ chave divergente" },
  ]);

  const cargaMedia = (imposto: number) =>
    totaisFiscal.totalReceita > 0 ? ((imposto / totaisFiscal.totalReceita) * 100).toFixed(2) + "%" : "—";

  const divergenciaContabil = Math.abs(totaisFin.totalReceber - totaisFiscal.totalReceita);

  return (
    <div className="space-y-6">
      {/* Resumo */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <KpiCard label="Documentos emitidos" value={`${docsEmitidos}`} sub={`${escriturados} escriturados`} tone="info" />
        <KpiCard label="Documentos recebidos" value={`${docsRecebidos}`} sub={`${naoEscriturados.length} pendentes`} tone="warning" />
        <KpiCard label="Pagamento em dia" value="100%" sub="último dia útil do mês" tone="success" />
        <KpiCard label="Regularidade cadastral" value="Regular" sub="CND válida até 30/07/26" tone="success" />
      </div>

      {/* Certificado */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4 text-primary" />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Vigência de certificado digital</p>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          <CertCard nome="A1 — Matriz" venc="12/09/2026" diasRest={114} status="ok" />
          <CertCard nome="A1 — Filial RJ" venc="04/06/2026" diasRest={14} status="atencao" />
          <CertCard nome="e-CPF Contador" venc="22/05/2026" diasRest={1} status="critico" />
        </div>
      </div>

      {/* Carga tributária */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Soma de impostos e carga média</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-3 py-2 text-left">Imposto</th><th className="px-3 py-2 text-right">Total</th><th className="px-3 py-2 text-right">Carga média s/ operação</th></tr>
            </thead>
            <tbody>
              {[
                { label: "IPI", val: 0 },
                { label: "ICMS próprio", val: 0 },
                { label: "ICMS-ST", val: 0 },
                { label: "ICMS Difal", val: 0 },
                { label: "IBS", val: totaisFiscal.totalDebitosIBS },
                { label: "CBS", val: totaisFiscal.totalDebitosCBS },
                { label: "IS (Seletivo)", val: 0 },
              ].map((r) => (
                <tr key={r.label} className="border-t border-border">
                  <td className="px-3 py-2 text-foreground">{r.label}</td>
                  <td className="px-3 py-2 text-right font-mono text-foreground">{fmt(r.val)}</td>
                  <td className="px-3 py-2 text-right font-mono text-muted-foreground">{cargaMedia(r.val)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Divergências de apuração contribuinte x assistida */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Divergências — Apuração contribuinte vs. assistida</p>
        <ul className="mt-3 space-y-2 text-xs">
          <DivergenciaLinha label="IBS — débitos" contrib={totaisFiscal.totalDebitosIBS} assist={totaisFiscal.totalDebitosIBS + 120} />
          <DivergenciaLinha label="CBS — débitos" contrib={totaisFiscal.totalDebitosCBS} assist={totaisFiscal.totalDebitosCBS} />
          <DivergenciaLinha label="Créditos utilizados" contrib={620} assist={740} />
        </ul>
      </div>

      {/* Documentos não escriturados */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[oklch(0.55_0.2_25)]" />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Documentos não escriturados</p>
        </div>
        <ul className="mt-3 divide-y divide-border">
          {naoEscriturados.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-3 py-2 text-xs">
              <div>
                <p className="font-medium text-foreground">{d.id} · {d.parceiro}</p>
                <p className="text-[10px] text-muted-foreground">{d.tipo === "fornecimento" ? "Emissão" : "Recebimento"} · {d.motivo} · {fmt(d.valor)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setNaoEscriturados((curr) => curr.filter((x) => x.id !== d.id))}
                  className="rounded-lg bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground hover:opacity-90"
                >
                  Escriturar
                </button>
                <button
                  onClick={() => setNaoEscriturados((curr) => curr.filter((x) => x.id !== d.id))}
                  className="rounded-lg border border-border bg-background px-2 py-1 text-[10px] font-medium text-foreground hover:bg-muted"
                >
                  Manifestar
                </button>
              </div>
            </li>
          ))}
          {naoEscriturados.length === 0 && (
            <li className="py-3 text-center text-xs text-muted-foreground">Nenhum documento pendente.</li>
          )}
        </ul>
      </div>

      {/* Divergências entre módulos */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-[oklch(0.65_0.18_60)]" />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Divergências entre Fiscal, Contábil e Financeiro</p>
        </div>
        <ul className="mt-3 space-y-2 text-xs">
          <DivergenciaModulo label="Receita Fiscal × Títulos a receber" valA={totaisFiscal.totalReceita} valB={totaisFin.totalReceber} />
          <DivergenciaModulo label="IBS Fiscal × IBS Títulos" valA={totaisFiscal.totalDebitosIBS} valB={1536} />
          <DivergenciaModulo label="Total Aquisições × Títulos a pagar" valA={15300} valB={totaisFin.totalPagar} />
        </ul>
        {divergenciaContabil > 0 && (
          <p className="mt-3 text-[11px] text-muted-foreground">Clique em uma divergência para abrir a listagem das notas envolvidas.</p>
        )}
      </div>
    </div>
  );
}

function DivergenciaLinha({ label, contrib, assist }: { label: string; contrib: number; assist: number }) {
  const diff = assist - contrib;
  return (
    <li className="flex items-center justify-between rounded-lg border border-border bg-background/40 px-3 py-2">
      <span className="text-foreground">{label}</span>
      <div className="flex items-center gap-4 font-mono text-[11px]">
        <span className="text-muted-foreground">Contrib.: {fmt(contrib)}</span>
        <span className="text-muted-foreground">Assist.: {fmt(assist)}</span>
        <span className={`flex items-center gap-1 ${diff === 0 ? "text-primary" : "text-[oklch(0.55_0.2_25)]"}`}>
          {diff === 0 ? <CheckCircle2 className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
          {diff === 0 ? "OK" : fmt(Math.abs(diff))}
        </span>
      </div>
    </li>
  );
}

function DivergenciaModulo({ label, valA, valB }: { label: string; valA: number; valB: number }) {
  const diff = valA - valB;
  return (
    <li className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-background/40 px-3 py-2 hover:border-primary/40">
      <span className="text-foreground">{label}</span>
      <div className="flex items-center gap-4 font-mono text-[11px]">
        <span className="text-muted-foreground">{fmt(valA)} ↔ {fmt(valB)}</span>
        <span className={`flex items-center gap-1 ${diff === 0 ? "text-primary" : "text-[oklch(0.65_0.18_60)]"}`}>
          {diff === 0 ? <CheckCircle2 className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {diff === 0 ? "OK" : `Δ ${fmt(Math.abs(diff))}`}
        </span>
      </div>
    </li>
  );
}

function CertCard({ nome, venc, diasRest, status }: { nome: string; venc: string; diasRest: number; status: "ok" | "atencao" | "critico" }) {
  const cls = status === "ok"
    ? "border-primary/30 bg-primary/5 text-primary"
    : status === "atencao"
    ? "border-[oklch(0.65_0.18_60)]/30 bg-[oklch(0.65_0.18_60)]/5 text-[oklch(0.45_0.18_60)]"
    : "border-[oklch(0.55_0.2_25)]/30 bg-[oklch(0.55_0.2_25)]/5 text-[oklch(0.45_0.2_25)]";
  return (
    <div className={`rounded-lg border p-3 ${cls}`}>
      <p className="text-xs font-semibold">{nome}</p>
      <p className="mt-1 text-[11px] opacity-90">Vence em {venc}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wider opacity-75">{diasRest} dias restantes</p>
    </div>
  );
}

// ============ Helpers ============
function SubNav<T extends string>({
  items, active, onChange,
}: { items: { id: T; label: string; count?: number }[]; active: T; onChange: (v: T) => void }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
      {items.map((it) => {
        const a = active === it.id;
        return (
          <button
            key={it.id}
            onClick={() => onChange(it.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              a ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {it.label}
            {it.count != null && (
              <span className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] ${a ? "bg-primary-foreground/20" : "bg-muted"}`}>
                {it.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function KpiCard({ label, value, sub, tone }: { label: string; value: string; sub: string; tone: "primary" | "info" | "warning" | "danger" | "success" }) {
  const toneCls: Record<string, string> = {
    primary: "text-primary",
    info: "text-[oklch(0.55_0.16_250)]",
    warning: "text-[oklch(0.65_0.18_60)]",
    danger: "text-[oklch(0.55_0.2_25)]",
    success: "text-primary",
  };
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
      <p className={`mt-1 text-xs ${toneCls[tone]}`}>{sub}</p>
    </div>
  );
}
