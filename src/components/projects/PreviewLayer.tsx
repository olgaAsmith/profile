'use client';

import { forwardRef, useImperativeHandle } from 'react';

import { MediaImage } from '@/components/ui/MediaImage';
import { usePreviewFollow } from '@/hooks/preview/usePreviewFollow';
import { usePreviewSwap } from '@/hooks/preview/usePreviewSwap';
import type { Project } from '@/lib/projects';

export interface PreviewLayerHandle {
  getElement: () => HTMLDivElement | null;
  resetTilt: () => void;
}

interface PreviewLayerProps {
  project: Project | null;
  visible: boolean;
  reducedMotion: boolean;
}

export const PreviewLayer = forwardRef<PreviewLayerHandle, PreviewLayerProps>(
  function PreviewLayer({ project, visible, reducedMotion }, ref) {
    const {
      stageRef,
      primaryRef,
      secondaryRef,
      primaryProject,
      secondaryProject,
      stopAnimations,
    } = usePreviewSwap({ project, visible, reducedMotion });

    const { frameRef, resetTilt } = usePreviewFollow({
      visible,
      reducedMotion,
      project,
      onHide: stopAnimations,
    });

    useImperativeHandle(ref, () => ({
      getElement: () => frameRef.current,
      resetTilt,
    }));

    return (
      <div
        ref={frameRef}
        aria-hidden='true'
        className='pointer-events-none fixed left-0 top-0 z-[55] h-[min(300px,36vh)] w-[min(460px,70vw)] overflow-hidden rounded-2xl border border-line/15 bg-surface'
        style={{
          clipPath: 'inset(0 0 100% 0)',
          opacity: 0,
          visibility: 'hidden',
          borderColor: project ? `${project.accent}66` : undefined,
        }}
      >
        <div ref={stageRef} className='relative h-full w-full overflow-hidden'>
          <div ref={primaryRef} className='absolute inset-0 overflow-hidden'>
            {primaryProject && (
              <div
                key={primaryProject.id}
                data-scroll-image
                className='absolute inset-x-0 top-0 min-h-[180%] will-change-transform'
              >
                <MediaImage
                  src={primaryProject.preview ?? primaryProject.cover}
                  alt=''
                  sizes='460px'
                  className='h-full min-h-[180%] w-full object-cover object-top'
                />
              </div>
            )}
          </div>
          <div ref={secondaryRef} className='absolute inset-0 overflow-hidden'>
            {secondaryProject && (
              <div
                key={secondaryProject.id}
                data-scroll-image
                className='absolute inset-x-0 top-0 min-h-[180%] will-change-transform'
              >
                <MediaImage
                  src={secondaryProject.preview ?? secondaryProject.cover}
                  alt=''
                  sizes='460px'
                  className='h-full min-h-[180%] w-full object-cover object-top'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
