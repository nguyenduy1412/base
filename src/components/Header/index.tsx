import { View } from "react-native";
import React, { memo, useCallback } from "react";
import { Button } from "../Button";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";
import { colors } from "@/theme/colors";

const Header = () => {
  const handleGoBack = useCallback(() => {
    router.back();
  }, []);

  return (
    <View className="flex-row items-center justify-between">
      <Button
        isShadow
        activeOpacity={0.85}
        onPress={handleGoBack}
        className="h-9 w-9 rounded-full px-0 py-0 "
        color="background"
      >
        <ArrowLeft size={24} color={colors.neutral["03"]} strokeWidth={2} />
      </Button>
    </View>
  );
};

Header.displayName = "Header";

export default memo(Header);
