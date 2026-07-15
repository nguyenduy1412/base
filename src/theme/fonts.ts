export const fontsToLoad = [
  {
    fontFamily: "Inter-Regular",
    src: require("../../assets/fonts/Inter-Regular.ttf"),
  },
  {
    fontFamily: "Inter-Medium",
    src: require("../../assets/fonts/Inter-Medium.ttf"),
  },
  {
    fontFamily: "Inter-SemiBold",
    src: require("../../assets/fonts/Inter-SemiBold.ttf"),
  },

  {
    fontFamily: "CormorantGaramond-Regular",
    src: require("../../assets/fonts/CormorantGaramond-Regular.ttf"),
  },
  {
    fontFamily: "CormorantGaramond-Medium",
    src: require("../../assets/fonts/CormorantGaramond-Medium.ttf"),
  },
  {
    fontFamily: "CormorantGaramond-SemiBold",
    src: require("../../assets/fonts/CormorantGaramond-SemiBold.ttf"),
  },

  {
    fontFamily: "Poppins-Regular",
    src: require("../../assets/fonts/Poppins-Regular.ttf"),
  },
  {
    fontFamily: "Poppins-Medium",
    src: require("../../assets/fonts/Poppins-Medium.ttf"),
  },

  {
    fontFamily: "Afacad-Regular",
    src: require("../../assets/fonts/Afacad-Regular.ttf"),
  },
] as const;

export const fontsMap = Object.fromEntries(
  fontsToLoad.map(({ fontFamily, src }) => [fontFamily, src]),
) as Record<string, number>;
