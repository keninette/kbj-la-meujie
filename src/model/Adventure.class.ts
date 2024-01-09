import { StoryArc } from '@/model/StoryArc.class';
import { UniverseEnum } from '@/model/universe.enum';
import { Chapter } from '@/model/Chapter.class';
import { Step } from '@/model/Step.class';

export class Adventure {
  slug: string;
  prefix: string;
  name: string;
  universe?: UniverseEnum;
  players?: { min: number; max: number };
  storyArcs?: StoryArc[];
  chapters: Chapter[];
  // todo classes
  equipment?: { name: string; isReady: boolean }[];
  todos?: { name: string; isReady: boolean }[];

  constructor() {
    this.slug = '';
    this.prefix = '';
    this.name = '';
    this.chapters = [];
    this.storyArcs = [];
  }

  static createFromJson = (json: string) => {
    const instance = new this();

    const data = JSON.parse(json);
    instance.slug = data.slug;
    instance.prefix = data.prefix;
    instance.name = data.name;
    instance.universe = data.universe;
    instance.players = data.players;
    instance.chapters = data.chapters;
    instance.equipment = data.equipment;
    instance.todos = data.todos;

    // @ts-ignore
    instance.storyArcs = (this.chapters || [])
      .filter((chapter) => chapter.storyArc !== undefined)
      .map((chapter) => chapter.storyArc);

    return instance;
  };

  static getAdventureCardDto = (json: string) => {
    const instance = Adventure.createFromJson(json);

    return {
      slug: instance.slug,
      name: instance.name,
      universe: instance.universe,
      players: instance.players,
    };
  };

  addChapter(chapter: Chapter) {
    const computeNextChapterId = (increment: number = 0) => {
      const supposedNextId = `${this.prefix}-${(this.chapters?.length || 0) + increment}`;
      const existingChaptersWithId = this.chapters.filter((chapter) => chapter.id === supposedNextId);
      if (existingChaptersWithId.length) {
        computeNextChapterId(increment++);
      }
      return supposedNextId;
    };

    this.chapters.push({ ...chapter, id: computeNextChapterId() });
  }

  computeNextStepId(targetChapter: Chapter, increment: number = 0) {
    const supposedNextId = `${targetChapter.id}-${(targetChapter.steps?.length || 0) + increment}`;
    const existingStepsWithId = targetChapter.steps?.filter((step) => step.id === supposedNextId);
    if (existingStepsWithId.length) {
      this.computeNextStepId(targetChapter, increment++);
    }
    return supposedNextId;
  }

  addStep(step: Step, targetChapter: Chapter) {
    const chapterIndex = this.findChapterIndexById(targetChapter.id);
    this.chapters[chapterIndex].steps.push({ ...step, id: this.computeNextStepId(targetChapter) });
  }

  findChapterById(id: string) {
    const chapterIndex = this.findChapterIndexById(id);
    if (chapterIndex > -1) {
      return this.chapters[chapterIndex];
    }
    return undefined;
  }

  findChapterIndexById(id: string) {
    return this.chapters.findIndex((chapter) => chapter.id === id);
  }
}
