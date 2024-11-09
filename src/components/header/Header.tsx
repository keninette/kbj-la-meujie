import Image from 'next/image';
import kbjImg from '../../../public/assets/img/kbj.jpg';
import FeedbackBanner, { FeedbackBannerProps, FeedbackTypeEnum } from '@/components/feedback/FeedbackBanner';
import { Dispatch, SetStateAction } from 'react';

type HeaderPropsType = {
  feedbackBannerProps?: FeedbackBannerProps;
};
export default function Header({ feedbackBannerProps }: HeaderPropsType) {
  return (
    <header className='relative mb-2'>
      <a className='flex items-center px-6 py-4 mb-8' href='/'>
        <Image className='flex w-20 h-20 rounded-full' src={kbjImg} alt='avatar' />
        <h1 className='text-3xl ml-4'>kbj la meujie</h1>
      </a>
      {feedbackBannerProps && <FeedbackBanner {...feedbackBannerProps} />}
    </header>
  );
}
