import React from 'react';
import { Session } from '@/model/sessions/Session.class';
import { AdventuresApi } from '@/services/adventures.api';

type AddSessionForm = {
  onSessionCreatedCallback: (session: Session) => void;
  adventureSlug: string;
  storyArcSlug: string;
};
export default function AddSessionForm({ onSessionCreatedCallback, adventureSlug, storyArcSlug }: AddSessionForm) {
  // LOCAL STATES & CONSTANTS
  const [sessionName, setSessionName] = React.useState<string>('');
  const [displayForm, setDisplayForm] = React.useState<boolean>(false);

  // FUNCTIONS
  const createSession = async () => {
    if (!sessionName) {
      return;
    }

    console.log(await AdventuresApi.getSessionNonPlayerCharacters({ adventureSlug, storyArcSlug }));
    onSessionCreatedCallback({
      ...new Session(adventureSlug, storyArcSlug),
      name: sessionName,
      slug: sessionName.replaceAll(' ', '-'),
      nonPlayerCharacters: await AdventuresApi.getSessionNonPlayerCharacters({ adventureSlug, storyArcSlug }),
    });
  };

  // RENDER
  return (
    <>
      {!displayForm && <button onClick={() => setDisplayForm(true)}>➕ Ajouter une session</button>}
      {displayForm && (
        <>
          <input
            className='text-black'
            type='text'
            placeholder='Nom de la session'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSessionName(e.target.value);
            }}
          />
          <button onClick={createSession}>✔</button>
        </>
      )}
    </>
  );
}
