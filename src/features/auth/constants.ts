import { makeRedirectUri } from "expo-auth-session";

const redirectUrl = makeRedirectUri({
  scheme: "base",
  path: "login-callback",
});

export const AUTH_REDIRECT_URL = `${redirectUrl.replace(/\/$/, "")}/`;
