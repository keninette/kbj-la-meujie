import { v4 } from 'uuid';

export class Player {
  playerId: string;
  name: string;
  characterName: string;

  constructor(name: string, characterName: string) {
    this.playerId = v4();
    this.name = name;
    this.characterName = characterName;
  }
}
