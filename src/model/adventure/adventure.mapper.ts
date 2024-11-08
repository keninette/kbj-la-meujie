import { Adventure } from '@/model/AdventureManager.class';
import { AdventureCardDto } from '@/model/adventure/dtos/adventure-card.dto';
import { getAdventureRoute } from '@/app/routes';

export class AdventureMapper {
  mapToAdventureCarDto = (adventure: Adventure): AdventureCardDto => {
    return {
      ...adventure,
      editLink: getAdventureRoute(adventure).path,
      readLink: getAdventureRoute(adventure).path,
    };
  };
}
