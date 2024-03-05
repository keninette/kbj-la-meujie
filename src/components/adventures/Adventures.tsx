import { useEffect, useState } from 'react';
import AdventureCard from '@/components/adventures/AdventureCard';
import { Adventure } from '@/model/Adventure.class';

export default function Adventures() {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  useEffect(() => {
    (async function () {
      const response = await fetch(`/api`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const adventures = await response.json();
      setAdventures(adventures);
    })();
  }, []);

  return (
    <>
      {adventures &&
        adventures.map((adventure) => (
          <li key={adventure.adventureSlug} className='ml-6'>
            <AdventureCard adventure={adventure} />
          </li>
        ))}
      {!adventures && <p>Aucune aventure ici !</p>}
    </>
  );
}
