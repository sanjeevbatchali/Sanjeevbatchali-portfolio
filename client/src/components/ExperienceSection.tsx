import { useState } from 'react';
import ExperienceCard from './ExperienceCard';
import { Pill, HardHat, Utensils, Laptop, Zap, Fuel, Briefcase, Target, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const HighlightedText = ({ text }: { text: string }) => {
  const highlights = [
    'transaction advisory',
    'debt restructuring',
    'special situations',
    'CIRP',
    'financial modeling',
    'fundraising',
    'M&A',
    'operational turnarounds',
    'bidding efficiency',
    'business development',
    'investor relations',
    'data-driven insights',
    '70%',
    '₹',
    'Cr',
    'bps',
    'INR',
    '30% reduction',
    'Power BI',
    'Alteryx',
    'Excel',
    'SPV',
    'EPC',
    'MIS',
    'IRR',
    'kWh',
    'DSCR',
    'CIM',
    'IM',
    'KPI',
    'IC'
  ];

  let result = text;
  highlights.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
    result = result.replace(regex, '<strong class="font-semibold">$1</strong>');
  });

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
};

export default function ExperienceSection() {
  const [view, setView] = useState<'industry' | 'functional'>('industry');
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const industries = [
    { 
      name: 'Infra and EPC', 
      icon: HardHat,
      experience: [
        "Advised infrastructure SPVs with aggregate asset value exceeding ₹5,000 Cr across road and power projects.",
        "Improved toll revenue visibility by ~30% through traffic audits and MIS redesign for road SPVs.",
        "Structured EPC and infrastructure debt raises totalling ₹400+ Cr with PSU lenders.",
        "Built traffic forecasting and cost benchmarking models reducing bid assumptions variance by ~20%.",
        "Delivered CIRP bid advisory for infrastructure assets with approval probability improved by ~25%."
      ]
    },
    { 
      name: 'Renewable Energy', 
      icon: Zap,
      experience: [
        "Developed financial models for solar projects aggregating ₹9,000 Cr enterprise value.",
        "Conducted viability analysis improving IRR visibility by 150–200 bps for renewable investors.",
        "Benchmarked cost-per-kWh across portfolios exceeding 500 MW capacity.",
        "Supported funding rounds and refinancing strategies for renewable SPVs worth ₹1,000+ Cr.",
        "Automated performance dashboards reducing monitoring effort by ~40% for renewable portfolios."
      ]
    },
    { 
      name: 'Non-Renewable Energy', 
      icon: Fuel,
      experience: [
        "Executed ₹400 Cr project finance deal for coal mining expansion with PSU lender.",
        "Built integrated cash flow and DSCR models improving lender confidence and sanction timelines.",
        "Conducted operational and financial diligence for mining assets with >20% cost optimization insights.",
        "Supported refinancing strategies improving debt service coverage by ~1.3x post-restructuring.",
        "Delivered turnaround advisory improving stressed asset profitability by ~30%."
      ]
    },
    { 
      name: 'Pharma', 
      icon: Pill,
      experience: [
        "Facilitated stress funding mandate of ₹100 Cr for mid-sized pharmaceutical company.",
        "Conducted financial due diligence improving acquisition risk visibility by ~35%.",
        "Built valuation and scenario models supporting equity and debt raises of ₹50+ Cr.",
        "Supported refinancing strategies reducing average borrowing cost by ~150 bps.",
        "Prepared investor materials improving funding closure timelines by ~25%."
      ]
    },
    { 
      name: 'F&B', 
      icon: Utensils,
      experience: [
        "Led acquisition negotiations achieving 30% reduction in purchase consideration.",
        "Performed operational and financial diligence identifying ~20% margin improvement levers.",
        "Built profitability and break-even models improving decision turnaround by ~40%.",
        "Structured transaction economics supporting successful buy-side investment decisions.",
        "Delivered post-deal MIS improving monthly performance tracking accuracy by ~25%."
      ]
    },
    { 
      name: 'IT & ITES', 
      icon: Laptop,
      experience: [
        "Conducted financial analysis for technology-driven business models with scalable cost structures.",
        "Built dashboard-led MIS improving management reporting turnaround by ~50%.",
        "Supported valuation and benchmarking exercises for asset-light IT businesses.",
        "Improved data accuracy and reconciliation efficiency by ~30% using automation tools.",
        "Delivered analytical support for investment evaluation with sub-10 day turnaround."
      ]
    }
  ] as const;

  const functionalAreas = [
    {
      name: 'Fund Raise',
      experience: [
        "Executed debt and stress funding mandates exceeding ₹500 Cr across sectors.",
        "Closed ₹400 Cr project finance transaction with PSU lender under tight timelines.",
        "Structured funding strategies improving sanction probability by ~30%.",
        "Built investor-ready financial models reducing diligence queries by ~40%.",
        "Supported fundraising for renewable portfolios aggregating ₹9,000 Cr enterprise value."
      ]
    },
    {
      name: 'Management Consultancy',
      experience: [
        "Delivered turnaround strategies improving client profitability by ~30% on stressed assets.",
        "Advised SPVs on operational and financial restructuring across 10+ engagements.",
        "Led cross-functional teams delivering insights within 3–4 week timelines.",
        "Provided C-suite decision support through data-backed strategic recommendations.",
        "Improved process efficiency by ~25% through automation and MIS redesign."
      ]
    },
    {
      name: 'Financial Modelling',
      experience: [
        "Built 3-statement, DCF, and project finance models exceeding ₹10,000 Cr valuation exposure.",
        "Developed scenario and sensitivity models improving capital structure decisions by ~20%.",
        "Designed DSCR and cash flow models for debt raises averaging ₹50 Cr.",
        "Automated model workflows reducing build time by ~35%.",
        "Delivered investment-grade models used for IC and lender approvals."
      ]
    },
    {
      name: 'Pitch Decks & Management Decks',
      experience: [
        "Prepared investor decks supporting fundraising and acquisitions worth ₹1,000+ Cr.",
        "Converted complex data into board-ready insights within 7–10 days.",
        "Improved investor engagement rates by ~30% through sharper financial storytelling.",
        "Built CIMs and IMs covering market, financials, and risk analysis.",
        "Standardized deck templates reducing preparation effort by ~40%."
      ]
    },
    {
      name: 'FP&A',
      experience: [
        "Built forecasting and budgeting models improving variance visibility by ~25%.",
        "Designed MIS dashboards tracking KPIs across multi-entity structures.",
        "Improved monthly close and reporting timelines by ~30%.",
        "Delivered performance insights supporting margin improvement initiatives.",
        "Enabled leadership decision-making through real-time financial dashboards."
      ]
    },
    {
      name: 'Mergers & Acquisitions',
      experience: [
        "Conducted buy-side diligence for acquisitions delivering ~30% deal cost optimization.",
        "Evaluated 7+ competitors for horizontal acquisition strategy.",
        "Led valuation and negotiation support for CIRP acquisitions.",
        "Built acquisition models assessing synergy and downside risk scenarios.",
        "Supported transactions from evaluation to closure within 60–90 days."
      ]
    },
    {
      name: 'Due Diligence',
      experience: [
        "Executed financial and operational diligence across 15+ engagements.",
        "Identified key risk items reducing post-deal surprises by ~40%.",
        "Conducted compliance, credit, and commercial diligence across sectors.",
        "Delivered diligence reports within compressed timelines of 2–3 weeks.",
        "Supported investment committees with concise, decision-focused insights."
      ]
    },
    {
      name: 'Financial Reporting',
      experience: [
        "Designed MIS frameworks improving reporting accuracy by ~25%.",
        "Automated dashboards reducing manual reporting effort by ~40%.",
        "Delivered management reports for senior leadership and boards.",
        "Standardized financial reporting across multi-entity structures.",
        "Improved data reconciliation and control effectiveness by ~30%."
      ]
    }
  ] as const;

  const currentData = view === 'industry' ? industries : functionalAreas;
  const activeItem = currentData[activeCategory];

  return (
    <section className="min-h-screen py-16 md:py-24 px-6 md:px-12 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent font-bold text-4xl md:text-5xl lg:text-6xl mb-12 text-center" data-testid="text-section-title">
          Experience
        </h2>

        {/* Work History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          <Card className="p-6 border-accent-border/20 bg-card/50 backdrop-blur-sm hover-elevate" data-testid="card-work-fpc">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-accent font-bold text-lg text-foreground">First Partner Consulting</h3>
                <p className="text-primary font-semibold text-sm mt-1">Associate Manager</p>
                <p className="text-muted-foreground text-sm">Transaction Advisory</p>
                <p className="text-muted-foreground text-xs mt-2 font-medium uppercase tracking-wider">Sept 2024 - Present</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-accent-border/20 bg-card/50 backdrop-blur-sm hover-elevate" data-testid="card-work-ey">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-accent font-bold text-lg text-foreground">Ernst and Young</h3>
                <p className="text-primary font-semibold text-sm mt-1">Associate - Debt and Special Situations</p>
                <p className="text-muted-foreground text-xs mt-2 font-medium uppercase tracking-wider">Jan 2023 - Aug 2024</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <Button 
            variant={view === 'industry' ? 'default' : 'outline'}
            onClick={() => { setView('industry'); setActiveCategory(0); }}
            className="min-h-10 px-6 rounded-full"
            data-testid="button-view-industry"
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Industry
          </Button>
          <Button 
            variant={view === 'functional' ? 'default' : 'outline'}
            onClick={() => { setView('functional'); setActiveCategory(0); }}
            className="min-h-10 px-6 rounded-full"
            data-testid="button-view-functional"
          >
            <Target className="w-4 h-4 mr-2" />
            Functional
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 min-h-[500px]">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/3 space-y-2">
            {currentData.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 text-left group",
                  activeCategory === index 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 translate-x-2" 
                    : "bg-card hover:bg-accent border border-accent-border/10"
                )}
                data-testid={`button-category-${index}`}
              >
                <div className="flex items-center gap-3">
                  {view === 'industry' && 'icon' in item && item.icon && (
                    <item.icon className={cn("w-5 h-5", activeCategory === index ? "text-primary-foreground" : "text-primary")} />
                  )}
                  {view === 'functional' && (
                    <div className={cn("w-1.5 h-4 rounded-full", activeCategory === index ? "bg-primary-foreground" : "bg-primary")} />
                  )}
                  <span className="font-semibold text-sm md:text-base">{item.name}</span>
                </div>
                <ChevronRight className={cn(
                  "w-4 h-4 transition-transform",
                  activeCategory === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )} />
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${view}-${activeCategory}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="h-full p-8 md:p-10 border-accent-border/20 bg-card/50 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-8">
                    {view === 'industry' && 'icon' in activeItem && activeItem.icon && (
                      <div className="p-3 rounded-2xl bg-primary/10">
                        <activeItem.icon className="w-8 h-8 text-primary" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold font-accent text-foreground">
                        {activeItem.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 uppercase tracking-wider font-semibold">
                        {view === 'industry' ? 'Sector Analysis' : 'Functional Expertise'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {activeItem.experience.map((exp, i) => (
                      <div 
                        key={i} 
                        className="group relative pl-6 transition-all duration-300 hover:translate-x-1"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/20 group-hover:bg-primary transition-colors" />
                        <div className="absolute left-[-4px] top-[10px] w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                          <HighlightedText text={exp} />
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-accent-border/10 flex items-center justify-between text-xs text-muted-foreground font-medium uppercase tracking-widest">
                    <span>Quantified Impact</span>
                    <span>{activeItem.experience.length} Key Achievements</span>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}


