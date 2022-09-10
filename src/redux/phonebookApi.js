import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const phonebookApi = createApi({
  reducerPath: 'phonebookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().phonebook.token;
      token && headers.set('authorization', `${token}`);
      return headers;
    },
  }),
  endpoints: builder => ({
    signUp: builder.mutation({
      query: body => ({
        url: '/users/signup',
        method: 'POST',
        body,
      }),
    }),
    logIn: builder.mutation({
      query: body => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),
    getCurrentUser: builder.query({
      query: () => '/users/current',
    }),
    getContacts: builder.query({
      query: () => '/contacts',
    }),
    addContact: builder.mutation({
      query: body => ({
        url: '/contacts',
        method: 'POST',
        body,
      }),
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useSignUpMutation,
  useLogInMutation,
  useLogOutMutation,
  useGetCurrentUserQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = phonebookApi;
