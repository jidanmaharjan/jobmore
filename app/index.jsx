import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

import { images } from "../constants";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
