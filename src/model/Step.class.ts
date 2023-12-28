import { Light } from '@/model/Light.class';
import { DiceRoll } from '@/model/DiceRoll.class';
import { Audio } from '@/model/Audio.class';

export class Step {
  id: string;
  level: number;
  description?: string;
  clues?: string[];
  audios?: Audio[];
  lights?: Light[];
  diceRolls?: DiceRoll[];
  doNotForget?: string[];
  nextStepsIds?: string[];

  constructor(id: string, level: number) {
    this.id = id;
    this.level = level;
  }
}
