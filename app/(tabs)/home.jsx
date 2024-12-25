import { View, Text, Button, Image, ScrollView } from "react-native";
const Home = () => {
  return (
    <ScrollView className="p-4 bg-primary h-full ">
      <View className="gap-4">
        <View className="bg-black-100 border-black-200 border-2 p-4 rounded-md flex flex-column gap-4">
          <View className="flex flex-row items-center gap-4">
            <Image
              className="max-w-8 max-h-8 object-contain"
              source={require("../../assets/images/cards.png")}
            />
            <Text className="text-gray-100 font-psemibold">
              Daily Fruit Tracker
            </Text>
          </View>
          <View>
            <Image
              className="max-w-full rounded-lg aspect-square"
              source={require("../../assets/images/thumbnail.png")}
            />
          </View>
          <View className="flex flex-row justify-between ">
            <Text className="text-gray-100 font-psemibold">Today</Text>
            <Text className="text-gray-100 font-psemibold">1kg</Text>
          </View>
        </View>
        <View className="bg-black-100 border-black-200 border-2 p-4 rounded-md flex flex-column gap-4">
          <View className="flex flex-row items-center gap-4">
            <Image
              className="max-w-8 max-h-8 object-contain"
              source={require("../../assets/images/cards.png")}
            />
            <Text className="text-gray-100 font-psemibold">
              Daily Fruit Tracker
            </Text>
          </View>
          <View>
            <Image
              className="max-w-full rounded-lg aspect-square"
              source={require("../../assets/images/thumbnail.png")}
            />
          </View>
          <View className="flex flex-row justify-between ">
            <Text className="text-gray-100 font-psemibold">Today</Text>
            <Text className="text-gray-100 font-psemibold">1kg</Text>
          </View>
        </View>
        <View className="bg-black-100 border-black-200 border-2 p-4 rounded-md flex flex-column gap-4">
          <View className="flex flex-row items-center gap-4">
            <Image
              className="max-w-8 max-h-8 object-contain"
              source={require("../../assets/images/cards.png")}
            />
            <Text className="text-gray-100 font-psemibold">
              Daily Fruit Tracker
            </Text>
          </View>
          <View>
            <Image
              className="max-w-full rounded-lg aspect-square"
              source={require("../../assets/images/thumbnail.png")}
            />
          </View>
          <View className="flex flex-row justify-between ">
            <Text className="text-gray-100 font-psemibold">Today</Text>
            <Text className="text-gray-100 font-psemibold">1kg</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Home;
