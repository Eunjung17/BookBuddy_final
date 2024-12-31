import { api } from '../api';

const singleBookApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getSingleBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'GET',
      }),
      providesTags: ['Books'],
    }),

    updateBookAvailability: builder.mutation({
      query: (value)=>({
        url: `/books/${value.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${value.token}`,
        },
        body: {
          available : false,
        },
      }),
      invalidatesTags: ['Books'],
    }),


  }),
});

export default singleBookApi;
export const { useUpdateBookAvailabilityMutation, useGetSingleBookQuery } = singleBookApi;
