import {getAdventureRoute} from "@/app/routes";
import {UniverseEnum} from "@/model/universe.enum";

const headerMappings = {
  [UniverseEnum.CHTULHU]: '/assets/img/headers/chtulhu.png',
}

export default function AdventureCard({adventure}) {
  return (
    <>
      <a href={getAdventureRoute(adventure).path} className="relative flex flex-col w-[300px] h-[300px] mt-8 bg-black bg-opacity-30 border-gradient border-gradient--red--to-right justify-between items-center p-2">
        <span className="flex self-end text-sm">{`De ${adventure.players.min} à ${adventure.players.max} joueurs`}</span>
        <img src={headerMappings[adventure.universe]} alt={adventure.universe} className="flex w-[250px]" />
        <p className="">{adventure.name}</p>
      </a>
    </>
  );
};