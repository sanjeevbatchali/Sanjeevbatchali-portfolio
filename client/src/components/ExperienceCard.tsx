import { Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ExperienceCardProps {
  company: string;
  position: string;
  period: string;
  achievements: string[];
}

const HighlightedText = ({ text }: { text: string }) => {
  const highlights = [
    'CIRP',
    '70%',
    'INR 9,000 Cr',
    '30% reduction',
    'INR 400 Cr',
    'Power BI',
    'Alteryx',
    'Excel',
    'bid strategy',
    'task automation',
    'financial models',
    'renewable energy',
    'fund-raise',
    'project finance',
    'strategic consulting',
    'automated dashboards',
    'traffic forecasting',
    'variance analysis',
    'investor pitch decks',
    'market research'
  ];

  let result = text;
  highlights.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
    result = result.replace(regex, '<strong class="font-semibold">$1</strong>');
  });

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
};

export default function ExperienceCard({ company, position, period, achievements }: ExperienceCardProps) {
  return (
    <Card className="p-6 md:p-8 hover-elevate" data-testid={`card-experience-${company.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-primary/10 rounded-md">
          <Briefcase className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-accent font-bold text-xl md:text-2xl mb-1" data-testid="text-company">{company}</h3>
          <p className="font-semibold text-base md:text-lg mb-1" data-testid="text-position">{position}</p>
          <p className="text-sm text-muted-foreground" data-testid="text-period">{period}</p>
        </div>
      </div>
      <ul className="space-y-3">
        {achievements.map((achievement, index) => (
          <li key={index} className="flex gap-3 text-sm md:text-base" data-testid={`text-achievement-${index}`}>
            <span className="text-primary mt-1.5 flex-shrink-0">•</span>
            <span className="text-foreground/90 leading-relaxed">
              <HighlightedText text={achievement} />
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
