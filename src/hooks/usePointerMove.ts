'use client';

import { useEffect, useRef } from 'react';

type PointerListener = (event: PointerEvent) => void;

const listeners = new Set<PointerListener>();
let attached = false;

const emit = (event: PointerEvent) => {
  listeners.forEach((listener) => listener(event));
};

export const usePointerMove = (listener: PointerListener, enabled = true) => {
  const listenerRef = useRef(listener);
  listenerRef.current = listener;

  useEffect(() => {
    if (!enabled) return;

    const wrapper = (event: PointerEvent) => {
      listenerRef.current(event);
    };

    listeners.add(wrapper);

    if (!attached) {
      window.addEventListener('pointermove', emit, { passive: true });
      attached = true;
    }

    return () => {
      listeners.delete(wrapper);

      if (listeners.size === 0 && attached) {
        window.removeEventListener('pointermove', emit);
        attached = false;
      }
    };
  }, [enabled]);
};
