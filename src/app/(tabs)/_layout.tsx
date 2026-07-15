import CustomTab from "@/components/BottomTab/CustomTab";
import NativeTab from "@/components/BottomTab/NativeTab";
import { ROUTE_GROUPS } from "@/constants/routes";
import { auth$ } from "@/store/auth";
import { useSelector } from "@legendapp/state/react";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Redirect } from "expo-router";

const supportsLiquidGlass = isLiquidGlassAvailable();

const TabsLayout = () => {
  const user = useSelector(auth$.user);

  if (!user) {
    return <Redirect href={ROUTE_GROUPS.AUTH} />;
  }
  
  return !supportsLiquidGlass ? <NativeTab /> : <CustomTab />;
};

export default TabsLayout;
