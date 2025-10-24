import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useTeamsViewModel from '../ViewModels/TeamsViewModel';

const TeamsView = () => {
  const { teams, buildTeamsForView, saveTeam } = useTeamsViewModel();

  useFocusEffect(
    useCallback(() => {
      buildTeamsForView();
    }, []),
  );

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        {teams.length >= 1 ? (
          teams.map((team, index) => (
            <View key={index} style={styles.teamCard}>
              <TouchableOpacity>
                <Text style={styles.teamName}>{team.fullName}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveTeam}
                onPress={() => saveTeam(team)}
              >
                <FontAwesome5
                  name="heart"
                  size={25}
                  solid={team.isSaved}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.noDataDisplay}>
            <Text style={styles.noDataText}>There are no teams to display</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: 10,
    margin: 10,
  },
  teamCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 👈 pushes text left, heart right
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  teamName: {
    fontSize: 18,
  },
  noDataDisplay: {
    alignContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 20,
  },
  saveTeam: {
    paddingRight: 8,
  },
});

export default TeamsView;
