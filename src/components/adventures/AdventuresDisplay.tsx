'use client';

import { useGetAdventuresQuery } from '@/lib/services/adventures.api';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setAdventures } from '@/lib/store/adventures/adventures.reducer';
import { adventuresSelector } from '@/lib/store/adventures/adventures.selector';
import AdventureCard from './AdventureCard';
import { sessionsSelector } from '@/lib/store/sessions/sessions.selector';
import { setSessions } from '@/lib/store/sessions/sessions.reducer';
import { useGetSessionsQuery } from '@/lib/services/sessions.api';

export default function AdventuresDisplay() {
  const dispatch = useAppDispatch();
  const { data: adventuresData, isSuccess: isAdventuresLoadingFulfilled } = useGetAdventuresQuery();
  const {
    data: sessionsData,
    error: hasSessionsLoadingErrorOccurred,
    isSuccess: isSessionsLoadingFulfilled,
    isLoading: areSessionsLoading,
  } = useGetSessionsQuery();
  const adventures = useAppSelector(adventuresSelector);
  const sessions = useAppSelector(sessionsSelector);

  useEffect(() => {
    if (isAdventuresLoadingFulfilled) {
      dispatch(setAdventures(adventuresData));
    }
    // todo handle errors
    // todo fix this dispatch import
  }, [adventuresData, isAdventuresLoadingFulfilled, dispatch]);

  useEffect(() => {
    if (isSessionsLoadingFulfilled) {
      dispatch(setSessions(sessionsData));
    }
  }, [dispatch, isSessionsLoadingFulfilled, sessionsData]);

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
