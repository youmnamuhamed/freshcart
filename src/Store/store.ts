"use client";
import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer, AuthState } from "./auth.slice";
import { cartReducer, CartState } from "@/features/Cart/Store/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { use } from "react";

export type PreLoadedState = {
  auth: AuthState;
  cart: CartState;
};

export function createStore(preloadedState: PreLoadedState) {
  const store = configureStore({
    reducer: {
      auth: AuthReducer,
      cart: cartReducer,
    },
    preloadedState,
  });
  return store;
}

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();