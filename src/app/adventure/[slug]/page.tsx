'use client';

import React, { useEffect, useState } from 'react';
import { getChapterRoute } from '@/app/routes';
import Header from '@/components/header/Header';
import { AdventureType } from '@/model/adventure.type';

export default function Adventure({ params }: { params: { slug: string } }) {
  const [adventure, setAdventure] = useState<AdventureType>();

  useEffect(() => {
    (async function () {
      const response = await fetch(`http://localhost:3000/adventure/api?slug=${params.slug}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setAdventure(data.adventure);
    })();
  }, [params.slug]);

  return (
    <main className='flex min-h-screen flex-col text-white'>
      <Header></Header>
      <section className='flex flex-col w-full'>
        {adventure && (
          <>
            <h2 className='flex justify-center w-full text-3xl m-4'>{adventure.name}</h2>
            <div className='flex mt-10 mx-6'>
              <div className='flex flex-col w-1/3 mx-6'>
                <h3 className='text-2xl mb-4'>📦 Matériel</h3>
                <ul className='ml-2'>
                  {adventure.stuff &&
                    adventure.stuff.map((item) => (
                      <div key={item}>
                        <input type='checkbox' key={item} className='mr-2' />
                        <label>{item}</label>
                      </div>
                    ))}
                </ul>
              </div>
              <div className='flex flex-col w-1/3 mx-6'>
                <h3 className='text-2xl mb-4'>🚦 Préparation</h3>
                <ul className='ml-2'>
                  {adventure.preparation &&
                    adventure.preparation.map((item) => (
                      <div key={item}>
                        <input type='checkbox' key={item} className='mr-2' />
                        <label>{item}</label>
                      </div>
                    ))}
                </ul>
              </div>
              <div className='flex flex-col w-1/3 mx-6'>
                <h3 className='text-2xl mb-4'>📚 Chapitres</h3>
                <ul className='ml-2'>
                  {adventure.chapters.map((chapter) => {
                    return (
                      <li key={chapter.id}>
                        {chapter.steps ? (
                          <a href={getChapterRoute(chapter).path} className='text-lg'>
                            {chapter.name}
                          </a>
                        ) : (
                          <span className='text-lg'>{chapter.name}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}