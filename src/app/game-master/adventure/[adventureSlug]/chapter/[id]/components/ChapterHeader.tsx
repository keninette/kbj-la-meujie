import React from 'react';
import { CustomAudioPlayer } from '@/components/audioPlayer/CustomAudioPlayer';
import { Audio } from '@/model/Audio.class';
import { TimerWrapper } from '@/components/timer/TimerWrapper';

type TabHeaderProps = {
  requestedAudio?: Audio;
};

export function ChapterHeader({ requestedAudio }: TabHeaderProps) {
  return (
    <section className='flex m-2 h-24 border-2 border-gradient border-gradient--blue--to-left'>
      <div className='flex w-1/2 align-middle'>
        <CustomAudioPlayer
          requestedAudio={requestedAudio}
          displaySendToHeaderButton={false}
          assetsDir='../../../../../../../../assets'
        />
      </div>
      <div className='flex w-1/2'>
        <div className='flex w-1/2 align-middle'>
          <TimerWrapper />
        </div>
        <div className='flex w-1/2 align-middle'>
          <TimerWrapper />
        </div>
      </div>
    </section>
  );
}
