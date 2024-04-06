import { FormEvent, useEffect, useState } from 'react';
import { Step } from '@/model/adventure/story-arc/chapter/step/Step.class';

type StepFormProps = {
  requestedStep?: Step;
  nextStepId: string;
  onSubmitCallback: (updatedStep: Step) => void;
};
// todo multiple nextSteps
export default function StepForm({ requestedStep, nextStepId, onSubmitCallback }: StepFormProps) {
  const [step, setStep] = useState<Step>(Step.getEmptyStep());

  const onChange = (fieldName: string, value: string | number | string[]) => {
    let valueToSave: any;
    if (fieldName === 'nextStepsIds') {
      valueToSave = (value as string).split(',');
    } else {
      valueToSave = value;
    }
    setStep((prevState) => ({ ...prevState, [fieldName]: valueToSave }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onSubmitCallback(step);
  };

  useEffect(() => {
    if (requestedStep) {
      setStep(requestedStep);
    }
  }, [requestedStep]);

  return (
    <>
      <h3 className='my-4'>Ajouter un step ({nextStepId})</h3>
      <div className='flex w-full mt-8'>
        <form className='flex flex-col w-full' onSubmit={onSubmit}>
          <div className='flex flex-col w-full'>
            <label htmlFor='date' className='text-white'>
              Date
            </label>
            <input
              type='text'
              name='date'
              placeholder='date'
              value={step.date || ''}
              onChange={(e) => onChange('date', e.target.value)}
              className='flex text-black w-full'
            />
          </div>
          <div className='flex flex-col w-full'>
            <label htmlFor='title' className='text-white'>
              Date
            </label>
            <input
              type='text'
              name='title'
              placeholder='title'
              value={step.title || ''}
              onChange={(e) => onChange('title', e.target.value)}
              className='flex text-black w-full'
            />
          </div>
          <div className='flex flex-col w-full'>
            <label htmlFor='name' className='text-white'>
              Description
            </label>
            <textarea
              name='description'
              placeholder='Description'
              value={step.description || ''}
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
              min={1}
              onChange={(e) => onChange('level', e.target.valueAsNumber)}
              className='flex text-black'
            />
          </div>
          <div className='flex flex-col w-full'>
            <label htmlFor='name' className='text-white'>
              Prochaine étape
            </label>
            <input
              type='text'
              name='nextStepsIds'
              placeholder='nextStepsIds'
              value={step.nextStepsIds?.length ? step.nextStepsIds.join(',') : ''}
              onChange={(e) => onChange('nextStepsIds', e.target.value)}
              className='flex text-black w-full'
            />
          </div>
          <button type='submit'>Enregistrer</button>
        </form>
      </div>
    </>
  );
}
