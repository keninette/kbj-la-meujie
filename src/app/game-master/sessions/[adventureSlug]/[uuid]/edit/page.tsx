'use client';

import React, { useEffect, useState } from 'react';
import { Session } from '@/model/session/session.class';
import { getPLayers, getSession, savePlayers, saveSession } from '@/app/data-provider';
import Header from '@/components/header/Header';
import LoginForm from '@/components/forms/LoginForm';
import { isUserLoggedIn } from '@/security/login';
import PlayerForm from '@/components/forms/PlayerForm';
import SideModal from '@/components/side-modal/SideModal';
import { Player } from '@/model/session/player.class';
import { FeedbackBannerProps, FeedbackTypeEnum } from '@/components/feedback/FeedbackBanner';
import SessionInfoForm from '@/components/forms/SessionInfoForm';
import SeanceForm from '@/components/forms/SeanceForm.';
import { Seance } from '@/model/session/seance.class';

enum FormToDisplayEnum {
  NAME = 'NAME',
  PLAYER = 'PLAYER',
  SEANCE = 'SEANCE',
}
export default function GroupForm({ params }: { params: { adventureSlug: string; uuid: string } }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionNeedsSaving, setSessionNeedsSaving] = useState(false);
  const [playersNeedSaving, setPlayersNeedSaving] = useState(false);
  const [session, setSession] = useState<Session>();
  const [players, setPlayers] = useState<Player[]>();
  const [displaySideModal, setDisplaySideModal] = useState(false);
  const [formToDisplay, setFormToDisplay] = useState<FormToDisplayEnum>();
  const [feedback, setFeedback] = useState<FeedbackBannerProps>();

  const resetForm = () => {
    setDisplaySideModal(false);
    setFormToDisplay(undefined);
  };

  // todo portal ?
  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
    (async function () {
      // todo handle errors
      const sessionResponse = await getSession(params.adventureSlug, params.uuid);
      if (sessionResponse.status !== 200) {
        setFeedback({ type: FeedbackTypeEnum.ERROR, message: 'Impossible de charger la session', setFeedback });
      }
      const otherBody = await sessionResponse.json();
      setSession(otherBody);
      const playersResponse = await getPLayers();
      const body = await playersResponse.json();
      setPlayers(body);
    })();
  }, [params]);

  // todo fix the other form this way
  // todo use sidebar in other form
  useEffect(() => {
    (async function () {
      if (!playersNeedSaving) {
        return;
      }
      setFeedback({ type: FeedbackTypeEnum.LOADING, message: 'Sauvegarde du joueur en cours', setFeedback });
      const savePlayersResponse = await savePlayers(players as Player[]);
      if (savePlayersResponse.status !== 201) {
        setFeedback({ type: FeedbackTypeEnum.ERROR, message: 'Echec de la sauvegarde du joueur', setFeedback });
        console.error(savePlayersResponse);
      } else {
        setFeedback({ type: FeedbackTypeEnum.SUCCESS, message: 'Sauvegarde du joueur réussie', setFeedback });
      }
      setPlayersNeedSaving(false);
    })();
  }, [playersNeedSaving, players]);

  useEffect(() => {
    (async function () {
      if (!sessionNeedsSaving) {
        return;
      }
      setFeedback({ type: FeedbackTypeEnum.LOADING, message: 'Sauvegarde de la session en cours', setFeedback });
      const saveSessionResponse = await saveSession(session as Session);
      if (saveSessionResponse.status !== 201) {
        setFeedback({ type: FeedbackTypeEnum.ERROR, message: 'Echec de la sauvegarde de la session', setFeedback });
        console.error(saveSessionResponse);
      } else {
        setFeedback({ type: FeedbackTypeEnum.SUCCESS, message: 'Sauvegarde de la session réussie', setFeedback });
      }
      setSessionNeedsSaving(false);
    })();
  }, [sessionNeedsSaving, session]);

  const onPlayerFormSubmit = async (player: Player) => {
    setFeedback({ type: FeedbackTypeEnum.LOADING, message: 'Sauvegarde en cours', setFeedback });
    if (!session) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: 'Pas de session trouvée', setFeedback });
      return;
    }

    const isNewPlayer = players && players.find((thisPlayer) => thisPlayer.playerId === player.playerId) === undefined;
    // Save states
    setSession((prevState) => {
      return { ...prevState, players: [...(prevState?.players || []), player] } as Session;
    });

    if (isNewPlayer) {
      setPlayers((prevState) => [...(prevState || []), player]);
    }

    setSessionNeedsSaving(true);
    setPlayersNeedSaving(true);
    resetForm();
  };

  const onSessionInfoSubmit = async () => {
    setSessionNeedsSaving(true);
    resetForm();
  };
  const onSeanceFormSubmit = async (seance: Seance) => {
    if (!session) {
      return;
    }
    setSession((prevState) => ({ ...prevState, seances: [...(prevState?.seances || []), seance] }) as Session);
    setSessionNeedsSaving(true);
    resetForm();
  };

  return (
    <main className='flex min-h-screen flex-col text-white'>
      <Header feedbackBannerProps={feedback ? { ...feedback, setFeedback: setFeedback } : undefined}></Header>
      <section className='flex flex-col w-full'>
        {!isLoggedIn && <LoginForm loginCallback={setIsLoggedIn} />}
        {isLoggedIn && session && (
          <>
            <h2 className='flex justify-center items-center text-3xl m-4'>
              {session.name || session.uuid}
              <button
                className='text-base w-fit border-2 ml-4 px-2 border-white opacity-80 hover:opacity-100 disabled:opacity-50'
                onClick={() => {
                  setFormToDisplay(FormToDisplayEnum.NAME);
                  setDisplaySideModal(true);
                }}
              >
                🖊 Editer
              </button>
            </h2>
            <div className='flex flex-col px-4'>
              <button
                className='w-fit border-2 px-2 border-white opacity-80mx-4 mb-4 hover:opacity-100 disabled:opacity-50'
                onClick={() => {
                  setFormToDisplay(FormToDisplayEnum.PLAYER);
                  setDisplaySideModal(true);
                }}
              >
                + 👨‍👦‍👦 Joueur
              </button>
              <ul className='flex w-full'>
                {session.players.map((sessionPlayer) => (
                  <li key={sessionPlayer.playerId} className='mr-4'>
                    👨‍👦‍👦 {sessionPlayer.name}({sessionPlayer.characterName})
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex flex-col px-4 mt-4'>
              <button
                className='w-fit border-2 px-2 border-white opacity-80mx-4 mb-4 hover:opacity-100 disabled:opacity-50'
                onClick={() => {
                  setFormToDisplay(FormToDisplayEnum.SEANCE);
                  setDisplaySideModal(true);
                }}
              >
                + 🍿 Séance
              </button>
              <ul className='flex w-full mt-4'>
                {session.seances.map((seance) => (
                  <>
                    <li
                      key={`seance__li--${seance.uuid}`}
                      className='mr-4 cursor-pointer'
                      data-tooltip-id={`seance_${seance.uuid}`}
                    >
                      🍿 {seance.storyArc.name}
                    </li>
                  </>
                ))}
              </ul>
            </div>
            {displaySideModal && formToDisplay && (
              <SideModal
                closeSideModal={() => {
                  setDisplaySideModal(false);
                  setFormToDisplay(undefined);
                }}
              >
                <>
                  {formToDisplay === FormToDisplayEnum.PLAYER && (
                    <PlayerForm players={players || []} onSubmitCallback={onPlayerFormSubmit} />
                  )}
                  {formToDisplay === FormToDisplayEnum.NAME && (
                    <SessionInfoForm session={session} setSession={setSession} onSubmitCallback={onSessionInfoSubmit} />
                  )}
                  {formToDisplay === FormToDisplayEnum.SEANCE && (
                    <SeanceForm
                      onSubmitCallback={onSeanceFormSubmit}
                      adventureSlug={params.adventureSlug}
                      setFeedback={setFeedback}
                    />
                  )}
                </>
              </SideModal>
            )}
          </>
        )}
      </section>
    </main>
  );
}
