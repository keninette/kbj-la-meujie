'use client';

import AdventureCard from '@/components/AdventureCard';
import Header from '@/components/header/Header';
import { useEffect, useState } from 'react';
import { Adventure } from '@/model/Adventure.class';

export default function Home() {
  const [adventures, setAdventures] = useState<Adventure[]>([]);

  useEffect(() => {
    (async function () {
      const response = await fetch(`/adventure/api`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const adventures = await response.json();
      setAdventures(adventures);
    })();
  }, []);
  return (
    <main className='flex min-h-screen flex-col text-white'>
      <Header></Header>
      <ul className='flex w-full mx-8'>
        {adventures &&
          adventures.map((adventure) => (
            <li key={adventure.slug}>
              <AdventureCard adventure={adventure} />
            </li>
          ))}
        {!adventures && <p>Aucune aventure ici !</p>}
      </ul>
    </main>
  );
}
