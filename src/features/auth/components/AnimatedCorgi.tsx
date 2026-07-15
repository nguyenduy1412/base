import Icon from "@/assets/svg/Icon";
import { StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const SVG_WIDTH = 146;
const SVG_HEIGHT = 135;

const EYES = [
  { x: 49.55, y: 71.9, rx: 3.7, ry: 4.2 },
  { x: 81.4, y: 64.01, rx: 3.7, ry: 4.2 },
] as const;

const PUPIL_SIZE = 3;
const EDGE_PAD = 0.55;

type AnimatedCorgiProps = {
  size?: number;
  lookX: SharedValue<number>;
  lookY: SharedValue<number>;
};

type PupilProps = {
  eyeX: number;
  eyeY: number;
  rx: number;
  ry: number;
  scaleX: number;
  scaleY: number;
  lookX: SharedValue<number>;
  lookY: SharedValue<number>;
};

const Pupil = ({
  eyeX,
  eyeY,
  rx,
  ry,
  scaleX,
  scaleY,
  lookX,
  lookY,
}: PupilProps) => {
  const maskW = rx * 2 * scaleX;
  const maskH = ry * 2 * scaleY;
  const pupilSize = PUPIL_SIZE * scaleX;
  const maxX = (rx - PUPIL_SIZE / 2 - EDGE_PAD) * scaleX;
  const maxY = (ry - PUPIL_SIZE / 2 - EDGE_PAD) * scaleY;

  const style = useAnimatedStyle(() => {
    let ox = lookX.value * maxX;
    let oy = lookY.value * maxY;
    const nx = maxX === 0 ? 0 : ox / maxX;
    const ny = maxY === 0 ? 0 : oy / maxY;
    const mag = Math.sqrt(nx * nx + ny * ny);
    if (mag > 1) {
      ox = (nx / mag) * maxX;
      oy = (ny / mag) * maxY;
    }

    return {
      transform: [{ translateX: ox }, { translateY: oy }],
    };
  });

  return (
    <View
      pointerEvents="none"
      style={[
        styles.eyeMask,
        {
          left: eyeX * scaleX - maskW / 2,
          top: eyeY * scaleY - maskH / 2,
          width: maskW,
          height: maskH,
          borderRadius: Math.max(maskW, maskH) / 2,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.pupil,
          {
            width: pupilSize,
            height: pupilSize,
            borderRadius: pupilSize / 2,
            left: (maskW - pupilSize) / 2,
            top: (maskH - pupilSize) / 2,
          },
          style,
        ]}
      />
    </View>
  );
};

const AnimatedCorgi = ({ size = 135, lookX, lookY }: AnimatedCorgiProps) => {
  const scale = size / SVG_HEIGHT;
  const width = SVG_WIDTH * scale;
  const height = SVG_HEIGHT * scale;
  const scaleX = width / SVG_WIDTH;
  const scaleY = height / SVG_HEIGHT;

  return (
    <View style={{ width, height }}>
      <Icon name="corgi" width={width} height={height} />
      {EYES.map((eye) => (
        <Pupil
          key={`${eye.x}-${eye.y}`}
          eyeX={eye.x}
          eyeY={eye.y}
          rx={eye.rx}
          ry={eye.ry}
          scaleX={scaleX}
          scaleY={scaleY}
          lookX={lookX}
          lookY={lookY}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  eyeMask: {
    position: "absolute",
    overflow: "hidden",
  },
  pupil: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
  },
});

export default AnimatedCorgi;
