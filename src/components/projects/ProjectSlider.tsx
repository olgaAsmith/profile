'use client';

import { useRef, useState, type CSSProperties } from 'react';
import { Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProjectSlideContent } from '@/components/projects/ProjectSlideContent';
import type { CategoryId, Project } from '@/lib/projects';

import 'swiper/css';

const SLIDE_GAP = 16;

const navButtonClass =
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line/15 text-fg transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [@media(hover:hover)]:hover:border-line/40 [@media(hover:hover)]:hover:bg-line/[0.04]';

const SliderChevron = ({ direction }: { direction: 'prev' | 'next' }) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    aria-hidden
    className={direction === 'next' ? 'rotate-180' : undefined}
  >
    <path
      d='M10 4.5 6 8l4 3.5'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

interface ProjectSliderProps {
  projects: Project[];
  category: CategoryId;
  reducedMotion: boolean;
  onOpen: (project: Project) => void;
}

export const ProjectSlider = ({
  projects,
  category,
  reducedMotion,
  onOpen,
}: ProjectSliderProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (projects.length === 0) {
    return (
      <p className='mt-10 text-sm text-muted'>Нет работ в этой категории.</p>
    );
  }

  const loop = projects.length > 1;
  const sliderKey = `${category}-${projects.map((project) => project.id).join('-')}`;
  const shellStyle = { '--slide-gap': `${SLIDE_GAP}px` } as CSSProperties;

  return (
    <div
      className='project-slider-shell relative left-1/2 mt-8 -translate-x-1/2 lg:mt-16'
      style={shellStyle}
    >
      <Swiper
        key={sliderKey}
        modules={[Keyboard]}
        loop={loop}
        observer
        observeParents
        slidesPerView={1}
        spaceBetween={SLIDE_GAP}
        speed={reducedMotion ? 0 : 650}
        keyboard={{ enabled: true }}
        grabCursor
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className='project-slider w-full max-w-full'
      >
        {projects.map((project, index) => (
          <SwiperSlide key={project.id}>
            <ProjectSlideContent
              project={project}
              index={index}
              category={category}
              playEnterAnimation={index === 0}
              reducedMotion={reducedMotion}
              onOpen={onOpen}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {loop && (
        <nav
          aria-label='Навигация по работам'
          className='mt-6 flex items-center justify-between px-[var(--slide-gap)]'
        >
          <button
            type='button'
            className={navButtonClass}
            aria-label='Предыдущий проект'
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <SliderChevron direction='prev' />
          </button>

          <p
            className='font-mono text-xs tabular-nums text-muted'
            aria-live='polite'
            aria-atomic='true'
          >
            <span className='text-fg'>
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className='opacity-40'> / </span>
            {String(projects.length).padStart(2, '0')}
          </p>

          <button
            type='button'
            className={navButtonClass}
            aria-label='Следующий проект'
            onClick={() => swiperRef.current?.slideNext()}
          >
            <SliderChevron direction='next' />
          </button>
        </nav>
      )}
    </div>
  );
};
