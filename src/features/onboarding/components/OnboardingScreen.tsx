import { memo, ReactNode } from "react";
import { Text, View } from "react-native";
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
    <View>
      <OnboardingHeader
        currentStep={currentStep}
        totalSteps={totalSteps}
        canGoBack={canGoBack}
      />

      <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />
      <Text className="mt-36 text-[32px] leading-9.5 text-[#313533]">
        {title}
      </Text>

      <View className="mt-8.5 flex-1">{children}</View>

      {footer}
    </View>
  );
};

export default memo(OnboardingScreen);
