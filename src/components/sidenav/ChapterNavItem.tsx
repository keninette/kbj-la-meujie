import { faBookmark, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChapterType } from '@/model/chapter.type';
import { getChapterRoute } from '@/app/routes';

type ChapterNavItemPropsType = {
  chapter: ChapterType;
};

export default function ChapterNavItem({ chapter }: ChapterNavItemPropsType) {
  const route = getChapterRoute(chapter);

  return (
    <>
      <FontAwesomeIcon icon={faBookmark} size='xs' className='mx-2' />
      {route.name}
      {chapter.steps.length > 0 && route && (
        <a href={route.path} className='ml-2' target='_blank'>
          <FontAwesomeIcon icon={faUpRightFromSquare} size='xs' />
        </a>
      )}
    </>
  );
}
