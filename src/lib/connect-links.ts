import { withBasePath } from '@/lib/base-path';
import { site } from '@/lib/site';

export const connectLinks = [
  {
    href: site.github,
    label: 'GitHub',
    icon: withBasePath('/icons/github.svg'),
    external: true,
  },
  {
    href: `mailto:${site.email}`,
    label: 'E-mail',
    icon: withBasePath('/icons/email.svg'),
    external: false,
  },
  {
    href: site.telegram,
    label: 'Telegram',
    icon: withBasePath('/icons/telegram.svg'),
    external: true,
  },
];
