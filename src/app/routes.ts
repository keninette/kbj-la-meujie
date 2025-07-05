import { Adventure } from '@/model/Adventure.class';
import { Chapter } from '@/model/adventure/story-arc/chapter/Chapter.class';

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
    path: '/game-master/adventure/{adventureSlug}',
  } as RouteType,
  chapter: {
    name: '{chapterName}',
    path: '/game-master/adventure/{adventureSlug}/chapter/{id}',
  } as RouteType,
  editAdventure: {
    name: 'Edit {adventureName}',
    path: '/game-master/edit/{adventureSlug}',
  } as RouteType,
  newAdventure: {
    name: 'Nouvelle aventure',
    path: '/game-master/edit/new',
  } as RouteType,
};

const getAdventureRoute = (adventure: Adventure): RouteType => {
  // todo handle empty
  return {
    name: routes.adventure.name.replace('{adventureName}', adventure.name || ''),
    path: routes.adventure.path.replace('{adventureSlug}', adventure.adventureSlug || ''),
  };
};

const getEditAdventureRoute = (adventure: Adventure): RouteType => {
  // todo handle empty
  return {
    name: routes.editAdventure.name.replace('{adventureName}', adventure.name || ''),
    path: routes.editAdventure.path.replace('{adventureSlug}', adventure.adventureSlug || ''),
  };
};

const getChapterRoute = (chapter: Chapter, adventureSlug: string): RouteType => {
  return {
    name: routes.chapter.name.replace('{chapterName}', chapter.name || ''),
    path: routes.chapter.path.replace('{adventureSlug}', adventureSlug).replace('{id}', chapter.id || ''),
  };
};

export default routes;
export { getAdventureRoute, getEditAdventureRoute, getChapterRoute };
