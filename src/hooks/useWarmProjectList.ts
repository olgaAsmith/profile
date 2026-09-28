'use client';

import { useEffect, type RefObject } from 'react';
import { getImageProps } from 'next/image';

import { projects } from '@/lib/projects';

let coversDecoded = false;

const coverSrc = (cover: (typeof projects)[number]['cover']) => {
  const { props } = getImageProps({
    alt: '',
    src: cover,
    width: cover.width,
    height: cover.height,
    sizes: '460px',
  });
  return props.src;
};

const decodeCovers = () => {
  if (coversDecoded) return;
  coversDecoded = true;

  const run = () => {
    for (const project of projects) {
      const image = new Image();
      image.decoding = 'async';
      image.src = coverSrc(project.cover);
      image.decode?.().catch(() => {});
    }
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(run);
    return;
  }

  setTimeout(run, 200);
};

export const useWarmProjectList = (
  listRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) => {
  useEffect(() => {
    const list = listRef.current;
    if (!enabled || !list) return;

    const warm = () => {
      list.classList.add('is-warm');
      decodeCovers();
    };

    if (!('IntersectionObserver' in window)) {
      warm();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        warm();
        observer.disconnect();
      },
      { rootMargin: '240px 0px' },
    );

    observer.observe(list);
    return () => observer.disconnect();
  }, [enabled, listRef]);
};
