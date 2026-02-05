import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, BarChart3, Calculator, PieChart, TrendingUp, Building2, Briefcase, Target } from 'lucide-react';
import CosmicWave from '@/components/CosmicWave';

interface WorkItem {
  title: string;
  description: string;
  category: string;
  icon: any;
  highlights: string[];
}

const workItems: WorkItem[] = [
  {
    title: "Infrastructure Project Finance",
    description: "Structured and executed project finance deals for road and power infrastructure SPVs with aggregate asset value exceeding INR 5,000 Cr.",
    category: "Transaction Advisory",
    icon: Building2,
    highlights: [
      "INR 400+ Cr debt structuring with PSU lenders",
      "Traffic forecasting and cost benchmarking models",
      "30% improvement in toll revenue visibility"
    ]
  },
  {
    title: "Renewable Energy Valuations",
    description: "Developed comprehensive financial models for solar projects with enterprise value aggregating INR 9,000 Cr, supporting investor decisions.",
    category: "Financial Modelling",
    icon: TrendingUp,
    highlights: [
      "150-200 bps IRR visibility improvement",
      "500+ MW portfolio benchmarking",
      "Automated performance dashboards"
    ]
  },
  {
    title: "Debt Restructuring & Special Situations",
    description: "Led turnaround advisory for stressed assets, improving profitability and supporting refinancing strategies across multiple sectors.",
    category: "Restructuring",
    icon: Target,
    highlights: [
      "1.3x DSCR improvement post-restructuring",
      "30% profitability improvement on stressed assets",
      "Stress funding mandates exceeding INR 500 Cr"
    ]
  },
  {
    title: "M&A Transaction Support",
    description: "Conducted buy-side due diligence and valuation support for acquisitions, delivering significant deal cost optimization.",
    category: "Mergers & Acquisitions",
    icon: Briefcase,
    highlights: [
      "30% deal cost optimization achieved",
      "7+ competitor evaluations for horizontal acquisition",
      "60-90 day transaction closure timelines"
    ]
  },
  {
    title: "Investor Materials & Pitch Decks",
    description: "Prepared investor-ready CIMs and pitch decks supporting fundraising and acquisitions worth INR 1,000+ Cr.",
    category: "Pitch Decks",
    icon: FileText,
    highlights: [
      "30% improvement in investor engagement",
      "7-10 day turnaround for board-ready insights",
      "Standardized templates reducing prep time by 40%"
    ]
  },
  {
    title: "FP&A & Management Reporting",
    description: "Built forecasting, budgeting, and MIS dashboards improving variance visibility and decision-making across organizations.",
    category: "FP&A",
    icon: BarChart3,
    highlights: [
      "25% variance visibility improvement",
      "30% faster monthly close timelines",
      "Real-time financial dashboards for leadership"
    ]
  },
  {
    title: "Project Finance Models",
    description: "Developed 3-statement, DCF, and DSCR models for debt raises and investment committee approvals.",
    category: "Financial Modelling",
    icon: Calculator,
    highlights: [
      "INR 10,000+ Cr valuation exposure",
      "35% reduction in model build time",
      "Investment-grade IC approval models"
    ]
  },
  {
    title: "Due Diligence Reports",
    description: "Executed financial and operational diligence across 15+ engagements, identifying key risk items and supporting investment decisions.",
    category: "Due Diligence",
    icon: PieChart,
    highlights: [
      "40% reduction in post-deal surprises",
      "2-3 week compressed delivery timelines",
      "Multi-sector compliance and credit diligence"
    ]
  }
];

const categories = ["All", "Transaction Advisory", "Financial Modelling", "Restructuring", "Mergers & Acquisitions", "Pitch Decks", "FP&A", "Due Diligence"];

export default function MyWork() {
  return (
    <div className="min-h-screen">
      <CosmicWave />
      <Navigation />
      <main className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-accent font-bold text-4xl md:text-5xl lg:text-6xl mb-4" data-testid="text-page-title">
              My Work
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A showcase of key projects and engagements across transaction advisory, financial modelling, and strategic consulting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card 
                  key={index} 
                  className="p-6 border-accent-border/20 bg-card/50 backdrop-blur-sm hover-elevate transition-all duration-300"
                  data-testid={`card-work-item-${index}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h3 className="font-accent font-bold text-lg text-foreground" data-testid="text-work-title">
                          {item.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs flex-shrink-0" data-testid="badge-category">
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mt-2 leading-relaxed" data-testid="text-work-description">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pl-14">
                    {item.highlights.map((highlight, hIndex) => (
                      <div key={hIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground" data-testid={`text-highlight-${index}-${hIndex}`}>
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
