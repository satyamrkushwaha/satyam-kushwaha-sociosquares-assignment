import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (builder) => ({
      registerUser: builder.mutation({
        query: (newUser) => ({
          url: 'users',
          method: 'POST',
          body: newUser,
        }),
      }),
      fetchUsers: builder.query({
        query: () => 'users',
      }),
    }),
  });
  
  export const { useRegisterUserMutation, useFetchUsersQuery } = userApi;