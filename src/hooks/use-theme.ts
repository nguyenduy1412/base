

import { useCSSVariable } from "uniwind";

export function useTheme() {
  const [
    text = "#000000",
    background = "#ffffff",
    backgroundElement = "#F0F0F3",
    backgroundSelected = "#E0E1E6",
    textSecondary = "#60646C",
  ] = useCSSVariable([
    "--color-text",
    "--color-background",
    "--color-background-element",
    "--color-background-selected",
    "--color-text-secondary",
  ]) as [
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined,
  ];

  return {
    text,
    background,
    backgroundElement,
    backgroundSelected,
    textSecondary,
  };
}
