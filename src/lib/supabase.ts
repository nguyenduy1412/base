import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import { createMMKV } from "react-native-mmkv";

import { Platform } from "react-native";

const isServer = typeof window === "undefined";

const storage = !isServer ? createMMKV({ id: "supabase-auth-storage" }) : null;

const supabaseStorage = {
  getItem: (key: string) => {
    if (isServer) return null;
    return storage?.getString(key) ?? null;
  },
  setItem: (key: string, value: string) => {
    if (isServer) return;
    storage?.set(key, value);
  },
  removeItem: (key: string) => {
    if (isServer) return;
    storage?.remove(key);
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: supabaseStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === "web",
  },
});
