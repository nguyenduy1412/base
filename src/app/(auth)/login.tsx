import { BACKGROUND_RUN } from "@/assets/images";
import ImageComponent from "@/components/Image/ImageComponent";
import { Text, View } from "react-native";

const LoginScreen = () => {
  return (
    <View className="flex-1 bg-[#f7f3ee]">
      <View className="h-[42%] overflow-hidden">
        <ImageComponent
          source={BACKGROUND_RUN}
          className="absolute inset-0 h-full w-full"
        />
        {/* <View className="absolute inset-0 bg-[#2f6b52]/55" />

        <View className="px-6 pt-16">
          <View className="w-[72%]">
            <Text className="text-[30px] font-semibold leading-[38px] text-white">
              Welcome to Dogspotting
            </Text>
            <Text className="mt-2 text-sm leading-5 text-white/80">
              Log in your account to continue
            </Text>
          </View>
        </View> */}
      </View>

      {/* <View className="flex-1 px-5">
        <View className="-mt-16 min-h-[320px] rounded-[28px] bg-white p-6 shadow-sm">
          <Text className="text-base font-medium text-[#2b2b2b]">Email</Text>
          <View className="mt-3 h-12 rounded-xl border border-[#e6e1da] bg-white" />

          <View className="mt-5 h-12 items-center justify-center rounded-xl bg-[#4a7c59]">
            <Text className="font-semibold text-white">Sign in</Text>
          </View>
        </View>
      </View> */}
    </View>
  );
};

export default LoginScreen;
