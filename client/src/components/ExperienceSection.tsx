import ExperienceCard from './ExperienceCard';
import { Pill, HardHat, Utensils, Laptop, Zap, Fuel } from 'lucide-react';
import { Card } from '@/components/ui/card';

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
    'INR 9,000 Cr',
    '30% reduction',
    'INR 400 Cr',
    'Power BI',
    'Alteryx',
    'Excel'
  ];

  let result = text;
  highlights.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
    result = result.replace(regex, '<strong class="font-semibold">$1</strong>');
  });

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
};

export default function ExperienceSection() {
  const professionalSummary = "Finance professional with expertise in transaction advisory, debt restructuring, and special situations. Experienced in CIRP strategy, financial modeling, M&A execution, operational turnarounds, and delivering data-driven insights.";

  const industries = [
    { name: 'Infra and EPC', icon: HardHat },
    { name: 'Renewable Energy', icon: Zap },
    { name: 'Non-Renewable Energy', icon: Fuel },
    { name: 'Pharma', icon: Pill },
    { name: 'F&B', icon: Utensils },
    { name: 'IT&ITES', icon: Laptop }
  ];

  const experiences = [
    {
      company: "First Partner Consulting",
      position: "Associate Manager - Transaction Advisory",
      period: "Sept 2025 - Present",
      achievements: [
        "Advised resolution applicants on bid strategy and documentation to participate in Corporate Insolvency Resolution Process (CIRP), ensuring regulatory compliance and improved approval probability.",
        "Enhanced the bidding efficiency for companies undergoing CIRP by 70% through the implementation of task automation.",
        "Developed comprehensive financial models to evaluate the financial viability of a renewable energy projects with a total project value of INR 9,000 Cr and mid-size corporates going for funding rounds.",
        "Negotiated a F&B Unit acquisition, achieving a 30% reduction in purchase consideration."
      ]
    },
    {
      company: "Ernst and Young India",
      position: "Associate - Debt and Special Situation",
      period: "Jan 2023 To Aug 2024",
      achievements: [
        "Facilitated fund-raise of a INR 400 Cr project finance deal from a PSU lender for a coal mining expansion initiative.",
        "Provided strategic consulting to Infrastructure SPVs, covering toll audits, MIS architecture, traffic data analytics and other key operational turnaround consulting.",
        "Developed automated dashboards in Excel, Power BI, and Alteryx to enable traffic forecasting and variance analysis.",
        "Prepared investor pitch decks and conducted market research for new business creation and refinancing strategy."
      ]
    }
  ];

  return (
    <section className="min-h-screen py-16 md:py-24 px-6 md:px-12 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent font-bold text-4xl md:text-5xl lg:text-6xl mb-12 text-center" data-testid="text-section-title">
          Experience
        </h2>
        
        <div className="mb-12 md:mb-16 space-y-8">
          <div>
            <h3 className="font-semibold text-lg md:text-xl mb-4 text-muted-foreground">Professional Summary</h3>
            <p className="text-base md:text-lg leading-relaxed" data-testid="text-summary">
              <HighlightedText text={professionalSummary} />
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg md:text-xl mb-4 text-muted-foreground">Industry Exposure</h3>
            <div className="flex flex-wrap gap-4">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <Card 
                    key={index} 
                    className="flex items-center gap-3 px-4 py-3 hover-elevate"
                    data-testid={`card-industry-${index}`}
                  >
                    <Icon className="w-5 h-5 text-muted-foreground grayscale opacity-60" />
                    <span className="font-medium text-base" data-testid="text-industry-name">
                      {industry.name}
                    </span>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-lg md:text-xl mb-6 text-muted-foreground">Work Experience</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              company={exp.company}
              position={exp.position}
              period={exp.period}
              achievements={exp.achievements}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
