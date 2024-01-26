import { Chapter } from '@/model/Chapter.class';

export class StoryArc {
  slug: string;
  name: string;
  chapters: Chapter[];

  constructor() {
    this.slug = '';
    this.name = '';
    this.chapters = [];
  }
}
