import { Image } from '@/model/Image.class';

export class Place {
  id: number;
  name: string;
  pinId: string;
  publicDescription: string;
  privateDescription: string;
  picture: Image;
  isStepBound: boolean;

  constructor() {
    this.id = new Date().getTime();
    this.name = '';
    this.pinId = '';
    this.publicDescription = '';
    this.privateDescription = '';
    this.picture = new Image('Photo', '');
    this.isStepBound = true;
  }
}
