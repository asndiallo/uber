import * as SecureStore from "expo-secure-store";

/**
 * SecureStore is a key-value storage system that allows you to save data in a secure way.
 * It is used to store sensitive data that you want to keep secure, such as user tokens.
 */
export const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("SecureStore set item error: ", err);
      return;
    }
  },
};
