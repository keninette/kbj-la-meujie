import React from "react";
import {DiceRollType} from "@/model/dice-roll.type";

type DiceRollPropsType = {
  diceRoll: DiceRollType;
}

export default function DiceRoll({diceRoll}: DiceRollPropsType) {
  return (
    <>
      <p>🎲 {diceRoll.condition} {diceRoll.type} {diceRoll.characteristic.join(' | ')}</p>
      { diceRoll.onSuccess  && typeof diceRoll.onSuccess === 'object' && (
        <p className="ml-4">🟢 🎲 {diceRoll.onSuccess?.condition} {diceRoll.onSuccess.type} {diceRoll.onSuccess.characteristic.join(' | ')}</p>
      )}
      { diceRoll.onSuccess  && typeof diceRoll.onSuccess === 'string' && (
        <p className="ml-4">🟢 {diceRoll.onSuccess}</p>
      )}
      { diceRoll.onFail && typeof diceRoll.onFail === 'object' && (
        <p className="ml-4">🔴 🎲 {diceRoll.onFail?.condition} {diceRoll.onFail.type} {diceRoll.onFail.characteristic.join(' | ')}</p>
      )}
      { diceRoll.onFail && typeof diceRoll.onFail === 'string' && (
        <p className="ml-4">🔴 {diceRoll.onFail}</p>
      )}
    </>
  );
};