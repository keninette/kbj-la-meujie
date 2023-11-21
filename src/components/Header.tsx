import Image from 'next/image';
import kbjImg from '../../public/assets/img/kbj.jpg';
import { ChapterType } from '@/model/chapter.type';
import { getChapterRoute } from '@/app/routes';
import HeaderLink from '@/components/HeaderLink';

type HeaderPropsType = {
  chapters?: ChapterType[];
  activeChapter?: ChapterType;
};

export default function Header({ chapters, activeChapter }: HeaderPropsType) {
  return (
    <header className='relative flex items-center px-6 py-8'>
      <Image className='flex w-20 h-20 rounded-full' src={kbjImg} alt='avatar' />
      <h1 className='text-3xl ml-4'>kbj la meujie</h1>
      <nav>
        <ul className='absolute flex bottom-0 left-0 bg-[#1a1a1a] bg-opacity-50 h-8 w-full justify-between items-center px-6'>
          <li className='opacity-50 hover:opacity-100'>
            <a href='/'>🏡 Home</a>
          </li>
          {chapters &&
            chapters.map((chapter) => (
              <HeaderLink
                key={`header__link--${chapter.id}`}
                name={chapter.name}
                isActive={chapter.id === activeChapter?.id}
                href={getChapterRoute(chapter).path}
              />
            ))}
        </ul>
      </nav>
    </header>
  );
}
