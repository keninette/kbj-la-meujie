import React, { FormEvent, useState } from 'react';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Timer, TimerType } from '@/components/timer/Timer';

type TimerForm = {
  duration?: number;
  title?: string;
};

export function TimerWrapper() {
  const [formValues, setFormValues] = useState<TimerForm | undefined>();
  const [timer, setTimer] = useState<TimerForm | undefined>();

  const onTimerAdded = () => {
    setTimer({
      duration: undefined,
      title: undefined,
    });
  };

  const onFormChange = (e: FormEvent, target: 'title' | 'duration') => {
    const newValue = target === 'title' ? (e.target as HTMLInputElement).value : +(e.target as HTMLInputElement).value;
    setFormValues((prevForm) => {
      return prevForm ? { ...prevForm, [target]: newValue } : { [target]: newValue };
    });
  };

  const onTitleSaved = (title?: string) => {
    setTimer((prevTimer) => (prevTimer ? { ...prevTimer, title } : { title }));
  };

  const onDurationSaved = (duration?: number) => {
    setTimer((prevTimer) => (prevTimer ? { ...prevTimer, duration } : { duration }));
  };

  return timer ? (
    <div className='flex flex-col justify-center'>
      {!timer.title && (
        <>
          <input placeholder='Titre' type='text' onChange={(e) => onFormChange(e, 'title')} className='text-black' />
          <button onClick={() => onTitleSaved(formValues?.title)}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </>
      )}
      {timer.title && !timer.duration && (
        <>
          <input type='number' onChange={(e) => onFormChange(e, 'duration')} className='text-black' min={0} />{' '}
          <button onClick={() => onDurationSaved(formValues?.duration)}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </>
      )}
      {timer.title && timer.duration && <Timer timer={timer as TimerType} />}
    </div>
  ) : (
    <button onClick={onTimerAdded}>
      <FontAwesomeIcon icon={faPlus} /> Ajouter un timer
    </button>
  );
}
