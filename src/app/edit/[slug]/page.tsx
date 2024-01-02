'use client';

import Header from '@/components/header/Header';
import { useEffect, useState } from 'react';
import { Adventure } from '@/model/Adventure.class';
import Sidenav from '@/components/sidenav/Sidenav';
import { Chapter } from '@/model/Chapter.class';
import ChapterForm from '@/components/forms/ChapterForm';
import StepForm from '@/components/forms/StepForm';
import { Step } from '@/model/Step.class';

export default function EditAdventure({ params }: { params: { slug: string } }) {
  const [adventure, setAdventure] = useState<Adventure>();
  const [displayArchForm, setDisplayArchForm] = useState<boolean>(false);
  const [displayChapterForm, setDisplayChapterForm] = useState<boolean>(false);
  const [displayStepForm, setDisplayStepForm] = useState<boolean>(false);
  const [chapter, setChapter] = useState<Chapter>(new Chapter('', '', []));
  const [step, setStep] = useState<Step>(new Step('', 0));

  // todo handle story arcs
  useEffect(() => {
    (async function () {
      const response = await fetch(`/adventure/api?slug=${params.slug}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      // Re-build adventure otherwise we don't have access to methods in class
      const adventure = Adventure.createFromJson(JSON.stringify(data));
      setAdventure(adventure);
    })();
  }, [params.slug]);

  // todo gérer les todos des aventure

  return (
    <main className='flex h-screen flex-col text-white'>
      <Header></Header>
      <div className='flex'>
        <Sidenav adventureSlug={params.slug} chapters={adventure?.chapters || []} onStepSelection={() => {}} />
        <section className='flex flex-col items-center text-white h-full'>
          <h2>{adventure?.name}</h2>
          <div className='flex w-full justify-evenly mt-8'>
            <button
              className='w-48 border-2 border-white opacity-80 mx-4 hover:opacity-100 disabled:opacity-50'
              onClick={() => {
                setDisplayArchForm(true);
                setDisplayChapterForm(false);
                setDisplayStepForm(false);
              }}
              disabled={true}
            >
              Ajouter un arc
            </button>
            <button
              className='w-48 border-2 border-white opacity-80 mx-4 hover:opacity-100'
              onClick={() => {
                setDisplayArchForm(false);
                setDisplayChapterForm(true);
                setDisplayStepForm(false);
              }}
            >
              Ajouter un chapitre
            </button>
            <button
              className='w-48 border-2 border-white opacity-80 mx-4 hover:opacity-100'
              onClick={() => {
                setDisplayArchForm(false);
                setDisplayChapterForm(false);
                setDisplayStepForm(true);
              }}
            >
              Ajouter une étape
            </button>
          </div>
          {adventure && displayChapterForm && (
            <ChapterForm adventure={adventure} chapter={chapter} setChapter={setChapter} />
          )}
          {adventure && displayStepForm && (
            <StepForm adventure={adventure} chapter={chapter} step={step} setStep={setStep} />
          )}
        </section>
      </div>
    </main>
  );
}
