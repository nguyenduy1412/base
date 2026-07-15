import "../global.css";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useSelector } from "@legendapp/state/react";
import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from "expo-router";
import { Suspense, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider } from "react-native-teleport";
import { SafeAreaListener, EdgeInsets } from "react-native-safe-area-context";
import { Uniwind } from "uniwind";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { fontsMap } from "@/theme/fonts";
import { theme$ } from "@/store/theme";
import { messages as messagesEn } from "../locale/en/messages";
import { messages as messagesVi } from "../locale/vi/messages";
import { queryClient } from "@/lib/react-query";

i18n.load({
  vi: messagesVi,
  en: messagesEn,
});
i18n.activate("en");

SplashScreen.preventAutoHideAsync();

const optionStack = {
  headerShown: false,
  animation: "fade",
} as const;

const RootLayout = () => {
  const colorScheme = useSelector(theme$.mode);
  const [fontsLoaded, fontError] = useFonts(fontsMap);

  const handleSafeAreaChange = useCallback(
    ({ insets }: { insets: EdgeInsets }) => {
      Uniwind.updateInsets(insets);
    },
    [],
  );

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Suspense fallback={<View className="flex-1 bg-primary" />}>
      <SafeAreaListener onChange={handleSafeAreaChange}>
        <GestureHandlerRootView style={styles.container}>
          <QueryClientProvider client={queryClient}>
            <I18nProvider i18n={i18n}>
              <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
              >
                <PortalProvider>
                  <KeyboardProvider>
                    <StatusBar style="light" />
                    <BottomSheetModalProvider>
                      <Stack
                        screenOptions={optionStack}
                        initialRouteName="index"
                      >
                        <Stack.Screen name="index" options={optionStack} />
                        <Stack.Screen name="(auth)" options={optionStack} />
                        <Stack.Screen name="(tabs)" options={optionStack} />
                        <Stack.Screen
                          name="onboarding"
                          options={optionStack}
                        />
                        <Stack.Screen
                          name="login-callback"
                          options={optionStack}
                        />
                      </Stack>
                    </BottomSheetModalProvider>
                  </KeyboardProvider>
                </PortalProvider>
              </ThemeProvider>
            </I18nProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </SafeAreaListener>
    </Suspense>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
