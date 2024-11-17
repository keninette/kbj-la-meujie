'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Header from '@/components/header/Header';
import Sidenav from '@/components/sidenav/Sidenav';
import { Adventure } from '@/model/Adventure.class';
import { isUserLoggedIn } from '@/security/login';
import LoginForm from '@/components/forms/LoginForm';
import { Step } from '@/model/adventure/story-arc/chapter/step/Step.class';
import { Chapter } from '@/model/adventure/story-arc/chapter/Chapter.class';
import CustomTabs from '@/components/customTabs/CustomTabs';
import StepTab from '@/app/game-master/adventure/[adventureSlug]/chapter/[id]/components/StepTab';
import { MuiTabThemes, MuiThemes } from '@/model/types/external-libs.type';
import { TabHeader } from '@/app/game-master/adventure/[adventureSlug]/chapter/[id]/components/TabHeader';
import { Audio } from '@/model/Audio.class';

export default function ChapterDisplay({ params }: { params: { adventureSlug: string; id: string } }) {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeStep, setActiveStep] = useState<Step>();
  const [adventure, setAdventure] = useState<Adventure>();
  const [chapter, setChapter] = useState<Chapter>();
  const [audioPlaying, setAudioPlaying] = useState<Audio>();
  const onAudioRequested = useCallback((audio: Audio) => {
    setAudioPlaying(audio);
  }, []);

  useEffect(() => {
    setIsClient(true);
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  useEffect(() => {
    (async function () {
      const response = await fetch(`/api?adventureSlug=${params.adventureSlug}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
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

  const tab1 = (
    <div className='flex h-full w-full'>
      <StepTab step={activeStep} referer='read' onAudioRequested={onAudioRequested} />
    </div>
  );
  const tab2 = <div className='flex h-full w-full bg-orange-400'>Session</div>;

  return (
    <>
      <main className='flex h-100vh max-h-100vh flex-col text-white min-w-full overflow-y-scroll'>
        <Header></Header>
        {!isLoggedIn && <LoginForm loginCallback={setIsLoggedIn} />}
        {isLoggedIn && adventure && (
          <div className='flex h-full'>
            <section className='flex'>
              <Sidenav
                adventureSlug={adventure.adventureSlug}
                chapters={storyArcChapters() || []}
                onStepSelection={onStepSelection}
                className='w-[20rem]'
                selectedChapter={chapter}
              ></Sidenav>
            </section>
            <section className='flex flex-col w-full'>
              <TabHeader requestedAudio={audioPlaying} />
              <section className='flex w-full h-full'>
                {/*
                <div className='flex w-48 bg-red-400'>Timeline</div>
*/}
                <div className='flex flex-col w-full'>
                  <div className='flex h-full'>
                    <CustomTabs
                      tabs={[
                        { id: 'tab-step', title: 'Step', content: tab1 },
                        {
                          id: 'tab-session',
                          title: 'Session',
                          content: tab2,
                          disabled: true,
                        },
                      ]}
                      color={MuiTabThemes.PRIMARY}
                      className='flex flex-col h-full w-full'
                    />
                  </div>
                </div>
              </section>
            </section>
          </div>
        )}
      </main>
      )
    </>
  );
}
