import React, { ReactElement } from 'react';
import { Step } from '@/model/adventure/story-arc/chapter/step/Step.class';
import PlaceBlock from '@/components/step/PlaceBlock';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';
import NonPlayerCharacterBlock from '@/components/step/NonPlayerCharacterBlock';
import { Light } from '@/model/Light.class';
import { Audio } from '@/model/Audio.class';
import AudioPlayer from '@/components/step/AudioPlayer';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Image } from '@/model/Image.class';
import { Clue } from '@/model/Clue.class';
import { DiceRoll } from '@/model/DiceRoll.class';
import DiceRollDisplay from '@/components/step/DiceRollDisplay';
import { CustomAudioPlayer } from '@/components/audioPlayer/CustomAudioPlayer';

type StepTabPropsType = {
  referer: 'edit' | 'read';
  step?: Step;
  onAudioRequested: (audio?: Audio) => void;
};

export default function StepTab({ step, referer, onAudioRequested }: StepTabPropsType): ReactElement {
  const assetsDir = referer === 'edit' ? '../../../assets' : '../../../../assets';

  if (!step) {
    return <>No active step</>;
  }
  return (
    <div className='h-full w-full'>
      <h3 className='flex justify-center text-xl font-bold mb-4 '>{step.title}</h3>
      {step.place && <PlaceBlock place={step.place} referer={referer} />}

      {step.lights &&
        step.lights.map((light: Light, index: number) => {
          return (
            <div className='flex flex-col my-4' key={`light_${step.id}_${index}`}>
              💡 Lumière : {`${light.helper} ${light.color} - 🌞 Intensité ${light.intensity}`}
            </div>
          );
        })}
      {step.audios &&
        step.audios.map((audio: Audio, index: number) => {
          return (
            <CustomAudioPlayer
              requestedAudio={audio}
              displaySendToHeaderButton={true}
              onSendToHeaderButtonClicked={onAudioRequested}
              key={`audio-player_${index}`}
              assetsDir={assetsDir}
            />
          );
        })}
      {step.nonPlayerCharacters && (
        <ul className='flex flex-wrap'>
          {step.nonPlayerCharacters.map((npc: NonPlayerCharacter) => {
            const uniqId = `npc_${step.id}_${npc.name.toLowerCase().replaceAll(' ', '')}`;
            return <NonPlayerCharacterBlock key={uniqId} npc={npc} npcUniqId={uniqId} referer={referer} />;
          })}
        </ul>
      )}
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
