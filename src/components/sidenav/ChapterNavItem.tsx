import { faBookmark, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getChapterRoute, RouteType } from '@/app/routes';
import { Chapter } from '@/model/Chapter.class';
import { useEffect, useState } from 'react';

type ChapterNavItemPropsType = {
  chapterUid: string;
};

export default function ChapterNavItem({ chapterUid }: ChapterNavItemPropsType) {
  const [chapter, setChapter] = useState<Chapter>();
  const [route, setRoute] = useState<RouteType>();
  const adventureSlug = chapterUid.split('|')[0];
  const chapterId = chapterUid.split('|')[1];

  useEffect(() => {
    (async function () {
      const response = await fetch(`/adventure/api?slug=${adventureSlug}&chapterId=${chapterId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const chapter: Chapter = await response.json();
      if (chapter) {
        setChapter(chapter);
        setRoute(getChapterRoute(chapter, adventureSlug));
      }
    })();
  }, [adventureSlug, chapterId]);

  return (
    chapter &&
    route && (
      <>
        <FontAwesomeIcon icon={faBookmark} size='xs' className='mx-2' />
        {route.name}
        {chapter.steps?.length > 0 && route && (
          <a href={route.path} className='ml-2'>
            <FontAwesomeIcon icon={faLink} size='xs' />
          </a>
        )}
      </>
    )
  );
}
