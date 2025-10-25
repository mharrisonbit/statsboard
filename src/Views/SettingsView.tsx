import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
        <View style={{ gap: 20, marginBottom: 5 }}>
          {savedGames.length >= 1 ? (
            <FlatList
              data={savedGames}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    console.log('game was presssed');
                  }}
                >
                  <View style={{ marginBottom: 5 }}>
                    <Text style={styles.item}>
                      {item.teams?.away?.abbreviation} vs{' '}
                      {item.teams?.home?.abbreviation}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View>
              <Text>there are no games saved</Text>
            </View>
          )}
        </View>
        <View style={{ gap: 20, marginTop: 5 }}>
          {savedTeams.length >= 1 ? (
            <FlatList
              data={savedTeams}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 5 }}>
                  <Text style={styles.item}>{item.fullName}</Text>
                </View>
              )}
            />
          ) : (
            <View>
              <Text>there are no teams saved</Text>
            </View>
          )}
        </View>
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
    justifyContent: 'space-between',
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
  gameSwipeItem: {
    borderWidth: 1,
    borderColor: 'black',
    gap: 30,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderWidth: 1,
    borderColor: 'black',
  },
  clearButtonContainer: {
    marginBottom: 20,
  },
});

export default SettingsView;
