export default function CosmicWave() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="cosmic-wave-container">
        <div className="wave wave-1"></div>
        <div className="stars-layer"></div>
      </div>

      <style>{`
        .cosmic-wave-container {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            hsl(var(--background)) 0%,
            hsl(var(--background)) 100%
          );
        }

        .wave {
          position: absolute;
          width: 150%;
          height: 150%;
          top: -25%;
          left: -25%;
          background: radial-gradient(
            ellipse at center,
            hsl(var(--primary) / 0.1) 0%,
            hsl(var(--primary) / 0.04) 40%,
            transparent 70%
          );
          border-radius: 45%;
          animation: wave-animation 30s ease-in-out infinite;
        }

        .stars-layer {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image:
            radial-gradient(2px 2px at 20% 30%, hsl(var(--primary) / 0.35), transparent),
            radial-gradient(2px 2px at 60% 70%, hsl(var(--primary) / 0.25), transparent),
            radial-gradient(1px 1px at 80% 10%, hsl(var(--primary) / 0.2), transparent),
            radial-gradient(2px 2px at 90% 60%, hsl(var(--primary) / 0.25), transparent),
            radial-gradient(1px 1px at 33% 80%, hsl(var(--primary) / 0.22), transparent),
            radial-gradient(2px 2px at 45% 15%, hsl(var(--primary) / 0.25), transparent),
            radial-gradient(1px 1px at 70% 40%, hsl(var(--primary) / 0.2), transparent),
            radial-gradient(2px 2px at 12% 45%, hsl(var(--primary) / 0.28), transparent),
            radial-gradient(1px 1px at 55% 85%, hsl(var(--primary) / 0.22), transparent),
            radial-gradient(2px 2px at 75% 55%, hsl(var(--primary) / 0.25), transparent),
            radial-gradient(1px 1px at 25% 60%, hsl(var(--primary) / 0.2), transparent),
            radial-gradient(2px 2px at 42% 92%, hsl(var(--primary) / 0.23), transparent),
            radial-gradient(1px 1px at 65% 22%, hsl(var(--primary) / 0.25), transparent),
            radial-gradient(2px 2px at 8% 68%, hsl(var(--primary) / 0.28), transparent),
            radial-gradient(1px 1px at 95% 15%, hsl(var(--primary) / 0.2), transparent);
          opacity: 0.9;
        }

        @keyframes wave-animation {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-5%, -3%) rotate(1deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wave {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
