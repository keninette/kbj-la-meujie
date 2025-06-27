import NonPlayerCharacterBlock from '@/components/step/NonPlayerCharacterBlock';
import React from 'react';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';

type NonPlayerCharactersTabProps = {
  characters?: NonPlayerCharacter[];
};
export function NonPlayerCharactersTab({ characters }: NonPlayerCharactersTabProps) {
  return (
    <div className={'flex w-full'}>
      <ul>
        {characters?.map((character) => (
          <NonPlayerCharacterBlock
            key={character.uuid}
            npc={character}
            npcUniqId={`npc__${character.name.toLowerCase().replaceAll(' ', '')}`}
            referer={'players'}
          />
        ))}
      </ul>
    </div>
  );
}
