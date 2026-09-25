'use client';

import { MaskText } from '@/components/ui/MaskText';
import { staggerDelay } from '@/lib/motion';
import { projectTypeLabels, type CategoryId, type Project } from '@/lib/projects';

const accentOnHover =
  '[@media(hover:hover)_and_(pointer:fine)]:group-hover/btn:text-accent';
const accentOnFocus = 'group-focus-visible/btn:text-accent';

interface ProjectRowProps {
  project: Project;
  index: number;
  category: CategoryId;
  reducedMotion: boolean;
  onHover: (project: Project | null) => void;
  onOpen: (project: Project) => void;
}

export const ProjectRow = ({
  project,
  index,
  category,
  reducedMotion,
  onHover,
  onOpen,
}: ProjectRowProps) => {
  const number = String(index + 1).padStart(2, '0');
  const stackLine = project.stack.slice(0, 3).join(' · ');

  return (
    <li className='project-row border-b border-line/10 last:border-b-0'>
      <button
        type='button'
        onClick={(e) => {
          onOpen(project);
          e.currentTarget.blur();
        }}
        onMouseEnter={() => onHover(project)}
        onFocus={() => onHover(project)}
        onBlur={() => onHover(null)}
        aria-label={`${project.name}, ${projectTypeLabels[project.type]}`}
        className='group/btn flex w-full touch-manipulation flex-col py-4 text-left transition-transform duration-base ease-out-expo focus-visible:translate-x-5 md:py-7 [@media(hover:hover)_and_(pointer:fine)]:hover:translate-x-5'
      >
        <div className='flex items-baseline gap-3 md:gap-6'>
          <span
            className={`shrink-0 font-mono text-[0.6875rem] tabular-nums text-muted transition-colors duration-fast md:text-xs ${accentOnHover} ${accentOnFocus}`}
          >
            {number}
          </span>

          <div className='min-w-0 flex-1'>
            <MaskText
              delay={staggerDelay(index)}
              disabled={reducedMotion}
              triggerKey={category}
              className='block min-w-0'
            >
              <span
                className={`font-display text-title leading-[1.05] tracking-[-0.02em] text-fg transition-colors duration-fast ${accentOnHover} ${accentOnFocus}`}
              >
                {project.name}
              </span>
            </MaskText>
          </div>

          <div className='ml-auto flex shrink-0 items-center gap-x-6'>
            <span className='eyebrow text-subtitle'>
              {projectTypeLabels[project.type]}
            </span>
            <span className='hidden max-w-[18rem] truncate font-mono text-[0.75rem] text-muted lg:inline'>
              {stackLine}
            </span>
          </div>
        </div>
      </button>
    </li>
  );
};
