import { Chapter } from '@/model/Chapter.class';
import { v4 } from 'uuid';

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
}
