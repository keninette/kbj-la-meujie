import { FormEvent, useState } from 'react';

export type ClueFormProps = {
  onSubmitCallback: (clue: string) => void;
  requestedClue?: string;
};

export default function ClueForm({ onSubmitCallback, requestedClue }: ClueFormProps) {
  const [clue, setClue] = useState('');
  const onChange = (value: string) => {
    setClue(value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitCallback(clue);
  };

  return (
    <form className='flex w-full mx-4' onSubmit={onSubmit}>
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
