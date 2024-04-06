import { UniverseEnum } from '@/model/enums/universe.enum';

export interface AdventureCardDto {
  adventureSlug: string;
  name: string;
  universe: UniverseEnum;
  players?: { min: number; max: number };
  storyArcs: { uuid: string; name: string }[];
  editLink: string;
  readLink: string;
}
