'use client';

import Header from '@/components/header/Header';
import { useEffect, useState } from 'react';
import ChapterForm from '@/components/forms/ChapterForm';
import { default as StepComponent } from '@/components/step/step-display/StepDisplay';
import { FeedbackBannerProps, FeedbackTypeEnum } from '@/components/feedback/FeedbackBanner';
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
import StoryArcForm from '@/components/forms/StoryArcForm';
import { Clue } from '@/model/Clue.class';
import { isUserLoggedIn } from '@/security/login';
import LoginForm from '@/components/forms/LoginForm';
import NonPlayerCharacterForm from '@/components/forms/NonPlayerCharacterForm';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';
import { Place } from '@/model/Place.class';
import PlaceForm from '@/components/forms/PlaceForm';
import { StoryArc } from '@/model/adventure/story-arc/StoryArc.class';
import { Chapter } from '@/model/adventure/story-arc/chapter/Chapter.class';
import { Step } from '@/model/adventure/story-arc/chapter/step/Step.class';
import { useGetAdventureQuery, useSetAdventureMutation } from '@/lib/services/adventures.api';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { adventureSelector } from '@/lib/store/adventures/adventures.selector';
import { setAdventure } from '@/lib/store/adventures/adventures.reducer';
import { Adventure, AdventureManager } from '@/model/AdventureManager.class';

enum FormEnum {
  STORY_ARC = 'STORY_ARC',
  CHAPTER = 'CHAPTER',
  STEP = 'STEP',
  AUDIO = 'AUDIO',
  IMAGE = 'IMAGE',
  CLUE = 'CLUE',
  DICE_ROLL = 'DICE_ROLL',
  NPC = 'NON_PLAYER_CHARACTER',
  PLACE = 'PLACE',
}

