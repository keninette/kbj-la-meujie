import { v4 } from 'uuid';
import { Image } from '@/model/Image.class';

export enum CharacterType {
  PLAYER_CHARACTER = 'PlayerCharacter',
  NON_PLAYER_CHARACTER = 'NonPlayerCharacter',
}
export abstract class Character {
  uuid: string;
  name: string;
  occupation: string;
  identifiesAs: 'Female' | 'Male' | 'Non-binary';
  backstory: string;
  currentHealthPoints: number;
  maxHealthPoints: number;
  currentMagicPoints: number;
  maxMagicPoints: number;
  currentSanPoints: number;
  maxSanPoints: number;
  type: CharacterType;
  portrait?: string | Image;

  protected constructor() {
    this.uuid = v4();
    this.name = 'Jeanine Jeaninesonn';
    this.occupation = "Secrétaire d'acceuil";
    this.backstory = '';
    this.identifiesAs = 'Non-binary';
    this.maxHealthPoints = 0;
    this.maxSanPoints = 0;
    this.maxMagicPoints = 0;
    this.currentHealthPoints = this.maxHealthPoints;
    this.currentSanPoints = this.maxSanPoints;
    this.currentMagicPoints = this.maxMagicPoints;
    this.type = CharacterType.NON_PLAYER_CHARACTER;
  }
}
