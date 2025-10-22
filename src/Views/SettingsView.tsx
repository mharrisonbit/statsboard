import { StyleSheet } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../Components/CustomButton';
import useSettingsViewModel from '../ViewModels/SettingsViewModel';

const SettingsView = () => {
  const { getAllSavedOptions } = useSettingsViewModel();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text>this is the settings page</Text>
      <CustomButton title="get the saved items" onPress={getAllSavedOptions} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
  },
});

export default SettingsView;
