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

export const verifyRegistrationOtp = async (email: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) throw error;
  return data;
};
