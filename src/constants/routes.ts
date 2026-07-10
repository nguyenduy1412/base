export const ROUTE_GROUPS = {
  AUTH: "/(auth)",
  TABS: "/(tabs)",
} as const;

export const TAB_ROUTES = {
  HOME: `${ROUTE_GROUPS.TABS}/home`,
  CHAT: `${ROUTE_GROUPS.TABS}/chat`,
  SETTING: `${ROUTE_GROUPS.TABS}/setting`,
  MAP: `${ROUTE_GROUPS.TABS}/map`,
} as const;

export const AUTH_ROUTES = {
  CHECK_YOUR_EMAIL: `${ROUTE_GROUPS.AUTH}/check-your-email`,
} as const;