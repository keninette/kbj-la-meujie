import React from 'react';
// @ts-ignore
import { DiceRoll, DiceRollCallbackTypeEnum } from '@/model/DiceRoll.class';
import { CharacteristicEnum } from '@/model/enums/characteristic.enum';

type DiceRollPropsType = {
  diceRoll: DiceRoll;
};

export default function DiceRollDisplay({ diceRoll }: DiceRollPropsType) {
  const displayDiceRoll = (diceRoll: DiceRoll) => {
    const characteristicsLabels = diceRoll.characteristic.map(
      (key: keyof typeof CharacteristicEnum) => CharacteristicEnum[key],
    );
    return (
      <>
        <span>
          🎲 {diceRoll.condition} {diceRoll.type} {characteristicsLabels.join(' | ')}
        </span>
        {diceRoll.onSuccess &&
          diceRoll.onSuccess.value &&
          diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.DICE_ROLL && (
            <div className='ml-7'>🟢 {displayDiceRoll(diceRoll.onSuccess.value as DiceRoll)}</div>
          )}
        {diceRoll.onSuccess &&
          diceRoll.onSuccess.value &&
          diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.TEXT && (
            <div className='ml-7'>🟢 {diceRoll.onSuccess.value as string}</div>
          )}
        {diceRoll.onSuccess &&
          diceRoll.onSuccess.value &&
          diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.CLUE && (
            <div className='ml-7'>🟢 🕵️‍♂️ Indice : {diceRoll.onSuccess.value as string}</div>
          )}
        {diceRoll.onFail && diceRoll.onFail.value && diceRoll.onFail.type === DiceRollCallbackTypeEnum.DICE_ROLL && (
          <div className='ml-7'>🔴 {displayDiceRoll(diceRoll.onFail.value as DiceRoll)}</div>
        )}
        {diceRoll.onFail && diceRoll.onFail.value && diceRoll.onFail.type === DiceRollCallbackTypeEnum.TEXT && (
          <div className='ml-7'>🔴 {diceRoll.onFail.value as string}</div>
        )}
        {diceRoll.onFail && diceRoll.onFail.value && diceRoll.onFail.type === DiceRollCallbackTypeEnum.CLUE && (
          <div className='ml-7'>🔴 🕵️‍♂️ Indice : {diceRoll.onFail.value as string}</div>
        )}
      </>
    );
  };

  return <>{displayDiceRoll(diceRoll)}</>;
}
