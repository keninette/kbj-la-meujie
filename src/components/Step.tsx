import React, {useEffect, useRef} from 'react';
import {StepType} from "@/model/step.type";

type StepProps = {
  stepData: StepType;
}


export default function Step({stepData}: StepProps) {
  const refs = {};
  stepData.sounds?.forEach((step, index) => {
    refs[`sound_${stepData.id}_${index}`] = useRef(null);
  });

  // Automatically set volume to what's expected
  useEffect(() => {
    stepData.sounds?.forEach((sound, index) => {
      if (sound.volume) {
        const ref = refs[`sound_${stepData.id}_${index}`];
        ref.current.volume = sound.volume;
      }
    })
  }, []);

  return (
    <div
      className="flex flex-col border-solid border-2 p-4 m-10 flex-grow z-10 border-gradient border-gradient--blue--to-left"
      id={stepData.id}
    >
      <h3 className="flex justify-center text-xl">{stepData.description}</h3>
      {stepData.lights && stepData.lights.map((light, index) => {
        return <p className="flex flex-col my-4" key={`light_${stepData.id}_${index}`}>💡 Lumière : {`${light.helper} ${light.color} - ${light.intensity}`}</p>
      })}
      {stepData.sounds && stepData.sounds.map((sound, index) => {
        return (
          <div className="flex flex-col my-4" key={`sound_${stepData.id}_${index}`}>
            <p>🔉 Son : {sound.name} 🔉 Volume : {sound.volume * 100}%</p>
            <p>{sound.helper}</p>
            <audio
              ref={refs[`sound_${stepData.id}_${index}`]}
              controls
              loop={sound.loop}
              className="w-96 bg-white mt-2 mb-4 bg-opacity-50">
              <source src={`../../assets/audio/${sound.filename}`} type="audio/mp3" />
            </audio>
          </div>
        );
      })}
      <ul>
        {stepData.clues && stepData.clues.map((clue, index) => {
          return <p key={`clue_${stepData.id}_${index}`}>🕵️‍♀️ Indice : {clue}</p>
        })}
      </ul>
      {stepData.diceRoll && (
        <p className="flex flex-col my-4">
          <p>🎲 {stepData.diceRoll.condition} {stepData.diceRoll.type} {stepData.diceRoll.characteristic.join(' | ')}</p>
          { stepData.diceRoll.onSuccess  && typeof stepData.diceRoll.onSuccess === 'object' && (
            <p className="ml-4">🟢 🎲 {stepData.diceRoll.onSuccess?.condition} {stepData.diceRoll.onSuccess.type} {stepData.diceRoll.onSuccess.characteristic.join(' | ')}</p>
          )}
          { stepData.diceRoll.onSuccess  && typeof stepData.diceRoll.onSuccess === 'string' && (
            <p className="ml-4">🟢 {stepData.diceRoll.onSuccess}</p>
          )}
          { stepData.diceRoll.onFail && typeof stepData.diceRoll.onFail === 'object' && (
            <p className="ml-4">🔴 🎲 {stepData.diceRoll.onFail?.condition} {stepData.diceRoll.onFail.type} {stepData.diceRoll.onFail.characteristic.join(' | ')}</p>
          )}
          { stepData.diceRoll.onFail && typeof stepData.diceRoll.onFail === 'string' && (
            <p className="ml-4">🔴 {stepData.diceRoll.onFail}</p>
          )}
        </p>
      )}
      <ul>
        {stepData.nextStepsIds && stepData.nextStepsIds.map((nextStep) => {
          return <li key={`${nextStep.chapterId}-${nextStep.id}`}>{nextStep.description}</li>
        })}
      </ul>
    </div>
  );
};