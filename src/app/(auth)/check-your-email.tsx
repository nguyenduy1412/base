import { CHECK_MAIL } from "@/assets/images";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import ImageComponent from "@/components/Image/ImageComponent";
import { Text } from "@/components/Text";
import { login } from "@/features/auth/api/login.api";
import { cn } from "@/utils/cn";
import { t } from "@lingui/core/macro";
import { useLocalSearchParams } from "expo-router";
import { TriangleAlert } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { Alert, Linking, Pressable, View } from "react-native";
import { withUniwind } from "uniwind";

const ErrorIcon = withUniwind(TriangleAlert);

const CheckYourEmailScreen = () => {
  const { email: emailParam } = useLocalSearchParams<{ email?: string }>();
  const email = Array.isArray(emailParam) ? emailParam[0] : emailParam;
  const [isResending, setIsResending] = useState(false);
  const [resendErrorMessage, setResendErrorMessage] = useState<string | null>(
    null,
  );

  const handleOpenEmail = useCallback(async () => {
    try {
      await Linking.openURL("mailto:");
    } catch {
      Alert.alert(
        t`Unable to open email`,
        t`Please open your email app manually.`,
      );
    }
  }, []);

  const handleResend = useCallback(async () => {
    if (!email || isResending) return;

    setResendErrorMessage(null);
    try {
      setIsResending(true);
      await login({ email });
    } catch (error) {
      setResendErrorMessage(
        error instanceof Error ? error.message : t`Please try again.`,
      );
    } finally {
      setIsResending(false);
    }
  }, [email, isResending]);

  const isResendDisabled = !email || isResending;

  return (
    <View className="flex-1 bg-background px-5 pt-safe">
      <View className="pt-4">
        <Header />
      </View>

      <View className="flex-1 items-center justify-center pb-44">
        <ImageComponent source={CHECK_MAIL} className="w-45 h-45 self-center" />
        <Text variant="heading32Semibold" className="text-center">
          {t`Check Your Email`}
        </Text>

        <Text variant="caption14Regular" className="text-center mt-2">
          {t`A secure login link is on its way to `}
          {email ? (
            <Text variant="caption14Semibold">{email}</Text>
          ) : (
            t`your email`
          )}
          {t`. Please check your email and click the link to continue.`}
        </Text>

        <Button
          title={t`Open Email App`}
          variant="caption14Semibold"
          onPress={handleOpenEmail}
          className="mt-8 h-12 w-full rounded-xl"
          textClassName="text-neutral-12"
        />

        <View className="mt-3 flex-row items-center justify-center">
          <Text variant="caption14Regular">{t`Didn't receive the email? `}</Text>
          <Pressable
            accessibilityRole="button"
            disabled={isResendDisabled}
            onPress={handleResend}
          >
            <Text
              variant="caption14Semibold"
              className={cn(
                isResendDisabled ? "text-placeholder" : "text-secondary-06",
              )}
            >
              {isResending ? t`Sending...` : t`Resend`}
            </Text>
          </Pressable>
        </View>
        {resendErrorMessage && (
          <View className="mt-2 flex-row items-center justify-center gap-2">
            <ErrorIcon colorClassName="accent-error" size={16} />
            <Text variant="caption12Regular" className="text-error">
              {resendErrorMessage}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CheckYourEmailScreen;
