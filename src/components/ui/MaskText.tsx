'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap } from '@/lib/gsap';
import { duration, ease } from '@/lib/motion';

interface MaskTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  disabled?: boolean;
  when?: 'scroll' | 'mount';
  play?: boolean;
  triggerKey?: string | number;
}

const isInRevealZone = (element: HTMLElement) =>
  element.getBoundingClientRect().top < window.innerHeight * 0.88;

export const MaskText = ({
  children,
  className = '',
  delay = 0,
  disabled = false,
  when = 'scroll',
  play = true,
  triggerKey,
}: MaskTextProps) => {
  const rootRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const inner = innerRef.current;
      if (!root || !inner) return;

      if (disabled || !play) {
        gsap.set(inner, { yPercent: 0 });
        return;
      }

      const animation = {
        yPercent: 0,
        duration: duration.slow,
        delay,
        ease: ease.outExpo,
      };

      const reveal = () => gsap.fromTo(inner, { yPercent: 115 }, animation);

      if (when === 'mount' || isInRevealZone(root)) {
        reveal();
        return;
      }

      gsap.fromTo(
        inner,
        { yPercent: 115 },
        {
          ...animation,
          scrollTrigger: {
            trigger: root,
            start: 'top 88%',
            once: true,
          },
        },
      );
    },
    { dependencies: [disabled, delay, when, play, triggerKey] },
  );

  return (
    <span
      ref={rootRef}
      className={`inline-block overflow-hidden pb-[0.22em] -mb-[0.22em] ${className}`}
    >
      <span ref={innerRef} className='inline-block will-change-transform'>
        {children}
      </span>
    </span>
  );
};
