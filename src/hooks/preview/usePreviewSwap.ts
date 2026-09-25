'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useGSAP } from '@gsap/react';

import {
  getScrollNode,
  resetScrollLayer,
  stopScrollLayer,
} from '@/hooks/preview/scroll-image';
import { gsap } from '@/lib/gsap';
import { duration, ease } from '@/lib/motion';
import type { Project } from '@/lib/projects';

interface UsePreviewSwapOptions {
  project: Project | null;
  visible: boolean;
  reducedMotion: boolean;
}

export const usePreviewSwap = ({
  project,
  visible,
  reducedMotion,
}: UsePreviewSwapOptions) => {
  
  const stageRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(visible);
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const scrollRestart = useRef<gsap.core.Tween | null>(null);
  const frontRef = useRef<Project | null>(null);

  const [front, setFront] = useState<Project | null>(null);
  const [back, setBack] = useState<Project | null>(null);
  const [frontIsPrimary, setFrontIsPrimary] = useState(true);
  const [swapKey, setSwapKey] = useState(0);

  visibleRef.current = visible;

  const resetScrollLayers = useCallback(() => {
    resetScrollLayer(primaryRef.current);
    resetScrollLayer(secondaryRef.current);
  }, []);

  const stopAnimations = useCallback(() => {
    scrollTween.current?.kill();
    scrollRestart.current?.kill();
    resetScrollLayers();
  }, [resetScrollLayers]);

  useEffect(() => {
    if (!visible) {
      frontRef.current = null;
      return;
    }

    if (!project) return;

    if (!frontRef.current) {
      frontRef.current = project;
      setFront(project);
      setBack(null);
      setFrontIsPrimary(true);
      setSwapKey((key) => key + 1);
      return;
    }

    if (frontRef.current.id === project.id) return;

    setBack(frontRef.current);
    frontRef.current = project;
    setFront(project);
    setFrontIsPrimary((value) => !value);
    setSwapKey((key) => key + 1);
  }, [project, visible]);

  useLayoutEffect(() => {
    const primary = primaryRef.current;
    const secondary = secondaryRef.current;
    if (!primary || !secondary || !front || !visible) return;

    const incoming = frontIsPrimary ? primary : secondary;
    const outgoing = frontIsPrimary ? secondary : primary;

    gsap.killTweensOf([incoming, outgoing], 'clipPath,autoAlpha,opacity');

    if (reducedMotion) {
      gsap.set(incoming, { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1 });
      gsap.set(outgoing, { clipPath: 'inset(0 0 100% 0)', autoAlpha: 0 });
      return;
    }

    if (back) {
      gsap.set(outgoing, { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1 });
      gsap.set(incoming, { clipPath: 'inset(100% 0 0 0)', autoAlpha: 1 });
    } else {
      gsap.set(incoming, { clipPath: 'inset(100% 0 0 0)', autoAlpha: 1 });
      gsap.set(outgoing, { clipPath: 'inset(0 0 100% 0)', autoAlpha: 0 });
    }
  }, [swapKey, frontIsPrimary, reducedMotion, visible, front, back]);

  useGSAP(() => {
    const primary = primaryRef.current;
    const secondary = secondaryRef.current;
    if (!primary || !secondary || !front || !visible) return;

    const incoming = frontIsPrimary ? primary : secondary;
    const outgoing = frontIsPrimary ? secondary : primary;

    scrollTween.current?.kill();
    scrollRestart.current?.kill();
    stopScrollLayer(outgoing);
    resetScrollLayer(incoming);

    if (reducedMotion) {
      resetScrollLayer(outgoing);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        resetScrollLayer(outgoing);

        const target = getScrollNode(incoming);
        if (!target || !stageRef.current || !visibleRef.current) return;

        const stageHeight = stageRef.current.clientHeight;
        const imageHeight = Math.max(target.offsetHeight, stageHeight * 1.8);
        const travel = Math.min(0, stageHeight - imageHeight);
        if (travel >= -8) return;

        scrollTween.current = gsap.fromTo(
          target,
          { y: 0 },
          {
            y: travel,
            duration: duration.liveScroll,
            delay: duration.liveScrollDelay,
            ease: ease.linear,
            onComplete: () => {
              if (!visibleRef.current) return;

              scrollRestart.current = gsap.delayedCall(
                duration.liveScrollRestartDelay,
                () => {
                  if (!visibleRef.current || !frontRef.current) return;

                  setBack(frontRef.current);
                  setFrontIsPrimary((value) => !value);
                  setSwapKey((key) => key + 1);
                },
              );
            },
          },
        );
      },
    });

    tl.to(
      outgoing,
      {
        clipPath: 'inset(0 0 100% 0)',
        duration: duration.imageSwap,
        ease: ease.mask,
      },
      0,
    ).to(
      incoming,
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: duration.imageSwap,
        ease: ease.mask,
      },
      0,
    );
  }, [swapKey, frontIsPrimary, reducedMotion, visible, front]);

  const primaryProject = frontIsPrimary ? front : back;
  const secondaryProject = frontIsPrimary ? back : front;

  return {
    stageRef,
    primaryRef,
    secondaryRef,
    primaryProject,
    secondaryProject,
    stopAnimations,
  };
};
