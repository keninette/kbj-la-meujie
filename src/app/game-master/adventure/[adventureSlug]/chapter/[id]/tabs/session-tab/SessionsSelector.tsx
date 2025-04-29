import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Session } from '@/model/sessions/Session.class';
import { SessionsApi } from '@/services/sessions.api';

type SessionsSelectorProps = {
  adventureSlug: string;
  storyArcSlug: string;
  onSessionChangeCallback: (session: Session) => void;
};

export function SessionsSelector({ adventureSlug, storyArcSlug, onSessionChangeCallback }: SessionsSelectorProps) {
  // LOCAL STATE
  const [sessions, setSessions] = useState<Array<Session>>();

  // EVENTS HANDLERS
  const onSessionChange = useCallback(
    (sessionSlug: string) => {
      const selectedSession = sessions?.find((session) => session.slug === sessionSlug);
      if (selectedSession) {
        onSessionChangeCallback(selectedSession);
      }
    },
    [onSessionChangeCallback, sessions],
  );

  // USE EFFECTS
  useEffect(() => {
    (async () => {
      setSessions(await SessionsApi.getStoryArcSessions({ adventureSlug, storyArcSlug }));
    })();
  }, [adventureSlug, storyArcSlug]);

  // RENDER
  return (
    <select
      className='flex w-[300px] h-8 p-2 mb-2 bg-gray-200 text-black'
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onSessionChange(e.target.value)}
      placeholder='Session'
    >
      <option value={undefined}>Aucune</option>
      {sessions?.map((thisSession: Session) => (
        <option key={thisSession.slug} value={thisSession.slug}>
          {thisSession.name}
        </option>
      ))}
    </select>
  );
}
