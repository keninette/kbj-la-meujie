import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';
import { FormEvent, useState } from 'react';
import { Image } from '@/model/Image.class';

export type NonPlayerCharacterFormProps = {
  onSubmitCallback: (npc: NonPlayerCharacter) => void;
  adventureNpcs?: NonPlayerCharacter[];
  requestedNpc?: NonPlayerCharacter;
};

export default function NonPlayerCharacterForm({ onSubmitCallback, adventureNpcs }: NonPlayerCharacterFormProps) {
  const [npc, setNpc] = useState<NonPlayerCharacter>(new NonPlayerCharacter());
  const [isAdventureNpc, setIsAdventureNpc] = useState(false);
  const onFormChange = (fieldName: string, value: string | boolean | number | Image) => {
    switch (fieldName) {
      case 'portrait':
        setNpc((prevState) => {
          return {
            ...prevState,
            portrait: { ...prevState.portrait, filename: value as string },
          };
        });
        break;
      case 'existingNpc':
        const selectedNpc = adventureNpcs?.find((adventureNpc) => {
          return adventureNpc.id === +value;
        });
        if (!selectedNpc) {
          console.error('Adventure npc not found');
        } else {
          setNpc(selectedNpc);
          setIsAdventureNpc(true);
        }
        break;
      default:
        setNpc((prevState) => {
          return {
            ...prevState,
            [fieldName]: value,
          };
        });
        break;
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitCallback(npc);
  };

  return (
    <form className='flex w-full mx-4' onSubmit={onSubmit}>
      <div className='flex flex-col h-full w-full'>
        <h4 className='flex justify-center my-4'>Ajouter un PNJ</h4>
        <h5 className='flex justify-center my-2'>Ajouter un PNJ existant</h5>
        <select className='text-black' onChange={(e) => onFormChange('existingNpc', e.target.value)}>
          <option value=''>-</option>
          {adventureNpcs?.map((thisNpc) => {
            return (
              <option key={thisNpc.id} value={thisNpc.id}>
                {thisNpc.name}
              </option>
            );
          })}
        </select>
        <h5 className='flex justify-center my-2'>Créer un nouveau PNJ</h5>
        <input type='text' name='id' value={npc.id} className='flex text-black my-2' disabled={true} />
        <input
          type='text'
          name='name'
          placeholder='Nom'
          value={npc.name}
          onChange={(e) => onFormChange('name', e.target.value)}
          className='flex text-black my-2'
          disabled={isAdventureNpc}
          required
        />
        <input
          type='number'
          name='age'
          value={npc.age}
          onChange={(e) => onFormChange('age', +e.target.value)}
          className='flex text-black my-2'
          disabled={isAdventureNpc}
          required
        />
        <input
          type='text'
          name='occupation'
          placeholder='Métier'
          value={npc.occupation}
          onChange={(e) => onFormChange('occupation', e.target.value)}
          className='flex text-black my-2'
          disabled={isAdventureNpc}
          required
        />
        <textarea
          name='publicDescription'
          placeholder='Description publique'
          value={npc.publicDescription}
          onChange={(e) => onFormChange('publicDescription', e.target.value)}
          className='flex text-black my-2'
          disabled={isAdventureNpc}
        />
        <textarea
          name='privateDescription'
          placeholder='Description privée'
          value={npc.privateDescription}
          onChange={(e) => onFormChange('privateDescription', e.target.value)}
          className='flex text-black my-2'
          disabled={isAdventureNpc}
        />
        <div>
          <label htmlFor='isStepBound'>Disponible dans toute l&apos;aventure</label>
          <input
            type='checkbox'
            name='isStepBound'
            checked={!npc.isStepBound}
            onChange={(e) => onFormChange('isStepBound', !e.target.checked)}
            disabled={isAdventureNpc}
          />
        </div>
        <input
          type='text'
          name='filename'
          placeholder='Nom du fichier'
          value={npc.portrait.filename}
          onChange={(e) => onFormChange('portrait', e.target.value)}
          className='flex text-black'
          required
          disabled={isAdventureNpc}
        />
        <button className='mt-2 mb-4' type='submit'>
          Ajouter
        </button>
      </div>
    </form>
  );
}
