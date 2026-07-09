import { supabase } from "@/lib/supabase";
import { RegisterFormValues } from "../types";

export const register = async (data: RegisterFormValues) => {
  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    throw error;
  }

  return authData;
};
