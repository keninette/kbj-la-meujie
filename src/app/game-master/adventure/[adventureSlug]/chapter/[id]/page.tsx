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
import { getAdventure } from '@/app/data-provider';

export default function ChapterDisplay({ params }: { params: { adventureSlug: string; id: string } }) {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeStep, setActiveStep] = useState<Step>();
  const [adventure, setAdventure] = useState<Adventure>();
  const [chapter, setChapter] = useState<Chapter>();
  const [nextChapter, setNextChapter] = useState<Chapter>();

  useEffect(() => {
    setIsClient(true);
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  useEffect(() => {
    (async function () {
      const response = await getAdventure(params.adventureSlug);
      const adventure: Adventure = await response.json();
      let eligibleChapters: Chapter[];
      let chapter: Chapter;
      if (activeStep) {
        // todo improve this (in params)
        const storyArc = adventure.storyArcs.find((storyArc) =>
          storyArc.chapters.find((thisChapter: Chapter) => {
            return thisChapter.steps.find((thisStep) => thisStep.id === activeStep.id);
          }),
        );
        if (!storyArc) {
          console.error("Pas d'arc trouvé pour ce châpitre");
        }
        eligibleChapters = (storyArc?.chapters || []).filter((thisChapter: Chapter) => {
          return thisChapter.steps.filter((thisStep) => thisStep.id === activeStep.id).length > 0;
        });
      } else {
        // todo improve this (in params)
        const eligibleStoryArcs = adventure.storyArcs.filter((storyArc) =>
          storyArc.chapters.find((thisChapter: Chapter) => thisChapter.id === params.id),
        );
        if (!eligibleStoryArcs.length || eligibleStoryArcs.length > 1) {
          console.error("Pas d'arc trouvé pour ce châpitre");
        }
        eligibleChapters = (eligibleStoryArcs[0].chapters || []).filter((thisChapter: Chapter) => {
          return thisChapter.id === params.id;
        });
      }
      if (eligibleChapters.length !== 1) {
        console.error('More than one chapter found or no chapter found at all');
        return;
      } else {
        chapter = eligibleChapters[0];
      }

      setChapter(chapter);
      // todo fix
      /*if (chapter && chapter.nextChapterId) {
        const nextChapter = adventure?.chapters?.filter((thisChapter: Chapter) => {
          return thisChapter.id === chapter.nextChapterId;
        })[0];
        if (nextChapter) {
          setNextChapter(nextChapter);
        }
      }*/
      setAdventure(adventure);
    })();
  }, [params, params.adventureSlug, params.id, activeStep, isLoggedIn]);

  const onStepSelection = (step: Step) => {
    // @ts-ignore
    setActiveStep(step);
  };

  const activeSteps = activeStep
    ? [(activeStep as Step).id]
    : chapter?.steps?.filter((step) => step.level === 1).map((step) => step.id);

  const storyArcChapters = () => {
    // todo improve this (in params)
    if (!adventure) {
      return;
    }
    const eligibleStoryArcs = adventure.storyArcs.filter((storyArc) =>
      storyArc.chapters.find((thisChapter: Chapter) => thisChapter.id === params.id),
    );
    if (!eligibleStoryArcs.length || eligibleStoryArcs.length > 1) {
      console.error("Pas d'arc trouvé pour ce châpitre");
    }
    return eligibleStoryArcs[0].chapters;
  };

  return (
    <>
      <main className='flex min-h-screen flex-col text-white min-w-full'>
        <Header></Header>
        {!isLoggedIn && <LoginForm loginCallback={setIsLoggedIn} />}
        {isLoggedIn && adventure && (
          <div className='flex'>
            <section className='flex'>
              <Sidenav
                adventureSlug={adventure.adventureSlug}
                chapters={storyArcChapters() || []}
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
                  <a href={getChapterRoute(nextChapter, params.adventureSlug).path}>
                    Prochain chapitre : {nextChapter.name}
                  </a>
                </div>
              )}
            </section>
          </div>
        )}
      </main>
      )
    </>
  );
}
