import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { memo } from "react";
import { View } from "react-native";
import { withUniwind } from "uniwind";

const ArrowLeftIcon = withUniwind(ArrowLeft);
export interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  canGoBack?: boolean;
}

const OnboardingHeader = ({
  currentStep,
  totalSteps,
  canGoBack,
}: OnboardingHeaderProps) => {
  const router = useRouter();

  const handleNavigationBack = () => {
    router.back();
  };

  return (
    <View className=" flex-row items-center justify-between mb-6 ">
      {canGoBack ? (
        <Button
          isShadow
          activeOpacity={0.85}
          onPress={handleNavigationBack}
          className="h-9 w-9 rounded-full px-0 py-0 "
          color="background"
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

      <Text
        variant="body24Semibold"
        className="font-serif leading-7.25 text-text-heading"
      >
        Step {currentStep} of {totalSteps}
      </Text>

      <View className="h-9 w-9" />
    </View>
  );
};

export default memo(OnboardingHeader);
