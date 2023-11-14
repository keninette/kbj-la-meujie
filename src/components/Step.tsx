import React from 'react';
import {StepType} from "@/model/step.type";

type StepProps = {
  stepData: StepType;
}
export default function Step({stepData}: StepProps) {
  return (
    <div
      className="flex flex-col w-20 border-solid border-2 m-10 flex-grow z-10 border-gradient border-gradient--blue--to-left"
      id={stepData.id}
    >
      {stepData.description}
      {stepData.lights && stepData.lights.map((light) => {
        return <p key={light.color}>💡 Lumière : {`${light.helper} ${light.color} - ${light.intensity}`}</p>
      })}
      {stepData.sounds && stepData.sounds.map((sound) => {
        return (
          <div key={sound}>
            <p>{sound} 🔉 50%</p>
            <audio controls loop className="w-96">
              <source src={`../../assets/audio/${sound}`} type="audio/mp3" />
            </audio>
          </div>
        );
      })}
      <ul>
        {stepData.clues && stepData.clues.map((clue) => {
          return <p key={clue}>🕵️‍♀️ Indice : {clue}</p>
        })}
      </ul>
      {stepData.diceRoll && <p className="font-bold">🎲 {stepData.diceRoll.value} {stepData.diceRoll.characteristic}</p>}
      <ul>
        {stepData.nextStepsIds && stepData.nextStepsIds.map((nextStep) => {
          return <li key={`${nextStep.chapterId}-${nextStep.id}`}>{nextStep.description}</li>
        })}
      </ul>
    </div>
  );
};