export default function CosmicWave() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="cosmic-wave-container">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
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
          width: 200%;
          height: 200%;
          background: radial-gradient(
            ellipse at center,
            hsl(var(--primary) / 0.03) 0%,
            hsl(var(--primary) / 0.015) 40%,
            transparent 70%
          );
          border-radius: 45%;
          animation: wave-animation 20s ease-in-out infinite;
          opacity: 0.6;
        }

        .wave-1 {
          top: -50%;
          left: -50%;
          animation-duration: 25s;
          animation-delay: 0s;
        }

        .wave-2 {
          top: -60%;
          left: -40%;
          animation-duration: 30s;
          animation-delay: -5s;
          background: radial-gradient(
            ellipse at center,
            hsl(var(--primary) / 0.025) 0%,
            hsl(var(--primary) / 0.012) 40%,
            transparent 70%
          );
        }

        .wave-3 {
          top: -70%;
          left: -60%;
          animation-duration: 35s;
          animation-delay: -10s;
          background: radial-gradient(
            ellipse at center,
            hsl(210 100% 60% / 0.02) 0%,
            hsl(210 100% 60% / 0.01) 40%,
            transparent 70%
          );
        }

        .stars-layer {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20% 30%, hsl(var(--primary) / 0.15), transparent),
            radial-gradient(2px 2px at 60% 70%, hsl(var(--primary) / 0.1), transparent),
            radial-gradient(1px 1px at 50% 50%, hsl(var(--primary) / 0.12), transparent),
            radial-gradient(1px 1px at 80% 10%, hsl(var(--primary) / 0.08), transparent),
            radial-gradient(2px 2px at 90% 60%, hsl(var(--primary) / 0.1), transparent),
            radial-gradient(1px 1px at 33% 80%, hsl(var(--primary) / 0.09), transparent),
            radial-gradient(1px 1px at 15% 90%, hsl(var(--primary) / 0.07), transparent);
          background-size: 200% 200%;
          background-position: 0% 0%;
          animation: stars-twinkle 60s ease-in-out infinite;
        }

        @keyframes wave-animation {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(-5%, 5%) rotate(2deg) scale(1.02);
          }
          50% {
            transform: translate(-10%, -5%) rotate(-1deg) scale(0.98);
          }
          75% {
            transform: translate(-5%, -10%) rotate(1deg) scale(1.01);
          }
        }

        @keyframes stars-twinkle {
          0%, 100% {
            opacity: 0.8;
            background-position: 0% 0%;
          }
          50% {
            opacity: 1;
            background-position: 100% 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wave,
          .stars-layer {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
