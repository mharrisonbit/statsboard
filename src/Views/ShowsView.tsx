import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import useShowsViewModel from '../ViewModels/ShowsViewModel';

const ShowsView = () => {
  const { isLoading, streams, todaysGames, buildWatchList, buildTodaysGames } =
    useShowsViewModel();

  useFocusEffect(
    useCallback(() => {
      buildWatchList();
    }, []),
  );

  return (
    <View style={styles.mainContainer}>
      <View style={{ marginBottom: 5 }}>
        {streams ? (
          <View>
            <SvgUri
              uri={streams?.streamingLogoUrl}
              style={{ height: 100, width: 100 }}
            />
            <Text style={styles.item}>
              Streaming on {streams?.streamingName}
            </Text>
            <Text>Site URL {streams?.streamingSiteUrl}</Text>
          </View>
        ) : (
          <View>
            <Text>No data</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
  },
  item: {},
});

export default ShowsView;
