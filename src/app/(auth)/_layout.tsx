import { Redirect, Stack } from "expo-router";
import { useSelector } from "@legendapp/state/react";
import { auth$ } from "@/store/auth";

const AuthLayout = () => {
  const user = useSelector(auth$.user);

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
