'use client';

import Header from '@/components/header/Header';
import { useEffect, useState } from 'react';
import { Adventure } from '@/model/Adventure.class';
import { Chapter } from '@/model/Chapter.class';
import ChapterForm from '@/components/forms/ChapterForm';
import { default as StepComponent } from '@/components/step/Step';
import { FeedbackBannerProps, FeedbackTypeEnum } from '@/components/feedback/FeedbackBanner';
import { Step } from '@/model/Step.class';
import { saveAdventure } from '@/app/data-provider';
import StepForm from '@/components/forms/StepForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import AudioForm from '@/components/forms/AudioForm';
import { Audio } from '@/model/Audio.class';
import ImageForm from '@/components/forms/ImageForm';
import { Image } from '@/model/Image.class';
import ClueForm from '@/components/forms/ClueForm';
import RecursiveDiceRollForm from '@/components/forms/RecursiveDiceRollForm';
import { DiceRoll } from '@/model/DiceRoll.class';
import { StoryArc } from '@/model/StoryArc.class';
import StoryArcForm from '@/components/forms/StoryArcForm';
import { Clue } from '@/model/Clue.class';

enum FormEnum {
  STORY_ARC = 'STORY_ARC',
  CHAPTER = 'CHAPTER',
  STEP = 'STEP',
  AUDIO = 'AUDIO',
  IMAGE = 'IMAGE',
  CLUE = 'CLUE',
  DICE_ROLL = 'DICE_ROLL',
}

