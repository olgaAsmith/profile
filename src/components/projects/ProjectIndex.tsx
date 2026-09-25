'use client';

import { useMemo, useRef, useState } from 'react';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import {
  PreviewLayer,
  type PreviewLayerHandle,
} from '@/components/projects/PreviewLayer';
import { ProjectOverlay } from '@/components/projects/ProjectOverlay';
import { ProjectRow } from '@/components/projects/ProjectRow';
import { ProjectSlider } from '@/components/projects/ProjectSlider';
import { Cursor } from '@/components/ui/Cursor';
import { useEnvironment } from '@/hooks/useEnvironment';
import { useProjectHover } from '@/hooks/useProjectHover';
import { useProjectOverlay } from '@/hooks/useProjectOverlay';
import { categoryCounts, projects, type CategoryId } from '@/lib/projects';

export const ProjectIndex = () => {
  const { finePointer, reducedMotion, desktopPreview, ready } =
    useEnvironment();

  const [category, setCategory] = useState<CategoryId>('all');

  const previewRef = useRef<PreviewLayerHandle>(null);
  const blockHoverRef = useRef(false);

  const { hovered, hoveredRef, listRef, clearHover, handleHover } =
    useProjectHover({
      enabled: desktopPreview,
      blockHoverRef,
    });

  const { openProject, fromRect, handleOpen, handleClose } = useProjectOverlay({
    previewRef,
    hoveredRef,
    desktopPreview,
    reducedMotion,
    clearHover,
  });

  blockHoverRef.current = Boolean(openProject);

  const filtered = useMemo(
    () =>
      category === 'all'
        ? projects
        : projects.filter((project) => project.type === category),
    [category],
  );

  const handleCategory = (id: CategoryId) => {
    clearHover();
    setCategory(id);
  };

  const previewVisible =
    ready && desktopPreview && Boolean(hovered) && !openProject;

  return (
    <section
      id='works'
      className='mx-auto max-w-shell px-5 pb-6 py-4 lg:px-10 lg:py-24 lg:pb-24'
    >
      <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
        <div>
          <h2 className='mt-3 font-display text-headline'>Работы</h2>
        </div>
        <CategoryFilter
          value={category}
          counts={categoryCounts}
          onChange={handleCategory}
        />
      </div>

      {(!ready || !desktopPreview) && (
        <ProjectSlider
          projects={filtered}
          category={category}
          reducedMotion={reducedMotion}
          onOpen={handleOpen}
        />
      )}

      {ready && desktopPreview && (
        <ul
          ref={listRef}
          onMouseLeave={clearHover}
          className={`project-index mt-10 border-t border-line/10 md:mt-14 ${
            finePointer ? 'is-custom-cursor' : ''
          }`}
        >
          {filtered.map((project, index) => (
            <ProjectRow
              key={`${category}-${project.id}`}
              project={project}
              index={index}
              category={category}
              reducedMotion={reducedMotion}
              onHover={handleHover}
              onOpen={handleOpen}
            />
          ))}
        </ul>
      )}

      {ready && desktopPreview && (
        <>
          <PreviewLayer
            ref={previewRef}
            project={hovered}
            visible={previewVisible}
            reducedMotion={reducedMotion}
          />
          <Cursor
            active={Boolean(hovered) && !openProject}
            reducedMotion={reducedMotion}
          />
        </>
      )}

      <ProjectOverlay
        project={openProject}
        fromRect={fromRect}
        reducedMotion={reducedMotion}
        onClose={handleClose}
      />
    </section>
  );
};
