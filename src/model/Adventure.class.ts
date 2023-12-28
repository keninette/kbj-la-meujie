import { StoryArc } from '@/model/StoryArc.class';
import { UniverseEnum } from '@/model/universe.enum';
import { Chapter } from '@/model/Chapter.class';

export class Adventure {
  slug: string;
  prefix: string;
  name: string;
  universe?: UniverseEnum;
  players?: { min: number; max: number };
  storyArcs?: StoryArc[];
  chapters?: Chapter[];
  // todo classes
  equipment?: { name: string; isReady: boolean }[];
  todos?: { name: string; isReady: boolean }[];

  constructor(json: string) {
    this.slug = '';
    this.name = '';
    this.prefix = '';
    this.chapters = [];

    Object.assign(this, JSON.parse(json));
    // @ts-ignore
    this.storyArcs = (this.chapters || [])
      .filter((chapter) => chapter.storyArc !== undefined)
      .map((chapter) => chapter.storyArc);
  }

  static getAdventureCardDto = (json: string) => {
    const instance = new this(json);

    return {
      slug: instance.slug,
      name: instance.name,
      universe: instance.universe,
      players: instance.players,
    };
  };
}
