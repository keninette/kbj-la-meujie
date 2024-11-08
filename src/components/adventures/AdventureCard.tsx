'use client';

import { getAdventureRoute, getEditAdventureRoute, getEditSessionRoute } from '@/app/routes';
import { UniverseEnum } from '@/model/enums/universe.enum';
import Image from 'next/image';
import { Adventure } from '@/model/AdventureManager.class';
import { Session } from '@/model/session/session.class';
import { useEffect, useState } from 'react';
import { saveSession } from '@/app/data-provider';
import { useAppDispatch } from '@/lib/store/hooks';
import { setAdventure } from '@/lib/store/adventures/adventures.reducer';
import { setSessionInPlay } from '@/lib/store/sessions/sessions.reducer';
import Link from '@/components/Link';

const headerMappings = {
  [UniverseEnum.CHTULHU]: '/assets/img/headers/chtulhu.png',
};

type AdventureCardPropsType = {
  adventure: Adventure;
  sessions: Session[];
};

export default function AdventureCard({ adventure, sessions }: AdventureCardPropsType) {
  const dispatch = useAppDispatch();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  // todo do i need to fetch adventure here ?

  const addSession = async () => {
    if (!isPageLoaded || !window) {
      return;
    }
    const session: Session = new Session(
      { adventureSlug: adventure.adventureSlug, name: adventure.name, adventureUuid: adventure.adventureUuid },
      [],
    );
    await saveSession(session);
    window.open(getEditSessionRoute(session).path, '_self');
  };

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <>
      <div className='relative flex max-w-[300px] w-[300px] h-[300px] mt-8 bg-black bg-opacity-30 border-gradient border-gradient--red--to-right  p-2'>
        <a className='ml-2  no-underline' href={getEditAdventureRoute(adventure).path}>
          🖊
        </a>
        <div className='flex flex-col justify-between items-center'>
          <span className='flex self-end text-sm'>{`De ${adventure.players?.min} à ${adventure.players?.max} joueurs`}</span>
          {adventure.universe && (
            <Link href={getAdventureRoute(adventure).path} onClickAction={() => dispatch(setAdventure(adventure))}>
              <Image
                src={headerMappings[adventure.universe]}
                width={250}
                height={250}
                alt={adventure.universe}
                className='flex'
                priority={true}
                style={{ width: '100%', height: '100%' }}
              />
            </Link>
          )}
          <p className=''>{adventure.name}</p>
          {isPageLoaded && (
            <div className='flex flex-col self-start mt-4'>
              <button className='hover:underline' onClick={addSession}>
                ➕ Ajouter une session
              </button>
              <ul className='flex flex-col my-2'>
                {sessions.map((session) => (
                  <li key={session.uuid} className='flex justify-between w-[250px]'>
                    <a
                      className='flex w-[230px] text-ellipsis overflow-hidden'
                      href={getAdventureRoute(adventure, session).path}
                      onClick={() => {
                        dispatch(setAdventure(adventure));
                        dispatch(setSessionInPlay(session));
                      }}
                    >
                      {session.name || session.uuid}
                    </a>
                    <a className='flex-none' href={getEditSessionRoute(session).path}>
                      🖊
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
