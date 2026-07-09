import { Button } from "@/components/Button";
<<<<<<< HEAD
import { memo } from "react";
import { View } from "react-native";

=======
import TextInput from "@/components/TextInput";
import { memo, useState } from "react";
import { View } from "react-native";


>>>>>>> 85662ceb0dca5881a34e5e3b76583b2efb00cd32
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
<<<<<<< HEAD
=======
  const [isLoading, setIsLoading] = useState(false);
  const handlePress = () => {
    setIsLoading(true);
  };
>>>>>>> 85662ceb0dca5881a34e5e3b76583b2efb00cd32
  return (
    <>
      <View className="pb-3">
        <Button
          title={label ?? "Continue"}
          color={"primary"}
<<<<<<< HEAD
          disabled={true}
          variant="body14Semibold"
          onPress={onPress}
          isShadow={false}
        />
      </View>
      <View className="bg-primary h-10 w-full"></View>
=======
          disabled={isLoading}
          variant="body14Semibold"
          onPress={handlePress}
          isShadow={false}
          isLoading={isLoading}
      
        />
      </View>
      <TextInput placeholder="Enter your email" />
>>>>>>> 85662ceb0dca5881a34e5e3b76583b2efb00cd32
    </>
  );
};

export default memo(OnboardingFooter);
