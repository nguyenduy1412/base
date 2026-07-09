import { memo, useEffect } from "react";
import { View } from "react-native";

export interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

const OnboardingProgress = ({
  currentStep,
  totalSteps,
}: OnboardingProgressProps) => {
  useEffect(() => {}, []);
  return (
    <View>
      {Array.from({ length: totalSteps }).map((item, index) => {
        const isActive = index < currentStep;

        return (
          <View
            key={index}
            className={`h-1 flex-1 rounded-full ${isActive ? "bg-[#3B7A57]" : "bg-[#EBF2EE]"}`}
          ></View>
        );
      })}
    </View>
  );
};

export default memo(OnboardingProgress);
