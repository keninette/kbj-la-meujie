import { ClueTypeEnum } from '@/model/enums/clue-type.enum';

export class Clue {
  title: string;
  publicDescription: string;
  privateDescription: string;
  type: ClueTypeEnum;
  isPublic: boolean;

  constructor() {
    this.title = '';
    this.publicDescription = '';
    this.privateDescription = '';
    this.type = ClueTypeEnum.ORAL;
    this.isPublic = false;
  }
}
