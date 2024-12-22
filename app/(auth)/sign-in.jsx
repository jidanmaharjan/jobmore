import { View, Text, TextInput, SafeAreaView, ScrollView, Image } from "react-native";
import CustomButton from "../../components/CustomButton";

import { images } from "../../constants";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="items-center justify-center w-full px-4 min-h-[85vh]">
          <Image source={images.logo} className="w-[115px] h-[35px]" />
          <Text className="text-white font-psemibold text-2xl mt-10">Sign In to your account</Text>
          <FormField
            title="Email"
            value="form.email"
            placeholder="Enter your email"
            handleTextchange={(text) => setForm((prev) => ({ ...prev, email: text }))}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <TextInput placeholder="Email" />
          <TextInput placeholder="Password" />
          <CustomButton title="Sign In" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignIn;
