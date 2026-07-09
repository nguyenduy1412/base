import { supabase } from "@/lib/supabase";
import { LoginFormValues } from "../types";

export const login = async (data: LoginFormValues) => {
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    throw error;
  }

  return authData;
};
