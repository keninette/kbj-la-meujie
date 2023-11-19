import { getAdventureRoute } from '@/app/routes';
import { UniverseEnum } from '@/model/universe.enum';
import Image from 'next/image';
import { AdventureType } from '@/model/adventure.type';

const headerMappings = {
  [UniverseEnum.CHTULHU]: '/assets/img/headers/chtulhu.png',
};

type AdventureCardPropsType = {
  adventure: AdventureType;
};

export default function AdventureCard({ adventure }: AdventureCardPropsType) {
  return (
    <>
      <a
        href={getAdventureRoute(adventure).path}
        className='relative flex flex-col w-[300px] h-[300px] mt-8 bg-black bg-opacity-30 border-gradient border-gradient--red--to-right justify-between items-center p-2'
      >
        <span className='flex self-end text-sm'>{`De ${adventure.players.min} à ${adventure.players.max} joueurs`}</span>
        <Image
          src={headerMappings[adventure.universe]}
          width={250}
          height={250}
          alt={adventure.universe}
          className='flex'
        />
        <p className=''>{adventure.name}</p>
      </a>
    </>
  );
}
