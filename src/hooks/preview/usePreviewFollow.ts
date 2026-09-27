'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { usePointerMove } from '@/hooks/usePointerMove';
import { gsap } from '@/lib/gsap';
import { duration, ease } from '@/lib/motion';
import type { Project } from '@/lib/projects';

interface UsePreviewFollowOptions {
  visible: boolean;
  reducedMotion: boolean;
  project: Project | null;
  onHide: () => void;
}

export const usePreviewFollow = ({
  visible,
  reducedMotion,
  project,
  onHide,
}: UsePreviewFollowOptions) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(visible);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const lastPointer = useRef({ x: 0, y: 0 });
  const frameSize = useRef({ width: 460, height: 300 });
  const viewport = useRef({ width: 0, height: 0 });
  const pointerRaf = useRef(0);
  const queued = useRef({ x: 0, y: 0, pending: false });
  const onHideRef = useRef(onHide);
  const projectRef = useRef(project);
  onHideRef.current = onHide;
  projectRef.current = project;
  visibleRef.current = visible;

  const ensureFollowTweens = useCallback((frame: HTMLDivElement) => {
    if (!xTo.current) {
      xTo.current = gsap.quickTo(frame, 'x', {
        duration: duration.previewFollow,
        ease: 'power3',
      });
    }
    if (!yTo.current) {
      yTo.current = gsap.quickTo(frame, 'y', {
        duration: duration.previewFollow,
        ease: 'power3',
      });
    }
  }, []);

  const measureFrame = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;
    frameSize.current = {
      width: frame.offsetWidth || 460,
      height: frame.offsetHeight || 300,
    };
  }, []);

  const followPointer = useCallback((clientX: number, clientY: number) => {
    if (!xTo.current || !yTo.current) return;

    lastPointer.current = { x: clientX, y: clientY };

    const margin = 20;
    const gap = 28;
    const { width, height } = frameSize.current;
    const viewWidth = viewport.current.width || window.innerWidth;
    const viewHeight = viewport.current.height || window.innerHeight;
    const maxX = Math.max(margin, viewWidth - width - margin);
    const maxY = Math.max(margin, viewHeight - height - margin);
    const rawX =
      clientX + gap + width <= viewWidth - margin
        ? clientX + gap
        : clientX - gap - width;

    xTo.current(gsap.utils.clamp(margin, maxX, rawX));
    yTo.current(gsap.utils.clamp(margin, maxY, clientY - height * 0.6));
  }, []);

  const scheduleFollow = useCallback(
    (clientX: number, clientY: number) => {
      queued.current.x = clientX;
      queued.current.y = clientY;
      queued.current.pending = true;
      if (pointerRaf.current) return;

      pointerRaf.current = window.requestAnimationFrame(() => {
        pointerRaf.current = 0;
        const next = queued.current;
        if (!next.pending) return;
        next.pending = false;
        followPointer(next.x, next.y);
      });
    },
    [followPointer],
  );

  useEffect(() => {
    const readViewport = () => {
      viewport.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };

    readViewport();
    measureFrame();
    window.addEventListener('resize', readViewport);

    const frame = frameRef.current;
    const observer = new ResizeObserver(measureFrame);
    if (frame) observer.observe(frame);

    return () => {
      window.removeEventListener('resize', readViewport);
      observer.disconnect();
      if (pointerRaf.current) window.cancelAnimationFrame(pointerRaf.current);
    };
  }, [measureFrame]);

  const resetTilt = useCallback(() => {
    if (frameRef.current) gsap.set(frameRef.current, { rotation: 0 });
  }, []);

  useGSAP(() => {
    const frame = frameRef.current;
    if (!frame) return;

    gsap.set(frame, {
      x: window.innerWidth * 0.55,
      y: window.innerHeight * 0.35,
      rotate: 0,
      scale: 0.96,
      autoAlpha: 0,
      visibility: 'hidden',
    });

    xTo.current = null;
    yTo.current = null;
    ensureFollowTweens(frame);
  }, [ensureFollowTweens]);

  usePointerMove((event) => {
    if (!visibleRef.current) {
      lastPointer.current = { x: event.clientX, y: event.clientY };
      return;
    }

    scheduleFollow(event.clientX, event.clientY);
  });

  useGSAP(() => {
    const frame = frameRef.current;
    if (!frame) return;

    gsap.killTweensOf(frame, 'autoAlpha,opacity,visibility,scale');

    if (visible && projectRef.current) {
      measureFrame();
      ensureFollowTweens(frame);
      followPointer(lastPointer.current.x, lastPointer.current.y);
      gsap.set(frame, { visibility: 'visible' });
      gsap.to(frame, {
        autoAlpha: 1,
        scale: 1,
        duration: reducedMotion ? 0.01 : duration.previewReveal,
        ease: ease.outExpo,
      });
    } else {
      onHideRef.current();
      gsap.set(frame, {
        autoAlpha: 0,
        scale: 0.96,
        visibility: 'hidden',
        rotation: 0,
      });
    }
  }, [visible, reducedMotion, ensureFollowTweens, followPointer, measureFrame]);

  return { frameRef, resetTilt };
};
