import AsyncStorage from "@react-native-async-storage/async-storage";


const useSettingsViewModel = () =>{

    const getAllSavedOptions = async() =>{
        const items = await AsyncStorage.getAllKeys();
        console.log(items)
    }

    return {getAllSavedOptions};
}

export default useSettingsViewModel;