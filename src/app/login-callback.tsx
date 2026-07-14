import { ROUTE_GROUPS } from "@/constants/routes";
import { useAuthCallback } from "@/features/auth/hooks/useAuthCallback";
import { auth$ } from "@/store/auth";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Alert, View } from "react-native";

export default function LoginCallback() {
  const url = Linking.useLinkingURL();
  const handledUrls = useRef(new Set<string>());
  const { mutateAsync: createSession } = useAuthCallback();

  useEffect(() => {
    if (!url || handledUrls.current.has(url)) return;
    handledUrls.current.add(url);

    createSession(url)
      .then(() => {
        router.replace(
          auth$.user.get()?.id ? ROUTE_GROUPS.TABS : ROUTE_GROUPS.AUTH,
        );
      })
      .catch((error) => {
        const message =
          error instanceof Error ? error.message : "Unable to complete login.";
        Alert.alert("Login failed", message);
        router.replace(ROUTE_GROUPS.AUTH);
      });
  }, [createSession, url]);

  return <View className="flex-1 items-center justify-center bg-primary" />;
}
