'use client';

import React, { useEffect, useState } from 'react';
import { getChapterById } from '@/lib/adventures/frontiere-des-tenebres.lib';
import { getChapterRoute } from '@/app/routes';
import { getAdventureById } from '@/lib/adventures/adventures.lib';
import Header from '@/components/header/Header';
import { StepType } from '@/model/step.type';
import Sidenav from '@/components/sidenav/Sidenav';
import RecursiveSteps from '@/components/step/RecursiveSteps';

export type ArrowCoordinatesType = {
  id: string;
  start: string;
  end: string;
};

export default function Chapter() {
  const [isClient, setIsClient] = useState(false);
  const [activeStep, setActiveStep] = useState();
  const chapterId = isClient
    ? activeStep
      ? (activeStep as StepType).chapterId
      : new URL(window.location.toString()).searchParams.get('id')
    : undefined;
  const chapter = chapterId ? getChapterById(chapterId) : undefined;
  const nextChapterData = chapter?.nextChapterId ? getChapterById(chapter?.nextChapterId) : undefined;
  const adventure = chapter ? getAdventureById(chapter.adventureId) : undefined;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onStepSelection = (step: StepType) => {
    // @ts-ignore
    setActiveStep(step);
  };

  const activeSteps = activeStep
    ? [(activeStep as StepType).id]
    : chapter?.steps?.filter((step) => step.level === 1).map((step) => step.id);

  return (
    adventure && (
      <main className='flex min-h-screen flex-col text-white min-w-full'>
        <Header chapters={adventure.chapters} activeChapter={chapter}></Header>
        <div className='flex'>
          <section className='flex w-1/5'>
            <Sidenav chapters={adventure.chapters} onStepSelection={onStepSelection}></Sidenav>
          </section>
          <section className='flex flex-col w-4/5'>
            {isClient && chapter && adventure && (
              <>
                <section className='flex h-full w-full flex-grow'>
                  <div className='flex flex-col h-full w-full m-4'>
                    <h2 className='flex justify-center w-full text-3xl'>{chapter.name}</h2>
                    {
                      <div className='flex'>
                        {isClient && activeSteps?.map((stepId) => <RecursiveSteps key={stepId} stepIds={[stepId]} />)}
                      </div>
                    }
                  </div>
                </section>
              </>
            )}
            {nextChapterData && (
              <div
                id='next-chapter'
                className='flex w-[94%] p-4 text-xl justify-center m-auto mt-10 border-solid border-2 flex-grow z-10 border-gradient border-gradient--red--to-right opacity-25'
              >
                <a href={getChapterRoute(nextChapterData).path}>Prochain chapitre : {nextChapterData.name}</a>
              </div>
            )}
          </section>
        </div>
      </main>
    )
  );
}
