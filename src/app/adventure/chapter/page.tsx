'use client';

import React, { useEffect, useState } from 'react';
import { getChapterById } from '@/lib/adventures/frontiere-des-tenebres.lib';
import Xarrow from 'react-xarrows';
import Step from '../../../components/Step';
import { getChapterRoute } from '@/app/routes';
import { getAdventureById } from '@/lib/adventures/adventures.lib';
import Header from '@/components/Header';
import { StepType } from '@/model/step.type';

type ArrowCoordinatesType = {
  id: string;
  start: string;
  end: string;
  isActive: boolean;
};

export default function Chapter() {
  const [isClient, setIsClient] = useState(false);
  const initialActiveSteps: string[] = [];
  const [activeSteps, setActiveSteps] = useState(initialActiveSteps);
  const arrows: ArrowCoordinatesType[] = [];
  const organizedStepContent = [];
  const chapterId = isClient ? new URL(window.location.toString()).searchParams.get('id') : undefined;
  const chapter = chapterId ? getChapterById(chapterId) : undefined;
  const nextChapterData = chapter?.nextChapterId ? getChapterById(chapter?.nextChapterId) : undefined;
  const adventure = chapter ? getAdventureById(chapter.adventureId) : undefined;
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (chapter) {
    const getSubSteps = (step: StepType) => {
      return chapter.steps?.filter((nextStep) => step.nextStepsIds?.includes(nextStep.id));
    };

    const handleStepActivation = (step: StepType, activeSteps: string[] = []) => {
      setActiveSteps([]);
      const subSteps = getSubSteps(step);
      activeSteps.push(step.id);
      subSteps?.forEach((subStep) => {
        handleStepActivation(subStep, activeSteps);
      });
      setActiveSteps(activeSteps);
    };

    const getChapterStepsByLevel = () => {
      return chapter?.steps?.reduce(function (r, a, i) {
        // @ts-ignore
        if (!i || r[r.length - 1][0].level !== a.level) {
          // @ts-ignore
          return r.concat([[a]]);
        }
        // @ts-ignore
        r[r.length - 1].push(a);
        return r;
      }, []);
    };
    const stepsPerLevel = getChapterStepsByLevel();

    // Organize steps per their level & build HTML content
    if (stepsPerLevel) {
      for (const level in stepsPerLevel) {
        // Build organized step content
        // @ts-ignore
        const content = stepsPerLevel[level].map((step) => (
          <Step key={step.id} stepData={step} handleClick={handleStepActivation} activeSteps={activeSteps} />
        ));
        organizedStepContent.push(
          <div className='flex' key={`level_${level}`}>
            {content}
          </div>,
        );

        // Build arrows data
        // @ts-ignore
        stepsPerLevel[level].map((step: StepType) => {
          if (step.nextStepsIds) {
            arrows.push(
              ...step.nextStepsIds?.map((nextStepId) => {
                return {
                  id: `${step.id}_${nextStepId}`,
                  start: step.id,
                  end: nextStepId,
                  isActive: activeSteps.includes(step.id),
                };
              }),
            );
          }
        });
      }
    }

    // Compute arrows
    if (chapter?.nextChapterId) {
      // @ts-ignore
      stepsPerLevel[stepsPerLevel.length - 1].map((step) => {
        arrows.push({
          id: `${step.id}_next-chapter`,
          start: step.id,
          end: 'next-chapter',
          isActive: activeSteps.includes(step.id),
        });
      });
    }
  }

  return (
    <main className='flex min-h-screen flex-col text-white'>
      <Header chapters={adventure?.chapters} activeChapter={chapter}></Header>
      <section className='flex flex-col w-full'>
        {isClient && chapter && adventure && (
          <>
            <section className='flex h-full w-full flex-grow'>
              <div className='flex flex-col h-full w-full m-4'>
                <h2 className='flex justify-center w-full text-3xl'>{chapter.name}</h2>
                {
                  <div className='flex flex-col'>
                    {isClient && organizedStepContent}
                    {isClient &&
                      arrows &&
                      arrows.map((edge) => {
                        return (
                          <div
                            key={`arrow-wrapper_${edge.id}`}
                            className={edge.isActive ? 'opacity-100' : 'opacity-20'}
                          >
                            <Xarrow
                              key={edge.id}
                              start={edge.start}
                              end={edge.end}
                              color='white'
                              strokeWidth={2}
                              path='grid'
                              zIndex={1}
                              startAnchor={'bottom'}
                              endAnchor={'top'}
                            ></Xarrow>
                          </div>
                        );
                      })}
                    {nextChapterData && (
                      <div
                        id='next-chapter'
                        className='flex w-[94%] p-4 text-xl justify-center m-auto mt-10 border-solid border-2 flex-grow z-10 border-gradient border-gradient--red--to-right opacity-25'
                      >
                        <a href={getChapterRoute(nextChapterData).path}>Prochain chapitre : {nextChapterData.name}</a>
                      </div>
                    )}
                  </div>
                }
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
