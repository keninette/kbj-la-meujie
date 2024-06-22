import { Adventure } from '@/model/AdventureManager.class';
import { Session } from '@/model/session/session.class';
import { Player } from '@/model/session/player.class';

const getAdventure = async (slug: string) => {
  return await fetch(`/api/adventures/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
const getChapter = async (adventureSlug: string, chapterId: string) => {
  return await fetch(`/api/adventures/${adventureSlug}/chapters/${chapterId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const getSession = async (adventureSlug: string, uuid: string) => {
  return await fetch(`/api/sessions/${adventureSlug}/${uuid}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const getPLayers = async () => {
  return await fetch('/api/players/', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const saveAdventure = async (adventure: Adventure) => {
  return await fetch(`/api/adventures/${adventure.adventureSlug}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adventure),
  });
};

const saveSession = async (session: Session) => {
  return await fetch(`/api/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(session),
  });
};

const savePlayers = async (players: Player[]) => {
  return await fetch(`/api/players`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(players),
  });
};

export { getAdventure, getChapter, saveAdventure, getSession, getPLayers, saveSession, savePlayers };
