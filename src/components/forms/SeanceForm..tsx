import { Seance } from '@/model/session/seance.class';
import { Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Adventure } from '@/model/AdventureManager.class';
import { getAdventure } from '@/app/data-provider';
import { FeedbackBannerProps, FeedbackTypeEnum } from '@/components/feedback/FeedbackBanner';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';
import { StoryArc } from '@/model/adventure/story-arc/StoryArc.class';
import { Place } from '@/model/Place.class';

export type SeanceFormProps = {
  adventure: Adventure;
  storyArc?: StoryArc;
  requestedSeance?: Seance;
  onSubmitCallback: (seance: Seance) => void;
  setFeedback: Dispatch<SetStateAction<FeedbackBannerProps | undefined>>;
};

// todo si séance existe déjà pour l'arc choisi, proposer de la charger
export default function SeanceForm({
  adventure,
  storyArc,
  requestedSeance,
  onSubmitCallback,
  setFeedback,
}: SeanceFormProps) {
  const [seance, setSeance] = useState<Seance>();
  const [npcs, setNpcs] = useState<NonPlayerCharacter[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);

  console.log(adventure, storyArc);

  const loadSeance = useCallback(() => {
    async () => {
      if (!adventure) {
        return;
      }

      if (!storyArc) {
        const mostRecentStoryArc = adventure.storyArcs[adventure.storyArcs.length - 1];
        console.log('storyArc', mostRecentStoryArc);
        setSeance(new Seance(mostRecentStoryArc));
      } else {
        const newSeance = new Seance(requestedSeance?.storyArc || storyArc);
        setSeance({ ...newSeance, ...requestedSeance });
      }
    };
  }, [adventure]);

  /*
  useEffect(() => {
    setNpcs(seance?.storyArc.fetchAllNonPlayerCharacters() || []);
    setPlaces(seance?.storyArc.fetchAllPlaces() || []);
  }, [seance?.storyArc]);*/

  console.log(seance, seance?.knownPlaces, seance?.knownPlaces.map((place) => place.id.toString()));

  const onChange = (fieldName: string, value: string) => {
    let customValue: any;
    if (!seance) {
      return;
    }

    switch (fieldName) {
      case 'storyArc':
        const selectedStoryArc = adventure?.storyArcs.find((thisStoryArc) => thisStoryArc.storyArcUuid === value);
        if (!selectedStoryArc) {
          console.error(`Arc non trouvé ${value}`);
          return;
        }
        customValue = StoryArc.createFromObject(selectedStoryArc);
        break;
      case 'knownNonPlayerCharacters':
        const selectedNPC = npcs.find((npc) => npc.id === +value);
        if (!selectedNPC) {
          console.error(`NPC non trouvé ${value}`);
          return;
        }
        customValue = [...seance.knownNonPlayerCharacters, selectedNPC];
        break;
      case 'knownPlaces':
        const selectedPlace = places.find((place) => place.id === +value);
        if (!selectedPlace) {
          console.error(`Lieu non trouvé ${value}`);
          return;
        }
        customValue = [...seance.knownPlaces, selectedPlace];
        break;
      default:
        customValue = value;
        break;
    }

    setSeance((prevState) => ({ ...prevState, [fieldName]: customValue }) as Seance);
  };

  const onSubmit = async (e: FormEvent) => {
    if (!seance) {
      return;
    }
    e.preventDefault();
    onSubmitCallback(seance);
  };

  useEffect(() => {
    loadSeance();
  }, [adventure]);

  return (
    <div className='flex flex-col w-full'>
      <h3 className='flex justify-center text-lg underline mt-4 font-bold'>🍿 Éditer une séance</h3>
      <form onSubmit={onSubmit} className='flex flex-col'>
        <div className='mt-4 flex flex-col'>
          <label htmlFor='storyArc'>Arc courant</label>
          <select
            className='text-black'
            name='storyArc'
            id='storyArc'
            value={seance?.storyArc.storyArcUuid}
            onChange={(e) => onChange('storyArc', e.target.value)}
          >
            {adventure?.storyArcs.map((storyArc) => (
              <option key={storyArc.storyArcUuid} value={storyArc.storyArcUuid}>
                {storyArc.name}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-4 flex'>
          <div className='w-1/2'>
            <p>👨‍👦‍👦 {seance?.knownNonPlayerCharacters.length} PNJs connus</p>
          </div>
          <div className='w-1/2'>
            <label htmlFor='storyArc'>👨‍👦‍👦 Ajouter un PNJ</label>
            <select
              className='text-black'
              name='knownNonPlayerCharacters'
              id='knownNonPlayerCharacters'
              multiple
              //value={seance?.knownNonPlayerCharacters.map((npc) => npc.id.toString())}
              onChange={(e) => onChange('knownNonPlayerCharacters', e.target.value)}
            >
              <option value=''>-</option>
              {npcs.map((npc) => (
                <option key={npc.id} value={npc.id}>
                  {npc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='mt-4 flex'>
          <div className='w-1/2'>
            <p>📍{seance?.knownPlaces.length} lieus connus</p>
          </div>
          <div className='w-1/2'>
            <label htmlFor='storyArc'>📍 Ajouter un lieu</label>
            <select
              className='text-black'
              name='knownPlaces'
              id='knownPlaces'
              value={seance?.knownPlaces.map((place) => place.id.toString())}
              onChange={(e) => onChange('knownPlaces', e.target.value)}
              multiple
            >
              <option value=''>-</option>
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='mt-4 flex flex-col'>
          <label htmlFor='storyArc'>Notes</label>
          <textarea
            className='text-black h-[400px]'
            name='notes'
            id='notes'
            placeholder='Notes'
            onChange={(e) => onChange('notes', e.target.value)}
            value={seance?.notes || ''}
          ></textarea>
        </div>
        <button type='submit'>Ajouter</button>
      </form>
    </div>
  );
}
