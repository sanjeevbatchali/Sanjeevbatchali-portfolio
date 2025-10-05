import { useState, useEffect } from 'react';
import profileImage from '@assets/Screenshot 2025-10-05 223555_1759684246509.jpg';

const taglines = [
  'Finance Professional',
  'Chartered Accountant',
  'Data Analyst',
  'Tech Enthusiast'
];

export default function HeroSection() {
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-3 text-center lg:text-left">
          <h1 className="font-accent font-bold text-4xl md:text-5xl lg:text-6xl mb-6" data-testid="text-hero-name">
            I am <span className="text-primary">Sanjeev Batchali</span>
          </h1>
          <div className="h-16 md:h-20 flex items-center justify-center lg:justify-start">
            <p 
              className="font-medium text-xl md:text-2xl lg:text-3xl text-muted-foreground transition-opacity duration-300"
              data-testid="text-tagline"
              key={currentTagline}
            >
              {taglines[currentTagline]}
            </p>
          </div>
        </div>
        <div className="lg:col-span-2 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-lg overflow-hidden border-2 border-primary shadow-lg">
              <img 
                src={profileImage} 
                alt="Sanjeev Batchali" 
                className="w-full h-full object-cover"
                data-testid="img-profile"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
