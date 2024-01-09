import { Chapter } from '@/model/Chapter.class';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Adventure } from '@/model/Adventure.class';
import { saveAdventure } from '@/app/data-provider';
import { Step } from '@/model/Step.class';
import DiceRollForm from '@/components/forms/DiceRollForm';
import AudioForm from '@/components/forms/AudioForm';
import ClueForm from '@/components/forms/ClueForm';
import NextStepForm from '@/components/forms/NextStepForm';
import ImageForm from '@/components/forms/ImageForm';

export type StepSubFormProps = {
  step: Step;
  setStep: Dispatch<SetStateAction<Step>>;
};

type StepFormProps = {
  adventure: Adventure;
  chapter: Chapter;
  setChapter: Dispatch<SetStateAction<Chapter>>;
  step: Step;
  setStep: Dispatch<SetStateAction<Step>>;
};
export default function StepForm({ adventure, chapter, setChapter, step, setStep }: StepFormProps) {
  console.log(step);

  const onChapterSelect = (chapterId: string) => {
    const selectedChapter = adventure.findChapterById(chapterId);
    if (selectedChapter) {
      setChapter(selectedChapter);
    }
  };
  const onChange = (fieldName: string, value: string) => {
    const updatedStep: Step = { ...step };
    // @ts-ignore
    updatedStep[fieldName] = value;
    setStep(updatedStep);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    adventure.addStep(step, chapter);
    const response = await saveAdventure(adventure);
    if (response.status !== 201) {
      console.error(response);
      alert('Erreur');
    }
  };

  return (
    <>
      <h3 className='my-4'>Ajouter un step ({adventure && chapter && adventure.computeNextStepId(chapter)})</h3>
      <div className='flex w-full mt-8'>
        <form className='flex w-1/3' onSubmit={(e) => onSubmit(e)}>
          <div className='flex flex-col h-full w-full'>
            <div className='flex flex-col w-full'>
              <label htmlFor='chapter' className='text-white'>
                Châpitre
              </label>
              <select className='text-black' onChange={(e) => onChapterSelect(e.target.value)} required={true}>
                <option value={undefined}>-</option>
                {adventure &&
                  adventure.chapters.map((thisChapter) => (
                    <option
                      value={thisChapter.id}
                      key={thisChapter.id}
                      selected={chapter && chapter.id === thisChapter.id ? true : undefined}
                    >
                      {thisChapter.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='name' className='text-white'>
                Description
              </label>
              <textarea
                name='description'
                placeholder='Description'
                value={step.description}
                onChange={(e) => onChange('description', e.target.value)}
                className='flex text-black w-full h-24 w-full'
                required
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='level' className='text-white'>
                Level
              </label>
              <input
                type='number'
                name='level'
                placeholder='Level'
                value={step.level}
                min={0}
                onChange={(e) => onChange('level', e.target.valueAsNumber)}
                className='flex text-black'
              />
            </div>
            <button type='submit'>Enregistrer</button>
          </div>
        </form>
        <div className='flex flex-col w-1/3 border-l-2 h-full mx-4 border-white'>
          <DiceRollForm step={step} setStep={setStep} />
        </div>
        <div className='flex flex-col w-1/3 border-l-2 h-full mx-4 border-white'>
          <AudioForm step={step} setStep={setStep} />
          <ImageForm step={step} setStep={setStep} />
          <ClueForm step={step} setStep={setStep} />
          <NextStepForm step={step} setStep={setStep} />
        </div>
      </div>
    </>
  );
}
