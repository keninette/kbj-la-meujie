import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CharacteristicModifier from '@/app/game-master/adventure/[adventureSlug]/chapter/[id]/tabs/session-tab/characters-tab/character-card/CharacteristicModifier';
import { Character, CharacterType } from '@/model/sessions/Character.class';
import { sha256 } from 'js-sha256';

type CharacterProps = {
  initialCharacter: Character;
  isEditable: boolean;
  onUpdateCallback: (char: Character) => void;
};

enum CharacteristicUpdate {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

export function CharacterCard({ initialCharacter, isEditable, onUpdateCallback }: CharacterProps) {
  // LOCAL STATES & CONSTANTS
  const [character, setCharacter] = useState(initialCharacter);
  const defaultCharacterPortrait = `default-${(initialCharacter.identifiesAs ?? 'Non-binary').toLowerCase()}.jpg`;
  // todo fix this
  const characterPortraitAsString =
    typeof initialCharacter?.portrait === 'string' && character?.portrait !== ''
      ? character.portrait
      : defaultCharacterPortrait;
  // todo fix trim
  const characterPortraitAsObject =
    typeof initialCharacter?.portrait === 'object' &&
    initialCharacter?.portrait?.filename.trim() !== '' &&
    initialCharacter?.portrait?.filename !== undefined
      ? initialCharacter?.portrait?.filename
      : defaultCharacterPortrait;
  const characterPortrait: string =
    typeof initialCharacter?.portrait === 'string' ? (characterPortraitAsString as string) : characterPortraitAsObject;
  const portraitDirectory =
    initialCharacter.type === CharacterType.PLAYER_CHARACTER ? '/assets/img/chars/' : '/assets/img/adventures/';
  // todo fix duplicate

  const computeObjectSha = (thisObject?: Object): string => {
    return sha256(JSON.stringify(thisObject ?? {}));
  };
  // EVENT HANDLERS
  const onCharacterChange = (
    characteristicName: keyof Character,
    operation: CharacteristicUpdate,
    max?: number,
    min: number = 0,
  ) => {
    const getNewCharacteristicValue = (newValue: number) => {
      if (newValue < min) {
        return min;
      }
      if (newValue > (max ?? 0)) {
        return max;
      }
      return newValue;
    };

    setCharacter((prevState) => {
      return {
        ...prevState,
        [characteristicName]:
          operation === CharacteristicUpdate.INCREMENT
            ? getNewCharacteristicValue(+(prevState[characteristicName] ?? 0) + 1)
            : getNewCharacteristicValue(+(prevState[characteristicName] ?? 0) - 1),
      };
    });
  };

  // USE EFFECTS
  useEffect(() => {
    const initialCharacterSha = computeObjectSha(initialCharacter);
    const characterSha = computeObjectSha(character);

    if (characterSha !== initialCharacterSha) {
      onUpdateCallback(character);
    }
  }, [onUpdateCallback, character, initialCharacter]);

  // todo tooltip with all info
  return (
    <div className='bg-white bg-opacity-10 mr-2 mb-2 border-t-2 border-white'>
      <p className='font-bold'>{initialCharacter.name}</p>
      <div className='flex w-[300px] h-[75px]'>
        <div className='flex h-full'>
          <Image
            src={`${portraitDirectory}${characterPortrait}`}
            alt={initialCharacter.name}
            width={110}
            height={110}
            className='object-contain'
          />
        </div>
        <div className='flex flex-col w-full ml-4'>
          <CharacteristicModifier
            label={
              <>
                <span className='text-red-500'>❤</span> HP
              </>
            }
            currentValue={character.currentHealthPoints}
            maxValue={character.maxHealthPoints}
            displayWarning={character.currentHealthPoints < 5}
            displayDanger={character.currentHealthPoints <= 0}
            onIncrementCallback={() =>
              onCharacterChange('currentHealthPoints', CharacteristicUpdate.INCREMENT, character.maxHealthPoints, -5)
            }
            onDecrementCallback={() =>
              onCharacterChange('currentHealthPoints', CharacteristicUpdate.DECREMENT, character.maxHealthPoints, -5)
            }
            isEditable={isEditable}
          />
          {!!character.maxSanPoints && (
            <CharacteristicModifier
              label={'🧠 SAN'}
              currentValue={character.currentSanPoints}
              maxValue={character.maxSanPoints}
              displayWarning={character.currentSanPoints < 0.66 * character.maxSanPoints}
              displayDanger={character.currentSanPoints < 0.33 * character.maxSanPoints}
              onIncrementCallback={() =>
                onCharacterChange('currentSanPoints', CharacteristicUpdate.INCREMENT, character.maxSanPoints)
              }
              onDecrementCallback={() =>
                onCharacterChange('currentSanPoints', CharacteristicUpdate.DECREMENT, character.maxSanPoints)
              }
              isEditable={isEditable}
            />
          )}
          {!!character.maxMagicPoints && (
            <CharacteristicModifier
              label={'🧙‍♂️ MP'}
              currentValue={character.currentMagicPoints}
              maxValue={character.maxMagicPoints}
              displayWarning={character.currentMagicPoints < 0.66 * character.maxMagicPoints}
              displayDanger={character.currentMagicPoints < 0.33 * character.maxMagicPoints}
              onIncrementCallback={() =>
                onCharacterChange('currentMagicPoints', CharacteristicUpdate.INCREMENT, character.maxMagicPoints)
              }
              onDecrementCallback={() =>
                onCharacterChange('currentMagicPoints', CharacteristicUpdate.DECREMENT, character.maxMagicPoints)
              }
              isEditable={isEditable}
            />
          )}
        </div>
      </div>
    </div>
  );
}
