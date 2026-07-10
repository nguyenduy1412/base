import { memo } from "react";
import { View } from "react-native";

export interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

const OnboardingProgress = ({
  currentStep,
  totalSteps,
}: OnboardingProgressProps) => {
  return (
    <View className="flex-row gap-2 w-full mb-7">
      {Array.from({ length: totalSteps }).map((item, index) => {
        const isActive = index < currentStep;

        return (
          <View
            key={index}
            className={`h-1 flex-1 rounded-full ${
              isActive ? "bg-primary" : "bg-secondary-soft"
            }`}
          ></View>
        );
      })}
    </View>
  );
};

export default memo(OnboardingProgress);
