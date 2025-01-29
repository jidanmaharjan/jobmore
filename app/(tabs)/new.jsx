import { Camera, CameraView } from "expo-camera";
import {
  Circle,
  Images,
  RotateCw,
  Save,
  Scan,
  SwitchCamera,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as FileSystem from "expo-file-system";
import { savePicture } from "../../lib/appwrite";

const NewTrack = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [calorieData, setCalorieData] = useState(null);
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState("back");
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    // Request camera permission
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(true);
    })();
  }, []);

  async function convertImageUriToBase64(imageUri) {
    try {
      // Read the image file as a base64 string
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64Image;
    } catch (error) {
      console.error("Error reading file:", error);
      return null;
    }
  }

  const processImage = async (imageUri) => {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.EXPO_PUBLIC_GEMINI_API_KEY
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `
        Please generate data from this image for a calorie tracker app. 
  
        **Strictly follow the JSON format with the following keys:**
        * 'calories' (integer)
        * 'weight' (float, in grams)
        * 'name' (string) 
  
        **No other keys allowed.** 
  
        **Example:** 
        { 
          "calories": 150, 
          "weight": 100, 
          "name": "Apple" 
        }
  
        **Return only the JSON data. with a single objext for the photo provided. nothing else.**`;

      const imagePart = {
        inlineData: {
          data:
            (await convertImageUriToBase64(imageUri)) ||
            imageUri?.split("data:image/jpeg;base64,")[1],
          mimeType: "image/jpeg",
        },
      };

      const result = await model.generateContent([prompt, imagePart]);
      const responseData = result.response.text();

      console.log("Response Data:", responseData);

      try {
        const extractedContent = responseData.match(/{(.*)}/)[1];
        console.log("Extracted Content:", extractedContent);

        const parsedData = JSON.parse(`{${extractedContent}}`);

        // Validate the response data
        if (
          !parsedData.hasOwnProperty("calories") ||
          !parsedData.hasOwnProperty("weight") ||
          !parsedData.hasOwnProperty("name")
        ) {
          throw new Error("Invalid JSON response: Missing required keys.");
        }

        if (
          typeof parsedData.calories !== "number" ||
          typeof parsedData.weight !== "number" ||
          typeof parsedData.name !== "string"
        ) {
          throw new Error("Invalid JSON response: Incorrect data types.");
        }

        console.log("Parsed Data:", parsedData);
        setCalorieData(parsedData);
        // Use the parsedData for your app logic (e.g., update state)
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        Alert.alert("Error", "Could not parse the image data.");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      Alert.alert("Error", "There was an issue with processing the image.");
    } finally {
      setLoading(false);
    }
  };

  const capturePhoto = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync({
        quality: 0.3,
        base64: false,
        imageType: "jpg",
        shutterSound: false,
      });
      setPhoto(photoData);
      console.log("Photo Data:", photoData);

      processImage(photoData.uri);
    }
  };

  const toggleCameraFacing = () => {
    if (facing === "back") {
      setFacing("front");
    } else {
      setFacing("back");
    }
  };

  const saveToAppwrite = async () => {
    setSaveLoading(true);
    try {
      // Save the photo and calorie data to Appwrite
      const result = await savePicture(calorieData, photo);
      if (!result) {
        return Alert.alert("Error", "Save failed. Please try again.");
      }
      Alert.alert("Success", "Data saved successfully.");
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "There was an issue saving the data.");
    } finally {
      setSaveLoading(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!photo ? (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View className="text-gray-100 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
            <Scan
              style={{
                color: "rgba(255,255,255,0.5)",
                width: "8rem",
                height: "8rem",
              }}
              size={360}
            />
          </View>
          <View className="flex justify-between items-center flex-row w-full p-8">
            <TouchableOpacity
              className="bg-black/40 rounded-full p-2 text-white/90"
              style={styles.button}
              // onPress={toggleCameraFacing}
            >
              <Images style={{ color: "white" }} size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-100 rounded-full p-1"
              style={styles.button}
              onPress={capturePhoto}
            >
              <Circle style={{ color: "rgba(0,0,0,0.6)" }} size={64} />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-black/40 rounded-full p-2 text-white/90"
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <SwitchCamera style={{ color: "white" }} size={24} />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View className="items-center justify-center w-full px-4 gap-8 bg-primary h-full">
          <Image className="aspect-[9/16] w-60" source={{ uri: photo?.uri }} />
          {loading ? (
            <ActivityIndicator size={"large"} color={"orange"} />
          ) : (
            <View className="max-h-40 w-full">
              <Text className="p-4 text-white border border-black-200">
                {calorieData?.name}
              </Text>
              <Text className="p-4 text-white border border-black-200">
                {calorieData?.calories} Calories
              </Text>
              <Text className="p-4 text-white border border-black-200">
                {calorieData?.weight} grams
              </Text>
            </View>
          )}
          <View className="w-full justify-center items-center flex flex-row gap-4">
            <CustomButton
              title={
                <>
                  <Save /> Save
                </>
              }
              handlePress={saveToAppwrite}
              isLoading={saveLoading}
              containerStyles={"flex-grow"}
              textStyles={"text-white flex items-center"}
            />
            <CustomButton
              title={<RotateCw />}
              handlePress={() => setPhoto(null)}
              isLoading={false}
              containerStyles={
                "bg-transparent border border-secondary aspect-square h-[52px]"
              }
              textStyles={"text-secondary"}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default NewTrack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  photoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
