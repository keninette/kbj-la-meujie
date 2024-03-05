'use client';

import React, { useEffect, useState } from 'react';
import { getChapterRoute } from '@/app/routes';
import Header from '@/components/header/Header';
// @ts-ignore
import { Adventure } from '@/model/Adventure.class';
import LoginForm from '@/components/forms/LoginForm';
import { isUserLoggedIn, logInUser, logOutUser } from '@/security/login';

export default function Adventure({ params }: { params: { adventureSlug: string } }) {
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const [adventure, setAdventure] = useState<Adventure>();
  useEffect(() => {
    (async function () {
      const response = await fetch(`/api?adventureSlug=${params.adventureSlug}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const adventure: Adventure = await response.json();
      setAdventure(adventure);
    })();
  }, [params.adventureSlug]);

  return (
    <main className='flex min-h-screen flex-col text-white'>
      <Header></Header>
      <section className='flex flex-col w-full'>
        {!isLoggedIn && <LoginForm loginCallback={setIsLoggedIn} />}
        {isLoggedIn && adventure && (
          <>
            <h2 className='flex justify-center w-full text-3xl m-4'>{adventure.name}</h2>
            <div className='flex mt-10 mx-6'>
              <div className='flex flex-col w-1/3 mx-6'>
                <h3 className='text-2xl mb-4'>📦 Matériel</h3>
                <ul className='ml-2'>
                  {adventure.equipment &&
                    adventure.equipment.map((item) => (
                      <div key={item.name}>
                        <input type='checkbox' key={item.name} className='mr-2' />
                        <label>{item.name}</label>
                      </div>
                    ))}
                </ul>
              </div>
              <div className='flex flex-col w-1/3 mx-6'>
                <h3 className='text-2xl mb-4'>🚦 Préparation</h3>
                <ul className='ml-2'>
                  {adventure.todos &&
                    adventure.todos.map((todo) => (
                      <div key={todo.name}>
                        <input type='checkbox' key={todo.name} className='mr-2' />
                        <label>{todo.name}</label>
                      </div>
                    ))}
                </ul>
              </div>
              {adventure.storyArcs !== undefined && adventure.storyArcs.length > 0 && (
                <div className='flex flex-col w-1/3 mx-6'>
                  <h3 className='text-2xl mb-4'>📚 Arcs</h3>
                  <ul className='ml-2'>
                    {adventure.storyArcs.map((arc) => {
                      return (
                        <li key={arc.storyArcSlug}>
                          {arc.name}
                          <ul>
                            {arc.chapters &&
                              arc.chapters.map((chapter) => {
                                return (
                                  <li className='ml-4' key={chapter.id}>
                                    {chapter.steps ? (
                                      <a href={getChapterRoute(chapter, params.adventureSlug).path} className='text-lg'>
                                        {chapter.name}
                                      </a>
                                    ) : (
                                      <span className='text-lg'>{chapter.name}</span>
                                    )}
                                  </li>
                                );
                              })}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
