import { Place } from '@/model/Place.class';
import { Tooltip } from 'react-tooltip';
import React from 'react';

type PlaceBlockProps = {
  place: Place;
};
export default function PlaceBlock({ place }: PlaceBlockProps) {
  return (
    <div>
      <p data-tooltip-id={`place_${place.id}`}>🗺 {place.name}</p>
      <Tooltip id={`place_${place.id}`} openOnClick={true} opacity={0.95}>
        <div className='flex border-solid border-2 border-gradient border-gradient--red--to-right p-4'>
          {place.picture && (
            <img className='w-48' src={`../../../assets/img/adventures/${place.picture.filename}`} alt='Photo' />
          )}
          <div className='flex flex-col px-4'>
            <p className='bold'>{place.name}</p>
            <p>{place.publicDescription}</p>
            {place.privateDescription && <p className='mt-2 italic opacity-80'>{place.privateDescription}</p>}
          </div>
        </div>
      </Tooltip>
    </div>
  );
}
