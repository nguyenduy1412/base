import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { Text } from "@/components/Text";
import { register, verifyRegistrationOtp } from "@/features/auth/api/register.api";
import { colors } from "@/theme/colors";
import { t } from "@lingui/core/macro";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Pressable, TextInput, View } from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OTP_LENGTH = 6;
const VERIFY_TEST_DELAY_MS = 20_000;

type OtpDigitProps = {
  digit?: string;
  index: number;
  isLoading: boolean;
};

const OtpDigit = ({ digit, index, isLoading }: OtpDigitProps) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    cancelAnimation(opacity);

    if (!isLoading) {
      opacity.value = withTiming(1, { duration: 150 });
      return;
    }

    opacity.value = 0.4;
    opacity.value = withRepeat(
      withSequence(
        withDelay(index * 60, withTiming(1, { duration: 60 })),
        withTiming(0.4, { duration: 180 }),
        withDelay((OTP_LENGTH - index - 1) * 60, withTiming(0.4, { duration: 0 })),
      ),
      -1,
    );

    return () => cancelAnimation(opacity);
  }, [index, isLoading, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View style={animatedStyle}>
      <Text className={digit ? "text-[24px]" : "text-[24px] text-border"}>{digit ?? "–"}</Text>
    </Animated.View>
  );
};

const VerifyEmailScreen = () => {
  const params = useLocalSearchParams<{ email?: string; name?: string }>();
  const { top } = useSafeAreaInsets();

  const email = Array.isArray(params.email) ? params.email[0] : params.email;
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleCodeChange = useCallback((value: string) => {
    setCode(value.replace(/\D/g, "").slice(0, OTP_LENGTH));
  }, []);

  const handleVerify = useCallback(async () => {
    if (!email || code.length !== OTP_LENGTH || isVerifying) return;
    try {
      setIsVerifying(true);
      await new Promise((resolve) => setTimeout(resolve, VERIFY_TEST_DELAY_MS));
      await verifyRegistrationOtp(email, code);
      router.replace("/onboarding/identity");
    } catch (error) {
      Alert.alert(t`Invalid code`, error instanceof Error ? error.message : t`Please check the code and try again.`);
    } finally {
      setIsVerifying(false);
    }
  }, [code, email, isVerifying]);

  const handleResend = useCallback(async () => {
    if (!email || isResending) return;
    try {
      setIsResending(true);
      await register({ email, name: name ?? "" });
      Alert.alert(t`Code sent`, t`A new verification code has been sent to your email.`);
    } catch (error) {
      Alert.alert(t`Unable to resend code`, error instanceof Error ? error.message : t`Please try again.`);
    } finally {
      setIsResending(false);
    }
  }, [email, isResending, name]);

  const activeIndex = Math.min(code.length, OTP_LENGTH - 1);

  return (
    <View className="flex-1 px-5 bg-background" style={{ paddingTop: top }}>
      <Header />

      <View className="flex-1 justify-center pb-40">
        <Text variant="heading32Semibold" className="text-center font-serif">
          {t`Verify Your Mail`}
        </Text>
        <Text variant="caption14Regular" className="mt-3 text-center leading-5">
          {t`Please enter the 6 digit code sent to`}
          {"\n"}
          <Text variant="caption14Semibold">{email ?? t`your email`}</Text>
        </Text>

        <Pressable onPress={() => inputRef.current?.focus()} className="relative mt-10 flex-row gap-2">
          {Array.from({ length: OTP_LENGTH }).map((_, index) => {
            const digit = code[index];
            const active = isFocused && index === activeIndex;
            return (
              <View
                key={index}
                className={`w-13 h-16 items-center justify-center rounded-lg border`}
                style={{
                  borderColor: active ? colors.primary["06"] : colors.neutral["11"],
                  backgroundColor: active ? "#EBF2EE" : digit ? "#F2F3F2" : "#FFFFFF",
                }}
              >
                <OtpDigit digit={digit} index={index} isLoading={isVerifying} />
              </View>
            );
          })}
          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleCodeChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            editable={!isVerifying}
            caretHidden
            maxLength={OTP_LENGTH}
            className="absolute inset-0 opacity-0"
          />
        </Pressable>

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
          <Pressable disabled={!email || isResending} onPress={handleResend} hitSlop={8}>
            <Text
              variant="caption14Semibold"
              color={isResending || !email ? colors.neutral["03"] : colors.secondary["06"]}
            >
              {isResending ? t`Sending...` : t`Resend`}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default VerifyEmailScreen;
