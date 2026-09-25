import { site } from '@/lib/site';
import { ConectList } from '../connect-list/ConectList';

export const Hero = () => {
  return (
    <section className='mx-auto max-w-shell px-5 md:px-10'>
      <header className='flex items-center justify-between gap-4 border-b border-line/10 py-2 lg:py-6'>
        <p className='font-mono text-xs lg:text-sm uppercase tracking-[0.3em] text-fg'>
          Портфолио
        </p>
        <ConectList />
      </header>

      <div className='py-8 pt-24 lg:py-20'>
        <h1 className='flex flex-col gap-6 md:gap-8'>
          <span className='font-mono text-lg uppercase tracking-[0.32em] text-muted lg:text-2xl'>
            {site.name}
          </span>
          <span className='break-words font-display text-role'>
            {site.role}
          </span>
        </h1>

        <p className='mt-8 max-w-2xl text-base leading-relaxed text-muted md:mt-10 lg:text-lg'>
          {site.intro}
        </p>

        <div className='mt-14 md:mt-16'>
          <p className='eyebrow lg:eyebrow-big'>Стек</p>
          <ul className='mt-4 flex flex-wrap gap-2 w-full lg:w-3/4'>
            {site.skills.map((skill) => (
              <li
                key={skill}
                className='flex items-center gap-2 rounded-full border border-line/15 bg-surface/90 px-2 py-1 text-xs md:text-sm text-fg md:px-4 md:py-2'
              >
                <span
                  className='h-1.5 w-1.5 rounded-full bg-accent'
                  aria-hidden
                />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='flex items-end justify-between border-t border-line/10 py-2 lg:py-6'>
        <a
          href='#works'
          className='font-mono text-sm uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg focus-visible:text-fg md:text-md hidden lg:block'
        >
          Список работ ↓
        </a>
      </div>
    </section>
  );
};
