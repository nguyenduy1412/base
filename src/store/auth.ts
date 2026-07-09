import { Platform } from "react-native";
import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export interface AuthState {
  user: User | null;
  session: Session | null;
}

export const auth$ = observable<AuthState>({
  user: null,
  session: null,
});

// Skip persistence during SSR (static output)
if (Platform.OS !== "web") {
  syncObservable(auth$, {
    persist: {
      name: "auth_state",
      plugin: ObservablePersistMMKV as any,
    },
  });
} else if (typeof window !== "undefined") {
  syncObservable(auth$, {
    persist: {
      name: "auth_state",
      plugin: ObservablePersistLocalStorage,
    },
  });
}

// Listen to Supabase auth state changes and sync them with Legend State
if (typeof window !== "undefined" || Platform.OS !== "web") {
  // Get initial session
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      auth$.session.set(session);
      auth$.user.set(session.user);
    } else {
      auth$.session.set(null);
      auth$.user.set(null);
    }
  });

  // Listen for auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      auth$.session.set(session);
      auth$.user.set(session.user);
    } else {
      auth$.session.set(null);
      auth$.user.set(null);
    }
  });
}
