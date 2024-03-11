import { Place } from '@/model/Place.class';
import { Tooltip } from 'react-tooltip';
import React from 'react';

type PlaceBlockProps = {
  place: Place;
  referer: string;
};
export default function PlaceBlock({ place, referer }: PlaceBlockProps) {
  const assetsDir = referer === 'edit' ? '../../../assets' : '../../../../assets';

  return (
    <div>
      <p data-tooltip-id={`place_${place.id}`}>🗺 {place.name}</p>
      <Tooltip id={`place_${place.id}`} openOnClick={true} opacity={0.95} className='max-w-3xl' clickable={true}>
        <div className='flex border-solid border-2 border-gradient border-gradient--red--to-right p-4'>
          {place.picture && (
            <img className='w-48' src={`${assetsDir}/img/adventures/${place.picture.filename}`} alt='Photo' />
          )}
          <div className='flex flex-col px-4'>
            <p className='text-lg font-bold'>
              <a href={`${assetsDir}/img/adventures/${place.picture.filename}`} target='_blank'>
                {place.name} {place.pinId ? `(${place.pinId})` : ''}
              </a>
            </p>
            <p className='mt-2'>{place.publicDescription}</p>
            {place.privateDescription && <p className='mt-2 italic opacity-80'>{place.privateDescription}</p>}
          </div>
        </div>
      </Tooltip>
    </div>
  );
}
