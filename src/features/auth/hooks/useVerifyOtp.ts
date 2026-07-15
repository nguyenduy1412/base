import { useMutation } from "@tanstack/react-query";
import { verifyRegistrationOtp } from "../api/verify.api";

type VerifyOtpParams = {
  email: string;
  token: string;
};

const MIN_VERIFY_DURATION_MS = 2000;

const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, Math.max(ms, 0)));

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async ({ email, token }: VerifyOtpParams) => {
      const startedAt = Date.now();

      try {
        const result = await verifyRegistrationOtp(email, token);
        await wait(MIN_VERIFY_DURATION_MS - (Date.now() - startedAt));
        return result;
      } catch (error) {
        await wait(MIN_VERIFY_DURATION_MS - (Date.now() - startedAt));
        throw error;
      }
    },
  });
};
