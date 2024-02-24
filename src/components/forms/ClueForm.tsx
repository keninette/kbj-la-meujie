import { FormEvent, useState } from 'react';
import { Clue } from '@/model/Clue.class';
import { ClueTypeEnum } from '@/model/enums/clue-type.enum';

export type ClueFormProps = {
  onSubmitCallback: (clue: Clue) => void;
  requestedClue?: Clue;
};

export default function ClueForm({ onSubmitCallback, requestedClue }: ClueFormProps) {
  const [clue, setClue] = useState<Clue>(new Clue());
  const onFormChange = (fieldName: string, value: string | boolean) => {
    // todo use previous state everywhere
    setClue((prevState) => {
      return {
        ...prevState,
        [fieldName]: value,
      };
    });
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
          name='title'
          placeholder='Titre'
          value={clue.title}
          onChange={(e) => onFormChange('title', e.target.value)}
          className='flex text-black'
          required
        />
        <textarea
          name='publicDescription'
          placeholder='Description publique'
          value={clue.publicDescription}
          onChange={(e) => onFormChange('publicDescription', e.target.value)}
          className='flex text-black'
        />
        <textarea
          name='privateDescription'
          placeholder='Description privée'
          value={clue.privateDescription}
          onChange={(e) => onFormChange('privateDescription', e.target.value)}
          className='flex text-black'
        />
        <select
          name='type'
          placeholder='Type'
          value={clue.type}
          onChange={(e) => {
            onFormChange('type', e.target.value);
          }}
          required
        >
          {Object.keys(ClueTypeEnum).map((clueType) => (
            <option value={clueType} key={clueType}>
              {ClueTypeEnum[clueType as keyof typeof ClueTypeEnum]}
            </option>
          ))}
        </select>
        <input
          type='checkbox'
          checked={clue.isPublic}
          name='isPublic'
          id='isPublic'
          onChange={(e) => onFormChange('isPublic', e.target.checked)}
        />
        <label htmlFor='isPublic'>Rendre publique</label>
        <button className='mt-2 mb-4' type='submit'>
          Ajouter
        </button>
      </div>
    </form>
  );
}
