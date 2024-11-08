// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export enum ApiTagsEnum {
  ADVENTURES = 'ADVENTURES',
  SESSIONS = 'SESSIONS',
  ONE_ADVENTURE = 'ONE_ADVENTURE',
  ONE_SESSION = 'ONE_SESSION',
}

// initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: Object.values(ApiTagsEnum),
  endpoints: () => ({}),
});
