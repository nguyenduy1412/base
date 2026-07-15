import { makeRedirectUri } from "expo-auth-session";

export const getAuthRedirectUrl = () => {
  const redirectUrl = makeRedirectUri({
    scheme: "base",
    path: "login-callback",
  });

  return `${redirectUrl.replace(/\/$/, "")}/`;
};

export const AUTH_REDIRECT_URL = getAuthRedirectUrl();

export const parseUrlParams = (url: string) => {
  const params: Record<string, string> = {};
  const parts = url.split(/[#?]/);

  if (parts.length > 1) {
    const queryString = parts[parts.length - 1];
    const pairs = queryString.split("&");

    for (const pair of pairs) {
      const [key, value] = pair.split("=");
      if (key && value) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    }
  }

  return params;
};
