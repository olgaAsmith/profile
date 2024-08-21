'use client';

import { useState } from 'react';
import { projects } from '../local/data';
import { Project } from '@/components/Project';
import Link from 'next/link';

export default function Home() {
  const [activeButton, setActiveButton] = useState('All');

  const getButtonClass = (buttonName: string) => {
    const baseClass =
      'py-2 px-4 rounded-full bg-blue-950 transition-shadow duration-300 cursor-pointer w-max';
    const activeClass = 'shadow-[0_0_20px_grey]';
    const hoverClass = 'hover:shadow-[0_0_20px_black]';

    return activeButton === buttonName
      ? `${baseClass} ${activeClass}`
      : `${baseClass} ${hoverClass}`;
  };

  const filteredProjects = projects.filter((project) => {
    if (activeButton === 'All') {
      return true;
    }
    return project.class === activeButton;
  });

  return (
    <section className='relative'>
      <nav>
        <ul className='flex flex-col gap-6 justify-center sm:items-center md:flex-row'>
          <li
            onClick={() => setActiveButton('All')}
            className={getButtonClass('All')}
          >
            Все проекты
          </li>
          <li
            onClick={() => setActiveButton('React')}
            className={getButtonClass('React')}
          >
            React
          </li>
          <li
            onClick={() => setActiveButton('HTML')}
            className={getButtonClass('HTML')}
          >
            HTML + Javascript
          </li>
        </ul>
      </nav>

      <ul className='max-w-screen-xl w-full grid grid-cols-1 gap-10 w-full rounded-3xl mt-12 mx-auto md:shadow-[0_0_10px_black] md:p-8 md:w-3/4 lg:w-full lg:grid-cols-2'>
        {filteredProjects.map((project) => (
          <Project
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
            stack={project.stack}
            image={project.image}
            deploy={project.deploy}
            gh={project.gh}
          />
        ))}
      </ul>
      <Link
        href='https://github.com/olgaAsmith'
        className='absolute top-[8px] right-0 opacity-50 hover:opacity-100 hover:font-bold hover:tracking-[.25em] transition-all duration-300'
        target='_blank'
      >
        GitHub page
      </Link>
    </section>
  );
}
