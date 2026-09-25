'use client';

import { useCallback, useRef } from 'react';
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
  const reducedMotionRef = useRef(reducedMotion);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const rotTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const lastPointer = useRef({ x: 0, y: 0 });
  const rotReset = useRef<gsap.core.Tween | null>(null);
  const onHideRef = useRef(onHide);
  onHideRef.current = onHide;

  visibleRef.current = visible;
  reducedMotionRef.current = reducedMotion;

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
    if (!rotTo.current) {
      rotTo.current = gsap.quickTo(frame, 'rotation', {
        duration: 0.4,
        ease: 'power2',
      });
    }
  }, []);

  const followPointer = useCallback(
    (clientX: number, clientY: number, withTilt: boolean) => {
      const frame = frameRef.current;
      if (!frame || !xTo.current || !yTo.current) return;

      const dx = clientX - lastPointer.current.x;
      lastPointer.current = { x: clientX, y: clientY };

      const margin = 20;
      const gap = 28;
      const width = frame.offsetWidth || 460;
      const height = frame.offsetHeight || 300;
      const maxX = Math.max(margin, window.innerWidth - width - margin);
      const maxY = Math.max(margin, window.innerHeight - height - margin);

      const fitsRight = clientX + gap + width <= window.innerWidth - margin;
      const rawX = fitsRight ? clientX + gap : clientX - gap - width;

      xTo.current(gsap.utils.clamp(margin, maxX, rawX));
      yTo.current(gsap.utils.clamp(margin, maxY, clientY - height * 0.6));

      if (!withTilt || reducedMotionRef.current || !rotTo.current) return;

      const tilt = gsap.utils.clamp(-6, 6, dx * 0.18);
      rotTo.current(tilt);
      rotReset.current?.kill();
      rotReset.current = gsap.delayedCall(0.12, () => {
        rotTo.current?.(0);
      });
    },
    [],
  );

  const resetTilt = useCallback(() => {
    rotReset.current?.kill();
    rotTo.current?.(0);
    if (frameRef.current) gsap.set(frameRef.current, { rotation: 0 });
  }, []);

  useGSAP(() => {
    const frame = frameRef.current;
    if (!frame) return;

    gsap.set(frame, {
      x: window.innerWidth * 0.55,
      y: window.innerHeight * 0.35,
      rotate: 0,
      clipPath: 'inset(0 0 100% 0)',
      autoAlpha: 0,
      visibility: 'hidden',
    });

    xTo.current = null;
    yTo.current = null;
    rotTo.current = null;
    ensureFollowTweens(frame);
  }, [ensureFollowTweens]);

  usePointerMove((event) => {
    if (!visibleRef.current) {
      lastPointer.current = { x: event.clientX, y: event.clientY };
      return;
    }

    followPointer(event.clientX, event.clientY, true);
  });

  useGSAP(() => {
    const frame = frameRef.current;
    if (!frame) return;

    gsap.killTweensOf(frame, 'autoAlpha,opacity,visibility,clipPath');

    if (visible && project) {
      ensureFollowTweens(frame);
      followPointer(lastPointer.current.x, lastPointer.current.y, false);
      gsap.set(frame, { visibility: 'visible' });
      gsap.to(frame, {
        autoAlpha: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: reducedMotion ? 0.01 : duration.previewReveal,
        ease: ease.mask,
      });
    } else {
      onHideRef.current();
      gsap.set(frame, {
        autoAlpha: 0,
        clipPath: 'inset(0 0 100% 0)',
        visibility: 'hidden',
        rotation: 0,
      });
    }
  }, [visible, reducedMotion, project, ensureFollowTweens, followPointer]);

  return { frameRef, resetTilt };
};
