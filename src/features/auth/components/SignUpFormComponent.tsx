import { Pressable, View } from "react-native";
import React, { memo, useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "@/components/TextInput";
import { t } from "@lingui/core/macro";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import Icon from "@/assets/svg/Icon";
import { TriangleAlert } from "lucide-react-native";
import { defaultSignUpValues, SignUpFormValues, signUpSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLingui } from "@lingui/react";
import { useRegister } from "../hooks/useRegister";
import TermsOfServiceModal from "./TermsOfServiceModal";
import { router } from "expo-router";
import { AUTH_ROUTES } from "@/constants/routes";

type props = {
  onNextForm: () => void;
};
const SignUpFormComponent = ({ onNextForm }: props) => {
  const { _ } = useLingui();
  const schema = useMemo(() => signUpSchema(_), [_]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultSignUpValues,
  });
  const { mutateAsync: register, isPending } = useRegister();
  const [isTermsOfServiceModalVisible, setIsTermsOfServiceModalVisible] = useState(false);
  const onSignUp = useCallback(
    async (data: SignUpFormValues) => {
      const respose = await register(data);
      console.log("response", respose);
      router.push({
        pathname: AUTH_ROUTES.VERIFY_EMAIL,
        params: { email: data.email, name: data.name },
      });
    },
    [register],
  );
  const handleShowTermsOfServiceModal = useCallback(() => {
    setIsTermsOfServiceModalVisible(true);
  }, []);
  const handleHideTermsOfServiceModal = useCallback(() => {
    setIsTermsOfServiceModalVisible(false);
  }, []);
  return (
    <View>
      <View className="gap-4">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              label={t`Name`}
              placeholder={t`Enter your name`}
              error={errors.name?.message}
              iconError={<TriangleAlert color="red" size={16} />}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              type="email"
              onChangeText={onChange}
              onBlur={onBlur}
              label={t`Email`}
              placeholder={t`Enter your email`}
              error={errors.email?.message}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              iconError={<TriangleAlert color="red" size={16} />}
            />
          )}
        />
      </View>
      <View className="pt-5 flex-row items-start gap-3">
        <View className="w-4 h-4 bg-primary" />
        <Text onPress={handleShowTermsOfServiceModal} className="flex-1 shrink">
          <Text variant="body12Regular">{t`I am at least 13 years old and agree to the`}</Text>
          <Text variant="body12Regular" className="text-yellow">{t` Termsof Service`}</Text>
          <Text variant="body12Regular">{t` and`}</Text>
          <Text variant="body12Semibold" className="text-yellow">{t` Privacy Policy`}</Text>
        </Text>
      </View>
      <Button
        title={t`Continue`}
        className="w-full rounded-[12px] mt-5 h-12"
        isLoading={isPending}
        onPress={handleSubmit(onSignUp)}
      />
      <View className="h-4.5 w-full items-center mt-5 justify-center">
        <View className="bg-placeholder h-0.25 w-full" />
        <View className="absolute px-5 bg-background">
          <Text variant="body14Regular">{t`Or sign in with`}</Text>
        </View>
      </View>
      <Button
        className="w-full rounded-[12px] mt-5 h-12 border border-placeholder"
        onPress={() => {}}
        color="background"
        isShadow={false}
      >
        <View className="gap-2 flex-row">
          <Icon name="google" size={20} />
          <Text variant="body14Regular">{t`Continue with Google`}</Text>
        </View>
      </Button>

      <Pressable onPress={onNextForm} className="pt-16 items-center">
        <Text>
          <Text variant="body12Regular">{t`Already have an account?`}</Text>
          <Text variant="body12Semibold" className="text-yellow">
            {t` Sign in`}
          </Text>
        </Text>
      </Pressable>
      <TermsOfServiceModal isVisible={isTermsOfServiceModalVisible} onClose={handleHideTermsOfServiceModal} />
    </View>
  );
};

export default memo(SignUpFormComponent);
