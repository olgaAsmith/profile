export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  cinema: 1.2,
  previewFollow: 0.55,
  previewReveal: 0.5,
  imageSwap: 0.45,
  liveScroll: 8,
  liveScrollDelay: 0.6,
  liveScrollRestartDelay: 1.4,
  overlay: 0.85,
};

export const ease = {
  outExpo: 'power3.out',
  inOut: 'power3.inOut',
  mask: 'power2.inOut',
  linear: 'none',
};

export const staggerDelay = (index: number, step = 0.05, max = 0.3) =>
  Math.min(index * step, max);
