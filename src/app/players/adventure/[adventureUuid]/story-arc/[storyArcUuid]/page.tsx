import Header from '@/components/header/Header';
import React from 'react';

type PlayersStoryArcProps = {
  params: {
    AdventureUuid: string;
    storyArcUuid: string;
  };
};

export default function PlayersStoryArc({ params }: PlayersStoryArcProps) {
  return (
    <main className='flex min-h-screen flex-col text-white'>
      <Header></Header>
      <section className='flex flex-col w-full'>coucou</section>
    </main>
  );
}
