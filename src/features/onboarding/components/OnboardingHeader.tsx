import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { memo } from "react";
import { Text, View } from "react-native";

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
    <View className="h-19 flex-row items-center justify-between">
      {canGoBack ? (
        <Button
          color="white"
          isShadow
          activeOpacity={0.85}
          className="h-9 w-9 rounded-full px-0 py-0"
          onPress={() => handleNavigationBack}
        >
          <ArrowLeft size={24} color="#49504D" strokeWidth={2} />
        </Button>
      ) : (
        <View className="h-9 w-9" />
      )}

      <Text className="text-[24px] leading-7.25 text-[#313533]">
        Step {currentStep} of {totalSteps}
      </Text>

      <View className="h-9 w-9" />
    </View>
  );
};

export default memo(OnboardingHeader);
