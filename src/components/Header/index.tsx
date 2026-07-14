import { View } from "react-native";
import React, { memo, ReactNode, useCallback } from "react";
import { Button } from "../Button";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";
import { withUniwind } from "uniwind";
import { Text } from "../Text";

const ArrowLeftIcon = withUniwind(ArrowLeft);

type props = {
  title?: string;
  onBack?: () => void;
  showBackButton?: boolean;
  right?: ReactNode;
};
const Header = ({ title, onBack, showBackButton = true, right }: props) => {
  const handleGoBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  }, [onBack]);

  return (
    <View className="relative flex-row items-center">
      {showBackButton ? (
        <Button
          isShadow
          activeOpacity={0.85}
          onPress={handleGoBack}
          className="z-10 h-9 w-9 rounded-full px-0 py-0"
          color="background"
        >
          <ArrowLeftIcon
            size={24}
            colorClassName="accent-icon"
            strokeWidth={2}
          />
        </Button>
      ) : null}

      {title ? (
        <View
          pointerEvents="none"
          className="absolute inset-0 items-center justify-center"
        >
          <Text variant="body16Regular" className="text-black">
            {title}
          </Text>
        </View>
      ) : null}

      {right ? <View className="z-10 ml-auto">{right}</View> : null}
    </View>
  );
};

Header.displayName = "Header";

export default memo(Header);
