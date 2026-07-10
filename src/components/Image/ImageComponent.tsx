import { cn } from "@/utils/cn";
import {
  Image as ExpoImage,
  ImageContentFit,
  ImageContentPosition,
} from "expo-image";
import { memo } from "react";
import { ImageSourcePropType, StyleProp, ImageStyle } from "react-native";
import { withUniwind } from "uniwind";

const Image = withUniwind(ExpoImage);

type Props = {
  uri?: string;
  className?: string;
  source?: ImageSourcePropType | string;
  contentFit?: ImageContentFit;
  contentPosition?: ImageContentPosition;
  style?: StyleProp<ImageStyle>;
};

const ImageComponent = ({
  uri,
  className,
  source,
  contentFit = "contain",
  contentPosition,
  style,
}: Props) => {
  return (
    <Image
      className={cn("w-10 h-10 rounded-none", className)}
      source={uri ? { uri } : source}
      cachePolicy="memory-disk"
      priority="normal"
      contentFit={contentFit}
      contentPosition={contentPosition}
      style={style}
    />
  );
};

export default memo(ImageComponent);
