import { memo, ReactNode } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OnboardingHeader from "./OnboardingHeader";
import OnboardingProgress from "./OnboardingProgress";

export interface OnboardingScreenProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  footer?: ReactNode;
  canGoBack?: boolean;
  onBack?: () => void;
}

const OnboardingScreen = ({
  children,
  currentStep,
  totalSteps,
  footer,
  canGoBack,
  onBack,
}: OnboardingScreenProps) => {
  const ptsValue = 0;
  const insets = useSafeAreaInsets();
  return (
    <View className={"flex-1 px-5 pt-safe pb-safe bg-background"}>
      <OnboardingHeader
        currentStep={currentStep}
        totalSteps={totalSteps}
        canGoBack={canGoBack}
        // rightElement={
        //   <View className="flex-row gap-2 justify-center items-center">
        //     <Icon name={"PointIcon"} />
        //     <Text variant="body14Semibold">{`${ptsValue} pts`}</Text>
        //   </View>
        // }
      />
      <View className="h-3"></View>

      <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />

      <KeyboardAwareScrollView
        bottomOffset={insets.bottom + 24}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        className="flex-1 "
      >
        {children}
      </KeyboardAwareScrollView>

      {footer}
    </View>
  );
};

export default memo(OnboardingScreen);
