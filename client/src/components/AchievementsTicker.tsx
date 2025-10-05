export default function AchievementsTicker() {
  const achievements = [
    { number: '3+', text: 'Years Experience' },
    { number: '20+', text: 'Financial Models Prepared' },
    { number: '3+', text: 'Transactions Facilitated' },
    { number: '30+', text: 'Pitch Decks Prepared' },
    { number: '20+', text: 'Interactive Dashboards Built' },
  ];

  return (
    <div className="w-full py-12">
      <div className="relative overflow-hidden group-achievements">
        <div className="flex gap-12 animate-scroll-achievements" data-testid="ticker-achievements">
          {[...achievements, ...achievements, ...achievements].map((achievement, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 flex items-baseline gap-3"
              data-testid={`achievement-${index % achievements.length}`}
            >
              <span className="font-accent font-bold text-5xl md:text-6xl text-foreground grayscale">
                {achievement.number}
              </span>
              <span className="font-medium text-lg md:text-xl text-muted-foreground whitespace-nowrap grayscale">
                {achievement.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-achievements {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        
        .animate-scroll-achievements {
          animation: scroll-achievements 35s linear infinite;
        }

        .group-achievements:hover .animate-scroll-achievements {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
