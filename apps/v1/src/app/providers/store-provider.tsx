"use client";

import { Store, makeStore } from "@/app/store";

import { Provider } from "react-redux";
import { useRef } from "react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<Store | null>(null);
  if (storeRef.current === null) {
    storeRef.current = makeStore();
  }

  // Most likely a bug
  // eslint-disable-next-line react-hooks/refs
  return <Provider store={storeRef.current}>{children}</Provider>;
}
