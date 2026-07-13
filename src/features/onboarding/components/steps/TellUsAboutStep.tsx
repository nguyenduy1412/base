import { memo } from "react";
import Text from "@/components/Text";
import { View } from "react-native";
export interface TellUsAboutStepProps {
  onBack?: () => void;
  onContinue?: () => void;
}

const TellUsAboutStep = ({ onBack, onContinue }: TellUsAboutStepProps) => {
  return (
    <View>
      <Text>TellUsAboutStepProps</Text>
    </View>
  );
};

export default memo(TellUsAboutStep);
