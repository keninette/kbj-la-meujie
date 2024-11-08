import { StoryArc } from '@/model/adventure/story-arc/StoryArc.class';
import { Place } from '@/model/Place.class';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';
import { v4 } from 'uuid';

export class Seance {
  uuid: string;
  storyArc: StoryArc;
  knownPlaces: Place[];
  knownNonPlayerCharacters: NonPlayerCharacter[];
  notes?: string;

  constructor(currentStoryArc: StoryArc) {
    this.uuid = v4();
    this.storyArc = StoryArc.createFromObject(currentStoryArc);
    this.knownPlaces = [];
    this.knownNonPlayerCharacters = [];
  }

  static createFromObject(seance: Seance) {
    const instance = new this(seance.storyArc);
    instance.uuid = seance.uuid;
    instance.storyArc = StoryArc.createFromObject(seance.storyArc);
    instance.knownPlaces = seance.knownPlaces || [];
    instance.knownNonPlayerCharacters = seance.knownNonPlayerCharacters || [];
    return instance;
  }
}
