import { CharacteristicEnum } from './characteristic.enum';

export enum DiceRollCallbackTypeEnum {
  TEXT = 'text',
  DICE_ROLL = 'dice roll',
  CLUE = 'clue',
}

type DiceRollCallbackType = {
  type: DiceRollCallbackTypeEnum;
  value: string | DiceRollType;
};

export type DiceRollType = {
  characteristic: CharacteristicEnum[];
  type: string;
  onSuccess?: DiceRollCallbackType;
  onFail?: DiceRollCallbackType;
  condition?: string;
};
