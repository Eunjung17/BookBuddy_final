import { api } from "../api";

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
        query: () => ({
          url: "/books",
          method: "GET",
        }),
    }),
    providesTags: ["Books"],
  }),
});

export const { useGetBooksQuery } = booksApi;