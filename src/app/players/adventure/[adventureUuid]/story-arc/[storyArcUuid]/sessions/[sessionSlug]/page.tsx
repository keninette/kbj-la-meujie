'use client';
import Header from '@/components/header/Header';
import React, { useCallback, useEffect } from 'react';
import { SessionsApi } from '@/services/sessions.api';
import { Session } from '@/model/sessions/Session.class';
import { NonPlayerCharactersTab } from '@/app/players/adventure/[adventureUuid]/story-arc/[storyArcUuid]/sessions/[sessionSlug]/tabs/NonPlayerCharactersTab';
import CustomTabs from '@/components/customTabs/CustomTabs';
import Tab from '@/components/tab/Tab';

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
        <div className='flex w-full justify-between'>
          <p>🗓 3 octobre 2021</p>
          <button onClick={updateSession}>♻ Raffraîchir</button>
        </div>
        <CustomTabs
          className='mt-4'
          tabs={[
            {
              id: 'tab-session-npcs',
              title: 'PNJs',
              content: (
                <Tab>
                  <NonPlayerCharactersTab characters={session?.nonPlayerCharacters?.filter((npc) => npc.isPublic)} />
                </Tab>
              ),
            },
          ]}
        />
      </section>
    </main>
  );
}
