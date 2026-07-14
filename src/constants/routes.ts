export const ROUTE_GROUPS = {
  AUTH: "/(auth)",
  TABS: "/(tabs)",
} as const;

export const TAB_ROUTES = {
  HOME: `${ROUTE_GROUPS.TABS}`,
  SEARCH: `${ROUTE_GROUPS.TABS}/search`,
  CREATE: `${ROUTE_GROUPS.TABS}/create`,
  TROPHY: `${ROUTE_GROUPS.TABS}/trophy`,
  PROFILE: `${ROUTE_GROUPS.TABS}/profile`,
} as const;

export const AUTH_ROUTES = {
  CHECK_YOUR_EMAIL: `${ROUTE_GROUPS.AUTH}/check-your-email`,
  VERIFY_EMAIL: `${ROUTE_GROUPS.AUTH}/verify-email`,
} as const;