export default function EditAdventure({ params }: { params: { adventureSlug: string } }) {
  const dispatch = useAppDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storyArc, setStoryArc] = useState<StoryArc>();
  const { data: adventureData, isSuccess: isAdventureLoadingFulfilled } = useGetAdventureQuery(params.adventureSlug);
  const [updateAdventure, result] = useSetAdventureMutation();
  const adventure = useAppSelector(adventureSelector);
  const [adventureManager, setAdventureManager] = useState<AdventureManager>();
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

  console.log(adventureData, adventure);

  useEffect(() => {
    if (isAdventureLoadingFulfilled) {
      dispatch(setAdventure(adventureData));
      setAdventureManager(new AdventureManager(adventureData));
    }
    // todo handle errors
    // todo fix this dispatch import
  }, [adventureData, dispatch, isAdventureLoadingFulfilled]);

  // todo revoir tous les messages d'erreur
  // todo fix erreurs console
  // todo fix erreur login
  // todo bug au save d'un indice
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
    /*const updatedAdventure: Adventure = Adventure.createFromJson(JSON.stringify(adventures));
    updatedAdventure.saveChapter(updatedChapter);
    setAdventure(updatedAdventure);*/

    updateAdventure(adventureManager?.saveStoryArc(updatedStoryArc) as Adventure);
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
    /*const updatedAdventure: Adventure = Adventure.createFromJson(JSON.stringify(adventures));
    updatedAdventure.saveChapter(updatedChapter);
    setAdventure(updatedAdventure);*/

    updateAdventure(adventureManager?.saveChapter(storyArc, updatedChapter) as Adventure);
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

    // todo handle errors
    updateAdventure(adventureManager?.saveStep(storyArc, chapter, updatedStep) as Adventure);
    setFormToDisplay(undefined);
  };
  const onAudioFormSubmit = async (audio: Audio) => {
    if (!adventure || !storyArc || !chapter || !step) {
      setFeedback({
        type: FeedbackTypeEnum.ERROR,
        message: "Élément manquant, impossible de sauvegarder l'audio",
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

    // todo handle errors
    updateAdventure(adventure);
    setFormToDisplay(undefined);
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

    // todo handle errors
    updateAdventure(adventure);
    setFormToDisplay(undefined);
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
    const targetChapter = adventureManager?.findChapterById(storyArc, chapter.id);
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

    // todo handle errors
    updateAdventure(adventure);
    setFormToDisplay(undefined);
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

    // todo handle errors
    updateAdventure(adventure);
    setFormToDisplay(undefined);
  };

  const onNpcFormSubmit = async (npc: NonPlayerCharacter) => {
    if (!adventure || !storyArc || !chapter || !step) {
      setFeedback({
        type: FeedbackTypeEnum.ERROR,
        message: 'Élément manquant, impossible de sauvegarder le PNJ',
        setFeedback,
      });
      return;
    }
    setFeedback({ type: FeedbackTypeEnum.LOADING, message: 'Sauvegarde du PNJ en cours', setFeedback });

    /*setStep((prevState) => {
      return {
        ...prevState,
        nonPlayerCharacters: [...(prevState?.nonPlayerCharacters || []), npc],
      };
    });*/
    // todo fix this, it's awful
    //step.nonPlayerCharacters = [...(step.nonPlayerCharacters || []), npc];
    // todo handle errors
    updateAdventure(
      adventureManager?.saveStep(storyArc, chapter, {
        ...step,
        nonPlayerCharacters: [...(step.nonPlayerCharacters || []), npc],
      }) as Adventure,
    );
    setFormToDisplay(undefined);
  };

  const onPlaceFormSubmit = async (place: Place) => {
    if (!adventure || !storyArc || !chapter || !step) {
      setFeedback({
        type: FeedbackTypeEnum.ERROR,
        message: 'Élément manquant, impossible de sauvegarder le lieu',
        setFeedback,
      });
      return;
    }
    setFeedback({ type: FeedbackTypeEnum.LOADING, message: 'Sauvegarde du lieu en cours', setFeedback });

    /*setStep((prevState) => {
      return {
        ...prevState,
        place: place,
      };
    });*/
    // todo fix this, it's awful
    step.place = place;

    // todo handle errors
    updateAdventure(adventureManager?.saveStep(storyArc, chapter, step) as Adventure);
    setFormToDisplay(undefined);
  };

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());

    if (isLoggedIn) {
      // todo load here
    }
  }, [params.adventureSlug, isLoggedIn]);

  // todo gérer les todos des aventures
  return (
    <main className='flex h-screen flex-col text-white'>
      <Header feedbackBannerProps={feedback ? { ...feedback, setFeedback: setFeedback } : undefined}></Header>
      {!isLoggedIn && <LoginForm loginCallback={setIsLoggedIn} />}
      {isLoggedIn && !adventure && <>Loading</>}
      {isLoggedIn && adventure && (
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
                <ul className='flex flex-col-reverse w-[95%]'>
                  {adventure &&
                    adventure.storyArcs?.map((thisArc) => (
                      <li className={'flex flex-col w-full justify-between'} key={thisArc.storyArcSlug}>
                        <div className='flex w-full'>
                          <button
                            onClick={() => {
                              setStoryArc(thisArc);
                              setChapter(undefined);
                              setStep(undefined);
                            }}
                            className={
                              storyArc && !chapter && thisArc.storyArcSlug === storyArc.storyArcSlug
                                ? 'flex flex-grow bg-white bg-opacity-50'
                                : 'flex flex-grow hover:bg-white hover:bg-opacity-50'
                            }
                          >
                            {thisArc.storyArcSlug} - <span className='font-bold'>{thisArc.name.toUpperCase()}</span>
                          </button>
                          <button onClick={() => onArcEditClick(thisArc)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </div>
                        <ul className='flex flex-col w-full ml-4 pr-4'>
                          {thisArc.chapters.map((thisChapter: Chapter) => (
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
                    chapter.steps.map((thisStep: Step) => (
                      <li
                        className={
                          step && thisStep?.id === step.id
                            ? 'flex w-full justify-between bg-white bg-opacity-50'
                            : 'flex w-full justify-between'
                        }
                        key={thisStep.id}
                      >
                        <button onClick={() => setStep(thisStep)} className='flex flex-grow'>
                          {thisStep.id} - <span className='font-bold'>{thisStep.title}</span>
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
                  <button
                    className='border-2 border-white opacity-80 px-2 mx-4 mb-4 hover:opacity-100 disabled:opacity-50'
                    onClick={() => setFormToDisplay(FormEnum.NPC)}
                    disabled={!step}
                  >
                    + 👨‍👦‍👦 PNJ
                  </button>
                  <button
                    className='border-2 border-white opacity-80 px-2 mx-4 mb-4 hover:opacity-100 disabled:opacity-50'
                    onClick={() => setFormToDisplay(FormEnum.PLACE)}
                    disabled={!step}
                  >
                    + 🗺 Lieu
                  </button>
                </div>
                {step && <StepComponent step={step} uniqueStepKey={step.id} referer={'edit'}></StepComponent>}
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
              {formToDisplay === FormEnum.NPC && adventure && storyArc && chapter && step && (
                <div className='flex flex-col w-1/4 flex-grow px-4 mt-8 items-center border-l-2 border-white'>
                  <NonPlayerCharacterForm
                    onSubmitCallback={onNpcFormSubmit}
                    adventureNpcs={adventure.nonPlayerCharacters}
                    requestedNpc={undefined}
                  />
                </div>
              )}
              {formToDisplay === FormEnum.PLACE && adventure && storyArc && chapter && step && (
                <div className='flex flex-col w-1/4 flex-grow px-4 mt-8 items-center border-l-2 border-white'>
                  <PlaceForm
                    onSubmitCallback={onPlaceFormSubmit}
                    adventurePlaces={adventure.places}
                    requestedPlace={undefined}
                  />
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
