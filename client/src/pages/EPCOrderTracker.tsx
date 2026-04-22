import Navigation from '@/components/Navigation';
import SEOHead from '@/components/SEOHead';
import CosmicWave from '@/components/CosmicWave';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import {
  BarChart3,
  Building2,
  FileText,
  BookOpen,
  Mail,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Circle,
  Lock,
} from 'lucide-react';

const CONTACT_EMAIL = 'ca.sanjeevbatchali@gmail.com';

const tenders = [
  { id: 'TND-001', name: '400kV Transmission Line – Rajasthan', client: 'PGCIL', value: '₹ 320 Cr', status: 'Under Evaluation', mode: 'JV', deadline: '15 Jun 2025' },
  { id: 'TND-002', name: 'Water Treatment Plant – Pune', client: 'PCMC', value: '₹ 85 Cr', status: 'Won', mode: 'Solo', deadline: '30 Mar 2025' },
  { id: 'TND-003', name: 'Solar Power Plant 100 MW – Gujarat', client: 'GUVNL', value: '₹ 540 Cr', status: 'Lost', mode: 'JV', deadline: '10 Feb 2025' },
  { id: 'TND-004', name: 'Highway Package NH-48 – Karnataka', client: 'NHAI', value: '₹ 1,200 Cr', status: 'Open', mode: 'JV', deadline: '05 Aug 2025' },
  { id: 'TND-005', name: 'Sewage Treatment Plant – Chennai', client: 'CMWSSB', value: '₹ 110 Cr', status: 'Won', mode: 'Solo', deadline: '20 Jan 2025' },
];

const projects = [
  {
    id: 'PRJ-001', name: 'Water Treatment Plant – Pune', client: 'PCMC',
    value: '₹ 85 Cr', status: 'Under Construction', completion: 62,
    milestones: [
      { name: 'Design Approval', status: 'done' },
      { name: 'Civil Works', status: 'done' },
      { name: 'Mechanical Erection', status: 'active' },
      { name: 'Electrical & Instrumentation', status: 'pending' },
      { name: 'Commissioning', status: 'pending' },
    ],
  },
  {
    id: 'PRJ-002', name: 'Sewage Treatment Plant – Chennai', client: 'CMWSSB',
    value: '₹ 110 Cr', status: 'Completed', completion: 100,
    milestones: [
      { name: 'Design Approval', status: 'done' },
      { name: 'Civil Works', status: 'done' },
      { name: 'Mechanical Erection', status: 'done' },
      { name: 'Electrical & Instrumentation', status: 'done' },
      { name: 'Commissioning', status: 'done' },
    ],
  },
  {
    id: 'PRJ-003', name: '220kV Substation – Hyderabad', client: 'TSSPDCL',
    value: '₹ 47 Cr', status: 'Planning', completion: 15,
    milestones: [
      { name: 'Design Approval', status: 'active' },
      { name: 'Civil Works', status: 'pending' },
      { name: 'Equipment Erection', status: 'pending' },
      { name: 'Testing & Commissioning', status: 'pending' },
    ],
  },
];

const orderBook = [
  { sector: 'Water & Sanitation', projects: 2, value: '₹ 195 Cr', share: 25 },
  { sector: 'Power Transmission', projects: 1, value: '₹ 47 Cr', share: 6 },
  { sector: 'Highways', projects: 0, value: '₹ 0 Cr', share: 0 },
  { sector: 'Renewable Energy', projects: 0, value: '₹ 0 Cr', share: 0 },
];

const statusColor: Record<string, string> = {
  'Open': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  'Under Evaluation': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  'Won': 'bg-green-500/10 text-green-400 border-green-500/30',
  'Lost': 'bg-red-500/10 text-red-400 border-red-500/30',
  'Under Construction': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  'Completed': 'bg-green-500/10 text-green-400 border-green-500/30',
  'Planning': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
};

const milestoneIcon = (status: string) => {
  if (status === 'done') return <CheckCircle2 className="w-4 h-4 text-green-400" />;
  if (status === 'active') return <AlertCircle className="w-4 h-4 text-yellow-400" />;
  return <Circle className="w-4 h-4 text-muted-foreground/40" />;
};

type Tab = 'dashboard' | 'tenders' | 'projects' | 'orderbook';

