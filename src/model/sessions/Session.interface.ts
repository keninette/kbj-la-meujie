import { Adventure } from '@/model/Adventure.class';
import { StoryArc } from '@/model/adventure/story-arc/StoryArc.class';
import { PlayerCharacter } from '@/model/sessions/PlayerCharacter.class';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';

export interface SessionInterface {
  uuid: string;
  slug: string;
  name: string;
  adventureSlug: string;
  storyArcSlug: string;
  playerCharacters: PlayerCharacter[];
  nonPlayerCharacters: NonPlayerCharacter[];
  description?: any;
}
