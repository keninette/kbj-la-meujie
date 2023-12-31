import { Adventure } from '@/model/Adventure.class';
import { Chapter } from '@/model/Chapter.class';

export type RouteType = {
  name: string;
  path: string;
};

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

const getAdventureRoute = (adventure: Adventure): RouteType => {
  // todo handle empty
  return {
    name: routes.adventure.name.replace('{adventureName}', adventure.name || ''),
    path: routes.adventure.path.replace('{slug}', adventure.slug || ''),
  };
};

const getChapterRoute = (chapter: Chapter, adventureSlug: string): RouteType => {
  return {
    name: routes.chapter.name.replace('{chapterName}', chapter.name || ''),
    path: routes.chapter.path.replace('{slug}', adventureSlug).replace('{id}', chapter.id || ''),
  };
};

export default routes;
export { getAdventureRoute, getChapterRoute };
