import type { StaticImageData } from 'next/image';

//import AboutTeamCover from '../../public/covers/aboutteam.webp';
import AboveSeaCover from '../../public/covers/abovesea.webp';
import Bitroid from '../../public/covers/bitroid.webp';
import BrightTechCover from '../../public/covers/brighttech.webp';
import CircleCover from '../../public/covers/circle.webp';
import CardGameCover from '../../public/covers/cardgame.webp';
import JourneysCover from '../../public/covers/journeys.webp';
//import MrBooCover from '../../public/covers/mrboo.webp';
import PageCrmCover from '../../public/covers/pagecrm.webp';
import RecordLabelCover from '../../public/covers/recordlabel.webp';
import RickAndMortyCover from '../../public/covers/ricknmorty.webp';
import SaveCover from '../../public/covers/save.webp';
import SoftlineCover from '../../public/covers/softline.webp';
//import TimerCover from '../../public/covers/timer.webp';
import WordsCover from '../../public/covers/words.webp';

export type ProjectType = 'app' | 'landing' | 'motion';

export const projectTypeLabels: Record<ProjectType, string> = {
  app: 'Приложение',
  landing: 'Лендинг',
  motion: 'Анимация',
};

export interface Project {
  id: number;
  slug: string;
  name: string;
  type: ProjectType;
  role: string;
  description: string;
  stack: string[];
  deploy: string;
  gh: string;
  cover: StaticImageData;
  preview?: string;
  accent: string;
  alt: string;
}

