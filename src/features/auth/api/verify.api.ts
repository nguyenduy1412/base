import { supabase } from "@/lib/supabase";

export const verifyRegistrationOtp = async (email: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) throw error;
  return data;
};
