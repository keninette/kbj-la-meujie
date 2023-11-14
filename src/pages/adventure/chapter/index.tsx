import React, {useEffect, useState} from "react";
import {getChapterById} from "@/lib/adventures/frontiere-des-tenebres.lib";
import Xarrow from 'react-xarrows'
import Step from "../../../components/Step";
import Breadcrumb from "../../../components/Breadcrumb";
import routes, {getAdventureRoute, getChapterRoute} from '../../../app/routes';
import {getAdventureById} from "@/lib/adventures/adventures.lib";
import Header from "@/components/Header";
import '../../../../public/globals.css';

// todo use reaflow
// todo auto volume
// todo clean code
// todo fix duplicate key to undefined


export default function Chapter() {

  const [isClient, setIsClient] = useState(false);
  const arrows = [];
  const organizedStepContent = [];
  const chapterId = isClient ? new URL(window.location).searchParams.get('id') : undefined;
  const chapter = chapterId ? getChapterById(chapterId) : undefined;
  const nextChapterData = chapter?.nextChapterId ? getChapterById(chapter?.nextChapterId) : undefined;
  const adventure = chapter ? getAdventureById(chapter.adventureId) : undefined;
  useEffect(() => {
    setIsClient(true);
  }, []);

  // todo add missing next step

  if (chapter) {
    const getChapterStepsByLevel = () => {
      return chapter?.steps.reduce(function (r, a, i) {
        if (!i || r[r.length - 1][0].level !== a.level) {
          return r.concat([[a]]);
        }
        r[r.length - 1].push(a);
        return r;
      }, []);
    };
    const stepsPerLevel = getChapterStepsByLevel();

    // Organize steps per their level & build HTML content
    if (stepsPerLevel) {
      for(const level in stepsPerLevel) {
        // Build organized step content
        const content = stepsPerLevel[level].map((step) => <Step key={step.id} stepData={step} />);
        organizedStepContent.push((<div key={level} className="flex mb-6 flex-grow">{content}</div>))

        // Build arrows data
        stepsPerLevel[level].map((step) => {
          if (step.nextStepsIds) {
            arrows.push(...step.nextStepsIds?.map((nextStepId) => {
              return {
                id: `${step.id}_${nextStepId}`,
                start: step.id,
                end: nextStepId,
              }
            }));
          }
        });
      }
    }

    // Compute arrows
    if (chapter?.nextChapterId) {
      const lastArrow = arrows[(arrows.length - 1)];
      arrows.push({
        id: `${lastArrow.end}_next-chapter`,
        start: lastArrow.end,
        end: 'next-chapter',
      })
    }
  }

  return (
    <main className="flex min-h-screen flex-col text-white">
      <Header></Header>
      <section className="flex flex-col w-full">
        {
          isClient && chapter && adventure && (
            <>
              <Breadcrumb previousRoutes={[routes.home, getAdventureRoute(adventure)]} currentRoute={getChapterRoute(chapter)} />
              <section className="flex h-full w-full flex-grow">
                <div className="flex flex-col h-full w-full m-4">
                  <h1 className="text-xl font-bold mb-6">{chapter.name}</h1>
                  {<div className="flex flex-col">
                    {
                      isClient && organizedStepContent
                    }
                    {isClient && arrows && arrows.map((edge) => {
                      return (
                        <Xarrow
                          key={edge.id}
                          start={edge.start}
                          end={edge.end}
                          color="white"
                          strokeWidth={2}
                          path="grid"
                          zIndex={1}
                        ></Xarrow>);
                    })}
                    {nextChapterData && (
                      <div id="next-chapter" className="flex flex-col w-ful m-4 border-solid border-2 m-10 flex-grow z-10 bg-white">
                        <a href="">{nextChapterData.name}</a>
                      </div>
                    )}
                  </div>}
                </div>
              </section>
            </>
          )
        }
      </section>
    </main>
  );
}