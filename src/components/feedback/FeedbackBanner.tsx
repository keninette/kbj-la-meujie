import { Dispatch, SetStateAction } from 'react';

export enum FeedbackTypeEnum {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
}

export type FeedbackBannerProps = {
  message: string;
  type: FeedbackTypeEnum;
  setFeedback: Dispatch<SetStateAction<FeedbackBannerProps | undefined>>;
};

export default function FeedbackBanner({ message, type, setFeedback }: FeedbackBannerProps) {
  return (
    <div className='absolute flex bottom-0 left-0 bg-[#1a1a1a] bg-opacity-50 h-8 w-full justify-between items-center px-6'>
      <p>{message}</p>
      <button onClick={() => setFeedback(undefined)}>✖</button>
    </div>
  );
}
