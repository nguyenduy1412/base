import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { memo, ReactNode } from "react";
import { View } from "react-native";
import { withUniwind } from "uniwind";

const ArrowLeftIcon = withUniwind(ArrowLeft);
export interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  canGoBack?: boolean;
  rightElement?: ReactNode;
}

const OnboardingHeader = ({
  currentStep,
  totalSteps,
  canGoBack,
  rightElement,
}: OnboardingHeaderProps) => {
  const router = useRouter();

  const handleNavigationBack = () => {
    router.back();
  };

  return (
    <View className=" flex-row items-center justify-between mb-6 ">
      {canGoBack ? (
        <Button
          isShadow={false}
          activeOpacity={0.85}
          onPress={handleNavigationBack}
          className="h-9 w-9 rounded-full px-0 py-0 "
          color="white"
        >
          <ArrowLeftIcon
            size={24}
            colorClassName="accent-icon"
            strokeWidth={2}
          />
        </Button>
      ) : (
        <View className="h-9 w-9" />
      )}

      {/* <Text
        className="font-serif leading-7.25 text-text-heading"
        variant="body24Semibold"
      >
        Step {currentStep} of {totalSteps}
      </Text> */}

      {rightElement ? rightElement : <View className="h-9 w-9" />}
    </View>
  );
};

export default memo(OnboardingHeader);
