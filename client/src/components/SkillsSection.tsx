import { useState } from 'react';
import { SiPython, SiMysql } from 'react-icons/si';
import { Database, BarChart3, Workflow, Box } from 'lucide-react';

interface TechSkill {
  name: string;
  rating: number;
  icon: any;
}

const financeSkills = [
  'Budgeting',
  'Forecasting',
  'Financial Projections and Modelling',
  'Equity Valuations',
  'Project Finance Modelling',
  'Pitch Deck Preparations',
  'Financial Due Diligence',
  'Market Research',
  'Credit Analysis',
  'Turnaround and Restructuring Strategies',
  'Bankruptcy Advisory (Insolvency Support)'
];

const techSkills: TechSkill[] = [
  { name: 'Power BI', rating: 8, icon: BarChart3 },
  { name: 'Microsoft Tools', rating: 9, icon: Box },
  { name: 'Python', rating: 7, icon: SiPython },
  { name: 'Alteryx', rating: 8, icon: Workflow },
  { name: 'SQL', rating: 5, icon: SiMysql }
];

export default function SkillsSection() {
  const [isPausedFinance, setIsPausedFinance] = useState(false);
  const [isPausedTech, setIsPausedTech] = useState(false);

  return (
    <section className="min-h-screen py-16 md:py-24 px-6 md:px-12 flex items-center justify-center" id="skills">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="font-accent font-bold text-3xl md:text-4xl lg:text-5xl mb-12 text-center" data-testid="text-section-title">
          Skills & Expertise
        </h2>

        <div className="space-y-12">
          <div>
            <h3 className="font-accent font-semibold text-2xl md:text-3xl mb-6 text-center" data-testid="text-finance-skills-title">
              Finance Skills
            </h3>
            <div className="relative overflow-hidden">
              <div 
                className={`flex gap-4 ${!isPausedFinance ? 'animate-scroll-finance' : ''}`}
                onMouseEnter={() => setIsPausedFinance(true)}
                onMouseLeave={() => setIsPausedFinance(false)}
              >
                {[...financeSkills, ...financeSkills, ...financeSkills].map((skill, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 bg-card border border-card-border rounded-lg px-6 py-4 hover-elevate"
                    data-testid={`card-finance-skill-${index}`}
                  >
                    <p className="font-medium text-base whitespace-nowrap text-muted-foreground" data-testid="text-finance-skill-name">
                      {skill}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-accent font-semibold text-2xl md:text-3xl mb-6 text-center" data-testid="text-tech-skills-title">
              Tech Skills
            </h3>
            <div className="relative overflow-hidden">
              <div 
                className={`flex gap-6 ${!isPausedTech ? 'animate-scroll-tech' : ''}`}
                onMouseEnter={() => setIsPausedTech(true)}
                onMouseLeave={() => setIsPausedTech(false)}
              >
                {[...techSkills, ...techSkills, ...techSkills].map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 bg-card border border-card-border rounded-lg p-6 w-64 hover-elevate"
                      data-testid={`card-tech-skill-${index}`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-muted/50 rounded-md">
                          <Icon className="w-6 h-6 text-muted-foreground grayscale opacity-70" />
                        </div>
                        <h4 className="font-accent font-semibold text-xl" data-testid="text-tech-skill-name">
                          {skill.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-chart-2 h-full rounded-full transition-all duration-300"
                            style={{ width: `${skill.rating * 10}%` }}
                            data-testid="progress-tech-skill"
                          />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground w-12 text-right" data-testid="text-tech-rating">
                          {skill.rating}/10
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scroll-finance {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-100% / 3));
            }
          }
          
          @keyframes scroll-tech {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-264px * ${techSkills.length}));
            }
          }
          
          .animate-scroll-finance {
            animation: scroll-finance 30s linear infinite;
          }
          
          .animate-scroll-tech {
            animation: scroll-tech 20s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
}
