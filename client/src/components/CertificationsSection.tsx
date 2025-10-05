import { useState } from 'react';
import { Award, GraduationCap, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
  },
  {
    title: 'CPA Australia',
    subtitle: 'Associate',
    year: '2024',
    icon: Award
  },
  {
    title: 'Financial Modelling and Valuation Analyst (FMVA)',
    subtitle: 'Corporate Finance Institute',
    year: '2023',
    icon: TrendingUp
  }
];

export default function CertificationsSection() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardWidth = 320;
  const gap = 32;
  const maxScroll = (certifications.length - 3) * (cardWidth + gap);

  const scrollLeft = () => {
    setScrollPosition(prev => Math.max(0, prev - (cardWidth + gap)));
  };

  const scrollRight = () => {
    setScrollPosition(prev => Math.min(maxScroll, prev + (cardWidth + gap)));
  };

  return (
    <section className="min-h-screen py-16 md:py-24 px-6 md:px-12 flex items-center justify-center bg-muted/30">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="font-accent font-bold text-4xl md:text-5xl lg:text-6xl mb-12 text-center" data-testid="text-section-title">
          Certifications
        </h2>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex gap-8 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <Card 
                    key={index} 
                    className="p-6 md:p-8 hover-elevate relative flex-shrink-0"
                    style={{ width: `${cardWidth}px` }}
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

          {scrollPosition > 0 && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm shadow-md"
              onClick={scrollLeft}
              data-testid="button-scroll-left"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}

          {scrollPosition < maxScroll && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm shadow-md"
              onClick={scrollRight}
              data-testid="button-scroll-right"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
