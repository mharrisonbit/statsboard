import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../Components/CustomButton';
import useSettingsViewModel from '../ViewModels/SettingsViewModel';

const SettingsView = () => {
  const {
    savedGames,
    savedTeams,
    showClear,
    getAllSavedOptions,
    clearAllItemsSaved,
  } = useSettingsViewModel();

  useFocusEffect(
    useCallback(() => {
      getAllSavedOptions();
    }, []),
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Settings</Text>
        </View>
        {savedGames.length >= 1 ? (
          savedGames.map((game, index) => (
            <View key={index}>
              <Text>
                {game.teams?.home?.abbreviation} vs{' '}
                {game.teams?.away?.abbreviation}
              </Text>
            </View>
          ))
        ) : (
          <View>
            <Text>there are no games saved</Text>
          </View>
        )}
        {savedTeams.length >= 1 ? (
          savedTeams.map((team, index) => (
            <View key={index}>
              <Text>{team.fullName}</Text>
            </View>
          ))
        ) : (
          <View>
            <Text>there are no teams saved</Text>
          </View>
        )}
      </View>

      {showClear && (
        <View style={styles.clearButtonContainer}>
          <CustomButton
            title="Clear All Saved Data"
            onPress={clearAllItemsSaved}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'space-between', // 👈 pushes button to bottom
  },
  contentContainer: {
    flexGrow: 1,
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  clearButtonContainer: {
    marginBottom: 20, // 👈 adds padding from bottom safe area
  },
});

export default SettingsView;
