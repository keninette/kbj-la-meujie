import {DiceRollType} from "./dice-roll.type";
import {LightType, SoundType} from "./media.type";

export type StepType = {
  id: string;
  chapterId: string;
  level: number;
  description: string;
  clues?: string[];
  sounds?: SoundType[];
  lights?: LightType[];
  diceRoll?: DiceRollType;
  doNotForget?: string[];
  nextStepsIds?: string[];
}