import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";
import { withUniwind } from "uniwind";
import AlaskanMalamute from "./AlaskanMalamute.svg";
import CorgiIcon from "./corgi.svg";
import GermanShepherd from "./GermanShepherd.svg";
import GolderRetriever from "./GolderRetriever.svg";
import GoogleIcon from "./google.svg";
import Icondogs from "./Icondogs.svg";
import Infomation from "./Infomation.svg";
import PawIcon from "./paw.svg";
import PointIcon from "./PointIcon.svg";
import Samoyed from "./Samoyed.svg";
const icons = {
  google: GoogleIcon,
  AlaskanMalamute: AlaskanMalamute,
  GermanShepherd: GermanShepherd,
  GolderRetriever: GolderRetriever,
  Samoyed: Samoyed,
  PointIcon: PointIcon,
  LabradorRetriever: Icondogs,
  paw: PawIcon,
  corgi: CorgiIcon,
  Infomation: Infomation,
} satisfies Record<string, ComponentType<SvgProps>>;

export const iconNames = Object.keys(icons) as IconName[];

export type IconName = keyof typeof icons;

export function isIconName(name: unknown): name is IconName {
  return (
    typeof name === "string" &&
    Object.prototype.hasOwnProperty.call(icons, name)
  );
}

export type IconProps = Omit<SvgProps, "height" | "width"> & {
  name?: string | null;
  size?: number;
  width?: number;
  height?: number;
  colorClassName?: string;
};

const Icon = ({
  name,
  size = 24,
  width,
  height,
  color,
  fill,
  stroke,
  ...props
}: IconProps) => {
  const IconComponent = isIconName(name) ? icons[name] : icons.google;
  const iconColor = color ?? fill ?? stroke;

  return (
    <IconComponent
      width={width ?? size}
      height={height ?? size}
      color={iconColor}
      fill={fill ?? color}
      stroke={stroke}
      {...props}
    />
  );
};

export default withUniwind(Icon);
