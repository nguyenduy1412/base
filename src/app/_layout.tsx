import "../global.css";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useSelector } from "@legendapp/state/react";
import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider } from "react-native-teleport";
import { SafeAreaListener, EdgeInsets } from "react-native-safe-area-context";
import { Uniwind } from "uniwind";

import { AsyncFont } from "@/components/AsyncFont";
import { fontsToLoad } from "@/theme/fonts";
import { theme$ } from "@/store/theme";
import { messages as messagesEn } from "../locale/en/messages";
import { messages as messagesVi } from "../locale/vi/messages";
import { queryClient } from "@/lib/react-query";

// Initialize Lingui i18n
i18n.load({
  vi: messagesVi,
  en: messagesEn,
});
i18n.activate("vi");

SplashScreen.preventAutoHideAsync();

function SplashFallback() {
  useEffect(
    () => () => {
      SplashScreen.hideAsync();
    },
    [],
  );
  return null;
}

const TabLayout = () => {
  const colorScheme = useSelector(theme$.mode);
  const handleSafeAreaChange = useCallback(({ insets }: { insets: EdgeInsets }) => {
    Uniwind.updateInsets(insets);
  }, []);

  return (
    <Suspense fallback={<SplashFallback />}>
      {fontsToLoad.map(({ fontFamily, src }) => (
        <AsyncFont key={fontFamily} src={src} fontFamily={fontFamily} />
      ))}
      <SafeAreaListener onChange={handleSafeAreaChange}>
        <GestureHandlerRootView style={styles.container}>
          <QueryClientProvider client={queryClient}>
            <I18nProvider i18n={i18n}>
              <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                <PortalProvider>
                  <KeyboardProvider>
                    <BottomSheetModalProvider>
                      <Stack screenOptions={{ headerShown: false }} />
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

export default TabLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
