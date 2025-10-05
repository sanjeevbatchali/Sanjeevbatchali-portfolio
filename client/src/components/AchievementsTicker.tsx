export default function AchievementsTicker() {
  const achievements = [
    { number: '3+', text: 'Years Experience' },
    { number: '20+', text: 'Financial Models Prepared' },
    { number: '3+', text: 'Transactions Facilitated' },
    { number: '30+', text: 'Pitch Decks Prepared' },
    { number: '20+', text: 'Interactive Dashboards Built' },
  ];

  return (
    <div className="w-full py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" data-testid="achievements-grid">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="achievement-card flex flex-col items-center justify-center p-8 rounded-lg border border-border/50"
              data-testid={`achievement-card-${index}`}
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.03) 0%, hsl(var(--primary) / 0.08) 100%)',
                boxShadow: '0 4px 20px -4px hsl(var(--primary) / 0.15)'
              }}
            >
              <div className="font-accent font-bold text-5xl md:text-6xl text-foreground mb-3" data-testid={`achievement-number-${index}`}>
                {achievement.number}
              </div>
              <div className="font-medium text-sm md:text-base text-muted-foreground text-center leading-snug" data-testid={`achievement-text-${index}`}>
                {achievement.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
