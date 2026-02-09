"use client";

import { AppStore, PreLoadedState } from "@/Store/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { createStore } from "@/Store/store";

type providerProps = { children: ReactNode; preloadedState: PreLoadedState };

export default function Providers({ children, preloadedState }: providerProps) {
  const storeRef = useRef<null | AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = createStore(preloadedState);
  }

  return (
    <>
      <Provider store={storeRef.current}>{children}</Provider>
    </>
  );
}
