import { useEffect, useRef } from 'react';

export default function RocketCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      
      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (trailTimerRef.current) {
        clearTimeout(trailTimerRef.current);
      }

      trailTimerRef.current = window.setTimeout(() => {
        createTrail(e.clientX, e.clientY);
      }, 30);
    };

    const createTrail = (x: number, y: number) => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      document.body.appendChild(trail);

      setTimeout(() => {
        trail.remove();
      }, 600);
    };

    document.addEventListener('mousemove', handleMouseMove);
    requestAnimationFrame(updateCursor);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (trailTimerRef.current) {
        clearTimeout(trailTimerRef.current);
      }
    };
  }, []);

  return (
    <div ref={cursorRef} className="rocket-cursor">
      🚀
    </div>
  );
}
