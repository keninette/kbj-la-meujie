import { StepType } from './step.type';
import { LightType } from './media.type';

export type ChapterType = {
  id: string;
  adventureId: string;
  name: string;
  nextChapterId?: string;
  description?: string;
  clues?: string[];
  sounds?: string[];
  lights?: LightType[];
  steps?: StepType[];
};
