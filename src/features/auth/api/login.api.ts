import { supabase } from "@/lib/supabase";
import { SignInFormValues } from "../types";
import { AUTH_REDIRECT_URL } from "../constants";

export const login = async (data: SignInFormValues) => {
  const { data: authData, error } = await supabase.auth.signInWithOtp({
    email: data.email,
    options: {
      emailRedirectTo: AUTH_REDIRECT_URL,
      shouldCreateUser: false,
    },
  });

  if (error) {
    throw error;
  }

  return authData;
};
