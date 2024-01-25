import { getAdventureRoute, getEditAdventureRoute } from '@/app/routes';
import { UniverseEnum } from '@/model/universe.enum';
import Image from 'next/image';
import { Adventure } from '@/model/Adventure.class';

const headerMappings = {
  [UniverseEnum.CHTULHU]: '/assets/img/headers/chtulhu.png',
};

type AdventureCardPropsType = {
  adventure: Adventure;
};

export default function AdventureCard({ adventure }: AdventureCardPropsType) {
  return (
    <>
      <div className='relative flex w-[300px] h-[300px] mt-8 bg-black bg-opacity-30 border-gradient border-gradient--red--to-right  p-2'>
        <a className='ml-2  no-underline' href={getEditAdventureRoute(adventure).path}>
          🖊
        </a>
        <div className='flex flex-col justify-between items-center'>
          <span className='flex self-end text-sm'>{`De ${adventure.players?.min} à ${adventure.players?.max} joueurs`}</span>
          {adventure.universe && (
            <a href={getAdventureRoute(adventure).path}>
              <Image
                src={headerMappings[adventure.universe]}
                width={250}
                height={250}
                alt={adventure.universe}
                className='flex'
              />
            </a>
          )}
          <p className=''>{adventure.name}</p>
        </div>
      </div>
    </>
  );
}
