'use client';

import React, { useCallback, useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Session } from '@/model/sessions/Session.class';
import { sha256 } from 'js-sha256';
import { RawDraftContentState } from 'react-draft-wysiwyg';
import { SessionsApi } from '@/services/sessions.api';
import CharactersTab from '@/app/game-master/adventure/[adventureSlug]/chapter/[id]/tabs/session-tab/characters-tab/CharactersTab';
import DescriptionTab from '@/app/game-master/adventure/[adventureSlug]/chapter/[id]/tabs/session-tab/description-tab/DescriptionTab';
import Tab from '@/components/tab/Tab';
import CustomTabs from '@/components/customTabs/CustomTabs';
import { Character } from '@/model/sessions/Character.class';
import { SessionsSelector } from '@/app/game-master/adventure/[adventureSlug]/chapter/[id]/tabs/session-tab/SessionsSelector';
import RefreshNonPlayerCharacters from '@/app/game-master/adventure/[adventureSlug]/chapter/[id]/tabs/RefreshNonPlayerCharactersButton';
import AddSessionForm from '@/app/game-master/adventure/[adventureSlug]/chapter/[id]/tabs/session-tab/AddSessionForm';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';
import { PlayerCharacter } from '@/model/sessions/PlayerCharacter.class';

type SessionTabProps = {
  adventureSlug: string;
  storyArcSlug: string;
};

type InteractiveSession = {
  sha?: string;
  session: Session;
};

export function SessionTab({ adventureSlug, storyArcSlug }: SessionTabProps) {
  // LOCAL STATES & CONSTANTS
  const [interactiveSession, setInteractiveSession] = useState<InteractiveSession>();
  let timeoutId: string | number | NodeJS.Timeout | undefined;

  // LOCAL FUNCTIONS
  const computeObjectSha = (thisObject?: Object): string => {
    return sha256(JSON.stringify(thisObject ?? {}));
  };
  const saveNewSession = (newSession: Session) => {
    SessionsApi.createSession({ adventureSlug, storyArcSlug }, newSession);
  };

  const saveCharacter = <T extends Character>(
    updatedCharacter: T,
    keyInSession: 'nonPlayerCharacters' | 'playerCharacters',
  ) => {
    const matchingCharacterIndex = interactiveSession?.session[keyInSession].findIndex(
      (thisChar: Character) => thisChar.uuid === updatedCharacter.uuid,
    );

    if (matchingCharacterIndex !== undefined && matchingCharacterIndex > -1) {
      const matchingCharacter = interactiveSession?.session[keyInSession][matchingCharacterIndex];
      if (computeObjectSha(matchingCharacter) === computeObjectSha(updatedCharacter)) {
        return;
      }
    } else if (keyInSession === 'nonPlayerCharacters') {
      interactiveSession?.session.nonPlayerCharacters.push(updatedCharacter as unknown as NonPlayerCharacter);
    } else if (keyInSession === 'playerCharacters') {
      interactiveSession?.session.playerCharacters.push(updatedCharacter as PlayerCharacter);
    }

    setInteractiveSession((prevState) => {
      return {
        ...prevState,
        session: {
          ...prevState?.session,
          [keyInSession]: prevState?.session[keyInSession].map((character: Character, index: number) =>
            index === matchingCharacterIndex ? updatedCharacter : character,
          ),
        },
      } as InteractiveSession;
    });
  };
  const saveDescription = (updatedDescription?: RawDraftContentState) => {
    if (
      updatedDescription &&
      computeObjectSha(updatedDescription?.blocks) !== computeObjectSha(interactiveSession?.session.description?.blocks)
    ) {
      setInteractiveSession((prevState) => {
        return {
          ...prevState,
          session: {
            ...prevState?.session,
            description: updatedDescription,
          },
        } as InteractiveSession;
      });
    }
  };
  const onNonPlayerCharactersRefreshed = async (newNpcs: NonPlayerCharacter[]) => {
    setInteractiveSession((prevState) => {
      return {
        ...prevState,
        session: {
          ...prevState?.session,
          nonPlayerCharacters: [...(prevState?.session.nonPlayerCharacters ?? []), ...newNpcs],
        },
      } as InteractiveSession;
    });
  };

  // EVENT HANDLERS
  const onSessionSelected = (selectedSession: Session) => {
    if (interactiveSession?.session) {
      confirm('Une session est déjà sélectionnée, êtes-vous sûr ?');
    }
    setInteractiveSession({ sha: computeObjectSha(selectedSession), session: selectedSession });
  };

  // USE EFFECTS
  useEffect(() => {
    const saveSession = (thisSession: Session) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        SessionsApi.updateSession({ adventureSlug, storyArcSlug, sessionSlug: thisSession.slug }, thisSession);
      }, 2000);
    };
    const newSha = computeObjectSha(interactiveSession?.session);
    if (interactiveSession?.sha && newSha !== interactiveSession?.sha) {
      console.log('Saving session');
      saveSession(interactiveSession.session);
    }
  }, [interactiveSession]);

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex w-full items-center'>
        <SessionsSelector
          onSessionChangeCallback={onSessionSelected}
          storyArcSlug={storyArcSlug}
          adventureSlug={adventureSlug}
        />
        {!interactiveSession && (
          <AddSessionForm
            onSessionCreatedCallback={saveNewSession}
            adventureSlug={adventureSlug}
            storyArcSlug={storyArcSlug}
          />
        )}
        {interactiveSession?.session && (
          <RefreshNonPlayerCharacters
            onRefreshCallback={onNonPlayerCharactersRefreshed}
            existingCharactersInSession={interactiveSession.session.nonPlayerCharacters}
            adventureSlug={adventureSlug}
            storyArcSlug={storyArcSlug}
          />
        )}
      </div>
      {interactiveSession?.session && (
        <div className='flex h-full'>
          <CustomTabs
            tabs={[
              {
                id: 'tab-session-description',
                title: 'Description',
                content: (
                  <Tab>
                    <DescriptionTab
                      description={interactiveSession.session.description}
                      onDescriptionChange={saveDescription}
                    />
                  </Tab>
                ),
              },
              {
                id: 'tab-session-players',
                title: 'Joueurs',
                content: (
                  <Tab>
                    <CharactersTab
                      characters={interactiveSession.session.playerCharacters}
                      onUpdateCallback={(updatedCharacter: Character) =>
                        saveCharacter(updatedCharacter, 'playerCharacters')
                      }
                      type='playerCharacters'
                    />
                  </Tab>
                ),
              },
              {
                id: 'tab-session-npcs',
                title: 'PNJ',
                content: (
                  <Tab>
                    <CharactersTab
                      characters={interactiveSession.session.nonPlayerCharacters}
                      onUpdateCallback={(updatedCharacter: Character) =>
                        saveCharacter(updatedCharacter, 'nonPlayerCharacters')
                      }
                      type='nonPlayerCharacters'
                    />
                  </Tab>
                ),
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
