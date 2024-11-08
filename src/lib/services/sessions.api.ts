import { api, ApiTagsEnum } from '@/lib/services/api';
import { Session } from '@/model/session/session.class';

export const sessionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query<Array<Session>, void>({
      query: () => ({
        url: '/sessions',
        method: 'GET',
      }),
      providesTags: [ApiTagsEnum.SESSIONS],
    }),
    saveSession: builder.mutation<Session, Session>({
      query: (sessionToSave) => ({
        url: '/sessions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionToSave),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetSessionsQuery, useSaveSessionMutation } = sessionsApi;
