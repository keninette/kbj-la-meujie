import {DiceRollType} from "./dice-roll.type";
import {LightsType} from "./lights.type";

export type StepType = {
  id: string;
  chapterId: string;
  level: number;
  description: string;
  clues?: string[];
  sounds?: string[];
  lights?: LightsType[];
  diceRoll?: DiceRollType;
  doNotForget?: string[];
  nextStepsIds?: string[];
}