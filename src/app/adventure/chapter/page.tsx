'use client';

import React, { useEffect, useState } from 'react';
import { getChapterById } from '@/lib/adventures/frontiere-des-tenebres.lib';
import Xarrow from 'react-xarrows';
import Step from '../../../components/Step';
import Breadcrumb from '../../../components/Breadcrumb';
import routes, { getAdventureRoute, getChapterRoute } from '../../../app/routes';
import { getAdventureById } from '@/lib/adventures/adventures.lib';
import Header from '@/components/Header';
import { StepType } from '@/model/step.type';

type ArrowCoordinatesType = {
  id: string;
  start: string;
  end: string;
};

export default function Chapter() {
  const [isClient, setIsClient] = useState(false);
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
        const content = stepsPerLevel[level].map((step) => <Step key={step.id} stepData={step} />);
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
        });
      });
    }
  }

  return (
    <main className='flex min-h-screen flex-col text-white'>
      <Header></Header>
      <section className='flex flex-col w-full'>
        {isClient && chapter && adventure && (
          <>
            <Breadcrumb
              previousRoutes={[routes.home, getAdventureRoute(adventure)]}
              currentRoute={getChapterRoute(chapter)}
            />
            <section className='flex h-full w-full flex-grow'>
              <div className='flex flex-col h-full w-full m-4'>
                <h2 className='flex justify-center text-xl font-bold mb-6'>{chapter.name}</h2>
                {
                  <div className='flex flex-col'>
                    {isClient && organizedStepContent}
                    {isClient &&
                      arrows &&
                      arrows.map((edge) => {
                        return (
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
                        );
                      })}
                    {nextChapterData && (
                      <div
                        id='next-chapter'
                        className='flex w-[94%] p-4 text-xl justify-center m-auto mt-10 border-solid border-2 flex-grow z-10 border-gradient border-gradient--red--to-right'
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
