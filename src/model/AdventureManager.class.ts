import { UniverseEnum } from '@/model/enums/universe.enum';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';
import { Place } from '@/model/Place.class';
import { StoryArc } from '@/model/adventure/story-arc/StoryArc.class';
import { Chapter } from '@/model/adventure/story-arc/chapter/Chapter.class';
import { Step } from '@/model/adventure/story-arc/chapter/step/Step.class';

export type Adventure = {
  adventureUuid: string;
  adventureSlug: string;
  prefix: string;
  name: string;
  universe?: UniverseEnum;
  players?: { min: number; max: number };
  storyArcs: StoryArc[];
  // todo classes + in mapper
  equipment?: { name: string; isReady: boolean }[];
  todos?: { name: string; isReady: boolean }[];
  nonPlayerCharacters: NonPlayerCharacter[];
  places: Place[];
};

export class AdventureManager {
  adventure: Adventure;

  constructor(adventure: Adventure) {
    this.adventure = adventure;
  }

  computeNextChapterId(storyArc: StoryArc, increment: number = 0) {
    // todo fix that, but it will do for now
    const storyArcIndex = this.adventure.storyArcs.findIndex(
      (thisStoryArc) => thisStoryArc.storyArcSlug === storyArc.storyArcSlug,
    );
    const supposedNextId = `${this.adventure.prefix}-${storyArcIndex}-${(storyArc.chapters?.length || 0) + increment}`;
    const existingChaptersWithId = storyArc.chapters.filter((chapter) => chapter.id === supposedNextId);
    if (existingChaptersWithId.length) {
      this.computeNextChapterId(storyArc, increment++);
    }
    return supposedNextId;
  }

  saveStoryArc(storyArc: StoryArc): Adventure {
    const existingStoryArcIndex = this.adventure.storyArcs?.findIndex(
      (thisStoryArc) => thisStoryArc.storyArcSlug === storyArc.storyArcSlug,
    );
    if (existingStoryArcIndex && existingStoryArcIndex > -1) {
      this.adventure.storyArcs[existingStoryArcIndex] = storyArc;
    } else {
      this.adventure.storyArcs.push(storyArc);
    }

    return this.adventure;
  }

  saveChapter(storyArc: StoryArc, chapter: Chapter): Adventure {
    const existingStoryArcIndex = this.adventure.storyArcs?.findIndex(
      (thisStoryArc) => thisStoryArc.storyArcSlug === storyArc.storyArcSlug,
    );
    if (existingStoryArcIndex === undefined || existingStoryArcIndex === -1) {
      console.error('Arc non trouvé');
      return this.adventure;
    }
    const existingChapterIndex = this.adventure.storyArcs[existingStoryArcIndex].chapters.findIndex(
      (thisChapter) => thisChapter.id === chapter.id,
    );
    if (existingChapterIndex > -1) {
      this.adventure.storyArcs[existingStoryArcIndex].chapters[existingChapterIndex] = chapter;
    } else {
      chapter.id = this.computeNextChapterId(storyArc);
      this.adventure.storyArcs[existingStoryArcIndex].chapters.push(chapter);
    }

    return this.adventure;
  }

  saveStep(storyArc: StoryArc, chapter: Chapter, step: Step): Adventure {
    const existingStoryArcIndex = this.adventure.storyArcs?.findIndex(
      (thisStoryArc) => thisStoryArc.storyArcSlug === storyArc.storyArcSlug,
    );
    if (existingStoryArcIndex === undefined || existingStoryArcIndex === -1) {
      console.error('Arc non trouvé');
      return this.adventure;
    }
    const chapterIndex = this.findChapterIndexById(storyArc, chapter.id);
    if (chapterIndex === -1) {
      return this.adventure;
    }

    const stepIndex = chapter.steps.findIndex((thisStep) => thisStep.id === step.id);
    if (stepIndex === -1) {
      step.id = this.computeNextStepId(chapter);
      this.adventure.storyArcs[existingStoryArcIndex].chapters[chapterIndex].steps.push(step);
    } else {
      this.adventure.storyArcs[existingStoryArcIndex].chapters[chapterIndex].steps[stepIndex] = step;
    }

    this.fetchAllNonPlayerCharacters();
    this.fetchAllPlaces();

    return this.adventure;
  }

  computeNextStepId(targetChapter: Chapter, increment: number = 0) {
    const supposedNextId = `${targetChapter.id}-${(targetChapter.steps?.length || 0) + increment}`;
    const existingStepsWithId = targetChapter.steps?.filter((step) => step.id === supposedNextId);
    if (existingStepsWithId.length) {
      this.computeNextStepId(targetChapter, increment++);
    }
    return supposedNextId;
  }

  findChapterById(storyArc: StoryArc, id: string) {
    const chapterIndex = this.findChapterIndexById(storyArc, id);
    if (chapterIndex > -1) {
      return storyArc.chapters[chapterIndex];
    }
    return undefined;
  }

  findChapterIndexById(storyArc: StoryArc, id: string) {
    return storyArc.chapters.findIndex((chapter) => chapter.id === id);
  }

  fetchAllNonPlayerCharacters() {
    // todo find a more elegant way to do it but I wanted it to work real fast
    this.adventure.storyArcs.forEach((storyArc: StoryArc) => {
      storyArc.chapters.forEach((chapter: Chapter) => {
        chapter.steps.forEach((step: Step) => {
          this.adventure.nonPlayerCharacters = [
            ...this.adventure.nonPlayerCharacters,
            ...(step.nonPlayerCharacters || []).filter((npc: NonPlayerCharacter) => !npc.isStepBound),
          ];
        });
      });
    });

    // Make it unique
    this.adventure.nonPlayerCharacters = [
      ...new Map(this.adventure.nonPlayerCharacters.map((npc) => [npc.id, npc])).values(),
    ];
  }
  fetchAllPlaces() {
    // todo find a more elegant way to do it but I wanted it to work real fast
    this.adventure.storyArcs.forEach((storyArc: StoryArc) => {
      storyArc.chapters.forEach((chapter: Chapter) => {
        chapter.steps.forEach((step: Step) => {
          if (
            step.place &&
            step.place.isStepBound &&
            !this.adventure.places.find((place) => place.id === step.place?.id)
          ) {
            this.adventure.places.push(step.place);
          }
        });
      });
    });
  }
}
