'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { usePointerMove } from '@/hooks/usePointerMove';
import { gsap } from '@/lib/gsap';

interface CursorProps {
  active: boolean;
  label?: string;
  reducedMotion?: boolean;
}

const IDLE_SCALE = 10 / 72;

export const Cursor = ({
  active,
  label = 'Смотреть',
  reducedMotion = false,
}: CursorProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const reducedRef = useRef(reducedMotion);
  const pointerRaf = useRef(0);
  const queued = useRef({ x: 0, y: 0, pending: false });
  reducedRef.current = reducedMotion;

  useGSAP(() => {
    const el = rootRef.current;
    if (!el) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, scale: IDLE_SCALE, opacity: 0 });
    const follow = reducedMotion ? 0.01 : 0.18;
    xTo.current = gsap.quickTo(el, 'x', { duration: follow, ease: 'power3' });
    yTo.current = gsap.quickTo(el, 'y', { duration: follow, ease: 'power3' });
  }, [reducedMotion]);

  usePointerMove((event) => {
    if (reducedRef.current && rootRef.current) {
      gsap.set(rootRef.current, { x: event.clientX, y: event.clientY });
      return;
    }

    queued.current.x = event.clientX;
    queued.current.y = event.clientY;
    queued.current.pending = true;
    if (pointerRaf.current) return;

    pointerRaf.current = window.requestAnimationFrame(() => {
      pointerRaf.current = 0;
      const next = queued.current;
      if (!next.pending) return;
      next.pending = false;
      xTo.current?.(next.x);
      yTo.current?.(next.y);
    });
  });

  useGSAP(() => {
    const el = rootRef.current;
    if (!el) return;

    gsap.to(el, {
      scale: active ? 1 : IDLE_SCALE,
      opacity: active ? 1 : 0,
      duration: reducedMotion ? 0.01 : 0.15,
      ease: 'power3.out',
    });
  }, [active, reducedMotion]);

  return (
    <div
      ref={rootRef}
      aria-hidden='true'
      className='pointer-events-none fixed left-0 top-0 z-[60] flex items-center justify-center rounded-full border border-fg/30 bg-ink/80 text-[0.625rem] font-mono uppercase tracking-[0.16em] text-fg opacity-0 will-change-transform'
      style={{ width: 72, height: 72 }}
    >
      <span
        className={`transition-opacity duration-150 ${active ? 'opacity-100' : 'opacity-0'}`}
      >
        {label}
      </span>
    </div>
  );
};
