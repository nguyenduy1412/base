import { useCallback, useEffect, useState } from "react";
import {
  OTP_RESEND_COOLDOWN_SECONDS,
  getResendSecondsLeft,
  startResendCooldown,
} from "@/store/otpCooldown";

export const useResendCooldown = (email?: string) => {
  const [trackedEmail, setTrackedEmail] = useState(email);
  const [secondsLeft, setSecondsLeft] = useState(() =>
    getResendSecondsLeft(email),
  );

  if (email !== trackedEmail) {
    setTrackedEmail(email);
    setSecondsLeft(getResendSecondsLeft(email));
  }

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const id = setInterval(() => {
      setSecondsLeft(getResendSecondsLeft(email));
    }, 1000);

    return () => clearInterval(id);
  }, [email, secondsLeft]);

  const startCooldown = useCallback(
    (seconds: number = OTP_RESEND_COOLDOWN_SECONDS) => {
      if (!email) return;
      startResendCooldown(email, seconds);
      setSecondsLeft(seconds);
    },
    [email],
  );

  return { secondsLeft, isCoolingDown: secondsLeft > 0, startCooldown };
};
