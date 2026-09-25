import { categories, type CategoryId } from '@/lib/projects';

interface CategoryFilterProps {
  value: CategoryId;
  counts: Record<CategoryId, number>;
  onChange: (id: CategoryId) => void;
}

export const CategoryFilter = ({
  value,
  counts,
  onChange,
}: CategoryFilterProps) => {
  return (
    <div role='group' aria-label='Фильтр по типу работ' className='flex flex-wrap gap-2'>
      {categories.map((category) => {
        const isActive = value === category.id;

        return (
          <button
            key={category.id}
            type='button'
            aria-pressed={isActive}
            onClick={() => onChange(category.id)}
            className={`flex items-center gap-2 rounded-full border px-2 md:px-4 py-2 text-[0.7rem] transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:text-sm ${
              isActive
                ? 'border-fg bg-fg text-ink'
                : 'border-line/15 text-muted [@media(hover:hover)]:hover:border-line/40 [@media(hover:hover)]:hover:text-fg'
            }`}
          >
            {category.label}
            <span className='font-mono text-[0.55rem] opacity-60 md:text-[0.6875rem] hidden md:block'>
              {counts[category.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
};
