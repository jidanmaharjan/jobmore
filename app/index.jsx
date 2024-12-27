import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";
import { images } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";

const App = () => {

  const { loading, isLoggedIn } = useGlobalContext();


  console.log(loading, isLoggedIn);
  
  if(!loading && isLoggedIn) return <Redirect href="/home" />


  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);
  // if (loading) {
  //   return (
  //     <View className="flex-1 items-center justify-center bg-primary">
  //       <ActivityIndicator size={"large"} color={"orange"} />
  //     </View>
  //   );
  // }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="items-center justify-center w-full px-4 min-h-[85vh]">
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
          <View className="relative mt-5">
            <Text className="text-white text-center text-3xl font-bold">
              Discover your perfect job with{" "}
              <Text className="text-secondary-200">Jobmore</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute -bottom-2 right-16 "
              style={{ width: 136, height: 15 }}
              resizeMode="contain"
            />
          </View>
          <Text className="text-xs text-center mt-7 font-pregular text-gray-100">
            Where jobs meet your skills. Find your dream job today!
          </Text>
          <View className="items-center justify-center w-full px-4">
            <TextInput />
            <CustomButton
              title="Continue to Sign In"
              handlePress={() => router.push("/sign-in")}
              isLoading={false}
              containerStyles={"w-full mt-7"}
              textStyles={"text-white"}
            />
          </View>
          <StatusBar backgroundColor="#161622" style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
