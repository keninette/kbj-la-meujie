'use client';

import React, { useEffect, useState } from 'react';
import { getChapterRoute } from '@/app/routes';
import Header from '@/components/header/Header';
import Sidenav from '@/components/sidenav/Sidenav';
import RecursiveSteps from '@/components/step/RecursiveSteps';
import { Adventure } from '@/model/Adventure.class';
// @ts-ignore
import { Chapter } from '@/model/Chapter.class';
import { Step } from '@/model/Step.class';

export type ArrowCoordinatesType = {
  id: string;
  start: string;
  end: string;
};

export default function Chapter({ params }: { params: { slug: string; id: string } }) {
  const [isClient, setIsClient] = useState(false);
  const [activeStep, setActiveStep] = useState<Step>();
  const [adventure, setAdventure] = useState<Adventure>();
  const [chapter, setChapter] = useState<Chapter>();
  const [nextChapter, setNextChapter] = useState<Chapter>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    (async function () {
      const response = await fetch(`/adventure/api?slug=${params.slug}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const adventure: Adventure = await response.json();
      let eligibleChapters: Chapter[];
      let chapter: Chapter;
      if (activeStep) {
        eligibleChapters = (adventure.chapters || []).filter((thisChapter) => {
          return thisChapter.steps.filter((thisStep) => thisStep.id === activeStep.id).length > 0;
        });
      } else {
        eligibleChapters = (adventure.chapters || []).filter((thisChapter) => {
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
      if (chapter && chapter.nextChapterId) {
        const nextChapter = adventure.chapters?.filter((thisChapter) => {
          return thisChapter.id === chapter.nextChapterId;
        })[0];
        if (nextChapter) {
          setNextChapter(nextChapter);
        }
      }
      setAdventure(adventure);
    })();
  }, [params, params.slug, params.id, activeStep]);

  const onStepSelection = (step: Step) => {
    // @ts-ignore
    setActiveStep(step);
  };

  const activeSteps = activeStep
    ? [(activeStep as Step).id]
    : chapter?.steps?.filter((step) => step.level === 1).map((step) => step.id);

  return (
    adventure && (
      <main className='flex min-h-screen flex-col text-white min-w-full'>
        <Header></Header>
        <div className='flex'>
          <section className='flex w-1/5'>
            <Sidenav
              adventureSlug={adventure.slug}
              chapters={adventure.chapters || []}
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
                            <RecursiveSteps key={stepId} stepIds={[stepId]} chapter={chapter} />
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
                <a href={getChapterRoute(nextChapter, params.slug).path}>Prochain chapitre : {nextChapter.name}</a>
              </div>
            )}
          </section>
        </div>
      </main>
    )
  );
}
