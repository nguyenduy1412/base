import { animations } from "@/assets/animation";
import LottieView from "lottie-react-native";
import { memo } from "react";
import { View } from "react-native";

export interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

const CorgiLottie = memo(function CorgiLottie() {
  return (
    <LottieView
      source={animations.CorgiRunning}
      autoPlay
      loop
      speed={1}
      style={{
        width: "150%",
        aspectRatio: 1,
        transform: [{ scaleX: -1 }],
      }}
    />
  );
});

const OnboardingProgress = ({
  currentStep,
  totalSteps,
}: OnboardingProgressProps) => {
  return (
    <View className="mt-5 mb-2 w-full flex-row gap-1">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index < currentStep;
        const isCorgiRunning = index === currentStep - 1;

        return (
          <View
            key={index}
            className={`h-1 flex-1 rounded-full ${
              isActive ? "bg-primary" : "bg-secondary-soft"
            }`}
          >
            {isCorgiRunning ? (
              <View
                pointerEvents="none"
                className="absolute bottom-1 left-0 right-0 items-center"
              >
                <CorgiLottie />
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

export default memo(OnboardingProgress);
