import { Player } from '@/model/session/player.class';
import { Adventure } from '@/model/Adventure.class';
import { Place } from '@/model/Place.class';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';
import { v4 } from 'uuid';
import { StoryArc } from '@/model/adventure/story-arc/StoryArc.class';

export class Session {
  uuid: string;
  name: string;
  players: Player[];
  adventure: Partial<Adventure>;
  currentStoryArc: StoryArc;
  knownPlaces: Place[];
  knownNonPlayerCharacters: NonPlayerCharacter[];

  constructor(adventure: Partial<Adventure>, players: Player[], currentStoryArc: StoryArc) {
    this.uuid = v4();
    this.name = '';
    this.players = players;
    this.adventure = adventure;
    this.currentStoryArc = currentStoryArc;
    this.knownPlaces = [];
    this.knownNonPlayerCharacters = [];
  }
}
