import { FormEvent, useEffect, useState } from 'react';
import { Audio } from '@/model/Audio.class';

export type AudioFormProps = {
  onSubmitCallback: (audio: Audio) => void;
  requestedAudio?: Audio;
};

export default function AudioForm({ onSubmitCallback, requestedAudio }: AudioFormProps) {
  const [audio, setAudio] = useState<Audio>(new Audio('', ''));

  const onChange = (fieldName: string, value: string | number | boolean) => {
    const updatedAudio: Audio = { ...audio };

    switch (fieldName) {
      case 'autoplay':
        updatedAudio.autoPlay = !!value;
      case 'loop':
        updatedAudio.loop = !!value;
      default:
        // @ts-ignore
        updatedAudio[fieldName] = value;
        break;
    }
    setAudio(updatedAudio);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onSubmitCallback(audio);
  };

  useEffect(() => {
    if (requestedAudio) {
      setAudio(requestedAudio);
    }
  }, [requestedAudio]);

  return (
    <form className='flex w-full mx-4' onSubmit={(e) => onSubmit(e)}>
      <div className='flex flex-col h-full w-full'>
        <h4>Ajouter un audio</h4>
        <label htmlFor='name' className='text-white'>
          Nom
        </label>
        <input
          type='text'
          name='name'
          placeholder='Nom'
          value={audio.name}
          onChange={(e) => onChange('name', e.target.value)}
          className='flex text-black'
          required
        />
        <label htmlFor='filename' className='text-white'>
          Nom du fichier
        </label>
        <input
          type='text'
          name='filename'
          placeholder='Nom du fichier'
          value={audio.filename}
          onChange={(e) => onChange('filename', e.target.value)}
          className='flex text-black'
          required
        />
        <label htmlFor='helper' className='text-white'>
          Helper
        </label>
        <input
          type='text'
          name='helper'
          placeholder='Helper'
          value={audio.helper || ''}
          onChange={(e) => onChange('helper', e.target.value)}
          className='flex text-black'
        />
        <div className='flex'>
          <label htmlFor='options' className='text-white'>
            Autoplay
          </label>
          <input
            type='checkbox'
            name='autoplay'
            placeholder='Autoplay'
            checked={audio.autoPlay}
            onChange={(e) => onChange('autoplay', e.target.checked)}
            className='flex text-black mx-2'
          />
          <label htmlFor='options' className='text-white'>
            Loop
          </label>
          <input
            type='checkbox'
            name='loop'
            placeholder='Loop'
            checked={audio.loop}
            onChange={(e) => onChange('loop', e.target.checked)}
            className='flex text-black mx-2'
          />
          <label htmlFor='options' className='text-white'>
            Volume
          </label>
          <input
            type='number'
            name='volume'
            placeholder='Volume'
            value={audio.volume}
            onChange={(e) => onChange('volume', e.target.valueAsNumber)}
            className='flex text-black mx-2 w-12'
            min={0}
            max={1}
            step={0.1}
            required
          />
        </div>
        <button className='mt-2 mb-4' type='submit'>
          Ajouter
        </button>
      </div>
    </form>
  );
}
