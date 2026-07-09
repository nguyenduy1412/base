import { Button } from "@/components/Button";
import TextInput from "@/components/TextInput";
import { memo, useState } from "react";
import { View } from "react-native";


export interface OnboardingFooterProps {
  label?: string;
  disabled?: boolean;
  onPress?: () => void;
}

const OnboardingFooter = ({
  label,
  disabled,
  onPress,
}: OnboardingFooterProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handlePress = () => {
    setIsLoading(true);
  };
  return (
    <>
      <View className="pb-3">
        <Button
          title={label ?? "Continue"}
          color={"primary"}
          disabled={isLoading}
          variant="body14Semibold"
          onPress={handlePress}
          isShadow={false}
          isLoading={isLoading}
      
        />
      </View>
      <TextInput placeholder="Enter your email" />
    </>
  );
};

export default memo(OnboardingFooter);
