import { PlayerCharacter } from '@/model/sessions/PlayerCharacter.class';
import React from 'react';
import { Character } from '@/model/sessions/Character.class';
import { CharacterCard } from '@/app/game-master/adventure/[adventureSlug]/chapter/[id]/tabs/session-tab/characters-tab/character-card/CharacterCard';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';

type PlayerCharacterTabProps = {
  characters?: Character[];
  onUpdateCallback: (character: Character) => void;
  type: 'playerCharacters' | 'nonPlayerCharacters';
};
export default function CharactersTab({ characters, onUpdateCallback, type }: PlayerCharacterTabProps) {
  const [displaySidebar, setDisplaySidebar] = React.useState<boolean>(false);
  const [formValues, setFormValues] = React.useState({
    name: '',
    backstory: '',
    identifiesAs: 'Non-binary',
    maxHealthPoints: 0,
    maxSanPoints: 0,
    maxMagicPoints: 0,
  });

  const saveNewCharacter = () => {
    const newCharacter = type === 'playerCharacters' ? new PlayerCharacter() : new NonPlayerCharacter();
    onUpdateCallback({
      ...newCharacter,
      name: formValues.name,
      backstory: formValues.backstory,
      identifiesAs: formValues.identifiesAs as 'Female' | 'Male' | 'Non-binary',
      maxHealthPoints: formValues.maxHealthPoints,
      currentHealthPoints: formValues.maxHealthPoints,
      maxSanPoints: formValues.maxSanPoints,
      currentSanPoints: formValues.maxSanPoints,
      maxMagicPoints: formValues.maxMagicPoints,
      currentMagicPoints: formValues.maxMagicPoints,
    });
  };

  return (
    <div className='flex w-full'>
      {characters && (
        <div className='flex w-full'>
          <ul className='flex flex-wrap flex-none'>
            {characters.map((character) => (
              <li key={`li--${character.uuid ?? character.uuid}`}>
                <CharacterCard
                  initialCharacter={character}
                  isEditable={true}
                  onUpdateCallback={(updatedCharacter) => onUpdateCallback(updatedCharacter as PlayerCharacter)}
                  key={`card--${character.uuid ?? character.uuid}`}
                />
              </li>
            ))}
          </ul>
          <button className='mx-4 h-12 min-w-[100px] border-white border-2' onClick={() => setDisplaySidebar(true)}>
            ➕ Ajouter un PNJ
          </button>
          {displaySidebar && (
            <div className='flex flex-col flex-grow w-full h-full bg-white bg-opacity-10'>
              <form className='flex flex-col w-full'>
                <label htmlFor='name'>Name:</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={formValues.name}
                  onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                  className='mb-2 text-black'
                />
                <label htmlFor='description'>Backstory:</label>
                <input
                  type='text'
                  name='backstory'
                  id='backstory'
                  value={formValues.backstory}
                  onChange={(e) => setFormValues({ ...formValues, backstory: e.target.value })}
                  className='mb-2 text-black'
                />
                <label htmlFor='maxHealthPoints'>Max HP:</label>
                <input
                  type='number'
                  name='maxHealthPoints'
                  id='maxHealthPoints'
                  value={formValues.maxHealthPoints}
                  onChange={(e) => setFormValues({ ...formValues, maxHealthPoints: +e.target.value })}
                  className='mb-2 text-black'
                />
                <label htmlFor='maxSanPoints'>Max SAN:</label>
                <input
                  type='number'
                  name='maxSanPoints'
                  id='maxSanPoints'
                  value={formValues.maxSanPoints}
                  onChange={(e) => setFormValues({ ...formValues, maxSanPoints: +e.target.value })}
                  className='mb-2 text-black'
                />
                <label htmlFor='maxMagicPoints'>Max MP:</label>
                <input
                  type='number'
                  name='maxMagicPoints'
                  id='maxMagicPoints'
                  value={formValues.maxMagicPoints}
                  onChange={(e) => setFormValues({ ...formValues, maxMagicPoints: +e.target.value })}
                  className='mb-2 text-black'
                />
                <label htmlFor='identifiesAs'>Identifies as:</label>
                <select
                  id='identifiesAs'
                  name='identifiesAs'
                  value={formValues.identifiesAs}
                  onChange={(e) => setFormValues({ ...formValues, identifiesAs: e.target.value })}
                  className='mb-2 text-black'
                >
                  <option value='Female>'>Femme</option>
                  <option value='Male>'>Homme</option>
                  <option value='Non-binary>'>Non-binaire</option>
                </select>
                <button type='button' onClick={saveNewCharacter}>
                  Save
                </button>
              </form>
            </div>
          )}
        </div>
      )}
      {!characters?.length && <p>No characters here</p>}
    </div>
  );
}
