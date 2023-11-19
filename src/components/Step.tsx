import React from 'react';
import { StepType } from '@/model/step.type';
import DiceRoll from '@/components/DiceRoll';
import AudioPlayer from '@/components/AudioPlayer';

type StepProps = {
  stepData: StepType;
};

export default function Step({ stepData }: StepProps) {
  return (
    <div
      className='flex flex-col border-solid border-2 p-4 m-10 flex-grow z-10 border-gradient border-gradient--blue--to-left'
      id={stepData.id}
    >
      <h3 className='flex justify-center text-xl mb-4'>{stepData.description}</h3>
      {stepData.lights &&
        stepData.lights.map((light, index) => {
          return (
            <p className='flex flex-col my-4' key={`light_${stepData.id}_${index}`}>
              💡 Lumière : {`${light.helper} ${light.color} - 🌞 Intensité ${light.intensity}`}
            </p>
          );
        })}
      {stepData.sounds &&
        stepData.sounds.map((sound, index) => {
          return <AudioPlayer audio={sound} id={index} stepId={stepData.id} key={`audio-player_${index}`} />;
        })}
      <ul>
        {stepData.clues &&
          stepData.clues.map((clue, index) => {
            return (
              <div key={`clue_${stepData.id}_${index}`}>
                <input type='checkbox' className='mr-2' />
                <label>🕵️‍♀️ Indice : {clue}</label>
              </div>
            );
          })}
      </ul>
      {stepData.diceRolls &&
        stepData.diceRolls.map((diceRoll, index) => {
          return (
            <div className='flex flex-col my-4' key={`dice-roll_${index}`}>
              <DiceRoll diceRoll={diceRoll} />
            </div>
          );
        })}
    </div>
  );
}
