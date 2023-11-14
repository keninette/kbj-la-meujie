import {StepType} from "./step.type";
import {LightsType} from "./lights.type";

export type ChapterType = {
  id: string;
  adventureId: string;
  name: string;
  nextChapterId?: string;
  description?: string;
  clues?: string[];
  sounds?: string[];
  lights?: LightsType[];
  steps?: StepType[];
}