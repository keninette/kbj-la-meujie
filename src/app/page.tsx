import AdventureCard from '@/components/AdventureCard';
import { allAdventures } from '@/lib/adventures/adventures.lib';
import Header from '@/components/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'kbj la meujie',
};

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col text-white'>
      <Header></Header>
      <ul className='flex w-full mx-8'>
        {allAdventures.map((adventure) => (
          <li key={adventure.id}>
            <AdventureCard adventure={adventure} />
          </li>
        ))}
      </ul>
    </main>
  );
}
