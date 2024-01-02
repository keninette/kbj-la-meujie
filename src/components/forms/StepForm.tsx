import { Chapter } from '@/model/Chapter.class';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Adventure } from '@/model/Adventure.class';
import { saveAdventure } from '@/app/data-provider';
import { Step } from '@/model/Step.class';
import { DiceRoll } from '@/model/DiceRoll.class';
import DiceRollForm from '@/components/forms/DiceRollForm';

type StepFormProps = {
  adventure: Adventure;
  chapter: Chapter;
  step: Step;
  setStep: Dispatch<SetStateAction<Step>>;
};
export default function StepForm({ adventure, chapter, step, setStep }: StepFormProps) {
  const [diceRolls, setDiceRolls] = useState<DiceRoll[]>([]);

  // todo refactor this, it's always the same
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
    <div className='flex w-full mt-8'>
      <form className='flex w-1/2' onSubmit={(e) => onSubmit(e)}>
        <div className='flex flex-col h-full w-full'>
          <div className='flex flex-col w-full'>
            <label htmlFor='name' className='text-white'>
              Level
            </label>
            <input
              type='number'
              name='level'
              placeholder='Level'
              value={step.level}
              onChange={(e) => onChange('level', e.target.value)}
              className='flex text-black w-1/3'
              required
            />
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
          <button type='submit'>Enregistrer</button>
        </div>
      </form>
      <div className='flex flex-col w-1/2 border-l-2 h-full mx-4 border-white'>
        <DiceRollForm step={step} setStep={setStep} />
      </div>
    </div>
  );
}
