import Navigation from '@/components/Navigation';
import SEOHead from '@/components/SEOHead';
import ContactSection from '@/components/ContactSection';
import CosmicWave from '@/components/CosmicWave';
import { Link } from 'wouter';
import { Calculator, ArrowRight, Building2, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';

const tools = [
  {
    id: 'loan-calculator',
    title: 'Loan Amortization Calculator',
    description: 'Calculate EMI schedules, Interest-only and Balloon payments with Excel export. Supports multiple repayment frequencies and moratorium periods.',
    icon: Calculator,
    href: '/devtools/loan-calculator',
    tags: ['Finance', 'Calculator', 'Excel Export'],
    demo: false,
  },
  {
    id: 'epc-order-tracker',
    title: 'EPC Order Tracker',
    description: 'Track tenders, active projects, milestones, subcontractors, JV partners, and order book for Engineering, Procurement & Construction engagements.',
    icon: Building2,
    href: '/devtools/epc-order-tracker',
    tags: ['EPC', 'Project Management', 'Demo Preview'],
    demo: true,
  }
];

export default function DevTools() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Finance Tools - Loan Calculator & Financial Utilities"
        description="Free professional financial calculators built by Sanjeev Batchali — including a Loan Amortization Calculator with EMI schedules, XIRR, moratorium support, and Excel export."
        path="/devtools"
      />
      <CosmicWave />
      <Navigation />
      
      <main className="relative z-10">
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-16">
              <h1 className="font-accent text-5xl md:text-6xl lg:text-7xl font-bold mb-6" data-testid="text-devtools-title">
                Developer Tools
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-devtools-subtitle">
                Professional financial calculators and analytical tools built with precision
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.id} href={tool.href}>
                    <Card className="p-6 h-full hover-elevate active-elevate-2 transition-all cursor-pointer group" data-testid={`card-tool-${tool.id}`}>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <h3 className="font-accent text-xl font-semibold group-hover:text-primary transition-colors" data-testid={`text-tool-title-${tool.id}`}>
                              {tool.title}
                            </h3>
                            {tool.demo && (
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border border-yellow-500/40 bg-yellow-500/10 text-yellow-400">
                                <Lock className="w-2.5 h-2.5" /> Demo
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4" data-testid={`text-tool-description-${tool.id}`}>
                        {tool.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {tool.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                            data-testid={`tag-${tool.id}-${tag.toLowerCase()}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all" data-testid={`link-tool-${tool.id}`}>
                        Open Tool
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>

            <div className="mt-16 text-center">
              <p className="text-muted-foreground">More tools coming soon...</p>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
    </div>
  );
}
