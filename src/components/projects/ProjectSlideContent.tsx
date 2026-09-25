'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { MaskText } from '@/components/ui/MaskText';
import { MediaImage } from '@/components/ui/MediaImage';
import { gsap } from '@/lib/gsap';
import { duration, ease, staggerDelay } from '@/lib/motion';
import type { CategoryId, Project } from '@/lib/projects';

interface ProjectSlideContentProps {
  project: Project;
  index: number;
  category: CategoryId;
  playEnterAnimation: boolean;
  reducedMotion: boolean;
  onOpen: (project: Project) => void;
}

export const ProjectSlideContent = ({
  project,
  index,
  category,
  playEnterAnimation,
  reducedMotion,
  onOpen,
}: ProjectSlideContentProps) => {
  const imageShellRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion || !imageShellRef.current || !imageRef.current) return;

      if (!playEnterAnimation) {
        gsap.set(imageShellRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          autoAlpha: 1,
        });
        gsap.set(imageRef.current, { scale: 1, yPercent: 0 });
        return;
      }

      gsap.killTweensOf([imageShellRef.current, imageRef.current]);

      gsap.fromTo(
        imageShellRef.current,
        { clipPath: 'inset(0 0 100% 0)', autoAlpha: 0.85 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          autoAlpha: 1,
          duration: duration.base,
          delay: 0.06,
          ease: ease.mask,
        },
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 1.08, yPercent: 4 },
        {
          scale: 1,
          yPercent: 0,
          duration: duration.slow,
          delay: 0.1,
          ease: ease.outExpo,
        },
      );
    },
    { dependencies: [category, playEnterAnimation, reducedMotion] },
  );

  return (
    <button
      type='button'
      onClick={() => onOpen(project)}
      aria-label={`Открыть ${project.name}`}
      className='group flex w-full touch-manipulation flex-col gap-4 text-left'
    >
      <MaskText
        delay={staggerDelay(index)}
        disabled={reducedMotion}
        when='mount'
        play={playEnterAnimation}
        triggerKey={category}
        className='block min-w-0'
      >
        <span className='font-display text-title leading-[1.05] tracking-[-0.02em] text-fg transition-colors duration-fast group-active:text-accent'>
          {project.name}
        </span>
      </MaskText>

      <span
        ref={imageShellRef}
        className='relative block w-full overflow-hidden rounded-2xl border border-line/10 bg-surface [aspect-ratio:16/10]'
      >
        <div ref={imageRef} className='absolute inset-0 will-change-transform'>
          <MediaImage
            src={project.cover}
            alt={project.alt}
            sizes='(max-width: 1024px) 92vw'
            className='h-full w-full object-cover object-top transition-transform duration-base ease-out-expo group-active:scale-[1.02]'
          />
        </div>
      </span>
    </button>
  );
};
