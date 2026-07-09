import { type ButtonColor } from "./types";

export const colorClassMap: Record<ButtonColor, string> = {
  primary: "bg-primary",
  text: "bg-text",
  background: "bg-background",
  "background-element": "bg-background-element",
  "background-selected": "bg-background-selected",
  "text-secondary": "bg-text-secondary",
  "login-button": "bg-login-button",
  white: "bg-white",
  blue: "bg-blue",
};

export const isCloseToWhite = (hex: string): boolean => {
  try {
    let c = hex.replace(/^\s*#|\s*$/g, "");
    if (c.length === 3) {
      c = c.replace(/(.)/g, "$1$1");
    }
    if (c.length !== 6) {
      return false;
    }
    const num = parseInt(c, 16);
    if (isNaN(num)) return false;
    const r = num >> 16;
    const g = (num >> 8) & 0x00ff;
    const b = num & 0x0000ff;

    // Perceived brightness formula
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    return brightness > 220;
  } catch {
    return false;
  }
};

export const getShadowClass = (
  color: ButtonColor,
  isDark: boolean,
  colorHex?: string,
): string => {
  const hex = colorHex || fallbackColors[color] || "#ffffff";
  if (isCloseToWhite(hex)) {
    return "shadow-black/20";
  }

  if (
    !isDark &&
    (color === "background" ||
      color === "background-element" ||
      color === "background-selected")
  ) {
    return "shadow-black/20";
  }

  if (isDark && color === "background") {
    return "shadow-black/20";
  }

  const shadowOpacityMap: Record<ButtonColor, string> = {
    primary: "shadow-primary/55",
    text: "shadow-text/55",
    background: "shadow-background/55",
    "background-element": "shadow-background-element/55",
    "background-selected": "shadow-background-selected/55",
    "text-secondary": "shadow-text-secondary/55",
    "login-button": "shadow-login-button/55",
    white: "shadow-white/55",
    blue: "shadow-blue/55",
  };

  return shadowOpacityMap[color];
};

export const fallbackColors: Record<ButtonColor, string> = {
  primary: "#E23A36",
  text: "#4B2416",
  background: "#FFF7EC",
  "background-element": "#FFF0DF",
  "background-selected": "#F6E4D2",
  "text-secondary": "#8B6A58",
  "login-button": "#f87b80",
  white: "#ffffff",
  blue: "#5a87e0",
};

export const darkenColor = (hex: string, percent: number = 0.25): string => {
  let c = hex.replace(/^\s*#|\s*$/g, "");
  if (c.length === 3) {
    c = c.replace(/(.)/g, "$1$1");
  }
  const num = parseInt(c, 16);
  let r = (num >> 16) - Math.round(255 * percent);
  let g = ((num >> 8) & 0x00ff) - Math.round(255 * percent);
  let b = (num & 0x0000ff) - Math.round(255 * percent);

  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};
