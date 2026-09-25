'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export const registerGsap = () => {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
};

registerGsap();

export { gsap, ScrollTrigger };

export interface RectSnapshot {
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius: string;
}

export const captureRect = (element: HTMLElement | null): RectSnapshot | null => {
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return null;

  const styles = window.getComputedStyle(element);
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    borderRadius: styles.borderRadius || '16px',
  };
};
