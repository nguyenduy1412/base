import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { ROUTE_GROUPS } from "@/constants/routes";
import { useAuthCallback } from "@/features/auth/hooks/useAuthCallback";
import { auth$ } from "@/store/auth";
import { t } from "@lingui/core/macro";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";

export default function LoginCallback() {
  const url = Linking.useLinkingURL();
  const handledUrls = useRef(new Set<string>());
  const { mutateAsync: createSession } = useAuthCallback();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        setErrorMessage(
          error instanceof Error
            ? error.message
            : t`Unable to complete login.`,
        );
      });
  }, [createSession, url]);

  if (errorMessage) {
    return (
      <View className="flex-1 items-center justify-center gap-4 bg-background px-8">
        <Text variant="caption14Regular" className="text-center text-error">
          {errorMessage}
        </Text>
        <Button
          title={t`Back to Sign In`}
          onPress={() => router.replace(ROUTE_GROUPS.AUTH)}
          className="h-12 w-full rounded-xl"
        />
      </View>
    );
  }

  return <View className="flex-1 items-center justify-center bg-primary" />;
}
