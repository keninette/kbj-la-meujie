import {CharacteristicEnum} from "./characteristic.enum";

export type DiceRollType = {
  characteristic: [CharacteristicEnum];
  type: string;
  onSuccess?: DiceRollType | string;
  onFail?: DiceRollType | string;
  condition?: string;
}