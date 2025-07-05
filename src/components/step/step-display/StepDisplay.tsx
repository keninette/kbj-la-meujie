import React from 'react';
import DiceRollDisplay from '@/components/step/DiceRollDisplay';
import AudioPlayer from '@/components/step/AudioPlayer';
import NonPlayerCharacterBlock from '@/components/step/NonPlayerCharacterBlock';
import PlaceBlock from '@/components/step/PlaceBlock';
import { Light } from '@/model/Light.class';
import { Audio } from '@/model/Audio.class';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';
import { Image } from '@/model/Image.class';
import { Clue } from '@/model/Clue.class';
import { DiceRoll } from '@/model/DiceRoll.class';
import { Step } from '@/model/adventure/story-arc/chapter/step/Step.class';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './step-display.scss';

type StepProps = {
  step: Step;
  uniqueStepKey: string;
  referer: 'edit' | 'read' | 'adventure';
  stepIndex?: number;
};

export default function StepDisplay({ step, uniqueStepKey, referer }: StepProps) {
  const assetsDir = referer === 'edit' ? '../../../assets' : '../../../../assets';

  return (
    <div
      className='flex flex-col w-[600px] border-solid border-2 h-fit p-4 m-10 z-10 border-gradient border-gradient--blue--to-left'
      id={uniqueStepKey}
    >
      <h3 className='flex justify-center text-xl mb-4 underline'>{step.title}</h3>
      {step.date && <p>📆 {step.date}</p>}
      {step.place && <PlaceBlock place={step.place} referer={referer} />}
      {step.nonPlayerCharacters && (
        <ul className='flex'>
          {step.nonPlayerCharacters.map((npc: NonPlayerCharacter) => {
            const uniqId = `npc_${step.id}_${npc.name.toLowerCase().replaceAll(' ', '')}`;
            return <NonPlayerCharacterBlock key={uniqId} npc={npc} npcUniqId={uniqId} referer={referer} />;
          })}
        </ul>
      )}
      {step.lights &&
        step.lights.map((light: Light, index: number) => {
          return (
            <div className='flex flex-col my-4' key={`light_${step.id}_${index}`}>
              💡 Lumière : {`${light.helper} ${light.color} - 🌞 Intensité ${light.intensity}`}
            </div>
          );
        })}
      {step.audios &&
        step.audios.map((sound: Audio, index: number) => {
          return (
            <AudioPlayer
              audio={sound}
              id={index}
              stepId={step.id}
              key={`audio-player_${index}`}
              assetsDir={assetsDir}
            />
          );
        })}
      <div className='flex'>
        <div className='flex flex-col w-1/2 mt-4 border-r-2 border-gray-500 border-dotted'>
          {step.description && (
            <Markdown className='step-display__markdown' remarkPlugins={[remarkGfm]}>
              {step.description}
            </Markdown>
          )}
        </div>
        <div className='flex flex-col w-1/2'>
          {step.images && (
            <ul className='flex flex-col my-4'>
              {step.images.map((img: Image, index: number) => {
                return (
                  <div key={`img_${step.id}_${index}`}>
                    <a href={`${assetsDir}/img/adventures/${img.filename}`} target='_blank'>
                      📸 Image : {img.name}
                    </a>
                  </div>
                );
              })}
            </ul>
          )}
          {step.clues && (
            <ul>
              {step.clues.map((clue: Clue, index: number) => {
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
          )}
          {step.diceRolls &&
            step.diceRolls.map((diceRoll: DiceRoll, index: number) => {
              return (
                <div className='flex flex-col my-4' key={`dice-roll_${index}`}>
                  <DiceRollDisplay diceRoll={diceRoll} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
