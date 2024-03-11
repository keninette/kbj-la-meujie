import { Place } from '@/model/Place.class';
import { FormEvent, useState } from 'react';
import { Image } from '@/model/Image.class';

type PlaceFormProps = {
  onSubmitCallback: (place: Place) => void;
  adventurePlaces?: Place[];
  requestedPlace?: Place;
};

export default function PlaceForm({ onSubmitCallback, adventurePlaces }: PlaceFormProps) {
  const [place, setPlace] = useState<Place>(new Place());
  const [isAdventurePlace, setIsAdventurePlace] = useState(false);

  const onFormChange = (fieldName: string, value: string | boolean | number | Image) => {
    switch (fieldName) {
      case 'picture':
        setPlace((prevState) => {
          return {
            ...prevState,
            picture: { ...prevState.picture, filename: value as string },
          };
        });
        break;
      case 'existingPlace':
        const selectedPlace = adventurePlaces?.find((adventureAdventure) => {
          return adventureAdventure.id === +value;
        });
        if (!selectedPlace) {
          console.error('Adventure place not found');
        } else {
          setPlace(selectedPlace);
          setIsAdventurePlace(true);
        }
        break;
      default:
        setPlace((prevState) => {
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
    onSubmitCallback(place);
  };

  return (
    <form className='flex w-full mx-4' onSubmit={onSubmit}>
      <div className='flex flex-col h-full w-full'>
        <h4 className='flex justify-center my-4'>Ajouter un lieu</h4>
        <h5 className='flex justify-center my-2'>Ajouter un lieu existant</h5>
        <select className='text-black' onChange={(e) => onFormChange('existingPlace', e.target.value)}>
          <option value=''>-</option>
          {adventurePlaces?.map((thisPlace) => {
            return (
              <option key={thisPlace.id} value={thisPlace.id}>
                {thisPlace.name}
              </option>
            );
          })}
        </select>
        <h5 className='flex justify-center my-2'>Créer un nouveau lieu</h5>
        <input type='text' name='id' value={place.id} className='flex text-black my-2' disabled={true} />
        <input
          type='text'
          name='name'
          placeholder='Nom'
          value={place.name}
          onChange={(e) => onFormChange('name', e.target.value)}
          className='flex text-black my-2'
          disabled={isAdventurePlace}
          required
        />
        <input
          type='text'
          name='pinId'
          placeholder='Point sur la carte'
          value={place.pinId}
          onChange={(e) => onFormChange('pinId', e.target.value)}
          className='flex text-black my-2'
          disabled={isAdventurePlace}
        />
        <textarea
          name='publicDescription'
          placeholder='Description publique'
          value={place.publicDescription}
          onChange={(e) => onFormChange('publicDescription', e.target.value)}
          className='flex text-black my-2'
          disabled={isAdventurePlace}
        />
        <textarea
          name='privateDescription'
          placeholder='Description privée'
          value={place.privateDescription}
          onChange={(e) => onFormChange('privateDescription', e.target.value)}
          className='flex text-black my-2'
          disabled={isAdventurePlace}
        />
        <div>
          <label htmlFor='isStepBound'>Disponible dans toute l&apos;aventure</label>
          <input
            type='checkbox'
            name='isStepBound'
            checked={!place.isStepBound}
            onChange={(e) => onFormChange('isStepBound', !e.target.checked)}
            disabled={isAdventurePlace}
          />
        </div>
        <input
          type='text'
          name='filename'
          placeholder='Nom du fichier'
          value={place.picture.filename}
          onChange={(e) => onFormChange('picture', e.target.value)}
          className='flex text-black'
          required
          disabled={isAdventurePlace}
        />
        <button className='mt-2 mb-4' type='submit'>
          Ajouter
        </button>
      </div>
    </form>
  );
}
