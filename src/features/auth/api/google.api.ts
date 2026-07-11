import { supabase } from "@/lib/supabase";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { AUTH_REDIRECT_URL } from "../constants";

WebBrowser.maybeCompleteAuthSession();

function parseUrlParams(url: string) {
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
}

export const loginWithGoogle = async () => {
  const isNative = Platform.OS !== "web";
  const redirectTo = isNative ? AUTH_REDIRECT_URL : window.location.origin;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      skipBrowserRedirect: isNative,
    },
  });

  if (error) {
    console.error("Google login error:", error.message);
    throw error;
  }

  if (isNative && data?.url) {
    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

    if (result.type === "success" && result.url) {
      const params = parseUrlParams(result.url);
      const { access_token, refresh_token } = params;

      if (access_token && refresh_token) {
        const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (sessionError) {
          throw sessionError;
        }

        return sessionData;
      }
    } else {
      return null;
    }
  }
  return data;
};
