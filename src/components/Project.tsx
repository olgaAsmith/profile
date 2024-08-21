import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface ProjectProps {
  id: number;
  name: string;
  description: string;
  stack: string;
  image: StaticImageData;
  deploy: string;
  gh: string;
}

export const Project = ({
  id,
  name,
  description,
  stack,
  image,
  deploy,
  gh,
}: ProjectProps) => {
  return (
    <li
      key={id}
      className='w-full rounded-3xl shadow-[0_0_10px_black] hover:shadow-[0_0_30px_black] transition-shadow duration-300 flex flex-col'
    >
      <Image
        className='object-cover w-full h-48 rounded-t-3xl sm:h-60 md:h-64 lg:h-72'
        src={image}
        alt='Изображение автора'
      />
      <div className='flex flex-col p-4 grow md:p-8'>
        <h2 className='mt-2 text-xl md:mt-4'>{name}</h2>
        <p className='mt-2 text-sm md:mt-6'>{description}</p>
        <p className='mt-2 mb-6 text-sm'>{`Стек: ${stack}`}</p>
        <div className='mt-auto flex flex-col gap-6 lg:flex-row'>
          <Link
            href={deploy}
            className='py-2 px-4 rounded-full bg-blue-950 transition-shadow duration-300 hover:shadow-[0_0_20px_grey] w-max'
            target='_blank'
          >
            Посмотреть проект
          </Link>
          <Link
            href={gh}
            className='py-2 px-4 rounded-full bg-blue-950 transition-shadow duration-300 hover:shadow-[0_0_20px_grey] w-max'
            target='_blank'
          >
            Посмотреть код
          </Link>
        </div>
      </div>
    </li>
  );
};
