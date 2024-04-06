import { Light } from '@/model/Light.class';
import { DiceRoll } from '@/model/DiceRoll.class';
import { Audio } from '@/model/Audio.class';
import { Image } from '@/model/Image.class';
import { Clue } from '@/model/Clue.class';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';
import { Place } from '@/model/Place.class';

export class Step {
  id: string;
  level: number;
  title?: string;
  date?: string;
  description?: string;
  clues?: Clue[];
  audios?: Audio[];
  images?: Image[];
  lights?: Light[];
  diceRolls?: DiceRoll[];
  doNotForget?: string[];
  nextStepsIds?: string[];
  nonPlayerCharacters?: NonPlayerCharacter[];
  place?: Place;

  constructor(id: string, level: number) {
    this.id = id;
    this.level = level;
  }

  static getEmptyStep = () => {
    return new this('', 1);
  };
}
