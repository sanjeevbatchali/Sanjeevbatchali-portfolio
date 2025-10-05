import { useState } from 'react';

interface Skill {
  name: string;
  rating: number;
}

const skills: Skill[] = [
  { name: 'Power BI', rating: 8 },
  { name: 'Microsoft Tools', rating: 9 },
  { name: 'Python', rating: 7 },
  { name: 'Alteryx', rating: 8 },
  { name: 'SQL', rating: 5 }
];

export default function SkillsSection() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="min-h-screen py-16 md:py-24 px-6 md:px-12 flex items-center justify-center" id="skills">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="font-accent font-bold text-3xl md:text-4xl lg:text-5xl mb-12 text-center" data-testid="text-section-title">
          Skills & Expertise
        </h2>

        <div className="relative overflow-hidden">
          <div 
            className={`flex gap-6 ${!isPaused ? 'animate-scroll' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {[...skills, ...skills, ...skills].map((skill, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-card border border-card-border rounded-lg p-6 w-64 hover-elevate"
                data-testid={`card-skill-${index}`}
              >
                <h3 className="font-accent font-semibold text-xl mb-4" data-testid="text-skill-name">
                  {skill.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-chart-2 h-full rounded-full transition-all duration-300"
                      style={{ width: `${skill.rating * 10}%` }}
                      data-testid="progress-skill"
                    />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground w-12 text-right" data-testid="text-rating">
                    {skill.rating}/10
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-264px * ${skills.length}));
            }
          }
          
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
}
