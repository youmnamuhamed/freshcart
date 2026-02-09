import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer, AuthState } from "./auth.slice";

export type PreLoadedState = {
  auth: AuthState;
};

export function createStore(preloadedState: PreLoadedState) {
  const store = configureStore({
    reducer: {
      auth: AuthReducer,
    },
    preloadedState,
  });
  return store;
}

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;
