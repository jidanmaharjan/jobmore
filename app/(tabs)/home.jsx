import { FlatList, Image, RefreshControl, SafeAreaView, Text, View } from "react-native";
import { images } from "../../constants";
import { useState } from "react";
const Home = () => {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <Text className="text-3xl font-psemibold text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  Jidan
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
        refreshControl={<RefreshControl tintColor={"#FFA001"} refreshing={refreshing} onRefresh={onRefresh} />}
      />
      {/* <ScrollView className="p-4 bg-primary h-full ">
      <View className="gap-4">
        <View className="bg-black-100 border-black-200 border-2 p-4 rounded-md flex flex-column gap-4">
          <View className="flex flex-row items-center gap-4">
            <Image
              className="max-w-8 max-h-8 object-contain"
              source={require("../../assets/images/cards.png")}
            />
            <Text className="text-gray-100  text-lg font-psemibold">
              Daily Fruit Tracker
            </Text>
          </View>
          <View>
            <Image
              className="max-w-full rounded-lg"
              source={require("../../assets/images/thumbnail.png")}
            />
          </View>
          <View className="flex flex-row justify-between ">
            <Text className="text-gray-100 font-psemibold">Today</Text>
            <Text className="text-gray-100 font-psemibold">1kg</Text>
          </View>
        </View>
        
      </View>
    </ScrollView> */}
    </SafeAreaView>
  );
};
export default Home;
