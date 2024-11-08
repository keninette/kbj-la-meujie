import React from 'react';

export enum SideModalSizeEnum {
  SMALL = 's',
  MEDIUM = 'm',
}

type SideModalProps = {
  closeSideModal: () => void;
  children?: React.JSX.Element;
  size?: SideModalSizeEnum;
};
export default function SideModal({ closeSideModal, children, size = SideModalSizeEnum.SMALL }: SideModalProps) {
  const width = size === SideModalSizeEnum.SMALL ? 'w-[450px]' : 'w-[750px]';

  return (
    <section
      className={`flex flex-col h-full ${width} z-[100] bg-black bg-opacity-90 absolute right-0 top-[145px] border-gradient border-gradient--red--to-right`}
    >
      <div className='flex justify-end'>
        <button onClick={closeSideModal}>❌</button>
      </div>
      <div className='flex flex-col px-4'>{children}</div>
    </section>
  );
}
