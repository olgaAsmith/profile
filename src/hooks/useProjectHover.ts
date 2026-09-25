'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';

import { usePointerMove } from '@/hooks/usePointerMove';
import type { Project } from '@/lib/projects';

const rowFromPoint = (x: number, y: number) => {
  const el = document.elementFromPoint(x, y);
  return el?.closest('.project-row') ?? null;
};

interface UseProjectHoverOptions {
  enabled: boolean;
  blockHoverRef: RefObject<boolean>;
}

export const useProjectHover = ({
  enabled,
  blockHoverRef,
}: UseProjectHoverOptions) => {
  const [hovered, setHovered] = useState<Project | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef<Project | null>(null);

  const clearHover = useCallback(() => {
    hoveredRef.current = null;
    setHovered(null);
  }, []);

  const handleHover = useCallback((project: Project | null) => {
    hoveredRef.current = project;
    setHovered(project);
  }, []);

  usePointerMove((event) => {
    pointerRef.current = { x: event.clientX, y: event.clientY };
    if (!hoveredRef.current || blockHoverRef.current) return;

    const row = rowFromPoint(event.clientX, event.clientY);
    if (!row || !listRef.current?.contains(row)) {
      clearHover();
    }
  }, enabled);

  useEffect(() => {
    if (!enabled) return;

    const syncHoverFromPoint = () => {
      if (!hoveredRef.current || blockHoverRef.current) return;
      const row = rowFromPoint(pointerRef.current.x, pointerRef.current.y);
      if (!row || !listRef.current?.contains(row)) {
        clearHover();
      }
    };

    const onLeaveWindow = () => clearHover();

    window.addEventListener('scroll', syncHoverFromPoint, {
      passive: true,
      capture: true,
    });
    document.addEventListener('mouseleave', onLeaveWindow);
    window.addEventListener('blur', onLeaveWindow);

    return () => {
      window.removeEventListener('scroll', syncHoverFromPoint, true);
      document.removeEventListener('mouseleave', onLeaveWindow);
      window.removeEventListener('blur', onLeaveWindow);
    };
  }, [enabled, blockHoverRef, clearHover]);

  return {
    hovered,
    hoveredRef,
    listRef,
    clearHover,
    handleHover,
  };
};
