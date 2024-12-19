import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { images } from "../constants";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import CustomButton from "../components/CustomButton";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-primary">
        <ActivityIndicator size={"large"} color={"orange"} />
      </View>
    );
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="items-center justify-center w-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            style={{ width: 130, height: 84 }}
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            style={{ maxWidth: 380, height: 300 }}
            className="max-w-[380px] h-[300px] w-full"
            resizeMode="contain"
          />
        </View>
        <View className="relative mt-5">
          <Text className="text-white text-center text-3xl font-bold">
            Discover your perfect job with{" "}
            <Text className="text-secondary-200">Jobmore</Text>
          </Text>
          <Image
            source={images.path}
            className="absolute -bottom-2 right-16"
            style={{ width: 136, height: 15 }}
            resizeMode="contain"
          />
        </View>
        <Text className="text-xs text-center mt-7 font-pregular text-gray-100">
          Where jobs meet your skills. Find your dream job today!
        </Text>
        <View className="items-center justify-center w-full px-4">
          <TextInput />
          {/* <Link href="/sign-in"> */}
            <CustomButton
              title="Login"
              handlePress={() => {}}
              isLoading={false}
              containerStyles={"w-full mt-7"}
              textStyles={"text-white"}
            />
          {/* </Link> */}
        </View>
        <StatusBar backgroundColor="#161622" style="light" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
