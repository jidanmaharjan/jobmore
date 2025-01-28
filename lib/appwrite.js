import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: process.env.EXPO_PUBLIC_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_PROJECTID,
  databaseId: process.env.EXPO_PUBLIC_DATABASEID,
  userCollectionId: process.env.EXPO_PUBLIC_USERCOLLECTIONID,
  pictureCollectionId: process.env.EXPO_PUBLIC_PICTURECOLLECTIONID,
  storageId: process.env.EXPO_PUBLIC_STORAGEID,
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      throw new Error("Failed to create account");
    }
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw new Error("User not found");
    }
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) {
      throw new Error("User not found");
    }
    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error);
  }
};

export async function signOut() {
  try {
    await account.deleteSession("current");
  } catch (error) {
    throw new Error(error);
  }
}

// Picture and calorie

export const savePicture = async (calorieData, imageUri) => {
  try {
    //save picture to storage and get the url and then save url to database
    const newFile = await storage.createFile(
      process.env.EXPO_PUBLIC_STORAGEID,
      ID.unique(),
      imageUri
    );

    console.log("New File:", newFile);

    const fileUrl = storage.getFileView(config.storageId, newFile.$id);
    const newPicture = await databases.createDocument(
      config.databaseId,
      config.pictureCollectionId,
      ID.unique(),
      {
        title: calorieData.name,
        calories: calorieData.calories,
        weight: calorieData.weight,
        picture: fileUrl,
        users: [await getCurrentUser()],
      }
    );
    return newPicture;
  } catch (error) {
    throw new Error(error);
  }
};
