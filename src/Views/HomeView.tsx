import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../Components/CustomButton';
import useHomeViewModel from '../ViewModels/HomeViewModel';

const HomeView = () => {
  const { navButtonPress } = useHomeViewModel();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.buttonContainer}>
        <View style={styles.topImageContainer}>
          <Text>this will be an image or something</Text>
        </View>
        <CustomButton
          style={styles.button}
          title="Teams"
          onPress={() => navButtonPress('Teams')}
          iconName="users"
        />
        <CustomButton
          style={styles.button}
          title="Find a Game"
          onPress={() => navButtonPress('Games')}
          iconName="tv"
        />
        <CustomButton
          style={styles.button}
          title="Team Stats"
          onPress={() => navButtonPress('Stats')}
          iconName="chart-bar"
        />
        <CustomButton
          style={styles.button}
          title="Shows"
          onPress={() => navButtonPress('Shows')}
          iconName="tv"
        />
        <CustomButton
          style={styles.button}
          title="Glossary"
          onPress={() => navButtonPress('Glossary')}
          iconName="book-open"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
  },
  topImageContainer: {
    height: '60%',
    backgroundColor: 'tranparent',
  },
  buttonContainer: {
    gap: 10,
  },
  button: {},
});

export default HomeView;
