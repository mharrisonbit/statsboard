import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
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
    ModalComponent,
  } = useSettingsViewModel();

  useFocusEffect(
    useCallback(() => {
      getAllSavedOptions();
    }, []),
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Scrollable content */}
      <ModalComponent />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Settings</Text>
        </View>

        {/* Saved Games */}
        <View style={styles.section}>
          <Text style={styles.listHeaderText}>Saved Games</Text>
          {savedGames.length > 0 ? (
            <FlatList
              data={savedGames}
              keyExtractor={(_, i) => i.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => Alert.alert('This will unsave this item')}
                >
                  <View style={styles.itemContainer}>
                    <Text style={styles.item}>
                      {item.teams?.away?.abbreviation} vs{' '}
                      {item.teams?.home?.abbreviation}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text>There are no games saved</Text>
          )}
        </View>

        {/* Saved Teams */}
        <View style={styles.section}>
          <Text style={styles.listHeaderText}>Saved Teams</Text>
          {savedTeams.length > 0 ? (
            <FlatList
              data={savedTeams}
              keyExtractor={(_, i) => i.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.item}>{item.fullName}</Text>
                </View>
              )}
            />
          ) : (
            <Text>There are no teams saved</Text>
          )}
        </View>
      </ScrollView>

      {/* Fixed button */}
      {showClear && (
        <View style={styles.clearButtonContainer}>
          <CustomButton title="Clear Saved Data" onPress={clearAllItemsSaved} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  scrollContainer: {
    paddingBottom: 80, // make space for bottom button
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 10,
  },
  listHeaderText: {
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
    marginBottom: 5,
  },
  itemContainer: {
    marginBottom: 5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
  clearButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default SettingsView;
