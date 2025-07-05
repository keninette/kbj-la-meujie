import { FormEvent, useState } from 'react';
import { Image } from '@/model/Image.class';

export type ImageFormProps = {
  onSubmitCallback: (image: Image) => void;
  requestedImage?: Image;
};

export default function ImageForm({ onSubmitCallback, requestedImage }: ImageFormProps) {
  const [image, setImage] = useState<Image>(new Image('', ''));

  const onChange = (fieldName: string, value: string | number) => {
    const updatedImage: Image = { ...image };
    // @ts-ignore
    updatedImage[fieldName] = value;
    setImage(updatedImage);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onSubmitCallback(image);
  };

  return (
    <form className='flex w-full mx-4' onSubmit={onSubmit}>
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
