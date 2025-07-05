import { FormEvent, useState } from 'react';
import { Step } from '@/model/adventure/story-arc/chapter/step/Step.class';

type StepSubFormProps = {
  step: Step;
  setStep: (step: Step) => void;
};
export default function NextStepForm({ step, setStep }: StepSubFormProps) {
  const [nextStepId, setNextStepId] = useState('');
  const onChange = (value: string) => {
    setNextStepId(value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!nextStepId) {
      return;
    }
    const updatedStep: Step = { ...step };

    if (!updatedStep.nextStepsIds) {
      updatedStep.nextStepsIds = [];
    }

    updatedStep.nextStepsIds.push(nextStepId);
    setStep(updatedStep);
    setNextStepId('');
  };

  return (
    <form className='flex w-full mx-4' onSubmit={(e) => onSubmit(e)}>
      <div className='flex flex-col h-full w-full'>
        <h4>Ajouter un Next Step</h4>
        <input
          type='text'
          name='id'
          placeholder='Id'
          value={nextStepId || ''}
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
