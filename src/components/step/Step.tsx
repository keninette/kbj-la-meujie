import React from 'react';
import DiceRoll from '@/components/step/DiceRoll';
import AudioPlayer from '@/components/step/AudioPlayer';
import { Tooltip } from 'react-tooltip';
// @ts-ignore
import { Step } from '@/model/Step.class';
import NonPlayerCharacterBlock from '@/components/step/NonPlayerCharacterBlock';
import PlaceBlock from '@/components/step/PlaceBlock';

type StepProps = {
  step: Step;
  uniqueStepKey: string;
};

export default function Step({ step, uniqueStepKey }: StepProps) {
  return (
    <div
      className='flex flex-col border-solid border-2 p-4 m-10 flex-grow z-10 border-gradient border-gradient--blue--to-left'
      id={uniqueStepKey}
    >
      <h3 className='flex justify-center text-xl mb-4'>{step.description}</h3>
      {step.lights &&
        step.lights.map((light, index) => {
          return (
            <div className='flex flex-col my-4' key={`light_${step.id}_${index}`}>
              💡 Lumière : {`${light.helper} ${light.color} - 🌞 Intensité ${light.intensity}`}
            </div>
          );
        })}
      {step.place && <PlaceBlock place={step.place} />}
      {step.nonPlayerCharacters && (
        <ul className='flex'>
          {step.nonPlayerCharacters.map((npc) => {
            const uniqId = `npc_${step.id}_${npc.name.toLowerCase().replaceAll(' ', '')}`;
            return <NonPlayerCharacterBlock key={uniqId} npc={npc} npcUniqId={uniqId} />;
          })}
        </ul>
      )}
      {step.audios &&
        step.audios.map((sound, index) => {
          return <AudioPlayer audio={sound} id={index} stepId={step.id} key={`audio-player_${index}`} />;
        })}
      <ul>
        {step.images &&
          step.images.map((img, index) => {
            return (
              <div key={`img_${step.id}_${index}`}>
                <a href={`../../../assets/img/adventures/${img.filename}`} target='_blank'>
                  📸 Image : {img.name}
                </a>
              </div>
            );
          })}
      </ul>
      <ul>
        {step.clues &&
          step.clues.map((clue, index) => {
            return (
              <div className='flex flex-col' key={`clue_${step.id}_${index}`}>
                <div className='flex'>
                  <input type='checkbox' className='mr-2' />
                  <label className='flex'>
                    🕵️‍♀️ Indice : {clue.title}{' '}
                    {clue.privateDescription && (
                      <div className='cursor-pointer' title={clue.privateDescription}>
                        ℹ
                      </div>
                    )}
                  </label>
                </div>
                {clue.publicDescription && <div className='my-4'>{clue.publicDescription}</div>}
              </div>
            );
          })}
      </ul>
      {step.diceRolls &&
        step.diceRolls.map((diceRoll, index) => {
          return (
            <div className='flex flex-col my-4' key={`dice-roll_${index}`}>
              <DiceRoll diceRoll={diceRoll} />
            </div>
          );
        })}
    </div>
  );
}
