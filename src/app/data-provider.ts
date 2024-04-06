import { Adventure } from '@/model/Adventure.class';
import { Session } from '@/model/session/session.class';

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
const getChapter = async (slug: string, id: string) => {
  return await fetch(`/api/adventures/${slug}/chapters/${id}`, {
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

// todo create getAdventure

const saveAdventure = async (adventure?: Adventure) => {
  return await fetch(`/api/adventures`, {
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

export { getAdventures, getAdventure, getChapter, saveAdventure, getSessions, saveSession };
