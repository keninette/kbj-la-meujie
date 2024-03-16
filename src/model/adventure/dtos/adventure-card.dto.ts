import { UniverseEnum } from '@/model/universe.enum';

export interface AdventureCardDto {
  adventureSlug: string;
  name: string;
  universe: UniverseEnum;
  players?: { min: number; max: number };
  editLink: string;
  readLink: string;
}
