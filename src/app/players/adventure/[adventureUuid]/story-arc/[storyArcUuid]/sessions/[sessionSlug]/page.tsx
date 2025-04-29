'use client';
import Header from '@/components/header/Header';
import React, { useCallback, useEffect, useMemo } from 'react';
import { SessionsApi } from '@/services/sessions.api';
import { Session } from '@/model/sessions/Session.class';
import NonPlayerCharacterBlock from '@/components/step/NonPlayerCharacterBlock';

type PlayersStoryArcProps = {
  params: {
    adventureUuid: string;
    storyArcUuid: string;
    sessionSlug: string;
  };
};

export default function PlayersStoryArc({ params }: PlayersStoryArcProps) {
  const [session, setSession] = React.useState<Session | null>();
  const updateSession = useCallback(async () => {
    setSession(
      await SessionsApi.getSession({
        adventureUuid: params.adventureUuid,
        storyArcUuid: params.storyArcUuid,
        sessionSlug: params.sessionSlug,
      }),
    );
  }, [params]);

  useEffect(() => {
    updateSession();
  }, [updateSession]);

  return (
    <main className='flex min-h-screen flex-col text-white'>
      <Header></Header>
      <section className='flex flex-col w-full'>
        {/*todo date dans session*/}
        <p>🗓 3 octobre 2021</p>
        <div className={'flex w-full'}>
          <ul>
            {session?.nonPlayerCharacters.map((character) => (
              <NonPlayerCharacterBlock
                key={character.uuid}
                npc={character}
                npcUniqId={`npc__${character.name.toLowerCase().replaceAll(' ', '')}`}
                referer={'players'}
              />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
