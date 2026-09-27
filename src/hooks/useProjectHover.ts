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

const HOVER_COMMIT_MS = 300;

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
  const pendingRef = useRef<Project | null>(null);
  const activeRowRef = useRef<Element | null>(null);
  const commitTimer = useRef<number | null>(null);

  const markRow = useCallback((row: Element | null) => {
    const list = listRef.current;
    if (activeRowRef.current && activeRowRef.current !== row) {
      activeRowRef.current.classList.remove('is-active');
    }
    activeRowRef.current = row;
    row?.classList.add('is-active');
    list?.classList.toggle('is-dimming', Boolean(row));
  }, []);

  const cancelCommit = useCallback(() => {
    if (commitTimer.current === null) return;
    window.clearTimeout(commitTimer.current);
    commitTimer.current = null;
  }, []);

  const clearHover = useCallback(() => {
    cancelCommit();
    pendingRef.current = null;
    markRow(null);
    hoveredRef.current = null;
    setHovered(null);
  }, [cancelCommit, markRow]);

  const handleHover = useCallback(
    (project: Project | null, source?: HTMLElement | null) => {
      if (project && source) {
        markRow(source.closest('.project-row'));
      } else if (!project) {
        markRow(null);
      }

      if (!project) {
        cancelCommit();
        pendingRef.current = null;
        hoveredRef.current = null;
        setHovered(null);
        return;
      }

      if (hoveredRef.current?.id === project.id) {
        cancelCommit();
        pendingRef.current = null;
        return;
      }

      if (pendingRef.current?.id === project.id) return;

      cancelCommit();
      pendingRef.current = project;
      commitTimer.current = window.setTimeout(() => {
        commitTimer.current = null;
        pendingRef.current = null;
        hoveredRef.current = project;
        setHovered(project);
      }, HOVER_COMMIT_MS);
    },
    [cancelCommit, markRow],
  );

  usePointerMove((event) => {
    pointerRef.current = { x: event.clientX, y: event.clientY };
  }, enabled);

  useEffect(() => {
    if (!enabled) return;

    const syncHoverFromPoint = () => {
      if ((!hoveredRef.current && !activeRowRef.current) || blockHoverRef.current) {
        return;
      }
      const row = rowFromPoint(pointerRef.current.x, pointerRef.current.y);
      if (!row || !listRef.current?.contains(row)) {
        clearHover();
        return;
      }
      markRow(row);
    };

    const onLeaveWindow = () => clearHover();

    window.addEventListener('scroll', syncHoverFromPoint, {
      passive: true,
      capture: true,
    });
    document.addEventListener('mouseleave', onLeaveWindow);
    window.addEventListener('blur', onLeaveWindow);

    return () => {
      cancelCommit();
      window.removeEventListener('scroll', syncHoverFromPoint, true);
      document.removeEventListener('mouseleave', onLeaveWindow);
      window.removeEventListener('blur', onLeaveWindow);
    };
  }, [enabled, blockHoverRef, clearHover, markRow, cancelCommit]);

  return {
    hovered,
    hoveredRef,
    listRef,
    clearHover,
    handleHover,
  };
};
