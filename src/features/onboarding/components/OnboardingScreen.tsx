import { memo, ReactNode } from "react";
import { Text } from "@/components/Text";
import { Platform, ScrollView, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import OnboardingHeader from "./OnboardingHeader";
import OnboardingProgress from "./OnboardingProgress";

export interface OnboardingScreenProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  footer?: ReactNode;
  canGoBack?: boolean;
}

const OnboardingScreen = ({
  children,
  currentStep,
  totalSteps,
  title,
  footer,
  canGoBack,
}: OnboardingScreenProps) => {
  return (
    <View className={"flex-1 px-5 pt-safe pb-safe bg-background"}>
      <OnboardingHeader
        currentStep={currentStep}
        totalSteps={totalSteps}
        canGoBack={canGoBack}
      />

      <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />
      <Text
        variant="body24Semibold"
        className="mb-5 font-serif text-[32px] leading-9.5 text-text-heading"
      >
        {title}
      </Text>

      <KeyboardAvoidingView
        className="flex-1 "
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>

      {footer}
    </View>
  );
};

export default memo(OnboardingScreen);
