'use client';

import Header from '@/components/header/Header';
import Adventures from '@/components/adventures/Adventures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col text-white'>
      <Header></Header>
      <ul className='flex w-full mx-8'>
        <Adventures />
        <li className='flex ml-6'>
          <a
            href={'/edit/new'}
            className='relative flex flex-col justify-center items-center  w-[300px] h-[300px] mt-8 bg-black bg-opacity-30 border-gradient border-gradient--red--to-right justify-between items-center p-2'
          >
            <FontAwesomeIcon icon={faPlus} size='8x' className='mx-2' />
            <p className=''>Nouvelle aventure</p>
          </a>
        </li>
      </ul>
    </main>
  );
}
