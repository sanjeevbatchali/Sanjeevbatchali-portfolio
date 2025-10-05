import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <div id="hero">
          <HeroSection />
        </div>
        <ExperienceSection />
        <SkillsSection />
        <CertificationsSection />
      </main>
    </div>
  );
}
