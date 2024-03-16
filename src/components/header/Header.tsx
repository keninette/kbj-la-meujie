import Image from 'next/image';
import kbjImg from '../../../public/assets/img/kbj.jpg';
import FeedbackBanner, { FeedbackBannerProps } from '@/components/feedback/FeedbackBanner';

type HeaderPropsType = {
  feedbackBannerProps?: FeedbackBannerProps;
};
export default function Header({ feedbackBannerProps }: HeaderPropsType) {
  return (
    <header className='relative mb-8 h-[145px]'>
      <a className='flex items-center px-6 py-8 mb-8' href='/'>
        <Image className='flex w-20 h-20 rounded-full' src={kbjImg} alt='avatar' priority={true} />
        <h1 className='text-3xl ml-4'>kbj la meujie</h1>
      </a>
      {feedbackBannerProps && <FeedbackBanner {...feedbackBannerProps} />}
    </header>
  );
}
