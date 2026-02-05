import { useEffect, useRef } from 'react';

export default function RocketCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailPoolRef = useRef<HTMLDivElement[]>([]);
  const lastTrailTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Pre-create a pool of trail elements for reuse
    const TRAIL_POOL_SIZE = 20;
    for (let i = 0; i < TRAIL_POOL_SIZE; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.display = 'none';
      document.body.appendChild(trail);
      trailPoolRef.current.push(trail);
    }

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.35;
      cursorY += (mouseY - cursorY) * 0.35;
      
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      
      rafIdRef.current = requestAnimationFrame(updateCursor);
    };

    const createTrail = (x: number, y: number) => {
      const now = Date.now();
      // Throttle trail creation to every 50ms (was creating too frequently)
      if (now - lastTrailTimeRef.current < 50) return;
      lastTrailTimeRef.current = now;

      // Find an available trail element from the pool
      const trail = trailPoolRef.current.find(t => t.style.display === 'none');
      if (!trail) return;

      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      trail.style.display = 'block';
      trail.style.animation = 'none';
      
      // Trigger reflow to restart animation
      void trail.offsetWidth;
      trail.style.animation = 'trail-fade 0.6s ease-out forwards';

      // Hide trail after animation completes
      setTimeout(() => {
        trail.style.display = 'none';
      }, 600);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      createTrail(e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafIdRef.current = requestAnimationFrame(updateCursor);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      // Clean up trail elements
      trailPoolRef.current.forEach(trail => trail.remove());
      trailPoolRef.current = [];
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" style={{ left: 0, top: 0 }} />
  );
}