export default function EPCOrderTracker() {
  const [tab, setTab] = useState<Tab>('dashboard');

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'tenders', label: 'Tenders', icon: <FileText className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Building2 className="w-4 h-4" /> },
    { id: 'orderbook', label: 'Order Book', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="EPC Order Tracker – Demo Preview"
        description="A lightweight preview of an EPC Order Tracker tool built by Sanjeev Batchali for managing tenders, projects, milestones, and order books in Engineering, Procurement & Construction."
        path="/devtools/epc-order-tracker"
      />
      <CosmicWave />
      <Navigation />

      <main className="relative z-10 pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-start gap-3 mb-3">
              <h1 className="font-accent text-3xl md:text-4xl font-bold">EPC Order Tracker</h1>
              <span className="mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Demo Preview
              </span>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              A full-stack EPC project management tool for tracking tenders, active projects, milestones, subcontractors, financials, and order book across Engineering, Procurement &amp; Construction engagements.
            </p>
          </div>

          {/* Contact banner */}
          <div className="mb-8 flex items-start gap-3 p-4 rounded-xl border border-primary/30 bg-primary/5">
            <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-sm mb-0.5">Want the full working version?</p>
              <p className="text-muted-foreground text-sm">
                This is a read-only demo with sample data. The complete application includes live database, authentication, document management, audit logs, and Excel exports.
                Contact me at{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>{' '}
                to get access to the working file.
              </p>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex gap-1 mb-6 p-1 bg-secondary/50 rounded-xl w-fit flex-wrap">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === t.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          {/* Dashboard Tab */}
          {tab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Active Projects', value: '2', icon: <Building2 className="w-5 h-5" />, color: 'text-blue-400' },
                  { label: 'Open Tenders', value: '2', icon: <FileText className="w-5 h-5" />, color: 'text-yellow-400' },
                  { label: 'Order Book Value', value: '₹ 242 Cr', icon: <BookOpen className="w-5 h-5" />, color: 'text-green-400' },
                  { label: 'Win Rate', value: '66%', icon: <TrendingUp className="w-5 h-5" />, color: 'text-purple-400' },
                ].map(stat => (
                  <Card key={stat.label} className="p-5">
                    <div className={`mb-3 ${stat.color}`}>{stat.icon}</div>
                    <div className="text-2xl font-bold font-accent mb-1">{stat.value}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-5">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" /> Recent Tenders
                  </h3>
                  <div className="space-y-3">
                    {tenders.slice(0, 3).map(t => (
                      <div key={t.id} className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.client} · {t.value}</p>
                        </div>
                        <Badge variant="outline" className={`shrink-0 text-xs ${statusColor[t.status]}`}>
                          {t.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-5">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" /> Project Progress
                  </h3>
                  <div className="space-y-4">
                    {projects.map(p => (
                      <div key={p.id}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="truncate font-medium">{p.name}</span>
                          <span className="text-muted-foreground shrink-0 ml-2">{p.completion}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${p.completion}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Tenders Tab */}
          {tab === 'tenders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-muted-foreground text-sm">{tenders.length} tenders · Sample data only</p>
              </div>
              {tenders.map(t => (
                <Card key={t.id} className="p-5">
                  <div className="flex flex-wrap gap-4 justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs text-muted-foreground font-mono">{t.id}</span>
                        <Badge variant="outline" className={`text-xs ${statusColor[t.status]}`}>{t.status}</Badge>
                        <Badge variant="outline" className="text-xs">{t.mode}</Badge>
                      </div>
                      <h3 className="font-semibold">{t.name}</h3>
                      <p className="text-muted-foreground text-sm mt-0.5">{t.client}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-lg">{t.value}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end mt-1">
                        <Clock className="w-3 h-3" /> {t.deadline}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Projects Tab */}
          {tab === 'projects' && (
            <div className="space-y-6">
              {projects.map(p => (
                <Card key={p.id} className="p-5">
                  <div className="flex flex-wrap gap-4 justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs text-muted-foreground font-mono">{p.id}</span>
                        <Badge variant="outline" className={`text-xs ${statusColor[p.status]}`}>{p.status}</Badge>
                      </div>
                      <h3 className="font-semibold">{p.name}</h3>
                      <p className="text-muted-foreground text-sm">{p.client} · {p.value}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-2xl font-bold font-accent">{p.completion}%</div>
                      <div className="text-xs text-muted-foreground">Complete</div>
                    </div>
                  </div>

                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-4">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${p.completion}%` }} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Milestones</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {p.milestones.map(m => (
                        <div key={m.name} className="flex items-center gap-2 text-sm">
                          {milestoneIcon(m.status)}
                          <span className={m.status === 'pending' ? 'text-muted-foreground' : ''}>{m.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Order Book Tab */}
          {tab === 'orderbook' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-5 md:col-span-2">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" /> Order Book by Sector
                  </h3>
                  <div className="space-y-4">
                    {orderBook.map(ob => (
                      <div key={ob.sector}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium">{ob.sector}</span>
                          <span className="text-muted-foreground">{ob.value} · {ob.projects} project{ob.projects !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary/70 transition-all"
                            style={{ width: `${ob.share}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-5">
                  <h3 className="font-semibold mb-4">Summary</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { label: 'Total Order Book', value: '₹ 242 Cr' },
                      { label: 'Active Projects', value: '2' },
                      { label: 'Completed Projects', value: '1' },
                      { label: 'Sectors', value: '2' },
                    ].map(r => (
                      <div key={r.label} className="flex justify-between border-b border-border/40 pb-2 last:border-0 last:pb-0">
                        <span className="text-muted-foreground">{r.label}</span>
                        <span className="font-medium">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold mb-2">Full Version Includes</h3>
                    <ul className="text-sm text-muted-foreground space-y-1.5 mt-3">
                      {[
                        'Live database & authentication',
                        'Document management & uploads',
                        'Subcontractor & JV partner tracking',
                        'Financial schedules & billing',
                        'Audit trail & activity log',
                        'Excel export',
                      ].map(f => (
                        <li key={f} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-5 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Request Working Version
                  </a>
                </Card>
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="mt-10 pt-6 border-t border-border/40 text-center text-sm text-muted-foreground">
            All data shown is sample / illustrative only. &nbsp;·&nbsp; Built by Sanjeev Batchali
          </div>

        </div>
      </main>
    </div>
  );
}
