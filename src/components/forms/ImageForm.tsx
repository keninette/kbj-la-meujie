import { StepSubFormProps } from '@/components/forms/StepForm';
import { FormEvent, useState } from 'react';
import { Image } from '@/model/Image.class';
import { Step } from '@/model/Step.class';
import { Audio } from '@/model/Audio.class';

export default function ImageForm({ step, setStep }: StepSubFormProps) {
  const [image, setImage] = useState<Image>(new Image('', ''));

  const onChange = (fieldName: string, value: string | number) => {
    const updatedImage: Image = { ...image };
    updatedImage[fieldName] = value;
    setImage(updatedImage);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const updatedStep: Step = { ...step };
    if (!updatedStep.images) {
      updatedStep.images = [];
    }
    updatedStep.images.push(image);

    setStep(updatedStep);
    setImage(new Image('', ''));
  };

  return (
    <form className='flex w-full mx-4' onSubmit={(e) => onSubmit(e)}>
      <div className='flex flex-col h-full w-full'>
        <h4>Ajouter une image</h4>
        <label htmlFor='name' className='text-white'>
          Nom
        </label>
        <input
          type='text'
          name='name'
          placeholder='Nom'
          value={image.name}
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
          value={image.filename}
          onChange={(e) => onChange('filename', e.target.value)}
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
