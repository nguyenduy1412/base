import ImageComponent from "@/components/Image/ImageComponent";
import { Text } from "@/components/Text";
import React, { memo } from "react";
import { Dimensions, type ImageSourcePropType, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export type LoginHeaderComponentProps = {
  avatar: ImageSourcePropType;
  text: string;
  isLargeScreen?: boolean;
};

const AUTH_PANEL_CURVE_HEIGHT = 128;
const width = Dimensions.get("window").width;

const LoginHeaderComponent = ({
  avatar,
  text,
  isLargeScreen,
}: LoginHeaderComponentProps) => {
  if (isLargeScreen) {
    return (
      <View className="flex-row items-center justify-center gap-5 pt-8 pb-4 px-6 w-full">
        <View className="w-[84px] h-[84px] bg-warm-background rounded-full justify-center items-center border-4 border-cream shadow-sm">
          <ImageComponent
            className="w-full h-full rounded-full"
            source={avatar}
          />
        </View>
        <Text
          variant="body24Bold"
          className="text-[#3A1C12] flex-1 text-left leading-9"
        >
          {text}
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Svg
        width={width}
        height={AUTH_PANEL_CURVE_HEIGHT}
        viewBox={`0 0 ${width} ${AUTH_PANEL_CURVE_HEIGHT}`}
        preserveAspectRatio="none"
      >
        <Path
          d={`M0 ${AUTH_PANEL_CURVE_HEIGHT} L0 116 C${width * 0.02} 70 ${width * 0.1} 36 ${width * 0.22} 36 C${width * 0.34} 40 ${width * 0.39} 68 ${width * 0.49} 80 C${width * 0.64} 94 ${width * 0.76} 84 ${width * 0.9} 88 C${width * 0.96} 96 ${width * 0.99} 110 ${width} ${AUTH_PANEL_CURVE_HEIGHT} L${width} ${AUTH_PANEL_CURVE_HEIGHT} Z`}
          fill={"#FFF7EC"}
        />
      </Svg>

      <View className="w-[80px] h-[80px] absolute bg-divider rounded-full left-[40px] bottom-0 justify-center items-center">
        <ImageComponent className="w-20 h-20 rounded-full" source={avatar} />
      </View>

      <View className="absolute bottom-0 left-[130px]">
        <Text variant="body18Bold">{text}</Text>
      </View>
    </View>
  );
};

export default memo(LoginHeaderComponent);
