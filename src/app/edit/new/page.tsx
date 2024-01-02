'use client';

import Header from '@/components/header/Header';
import { FormEvent, useState } from 'react';
import { Adventure } from '@/model/Adventure.class';
import { UniverseEnum } from '@/model/universe.enum';
import { saveAdventure } from '@/app/data-provider';

export default function NewAdventure() {
  const [adventure, setAdventure] = useState<Adventure>(new Adventure(''));
  const universeTranslationsMapping = {
    [UniverseEnum.CHTULHU]: '🐙 Chtulhu',
  };
  const handleChange = (fieldName: string, value: string) => {
    const updatedAdventure: Adventure = { ...adventure };
    if (fieldName === 'players.min') {
      updatedAdventure.players = updatedAdventure.players || { min: 0, max: 0 };
      updatedAdventure.players.min = +value;
    } else if (fieldName === 'players.max') {
      updatedAdventure.players = updatedAdventure.players || { min: 0, max: 0 };
      updatedAdventure.players.max = +value;
    } else {
      updatedAdventure[fieldName] = value;
    }

    setAdventure(updatedAdventure);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await saveAdventure(adventure, true);
    if (response.status === 201) {
      location.href = `/edit/${adventure.slug}`;
    }
  };

  return (
    <main className='flex min-h-screen flex-col text-white'>
      <Header></Header>
      <form className='flex flex-col w-1/2 self-center' onSubmit={(e) => handleSubmit(e)}>
        <div className='flex flex-col w-full'>
          <label htmlFor='name' className='text-white'>
            Nom
          </label>
          <input
            type='text'
            name='name'
            placeholder='Nom'
            value={adventure.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className='flex text-black w-full'
            required
          />
        </div>
        <div className='flex flex-col w-full mt-2'>
          <label htmlFor='slug' className='text-white'>
            Slug
          </label>
          <input
            type='text'
            name='slug'
            placeholder='Slug'
            value={adventure.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            className='flex text-black w-full'
            required
          />
        </div>
        <div className='flex flex-col w-full mt-2'>
          <label htmlFor='slug' className='text-white'>
            Préfixe
          </label>
          <input
            type='text'
            name='prefix'
            placeholder='Préfixe'
            value={adventure.prefix}
            onChange={(e) => handleChange('prefix', e.target.value)}
            className='flex text-black w-full'
            required
          />
        </div>
        <div className='flex flex-col w-full mt-2'>
          <label htmlFor='slug' className='text-white'>
            Univers
          </label>
          <select
            className='flex text-black w-full h-6'
            onChange={(e) => {
              handleChange('universe', e.target.value);
            }}
          >
            <option>-</option>
            {Object.values(UniverseEnum).map((universe) => (
              <option key={universe} value={universe}>
                {universeTranslationsMapping[universe]}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-col w-full mt-2'>
          <label htmlFor='slug' className='text-white'>
            Nombre de joueurs
          </label>
          <div className='flex'>
            <input
              type='number'
              min='0'
              name='players.min'
              placeholder='Minimum'
              value={adventure.players?.min || 0}
              onChange={(e) => handleChange('players.min', e.target.value)}
              className='flex text-black w-1/2 mr-2'
            />
            <input
              type='number'
              min='0'
              name='players.max'
              placeholder='Maximum'
              value={adventure.players?.max || 0}
              onChange={(e) => handleChange('players.max', e.target.value)}
              className='flex text-black w-1/2'
            />
          </div>
        </div>
        <button type='submit' className='mt-6'>
          Enregistrer
        </button>
      </form>
    </main>
  );
}
