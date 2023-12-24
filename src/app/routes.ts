import { RouteType } from '@/model/route.type';
import { AdventureType } from '@/model/adventure.type';
import { ChapterType } from '@/model/chapter.type';

const routes = {
  home: {
    name: '🏡 Home',
    path: '/',
  } as RouteType,
  adventure: {
    name: '{adventureName}',
    path: '/adventure/{slug}',
  } as RouteType,
  chapter: {
    name: '{chapterName}',
    path: '/adventure/{slug}/chapter/{id}',
  } as RouteType,
};

const getAdventureRoute = (adventure: AdventureType): RouteType => {
  return {
    name: routes.adventure.name.replace('{adventureName}', adventure.name),
    path: routes.adventure.path.replace('{slug}', adventure.id),
  };
};

const getChapterRoute = (chapter: ChapterType): RouteType => {
  return {
    name: routes.chapter.name.replace('{chapterName}', chapter.name),
    path: routes.chapter.path.replace('{id}', chapter.id),
  };
};

export default routes;
export { getAdventureRoute, getChapterRoute };
