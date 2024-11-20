import React, { ReactElement } from 'react';

type TabProps = {
  children?: ReactElement;
};
export default function Tab({ children }: TabProps) {
  return <div className='flex h-full w-full'>{children}</div>;
}
