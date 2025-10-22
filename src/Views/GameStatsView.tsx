import { StyleSheet, Text, View } from 'react-native';
import useGameStatsViewModel from '../ViewModels/GameStatsViewModel';

const GameStatsView = () => {
  const { isLoading } = useGameStatsViewModel();

  return (
    <View style={styles.mainContainer}>
      <Text>this is the game stats</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default GameStatsView;
