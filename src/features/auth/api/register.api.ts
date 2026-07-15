import { supabase } from "@/lib/supabase";
import { SignUpFormValues } from "../types";
import { AUTH_REDIRECT_URL } from "../constants";

export const register = async (data: SignUpFormValues) => {
  const { data: authData, error } = await supabase.auth.signInWithOtp({
    email: data.email,
    options: {
      emailRedirectTo: AUTH_REDIRECT_URL,
      shouldCreateUser: true,
      data: { name: data.name },
    },
  });

  if (error) {
    throw error;
  }

  return authData;
};
