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
    path: '/game-master/adventure/{slug}',
  } as RouteType,
  chapter: {
    name: '{chapterName}',
    path: '/game-master/adventure/{slug}/chapter/{id}',
  } as RouteType,
  editAdventure: {
    name: 'Edit {adventureName}',
    path: '/game-master/edit/{slug}',
  },
};

const getAdventureRoute = (adventure: Adventure): RouteType => {
  // todo handle empty
  return {
    name: routes.adventure.name.replace('{adventureName}', adventure.name || ''),
    path: routes.adventure.path.replace('{slug}', adventure.slug || ''),
  };
};

const getEditAdventureRoute = (adventure: Adventure): RouteType => {
  // todo handle empty
  return {
    name: routes.editAdventure.name.replace('{adventureName}', adventure.name || ''),
    path: routes.editAdventure.path.replace('{slug}', adventure.slug || ''),
  };
};

const getChapterRoute = (chapter: Chapter, adventureSlug: string): RouteType => {
  return {
    name: routes.chapter.name.replace('{chapterName}', chapter.name || ''),
    path: routes.chapter.path.replace('{slug}', adventureSlug).replace('{id}', chapter.id || ''),
  };
};

export default routes;
export { getAdventureRoute, getEditAdventureRoute, getChapterRoute };
