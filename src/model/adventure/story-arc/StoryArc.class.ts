import { v4 } from 'uuid';
import { Step } from '@/model/adventure/story-arc/chapter/step/Step.class';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';
import { Place } from '@/model/Place.class';
import { Chapter } from '@/model/adventure/story-arc/chapter/Chapter.class';

export class StoryArc {
  // public id so they don't get spoiled on players page
  storyArcUuid: string;
  storyArcSlug: string;
  name: string;
  chapters: Chapter[];

  constructor() {
    this.storyArcUuid = v4();
    this.storyArcSlug = '';
    this.name = '';
    this.chapters = [];
  }

  static createFromObject(storyArc: StoryArc): StoryArc {
    let instance = new this();

    instance.storyArcUuid = storyArc.storyArcUuid;
    instance.storyArcSlug = storyArc.storyArcSlug;
    instance.name = storyArc.name;
    instance.chapters = storyArc.chapters;

    return instance;
  }

  fetchAllNonPlayerCharacters(): NonPlayerCharacter[] {
    let npcs: NonPlayerCharacter[] = [];
    // todo find a more elegant way to do it but I wanted it to work real fast
    this.chapters.forEach((chapter: Chapter) => {
      chapter.steps.forEach((step: Step) => {
        npcs = [...npcs, ...(step.nonPlayerCharacters || [])];
      });
    });

    // Make it unique
    // todo fix this
    return [...new Map(npcs.map((npc) => [npc.id, npc])).values()];
  }
  fetchAllPlaces(): Place[] {
    let places: Place[] = [];

    // todo find a more elegant way to do it but I wanted it to work real fast
    this.chapters.forEach((chapter: Chapter) => {
      chapter.steps.forEach((step: Step) => {
        if (step.place && !places.find((place) => place.id === step.place?.id)) {
          places.push(step.place);
        }
      });
    });

    // Make it unique
    return places;
  }
}
