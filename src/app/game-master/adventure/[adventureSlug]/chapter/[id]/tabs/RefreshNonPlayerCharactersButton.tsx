import React from 'react';
import { AdventuresApi } from '@/services/adventures.api';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';

type RefreshNonPlayerCharactersButtonProps = {
  onRefreshCallback: (newPlayerCharacters: NonPlayerCharacter[]) => void;
  existingCharactersInSession: NonPlayerCharacter[];
  adventureSlug: string;
  storyArcSlug: string;
};

export default function RefreshNonPlayerCharacters({
  onRefreshCallback,
  existingCharactersInSession,
  adventureSlug,
  storyArcSlug,
}: RefreshNonPlayerCharactersButtonProps) {
  const refreshSessionNonPlayerCharacters = async () => {
    const storyNpcs = await AdventuresApi.getSessionNonPlayerCharacters({ adventureSlug, storyArcSlug });
    const missingNpcsInSession = storyNpcs?.filter(
      (storyNpc) =>
        !existingCharactersInSession.find((sessionNpc: NonPlayerCharacter) => sessionNpc.id === storyNpc.id),
    );

    onRefreshCallback(missingNpcsInSession);
  };

  return (
    <button className='m-2 text-gray-500 italic cursor-pointer' onClick={refreshSessionNonPlayerCharacters}>
      ♻ Recharger les PNJs de la session
    </button>
  );
}
