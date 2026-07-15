import { Skia, type SkPath } from "@shopify/react-native-skia";

export type TabIconDef = {
  name: string;
  paths: string[];
  primary?: boolean;
};

export const ICON_VIEWBOX = 24;
export const ICON_STROKE_WIDTH = 1.5;

export const TAB_ICONS: TabIconDef[] = [
  {
    name: "index",
    paths: [
      "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
      "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    ],
  },
  {
    name: "search",
    paths: ["m21 21-4.34-4.34", "M3 11a8 8 0 1 0 16 0a8 8 0 1 0 -16 0"],
  },
  {
    name: "create",
    paths: ["M5 12h14", "M12 5v14"],
    primary: true,
  },
  {
    name: "trophy",
    paths: [
      "M5.5 9a6.5 6.5 0 0 0 13 0V3a1 1 0 0 0-1-1H6.5a1 1 0 0 0-1 1z",
      "M5.5 9H4a1 1 0 0 1 0-5H5.5",
      "M18.5 9H20a1 1 0 0 0 0-5H18.5",
      "M12 15.5v2.5",
      "M9.5 22h5l-.7-4h-3.6z",
      "M6 22h12",
    ],
  },
  {
    name: "profile",
    paths: ["M7 8a5 5 0 1 0 10 0a5 5 0 1 0 -10 0", "M20 21a8 8 0 0 0-16 0"],
  },
];

export const TAB_COUNT = TAB_ICONS.length;

export const TAB_ICON_PATHS: SkPath[][] = TAB_ICONS.map((tab) =>
  tab.paths.map((d) => {
    const path = Skia.Path.MakeFromSVGString(d);
    if (!path) {
      throw new Error(`Invalid icon path for tab "${tab.name}"`);
    }
    return path;
  }),
);
