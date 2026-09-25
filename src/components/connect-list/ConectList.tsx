import Image from 'next/image';
import Link from 'next/link';

import { connectLinks } from '@/lib/connect-links';

export const ConectList = () => (
  <ul className='flex items-center gap-1 lg:gap-2'>
    {connectLinks.map(({ href, label, icon, external }) => (
      <li key={label} className='group relative'>
        <Link
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          aria-label={label}
          className='relative flex h-10 w-10 items-center justify-center rounded-full outline-none transition-colors duration-base ease-out-expo focus-visible:bg-line/[0.04] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-line/[0.04]'
        >
          <Image
            src={icon}
            alt=''
            width={26}
            height={26}
            aria-hidden
            className='h-5 w-5 opacity-70 transition-opacity duration-slow ease-out-expo group-focus-visible:opacity-100 lg:h-[26px] lg:w-[26px] [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100'
          />
        </Link>

        <span
          role='tooltip'
          className='pointer-events-none absolute left-1/2 top-[calc(100%+0.4rem)] z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-line/10 bg-surface/95 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] opacity-0 transition-opacity duration-base ease-out-expo [@media(hover:hover)_and_(pointer:fine)]:block [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100'
        >
          {label}
          <span
            aria-hidden
            className='absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-line/10 bg-surface/95'
          />
        </span>
      </li>
    ))}
  </ul>
);
