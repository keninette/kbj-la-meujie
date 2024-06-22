import { Adventure } from '@/model/AdventureManager.class';

// todo rename this
export interface AdventureCardDto extends Adventure {
  editLink: string;
  readLink: string;
}
