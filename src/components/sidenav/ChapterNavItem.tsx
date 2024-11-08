import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getChapterRoute, RouteType } from '@/app/routes';
import { useEffect, useState } from 'react';
import { getChapter } from '@/app/data-provider';
import { Chapter } from '@/model/adventure/story-arc/chapter/Chapter.class';
import { useSearchParams } from 'next/navigation';

type ChapterNavItemPropsType = {
  chapterUid: string;
};

export default function ChapterNavItem({ chapterUid }: ChapterNavItemPropsType) {
  const [chapter, setChapter] = useState<Chapter>();
  const [route, setRoute] = useState<RouteType>();
  const adventureSlug = chapterUid.split('|')[0];
  const storyArcSlug = chapterUid.split('|')[1];
  const chapterId = chapterUid.split('|')[2];
  const activeSessionUuid = useSearchParams().get('sessionUuid');

  useEffect(() => {
    (async function () {
      const response = await getChapter(adventureSlug, chapterId);
      if (response.status !== 200) {
        console.error(response.body);
      }
      const chapter: Chapter = await response.json();
      if (chapter) {
        setChapter(chapter);
        setRoute(getChapterRoute(chapter, adventureSlug, storyArcSlug));
      }
    })();
  }, [adventureSlug, chapterId]);

  return (
    chapter &&
    route && (
      <div>
        📚 {route.name}
        {chapter.steps?.length > 0 && route && (
          <a href={activeSessionUuid ? `${route.path}?sessionUuid=${activeSessionUuid}` : route.path} className='ml-2'>
            <FontAwesomeIcon icon={faLink} size='xs' />
          </a>
        )}
      </div>
    )
  );
}
