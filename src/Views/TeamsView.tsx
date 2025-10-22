import { StyleSheet, Text, View } from 'react-native';
import useTeamsViewModel from '../ViewModels/TeamsViewModel';

const TeamsView = () => {
  const {} = useTeamsViewModel();

  return (
    <View style={styles.mainContainer}>
      <Text>this is the teams page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default TeamsView;
