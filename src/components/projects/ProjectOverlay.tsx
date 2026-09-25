'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { MediaImage } from '@/components/ui/MediaImage';
import type { Project } from '@/lib/projects';
import { duration, ease } from '@/lib/motion';
import { captureRect, gsap, type RectSnapshot } from '@/lib/gsap';
import { lockScroll } from '@/lib/scroll-lock';

interface ProjectOverlayProps {
  project: Project | null;
  fromRect: RectSnapshot | null;
  reducedMotion: boolean;
  onClose: () => void;
}

export const ProjectOverlay = ({
  project,
  fromRect,
  reducedMotion,
  onClose,
}: ProjectOverlayProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    const unlock = lockScroll();
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();

      if (event.key !== 'Tab' || !rootRef.current) return;
      const focusable = rootRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      unlock();
      window.removeEventListener('keydown', onKey);
      previousFocus.current?.focus();
    };
  }, [project, onClose]);

  useGSAP(
    () => {
      if (!project || !mediaRef.current || !rootRef.current) return;

      const media = mediaRef.current;
      const fly = flyRef.current;
      const panel = panelRef.current;
      const backdrop = rootRef.current.querySelector('[data-overlay-backdrop]');

      gsap.set(rootRef.current, { autoAlpha: 1 });

      const rawTarget = fromRect && !reducedMotion ? captureRect(media) : null;
      const target = rawTarget
        ? (() => {
            const pad = 16;
            const maxW = window.innerWidth - pad * 2;
            const maxH = window.innerHeight - pad * 2;
            const width = Math.min(rawTarget.width, maxW);
            const height = Math.min(rawTarget.height, maxH);
            return {
              ...rawTarget,
              width,
              height,
              left: Math.min(
                Math.max(pad, rawTarget.left),
                window.innerWidth - width - pad,
              ),
              top: Math.min(
                Math.max(pad, rawTarget.top),
                window.innerHeight - height - pad,
              ),
            };
          })()
        : null;

      if (!target || !fly || !fromRect) {
        gsap.set(fly, { autoAlpha: 0 });
        gsap.fromTo(
          backdrop,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: duration.fast },
        );
        gsap.fromTo(
          media,
          { autoAlpha: 0, scale: 0.98 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: duration.base,
            ease: ease.outExpo,
          },
        );
        gsap.fromTo(
          panel,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: duration.fast },
        );
        return;
      }

      gsap.set(media, { autoAlpha: 0 });
      const pad = 16;
      const startW = Math.min(fromRect.width, window.innerWidth - pad * 2);
      const startH = Math.min(fromRect.height, window.innerHeight - pad * 2);
      gsap.set(fly, {
        autoAlpha: 1,
        top: Math.min(
          Math.max(pad, fromRect.top),
          window.innerHeight - startH - pad,
        ),
        left: Math.min(
          Math.max(pad, fromRect.left),
          window.innerWidth - startW - pad,
        ),
        width: startW,
        height: startH,
        borderRadius: fromRect.borderRadius,
        boxSizing: 'border-box',
      });

      gsap
        .timeline()
        .fromTo(
          backdrop,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: duration.base },
          0,
        )
        .to(
          fly,
          {
            top: target.top,
            left: target.left,
            width: target.width,
            height: target.height,
            borderRadius: target.borderRadius,
            duration: duration.overlay,
            ease: ease.inOut,
            onComplete: () => {
              gsap.set(media, { autoAlpha: 1 });
              gsap.set(fly, { autoAlpha: 0 });
            },
          },
          0,
        )
        .fromTo(
          panel,
          { y: 32, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: duration.base,
            ease: ease.outExpo,
          },
          0.25,
        );
    },
    { dependencies: [project, fromRect, reducedMotion] },
  );

  if (!project) return null;

  const previewSrc = project.preview ?? project.cover;
  return (
    <div
      ref={rootRef}
      role='dialog'
      aria-modal='true'
      aria-labelledby='overlay-title'
      className='fixed inset-0 z-[70] flex items-center justify-center overflow-hidden p-4 md:p-8'
      style={{ opacity: 0 }}
    >
      <button
        type='button'
        data-overlay-backdrop
        aria-label='Закрыть'
        className='absolute inset-0 bg-ink/85 backdrop-blur-sm'
        onClick={onClose}
      />

      <div className='relative z-10 grid max-h-[calc(100dvh-2rem)] w-full max-w-6xl gap-6 overflow-y-auto overscroll-contain md:max-h-[calc(100dvh-4rem)] lg:grid-cols-[1.3fr_0.9fr] lg:gap-10 lg:overflow-hidden'>
        <div
          ref={mediaRef}
          className='relative aspect-[16/10] max-h-[40vh] overflow-hidden rounded-2xl border border-line/15 bg-surface sm:max-h-none lg:aspect-auto lg:h-full lg:max-h-full'
        >
          <MediaImage
            src={previewSrc}
            alt={project.alt}
            fill
            sizes='(max-width: 1024px) 100vw, 60vw'
            className='object-cover object-top'
            priority
          />
        </div>

        <div
          ref={panelRef}
          className='relative flex min-h-0 flex-col overflow-y-auto rounded-2xl border border-line/10 bg-surface/90 p-6 md:p-8'
        >
          <button
            ref={closeRef}
            type='button'
            onClick={onClose}
            aria-label='Закрыть'
            className='absolute right-2 top-2 rounded-full p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
          >
            <Image
              className='opacity-40 transition-opacity duration-200 ease-out-expo hover:opacity-100'
              src='/icons/close.svg'
              alt=''
              width={26}
              height={26}
              aria-hidden
            />
          </button>

          <p className='eyebrow text-subtitle'>{project.role}</p>
          <h2 id='overlay-title' className='mt-3 font-display text-headline'>
            {project.name}
          </h2>
          <p className='mt-5 text-sm leading-relaxed text-muted md:text-base'>
            {project.description}
          </p>
          <p className='mt-6 font-mono text-xs text-muted'>
            {project.stack.join(' · ')}
          </p>

          <div className='mt-auto flex flex-col gap-3 pt-10 sm:flex-row'>
            <Link
              href={project.deploy}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center rounded-full bg-fg px-3 xl:px-5 py-3 text-sm text-ink transition-opacity hover:opacity-90'
            >
              Смотреть проект ↗
            </Link>
            <Link
              href={project.gh}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center rounded-full border border-line/20 px-5 py-3 text-sm text-fg transition-colors hover:border-line/50'
            >
              Код на GitHub
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={flyRef}
        aria-hidden='true'
        className='pointer-events-none fixed z-[80] box-border overflow-hidden rounded-2xl border border-line/15 bg-surface'
        style={{ opacity: 0, top: 0, left: 0, width: 0, height: 0 }}
      >
        <MediaImage
          src={previewSrc}
          alt=''
          fill
          sizes='(max-width: 1024px) 10vw, 60vw'
          className='object-cover object-top'
        />
      </div>
    </div>
  );
};
