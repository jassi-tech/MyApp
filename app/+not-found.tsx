import { Stack } from "expo-router";
import React from "react";

import NotFound from "@/components/common/not-found";

export default function RootNotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
      <NotFound />
    </>
  );
}
