'use client';

import { useEffect, useState } from 'react';

interface Environment {
  finePointer: boolean;
  reducedMotion: boolean;
  desktopPreview: boolean;
  ready: boolean;
}

export const useEnvironment = (): Environment => {
  const [env, setEnv] = useState<Environment>({
    finePointer: false,
    reducedMotion: false,
    desktopPreview: false,
    ready: false,
  });

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopQuery = window.matchMedia('(min-width: 1024px)');

    const sync = () => {
      setEnv({
        finePointer: pointerQuery.matches,
        reducedMotion: motionQuery.matches,
        desktopPreview: desktopQuery.matches,
        ready: true,
      });
    };

    sync();

    pointerQuery.addEventListener('change', sync);
    motionQuery.addEventListener('change', sync);
    desktopQuery.addEventListener('change', sync);

    return () => {
      pointerQuery.removeEventListener('change', sync);
      motionQuery.removeEventListener('change', sync);
      desktopQuery.removeEventListener('change', sync);
    };
  }, []);

  return env;
};
