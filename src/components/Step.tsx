import React, {useEffect, useRef} from 'react';
import {StepType} from "@/model/step.type";
import DiceRoll from "@/components/DiceRoll";

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
      <h3 className="flex justify-center text-xl mb-4">{stepData.description}</h3>
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
          return <div key={`clue_${stepData.id}_${index}`}>
            <input type="checkbox" className="mr-2" /><label>🕵️‍♀️ Indice : {clue}</label>
          </div>
        })}
      </ul>
      {stepData.diceRoll && (
        <div className="flex flex-col my-4">
          <DiceRoll diceRoll={stepData.diceRoll} />
        </div>
      )}
      <ul>
        {stepData.nextStepsIds && stepData.nextStepsIds.map((nextStep) => {
          return <li key={`${nextStep.chapterId}-${nextStep.id}`}>{nextStep.description}</li>
        })}
      </ul>
    </div>
  );
};