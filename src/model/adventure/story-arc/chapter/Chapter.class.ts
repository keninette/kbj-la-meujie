import { Light } from '@/model/Light.class';
import { StoryArc } from '@/model/adventure/story-arc/StoryArc.class';
import { Step } from '@/model/adventure/story-arc/chapter/step/Step.class';

export class Chapter {
  id: string;
  name: string;
  storyArc?: StoryArc;
  nextChapterId?: string;
  description?: string;
  clues?: string[];
  sounds?: string[];
  lights?: Light[];
  steps: Step[];

  constructor(id: string, name: string, steps: Step[]) {
    this.id = id;
    this.name = name;
    this.steps = steps;
  }

  static getEmptyChapter = () => {
    return new this('', '', []);
  };
}
