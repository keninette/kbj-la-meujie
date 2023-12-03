import React, { useEffect, useRef } from 'react';
import { AudioType } from '@/model/media.type';

type AudioPlayerProps = {
  audio: AudioType;
  stepId: string;
  id: number;
};

export default function AudioPlayer({ audio, id, stepId }: AudioPlayerProps) {
  const audioRef = useRef(null);

  // Automatically set volume to what's expected
  useEffect(() => {
    const setVolume = () => {
      if (audio.volume && audioRef) {
        // @ts-ignore
        audioRef.current.volume = audio.volume;
      }
    };
    setVolume();
  }, [audio]);

  return (
    <div className='flex flex-col my-4' key={`audio_container_${stepId}_${id}`}>
      <p>
        🔉 Son : {audio.name} 🔉 Volume : {audio.volume ? audio.volume * 100 : 100}%
      </p>
      <p>{audio.helper}</p>
      <audio
        ref={audioRef}
        controls
        loop={audio.loop}
        /*autoPlay={audio.autoplay} todo*/
        className='w-96 bg-white mt-2 mb-4 bg-opacity-50 rounded-lg'
      >
        <source src={`../../assets/audio/${audio.filename}`} type='audio/mp3' />
      </audio>
    </div>
  );
}
