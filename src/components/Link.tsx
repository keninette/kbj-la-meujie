import React, { ReactElement } from 'react';
import { useRouter } from 'next/navigation';

type LinkPropsType = {
  href: string;
  children: string | ReactElement;
  onClickAction?: () => void;
};
export default function Link({ href, children, onClickAction }: LinkPropsType) {
  const router = useRouter();
  const handleClickAction = () => {
    router.push(href);
    if (onClickAction) {
      onClickAction();
    }
    // If js is active : will prevent from following the link href
    // If not, the link will still be viable
    // Anyway : semantics are ok
    return false;
  };

  return <a onClick={handleClickAction}>{children}</a>;
}
