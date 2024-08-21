import BrightTechMain from '../../public/brighttech.jpg';
import AboveSeaMain from '../../public/abovesea.jpg';
import AboutTeamMain from '../../public/aboutteam.jpg';
import SaveMain from '../../public/save.jpg';
import PagecrmMain from '../../public/pagecrm.jpg';
import TimerMain from '../../public/timer.jpg';
import SoftlineMain from '../../public/softline.jpg';
import MrbooMain from '../../public/mrboo.jpg';

export const projects = [
  {
    id: 1,
    name: 'Save...Or-Not',
    description:
      'Информационная страничка об игре. Работа с React hook form, немного анимации и библиотеки React.',
    class: 'React',
    stack: 'Next.js, React, Typescript, Sass',
    deploy: 'https://olgaasmith.github.io/Save...Or-Not/',
    gh: 'https://github.com/olgaAsmith/Save...Or-Not',
    image: SaveMain,
  },
  {
    id: 2,
    name: 'Page CRM',
    description:
      'Информационная страничка для сайта - кроссбраузерная и адаптивная верстка.',
    class: 'HTML',
    stack: 'HTML, CSS, Javascript',
    deploy: 'https://olgaasmith.github.io/pagecrm/',
    gh: 'https://github.com/olgaAsmith/pagecrm',
    image: PagecrmMain,
  },

  {
    id: 3,
    name: 'Above Sea',
    description: 'Landing page - верстка по макету',
    class: 'HTML',
    stack: 'HTML, СSS, Javascript',
    deploy: 'https://olgaasmith.github.io/above-sea/',
    gh: 'https://github.com/olgaAsmith/above-sea',
    image: AboveSeaMain,
  },
  {
    id: 4,
    name: 'BrightTech',
    description: 'Landing page - верстка по макету',
    class: 'HTML',
    stack: 'HTML, Sass, Bootstrap, Webpack',
    deploy: 'https://olgaasmith.github.io/BrightTech/',
    gh: 'https://github.com/olgaAsmith/BrightTech',
    image: BrightTechMain,
  },
  {
    id: 5,
    name: 'About Team',
    description:
      'Регистрация пользователя, динамические роуты Next в сочетании с RTK.',
    class: 'React',
    stack: 'Next.js, React, Typescript, Redux Toolkit',
    deploy: 'https://about-team-dpielwx4h-ukolas-projects.vercel.app',
    gh: 'https://github.com/olgaAsmith/AboutTeam',
    image: AboutTeamMain,
  },
  {
    id: 6,
    name: 'Timer',
    description:
      'Timer - небольшое приложение на React. Создание, удаление, отсчет таймеров.',
    class: 'React',
    stack: 'React, Typescript, SCSS, Vite',
    deploy: 'https://olgaasmith.github.io/Timer/',
    gh: 'https://github.com/olgaAsmith/Timer',
    image: TimerMain,
  },
  {
    id: 7,
    name: 'Softline',
    description: 'Landing page - одностраничный сайт.',
    class: 'HTML',
    stack: 'HTML, SCSS, Javascript',
    deploy: 'https://olgaasmith.github.io/softline/',
    gh: 'https://github.com/olgaAsmith/softline',
    image: SoftlineMain,
  },
  {
    id: 8,
    name: 'Mr.Boo',
    description: 'Landing page - одностраничный сайт.',
    class: 'HTML',
    stack: 'HTML, SCSS',
    deploy: 'https://olgaasmith.github.io/mrBoo/',
    gh: 'https://github.com/olgaAsmith/mrBoo',
    image: MrbooMain,
  },
];
