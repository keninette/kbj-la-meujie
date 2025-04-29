import { Session } from '@/model/sessions/Session.class';

export const SessionsApi = {
  getSession: async (params: { adventureUuid: string; storyArcUuid: string; sessionSlug: string }) => {
    const response = await fetch(`/api/sessions/${params.adventureUuid}/${params.storyArcUuid}/${params.sessionSlug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      return null;
    }
    return ((await response.json()) as Session) ?? null;
  },
  getStoryArcSessions: async (params: { adventureSlug: string; storyArcSlug: string }) => {
    const response = await fetch(`/api/sessions/${params.adventureSlug}/${params.storyArcSlug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      return [];
    }
    return ((await response.json()) as Session[]) ?? [];
  },
  createSession: async (params: { adventureSlug: string; storyArcSlug: string }, session: Session) => {
    const response = await fetch(`/api/sessions/${params.adventureSlug}/${params.storyArcSlug}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });

    if (![200, 201].includes(response.status)) {
      console.error(response);
      alert('error while saving session');
    } else {
      console.log('session saved successfully');
    }

    return await response.json();
  },
  updateSession: async (
    params: { adventureSlug: string; storyArcSlug: string; sessionSlug: string },
    session: Session,
  ) => {
    const response = await fetch(`/api/sessions/${params.adventureSlug}/${params.storyArcSlug}/${params.sessionSlug}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });

    if (![200, 201].includes(response.status)) {
      console.error(response);
      alert('error while saving session');
    } else {
      console.log('session saved successfully');
    }
  },
};
