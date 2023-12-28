import React from 'react';
// @ts-ignore
import { DiceRoll, DiceRollCallbackTypeEnum } from '@/model/DiceRoll.class';

type DiceRollPropsType = {
  diceRoll: DiceRoll;
};

export default function DiceRoll({ diceRoll }: DiceRollPropsType) {
  const displayDiceRoll = (diceRoll: DiceRoll) => {
    return (
      <>
        <span>
          🎲 {diceRoll.condition} {diceRoll.type} {diceRoll.characteristic.join(' | ')}
        </span>
        {diceRoll.onSuccess && diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.DICE_ROLL && (
          <div className='ml-7'>🟢 {displayDiceRoll(diceRoll.onSuccess.value as DiceRoll)}</div>
        )}
        {diceRoll.onSuccess && diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.TEXT && (
          <div className='ml-7'>🟢 {diceRoll.onSuccess.value as string}</div>
        )}
        {diceRoll.onSuccess && diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.CLUE && (
          <div className='ml-7'>🟢 🕵️‍♂️ Indice : {diceRoll.onSuccess.value as string}</div>
        )}
        {diceRoll.onFail && diceRoll.onFail.type === DiceRollCallbackTypeEnum.DICE_ROLL && (
          <div className='ml-7'>🔴 {displayDiceRoll(diceRoll.onFail.value as DiceRoll)}</div>
        )}
        {diceRoll.onFail && diceRoll.onFail.type === DiceRollCallbackTypeEnum.TEXT && (
          <div className='ml-7'>🔴 {diceRoll.onFail.value as string}</div>
        )}
        {diceRoll.onFail && diceRoll.onFail.type === DiceRollCallbackTypeEnum.CLUE && (
          <div className='ml-7'>🔴 🕵️‍♂️ Indice : {diceRoll.onFail.value as string}</div>
        )}
      </>
    );
  };

  return <>{displayDiceRoll(diceRoll)}</>;
}
