import { View, Text, TextInput } from "react-native";
const SignIn = () => {
  return (
    <View>
      <Text>SignIn</Text>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" />
      <CustomButton title="Sign In" />
    </View>
  );
};
export default SignIn;
