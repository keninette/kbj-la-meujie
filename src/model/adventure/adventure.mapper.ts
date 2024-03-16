import { Adventure } from '@/model/Adventure.class';
import { AdventureCardDto } from '@/model/adventure/dtos/adventure-card.dto';
import { UniverseEnum } from '@/model/universe.enum';
import { getAdventureRoute } from '@/app/routes';

export class AdventureMapper {
  mapToAdventureCarDto = (adventure: Adventure): AdventureCardDto => {
    return {
      adventureSlug: adventure.adventureSlug,
      name: adventure.name,
      universe: adventure.universe as UniverseEnum,
      players: adventure.players,
      editLink: getAdventureRoute(adventure).path,
      readLink: getAdventureRoute(adventure).path,
    };
  };
}