export const categories = [
  { id: 'all', label: 'Все работы' },
  { id: 'app', label: 'Приложения' },
  { id: 'landing', label: 'Лендинги' },
  { id: 'motion', label: 'Анимации' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];

export const projects: Project[] = [
  {
    id: 15,
    slug: 'record-label',
    name: 'RecordLabel',
    type: 'motion',
    role: 'Фронтенд, анимация',
    description:
      'Лендинг с интерактивными анимациями. Библиотека GSAP и плагин ScrollTrigger.',
    stack: ['Next.js', 'React', 'TypeScript', 'GSAP', 'CSS Modules'],
    deploy: 'https://record-label-tau.vercel.app/',
    gh: 'https://github.com/olgaAsmith/RecordLabel',
    cover: RecordLabelCover,
    accent: '#B6FF3B',
    alt: 'Лендинга RecordLabel: сцена концерта, крупный заголовок и эквалайзер',
  },
  {
    id: 14,
    slug: 'card-game-durak',
    name: 'Card Game — Durak',
    type: 'app',
    role: 'Фронтенд, игровая логика',
    description:
      'Классическая карточная игра «Дурак» с состоянием партии на Zustand.',
    stack: ['React', 'Next.js', 'TypeScript', 'Zustand', 'Tailwind'],
    deploy: 'https://card-game-pi-pearl.vercel.app/',
    gh: 'https://github.com/olgaAsmith/CardGame',
    cover: CardGameCover,
    accent: '#8B5CF6',
    alt: 'Игровой стол «Дурака» с неоновыми картами на тёмном фоне',
  },
  {
    id: 16,
    slug: 'historical-dates',
    name: 'Historical Dates',
    type: 'app',
    role: 'Фронтенд, интерактивный UI',
    description:
      'Круговой таймлайн событий 1920–1991: категории, факты по годам, автопрокрутка и управление с клавиатуры.',
    stack: ['React', 'TypeScript', 'Webpack 5', 'SCSS'],
    deploy: 'https://circle-5bw4.vercel.app/',
    gh: 'https://github.com/olgaAsmith/circle',
    cover: CircleCover,
    accent: '#ea3373',
    alt:
      'Интерактивный таймлайн «Исторические даты»: круг категорий, карточка факта и панель навигации',
  },
  {
    id: 5,
    slug: 'rick-and-morty',
    name: '«Rick and Morty» search',
    type: 'app',
    role: 'Фронтенд, работа с API',
    description: 'Поиск по вселенной Rick and Morty с фильтрами и пагинацией.',
    stack: ['Next.js', 'React', 'TypeScript', 'Zustand', 'shadcn/ui'],
    deploy: 'https://rick-morty-mu-vert.vercel.app/',
    gh: 'https://github.com/olgaAsmith/rick-morty',
    cover: RickAndMortyCover,
    accent: '#3DDC97',
    alt: 'Страница поиска по вселенной Rick and Morty: форма фильтров и список персонажей',
  },
  {
    id: 2,
    slug: 'save-or-not',
    name: 'Save…Or-Not',
    type: 'app',
    role: 'Фронтенд, формы',
    description:
      'Многостраничник на Next.js: роутинг, формы на React Hook Form, лёгкие анимации.',
    stack: ['Next.js', 'React', 'TypeScript', 'Sass'],
    deploy: 'https://olgaasmith.github.io/Save...Or-Not/',
    gh: 'https://github.com/olgaAsmith/Save...Or-Not',
    cover: SaveCover,
    accent: '#F2A413',
    alt: 'Первый экран сайта игры Survive at All Costs с заголовком и кнопкой покупки',
  },
  {
    id: 1,
    slug: 'journeys',
    name: 'Journeys',
    type: 'motion',
    role: 'Вёрстка, CSS-анимация',
    description:
      'Лендинг горных туров: адаптивная вёрстка и анимации на keyframes.',
    stack: ['HTML', 'CSS Animation', 'JavaScript'],
    deploy: 'https://olgaasmith.github.io/Journeys/',
    gh: 'https://github.com/olgaAsmith/Journeys',
    cover: JourneysCover,
    accent: '#7FA8C9',
    alt: 'Лендинг горных туров: панорама гор, заголовок и форма подбора программы',
  },
  {
    id: 2001,
    slug: 'Bitroid',
    name: 'Bitro ID',
    type: 'landing',
    role: 'Вёрстка, адаптив, JS-интерактив',
    description:
      'Одностраничный лендинг услуги создания сайта с SEO: карусель кейсов, FAQ, форма заявки с валидацией и маской телефона.',
    stack: [
      'HTML5',
      'CSS3 (BEM)',
      'JavaScript',
      'jQuery',
      'Owl Carousel 2',
      'jQuery Validate',
    ],
    deploy: 'https://olgaasmith.github.io/land-po1/',
    gh: 'https://github.com/olgaAsmith/land-po1',
    cover: Bitroid,
    accent: '#34AE6B',
    alt: 'Лендинг создания сайтов с SEO',
  },
  {
    id: 12,
    slug: 'words-trainer',
    name: 'Words Trainer',
    type: 'app',
    role: 'Фронтенд, работа с файлами',
    description:
      'Тренажёр для изучения слов: импорт словаря из CSV и XLSX, режим викторины.',
    stack: ['Vue 3', 'PapaParse', 'SheetJS'],
    deploy: 'https://olgaasmith.github.io/WordQuiz/',
    gh: 'https://github.com/olgaAsmith/WordQuiz',
    cover: WordsCover,
    accent: '#2F6FEB',
    alt: 'Интерфейс тренажёра слов: таблица словаря с переводами и кнопками',
  },
  /* {
    id: 8,
    slug: 'about-team',
    name: 'About Team',
    type: 'app',
    role: 'Фронтенд, состояние на RTK',
    description:
      'Регистрация пользователя и динамические роуты Next.js в связке с Redux Toolkit.',
    stack: ['Next.js', 'React', 'TypeScript', 'Redux Toolkit'],
    deploy: 'https://about-team-dpielwx4h-ukolas-projects.vercel.app',
    gh: 'https://github.com/olgaAsmith/AboutTeam',
    cover: AboutTeamCover,
    accent: '#5FCFB0',
    alt: 'Страница команды с карточками сотрудников',
  }, */
  /*  {
    id: 9,
    slug: 'timer',
    name: 'Timer',
    type: 'app',
    role: 'Фронтенд',
    description:
      'Приложение таймеров: создание, удаление и параллельный обратный отсчёт.',
    stack: ['React', 'TypeScript', 'SCSS', 'Vite'],
    deploy: 'https://olgaasmith.github.io/Timer/',
    gh: 'https://github.com/olgaAsmith/Timer',
    cover: TimerCover,
    accent: '#22C55E',
    alt: 'Экран таймера: круговой индикатор обратного отсчёта и кнопки управления',
  }, */
  {
    id: 4,
    slug: 'page-crm',
    name: 'Page CRM',
    type: 'landing',
    role: 'Адаптивная вёрстка',
    description:
      'Лендинг с кроссбраузерной вёрсткой, интерактивными элементами и формами.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    deploy: 'https://olgaasmith.github.io/pagecrm/',
    gh: 'https://github.com/olgaAsmith/pagecrm',
    cover: PageCrmCover,
    accent: '#8E24E8',
    alt: 'Секция лендинга Page CRM: иконки преимуществ и карточки CRM-систем',
  },
  {
    id: 7,
    slug: 'bright-tech',
    name: 'BrightTech',
    type: 'landing',
    role: 'Вёрстка на Bootstrap',
    description: 'Лендинг музыкального проекта, свёрстанный на Bootstrap.',
    stack: ['HTML', 'Sass', 'Bootstrap', 'Webpack'],
    deploy: 'https://olgaasmith.github.io/BrightTech/',
    gh: 'https://github.com/olgaAsmith/BrightTech',
    cover: BrightTechCover,
    accent: '#A855F7',
    alt: 'Секция лендинга BrightTech: карточки новостей и блок об исполнителе',
  },
  {
    id: 6,
    slug: 'above-sea',
    name: 'Above Sea',
    type: 'landing',
    role: 'Pixel perfect вёрстка',
    description:
      'Лендинг поставщика оборудования: pixel perfect, адаптивность.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    deploy: 'https://olgaasmith.github.io/above-sea/',
    gh: 'https://github.com/olgaAsmith/above-sea',
    cover: AboveSeaCover,
    accent: '#1E2FCB',
    alt: 'Секция лендинга Above Sea: логотипы производителей и схема работы',
  },
  {
    id: 10,
    slug: 'softline',
    name: 'Softline',
    type: 'landing',
    role: 'Адаптивная вёрстка',
    description: 'Одностраничный адаптивный сайт-визитка IT-компании.',
    stack: ['HTML', 'SCSS', 'JavaScript'],
    deploy: 'https://olgaasmith.github.io/softline/',
    gh: 'https://github.com/olgaAsmith/softline',
    cover: SoftlineCover,
    accent: '#E4002B',
    alt: 'Первый экран лендинга Softline: заголовок об услугах цифровой трансформации',
  },
  /*  {
    id: 11,
    slug: 'mr-boo',
    name: 'Mr.Boo',
    type: 'landing',
    role: 'Адаптивная вёрстка',
    description: 'Одностраничный адаптивный сайт-визитка мем-проекта.',
    stack: ['HTML', 'SCSS'],
    deploy: 'https://olgaasmith.github.io/mrBoo/',
    gh: 'https://github.com/olgaAsmith/mrBoo',
    cover: MrBooCover,
    accent: '#0B4FC8',
    alt: 'Первый экран лендинга $MrBOOST с крупным логотипом и ссылками на соцсети',
  }, */
];

export const categoryCounts = categories.reduce(
  (acc, category) => ({
    ...acc,
    [category.id]:
      category.id === 'all'
        ? projects.length
        : projects.filter((project) => project.type === category.id).length,
  }),
  {} as Record<CategoryId, number>,
);
