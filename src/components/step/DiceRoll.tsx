import React from 'react';
import { DiceRollCallbackTypeEnum, DiceRollType } from '@/model/dice-roll.type';

type DiceRollPropsType = {
  diceRoll: DiceRollType;
};

export default function DiceRoll({ diceRoll }: DiceRollPropsType) {
  const displayDiceRoll = (diceRoll: DiceRollType) => {
    return (
      <>
        <span>
          🎲 {diceRoll.condition} {diceRoll.type} {diceRoll.characteristic.join(' | ')}
        </span>
        {diceRoll.onSuccess && diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.DICE_ROLL && (
          <div className='ml-7'>🟢 {displayDiceRoll(diceRoll.onSuccess.value as DiceRollType)}</div>
        )}
        {diceRoll.onSuccess && diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.TEXT && (
          <div className='ml-7'>🟢 {diceRoll.onSuccess.value as string}</div>
        )}
        {diceRoll.onSuccess && diceRoll.onSuccess.type === DiceRollCallbackTypeEnum.CLUE && (
          <div className='ml-7'>🟢 🕵️‍♂️ Indice : {diceRoll.onSuccess.value as string}</div>
        )}
        {diceRoll.onFail && diceRoll.onFail.type === DiceRollCallbackTypeEnum.DICE_ROLL && (
          <div className='ml-7'>🔴 {displayDiceRoll(diceRoll.onFail.value as DiceRollType)}</div>
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
