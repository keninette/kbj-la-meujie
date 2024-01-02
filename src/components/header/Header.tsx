import Image from 'next/image';
import kbjImg from '../../../public/assets/img/kbj.jpg';

export default function Header() {
  return (
    <header className='relative flex items-center px-6 py-8 mb-8'>
      <Image className='flex w-20 h-20 rounded-full' src={kbjImg} alt='avatar' />
      <h1 className='text-3xl ml-4'>kbj la meujie</h1>
      <nav>
        <ul className='absolute flex bottom-0 left-0 bg-[#1a1a1a] bg-opacity-50 h-8 w-full justify-between items-center px-6'>
          <li>
            <a className='opacity-50 hover:opacity-100' href='/'>
              🏡 Home
            </a>
            <a className='opacity-50 hover:opacity-100 ml-4' href='/edit'>
              🖊️ Édition
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
