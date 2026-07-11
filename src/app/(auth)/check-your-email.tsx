import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { Text } from "@/components/Text";
import { login } from "@/features/auth/api/login.api";
import { colors } from "@/theme/colors";
import { t } from "@lingui/core/macro";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, Linking, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CheckYourEmailScreen = () => {
  const { email: emailParam } = useLocalSearchParams<{ email?: string }>();
  const { top } = useSafeAreaInsets();
  const email = Array.isArray(emailParam) ? emailParam[0] : emailParam;
  const [isResending, setIsResending] = useState(false);

  const handleOpenEmail = useCallback(async () => {
    try {
      await Linking.openURL("mailto:");
    } catch {
      Alert.alert(t`Unable to open email`, t`Please open your email app manually.`);
    }
  }, []);

  const handleResend = useCallback(async () => {
    if (!email || isResending) return;

    try {
      setIsResending(true);
      await login({ email });
      Alert.alert(t`Email sent`, t`A new secure login link has been sent to your email.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : t`Please try again.`;
      Alert.alert(t`Unable to resend email`, message);
    } finally {
      setIsResending(false);
    }
  }, [email, isResending]);

  return (
    <View className="flex-1 px-5" style={{ paddingTop: top }}>
      <View className=" pt-4">
        <Header />
      </View>

      <View className="flex-1 items-center justify-center    pb-44">
        <Text variant="heading32Semibold" className="text-center">
          {t`Check Your Email`}
        </Text>

        <Text variant="caption14Regular" className="text-center">
          {t`A secure login link is on its way to `}
          {email ? (
            <Text variant="caption14Semibold" className="">
              {email}
            </Text>
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
          textClassName="text-white"
        />

        <View className="mt-3 flex-row items-center justify-center">
          <Text variant="caption14Regular" className="">
            {t`Didn't receive the email? `}
          </Text>
          <Pressable accessibilityRole="button" disabled={!email || isResending} onPress={handleResend} hitSlop={8}>
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

export default CheckYourEmailScreen;
