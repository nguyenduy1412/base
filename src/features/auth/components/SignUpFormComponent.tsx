import { Pressable, View } from "react-native";
import React, { memo, useCallback, useMemo } from "react";
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
import { useLogin } from "../hooks/useLogin";

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
  const { mutateAsync: login, isPending } = useLogin();

  const onSignUp = useCallback(async (data: SignUpFormValues) => {
    console.log(data);
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
              onChangeText={onChange}
              onBlur={onBlur}
              label={t`Email`}
              placeholder={t`Enter your email`}
              error={errors.email?.message}
              iconError={<TriangleAlert color="red" size={16} />}
            />
          )}
        />
      </View>

      <Button
        title={t`Continue`}
        className="rounded-[12px] mt-5 h-12"
        isLoading={isPending}
        onPress={handleSubmit(onSignUp)}
      />
      <View className="h-4.5 w-full items-center mt-5 justify-center">
        <View className="bg-placeholder h-0.25 w-full" />
        <View className="absolute px-5 bg-background">
          <Text variant="body14Regular">{t`Or`}</Text>
        </View>
      </View>
      <Button
        className="rounded-[12px] mt-5 h-12 border border-placeholder"
        onPress={() => {}}
        color="background"
        isShadow={false}
      >
        <View className="gap-2 flex-row">
          <Icon name="google" size={20} />
          <Text variant="body14Regular">{t`Continue with Google`}</Text>
        </View>
      </Button>
      <View className="pt-5 flex-row items-center gap-3">
        <View className="w-4 h-4 bg-primary"></View>
        <Text variant="body12Regular">
          {t`I confirm I am 13 years of age or older (16+ if located in the EU or UK).`}
        </Text>
      </View>
      <Pressable onPress={onNextForm} className="pt-16 items-center">
        <Text>
          <Text variant="body12Regular">{t`Already have an account?`}</Text>
          <Text variant="body12Regular" className="text-yellow-300">
            {t` Sign in`}
          </Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default memo(SignUpFormComponent);
