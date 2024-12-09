import { View, Text, Button, Image } from "react-native";
const Home = () => {
  return (
    <View className="p-4">
      <View className="flex flex-row justify-end items-center p-2">
        <Image
          className="max-w-8 max-h-8 object-contain"
          source={require("../../assets/icons/profile.png")}
        />
        <Image
          className="max-w-8 max-h-8 object-contain"
          source={require("../../assets/icons/menu.png")}
        />
      </View>
      <View className="bg-white p-4 rounded-md flex flex-column gap-4">
        <View className="flex flex-row items-center">
          <Image
            className="max-w-8 max-h-8 object-contain"
            source={require("../../assets/images/cards.png")}
          />
          <Text>Daily Fruit Tracker</Text>
        </View>
        <View>
          <Image
            className="max-w-full"
            source={require("../../assets/images/thumbnail.png")}
          />
        </View>
        <View className="flex flex-row justify-between">
          <Text>Today</Text>
          <Text>1kg</Text>
        </View>
      </View>
    </View>
  );
};
export default Home;
