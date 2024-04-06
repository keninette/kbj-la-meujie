import { useEffect, useState } from 'react';
import AdventureCard from '@/components/adventures/AdventureCard';
import { Adventure } from '@/model/Adventure.class';
import { getAdventures, getSessions } from '@/app/data-provider';
import { Session } from '@/model/session/session.class';

export default function Adventures() {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    (async function () {
      const adventureResponse = await getAdventures();
      const sessionsResponse = await getSessions();
      setAdventures(await adventureResponse.json());
      setSessions(await sessionsResponse.json());
    })();
  }, []);

  console.table(sessions);

  return (
    <>
      {adventures &&
        adventures.map((adventure) => (
          <li key={adventure.adventureSlug} className='ml-6'>
            <AdventureCard
              adventure={adventure}
              sessions={sessions.filter((session) => session.adventure.adventureSlug === adventure.adventureSlug)}
            />
          </li>
        ))}
      {!adventures && <p>Aucune aventure ici !</p>}
    </>
  );
}
