import { CharacteristicEnum } from '@/model/enums/characteristic.enum';

export enum DiceRollCallbackTypeEnum {
  TEXT = 'text',
  DICE_ROLL = 'dice roll',
  CLUE = 'clue',
}

type DiceRollCallbackType = {
  type: DiceRollCallbackTypeEnum;
  value: string | DiceRoll;
};
export class DiceRoll {
  characteristic: (keyof typeof CharacteristicEnum)[];
  type: string;
  onSuccess: DiceRollCallbackType;
  onFail: DiceRollCallbackType;
  condition?: string;

  constructor(type: string, characteristic: (keyof typeof CharacteristicEnum)[]) {
    this.characteristic = characteristic;
    this.type = type;
    this.onSuccess = {
      type: DiceRollCallbackTypeEnum.TEXT,
      value: '',
    };
    this.onFail = {
      type: DiceRollCallbackTypeEnum.TEXT,
      value: '',
    };
  }
}
