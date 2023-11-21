import { DiceRollType } from './dice-roll.type';
import { LightType, AudioType } from './media.type';

export type StepType = {
  id: string;
  chapterId: string;
  level: number;
  description: string;
  clues?: string[];
  audios?: AudioType[];
  lights?: LightType[];
  diceRolls?: DiceRollType[];
  doNotForget?: string[];
  nextStepsIds?: string[];
};
