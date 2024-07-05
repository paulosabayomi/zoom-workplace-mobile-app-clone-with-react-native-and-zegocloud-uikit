import AsyncStorage from '@react-native-async-storage/async-storage';


class AppStorage {
    public user_details_key = "user-details-store-key";

    async setItem (key: string, value: string) {
        return await AsyncStorage.setItem(key, value);
    }
    async getItem (key: string) {
        return await AsyncStorage.getItem(key);
    }
    async removeItem (key: string) {
        return await AsyncStorage.removeItem(key);
    }
}

export const appStorageInst = new AppStorage()