import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import phonebookReducer from './phonebookSlice';
import { phonebookApi } from './phonebookApi';

const persistConfig = {
  key: 'phonebook',
  version: 1,
  storage,
  whitelist: ['token'],
  blacklist: [phonebookApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, phonebookReducer);

export const store = configureStore({
  reducer: {
    phonebook: persistedReducer,
    [phonebookApi.reducerPath]: phonebookApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(phonebookApi.middleware),
});

export const persistor = persistStore(store);
