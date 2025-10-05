import ExperienceCard from '../ExperienceCard';

export default function ExperienceCardExample() {
  return (
    <div className="p-8 max-w-2xl">
      <ExperienceCard
        company="First Partner Consulting"
        position="Associate Manager - Transaction Advisory"
        period="Sept 2025 - Present"
        achievements={[
          'Advised resolution applicants on bid strategy and documentation to participate in Corporate Insolvency Resolution Process (CIRP)',
          'Enhanced the bidding efficiency for companies undergoing CIRP by 70% through the implementation of task automation',
          'Developed comprehensive financial models to evaluate the financial viability of renewable energy projects'
        ]}
      />
    </div>
  );
}
