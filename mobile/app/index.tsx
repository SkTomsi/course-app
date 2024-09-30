import CustomButton from "@/components/CustomButton";
import { Images } from "@/constants/Images";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <SafeAreaView className="flex items-center justify-center bg-white">
      <Image
        source={Images.welcome}
        className="h-[550px] w-full"
        resizeMode="contain"
      />
      <View className="h-full bg-[#f5f3ff] flex px-8 pt-20 flex-col ">
        <Text className="text-4xl tracking-tighter font-extrabold text-balance">
          Explore Thousands of Online Courses
        </Text>
        <Text className="text-base font-normal text-[#585858] mt-4">
          Learn from expert professionals and join the largest online community
          for learning
        </Text>
        <CustomButton
          title="Explore"
          // bgVariant="primary"
          className="bg-[#4331ba] rounded-full w-full mt-20 py-5"
        />
      </View>
    </SafeAreaView>
  );
}
