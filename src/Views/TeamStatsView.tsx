import React, { memo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SvgUri } from 'react-native-svg';
import useCustomModalPopup from '../Components/CustomPopup.tsx';
import InputWithButton from '../Components/InputWithButton.tsx';
import { Standing } from '../Models/Standing.ts';
import useTeamStatsViewModel from '../ViewModels/TeamStatsViewModel.ts';

const TeamStatsView = () => {
  const {
    isFetching,
    games,
    searchText,
    scrollViewRef,
    refetch,
    searchStandings,
    onChangeText,
  } = useTeamStatsViewModel();
  const { openModal, ModalComponent } = useCustomModalPopup();

  const TeamItem = memo(
    ({ standing, openModal }: { standing: Standing; openModal: any }) => (
      <TouchableOpacity
        onPress={() =>
          openModal(
            standing.teamName?.default,
            'this should show the stats or at least offer something to the user about the team.',
          )
        }
      >
        <View style={[styles.teamStatCard, { backgroundColor: 'transparent' }]}>
          <View style={styles.teamLogoContainer}>
            <SvgUri
              width={150}
              height={150}
              style={styles.imageContainer}
              uri={standing!.teamLogo!.toString()}
            />
          </View>
          <Text style={styles.teamStatText}>{standing.teamName?.default}</Text>
          <Text style={styles.teamStatText}>
            Home Wins: {standing.homeWins}
          </Text>
          <Text style={styles.teamStatText}>
            Home loses: {standing.homeLosses}
          </Text>
          <Text style={styles.teamStatText}>
            {standing.conferenceName} Conference
          </Text>
          <Text style={styles.teamStatText}>
            {standing.divisionName} Division
          </Text>
          <Text style={styles.teamStatText}>
            Games played:{standing.gamesPlayed}
          </Text>
          <Text style={styles.teamStatText}>{standing.goalDifferential}</Text>
          <Text style={styles.teamStatText}>
            {standing.goalDifferentialPctg}
          </Text>
          <Text style={styles.teamStatText}>Goals For: {standing.goalFor}</Text>
          <Text style={styles.teamStatText}>
            Goals For percentage {standing.goalsForPctg}%
          </Text>
        </View>
      </TouchableOpacity>
    ),
  );

  return (
    <View style={styles.mainContainer}>
      <InputWithButton
        value={searchText}
        onChangeText={onChangeText}
        onPress={() => {
          searchStandings(searchText);
        }}
        placeholder="Utah"
        buttonTitle="search"
        disabled={isFetching}
      />
      {games && (
        <FlatList
          data={games}
          renderItem={({ item }) => (
            <TeamItem standing={item} openModal={openModal} />
          )}
          keyExtractor={(item, index) =>
            item?.teamAbbrev?.toString() + index.toString()
          }
          refreshing={isFetching}
          onRefresh={refetch}
        />
      )}
      <ModalComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
  },
  teamStatText: {
    fontSize: 20,
  },
  teamStatCard: {
    borderColor: 'black',
    backgroundColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 10,
  },
  teamLogoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {},
});

export default TeamStatsView;
