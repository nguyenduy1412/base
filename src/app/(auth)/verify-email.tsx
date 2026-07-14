import { VERIFY } from "@/assets/images";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import ImageComponent from "@/components/Image/ImageComponent";
import { Text } from "@/components/Text";
import OtpDigit, { OTP_LENGTH } from "@/features/auth/components/OtpDigit";
import { useResendOtp } from "@/features/auth/hooks/useResendOtp";
import { useVerifyOtp } from "@/features/auth/hooks/useVerifyOtp";
import { cn } from "@/utils/cn";
import { t } from "@lingui/core/macro";
import { router, useLocalSearchParams } from "expo-router";
import { TriangleAlert } from "lucide-react-native";
import React, { useCallback, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

const ErrorIcon = withUniwind(TriangleAlert);
const VerifyEmailScreen = () => {
  const params = useLocalSearchParams<{ email?: string; name?: string }>();
  const insets = useSafeAreaInsets();
  const email = Array.isArray(params.email) ? params.email[0] : params.email;
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { mutate: verifyOtp, isPending: isVerifying, isError } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  const handleCodeChange = useCallback((value: string) => {
    setCode(value.replace(/\D/g, "").slice(0, OTP_LENGTH));
  }, []);

  const handleFocusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleVerify = useCallback(() => {
    if (!email || code.length !== OTP_LENGTH || isVerifying) return;
    verifyOtp(
      { email, token: code },
      { onSuccess: () => router.replace("/onboarding/identity") },
    );
  }, [code, email, isVerifying, verifyOtp]);

  const handleResend = useCallback(() => {
    if (!email || isResending) return;
    resendOtp(
      { email, name: name ?? "" },
      {
        onSuccess: () =>
          Alert.alert(
            t`Code sent`,
            t`A new verification code has been sent to your email.`,
          ),
      },
    );
  }, [email, isResending, name, resendOtp]);

  const activeIndex = Math.min(code.length, OTP_LENGTH - 1);
  const isResendDisabled = !email || isResending;

  return (
    <KeyboardAwareScrollView
      bottomOffset={insets.bottom + 24}
      bounces={false}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-background pt-safe px-5"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <Header />

          <View className="flex-1 justify-center pb-40">
            <ImageComponent source={VERIFY} className="w-45 h-45 self-center" />
            <Text
              variant="heading32Semibold"
              className="text-center font-serif"
            >
              {t`Verify Your Mail`}
            </Text>
            <Text
              variant="caption14Regular"
              className="mt-3 text-center leading-5"
            >
              {t`Please enter the 6 digit code sent to`}
              {"\n"}
              <Text variant="caption14Semibold">{email ?? t`your email`}</Text>
            </Text>

            <Pressable
              onPress={handleFocusInput}
              className="relative mt-10 flex-row gap-2"
            >
              {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                <OtpDigit
                  key={index}
                  digit={code[index]}
                  index={index}
                  isLoading={isVerifying}
                  isActive={isFocused && index === activeIndex}
                  isError={isError}
                />
              ))}
              <TextInput
                ref={inputRef}
                value={code}
                onChangeText={handleCodeChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete="one-time-code"
                editable={!isVerifying}
                caretHidden
                maxLength={OTP_LENGTH}
                className="absolute inset-0 opacity-0"
              />
            </Pressable>
            {isError && (
              <View className="pt-5 flex-row gap-2">
                <ErrorIcon colorClassName="accent-error" size={16} />
                <Text variant="body12Regular" className="text-error">
                  {t`Incorrect code. Please try again.`}
                </Text>
              </View>
            )}
            <Button
              title={t`Verify`}
              variant="body16Semibold"
              onPress={handleVerify}
              disabled={code.length !== OTP_LENGTH}
              isLoading={isVerifying}
              className="mt-5 h-12 w-full rounded-xl"
            />

            <View className="mt-4 flex-row justify-center">
              <Text variant="caption14Regular">{t`Didn't get a code? `}</Text>
              <Pressable
                disabled={isResendDisabled}
                onPress={handleResend}
                hitSlop={8}
              >
                <Text
                  variant="caption14Semibold"
                  className={cn(
                    isResendDisabled ? "text-placeholder" : "text-yellow",
                  )}
                >
                  {isResending ? t`Sending...` : t`Resend`}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default VerifyEmailScreen;
