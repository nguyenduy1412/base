import { auth$ } from "@/store/auth";
import { useSelector } from "@legendapp/state/react";
import { Redirect } from "expo-router";

const RootIndex = () => {
  const user = useSelector(auth$.user);

  if (!user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/onboarding/identity" />;
};

export default RootIndex;
