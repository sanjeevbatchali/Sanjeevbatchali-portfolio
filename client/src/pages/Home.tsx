import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="scroll-container">
      <Navigation />
      <main>
        <div id="hero" className="scroll-section section-hero">
          <HeroSection />
        </div>
        <div className="scroll-section section-experience">
          <ExperienceSection />
        </div>
        <div className="scroll-section section-skills">
          <SkillsSection />
        </div>
        <div className="scroll-section section-certifications">
          <CertificationsSection />
        </div>
        <div className="scroll-section section-contact">
          <ContactSection />
        </div>
      </main>
    </div>
  );
}
