// Need to use the React-specific entry point to import createApi
import { Adventure } from '@/model/AdventureManager.class';
import { api, ApiTagsEnum } from '@/lib/services/api';

export const adventuresApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdventures: builder.query<Array<Adventure>, void>({
      query: () => ({
        url: '/adventures',
        method: 'GET',
      }),
      providesTags: [ApiTagsEnum.ADVENTURES],
    }),
    getAdventure: builder.query<Adventure, string>({
      query: (adventureSlug) => ({
        url: `/adventures/${adventureSlug}`,
        method: 'GET',
      }),
      providesTags: [ApiTagsEnum.ONE_ADVENTURE],
    }),
    setAdventure: builder.mutation<Adventure, Adventure>({
      query: (adventure) => ({
        url: `/adventures/${adventure.adventureSlug}`,
        method: 'POST',
        body: adventure,
      }),
      invalidatesTags: [ApiTagsEnum.ONE_ADVENTURE],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAdventuresQuery, useGetAdventureQuery, useSetAdventureMutation } = adventuresApi;
