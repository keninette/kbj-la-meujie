import { Image } from '@/model/Image.class';
import { Character } from '@/model/sessions/Character.class';

export class NonPlayerCharacter extends Character {
  id?: number;
  age: number;
  privateBackstory: string;
  isStepBound: boolean;
  // todo move portrait in parent class

  constructor() {
    super();
    // todo remove id
    this.id = new Date().getTime();
    // todo fix image constructor
    this.portrait = new Image('Portrait', '');
    this.age = 0;
    this.privateBackstory = '';
    this.isStepBound = true;
  }
}
