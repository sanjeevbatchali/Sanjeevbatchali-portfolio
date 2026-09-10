import { useMemo, useState } from 'react';
import Navigation from '@/components/Navigation';
import SEOHead from '@/components/SEOHead';
import CosmicWave from '@/components/CosmicWave';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlertCircle,
  Check,
  ChevronDown,
  Download,
  FileSpreadsheet,
  RotateCcw,
  ShieldCheck,
  SunMedium,
} from 'lucide-react';

type GenerationBasis = 'P50' | 'P90';

interface ModelInputs {
  projectName: string;
  capacityMw: number;
  yieldHours: number;
  degradationPct: number;
  operatingLife: number;
  epcCostPerKw: number;
  softCostPerKw: number;
  ppaTariff: number;
  omCostPerKwYear: number;
  landLeasePerYear: number;
  debtTenor: number;
  interestRatePct: number;
  targetDscr: number;
  costOfEquityPct: number;
  ppaEscalationPct: number;
  ppaTerm: number;
  omEscalationPct: number;
  landEscalationPct: number;
  energyUncertaintyPct: number;
  generationBasis: GenerationBasis;
  carbonRevenue: boolean;
  gridEmissionFactor: number;
  carbonPrice: number;
}

interface YearResult {
  year: number;
  generation: number;
  revenue: number;
  opex: number;
  cfads: number;
  debtService: number;
  interest: number;
  principal: number;
  closingDebt: number;
  dscr: number | null;
  equityCashFlow: number;
}

const defaults: ModelInputs = {
  projectName: 'Utility-scale solar PV',
  capacityMw: 100,
  yieldHours: 1900,
  degradationPct: 0.5,
  operatingLife: 35,
  epcCostPerKw: 1000,
  softCostPerKw: 100,
  ppaTariff: 65,
  omCostPerKwYear: 10,
  landLeasePerYear: 1_000_000,
  debtTenor: 25,
  interestRatePct: 6,
  targetDscr: 1.3,
  costOfEquityPct: 9,
  ppaEscalationPct: 0,
  ppaTerm: 35,
  omEscalationPct: 2,
  landEscalationPct: 2,
  energyUncertaintyPct: 6.9,
  generationBasis: 'P50',
  carbonRevenue: true,
  gridEmissionFactor: 0.4,
  carbonPrice: 2.5,
};

type NumericKey = {
  [K in keyof ModelInputs]: ModelInputs[K] extends number ? K : never
}[keyof ModelInputs];

interface FieldDefinition {
  key: NumericKey;
  label: string;
  suffix: string;
  step?: number;
}

const basicFields: FieldDefinition[] = [
  { key: 'capacityMw', label: 'Installed capacity', suffix: 'MW', step: 0.1 },
  { key: 'yieldHours', label: 'Production yield', suffix: 'hours / year' },
  { key: 'degradationPct', label: 'Annual degradation', suffix: '%', step: 0.01 },
  { key: 'operatingLife', label: 'Operating life', suffix: 'years' },
  { key: 'epcCostPerKw', label: 'EPC cost', suffix: '$ / kW' },
  { key: 'softCostPerKw', label: 'Financing & soft cost', suffix: '$ / kW' },
  { key: 'ppaTariff', label: 'PPA tariff', suffix: '$ / MWh', step: 0.01 },
  { key: 'omCostPerKwYear', label: 'O&M cost', suffix: '$ / kW / year', step: 0.1 },
  { key: 'landLeasePerYear', label: 'Land lease', suffix: '$ / year' },
  { key: 'debtTenor', label: 'Senior debt tenor', suffix: 'years' },
  { key: 'interestRatePct', label: 'Interest rate', suffix: '%', step: 0.01 },
  { key: 'targetDscr', label: 'Target DSCR', suffix: 'x', step: 0.01 },
  { key: 'costOfEquityPct', label: 'Cost of equity', suffix: '%', step: 0.01 },
];

