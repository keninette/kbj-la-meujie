import { StepSubFormProps } from '@/components/forms/StepForm';
import { FormEvent, useState } from 'react';
import { Step } from '@/model/Step.class';

export default function ClueForm({ step, setStep }: StepSubFormProps) {
  const [clue, setClue] = useState('');
  const onChange = (value: string) => {
    setClue(value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!clue) {
      return;
    }
    const updatedStep: Step = { ...step };

    if (!updatedStep.clues) {
      updatedStep.clues = [];
    }

    updatedStep.clues.push(clue);
    setStep(updatedStep);
    setClue('');
  };

  return (
    <form className='flex w-full mx-4' onSubmit={(e) => onSubmit(e)}>
      <div className='flex flex-col h-full w-full'>
        <h4>Ajouter un indice</h4>
        <input
          type='text'
          name='name'
          placeholder='Nom'
          value={clue || ''}
          onChange={(e) => onChange(e.target.value)}
          className='flex text-black'
          required
        />
        <button className='mt-2 mb-4' type='submit'>
          Ajouter
        </button>
      </div>
    </form>
  );
}
