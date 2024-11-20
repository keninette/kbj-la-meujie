import React from 'react';

export type RefreshNonPlayerCharactersButtonProps = {
  onClickCallback?: () => void;
};
export default function RefreshNonPlayerCharacters({ onClickCallback }: RefreshNonPlayerCharactersButtonProps) {
  return (
    <button className='m-2 text-gray-500 italic cursor-pointer' onClick={onClickCallback}>
      ♻ Recharger les PNJs de la session
    </button>
  );
}