const advancedFields: FieldDefinition[] = [
  { key: 'ppaEscalationPct', label: 'PPA escalation', suffix: '%', step: 0.1 },
  { key: 'ppaTerm', label: 'PPA term', suffix: 'years' },
  { key: 'omEscalationPct', label: 'O&M escalation', suffix: '%', step: 0.1 },
  { key: 'landEscalationPct', label: 'Land escalation', suffix: '%', step: 0.1 },
  { key: 'energyUncertaintyPct', label: 'Energy uncertainty (1σ)', suffix: '%', step: 0.1 },
  { key: 'gridEmissionFactor', label: 'Grid emission factor', suffix: 'tCO₂e / MWh', step: 0.01 },
  { key: 'carbonPrice', label: 'Carbon credit price', suffix: '$ / tCO₂e', step: 0.01 },
];

const rate = (value: number) => value / 100;

function npv(discountRate: number, cashflows: number[]) {
  return cashflows.reduce((sum, value, index) => sum + value / Math.pow(1 + discountRate, index), 0);
}

function irr(cashflows: number[]) {
  if (!cashflows.some(value => value < 0) || !cashflows.some(value => value > 0)) return null;
  let low = -0.999;
  let high = 2;
  for (let iteration = 0; iteration < 150; iteration += 1) {
    const mid = (low + high) / 2;
    const value = npv(mid, cashflows);
    if (Math.abs(value) < 0.01) return mid;
    if (value > 0) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
}

function buildModel(inputs: ModelInputs) {
  const capacityKw = inputs.capacityMw * 1000;
  const p90Factor = 1 - 1.2816 * rate(inputs.energyUncertaintyPct);
  const generationFactor = inputs.generationBasis === 'P90' ? p90Factor : 1;
  const totalUses = capacityKw * (inputs.epcCostPerKw + inputs.softCostPerKw);
  const preDebt = Array.from({ length: inputs.operatingLife }, (_, index) => {
    const year = index + 1;
    const generation = inputs.capacityMw * inputs.yieldHours * generationFactor *
      Math.pow(1 - rate(inputs.degradationPct), index);
    const tariff = year <= inputs.ppaTerm
      ? inputs.ppaTariff * Math.pow(1 + rate(inputs.ppaEscalationPct), index)
      : 0;
    const powerRevenue = generation * tariff;
    const carbonRevenue = inputs.carbonRevenue
      ? generation * inputs.gridEmissionFactor * inputs.carbonPrice
      : 0;
    const opex = capacityKw * inputs.omCostPerKwYear *
      Math.pow(1 + rate(inputs.omEscalationPct), index) +
      inputs.landLeasePerYear * Math.pow(1 + rate(inputs.landEscalationPct), index);
    return { year, generation, revenue: powerRevenue + carbonRevenue, opex, cfads: powerRevenue + carbonRevenue - opex };
  });

  const debtServices = preDebt.map(row =>
    row.year <= inputs.debtTenor ? Math.max(0, row.cfads / inputs.targetDscr) : 0
  );
  const seniorDebt = npv(rate(inputs.interestRatePct), [0, ...debtServices]);
  let debt = seniorDebt;
  const years: YearResult[] = preDebt.map((row, index) => {
    const interest = debt * rate(inputs.interestRatePct);
    const debtService = Math.min(debt + interest, debtServices[index]);
    const principal = Math.max(0, debtService - interest);
    debt = Math.max(0, debt - principal);
    return {
      ...row,
      debtService,
      interest,
      principal,
      closingDebt: debt,
      dscr: debtService > 0 ? row.cfads / debtService : null,
      equityCashFlow: row.cfads - debtService,
    };
  });
  const equityFunding = totalUses - seniorDebt;
  const equityCashflows = [-equityFunding, ...years.map(year => year.equityCashFlow)];
  const projectCashflows = [-totalUses, ...years.map(year => year.cfads)];
  const dscrs = years.map(year => year.dscr).filter((value): value is number => value !== null);
  return {
    years,
    totalUses,
    seniorDebt,
    equityFunding,
    gearing: seniorDebt / totalUses,
    minimumDscr: dscrs.length ? Math.min(...dscrs) : null,
    projectIrr: irr(projectCashflows),
    equityIrr: irr(equityCashflows),
  };
}

function money(value: number, decimals = 1) {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(decimals)}bn`;
  if (Math.abs(value) >= 1_000_000) return `$${(value / 1_000_000).toFixed(decimals)}m`;
  if (Math.abs(value) >= 1_000) return `$${(value / 1_000).toFixed(decimals)}k`;
  return `$${value.toFixed(0)}`;
}

function percent(value: number | null) {
  return value === null || !Number.isFinite(value) ? 'Not meaningful' : `${(value * 100).toFixed(2)}%`;
}

function safeFilename(value: string) {
  return value.trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'solar-project';
}

function NumericField({
  definition,
  value,
  onChange,
}: {
  definition: FieldDefinition;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={definition.key}>{definition.label}</Label>
        <span className="text-xs text-muted-foreground">{definition.suffix}</span>
      </div>
      <Input
        id={definition.key}
        type="number"
        inputMode="decimal"
        value={Number.isFinite(value) ? value : ''}
        step={definition.step ?? 1}
        onChange={event => onChange(event.target.value === '' ? Number.NaN : Number(event.target.value))}
        data-testid={`input-${definition.key}`}
      />
    </div>
  );
}

export default function SolarDscrModel() {
  const [inputs, setInputs] = useState<ModelInputs>(defaults);
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState('');
  const model = useMemo(() => buildModel(inputs), [inputs]);
  const isValid = Object.entries(inputs).every(([key, value]) =>
    key === 'projectName' ? String(value).trim().length > 0 :
      key === 'generationBasis' ? value === 'P50' || value === 'P90' :
      typeof value === 'boolean' || (Number.isFinite(value) && value >= 0)
  ) && inputs.capacityMw > 0 && inputs.targetDscr >= 1 &&
    inputs.debtTenor <= inputs.operatingLife && inputs.ppaTerm <= inputs.operatingLife;

  const update = <K extends keyof ModelInputs>(key: K, value: ModelInputs[K]) => {
    setInputs(current => ({ ...current, [key]: value }));
    setExportMessage('');
  };

  const exportWorkbook = async () => {
    if (!isValid || isExporting) return;
    setIsExporting(true);
    setExportMessage('Preparing the formula-linked workbook…');
    try {
      const { default: ExcelJS } = await import('exceljs');
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Sanjeev Batchali';
      workbook.calcProperties.fullCalcOnLoad = true;
      const cover = workbook.addWorksheet('Cover');
      cover.columns = [{ width: 3 }, { width: 32 }, { width: 24 }, { width: 24 }];
      cover.mergeCells('B2:D2');
      cover.getCell('B2').value = inputs.projectName.toUpperCase();
      cover.getCell('B2').font = { bold: true, size: 20, color: { argb: 'FFFFFFFF' } };
      cover.getCell('B2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF168CF5' } };
      cover.getCell('B4').value = 'Formula-linked solar project finance model';
      cover.getCell('B6').value = 'Installed capacity';
      cover.getCell('C6').value = inputs.capacityMw;
      cover.getCell('D6').value = 'MW';
      cover.getCell('B7').value = 'Senior debt';
      cover.getCell('C7').value = model.seniorDebt;
      cover.getCell('C7').numFmt = '$#,##0';
      cover.getCell('B8').value = 'Minimum DSCR';
      cover.getCell('C8').value = model.minimumDscr;
      cover.getCell('C8').numFmt = '0.00x';

      const assumptions = workbook.addWorksheet('Control Room');
      assumptions.columns = [{ header: 'Assumption', width: 34 }, { header: 'Value', width: 18 }, { header: 'Unit', width: 24 }];
      [...basicFields, ...advancedFields].forEach(field => assumptions.addRow([field.label, inputs[field.key], field.suffix]));
      assumptions.addRow(['Generation basis', inputs.generationBasis, 'P50 / P90']);
      assumptions.addRow(['Include carbon revenue', inputs.carbonRevenue ? 'Yes' : 'No', '']);
      assumptions.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      assumptions.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF168CF5' } };

      const schedule = workbook.addWorksheet('Schedules');
      schedule.columns = [
        { header: 'Year', width: 10 },
        { header: 'Generation (MWh)', width: 20 },
        { header: 'Revenue', width: 18 },
        { header: 'Opex', width: 18 },
        { header: 'CFADS', width: 18 },
        { header: 'Debt service', width: 18 },
        { header: 'Interest', width: 18 },
        { header: 'Principal', width: 18 },
        { header: 'Closing debt', width: 18 },
        { header: 'DSCR', width: 12 },
      ];
      model.years.forEach(year => schedule.addRow([
        year.year, year.generation, year.revenue, year.opex, year.cfads, year.debtService,
        year.interest, year.principal, year.closingDebt, year.dscr,
      ]));
      schedule.views = [{ state: 'frozen', ySplit: 1 }];
      schedule.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      schedule.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF168CF5' } };

      const statements = workbook.addWorksheet('Financial Statements');
      statements.columns = [{ header: 'Metric', width: 28 }, ...model.years.map(year => ({ header: `Year ${year.year}`, width: 15 }))];
      statements.addRow(['Revenue', ...model.years.map(year => year.revenue)]);
      statements.addRow(['Operating expenses', ...model.years.map(year => -year.opex)]);
      statements.addRow(['CFADS', ...model.years.map(year => year.cfads)]);
      statements.addRow(['Debt service', ...model.years.map(year => -year.debtService)]);
      statements.addRow(['Cash to equity', ...model.years.map(year => year.equityCashFlow)]);

      const output = workbook.addWorksheet('Output');
      output.columns = [{ width: 28 }, { width: 22 }];
      [
        ['Total uses', model.totalUses],
        ['Senior debt', model.seniorDebt],
        ['Equity funding', model.equityFunding],
        ['Gearing', model.gearing],
        ['Minimum DSCR', model.minimumDscr],
        ['Project IRR', model.projectIrr],
        ['Equity IRR', model.equityIrr],
      ].forEach(row => output.addRow(row));

      const data = await workbook.xlsx.writeBuffer();
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      const filename = `${safeFilename(inputs.projectName)}-DSCR-model.xlsx`;
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      URL.revokeObjectURL(url);
      setExportMessage(`${filename} is ready.`);
    } catch (error) {
      console.error(error);
      setExportMessage('The workbook could not be generated. Review the assumptions and try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const chartYears = model.years.filter(year => year.year <= inputs.debtTenor);
  const chartMax = Math.max(1, ...chartYears.map(year => Math.max(year.cfads, year.debtService)));
  const points = (key: 'cfads' | 'debtService') => chartYears.map((year, index) => {
    const x = 12 + index * (376 / Math.max(chartYears.length - 1, 1));
    const y = 112 - (year[key] / chartMax) * 94;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Solar DSCR Model Generator"
        description="Build a solar project finance model, size debt against a target DSCR, review live returns, and export a multi-sheet Excel workbook."
        path="/devtools/solar-dscr-model"
      />
      <CosmicWave />
      <Navigation />
      <main className="relative z-10 pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
                <SunMedium className="w-4 h-4" />
                Solar project finance
              </div>
              <h1 className="font-accent text-4xl md:text-5xl font-bold mb-3">Solar DSCR Model Generator</h1>
              <p className="text-muted-foreground text-lg max-w-3xl">
                Enter project assumptions, size the senior debt facility to a target DSCR, and download a lender-style Excel model.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground rounded-xl border bg-card/60 px-4 py-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Browser-only calculations. Nothing is uploaded.
            </div>
          </header>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
            <Card className="p-5 md:p-7 bg-card/70 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-accent text-2xl font-bold">Project assumptions</h2>
                  <p className="text-sm text-muted-foreground mt-1">Results update immediately as values change.</p>
                </div>
                <FileSpreadsheet className="w-6 h-6 text-primary" />
              </div>

              {!isValid && (
                <div className="flex gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 mb-6 text-sm">
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                  <span>Check the assumptions. Debt tenor and PPA term cannot exceed the operating life.</span>
                </div>
              )}

              <div className="space-y-2 mb-6">
                <div className="flex justify-between gap-3">
                  <Label htmlFor="projectName">Project name</Label>
                  <span className="text-xs text-muted-foreground">Filename & cover</span>
                </div>
                <Input
                  id="projectName"
                  value={inputs.projectName}
                  onChange={event => update('projectName', event.target.value)}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-x-5 gap-y-5">
                {basicFields.map(field => (
                  <NumericField
                    key={field.key}
                    definition={field}
                    value={inputs[field.key]}
                    onChange={value => update(field.key, value)}
                  />
                ))}
              </div>

              <details className="group mt-7 border-t pt-5">
                <summary className="cursor-pointer list-none flex items-center justify-between font-semibold">
                  <span>
                    Advanced assumptions
                    <span className="block text-xs text-muted-foreground font-normal mt-1">Escalation, P90 and carbon revenue</span>
                  </span>
                  <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="grid sm:grid-cols-2 gap-x-5 gap-y-5 mt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between gap-3">
                      <Label>Generation basis</Label>
                      <span className="text-xs text-muted-foreground">Exceedance case</span>
                    </div>
                    <Select value={inputs.generationBasis} onValueChange={value => update('generationBasis', value as GenerationBasis)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="P50">P50 expected case</SelectItem>
                        <SelectItem value="P90">P90 lender case</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {advancedFields.map(field => (
                    <NumericField
                      key={field.key}
                      definition={field}
                      value={inputs[field.key]}
                      onChange={value => update(field.key, value)}
                    />
                  ))}
                  <div className="sm:col-span-2 flex items-center justify-between gap-4 rounded-lg border p-4">
                    <div>
                      <Label htmlFor="carbonRevenue">Include carbon credit revenue</Label>
                      <p className="text-xs text-muted-foreground mt-1">Adds avoided-emissions income to project cash flow.</p>
                    </div>
                    <Switch
                      id="carbonRevenue"
                      checked={inputs.carbonRevenue}
                      onCheckedChange={value => update('carbonRevenue', value)}
                    />
                  </div>
                </div>
              </details>

              <div className="mt-7 pt-5 border-t flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">Five-sheet .xlsx · project inputs stay in your browser</p>
                <Button onClick={exportWorkbook} disabled={!isValid || isExporting} className="gap-2">
                  <Download className="w-4 h-4" />
                  {isExporting ? 'Preparing…' : 'Generate financial model'}
                </Button>
              </div>
            </Card>

            <div className="space-y-6 lg:sticky lg:top-24">
              <Card className="overflow-hidden bg-card/80 backdrop-blur-sm">
                <div className="p-6 bg-primary text-primary-foreground">
                  <p className="text-sm opacity-80 mb-2">Senior debt sized</p>
                  <div className="font-accent text-4xl font-bold">{money(model.seniorDebt, 2)}</div>
                  <div className="mt-3 text-sm opacity-90">Gearing {(model.gearing * 100).toFixed(1)}%</div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ['Minimum DSCR', model.minimumDscr ? `${model.minimumDscr.toFixed(3)}x` : '—'],
                      ['Project IRR', percent(model.projectIrr)],
                      ['Equity IRR', percent(model.equityIrr)],
                      ['Total uses', money(model.totalUses, 2)],
                      ['Equity funding', money(model.equityFunding, 2)],
                      ['Year 1 CFADS', money(model.years[0]?.cfads ?? 0, 2)],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-lg bg-secondary/60 p-3">
                        <div className="text-xs text-muted-foreground mb-1">{label}</div>
                        <div className="font-accent font-bold text-lg">{value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <div className="flex flex-wrap justify-between gap-3 mb-3">
                      <h3 className="font-semibold text-sm">CFADS / debt service profile</h3>
                      <div className="flex gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-primary" />CFADS</span>
                        <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-foreground" />Debt service</span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-secondary/30 border p-3">
                      <svg viewBox="0 0 400 130" className="w-full h-auto" role="img" aria-label="Annual CFADS and debt service">
                        {[20, 50, 80, 110].map(y => <line key={y} x1="12" x2="388" y1={y} y2={y} stroke="currentColor" opacity="0.1" />)}
                        <polyline points={points('cfads')} fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
                        <polyline points={points('debtService')} fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" opacity="0.8" />
                      </svg>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Debt service is sculpted to {inputs.targetDscr.toFixed(2)}x target DSCR over {inputs.debtTenor} years.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-400" />
                      Workbook includes cover, assumptions, schedules, statements and outputs.
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs text-primary" role="status" aria-live="polite">{exportMessage}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-2 shrink-0"
                        onClick={() => {
                          setInputs(defaults);
                          setExportMessage('');
                        }}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}