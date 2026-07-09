import { Platform } from "react-native";
import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import { Uniwind } from "uniwind";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

export type ThemeMode = "light" | "dark";

// Wrap in object so legend-state serializes as valid JSON: {"mode":"light"}
export const theme$ = observable<{ mode: ThemeMode }>({ mode: "light" });

// Skip persistence during SSR (static output) — localStorage/MMKV don't exist on the server.
if (Platform.OS !== "web") {
  syncObservable(theme$, {
    persist: {
      name: "theme_mode",
      plugin: ObservablePersistMMKV as any,
    },
  });
} else if (typeof window !== "undefined") {
  syncObservable(theme$, {
    persist: {
      name: "theme_mode",
      plugin: ObservablePersistLocalStorage,
    },
  });
}

theme$.mode.onChange(({ value }) => {
  if (value === "light" || value === "dark") {
    Uniwind.setTheme(value);
  }
});

const current = theme$.mode.get();
if (current === "light" || current === "dark") {
  Uniwind.setTheme(current);
}

export const setTheme = (mode: ThemeMode) => theme$.mode.set(mode);
export const toggleTheme = () =>
  theme$.mode.set(theme$.mode.get() === "light" ? "dark" : "light");
