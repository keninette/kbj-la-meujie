import { UniverseEnum } from '@/model/enums/universe.enum';
import { v4 } from 'uuid';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';
import { Place } from '@/model/Place.class';
import { StoryArc } from '@/model/adventure/story-arc/StoryArc.class';
import { Chapter } from '@/model/adventure/story-arc/chapter/Chapter.class';
import { Step } from '@/model/adventure/story-arc/chapter/step/Step.class';

export class Adventure {
  adventureUuid: string;
  adventureSlug: string;
  prefix: string;
  name: string;
  universe?: UniverseEnum;
  players?: { min: number; max: number };
  storyArcs: StoryArc[];
  // todo classes
  equipment?: { name: string; isReady: boolean }[];
  todos?: { name: string; isReady: boolean }[];
  nonPlayerCharacters: NonPlayerCharacter[];
  places: Place[];

  constructor() {
    this.adventureUuid = v4();
    this.adventureSlug = '';
    this.prefix = '';
    this.name = '';
    this.storyArcs = [];
    this.nonPlayerCharacters = [];
    this.places = [];
  }

  static createFromJson = (json: string) => {
    const instance = new this();

    const data = JSON.parse(json);
    instance.adventureSlug = data.adventureSlug;
    instance.prefix = data.prefix;
    instance.name = data.name;
    instance.universe = data.universe;
    instance.players = data.players;
    instance.equipment = data.equipment;
    instance.todos = data.todos;
    instance.storyArcs = data.storyArcs;

    Adventure.fetchAllNonPlayerCharacters(instance);
    Adventure.fetchAllPlaces(instance);

    return instance;
  };

  static getAdventureCardDto = (json: string) => {
    const instance = Adventure.createFromJson(json);

    return {
      adventureSlug: instance.adventureSlug,
      name: instance.name,
      universe: instance.universe,
      players: instance.players,
    };
  };

  computeNextChapterId(storyArc: StoryArc, increment: number = 0) {
    // todo fix that, but it will do for now
    const storyArcIndex = this.storyArcs.findIndex(
      (thisStoryArc) => thisStoryArc.storyArcSlug === storyArc.storyArcSlug,
    );
    const supposedNextId = `${this.prefix}-${storyArcIndex}-${(storyArc.chapters?.length || 0) + increment}`;
    const existingChaptersWithId = storyArc.chapters.filter((chapter) => chapter.id === supposedNextId);
    if (existingChaptersWithId.length) {
      this.computeNextChapterId(storyArc, increment++);
    }
    return supposedNextId;
  }

  saveStoryArc(storyArc: StoryArc) {
    const existingStoryArcIndex = this.storyArcs?.findIndex(
      (thisStoryArc) => thisStoryArc.storyArcSlug === storyArc.storyArcSlug,
    );
    if (existingStoryArcIndex && existingStoryArcIndex > -1) {
      this.storyArcs[existingStoryArcIndex] = storyArc;
    } else {
      this.storyArcs.push(storyArc);
    }
  }

  saveChapter(storyArc: StoryArc, chapter: Chapter) {
    const existingStoryArcIndex = this.storyArcs?.findIndex(
      (thisStoryArc) => thisStoryArc.storyArcSlug === storyArc.storyArcSlug,
    );
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
      chapter.id = this.computeNextChapterId(storyArc);
      this.storyArcs[existingStoryArcIndex].chapters.push(chapter);
    }
  }

  saveStep(storyArc: StoryArc, chapter: Chapter, step: Step): Step | null {
    const existingStoryArcIndex = this.storyArcs?.findIndex(
      (thisStoryArc) => thisStoryArc.storyArcSlug === storyArc.storyArcSlug,
    );
    if (existingStoryArcIndex === undefined || existingStoryArcIndex === -1) {
      console.error('Arc non trouvé');
      return null;
    }
    const chapterIndex = this.findChapterIndexById(storyArc, chapter.id);
    if (chapterIndex === -1) {
      return null;
    }

    const stepIndex = chapter.steps.findIndex((thisStep) => thisStep.id === step.id);
    if (stepIndex === -1) {
      step.id = this.computeNextStepId(chapter);
      this.storyArcs[existingStoryArcIndex].chapters[chapterIndex].steps.push(step);
    } else {
      this.storyArcs[existingStoryArcIndex].chapters[chapterIndex].steps[stepIndex] = step;
    }

    Adventure.fetchAllNonPlayerCharacters(this);
    Adventure.fetchAllPlaces(this);

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

  static fetchAllNonPlayerCharacters(adventure: Adventure) {
    // todo find a more elegant way to do it but I wanted it to work real fast
    adventure.storyArcs.forEach((storyArc: StoryArc) => {
      storyArc.chapters.forEach((chapter: Chapter) => {
        chapter.steps.forEach((step: Step) => {
          adventure.nonPlayerCharacters = [
            ...adventure.nonPlayerCharacters,
            ...(step.nonPlayerCharacters || []).filter((npc: NonPlayerCharacter) => !npc.isStepBound),
          ];
        });
      });
    });

    // Make it unique
    adventure.nonPlayerCharacters = [...new Map(adventure.nonPlayerCharacters.map((npc) => [npc.id, npc])).values()];
  }
  static fetchAllPlaces(adventure: Adventure) {
    // todo find a more elegant way to do it but I wanted it to work real fast
    adventure.storyArcs.forEach((storyArc: StoryArc) => {
      storyArc.chapters.forEach((chapter: Chapter) => {
        chapter.steps.forEach((step: Step) => {
          if (step.place && step.place.isStepBound && !adventure.places.find((place) => place.id === step.place?.id)) {
            adventure.places.push(step.place);
          }
        });
      });
    });
  }
}
