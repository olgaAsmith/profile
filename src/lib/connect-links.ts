import { site } from '@/lib/site';

export const connectLinks = [
  {
    href: site.github,
    label: 'GitHub',
    icon: '/icons/github.svg',
    external: true,
  },
  {
    href: `mailto:${site.email}`,
    label: 'E-mail',
    icon: '/icons/email.svg',
    external: false,
  },
  {
    href: site.telegram,
    label: 'Telegram',
    icon: '/icons/telegram.svg',
    external: true,
  },
];
