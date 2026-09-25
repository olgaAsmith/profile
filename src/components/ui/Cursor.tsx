'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { usePointerMove } from '@/hooks/usePointerMove';
import { gsap } from '@/lib/gsap';
import { duration } from '@/lib/motion';

interface CursorProps {
  active: boolean;
  label?: string;
  reducedMotion?: boolean;
}

export const Cursor = ({
  active,
  label = 'Смотреть',
  reducedMotion = false,
}: CursorProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const reducedRef = useRef(reducedMotion);
  reducedRef.current = reducedMotion;

  useGSAP(() => {
    const el = rootRef.current;
    if (!el) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const follow = reducedMotion ? 0.01 : duration.previewFollow;
    xTo.current = gsap.quickTo(el, 'x', { duration: follow, ease: 'power3' });
    yTo.current = gsap.quickTo(el, 'y', { duration: follow, ease: 'power3' });
  }, [reducedMotion]);

  usePointerMove((event) => {

    if (reducedRef.current && rootRef.current) {
      gsap.set(rootRef.current, { x: event.clientX, y: event.clientY });
      return;
    }

    xTo.current?.(event.clientX);
    yTo.current?.(event.clientY);
  });

  useGSAP(() => {
    const el = rootRef.current;
    if (!el) return;

    gsap.to(el, {
      width: active ? 72 : 10,
      height: active ? 72 : 10,
      opacity: active ? 1 : 0,
      duration: reducedMotion ? 0.01 : duration.fast,
      ease: 'power3.out',
    });
  }, [active, reducedMotion]);

  return (
    <div
      ref={rootRef}
      aria-hidden='true'
      className='pointer-events-none fixed left-0 top-0 z-[60] flex items-center justify-center rounded-full border border-fg/30 bg-fg/10 text-[0.625rem] font-mono uppercase tracking-[0.16em] text-fg backdrop-blur-sm'
      style={{ width: 8, height: 8, opacity: 0 }}
    >
      <span
        className={`transition-opacity duration-fast ${active ? 'opacity-100' : 'opacity-0'}`}
      >
        {label}
      </span>
    </div>
  );
};
