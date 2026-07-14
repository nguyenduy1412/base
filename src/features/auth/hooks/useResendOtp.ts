import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { t } from "@lingui/core/macro";
import { register } from "../api/register.api";
import { SignUpFormValues } from "../types";

export const useResendOtp = () => {
  return useMutation({
    mutationFn: (data: SignUpFormValues) => register(data),
    onError: (error: any) => {
      console.error("Resend OTP error:", error);
      Alert.alert(
        t`Lỗi`,
        error.message || t`Không thể gửi lại mã. Vui lòng thử lại.`,
      );
    },
  });
};
