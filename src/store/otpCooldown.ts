import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

export const OTP_RESEND_COOLDOWN_SECONDS = 60;

export const otpResend$ = observable<Record<string, number>>({});

syncObservable(otpResend$, {
  persist: {
    name: "otp_resend_cooldown",
    plugin: ObservablePersistMMKV as any,
  },
});

const keyOf = (email: string) =>
  email
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_");

export const getResendSecondsLeft = (email?: string): number => {
  if (!email) return 0;
  const endsAt = otpResend$[keyOf(email)].peek();
  if (!endsAt) return 0;
  const ms = endsAt - Date.now();
  return ms > 0 ? Math.ceil(ms / 1000) : 0;
};

export const startResendCooldown = (
  email: string,
  seconds: number = OTP_RESEND_COOLDOWN_SECONDS,
) => {
  otpResend$[keyOf(email)].set(Date.now() + seconds * 1000);
};

export const parseRateLimitSeconds = (error: unknown): number | null => {
  const status = (error as any)?.status;
  const code = (error as any)?.code;
  const message: string =
    error instanceof Error ? error.message : String(error ?? "");
  const isRateLimit =
    status === 429 ||
    code === "over_email_send_rate_limit" ||
    /rate limit|after \d+\s*seconds?/i.test(message);
  if (!isRateLimit) return null;
  const match = message.match(/(\d+)\s*seconds?/i);
  return match ? parseInt(match[1], 10) : OTP_RESEND_COOLDOWN_SECONDS;
};
