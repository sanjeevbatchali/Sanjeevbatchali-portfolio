import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import SEOHead from '@/components/SEOHead';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import AchievementsTicker from '@/components/AchievementsTicker';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import CosmicWave from '@/components/CosmicWave';

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        } else {
          entry.target.classList.remove('section-visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.scroll-section:not(.section-hero)');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sanjeev Batchali',
    jobTitle: 'Finance Professional | Chartered Accountant | CFA Level 2 Candidate',
    description: 'Transaction advisory specialist with expertise in debt restructuring, project finance, M&A, and financial modeling. CA and CFA Level 2 Candidate.',
    url: 'https://www.sanjeevbatchali.in',
    image: 'https://www.sanjeevbatchali.in/profile.jpg',
    sameAs: [
      'https://www.linkedin.com/in/sanjeevbatchali',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'First Partner Consulting',
    },
    alumniOf: [
      {
        '@type': 'Organization',
        name: 'Ernst & Young',
      },
    ],
    knowsAbout: [
      'Transaction Advisory',
      'Debt Restructuring',
      'Project Finance',
      'Financial Modelling',
      'Mergers & Acquisitions',
      'Special Situations',
      'Data Analytics',
    ],
  };

  return (
    <div className="scroll-container">
      <SEOHead
        title="Sanjeev Batchali - Finance Professional & Chartered Accountant"
        description="Portfolio of Sanjeev Batchali, a Chartered Accountant and Finance Professional with expertise in transaction advisory, debt restructuring, project finance, and data analytics. CFA Level 2 Candidate."
        path="/"
        ogType="website"
        structuredData={personSchema}
      />
      <CosmicWave />
      <Navigation />
      <main>
        <div id="hero" className="scroll-section section-hero">
          <HeroSection />
        </div>
        <div id="about" className="scroll-section section-about">
          <AboutSection />
          <AchievementsTicker />
        </div>
        <div id="experience" className="scroll-section section-experience">
          <ExperienceSection />
        </div>
        <div id="skills" className="scroll-section section-skills">
          <SkillsSection />
        </div>
        <div id="certifications" className="scroll-section section-certifications">
          <CertificationsSection />
        </div>
        <div id="contact" className="scroll-section section-contact">
          <ContactSection />
        </div>
      </main>
    </div>
  );
}
