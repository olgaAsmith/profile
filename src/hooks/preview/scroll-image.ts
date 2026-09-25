import { gsap } from '@/lib/gsap';

export const getScrollNode = (layer: HTMLElement | null) =>
  layer?.querySelector('[data-scroll-image]') as HTMLElement | null;

export const stopScrollLayer = (layer: HTMLElement | null) => {
  const node = getScrollNode(layer);
  if (!node) return;
  gsap.killTweensOf(node);
};

export const resetScrollLayer = (layer: HTMLElement | null) => {
  const node = getScrollNode(layer);
  if (!node) return;
  gsap.killTweensOf(node);
  gsap.set(node, { y: 0, clearProps: 'transform' });
};
