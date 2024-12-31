import { api } from "../api";

const reservationsApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getReservations: builder.query({
            query: (token)=> ({
                url: `/reservations`,
                method:"GET",
                headers: {
                'Content-Type': 'application/json',  
                'Authorization' : `Bearer ${token}`,
            },
            }),
            providesTags:["Books"],
        }),

        deleteReservation: builder.mutation({
            query: (value) => ({
              url: `/reservations/${value.reservationId}`,
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json',  
                'Authorization' : `Bearer ${value.token}`,
            },
            }),
            invalidatesTags:["Books"],
          }),

    }),
  
  });
  
  export const { useGetReservationsQuery, useDeleteReservationMutation } = reservationsApi;



