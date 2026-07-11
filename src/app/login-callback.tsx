import { Text } from "@/components/Text";
import { supabase } from "@/lib/supabase";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { ActivityIndicator, Alert, Linking as NativeLinking, View } from "react-native";

export default function LoginCallback() {
  const url = Linking.useLinkingURL();
  const handledUrls = useRef(new Set<string>());

  const createSessionFromUrl = useCallback(async (callbackUrl: string | null) => {
    const isAuthCallback = callbackUrl?.startsWith("base://login-callback");
    if (!callbackUrl || !isAuthCallback || handledUrls.current.has(callbackUrl)) return;
    handledUrls.current.add(callbackUrl);

    try {
      const { params, errorCode } = QueryParams.getQueryParams(callbackUrl);
      if (errorCode) throw new Error(params.error_description ?? errorCode);

      const { access_token, refresh_token, code } = params;

      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        if (error) throw error;
      } else if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) throw error;
      } else {
        throw new Error("No authentication token was found in the callback URL.");
      }

      router.replace("/(tabs)");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to complete login.";
      Alert.alert("Login failed", message);
      router.replace("/(auth)");
    }
  }, []);

  useEffect(() => {
    void createSessionFromUrl(url);
  }, [createSessionFromUrl, url]);

  useEffect(() => {
    const readInitialUrl = async () => {
      const initialUrl = await NativeLinking.getInitialURL();
      await createSessionFromUrl(initialUrl);
    };

    void readInitialUrl();

    const subscription = NativeLinking.addEventListener("url", ({ url: incomingUrl }) => {
      void createSessionFromUrl(incomingUrl);
    });

    return () => subscription.remove();
  }, [createSessionFromUrl]);

  return (
    <View className="flex-1 items-center justify-center gap-3 bg-background">
      <ActivityIndicator size="large" />
      <Text variant="body14Regular">Signing you in...</Text>
    </View>
  );
}
