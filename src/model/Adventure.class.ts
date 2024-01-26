import { StoryArc } from '@/model/StoryArc.class';
import { UniverseEnum } from '@/model/universe.enum';
import { Chapter } from '@/model/Chapter.class';
import { Step } from '@/model/Step.class';
import { Audio } from '@/model/Audio.class';

export class Adventure {
  slug: string;
  prefix: string;
  name: string;
  universe?: UniverseEnum;
  players?: { min: number; max: number };
  storyArcs: StoryArc[];
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
    instance.storyArcs = data.storyArcs;

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

  computeNextChapterId(increment: number = 0) {
    const supposedNextId = `${this.prefix}-${(this.chapters?.length || 0) + increment}`;
    const existingChaptersWithId = this.chapters.filter((chapter) => chapter.id === supposedNextId);
    if (existingChaptersWithId.length) {
      this.computeNextChapterId(increment++);
    }
    return supposedNextId;
  }

  saveStoryArc(storyArc: StoryArc) {
    const existingStoryArcIndex = this.storyArcs?.findIndex((thisStoryArc) => thisStoryArc.slug === storyArc.slug);
    if (existingStoryArcIndex && existingStoryArcIndex > -1) {
      this.storyArcs[existingStoryArcIndex] = storyArc;
    } else {
      this.storyArcs.push(storyArc);
    }
  }

  saveChapter(storyArc: StoryArc, chapter: Chapter) {
    const existingStoryArcIndex = this.storyArcs?.findIndex((thisStoryArc) => thisStoryArc.slug === storyArc.slug);
    if (existingStoryArcIndex === undefined || existingStoryArcIndex === -1) {
      console.error('Arc non trouvé');
      return;
    }
    const existingChapterIndex = this.storyArcs[existingStoryArcIndex].chapters.findIndex(
      (thisChapter) => thisChapter.id === chapter.id,
    );
    if (existingChapterIndex > -1) {
      this.storyArcs[existingStoryArcIndex].chapters[existingChapterIndex] = chapter;
    } else {
      chapter.id = this.computeNextChapterId();
      this.storyArcs[existingStoryArcIndex].chapters.push(chapter);
    }
  }

  saveStep(chapter: Chapter, step: Step): Step | null {
    const chapterIndex = this.findChapterIndexById(chapter.id);
    if (chapterIndex === -1) {
      return null;
    }

    const stepIndex = chapter.steps.findIndex((thisStep) => thisStep.id === step.id);
    if (stepIndex === -1) {
      step.id = this.computeNextStepId(chapter);
      this.chapters[chapterIndex].steps.push(step);
    } else {
      this.chapters[chapterIndex].steps[stepIndex] = step;
    }

    return step;
  }

  computeNextStepId(targetChapter: Chapter, increment: number = 0) {
    const supposedNextId = `${targetChapter.id}-${(targetChapter.steps?.length || 0) + increment}`;
    const existingStepsWithId = targetChapter.steps?.filter((step) => step.id === supposedNextId);
    if (existingStepsWithId.length) {
      this.computeNextStepId(targetChapter, increment++);
    }
    return supposedNextId;
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
