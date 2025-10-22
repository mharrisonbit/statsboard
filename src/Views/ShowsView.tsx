import { StyleSheet, Text, View } from 'react-native';
import useShowsViewModel from '../ViewModels/ShowsViewModel';

const ShowsView = () => {
  const {} = useShowsViewModel();

  return (
    <View style={styles.mainContainer}>
      <Text>this is the shows that you can see</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default ShowsView;
