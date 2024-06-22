import { Adventure } from '@/model/AdventureManager.class';
import { Session } from '@/model/session/session.class';
import { Chapter } from '@/model/adventure/story-arc/chapter/Chapter.class';

export type RouteType = {
  name: string;
  path: string;
};

// todo fix routes
const routes = {
  home: {
    name: '🏡 Home',
    path: '/',
  } as RouteType,
  adventure: {
    name: '{adventureName}',
    path: '/game-master/adventures/{adventureSlug}',
  } as RouteType,
  chapter: {
    name: '{chapterName}',
    path: '/game-master/adventures/{adventureSlug}/story-arcs/{storyArcSlug}/chapters/{id}',
  } as RouteType,
  editAdventure: {
    name: 'Edit {adventureName}',
    path: '/game-master/edit/{adventureSlug}',
  } as RouteType,
  newAdventure: {
    name: 'Nouvelle aventure',
    path: '/game-master/edit/new',
  } as RouteType,
  editSession: {
    name: 'Éditer la sessions',
    path: '/game-master/sessions/{adventureSlug}/{uuid}/edit',
  },
};

const getAdventureRoute = (adventure: Adventure, session?: Session): RouteType => {
  // todo handle empty
  const route = {
    name: routes.adventure.name.replace('{adventureName}', adventure.name || ''),
    path: routes.adventure.path.replace('{adventureSlug}', adventure.adventureSlug || ''),
  };

  if (session) {
    route.path += `?sessionUuid=${session.uuid}`;
  }
  return route;
};

const getEditAdventureRoute = (adventure: Adventure): RouteType => {
  // todo handle empty
  return {
    name: routes.editAdventure.name.replace('{adventureName}', adventure.name || ''),
    path: routes.editAdventure.path.replace('{adventureSlug}', adventure.adventureSlug || ''),
  };
};

const getChapterRoute = (
  chapter: Chapter,
  adventureSlug: string,
  storyArcSlug: string,
  sessionUuid?: string,
): RouteType => {
  const route = {
    name: routes.chapter.name.replace('{chapterName}', chapter.name || ''),
    path: routes.chapter.path
      .replace('{adventureSlug}', adventureSlug)
      .replace('{storyArcSlug}', storyArcSlug)
      .replace('{id}', chapter.id || ''),
  };

  if (sessionUuid) {
    route.path += `?sessionUuid=${sessionUuid}`;
  }

  return route;
};

const getEditSessionRoute = (session: Session): RouteType => {
  return {
    name: routes.editSession.name,
    path: routes.editSession.path
      .replace('{adventureSlug}', session.adventure.adventureSlug || '')
      .replace('{uuid}', session.uuid),
  };
};

export default routes;
export { getAdventureRoute, getEditAdventureRoute, getChapterRoute, getEditSessionRoute };
