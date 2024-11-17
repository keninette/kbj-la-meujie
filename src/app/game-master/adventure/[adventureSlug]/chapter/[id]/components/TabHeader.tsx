import React from 'react';
import { CustomAudioPlayer } from '@/components/audioPlayer/CustomAudioPlayer';
import { Audio } from '@/model/Audio.class';

type TabHeaderProps = {
  requestedAudio?: Audio;
};
export function TabHeader({ requestedAudio }: TabHeaderProps) {
  return (
    <section className='flex align-middle m-2 h-24 border-2 border-gradient border-gradient--blue--to-left'>
      <CustomAudioPlayer
        requestedAudio={requestedAudio}
        displaySendToHeaderButton={false}
        assetsDir='../../../../../../../../assets'
      />
    </section>
  );
}