export default function EditAdventure({ params }: { params: { slug: string } }) {
  const [storyArc, setStoryArc] = useState<StoryArc>();
  const [adventure, setAdventure] = useState<Adventure>();
  const [chapter, setChapter] = useState<Chapter>();
  const [step, setStep] = useState<Step>();
  const [formToDisplay, setFormToDisplay] = useState<FormEnum>();
  const [feedback, setFeedback] = useState<FeedbackBannerProps>();
  const onArcEditClick = (arc?: StoryArc) => {
    setStoryArc(arc);
    setFormToDisplay(FormEnum.STORY_ARC);
  };
  const onChapterEditClick = (chapter?: Chapter) => {
    setChapter(chapter);
    setFormToDisplay(FormEnum.CHAPTER);
  };
  const onStepEditClick = (step?: Step) => {
    setStep(step);
    setFormToDisplay(FormEnum.STEP);
  };
  // todo revoir tous les messages d'erreur
  const onStoryArcFormSubmit = async (updatedStoryArc: StoryArc) => {
    // todo setFeedback useful in object ?
    if (!adventure) {
      setFeedback({
        type: FeedbackTypeEnum.ERROR,
        message: "Aventure manquante, impossible de sauvegarder l'arc",
        setFeedback,
      });
      return;
    }
    setFeedback({ type: FeedbackTypeEnum.LOADING, message: 'Sauvegarde en cours', setFeedback });
    // todo find out why this doesn't work
    /*const updatedAdventure: Adventure = Adventure.createFromJson(JSON.stringify(adventure));
    updatedAdventure.saveChapter(updatedChapter);
    setAdventure(updatedAdventure);*/
    adventure.saveStoryArc(updatedStoryArc);

    const response = await saveAdventure(adventure);
    if (response.status !== 201) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: 'Echec de la sauvegarde du chapitre', setFeedback });
      console.error(response);
    } else {
      setFeedback({ type: FeedbackTypeEnum.SUCCESS, message: 'Sauvegarde réussie', setFeedback });
      setFormToDisplay(undefined);
    }
  };
  const onChapterFormSubmit = async (updatedChapter: Chapter) => {
    // todo setFeedback useful in object ?
    if (!adventure || !storyArc) {
      setFeedback({
        type: FeedbackTypeEnum.ERROR,
        message: 'Aventure manquante, impossible de sauvegarder le chapitre',
        setFeedback,
      });
      return;
    }
    setFeedback({ type: FeedbackTypeEnum.LOADING, message: 'Sauvegarde du chapitre en cours', setFeedback });
    // todo find out why this doesn't work
    /*const updatedAdventure: Adventure = Adventure.createFromJson(JSON.stringify(adventure));
    updatedAdventure.saveChapter(updatedChapter);
    setAdventure(updatedAdventure);*/
    adventure.saveChapter(storyArc, updatedChapter);

    const response = await saveAdventure(adventure);
    if (response.status !== 201) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: 'Echec de la sauvegarde du chapitre', setFeedback });
      console.error(response);
    } else {
      setFeedback({ type: FeedbackTypeEnum.SUCCESS, message: 'Sauvegarde du chapitre réussie', setFeedback });
      setFormToDisplay(undefined);
    }
  };
  const onStepFormSubmit = async (updatedStep: Step) => {
    if (!adventure || !storyArc || !chapter) {
      setFeedback({
        type: FeedbackTypeEnum.ERROR,
        message: "Aventure ou chapitre manquant, impossible de sauvegarder l'étape",
        setFeedback,
      });
      return;
    }
    setFeedback({ type: FeedbackTypeEnum.LOADING, message: "Sauvegarde de l'étape en cours", setFeedback });
    adventure.saveStep(storyArc, chapter, updatedStep);

    // todo duplicate
    const response = await saveAdventure(adventure);
    if (response.status !== 201) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: "Echec de la sauvegarde de l'étape", setFeedback });
      console.error(response);
    } else {
      setFeedback({ type: FeedbackTypeEnum.SUCCESS, message: "Sauvegarde de l'étape réussie", setFeedback });
      setFormToDisplay(undefined);
    }
  };
  const onAudioFormSubmit = async (audio: Audio) => {
    if (!adventure || !storyArc || !chapter || !step) {
      setFeedback({
        type: FeedbackTypeEnum.ERROR,
        message: "Élément manquant, impossible de sauvegarder l'étape",
        setFeedback,
      });
      return;
    }
    setFeedback({ type: FeedbackTypeEnum.LOADING, message: "Sauvegarde de l'audio en cours", setFeedback });
    // todo fix this whole thing
    const targetChapter = adventure.findChapterById(storyArc, chapter.id);
    if (!targetChapter) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: 'Chapitre non trouvé', setFeedback });
      return;
    }
    const targetStep = targetChapter.steps.find((thisStep: Step) => thisStep.id === step.id);
    if (!targetStep) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: 'Étape non trouvée', setFeedback });
      return;
    }
    if (!targetStep.audios) {
      targetStep.audios = [];
    }
    targetStep.audios.push(audio);

    // todo duplicate
    const response = await saveAdventure(adventure);
    if (response.status !== 201) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: "Echec de la sauvegarde de l'audio", setFeedback });
      console.error(response);
    } else {
      setFeedback({ type: FeedbackTypeEnum.SUCCESS, message: "Sauvegarde de l'audio réussie", setFeedback });
      setFormToDisplay(undefined);
    }
  };
  const onImageFormSubmit = async (image: Image) => {
    if (!adventure || !storyArc || !chapter || !step) {
      setFeedback({
        type: FeedbackTypeEnum.ERROR,
        message: "Élément manquant, impossible de sauvegarder l'étape",
        setFeedback,
      });
      return;
    }
    setFeedback({ type: FeedbackTypeEnum.LOADING, message: "Sauvegarde de l'audio en cours", setFeedback });
    // todo fix this whole thing
    const targetChapter = adventure.findChapterById(storyArc, chapter.id);
    if (!targetChapter) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: 'Chapitre non trouvé', setFeedback });
      return;
    }
    const targetStep = targetChapter.steps.find((thisStep: Step) => thisStep.id === step.id);
    if (!targetStep) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: 'Étape non trouvée', setFeedback });
      return;
    }
    if (!targetStep.images) {
      targetStep.images = [];
    }
    targetStep.images.push(image);

    // todo duplicate
    const response = await saveAdventure(adventure);
    if (response.status !== 201) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: "Echec de la sauvegarde de l'audio", setFeedback });
      console.error(response);
    } else {
      setFeedback({ type: FeedbackTypeEnum.SUCCESS, message: "Sauvegarde de l'audio réussie", setFeedback });
      setFormToDisplay(undefined);
    }
  };
  const onClueFormSubmit = async (clue: Clue) => {
    if (!adventure || !storyArc || !chapter || !step) {
      setFeedback({
        type: FeedbackTypeEnum.ERROR,
        message: "Élément manquant, impossible de sauvegarder l'étape",
        setFeedback,
      });
      return;
    }
    setFeedback({ type: FeedbackTypeEnum.LOADING, message: "Sauvegarde de l'audio en cours", setFeedback });
    // todo fix this whole thing
    const targetChapter = adventure.findChapterById(storyArc, chapter.id);
    if (!targetChapter) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: 'Chapitre non trouvé', setFeedback });
      return;
    }
    const targetStep = targetChapter.steps.find((thisStep: Step) => thisStep.id === step.id);
    if (!targetStep) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: 'Étape non trouvée', setFeedback });
      return;
    }
    if (!targetStep.clues) {
      targetStep.clues = [];
    }
    targetStep.clues.push(clue);

    // todo duplicate
    const response = await saveAdventure(adventure);
    if (response.status !== 201) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: "Echec de la sauvegarde de l'audio", setFeedback });
      console.error(response);
    } else {
      setFeedback({ type: FeedbackTypeEnum.SUCCESS, message: "Sauvegarde de l'audio réussie", setFeedback });
      setFormToDisplay(undefined);
    }
  };
  const onDiceRollSubmit = async (diceRoll: DiceRoll) => {
    if (!adventure || !storyArc || !chapter || !step) {
      setFeedback({
        type: FeedbackTypeEnum.ERROR,
        message: "Élément manquant, impossible de sauvegarder l'étape",
        setFeedback,
      });
      return;
    }
    setFeedback({ type: FeedbackTypeEnum.LOADING, message: "Sauvegarde de l'audio en cours", setFeedback });
    // todo fix this whole thing
    const targetChapter = adventure.findChapterById(storyArc, chapter.id);
    if (!targetChapter) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: 'Chapitre non trouvé', setFeedback });
      return;
    }
    const targetStep = targetChapter.steps.find((thisStep: Step) => thisStep.id === step.id);
    if (!targetStep) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: 'Étape non trouvée', setFeedback });
      return;
    }
    if (!targetStep.diceRolls) {
      targetStep.diceRolls = [];
    }
    targetStep.diceRolls.push(diceRoll);

    // todo duplicate
    const response = await saveAdventure(adventure);
    if (response.status !== 201) {
      setFeedback({ type: FeedbackTypeEnum.ERROR, message: "Echec de la sauvegarde de l'audio", setFeedback });
      console.error(response);
    } else {
      setFeedback({ type: FeedbackTypeEnum.SUCCESS, message: "Sauvegarde de l'audio réussie", setFeedback });
      setFormToDisplay(undefined);
    }
  };

  useEffect(() => {
    (async function () {
      const response = await fetch(`/api?slug=${params.slug}`, {
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

  // todo gérer les todos des aventures
  return (
    <main className='flex h-screen flex-col text-white'>
      <Header feedbackBannerProps={feedback ? { ...feedback, setFeedback: setFeedback } : undefined}></Header>
      {!adventure && <>Loading</>}
      {adventure && (
        <div className='flex'>
          <section className='flex flex-col items-center text-white h-full w-full'>
            <h2>{adventure?.name}</h2>
            <div className='flex w-full px-4'>
              <div className='flex flex-col w-1/4 flex-grow px-4 mt-8 items-center border-r-2 border-white'>
                <h3 className='underline my-4'>Liste des chapitres</h3>
                <div className='flex'>
                  <button
                    className='w-48 border-2 border-white opacity-80 mx-4 mb-4 hover:opacity-100'
                    onClick={() => {
                      onArcEditClick();
                    }}
                  >
                    Ajouter un arc
                  </button>
                  <button
                    className='w-48 border-2 border-white opacity-80 mx-4 mb-4 hover:opacity-100'
                    onClick={() => {
                      onChapterEditClick();
                    }}
                  >
                    Ajouter un chapitre
                  </button>
                </div>
                <ul className='flex flex-col w-[95%]'>
                  {adventure &&
                    adventure.storyArcs?.map((thisArc) => (
                      <li className={'flex flex-col w-full justify-between'} key={thisArc.slug}>
                        <div className='flex w-full'>
                          <button
                            onClick={() => {
                              setStoryArc(thisArc);
                              setChapter(undefined);
                              setStep(undefined);
                            }}
                            className={
                              storyArc && !chapter && thisArc.slug === storyArc.slug
                                ? 'flex flex-grow bg-white bg-opacity-50'
                                : 'flex flex-grow hover:bg-white hover:bg-opacity-50'
                            }
                          >
                            {thisArc.slug} - <span className='font-bold'>{thisArc.name.toUpperCase()}</span>
                          </button>
                          <button onClick={() => onArcEditClick(thisArc)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </div>
                        <ul className='flex flex-col w-full ml-4 pr-4'>
                          {thisArc.chapters.map((thisChapter) => (
                            <li
                              className={
                                chapter?.id === thisChapter.id
                                  ? 'flex w-full justify-between bg-white bg-opacity-50'
                                  : 'flex w-full justify-between hover:bg-white hover:bg-opacity-50'
                              }
                              key={thisChapter.id}
                            >
                              <button
                                onClick={() => {
                                  setStoryArc(thisArc);
                                  setChapter(thisChapter);
                                  setStep(undefined);
                                }}
                                className='flex flex-grow'
                              >
                                {thisChapter.id} - <span className='font-bold'>{thisChapter.name}</span>
                                {thisChapter.nextChapterId && <> ➡ {thisChapter.nextChapterId}</>}
                              </button>
                              <button onClick={() => onChapterEditClick(thisChapter)}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                </ul>
              </div>
              {formToDisplay === FormEnum.STORY_ARC && (
                <div className='flex flex-col w-1/4 flex-grow px-4 mt-8 items-center border-r-2 border-white'>
                  <StoryArcForm requestedStoryArc={storyArc} onSubmitCallback={onStoryArcFormSubmit} />
                </div>
              )}
              {formToDisplay === FormEnum.CHAPTER && adventure && storyArc && (
                <div className='flex flex-col w-1/4 flex-grow px-4 mt-8 items-center border-r-2 border-white'>
                  <ChapterForm
                    onSubmitCallback={onChapterFormSubmit}
                    nextChapterId={adventure.computeNextChapterId(storyArc)}
                    requestedChapter={chapter}
                  />
                </div>
              )}
              <div className='flex flex-col w-1/4 flex-grow px-4 mt-8 items-center border-r-2 border-white'>
                <h3 className='underline my-4'>Liste des étapes</h3>
                <button
                  className='w-48 border-2 border-white opacity-80 mx-4 mb-4 hover:opacity-100 disabled:opacity-50'
                  onClick={() => {
                    setStep(undefined);
                    setFormToDisplay(FormEnum.STEP);
                  }}
                  disabled={!chapter}
                >
                  Ajouter une étape
                </button>
                <ul className='flex flex-col w-[95%]'>
                  {chapter &&
                    chapter.steps.map((thisStep) => (
                      <li
                        className={
                          step && thisStep?.id === step.id
                            ? 'flex w-full justify-between bg-white bg-opacity-50'
                            : 'flex w-full justify-between'
                        }
                        key={thisStep.id}
                      >
                        <button onClick={() => setStep(thisStep)} className='flex flex-grow'>
                          {thisStep.id} - <span className='font-bold'>{thisStep.description}</span>
                        </button>
                        <button onClick={() => onStepEditClick(thisStep)}>
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
              {formToDisplay === FormEnum.STEP && adventure && storyArc && chapter && (
                <div className='flex flex-col w-1/4 flex-grow px-4 mt-8 items-center border-r-2 border-white'>
                  <StepForm
                    requestedStep={step}
                    nextStepId={adventure.computeNextStepId(chapter)}
                    onSubmitCallback={onStepFormSubmit}
                  />
                </div>
              )}
              <div className='flex flex-col w-1/4 flex-grow px-4 mt-8 items-center'>
                <h3 className='underline my-4'>{"Détail de l'étape"}</h3>
                <div className='flex'>
                  <button
                    className='border-2 border-white opacity-80 px-2 mx-4 mb-4 hover:opacity-100 disabled:opacity-50'
                    onClick={() => setFormToDisplay(FormEnum.AUDIO)}
                    disabled={!step}
                  >
                    + 🔉 Son
                  </button>
                  <button
                    className='border-2 border-white opacity-80 px-2 mx-4 mb-4 hover:opacity-100 disabled:opacity-50'
                    onClick={() => setFormToDisplay(FormEnum.IMAGE)}
                    disabled={!step}
                  >
                    + 📸 Image
                  </button>
                  <button
                    className='border-2 border-white opacity-80 px-2 mx-4 mb-4 hover:opacity-100 disabled:opacity-50'
                    onClick={() => setFormToDisplay(FormEnum.CLUE)}
                    disabled={!step}
                  >
                    + 🕵️‍♀️ Indice
                  </button>
                  <button
                    className='border-2 border-white opacity-80 px-2 mx-4 mb-4 hover:opacity-100 disabled:opacity-50'
                    onClick={() => setFormToDisplay(FormEnum.DICE_ROLL)}
                    disabled={!step}
                  >
                    + 🎲 Jet de dé
                  </button>
                </div>
                {step && <StepComponent step={step} uniqueStepKey={step.id}></StepComponent>}
              </div>
              {formToDisplay === FormEnum.AUDIO && adventure && storyArc && chapter && step && (
                <div className='flex flex-col w-1/4 flex-grow px-4 mt-8 items-center border-l-2 border-white'>
                  <AudioForm onSubmitCallback={onAudioFormSubmit} requestedAudio={undefined} />
                </div>
              )}
              {formToDisplay === FormEnum.IMAGE && adventure && storyArc && chapter && step && (
                <div className='flex flex-col w-1/4 flex-grow px-4 mt-8 items-center border-l-2 border-white'>
                  <ImageForm onSubmitCallback={onImageFormSubmit} requestedImage={undefined} />
                </div>
              )}
              {formToDisplay === FormEnum.CLUE && adventure && storyArc && chapter && step && (
                <div className='flex flex-col w-1/4 flex-grow px-4 mt-8 items-center border-l-2 border-white'>
                  <ClueForm onSubmitCallback={onClueFormSubmit} requestedClue={undefined} />
                </div>
              )}
              {formToDisplay === FormEnum.DICE_ROLL && adventure && storyArc && chapter && step && (
                <div className='flex flex-col w-1/4 flex-grow px-4 mt-8 items-center border-l-2 border-white'>
                  <RecursiveDiceRollForm onSubmitCallback={onDiceRollSubmit} requestedDiceRoll={undefined} />
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
