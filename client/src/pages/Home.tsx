import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import AchievementsTicker from '@/components/AchievementsTicker';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
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

  return (
    <div className="scroll-container">
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
        <div id="contact" className="scroll-section section-contact">
          <ContactSection />
        </div>
      </main>
    </div>
  );
}
