'use client';

import React, { useEffect, useState } from 'react';
import { getChapterRoute } from '@/app/routes';
import Header from '@/components/header/Header';
import Sidenav from '@/components/sidenav/Sidenav';
import RecursiveStepsDisplay from '@/components/step/RecursiveStepsDisplay';
import { Adventure } from '@/model/Adventure.class';
import { isUserLoggedIn } from '@/security/login';
import LoginForm from '@/components/forms/LoginForm';
import { Step } from '@/model/adventure/story-arc/chapter/step/Step.class';
import { Chapter } from '@/model/adventure/story-arc/chapter/Chapter.class';
import { getAdventure, getSession, saveSession } from '@/app/data-provider';
import { useSearchParams } from 'next/navigation';
import { Session } from '@/model/session/session.class';
import SideModal, { SideModalSizeEnum } from '@/components/side-modal/SideModal';
import { Seance } from '@/model/session/seance.class';
import { StoryArc } from '@/model/adventure/story-arc/StoryArc.class';
import SeanceForm from '@/components/forms/SeanceForm.';
import { FeedbackBannerProps, FeedbackTypeEnum } from '@/components/feedback/FeedbackBanner';

// todo fix error in console
export default function ChapterDisplay({
  params,
}: {
  params: { adventureSlug: string; storyArcSlug: string; id: string };
}) {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeStep, setActiveStep] = useState<Step>();
  const [adventure, setAdventure] = useState<Adventure>();
  const [storyArc, setStoryArc] = useState<StoryArc>();
  const [chapter, setChapter] = useState<Chapter>();
  const [nextChapter, setNextChapter] = useState<Chapter>();
  const [activeSession, setActiveSession] = useState<Session>();
  const [activeSeance, setActiveSeance] = useState<Seance>();
  const [displaySideModal, setDisplaySideModal] = useState(false);
  // todo improve this & avoid duplicate
  const [sessionNeedsSaving, setSessionNeedsSaving] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackBannerProps>();
  const sessionUuid = useSearchParams().get('sessionUuid');

  const onSeanceFormSubmit = async (seance: Seance) => {
    console.log('here');
    if (!activeSession) {
      return;
    }
    console.log('still here');
    setActiveSeance(seance);
    setActiveSession((prevState) => ({ ...prevState, seances: [...(prevState?.seances || []), seance] }) as Session);
    setSessionNeedsSaving(true);
  };

  console.log(adventure, storyArc);
  // Save active session
  useEffect(() => {
    // todo fix this
    console.log('session');
    (async function () {
      if (!sessionNeedsSaving) {
        return;
      }
      setFeedback({ type: FeedbackTypeEnum.LOADING, message: 'Sauvegarde de la session en cours', setFeedback });
      const saveSessionResponse = await saveSession(activeSession as Session);
      if (saveSessionResponse.status !== 201) {
        setFeedback({ type: FeedbackTypeEnum.ERROR, message: 'Echec de la sauvegarde de la session', setFeedback });
        console.error(saveSessionResponse);
      } else {
        setFeedback({ type: FeedbackTypeEnum.SUCCESS, message: 'Sauvegarde de la session réussie', setFeedback });
      }
      setSessionNeedsSaving(false);
    })();
  }, [activeSession, sessionNeedsSaving]);

  // Load session on first load
  useEffect(() => {
    setIsClient(true);
    setIsLoggedIn(isUserLoggedIn());

    if (sessionUuid) {
      (async () => {
        const response = await getSession(params.adventureSlug, sessionUuid);
        if (response.status !== 200) {
          console.error(response.body);
        } else {
          setActiveSession(await response.json());
          if (params.storyArcSlug) {
            const matchingSeance = activeSession?.seances.find(
              (seance) => seance.storyArc.storyArcSlug === params.storyArcSlug,
            );
            if (matchingSeance) {
              setActiveSeance(Seance.createFromObject(matchingSeance));
            }
          }
        }
      })();
    }
  }, [activeSession?.seances, params.storyArcSlug, params.adventureSlug, sessionUuid]);

  // Load adventure, story arc & chapter data on first load
  useEffect(() => {
    console.log('adventure');
    (async function () {
      // Load adventure data
      const response = await getAdventure(params.adventureSlug);
      if (response.status !== 200) {
        console.error(response.body);
        return;
      }
      const adventureData: Adventure = await response.json();
      setAdventure(adventureData);

      // Find matching storyArc
      const matchingStoryArc = adventureData.storyArcs.find(
        (thisStoryArc) => thisStoryArc.storyArcSlug === params.storyArcSlug,
      );
      if (!matchingStoryArc) {
        console.error(`Arc ${params.storyArcSlug} non trouvé`);
        return;
      }
      setStoryArc(matchingStoryArc);

      let eligibleChapters: Chapter[];
      let matchingChapter: Chapter;

      if (activeStep) {
        // If an active step is defined (meaning user clicked on a step in sidenav)
        // We need to find the chapter associated to this specific step (it could be in another chapter from rhis story arc)
        eligibleChapters = (matchingStoryArc.chapters || []).filter((thisChapter: Chapter) => {
          return thisChapter.steps.filter((thisStep) => thisStep.id === activeStep.id).length > 0;
        });
      } else {
        eligibleChapters = (matchingStoryArc.chapters || []).filter((thisChapter: Chapter) => {
          return thisChapter.id === params.id;
        });
      }

      // Set currentChapter
      if (eligibleChapters.length !== 1) {
        console.error('More than one chapter found or no chapter found at all');
        return;
      } else {
        matchingChapter = eligibleChapters[0];
      }
      setChapter(matchingChapter);

      if (matchingChapter && matchingChapter.nextChapterId) {
        // todo handle errors
        const nextChapter = matchingStoryArc?.chapters?.filter((thisChapter: Chapter) => {
          return thisChapter.id === matchingChapter.nextChapterId;
        })[0];
        if (nextChapter) {
          setNextChapter(nextChapter);
        }
      }
    })();
  }, [params, params.adventureSlug, params.id, activeStep, isLoggedIn]);

  const onAddSeanceClick = () => {
    if (!activeSession || !storyArc) {
      return;
    }

    const newSeance = new Seance(storyArc);
    setActiveSession((prevState) => ({ ...prevState, seances: [...(prevState?.seances || []), newSeance] }) as Session);
    setActiveSeance(newSeance);
    setDisplaySideModal(true);
  };
  const onStepSelection = (step: Step) => {
    setActiveStep(step);
  };

  const activeSteps = activeStep
    ? [(activeStep as Step).id]
    : chapter?.steps?.filter((step) => step.level === 1).map((step) => step.id);

  return (
    <>
      <main className='flex min-h-screen flex-col text-white min-w-full'>
        <Header feedbackBannerProps={feedback ? { ...feedback, setFeedback: setFeedback } : undefined}></Header>
        {/*
        {!isLoggedIn && <LoginForm loginCallback={setIsLoggedIn} />}
*/}
        {isLoggedIn && adventure && (
          <div className='flex'>
            <section className='flex flex-col'>
              <div className='flex w-full justify-start px-4'>
                {activeSeance && <button onClick={() => setDisplaySideModal(true)}>🍿 Afficher la séance</button>}
                {!activeSeance && <button onClick={onAddSeanceClick}>🍿 Ajouter une séance</button>}
              </div>
              <Sidenav
                adventureSlug={params.adventureSlug}
                storyArcSlug={params.storyArcSlug}
                chapters={storyArc?.chapters || []}
                onStepSelection={onStepSelection}
              ></Sidenav>
            </section>
            <section className='flex flex-col w-4/5'>
              {isClient && chapter && adventure && (
                <>
                  <section className='flex h-full w-full flex-grow'>
                    <div className='flex flex-col h-full w-full m-4'>
                      <h2 className='flex justify-center w-full text-3xl'>{chapter.name}</h2>
                      {
                        <div className='flex'>
                          {isClient &&
                            activeSteps?.map((stepId) => (
                              <RecursiveStepsDisplay key={stepId} stepIds={[stepId]} chapter={chapter} />
                            ))}
                        </div>
                      }
                    </div>
                  </section>
                </>
              )}
              {nextChapter && (
                <div
                  id='next-chapter'
                  className='flex w-[94%] p-4 text-xl justify-center m-auto mt-10 border-solid border-2 flex-grow z-10 border-gradient border-gradient--red--to-right opacity-25'
                >
                  <a
                    href={
                      getChapterRoute(nextChapter, params.adventureSlug, params.storyArcSlug, sessionUuid || undefined)
                        .path
                    }
                  >
                    Prochain chapitre : {nextChapter.name}
                  </a>
                </div>
              )}
            </section>
            {displaySideModal && activeSession && storyArc && (
              <SideModal closeSideModal={() => setDisplaySideModal(false)} size={SideModalSizeEnum.MEDIUM}>
                <SeanceForm
                  requestedSeance={activeSeance}
                  adventure={adventure}
                  storyArc={storyArc}
                  setFeedback={setFeedback}
                  onSubmitCallback={onSeanceFormSubmit}
                />
              </SideModal>
            )}
          </div>
        )}
      </main>
      )
    </>
  );
}
