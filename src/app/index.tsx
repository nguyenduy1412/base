import SplashScreen from "@/components/SplashScreen";
import { ROUTE_GROUPS } from "@/constants/routes";
import { auth$ } from "@/store/auth";
import { useSelector } from "@legendapp/state/react";
import { router } from "expo-router";
import { useCallback } from "react";

const RootIndex = () => {
  const user = useSelector(auth$.user);

  const handleFinish = useCallback(() => {
    router.replace(user?.id ? ROUTE_GROUPS.TABS : ROUTE_GROUPS.AUTH);
  }, [user?.id]);

  return <SplashScreen onFinish={handleFinish} />;
};

export default RootIndex;
