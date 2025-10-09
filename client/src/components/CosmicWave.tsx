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
            hsl(var(--primary) / 0.12) 0%,
            hsl(var(--primary) / 0.06) 40%,
            transparent 70%
          );
          border-radius: 45%;
          animation: wave-animation 20s ease-in-out infinite;
          opacity: 1;
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
            hsl(var(--primary) / 0.1) 0%,
            hsl(var(--primary) / 0.05) 40%,
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
            hsl(210 100% 60% / 0.08) 0%,
            hsl(210 100% 60% / 0.04) 40%,
            transparent 70%
          );
        }

        .stars-layer {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(3px 3px at 20% 30%, hsl(var(--primary) / 0.4), transparent),
            radial-gradient(2px 2px at 60% 70%, hsl(var(--primary) / 0.3), transparent),
            radial-gradient(2px 2px at 50% 50%, hsl(var(--primary) / 0.35), transparent),
            radial-gradient(2px 2px at 80% 10%, hsl(var(--primary) / 0.25), transparent),
            radial-gradient(3px 3px at 90% 60%, hsl(var(--primary) / 0.3), transparent),
            radial-gradient(2px 2px at 33% 80%, hsl(var(--primary) / 0.28), transparent),
            radial-gradient(1px 1px at 15% 90%, hsl(var(--primary) / 0.22), transparent),
            radial-gradient(2px 2px at 45% 15%, hsl(var(--primary) / 0.3), transparent),
            radial-gradient(1px 1px at 70% 40%, hsl(var(--primary) / 0.25), transparent),
            radial-gradient(2px 2px at 25% 60%, hsl(var(--primary) / 0.3), transparent),
            radial-gradient(2px 2px at 12% 45%, hsl(var(--primary) / 0.32), transparent),
            radial-gradient(1px 1px at 38% 25%, hsl(var(--primary) / 0.28), transparent),
            radial-gradient(3px 3px at 55% 85%, hsl(var(--primary) / 0.35), transparent),
            radial-gradient(2px 2px at 75% 55%, hsl(var(--primary) / 0.3), transparent),
            radial-gradient(1px 1px at 85% 35%, hsl(var(--primary) / 0.25), transparent),
            radial-gradient(2px 2px at 92% 78%, hsl(var(--primary) / 0.3), transparent),
            radial-gradient(2px 2px at 28% 12%, hsl(var(--primary) / 0.33), transparent),
            radial-gradient(1px 1px at 42% 92%, hsl(var(--primary) / 0.27), transparent),
            radial-gradient(2px 2px at 65% 22%, hsl(var(--primary) / 0.31), transparent),
            radial-gradient(3px 3px at 8% 68%, hsl(var(--primary) / 0.36), transparent),
            radial-gradient(1px 1px at 95% 15%, hsl(var(--primary) / 0.24), transparent),
            radial-gradient(2px 2px at 18% 58%, hsl(var(--primary) / 0.29), transparent),
            radial-gradient(2px 2px at 48% 38%, hsl(var(--primary) / 0.32), transparent),
            radial-gradient(1px 1px at 72% 82%, hsl(var(--primary) / 0.26), transparent),
            radial-gradient(2px 2px at 35% 5%, hsl(var(--primary) / 0.34), transparent),
            radial-gradient(1px 1px at 5% 25%, hsl(var(--primary) / 0.26), transparent),
            radial-gradient(2px 2px at 52% 68%, hsl(var(--primary) / 0.31), transparent),
            radial-gradient(2px 2px at 88% 88%, hsl(var(--primary) / 0.29), transparent),
            radial-gradient(1px 1px at 22% 48%, hsl(var(--primary) / 0.24), transparent),
            radial-gradient(3px 3px at 67% 8%, hsl(var(--primary) / 0.37), transparent),
            radial-gradient(2px 2px at 41% 78%, hsl(var(--primary) / 0.28), transparent),
            radial-gradient(1px 1px at 58% 95%, hsl(var(--primary) / 0.23), transparent),
            radial-gradient(2px 2px at 14% 34%, hsl(var(--primary) / 0.3), transparent),
            radial-gradient(2px 2px at 77% 63%, hsl(var(--primary) / 0.32), transparent),
            radial-gradient(1px 1px at 31% 17%, hsl(var(--primary) / 0.25), transparent),
            radial-gradient(3px 3px at 94% 42%, hsl(var(--primary) / 0.35), transparent),
            radial-gradient(2px 2px at 46% 52%, hsl(var(--primary) / 0.29), transparent),
            radial-gradient(1px 1px at 63% 28%, hsl(var(--primary) / 0.27), transparent),
            radial-gradient(2px 2px at 9% 74%, hsl(var(--primary) / 0.31), transparent),
            radial-gradient(2px 2px at 83% 19%, hsl(var(--primary) / 0.33), transparent),
            radial-gradient(1px 1px at 27% 87%, hsl(var(--primary) / 0.24), transparent),
            radial-gradient(3px 3px at 73% 46%, hsl(var(--primary) / 0.36), transparent),
            radial-gradient(2px 2px at 39% 6%, hsl(var(--primary) / 0.3), transparent),
            radial-gradient(1px 1px at 56% 71%, hsl(var(--primary) / 0.26), transparent),
            radial-gradient(2px 2px at 97% 51%, hsl(var(--primary) / 0.28), transparent),
            radial-gradient(2px 2px at 11% 11%, hsl(var(--primary) / 0.32), transparent),
            radial-gradient(1px 1px at 68% 91%, hsl(var(--primary) / 0.25), transparent),
            radial-gradient(3px 3px at 24% 56%, hsl(var(--primary) / 0.34), transparent),
            radial-gradient(2px 2px at 81% 3%, hsl(var(--primary) / 0.29), transparent),
            radial-gradient(1px 1px at 44% 39%, hsl(var(--primary) / 0.27), transparent),
            radial-gradient(1px 1px at 3% 13%, hsl(var(--primary) / 0.23), transparent),
            radial-gradient(2px 2px at 17% 37%, hsl(var(--primary) / 0.29), transparent),
            radial-gradient(1px 1px at 29% 64%, hsl(var(--primary) / 0.25), transparent),
            radial-gradient(2px 2px at 43% 88%, hsl(var(--primary) / 0.31), transparent),
            radial-gradient(3px 3px at 54% 7%, hsl(var(--primary) / 0.35), transparent),
            radial-gradient(1px 1px at 66% 33%, hsl(var(--primary) / 0.24), transparent),
            radial-gradient(2px 2px at 78% 59%, hsl(var(--primary) / 0.3), transparent),
            radial-gradient(2px 2px at 89% 84%, hsl(var(--primary) / 0.28), transparent),
            radial-gradient(1px 1px at 7% 44%, hsl(var(--primary) / 0.26), transparent),
            radial-gradient(3px 3px at 19% 19%, hsl(var(--primary) / 0.33), transparent),
            radial-gradient(2px 2px at 32% 73%, hsl(var(--primary) / 0.27), transparent),
            radial-gradient(1px 1px at 47% 96%, hsl(var(--primary) / 0.22), transparent),
            radial-gradient(2px 2px at 61% 18%, hsl(var(--primary) / 0.32), transparent),
            radial-gradient(2px 2px at 74% 47%, hsl(var(--primary) / 0.29), transparent),
            radial-gradient(1px 1px at 86% 76%, hsl(var(--primary) / 0.25), transparent),
            radial-gradient(3px 3px at 99% 2%, hsl(var(--primary) / 0.36), transparent),
            radial-gradient(2px 2px at 13% 53%, hsl(var(--primary) / 0.28), transparent),
            radial-gradient(1px 1px at 26% 27%, hsl(var(--primary) / 0.24), transparent),
            radial-gradient(2px 2px at 37% 81%, hsl(var(--primary) / 0.3), transparent),
            radial-gradient(2px 2px at 51% 9%, hsl(var(--primary) / 0.31), transparent),
            radial-gradient(1px 1px at 64% 62%, hsl(var(--primary) / 0.26), transparent),
            radial-gradient(3px 3px at 76% 36%, hsl(var(--primary) / 0.34), transparent),
            radial-gradient(2px 2px at 91% 89%, hsl(var(--primary) / 0.27), transparent),
            radial-gradient(1px 1px at 4% 67%, hsl(var(--primary) / 0.23), transparent),
            radial-gradient(2px 2px at 16% 4%, hsl(var(--primary) / 0.32), transparent),
            radial-gradient(2px 2px at 34% 41%, hsl(var(--primary) / 0.29), transparent),
            radial-gradient(1px 1px at 49% 94%, hsl(var(--primary) / 0.25), transparent),
            radial-gradient(3px 3px at 62% 23%, hsl(var(--primary) / 0.35), transparent),
            radial-gradient(2px 2px at 71% 69%, hsl(var(--primary) / 0.28), transparent),
            radial-gradient(1px 1px at 84% 14%, hsl(var(--primary) / 0.24), transparent),
            radial-gradient(2px 2px at 96% 57%, hsl(var(--primary) / 0.31), transparent),
            radial-gradient(2px 2px at 10% 86%, hsl(var(--primary) / 0.26), transparent),
            radial-gradient(1px 1px at 23% 31%, hsl(var(--primary) / 0.22), transparent),
            radial-gradient(3px 3px at 40% 75%, hsl(var(--primary) / 0.33), transparent),
            radial-gradient(2px 2px at 53% 1%, hsl(var(--primary) / 0.3), transparent),
            radial-gradient(1px 1px at 69% 49%, hsl(var(--primary) / 0.27), transparent),
            radial-gradient(2px 2px at 82% 93%, hsl(var(--primary) / 0.29), transparent),
            radial-gradient(2px 2px at 93% 26%, hsl(var(--primary) / 0.32), transparent),
            radial-gradient(1px 1px at 6% 72%, hsl(var(--primary) / 0.25), transparent),
            radial-gradient(3px 3px at 21% 16%, hsl(var(--primary) / 0.36), transparent),
            radial-gradient(2px 2px at 36% 54%, hsl(var(--primary) / 0.28), transparent),
            radial-gradient(1px 1px at 57% 98%, hsl(var(--primary) / 0.23), transparent),
            radial-gradient(2px 2px at 79% 11%, hsl(var(--primary) / 0.31), transparent),
            radial-gradient(2px 2px at 87% 43%, hsl(var(--primary) / 0.27), transparent),
            radial-gradient(1px 1px at 98% 79%, hsl(var(--primary) / 0.24), transparent),
            radial-gradient(3px 3px at 2% 21%, hsl(var(--primary) / 0.34), transparent),
            radial-gradient(2px 2px at 30% 66%, hsl(var(--primary) / 0.29), transparent),
            radial-gradient(1px 1px at 59% 5%, hsl(var(--primary) / 0.26), transparent),
            radial-gradient(2px 2px at 80% 52%, hsl(var(--primary) / 0.3), transparent);
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
