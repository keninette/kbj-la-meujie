import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from '@/lib/services/api';
import adventuresReducer from '@/lib/store/adventures/adventures.reducer';
import sessionsReducer from '@/lib/store/sessions/sessions.reducer';
import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const combinedReducers = combineReducers({
  [api.reducerPath]: api.reducer,
  adventuresState: adventuresReducer,
  sessionsState: sessionsReducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });

export const makeStore = () => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistedReducer = persistReducer(persistConfig, combinedReducers);
    let store: any = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(api.middleware),
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
