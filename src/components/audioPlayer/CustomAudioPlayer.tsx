import React, { useEffect, useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Audio } from '@/model/Audio.class';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faPlay, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

type CustomAudioPlayerProps = {
  requestedAudio?: Audio;
  assetsDir: string;
  displaySendToHeaderButton: boolean;
  onSendToHeaderButtonClicked?: (audio?: Audio) => void;
};

export function CustomAudioPlayer({
  requestedAudio,
  assetsDir,
  displaySendToHeaderButton,
  onSendToHeaderButtonClicked,
}: CustomAudioPlayerProps) {
  const audioRef = useRef(null);
  const [audio, setAudio] = useState<Audio | undefined>();
  const toggleLoopPlay = () => {
    setAudio((prevAudio) => (prevAudio ? { ...prevAudio, loop: !prevAudio.loop } : undefined));
  };
  useEffect(() => setAudio(requestedAudio), [requestedAudio]);

  console.log(audio);

  return audio ? (
    <div className='flex flex-col w-1/2 mr-2'>
      <div className='flex justify-between mx-4 pt-2'>
        <p>🔉 Son : {audio?.name}</p>
        <p>
          <button
            title='Loop'
            onClick={toggleLoopPlay}
            className={`px-2 ${audio?.loop ? 'text-white' : 'text-gray-500'}`}
          >
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
          {audio?.autoPlay && (
            <button title='Autoplay' className='pr-2' disabled>
              <FontAwesomeIcon icon={faPlay} />
            </button>
          )}
          {displaySendToHeaderButton && onSendToHeaderButtonClicked && (
            <button title='Send to header' onClick={() => onSendToHeaderButtonClicked(audio)}>
              <FontAwesomeIcon icon={faArrowUpFromBracket} />
            </button>
          )}
        </p>
      </div>
      <ReactAudioPlayer
        src={`${assetsDir}/audio/${audio?.filename}`}
        loop={audio?.loop}
        autoPlay={audio?.autoPlay}
        volume={audio?.volume ?? 1}
        controls
        ref={audioRef}
      />
    </div>
  ) : (
    <div className='flex flex-col w-1/2 mr-2 justify-center items-center text-gray-500'>🔈 No audio requested</div>
  );
}
