import { useMutation } from "@tanstack/react-query";
import { verifyRegistrationOtp } from "../api/verify.api";

type VerifyOtpParams = {
  email: string;
  token: string;
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: ({ email, token }: VerifyOtpParams) =>
      verifyRegistrationOtp(email, token),
  });
};
