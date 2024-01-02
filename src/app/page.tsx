'use client';

import Header from '@/components/header/Header';
import Adventures from '@/components/adventures/Adventures';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col text-white'>
      <Header></Header>
      <ul className='flex w-full mx-8'>
        <Adventures />
      </ul>
    </main>
  );
}
