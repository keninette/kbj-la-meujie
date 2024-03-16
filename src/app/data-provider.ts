import { Adventure } from '@/model/Adventure.class';
import { Session } from '@/model/session/session.class';
import { Player } from '@/model/session/player.class';

const getAdventures = async () => {
  return await fetch(`/api/adventures`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

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

const getSessions = async () => {
  return await fetch(`/api/sessions`, {
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

export {
  getAdventures,
  getAdventure,
  getChapter,
  saveAdventure,
  getSessions,
  getSession,
  getPLayers,
  saveSession,
  savePlayers,
};
