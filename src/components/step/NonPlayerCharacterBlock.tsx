import { Tooltip } from 'react-tooltip';
import React from 'react';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';
import { Image } from '@/model/Image.class';

type NonPlayerCharacterProps = {
  npc: NonPlayerCharacter;
  npcUniqId: string;
  referer: 'edit' | 'read' | 'players';
};

export default function NonPlayerCharacterBlock({ npc, npcUniqId, referer }: NonPlayerCharacterProps) {
  const refererRelativePaths = {
    ['edit']: '../../../assets',
    ['read']: '../../../../assets',
    ['players']: '../../../../../../assets',
  };
  const portraitSrc = `${refererRelativePaths[referer]}/img/adventures/${(npc.portrait as Image)?.filename}`;

  return (
    <>
      <li
        className='flex flex-col w-[15rem] mr-4 mt-2 cursor-pointer'
        key={npcUniqId}
        data-tooltip-id={`tooltip_${npcUniqId}`}
      >
        <div className='flex'>
          {npc.portrait && <img className='w-20 mr-2 object-cover' src={portraitSrc} alt='Portrait' />}
          <div>
            <p className='font-bold'>{npc.name}</p>
            <p>{npc.age} ans</p>
            <p>{npc.occupation}</p>
          </div>
        </div>
      </li>
      <Tooltip
        id={`tooltip_${npcUniqId}`}
        openOnClick={true}
        opacity={0.975}
        className='max-w-3xl z-50'
        clickable={true}
      >
        <div className='flex border-solid border-2 border-gradient border-gradient--red--to-right p-4'>
          {npc.portrait && <img className='w-48 h-full' src={portraitSrc} alt='Portrait' />}
          <div className='flex flex-col px-4'>
            <p className='text-lg font-bold'>
              <a className='cursor-pointer' href={portraitSrc} target='_blank'>
                {npc.name}
              </a>
            </p>
            <p>{npc.age} ans</p>
            <p>{npc.occupation}</p>
            <p className='mt-2'>{npc.backstory}</p>
            {referer !== 'players' && npc.privateBackstory && (
              <p className='mt-2 italic opacity-80'>{npc.privateBackstory}</p>
            )}
          </div>
        </div>
      </Tooltip>
    </>
  );
}
