import { Character, CharacterType } from '@/model/sessions/Character.class';

export class PlayerCharacter extends Character {
  constructor() {
    super();
    this.portrait = '';
    this.type = CharacterType.PLAYER_CHARACTER;
  }
}
