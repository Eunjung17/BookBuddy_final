import { api } from "../api";

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({

    getSingleUser: builder.query({
        query: (token)=> ({
            url: `/users/me`,
            method:"GET",
            headers: {
              'Content-Type': 'application/json',  
              'Authorization' : `Bearer ${token}`,
          },
        }),
        providesTags:["Books"],
    }),

      loginUser: builder.mutation({
        query: (value) => ({
            url:"/users/login",
            method: "POST",
            body: {
                email: value.email,
                password: value.password,
            },
            invalidatesTags: ["Books"],
        }),
      }),
  
      addUser: builder.mutation({
        query: (value) => ({
            url:"/users/register",
            method: "POST",
            body: {
                firstname: value.firstName,
                lastname: value.lastName,
                email: value.email,
                password: value.password,
            },
          }),
          invalidatesTags: ["Books"],
      }),
    }),
  
  });
  
  export const { useGetSingleUserQuery, useLoginUserMutation, useAddUserMutation } = userApi;



