'use client';

import {
  useCallback,
  useState,
  type MutableRefObject,
  type RefObject,
} from 'react';

import type { PreviewLayerHandle } from '@/components/projects/PreviewLayer';
import { captureRect, type RectSnapshot } from '@/lib/gsap';
import type { Project } from '@/lib/projects';

interface UseProjectOverlayOptions {
  previewRef: RefObject<PreviewLayerHandle | null>;
  hoveredRef: RefObject<Project | null>;
  desktopPreview: boolean;
  reducedMotion: boolean;
  clearHover: () => void;
}

export const useProjectOverlay = ({
  previewRef,
  hoveredRef,
  desktopPreview,
  reducedMotion,
  clearHover,
}: UseProjectOverlayOptions) => {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [fromRect, setFromRect] = useState<RectSnapshot | null>(null);

  const handleOpen = useCallback(
    (project: Project) => {
      previewRef.current?.resetTilt();
      const previewEl = previewRef.current?.getElement() ?? null;
      const rect =
        desktopPreview &&
        hoveredRef.current?.id === project.id &&
        !reducedMotion
          ? captureRect(previewEl)
          : null;

      setFromRect(rect);
      setOpenProject(project);
      clearHover();
    },
    [previewRef, hoveredRef, desktopPreview, reducedMotion, clearHover],
  );

  const handleClose = useCallback(() => {
    setOpenProject(null);
    setFromRect(null);
  }, []);

  return { openProject, fromRect, handleOpen, handleClose };
};
