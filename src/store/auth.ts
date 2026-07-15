import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
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

syncObservable(auth$, {
  persist: {
    name: "auth_state",
    plugin: ObservablePersistMMKV as any,
  },
});

supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    auth$.session.set(session);
    auth$.user.set(session.user);
  } else {
    auth$.session.set(null);
    auth$.user.set(null);
  }
});

supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    auth$.session.set(session);
    auth$.user.set(session.user);
  } else {
    auth$.session.set(null);
    auth$.user.set(null);
  }
});
