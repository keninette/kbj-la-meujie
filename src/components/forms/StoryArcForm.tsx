import React, { FormEvent, useEffect, useState } from 'react';
import { StoryArc } from '@/model/StoryArc.class';

type StoryArcFormProps = {
  requestedStoryArc?: StoryArc;
  onSubmitCallback: (storyArc: StoryArc) => void;
};

export default function StoryArcForm({ requestedStoryArc, onSubmitCallback }: StoryArcFormProps) {
  const [storyArc, setStoryArc] = useState(new StoryArc());
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitCallback(storyArc);
  };
  const onChange = (fieldName: string, value: string) => {
    const updatedStoryArc: StoryArc = { ...storyArc };
    updatedStoryArc[fieldName] = value;
    setStoryArc(updatedStoryArc);
  };

  useEffect(() => {
    if (requestedStoryArc) {
      setStoryArc(requestedStoryArc);
    }
  }, [requestedStoryArc]);

  console.log(storyArc);
  return (
    <form className='flex flex-col mt-8' onSubmit={onSubmit}>
      <h3 className='my-4'>Ajouter un arc</h3>
      <div className='flex flex-col w-full'>
        <label htmlFor='name' className='text-white'>
          Slug
        </label>
        <input
          type='text'
          name='storyArcSlug'
          placeholder='Slug'
          value={storyArc.storyArcSlug}
          onChange={(e) => onChange('storyArcSlug', e.target.value)}
          className='flex text-black w-full'
          required
        />
      </div>
      <div className='flex flex-col w-full'>
        <label htmlFor='name' className='text-white'>
          Slug
        </label>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={storyArc.name}
          onChange={(e) => onChange('name', e.target.value)}
          className='flex text-black w-full'
          required
        />
      </div>
      <button type='submit'>Enregistrer</button>
    </form>
  );
}
