import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { icons } from "../constants";

const CustomFormField = ({
  title,
  value,
  placeholder,
  handleTextchange,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 w-full ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium mb-2">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center justify-between flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base "
          value={value}
          placeholder={placeholder}
          onChangeText={handleTextchange}
          placeholderTextColor={"#7b7b8b"}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Image
              source={showPassword ? icons?.eyeHide : icons?.eye}
              className="w-6 h-6"
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomFormField;
