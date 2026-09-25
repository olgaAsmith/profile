import { site } from '@/lib/site';
import { ConectList } from '../connect-list/ConectList';

export const Footer = () => {
  return (
    <footer
      id='footer'
      className='mx-auto max-w-shell p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] lg:p-10 lg:pb-10'
    >
      <div className='lg:mt-14 mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line/10 lg:pt-6 pt-2 '>
        <div className='flex flex-col gap-2 text-[0.525rem] lg:text-xs font-mono uppercase tracking-[0.18em] text-muted'>
          <span className='whitespace-nowrap'>{site.name}</span>
          <span className='whitespace-nowrap'>{site.role}</span>
        </div>
        <ConectList />
      </div>
    </footer>
  );
};
