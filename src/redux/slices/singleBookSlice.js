import { api } from '../api/booksApi';

const singleBookApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getSingleBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'GET',
      }),
    }),
  }),
  providesTags: ['Books'],
});

export default singleBookApi;
export const { useGetSingleBookQuery } = singleBookApi;
