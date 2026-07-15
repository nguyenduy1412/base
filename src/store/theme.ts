import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import { Uniwind } from "uniwind";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

export type ThemeMode = "light" | "dark";

export const theme$ = observable<{ mode: ThemeMode }>({ mode: "light" });

syncObservable(theme$, {
  persist: {
    name: "theme_mode",
    plugin: ObservablePersistMMKV as any,
  },
});

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
