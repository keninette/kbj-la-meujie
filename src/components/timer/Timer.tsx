import React, { useState } from 'react';
import { faPlay, faRefresh, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTimer } from 'react-timer-hook';

export type TimerType = {
  duration: number;
  title: string;
};

type TimerProps = {
  timer: TimerType;
};

export function Timer({ timer }: TimerProps) {
  // todo : alert is displayed twice, we need to fix that and remove this workaround
  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  const getTimerExpirationTimestamp = (duration: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + duration);

    return time;
  };

  const onExpireCallback = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeout(() => alert(`${timer.title ?? 'Timer'} over !`), 200);
  };

  const { seconds, minutes, hours, start, pause, resume, restart, isRunning } = useTimer({
    expiryTimestamp: getTimerExpirationTimestamp(timer.duration),
    onExpire: onExpireCallback,
    autoStart: false,
  });

  return (
    <>
      <p>{timer.title}</p>
      <p className='flex'>
        {hours}:{minutes}:{seconds}
        <button title='Play/Resume' className='px-2 active:text-blue-600' onClick={isRunning ? resume : start}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button title='Pause' className='pr-2 active:text-blue-600' onClick={pause}>
          <FontAwesomeIcon icon={faPause} />
        </button>
        <button
          title='Restart'
          className='pr-2 active:text-blue-600'
          onClick={() => {
            restart(getTimerExpirationTimestamp(timer.duration));
          }}
        >
          <FontAwesomeIcon icon={faRefresh} />
        </button>
      </p>
    </>
  );
}
