import { Award, GraduationCap, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Certification {
  title: string;
  subtitle: string;
  year: string;
  icon: typeof Award;
}

const certifications: Certification[] = [
  {
    title: 'Chartered Accountant',
    subtitle: 'Institute of Chartered Accountants of India',
    year: 'Since 2022',
    icon: Award
  },
  {
    title: 'PG Diploma in ML and AI',
    subtitle: 'IIIT Bangalore',
    year: '2025',
    icon: GraduationCap
  },
  {
    title: 'CFA Level 2',
    subtitle: 'Candidate',
    year: 'In Progress',
    icon: TrendingUp
  }
];

export default function CertificationsSection() {
  return (
    <section className="min-h-screen py-16 md:py-24 px-6 md:px-12 flex items-center justify-center bg-muted/30" id="certifications">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="font-accent font-bold text-3xl md:text-4xl lg:text-5xl mb-12 text-center" data-testid="text-section-title">
          Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <Card 
                key={index} 
                className="p-6 md:p-8 hover-elevate relative"
                data-testid={`card-certification-${index}`}
              >
                <Badge 
                  variant="secondary" 
                  className="absolute top-4 right-4 text-xs"
                  data-testid="badge-year"
                >
                  {cert.year}
                </Badge>
                <div className="mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-accent font-bold text-xl md:text-2xl mb-2" data-testid="text-cert-title">
                    {cert.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground" data-testid="text-cert-subtitle">
                    {cert.subtitle}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
