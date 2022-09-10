import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { phonebookApi } from './phonebookApi';

const initialState = {
  contacts: [],
  user: {},
  token: '',
};

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  extraReducers: builder => {
    builder
      .addMatcher(
        phonebookApi.endpoints.signUp.matchFulfilled,
        (state, action) => {
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addMatcher(phonebookApi.endpoints.signUp.matchRejected, () => {
        toast.error('Oops, something went wrong! Check the fields!');
      })
      .addMatcher(
        phonebookApi.endpoints.logIn.matchFulfilled,
        (state, action) => {
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addMatcher(phonebookApi.endpoints.logIn.matchRejected, () => {
        toast.error('Oops, something went wrong!');
        setTimeout(() => {
          toast.warn('Do you have an account at all?');
        }, 1500);
      })
      .addMatcher(phonebookApi.endpoints.logOut.matchFulfilled, state => {
        state.contacts = [];
        state.user = {};
        state.token = '';
      })
      .addMatcher(
        phonebookApi.endpoints.getCurrentUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        }
      )
      .addMatcher(
        phonebookApi.endpoints.getContacts.matchFulfilled,
        (state, action) => {
          state.contacts = action.payload;
        }
      )
      .addMatcher(
        phonebookApi.endpoints.addContact.matchFulfilled,
        (state, action) => {
          state.contacts.push(action.payload);
        }
      )
      .addMatcher(
        phonebookApi.endpoints.deleteContact.matchFulfilled,
        (state, action) => {
          state.contacts = state.contacts.filter(
            contact => contact.id !== action.meta.arg.originalArgs
          );
        }
      );
  },
});

export default phonebookSlice.reducer;
